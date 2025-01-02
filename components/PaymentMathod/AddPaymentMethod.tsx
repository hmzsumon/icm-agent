'use client';
import React, { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Label, TextInput, Select } from 'flowbite-react';
import { useAddPaymentMethodMutation } from '@/redux/features/agent/agentApi';
import WithdrawSecurity from '@/components/Withdraw/WithdrawSecurity';

interface PaymentMethodOption {
	id: number;
	title: string;
	label: string;
}

const paymentMethods: PaymentMethodOption[] = [
	{ id: 1, title: 'Binance', label: 'TRC-20 Address (USDT)' },
	{ id: 2, title: 'Bkash', label: 'Bkash Number' },
	{ id: 3, title: 'Rocket', label: 'Rocket Number' },
	{ id: 4, title: 'Nagad', label: 'Nagad Number' },
];

const AddPaymentMethod: React.FC = () => {
	const [addPaymentMethod, { isLoading, isSuccess, isError, error }] =
		useAddPaymentMethodMutation();

	const [methodTitle, setMethodTitle] = useState<string>(
		paymentMethods[0].title
	);
	const [value, setValue] = useState<string>('');
	const [rate, setRate] = useState<number>(0);

	const [openModal, setOpenModal] = useState(false);
	const [isVerify, setIsVerify] = useState(false);

	// handle verify
	const handleVerify = () => {
		setIsVerify(true);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		// Validate inputs
		if (!value) {
			toast.error('Please provide the account number.');
			return;
		}

		if (methodTitle !== 'Binance' && rate <= 0) {
			toast.error('Please provide the rate.');
			return;
		}

		const data = {
			method: {
				title: methodTitle,
				account_number: value,
				rate: rate,
			},
		};

		addPaymentMethod(data);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Payment method added!');
			setValue('');
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isError, isSuccess]);

	return (
		<div className='flex items-center justify-center px-2 mt-6'>
			<Card className='w-full max-w-md p-8'>
				<div>
					<h2 className='text-xl font-bold'>Add Payment Method</h2>
				</div>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<Select
							value={methodTitle}
							onChange={(e: ChangeEvent<HTMLSelectElement>) =>
								setMethodTitle(e.target.value)
							}
						>
							{paymentMethods.map((option) => (
								<option key={option.id} value={option.title}>
									{option.title}
								</option>
							))}
						</Select>
					</div>
					<div className='flex flex-col gap-2'>
						<Label
							htmlFor='payment-value'
							value={
								paymentMethods.find((method) => method.title === methodTitle)
									?.label || 'Enter details'
							}
						/>
						<TextInput
							id='payment-value'
							type='text'
							placeholder={`Enter ${
								paymentMethods.find((method) => method.title === methodTitle)
									?.label
							}`}
							required
							value={value}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setValue(e.target.value)
							}
						/>
					</div>

					{methodTitle !== 'Binance' && (
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor='payment-rate'
								value={`
									${
										paymentMethods.find(
											(method) => method.title === methodTitle
										)?.title || 'Enter details'
									} to USDT Rate (1 USDT = ? BDT)
								`}
							/>
							<TextInput
								id='payment-rate'
								type='number'
								placeholder={`Enter ${
									paymentMethods.find((method) => method.title === methodTitle)
										?.title
								} to USDT Rate`}
								required
								value={rate}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setRate(Number(e.target.value))
								}
							/>
							<small className='text-orange-500 font-bold text-xs'>
								* Please follow the rate from Binance
							</small>
						</div>
					)}
					<div>
						{isVerify ? (
							<button
								onClick={(e: any) => handleSubmit(e)}
								className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={isLoading}
							>
								{isLoading ? (
									<PulseLoader color='#fff' size={8} margin={2} />
								) : (
									'Proceed to Add'
								)}
							</button>
						) : (
							<button
								onClick={() => setOpenModal(true)}
								className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={
									isLoading ||
									!value ||
									(methodTitle !== 'Binance' && rate <= 0)
								}
							>
								Security Verify
							</button>
						)}
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

export default AddPaymentMethod;
