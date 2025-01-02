'use client';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import Address from '@/components/Profile/Address';
import NameAndEmail from '@/components/Profile/NameAndEmail';
import PhoneNumber from '@/components/Profile/Phone';
import {
	useLoadUserQuery,
	useUpdateProfileMutation,
} from '@/redux/features/auth/authApi';
import { Button, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';

const Profile = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);

	// call useUpdateProfileMutation
	const [updateProfile, { isLoading, isSuccess, isError, error }] =
		useUpdateProfileMutation();

	const [whatsapp, setWhatsapp] = useState(user?.whatsapp);
	const [facebook, setFacebook] = useState(user?.facebook);
	const [telegram, setTelegram] = useState(user?.telegram);
	const [isEdit, setIsEdit] = useState(false);

	// useEffect for setting the user data
	useEffect(() => {
		if (!user?.whatsapp || !user?.facebook || !user?.telegram) {
			setIsEdit(true);
		}
	}, [user]);

	// handle form submit
	const handleFormSubmit = () => {
		const data = {
			whatsapp,
			facebook,
			telegram,
		};

		updateProfile(data);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Profile updated successfully');
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
								User Profile
							</h3>
							<p className='mt-1 max-w-2xl text-sm text-gray-500'>
								This is some information about the user.
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
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Full name</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								{user?.name}
							</dd>
						</div>
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>
								Email address
							</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
								{user?.email}
							</dd>
						</div>
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>
								Phone number
							</dt>
							{user?.mobile ? (
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									+{user?.mobile}
								</dd>
							) : (
								<div>
									<TextInput
										id='phone'
										type='text'
										placeholder='Phone Number'
										value={user?.mobile}
									/>
								</div>
							)}
						</div>
						{/* Start whatsapp */}
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>
								Whatsapp Number
							</dt>
							{!isEdit ? (
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user?.whatsapp}
								</dd>
							) : (
								<div>
									<TextInput
										id='address'
										type='text'
										placeholder='Whatsapp Number'
										value={whatsapp}
										required
										onChange={(e) => setWhatsapp(e.target.value)}
									/>
								</div>
							)}
						</div>
						{/* End whatsapp */}

						{/* Start facebook */}
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>
								Facebook Profile Link
							</dt>
							{!isEdit ? (
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user?.facebook}
								</dd>
							) : (
								<div>
									<TextInput
										id='facebook'
										type='text'
										placeholder='Facebook Profile Link'
										value={facebook}
										onChange={(e) => setFacebook(e.target.value)}
									/>
								</div>
							)}
						</div>
						{/* End facebook */}

						{/* Start telegram */}
						<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>
								Telegram Username
							</dt>
							{!isEdit ? (
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user?.telegram}
								</dd>
							) : (
								<div>
									<TextInput
										id='telegram'
										type='text'
										placeholder='Telegram Username'
										value={telegram}
										onChange={(e) => setTelegram(e.target.value)}
									/>
								</div>
							)}
						</div>
						{/* End telegram */}
						<div className='py-3 px-1'>
							<Button
								color='success'
								className=' w-full   place-self-end'
								onClick={handleFormSubmit}
							>
								{isLoading ? (
									<PulseLoader color='#fff' loading={isLoading} size={8} />
								) : (
									'Save'
								)}
							</Button>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
};

export default Profile;
