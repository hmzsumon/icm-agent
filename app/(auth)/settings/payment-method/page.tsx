'use client';
import React, { useState, ChangeEvent, FormEvent, use, useEffect } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button, Card, Label, TextInput, Select } from 'flowbite-react';
import { useAddPaymentMethodMutation } from '@/redux/features/agent/agentApi';
import WithdrawSecurity from '@/components/Withdraw/WithdrawSecurity';
import UpdateRate from '@/components/PaymentMathod/UpdateRate';
import AddPaymentMethod from '@/components/PaymentMathod/AddPaymentMethod';
import PaymentDescription from '@/components/PaymentMathod/PaymentDescription';

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

const PaymentMethod: React.FC = () => {
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
		e.preventDefault();

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
		<div className=' px-2 mt-6'>
			<AddPaymentMethod />
			<PaymentDescription />
			<UpdateRate />
		</div>
	);
};

export default PaymentMethod;
