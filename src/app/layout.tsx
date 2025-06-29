import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'EiVouCasar! - Gamifique seu Casamento',
	description:
		'Transforme seu casamento em uma competição épica. Crie um site único e gamifique as contribuições dos convidados.',
	keywords: [
		'casamento',
		'site de casamento',
		'contribuições',
		'PIX',
		'gamificação',
	],
	authors: [{ name: 'EiVouCasar!' }],
	creator: 'EiVouCasar!',
	publisher: 'EiVouCasar!',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://eivoucasar.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: 'https://eivoucasar.com',
		title: 'EiVouCasar! - Gamifique seu Casamento',
		description:
			'Transforme seu casamento em uma competição épica. Crie um site único e gamifique as contribuições dos convidados.',
		siteName: 'EiVouCasar!',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'EiVouCasar! - Gamifique seu Casamento',
		description: 'Transforme seu casamento em uma competição épica.',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" className={inter.variable}>
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
