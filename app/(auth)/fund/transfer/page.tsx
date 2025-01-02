'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { useSelector } from 'react-redux';
import {
	useGetUserByPartnerIdQuery,
	useLoadUserQuery,
} from '@/redux/features/auth/authApi';
import {
	useFindUserByCustomerIdMutation,
	useSendMutation,
} from '@/redux/features/send/sendApi';
import { Card } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import WithdrawSecurity from '@/components/Withdraw/WithdrawSecurity';
import { useMoneyTransferMutation } from '@/redux/features/agent/agentApi';

const Transfer = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const [userId, setUserId] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [total_amount, setTotalAmount] = React.useState(0);
	const [fee, setFee] = React.useState(0);
	const [receiveAmount, setReceiveAmount] = React.useState(0);
	const [amountError, setAmountError] = React.useState('');
	const [recipient, setRecipient] = useState<any>(null);
	const [recipientError, setRecipientError] = React.useState('');
	const [isVerify, setIsVerify] = useState(false);

	const [openModal, setOpenModal] = useState(false);

	const [findUserByCustomerId, { data, isLoading, isError, error, isSuccess }] =
		useFindUserByCustomerIdMutation();

	// calculate fee by 5%
	useEffect(() => {
		if (Number(amount) >= 10) {
			const fee = Number(amount) * 0; // 5% fee
			setFee(fee);
			setReceiveAmount(Number(amount));
			setTotalAmount(Number(amount) + fee);
		}
	}, [amount]);

	const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientError('');
		setUserId(e.target.value);
	};

	// handle change amount & check amount > user e_balance
	const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmountError('');
		setAmount(e.target.value);

		// check min amount
		if (Number(e.target.value) < 10) {
			setAmountError('Minimum amount is 10 USDT');
		}

		if (Number(e.target.value) > user?.m_balance) {
			setAmountError('Amount is greater than your balance');
		}
	};

	// handle find user by customer id
	const handleFindUserByCustomerId = async () => {
		try {
			// check amount >= 10
			if (Number(amount) < 10) {
				setAmountError('Minimum amount is 10 USDT');
				toast.error('Minimum amount is 10 USDT');
				return;
			}

			// check total amount <= user balance
			if (Number(total_amount) > user?.m_balance) {
				setAmountError('Amount is greater than your balance');
				toast.error('Amount is greater than your balance');
				return;
			}
			const res = await findUserByCustomerId(userId).unwrap();
			setRecipient(res?.user);
			// check user id === recipient id
			if (res?.user?.partner_id === user?.partner_id) {
				setRecipientError('You cannot send to yourself');
				setRecipient(null);
			}
		} catch (error) {
			console.log(error);
			setRecipientError((error as fetchBaseQueryError).data.message);
		}
	};

	// send usdt
	const [
		moneyTransfer,
		{
			isLoading: s_isLoading,
			isError: s_isError,
			isSuccess: s_isSuccess,
			error: s_error,
		},
	] = useMoneyTransferMutation();

	// handle verify
	const handleVerify = () => {
		setIsVerify(true);
	};

	// handle submit
	const handleSubmit = () => {
		const data = {
			recipient_id: recipient?.partner_id,
			amount: Number(amount),
			fee: fee,
			receive_amount: receiveAmount,
			total_amount: total_amount,
		};
		// console.log(data);
		moneyTransfer(data);
	};

	// for send
	useEffect(() => {
		if (s_isError) {
			toast.error((s_error as fetchBaseQueryError).data.message);
		}
		if (s_isSuccess) {
			toast.success('Send successfully');
			router.push('/transactions');
		}
	}, [s_isError, s_error, s_isSuccess]);

	return (
		<div className='p-4'>
			<Card>
				<div>
					<div className='space-y-2'>
						<h2 className='text-2xl font-bold text-center text-blue-gray-300 '>
							Send USDT
						</h2>
					</div>
					<hr className='my-2 border border-blue-gray-800 ' />
					<p className=' text-center text-xs font-semibold'>Agent To User</p>
					<div className='my-4 space-y-3'>
						<div>
							<label
								htmlFor=''
								className='block mb-2 ml-1 text-sm font-medium text-blue-gray-300'
							>
								Partner ID
							</label>
							<input
								type='text'
								className='w-full px-2 py-2 border rounded-lg border-blue-gray-800 bg-black_2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
								placeholder='Enter User ID'
								value={userId}
								onChange={(e) => handleChangeUserId(e)}
							/>
							<small>
								{recipientError && (
									<span className='text-xs text-red-500'>{recipientError}</span>
								)}
							</small>
						</div>
						{/* Amount */}
						<div>
							<label
								htmlFor=''
								className='block mb-2 ml-1 text-sm font-medium text-blue-gray-300'
							>
								Send Amount
							</label>
							<input
								type='number'
								className='w-full px-2 py-2 border rounded-lg border-blue-gray-800 bg-black_2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
								placeholder='Enter Amount'
								value={amount}
								onChange={(e) => handleChangeAmount(e)}
							/>
							{/* Show 5% fee */}
							<div className=' flex flex-col gap-1 mt-1 ml-1'>
								{/* <small className='text-xs text-green-500'>
									{fee > 0 ? (
										<span>
											5% fee: {Number(fee).toFixed(2)} USDT, Receive Amount:{' '}
											{Number(receiveAmount).toFixed(2)} USDT
										</span>
									) : (
										<span>(5% fee will be charged.)</span>
									)}
								</small> */}
								<small>
									{amountError && (
										<span className='text-xs text-red-500 font-bold'>
											{amountError}
										</span>
									)}
								</small>
							</div>
						</div>

						{recipient && (
							<>
								<hr className='my-2 border border-blue-gray-800 ' />
								<div className='px-4 '>
									<div className='space-y-2 '>
										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Send Mod:</span>{' '}
											<span>User Id</span>
										</li>
										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Send From:</span>{' '}
											<span>Main Wallet ( USDT)</span>
										</li>
										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>To:</span>{' '}
											<span className='flex flex-col'>
												{recipient?.customer_id}
												<span className='text-xs text-blue-gray-500'>
													({recipient?.name})
												</span>
											</span>
										</li>
										<hr className='my-2 border border-blue-gray-800 ' />
										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Send amount:</span>{' '}
											<span>{Number(total_amount).toFixed(2)} USDT</span>
										</li>

										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Charge:</span>{' '}
											<span>{Number(fee).toFixed(2)} USDT</span>
										</li>

										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Receive Amount:</span>{' '}
											<span>{Number(receiveAmount).toFixed(2)} USDT</span>
										</li>
										<hr className='my-2 border border-blue-gray-800 ' />
										<li className='flex items-center justify-between list-none '>
											<span className='font-bold'>Total amount:</span>{' '}
											<span className=' font-bold'>
												{Number(total_amount).toFixed(2)} USDT
											</span>
										</li>
									</div>
								</div>
								<hr className='my-2 border border-blue-gray-800 ' />
							</>
						)}

						<div>
							{recipient ? (
								<div>
									{isVerify ? (
										<button
											onClick={handleSubmit}
											className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
											disabled={s_isLoading}
										>
											Proceed to Send
										</button>
									) : (
										<button
											onClick={() => setOpenModal(true)}
											className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500'
										>
											Security Verify
										</button>
									)}
								</div>
							) : (
								<button
									onClick={handleFindUserByCustomerId}
									className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
									disabled={
										!userId ||
										!amount ||
										Number(amount) > user?.m_balance ||
										amountError !== ''
									}
								>
									Find Recipient
								</button>
							)}
						</div>
					</div>
				</div>
			</Card>
			<WithdrawSecurity
				openModal={openModal}
				setOpenModal={setOpenModal}
				handleSubmit={handleVerify}
			/>
		</div>
	);
};

export default Transfer;
