'use client';
import { EditIcon } from '@/lib/icons/CommonIcons';
import { formDateWithTime, maskEmail, maskEmail2 } from '@/utils/functions';
import { CheckIcon, CloseIcon, CloseRedIcon } from '@/utils/icons/CommonIcons';
import {
	AuthenticatorIcon,
	BiometricIcon,
	EmailIcon,
	PhoneIcon,
	PasswordIcon,
	DeviceIcon,
	ActivityIcon,
} from '@/utils/icons/SecurityIcons';
import { url } from 'inspector';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

interface Emil {
	email: string;
}

const PaymentMethod = () => {
	const { user } = useSelector((state: any) => state.auth);

	const items = [
		{
			id: 1,
			icon: <DeviceIcon h={35} w={35} />,
			title: 'Payment Method',
			description:
				'View and manage the payment methods linked to your account.',
			callback: () => {},
			btnText: 'Manage',
			url: '/settings/payment-method',
		},
		{
			id: 2,
			icon: <DeviceIcon h={35} w={35} />,
			title: 'Update Rate',
			description: 'Update the rate for the payment methods.',
			callback: () => {},
			btnText: 'Update',
			url: '/settings/update-rate',
		},
	];
	return (
		<div>
			<h1 className='text-2xl font-bold '>Payment Method</h1>
			<div>
				{items.map((item) => {
					return (
						<div
							key={item.id}
							className='flex flex-col items-center gap-4 px-2 py-6 my-4 border-b border-gray-500 md:flex-row '
						>
							<div className='flex w-full gap-4'>
								{item.icon}
								<div>
									<h2 className='text-lg font-semibold'>{item.title}</h2>
									<p className='text-sm text-gray-400'>{item.description}</p>
								</div>
							</div>

							<div className='flex items-center justify-between w-full gap-x-4'>
								<div></div>
								<div className=''>
									<Link href={item.url}>
										<button
											onClick={item.callback}
											className=' w-[80px] py-2  text-sm text-white bg-[#474d57] hover:bg-[#2b3139] rounded'
										>
											{item.btnText}
										</button>
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PaymentMethod;
