'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import {
	useLoadUserQuery,
	useUpdateProfileMutation,
} from '@/redux/features/auth/authApi';
import { Button, Label, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import {
	useMyAgentQuery,
	useUpdateRateMutation,
} from '@/redux/features/agent/agentApi';

const UpdateRate = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading: myAgentLoading } = useMyAgentQuery(undefined);
	const { agent } = data || {};

	const [updateRate, { isLoading, isSuccess, isError, error }] =
		useUpdateRateMutation();

	const [isEdit, setIsEdit] = useState(false);
	const [rates, setRates] = useState<{ [key: string]: string }>({});

	// Initialize rates state with existing rates
	useEffect(() => {
		if (agent?.payment_methods) {
			const initialRates = agent.payment_methods.reduce(
				(acc: any, method: any) => {
					acc[method._id] = method.rate;
					return acc;
				},
				{}
			);
			setRates(initialRates);
		}
	}, [agent]);

	// Handle input change for rates
	const handleInputChange = (id: string, value: string) => {
		setRates((prevRates) => ({
			...prevRates,
			[id]: value,
		}));
	};

	// Handle form submission
	const handleFormSubmit = async () => {
		try {
			const updatedRates = Object.keys(rates).map((id) => ({
				methodId: id,
				rate: rates[id],
				title: agent.payment_methods.find((method: any) => method._id === id)
					.title,
			}));

			await updateRate({ rates: updatedRates }).unwrap();
			toast.success('Rates updated successfully');
			setIsEdit(false);
		} catch (err) {
			toast.error(
				((err as fetchBaseQueryError).data?.message as string) ||
					'Failed to update rates'
			);
		}
	};

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		toast.success('Profile updated successfully');
	// 	}
	// 	if (isError) {
	// 		toast.error((error as fetchBaseQueryError).data?.message);
	// 	}
	// }, [isSuccess, isError]);

	return (
		<div className='container mx-auto px-4 py-4'>
			<div className='bg-white overflow-hidden shadow rounded-lg border'>
				<div className='px-4 py-5 sm:px-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-lg leading-6 font-medium text-gray-900'>
								Update Rate
							</h3>
							<p className='mt-1 max-w-2xl text-sm text-gray-500'>
								You can update your rate here.
							</p>
						</div>
						<div>
							<FaRegEdit
								className='text-gray-500 cursor-pointer'
								onClick={() => setIsEdit(!isEdit)}
							/>
						</div>
					</div>
				</div>

				<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
					<dl className='sm:divide-y sm:divide-gray-200'>
						{agent && agent?.payment_methods?.length > 0 ? (
							<div>
								{agent?.payment_methods.map((method: any) => {
									if (method.title === 'Binance') {
										return null;
									}
									return (
										<div
											key={method._id}
											className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
										>
											<dt className='text-sm font-medium text-gray-500'>
												{method.title}
											</dt>
											{!isEdit ? (
												<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
													{method.rate} BDT
												</dd>
											) : (
												<div>
													<TextInput
														id={`rate-${method._id}`}
														type='text'
														placeholder='Rate'
														value={rates[method._id] || ''}
														onChange={(e) =>
															handleInputChange(method._id, e.target.value)
														}
													/>
												</div>
											)}
										</div>
									);
								})}
							</div>
						) : (
							<div>
								<h2>
									You have not added any payment method yet. Please add a
									payment method to continue.
								</h2>
							</div>
						)}

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

export default UpdateRate;
