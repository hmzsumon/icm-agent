'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import {
	useLoadUserQuery,
	useUpdateProfileMutation,
} from '@/redux/features/auth/authApi';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import {
	useAddPaymentDescriptionMutation,
	useMyAgentQuery,
	useUpdateRateMutation,
} from '@/redux/features/agent/agentApi';

const PaymentDescription: React.FC = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading: myAgentLoading } = useMyAgentQuery(undefined);
	const { agent } = data || {};

	const [addPaymentDescription, { isLoading, isSuccess, isError, error }] =
		useAddPaymentDescriptionMutation();

	const [isEdit, setIsEdit] = useState(false);
	const [rates, setRates] = useState<{ [key: string]: string }>({});
	const [description, setDescription] = useState<string>('');

	// Initialize rates state with existing rates
	useEffect(() => {
		if (agent?.payment_description) {
			setDescription(agent.payment_description);
		}
	}, [agent]);

	// Handle input change for rates
	const handleInputChange = () => {
		setDescription(description);
	};

	// Handle form submission
	const handleFormSubmit = async () => {
		if (!description) {
			toast.error('Please provide a description');
			return;
		}

		addPaymentDescription({ description });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Payment description updated successfully');
			setIsEdit(false);
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError]);

	return (
		<div className='container mx-auto px-4 py-4'>
			<div className='bg-white overflow-hidden shadow rounded-lg border'>
				<div className='px-4 py-5 sm:px-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-lg leading-6 font-medium text-gray-900'>
								Payment Description
							</h3>
							<p className='mt-1 max-w-2xl text-sm text-gray-500'>
								you can update your payment description here.
							</p>
						</div>
						<div>
							{agent && agent?.is_payment_method_added && (
								<FaRegEdit
									className='text-gray-500 cursor-pointer'
									onClick={() => setIsEdit(!isEdit)}
								/>
							)}
						</div>
					</div>
				</div>

				<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
					<dl className='sm:divide-y sm:divide-gray-200'>
						<div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Description:
								</dt>
								{!isEdit ? (
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-4'>
										{agent?.payment_description ? (
											<span>{agent.payment_description}</span>
										) : (
											<span className=' text-orange-500'>
												No description provided yet
											</span>
										)}
									</dd>
								) : (
									<div>
										<Textarea
											id='description'
											placeholder='Enter Description'
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											rows={4}
										/>
									</div>
								)}
							</div>
						</div>

						{isEdit && (
							<div className='py-3 px-1'>
								<Button
									color='success'
									className='w-full place-self-end'
									onClick={handleFormSubmit}
								>
									{isLoading ? (
										<PulseLoader color='#fff' loading={isLoading} size={8} />
									) : (
										'Save'
									)}
								</Button>
							</div>
						)}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default PaymentDescription;
