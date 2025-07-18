import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { CookieProvider } from '@/contexts/cookie-context';
import { Toaster } from 'react-hot-toast';
import CookieBanner from '@/components/cookies/cookie-banner';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Ei, vou casar!',
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
	icons: {
		icon: [
			{ url: '/favicon-heart.svg', type: 'image/svg+xml' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		shortcut: '/favicon-heart.svg',
	},
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: 'https://eivoucasar.com',
		title: 'Ei, vou casar!',
		description:
			'Transforme seu casamento em uma competição épica. Crie um site único e gamifique as contribuições dos convidados.',
		siteName: 'EiVouCasar!',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ei, vou casar!',
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
			    <head>
        {/* 🎭 FONTES ELEGANTES PARA ASSINATURAS */}
        <link
            href="https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Dancing+Script:wght@400;500;600;700&family=Allura:wght@400&family=Alex+Brush:wght@400&family=Kaushan+Script:wght@400&family=Satisfy:wght@400&family=Pacifico:wght@400&family=Courgette:wght@400&family=Lobster:wght@400&display=swap"
            rel="stylesheet"
        />
        
        {/* 📝 FONTES MODERNAS PARA TIPOGRAFIA REFINADA */}
        <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
            rel="stylesheet"
        />
    </head>
			<body className={`${inter.className} antialiased`}>
				<CookieProvider>
					<AuthProvider>
						{children}
						<CookieBanner />
						<Toaster
							position="top-right"
							toastOptions={{
								duration: 4000,
								style: {
									background: '#1e293b',
									color: '#f8fafc',
									border: '1px solid #334155',
									borderRadius: '12px',
									boxShadow:
										'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
								},
								success: {
									iconTheme: {
										primary: '#10b981',
										secondary: '#ffffff',
									},
								},
								error: {
									iconTheme: {
										primary: '#ef4444',
										secondary: '#ffffff',
									},
								},
							}}
						/>
					</AuthProvider>
				</CookieProvider>
			</body>
		</html>
	);
}
