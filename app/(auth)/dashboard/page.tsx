'use client';
import ItemCard from '@/components/Dashboard/ItemCard';
import { formatBalance } from '@/lib/functions';
import { useGetOwnerDataQuery } from '@/redux/features/owner/ownerApi';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { FaUsers, FaWallet } from 'react-icons/fa';
import { FaFilterCircleDollar, FaHandHoldingDollar } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { PiDownloadSimpleBold, PiWarningLight } from 'react-icons/pi';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import { RiGlobalFill } from 'react-icons/ri';
import { CiInboxOut } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { useAgentDashboardQuery } from '@/redux/features/agent/agentApi';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
const Dashboard = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading } = useAgentDashboardQuery(undefined);
	const { agent } = data || {};
	// console.log(owner, company);

	return (
		<div className=' z-0 px-2 '>
			<div className='py-4  '>
				{/*Start Balance Card */}
				<Card href='#' className='w-full'>
					<div className='py-5'>
						<div className='flex items-center justify-between'>
							<div className=' md:col-span-1 grid md:flex gap-2 items-center'>
								<Card className=' w-20 h-20 rounded-full  flex items-center justify-center'>
									<FaWallet className=' text-icm-green text-3xl' />
								</Card>
								<p className='uppercase md:mb-0 mb-5 text-lg text-slate-600'>
									<span className='font-semibold text-xl text-black'>
										{formatBalance(agent?.m_balance)}
									</span>{' '}
									USDT
								</p>
							</div>
						</div>
					</div>
				</Card>
				{/*End Balance Card */}
				<div className=' my-6 grid md:grid-cols-2 gap-4'>
					<ItemCard
						icon={<GiReceiveMoney />}
						title='Total Income'
						balance={agent?.total_income}
						is_balance={true}
					/>

					<ItemCard
						icon={<FaWallet />}
						title='Deposits Income'
						balance={agent?.total_d_commission}
						is_balance={true}
					/>
					<ItemCard
						icon={<FaFilterCircleDollar />}
						title='Withdraw Income'
						balance={agent?.total_w_commission}
						is_balance={true}
					/>

					<ItemCard
						icon={<FaUsers />}
						title='Total Deposits'
						balance={agent?.total_deposit}
						is_balance={true}
					/>
					<ItemCard
						icon={<FaUsers />}
						title='Total Withdraws'
						balance={agent?.total_withdraw}
						is_balance={true}
					/>

					<ItemCard
						icon={<FaUsers />}
						title='Total Transfers'
						balance={agent?.total_transfer}
						is_balance={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
