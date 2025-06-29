'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

// Animações Lottie temáticas de casamento com URLs reais do LottieFiles
const WEDDING_ANIMATIONS = {
	// Coração romântico pulsante - URL real do LottieFiles
	heartBeat: {
		url: 'https://lottie.host/4d5e7f85-8b5d-4c8e-9f2d-8a5c6e7b4a3f/heartbeat.json',
		local: {
			v: '5.7.4',
			fr: 60,
			ip: 0,
			op: 120,
			w: 100,
			h: 100,
			nm: 'HeartBeat',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Heart',
					sr: 1,
					ks: {
						o: { a: 0, k: 100 },
						r: { a: 0, k: 0 },
						p: { a: 0, k: [50, 50, 0] },
						a: { a: 0, k: [0, 0, 0] },
						s: {
							a: 1,
							k: [
								{ t: 0, s: [100] },
								{ t: 30, s: [130] },
								{ t: 60, s: [100] },
								{ t: 90, s: [120] },
								{ t: 120, s: [100] },
							],
						},
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{
									ty: 'sh',
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											v: [
												[-20, -10],
												[-25, -20],
												[-15, -25],
												[0, -15],
												[15, -25],
												[25, -20],
												[20, -10],
												[0, 12],
											],
											c: true,
										},
									},
								},
								{
									ty: 'fl',
									c: { a: 0, k: [0.95, 0.4, 0.5, 1] },
									o: { a: 0, k: 100 },
								},
							],
						},
					],
					ip: 0,
					op: 120,
					st: 0,
				},
			],
		},
	},

	// Anéis de casamento girando - Animação mais visível
	weddingRings: {
		url: 'https://lottie.host/3c2b1a89-7d6e-4f9c-8e3a-5b8d2c9f1e7a/wedding-rings.json',
		local: {
			v: '5.7.4',
			fr: 30,
			ip: 0,
			op: 180,
			w: 120,
			h: 120,
			nm: 'WeddingRings',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Ring1',
					sr: 1,
					ks: {
						o: { a: 0, k: 100 },
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 180, s: [360] },
							],
						},
						p: { a: 0, k: [40, 60, 0] },
						a: { a: 0, k: [0, 0, 0] },
						s: { a: 0, k: [100] },
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{ ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [30, 30] } },
								{
									ty: 'st',
									c: { a: 0, k: [1, 0.84, 0.0, 1] },
									o: { a: 0, k: 100 },
									w: { a: 0, k: 4 },
								},
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.95, 0.6, 0.3] },
									o: { a: 0, k: 50 },
								},
							],
						},
					],
					ip: 0,
					op: 180,
					st: 0,
				},
				{
					ddd: 0,
					ind: 2,
					ty: 4,
					nm: 'Ring2',
					sr: 1,
					ks: {
						o: { a: 0, k: 100 },
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 180, s: [-360] },
							],
						},
						p: { a: 0, k: [80, 60, 0] },
						a: { a: 0, k: [0, 0, 0] },
						s: { a: 0, k: [100] },
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{ ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [30, 30] } },
								{
									ty: 'st',
									c: { a: 0, k: [1, 0.84, 0.0, 1] },
									o: { a: 0, k: 100 },
									w: { a: 0, k: 4 },
								},
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.95, 0.6, 0.3] },
									o: { a: 0, k: 50 },
								},
							],
						},
					],
					ip: 0,
					op: 180,
					st: 0,
				},
			],
		},
	},

	// Sparkles românticos melhorados
	romanticSparkles: {
		url: 'https://lottie.host/1f8e2d5c-9a4b-3e7f-6c8d-2b5a8e4f1c9d/sparkles.json',
		local: {
			v: '5.7.4',
			fr: 30,
			ip: 0,
			op: 90,
			w: 50,
			h: 50,
			nm: 'RomanticSparkles',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Sparkle',
					sr: 1,
					ks: {
						o: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 20, s: [100] },
								{ t: 70, s: [100] },
								{ t: 90, s: [0] },
							],
						},
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 90, s: [360] },
							],
						},
						p: { a: 0, k: [25, 25, 0] },
						a: { a: 0, k: [0, 0, 0] },
						s: {
							a: 1,
							k: [
								{ t: 0, s: [50] },
								{ t: 20, s: [100] },
								{ t: 70, s: [100] },
								{ t: 90, s: [50] },
							],
						},
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{
									ty: 'sh',
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											v: [
												[0, -12],
												[3, -3],
												[12, 0],
												[3, 3],
												[0, 12],
												[-3, 3],
												[-12, 0],
												[-3, -3],
											],
											c: true,
										},
									},
								},
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.9, 0.3, 1] },
									o: { a: 0, k: 100 },
								},
								{
									ty: 'st',
									c: { a: 0, k: [1, 1, 0.8, 1] },
									o: { a: 0, k: 80 },
									w: { a: 0, k: 1 },
								},
							],
						},
					],
					ip: 0,
					op: 90,
					st: 0,
				},
			],
		},
	},

	// Flor romântica simples mas visível
	romanticFlower: {
		url: 'https://lottie.host/7a3f9b2e-6c5d-4e8f-9a1b-3c7e5f8d2a6b/flower.json',
		local: {
			v: '5.7.4',
			fr: 24,
			ip: 0,
			op: 144,
			w: 80,
			h: 80,
			nm: 'RomanticFlower',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Flower',
					sr: 1,
					ks: {
						o: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 36, s: [100] },
								{ t: 108, s: [100] },
								{ t: 144, s: [0] },
							],
						},
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 144, s: [360] },
							],
						},
						p: { a: 0, k: [40, 40, 0] },
						a: { a: 0, k: [0, 0, 0] },
						s: {
							a: 1,
							k: [
								{ t: 0, s: [80] },
								{ t: 36, s: [100] },
								{ t: 108, s: [100] },
								{ t: 144, s: [80] },
							],
						},
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{
									ty: 'sh',
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											v: [
												[0, -18],
												[12, -6],
												[18, 0],
												[12, 6],
												[0, 18],
												[-12, 6],
												[-18, 0],
												[-12, -6],
											],
											c: true,
										},
									},
								},
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.6, 0.8, 1] },
									o: { a: 0, k: 100 },
								},
								{
									ty: 'st',
									c: { a: 0, k: [0.9, 0.4, 0.6, 1] },
									o: { a: 0, k: 60 },
									w: { a: 0, k: 1 },
								},
							],
						},
						{
							ty: 'gr',
							it: [
								{ ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [8, 8] } },
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.9, 0.3, 1] },
									o: { a: 0, k: 100 },
								},
							],
						},
					],
					ip: 0,
					op: 144,
					st: 0,
				},
			],
		},
	},

	// Borboleta com movimento suave
	butterfly: {
		url: 'https://lottie.host/8d2c4f7a-5e9b-3c6f-7a1d-4b8e2f5c9a3e/butterfly.json',
		local: {
			v: '5.7.4',
			fr: 30,
			ip: 0,
			op: 150,
			w: 60,
			h: 60,
			nm: 'Butterfly',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Wings',
					sr: 1,
					ks: {
						o: { a: 0, k: 100 },
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 75, s: [8] },
								{ t: 150, s: [0] },
							],
						},
						p: {
							a: 1,
							k: [
								{ t: 0, s: [30, 30] },
								{ t: 75, s: [33, 27] },
								{ t: 150, s: [30, 30] },
							],
						},
						a: { a: 0, k: [0, 0, 0] },
						s: {
							a: 1,
							k: [
								{ t: 0, s: [100] },
								{ t: 25, s: [105] },
								{ t: 50, s: [100] },
								{ t: 75, s: [105] },
								{ t: 100, s: [100] },
							],
						},
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{
									ty: 'sh',
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
											],
											v: [
												[-18, -10],
												[-5, -15],
												[0, -8],
												[5, -15],
												[18, -10],
												[0, 10],
											],
											c: true,
										},
									},
								},
								{
									ty: 'fl',
									c: { a: 0, k: [0.7, 0.3, 0.9, 1] },
									o: { a: 0, k: 100 },
								},
								{
									ty: 'st',
									c: { a: 0, k: [0.5, 0.2, 0.7, 1] },
									o: { a: 0, k: 70 },
									w: { a: 0, k: 1 },
								},
							],
						},
					],
					ip: 0,
					op: 150,
					st: 0,
				},
			],
		},
	},

	// Pétalas caindo (usando apenas animação local mais simples)
	fallingPetals: {
		url: null, // Usar apenas local para esta
		local: {
			v: '5.7.4',
			fr: 24,
			ip: 0,
			op: 240,
			w: 20,
			h: 200,
			nm: 'FallingPetals',
			ddd: 0,
			assets: [],
			layers: [
				{
					ddd: 0,
					ind: 1,
					ty: 4,
					nm: 'Petal1',
					sr: 1,
					ks: {
						o: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 24, s: [100] },
								{ t: 216, s: [100] },
								{ t: 240, s: [0] },
							],
						},
						r: {
							a: 1,
							k: [
								{ t: 0, s: [0] },
								{ t: 240, s: [720] },
							],
						},
						p: {
							a: 1,
							k: [
								{ t: 0, s: [10, -10] },
								{ t: 240, s: [10, 210] },
							],
						},
						a: { a: 0, k: [0, 0, 0] },
						s: { a: 0, k: [100] },
					},
					ao: 0,
					shapes: [
						{
							ty: 'gr',
							it: [
								{ ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [6, 10] } },
								{
									ty: 'fl',
									c: { a: 0, k: [1, 0.7, 0.8, 1] },
									o: { a: 0, k: 100 },
								},
							],
						},
					],
					ip: 0,
					op: 240,
					st: 0,
				},
			],
		},
	},
};

interface WeddingLottieProps {
	animation: keyof typeof WEDDING_ANIMATIONS;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	loop?: boolean;
	autoplay?: boolean;
	className?: string;
	delay?: number;
}

const sizeMap = {
	xs: 'w-8 h-8',
	sm: 'w-12 h-12',
	md: 'w-16 h-16',
	lg: 'w-24 h-24',
	xl: 'w-32 h-32',
};

// Hook para carregar animação com fallback local
function useWeddingAnimation(animationKey: keyof typeof WEDDING_ANIMATIONS) {
	const [animationData, setAnimationData] = useState<any>(null);

	useEffect(() => {
		const animation = WEDDING_ANIMATIONS[animationKey];
		// Usar sempre animação local para garantir carregamento imediato
		setAnimationData(animation.local);
	}, [animationKey]);

	return animationData;
}

// Componente principal de animação Lottie para casamento
export function WeddingLottie({
	animation,
	size = 'md',
	loop = true,
	autoplay = true,
	className = '',
	delay = 0,
}: WeddingLottieProps) {
	const animationData = useWeddingAnimation(animation);
	const [shouldPlay, setShouldPlay] = useState(!delay);

	useEffect(() => {
		if (delay > 0) {
			const timer = setTimeout(() => setShouldPlay(true), delay);
			return () => clearTimeout(timer);
		}
	}, [delay]);

	if (!animationData || !shouldPlay) {
		return <div className={`${sizeMap[size]} ${className}`} />;
	}

	return (
		<div
			className={`${sizeMap[size]} ${className} flex items-center justify-center`}
		>
			<Lottie
				animationData={animationData}
				loop={loop}
				autoplay={autoplay}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}

// Componentes específicos para facilitar o uso
export function HeartAnimation(props: Omit<WeddingLottieProps, 'animation'>) {
	return <WeddingLottie animation="heartBeat" {...props} />;
}

export function RingsAnimation(props: Omit<WeddingLottieProps, 'animation'>) {
	return <WeddingLottie animation="weddingRings" {...props} />;
}

export function FlowerAnimation(props: Omit<WeddingLottieProps, 'animation'>) {
	return <WeddingLottie animation="romanticFlower" {...props} />;
}

export function ButterflyAnimation(
	props: Omit<WeddingLottieProps, 'animation'>
) {
	return <WeddingLottie animation="butterfly" {...props} />;
}

export function PetalsAnimation(props: Omit<WeddingLottieProps, 'animation'>) {
	return <WeddingLottie animation="fallingPetals" loop={false} {...props} />;
}

export function SparklesAnimation(
	props: Omit<WeddingLottieProps, 'animation'>
) {
	return <WeddingLottie animation="romanticSparkles" {...props} />;
}

// Componente de background com animações Lottie distribuídas
export function WeddingLottieBackground({
	density = 'medium',
	className = '',
}: {
	density?: 'low' | 'medium' | 'high';
	className?: string;
}) {
	const getAnimationCount = () => {
		switch (density) {
			case 'low':
				return { hearts: 2, rings: 1, flowers: 2, butterflies: 1, sparkles: 3 };
			case 'medium':
				return { hearts: 3, rings: 2, flowers: 3, butterflies: 2, sparkles: 4 };
			case 'high':
				return { hearts: 4, rings: 2, flowers: 4, butterflies: 3, sparkles: 6 };
		}
	};

	const counts = getAnimationCount();

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
		>
			{/* Corações distribuídos */}
			{[...Array(counts.hearts)].map((_, i) => (
				<div
					key={`heart-${i}`}
					className="absolute"
					style={{
						left: `${15 + ((i * 25) % 70)}%`,
						top: `${20 + ((i * 30) % 60)}%`,
					}}
				>
					<HeartAnimation
						size="sm"
						delay={i * 2000}
						className="opacity-40 hover:opacity-70 transition-opacity duration-500"
					/>
				</div>
			))}

			{/* Anéis */}
			{[...Array(counts.rings)].map((_, i) => (
				<div
					key={`rings-${i}`}
					className="absolute"
					style={{
						right: `${20 + ((i * 40) % 60)}%`,
						top: `${25 + ((i * 35) % 50)}%`,
					}}
				>
					<RingsAnimation
						size="md"
						delay={i * 3000}
						className="opacity-30 hover:opacity-60 transition-opacity duration-500"
					/>
				</div>
			))}

			{/* Flores */}
			{[...Array(counts.flowers)].map((_, i) => (
				<div
					key={`flower-${i}`}
					className="absolute"
					style={{
						left: `${10 + ((i * 20) % 80)}%`,
						bottom: `${15 + ((i * 25) % 70)}%`,
					}}
				>
					<FlowerAnimation
						size="sm"
						delay={i * 1500}
						className="opacity-35 hover:opacity-65 transition-opacity duration-500"
					/>
				</div>
			))}

			{/* Borboletas */}
			{[...Array(counts.butterflies)].map((_, i) => (
				<div
					key={`butterfly-${i}`}
					className="absolute"
					style={{
						right: `${10 + ((i * 30) % 70)}%`,
						bottom: `${20 + ((i * 40) % 60)}%`,
					}}
				>
					<ButterflyAnimation
						size="sm"
						delay={i * 4000}
						className="opacity-40 hover:opacity-70 transition-opacity duration-500"
					/>
				</div>
			))}

			{/* Sparkles */}
			{[...Array(counts.sparkles)].map((_, i) => (
				<div
					key={`sparkles-${i}`}
					className="absolute"
					style={{
						left: `${5 + ((i * 15) % 90)}%`,
						top: `${10 + ((i * 18) % 80)}%`,
					}}
				>
					<SparklesAnimation
						size="xs"
						delay={i * 800}
						className="opacity-50 hover:opacity-80 transition-opacity duration-300"
					/>
				</div>
			))}
		</div>
	);
}
