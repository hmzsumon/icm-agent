import React from 'react';

const ContactUsBanner = () => {
	return (
		<div className='contact-us-banner-bg bg-cover bg-center h-[200px] text-white space-y-2'>
			{/* <img src='/assets/live-banner.webp' alt='' /> */}
			<h2 className='text-3xl font-semibold  text-center pt-10'>
				We are here for you, 24/7.
			</h2>
			<div className=' flex items-center justify-center my-2'>
				<a
					href='https://icmmoney.tawk.help'
					target='_blank'
					rel='noreferrer'
					className='bg-icm-green text-gray-800 font-bold px-4 py-2 rounded-md hover:bg-green-500'
				>
					Launch Live Chat
				</a>
			</div>
		</div>
	);
};

export default ContactUsBanner;
