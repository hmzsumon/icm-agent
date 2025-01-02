import { BiTransfer } from 'react-icons/bi';
import {
	MdOutlineArrowRightAlt,
	MdOutlineDownloadForOffline,
} from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { SiBinance } from 'react-icons/si';
import { Card } from 'flowbite-react';
import { formDateWithDayMonthTime, formatBalance } from '@/lib/functions';
import { FaMinus, FaPlus } from 'react-icons/fa6';
const TransactionCards = ({ transaction }: any) => {
	const {
		unique_id,
		transactionType,
		amount,
		purpose,
		createdAt,
		isCashIn,
		isCashOut,
	} = transaction;
	return (
		<div>
			{/* Done Status */}
			<Card className=''>
				<div className=' flex items-center justify-between'>
					<div className=''>
						<p className='text-primary text-sm font-medium'>{purpose}</p>
						<div className=' text-xs text-gray-500 font-semibold my-1'>
							<p>{formDateWithDayMonthTime(createdAt)}</p>
							<p>ID: {unique_id}</p>
						</div>
					</div>

					<div
						className={`flex items-center justify-center 
						${isCashIn ? ' text-green-500' : ' text-red-500'}
						 gap-1 font-semibold text-xs md:text-sm`}
					>
						<GoDotFill />
						{isCashIn ? (
							<span>Cash In</span>
						) : isCashOut ? (
							<span>Cash Out</span>
						) : (
							<span>Transfer</span>
						)}
					</div>
					<div className=''>
						<p
							className={` font-semibold flex ${
								isCashIn ? ' text-green-500' : ' text-red-500'
							} items-center gap-1 text-xs md:text-sm`}
						>
							{isCashIn ? (
								<FaPlus className='text-green-500' />
							) : isCashOut ? (
								<FaMinus className='text-red-500' />
							) : (
								<SiBinance className='text-blue-500' />
							)}
							{formatBalance(amount)} USDT
						</p>
					</div>
				</div>
				<hr />
				{/* For description */}
				<div>
					<p className=' text-xs font-semibold'>{transaction?.description}</p>
				</div>
			</Card>
		</div>
	);
};

export default TransactionCards;
