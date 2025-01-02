import DeviceAndActivity from '@/components/Settings/DeviceAndActivities';
import PaymentMethod from '@/components/Settings/PaymentMethod';
import TwoFactorAuth from '@/components/Settings/TwoFactorAuth';
import React from 'react';

const Settings = () => {
	return (
		<div>
			<div className='px-6 py-8'>
				<div>
					<PaymentMethod />
				</div>
				<div>
					<TwoFactorAuth />
				</div>
				<div>
					<DeviceAndActivity />
				</div>
			</div>
		</div>
	);
};

export default Settings;
