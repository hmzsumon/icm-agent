'use client';
import CustomSelect from '@/components/CustomSelect';
import TransactionCards from '@/components/Transactions/TransactionCards';
import { useGetTransactionsQuery } from '@/redux/features/transactions/transactionApi';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const options = [
	{ label: 'All', value: 'All' },
	{ label: 'Daily Profit', value: 'Profit' },
	{ label: 'Deposit', value: 'Deposit' },
	{ label: 'Withdraw', value: 'Withdraw' },
	{ label: 'Transfer', value: 'Transfer' },
	{ label: 'Buy Package', value: 'Buy Package' },
];

const Transactions = () => {
	const { data, error, isLoading } = useGetTransactionsQuery(undefined);
	const transactions = data?.transactions || [];

	const [purpose, setPurpose] = useState('All'); // Default to 'All'
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);

	useEffect(() => {
		// Filter transactions based on the selected purpose
		if (purpose === 'All') {
			setFilteredTransactions(transactions);
		} else {
			const filtered = transactions.filter(
				(transaction: any) => transaction.purpose === purpose
			);
			setFilteredTransactions(filtered);
		}
	}, [purpose, transactions]); // Re-run when purpose or transactions change

	const handleSelectPurpose = (value: any) => {
		setPurpose(value); // Set selected purpose
	};

	return (
		<div className='px-2 py-4'>
			<h3 className='text-xl text-slate-800 font-semibold my-2'>
				Transaction History
			</h3>
			<div className='w-full md:w-3/12 py-10 px-2'>
				<CustomSelect
					options={options}
					value={purpose}
					onChange={handleSelectPurpose}
					title='Filter by Purpose'
					defaultValue='All'
				/>
			</div>
			{filteredTransactions?.length === 0 ? (
				<div>
					<Image
						src='/no-data.gif'
						width={200}
						height={200}
						alt='No Data'
						className='mx-auto'
					/>
					<p className='text-center text-gray-500 font-semibold'>
						No transactions found
					</p>
				</div>
			) : (
				<div className='space-y-2'>
					{filteredTransactions?.map((transaction: any) => (
						<TransactionCards key={transaction._id} transaction={transaction} />
					))}
				</div>
			)}
		</div>
	);
};

export default Transactions;
