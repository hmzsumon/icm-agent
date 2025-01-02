'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Card, Label, TextInput, Select } from 'flowbite-react';

interface PaymentMethodOption {
	id: number;
	title: string;
	label: string;
}

interface SelectedMethod {
	methodId: number;
	value: string;
}

const paymentMethods: PaymentMethodOption[] = [
	{ id: 1, title: 'Binance', label: 'TRC-20 Address (USDT)' },
	{ id: 2, title: 'Bkash', label: 'Bkash Number' },
	{ id: 3, title: 'Rocket', label: 'Rocket Number' },
	{ id: 4, title: 'Nagad', label: 'Nagad Number' },
];

const PaymentMethod: React.FC = () => {
	const [selectedMethods, setSelectedMethods] = useState<SelectedMethod[]>([
		{ methodId: paymentMethods[0].id, value: '' },
	]);

	const handleAddMethod = () => {
		setSelectedMethods((prev) => [
			...prev,
			{ methodId: paymentMethods[0].id, value: '' },
		]);
	};

	const handleMethodChange = (index: number, newMethodId: string) => {
		const updatedMethods = [...selectedMethods];
		updatedMethods[index].methodId = parseInt(newMethodId, 10);
		updatedMethods[index].value = ''; // Clear value on method change
		setSelectedMethods(updatedMethods);
	};

	const handleValueChange = (index: number, newValue: string) => {
		const updatedMethods = [...selectedMethods];
		updatedMethods[index].value = newValue;
		setSelectedMethods(updatedMethods);
	};

	const handleRemoveMethod = (index: number) => {
		setSelectedMethods((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Payment Methods:', selectedMethods);
		// Add your submission logic here
	};

	return (
		<div className='flex items-center justify-center px-2 mt-6'>
			<Card className='w-full max-w-md p-8'>
				<div>
					<h2 className='text-xl font-bold'>Payment Method</h2>
				</div>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					{selectedMethods.map((method, index) => {
						const currentMethod = paymentMethods.find(
							(option) => option.id === method.methodId
						);

						return (
							<div key={index} className='flex flex-col gap-2'>
								<div className='flex items-center justify-between gap-2'>
									<Select
										value={method.methodId.toString()}
										onChange={(e: ChangeEvent<HTMLSelectElement>) =>
											handleMethodChange(index, e.target.value)
										}
										className='w-full'
									>
										{paymentMethods.map((option) => (
											<option key={option.id} value={option.id}>
												{option.title}
											</option>
										))}
									</Select>
									<Button
										color='failure'
										size='sm'
										onClick={() => handleRemoveMethod(index)}
									>
										Remove
									</Button>
								</div>
								<div className='flex flex-col gap-2'>
									<Label
										htmlFor={`input-${index}`}
										value={currentMethod?.label || 'Enter details'}
										className='ml-2'
									/>
									<TextInput
										id={`input-${index}`}
										type='text'
										placeholder='Enter details'
										required
										value={method.value}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleValueChange(index, e.target.value)
										}
									/>
								</div>
							</div>
						);
					})}

					<Button type='button' onClick={handleAddMethod} color='success'>
						Add Payment Method
					</Button>
					<Button type='submit'>Save</Button>
				</form>
			</Card>
		</div>
	);
};

export default PaymentMethod;
