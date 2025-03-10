import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ICM - Agent Portal',
	description: 'ICM - Agent Portal',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='light'>
			<body className={inter.className} suppressHydrationWarning={true}>
				<StoreProvider>{children}</StoreProvider>
				<ToastContainer />
			</body>
		</html>
	);
}
