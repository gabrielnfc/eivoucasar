'use client';

import { motion } from 'framer-motion';

interface WeddingAnimationProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
	delay?: number;
}

const sizeMap = {
	xs: 'w-6 h-6',
	sm: 'w-8 h-8',
	md: 'w-12 h-12',
	lg: 'w-16 h-16',
	xl: 'w-20 h-20',
};

export interface CSSAnimationProps {
	variant?: 'hero' | 'section' | 'minimal';
	className?: string;
}

// Coração pulsante com CSS puro - SUAVIZADO
export function CSSHeartAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-heartbeat 20s ease-in-out infinite'
					: 'heartbeat 12s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-40' : 'opacity-20'
				}`}
			>
				<span className="text-xl">❤️</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-red-300/15' : 'bg-red-300/10'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-glow 25s ease-in-out infinite'
							: 'glow 15s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-heartbeat {
					0%,
					100% {
						transform: scale(1) rotate(0deg);
						opacity: 0.4;
					}
					25% {
						transform: scale(1.1) rotate(2deg);
						opacity: 0.7;
					}
					50% {
						transform: scale(1.15) rotate(-1deg);
						opacity: 0.8;
					}
					75% {
						transform: scale(1.05) rotate(1deg);
						opacity: 0.6;
					}
				}

				@keyframes gentle-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.2;
					}
					50% {
						transform: scale(1.2);
						opacity: 0.4;
					}
				}

				@keyframes heartbeat {
					0%,
					100% {
						transform: scale(1) rotate(0deg);
					}
					25% {
						transform: scale(1.15) rotate(3deg);
					}
					50% {
						transform: scale(1.2) rotate(-2deg);
					}
					75% {
						transform: scale(1.1) rotate(1deg);
					}
				}

				@keyframes glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(1.5);
						opacity: 0.3;
					}
				}
			`}</style>
		</div>
	);
}

// Anéis de casamento - APENAS EMOJI, SEM CÍRCULOS
export function CSSRingsAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-ring-rotate 30s linear infinite'
					: 'ring-rotate 18s linear infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-35' : 'opacity-20'
				}`}
			>
				<span className="text-lg">💍</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-yellow-200/15' : 'bg-yellow-200/10'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-golden-glow 35s ease-in-out infinite'
							: 'golden-glow 20s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-ring-rotate {
					0% {
						transform: rotate(0deg) scale(1);
						opacity: 0.35;
					}
					25% {
						transform: rotate(90deg) scale(1.05);
						opacity: 0.6;
					}
					50% {
						transform: rotate(180deg) scale(1.1);
						opacity: 0.7;
					}
					75% {
						transform: rotate(270deg) scale(1.05);
						opacity: 0.5;
					}
					100% {
						transform: rotate(360deg) scale(1);
						opacity: 0.35;
					}
				}

				@keyframes gentle-golden-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.1;
					}
					50% {
						transform: scale(1.3);
						opacity: 0.3;
					}
				}

				@keyframes ring-rotate {
					0% {
						transform: rotate(0deg) scale(0.9);
					}
					50% {
						transform: rotate(180deg) scale(1.2);
					}
					100% {
						transform: rotate(360deg) scale(0.9);
					}
				}

				@keyframes golden-glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(1.8);
						opacity: 0.4;
					}
				}
			`}</style>
		</div>
	);
}

// Flor romântica - SUAVIZADA
export function CSSFlowerAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-flower-bloom 35s ease-in-out infinite'
					: 'flower-bloom 25s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-30' : 'opacity-15'
				}`}
			>
				<span className="text-lg">🌸</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-pink-200/15' : 'bg-pink-200/10'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-flower-glow 40s ease-in-out infinite'
							: 'flower-glow 30s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-flower-bloom {
					0%,
					100% {
						transform: rotate(0deg) scale(1);
						opacity: 0.3;
					}
					25% {
						transform: rotate(90deg) scale(1.05);
						opacity: 0.5;
					}
					50% {
						transform: rotate(180deg) scale(1.1);
						opacity: 0.6;
					}
					75% {
						transform: rotate(270deg) scale(1.05);
						opacity: 0.4;
					}
				}

				@keyframes gentle-flower-glow {
					0%,
					100% {
						transform: scale(0.9);
						opacity: 0.1;
					}
					50% {
						transform: scale(1.2);
						opacity: 0.25;
					}
				}

				@keyframes flower-bloom {
					0%,
					100% {
						transform: rotate(0deg) scale(0.9);
					}
					33% {
						transform: rotate(120deg) scale(1.2);
					}
					66% {
						transform: rotate(240deg) scale(1.1);
					}
				}

				@keyframes flower-glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(1.5);
						opacity: 0.3;
					}
				}
			`}</style>
		</div>
	);
}

// Buquê de flores - SUBSTITUINDO BORBOLETA
export function CSSBouquetAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-bouquet-sway 40s ease-in-out infinite'
					: 'bouquet-sway 28s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-30' : 'opacity-15'
				}`}
			>
				<span className="text-lg">💐</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-green-200/12' : 'bg-green-200/8'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-bouquet-glow 45s ease-in-out infinite'
							: 'bouquet-glow 32s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-bouquet-sway {
					0%,
					100% {
						transform: rotate(0deg) scale(1);
						opacity: 0.3;
					}
					25% {
						transform: rotate(3deg) scale(1.02);
						opacity: 0.5;
					}
					50% {
						transform: rotate(-2deg) scale(1.05);
						opacity: 0.6;
					}
					75% {
						transform: rotate(2deg) scale(1.02);
						opacity: 0.4;
					}
				}

				@keyframes gentle-bouquet-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.08;
					}
					50% {
						transform: scale(1.3);
						opacity: 0.2;
					}
				}

				@keyframes bouquet-sway {
					0%,
					100% {
						transform: rotate(-5deg) scale(0.9);
					}
					25% {
						transform: rotate(5deg) scale(1.1);
					}
					50% {
						transform: rotate(-3deg) scale(1.15);
					}
					75% {
						transform: rotate(3deg) scale(1);
					}
				}

				@keyframes bouquet-glow {
					0%,
					100% {
						transform: scale(0.6);
						opacity: 0;
					}
					50% {
						transform: scale(1.4);
						opacity: 0.25;
					}
				}
			`}</style>
		</div>
	);
}

// Casal de noivos - SEMPRE JUNTOS E HARMONIOSOS
export function CSSCoupleAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-couple-dance 50s ease-in-out infinite'
					: 'couple-dance 35s ease-in-out infinite',
				whiteSpace: 'nowrap',
				letterSpacing: '1px',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-35' : 'opacity-20'
				}`}
			>
				<span className="text-lg">👰‍♀️🤵‍♂️</span>
			</div>

			<style jsx>{`
				@keyframes gentle-couple-dance {
					0%,
					100% {
						transform: scale(1) rotate(0deg);
						opacity: 0.35;
					}
					25% {
						transform: scale(1.02) rotate(0.5deg);
						opacity: 0.6;
					}
					50% {
						transform: scale(1.05) rotate(-0.5deg);
						opacity: 0.7;
					}
					75% {
						transform: scale(1.02) rotate(0.25deg);
						opacity: 0.5;
					}
				}

				@keyframes couple-dance {
					0%,
					100% {
						transform: rotate(-2deg) scale(0.9);
					}
					25% {
						transform: rotate(2deg) scale(1.1);
					}
					50% {
						transform: rotate(-1deg) scale(1.2);
					}
					75% {
						transform: rotate(1deg) scale(1);
					}
				}
			`}</style>
		</div>
	);
}

// Igreja de casamento - NOVA ANIMAÇÃO
export function CSSChurchAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-church-glow 60s ease-in-out infinite'
					: 'church-glow 42s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-30' : 'opacity-15'
				}`}
			>
				<span className="text-lg">💒</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-purple-200/12' : 'bg-purple-200/8'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-divine-glow 65s ease-in-out infinite'
							: 'divine-glow 45s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-church-glow {
					0%,
					100% {
						transform: scale(1);
						opacity: 0.3;
					}
					33% {
						transform: scale(1.03);
						opacity: 0.5;
					}
					66% {
						transform: scale(1.05);
						opacity: 0.6;
					}
				}

				@keyframes gentle-divine-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.08;
					}
					50% {
						transform: scale(1.4);
						opacity: 0.2;
					}
				}

				@keyframes church-glow {
					0%,
					100% {
						transform: scale(0.9);
					}
					50% {
						transform: scale(1.3);
					}
				}

				@keyframes divine-glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(2);
						opacity: 0.4;
					}
				}
			`}</style>
		</div>
	);
}

// Taças de champanhe - NOVA ANIMAÇÃO
export function CSSToastAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-toast-clink 45s ease-in-out infinite'
					: 'toast-clink 32s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-30' : 'opacity-15'
				}`}
			>
				<span className="text-lg">🥂</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-amber-200/12' : 'bg-amber-200/8'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-champagne-glow 50s ease-in-out infinite'
							: 'champagne-glow 35s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-toast-clink {
					0%,
					100% {
						transform: rotate(0deg) scale(1);
						opacity: 0.3;
					}
					25% {
						transform: rotate(2deg) scale(1.02);
						opacity: 0.5;
					}
					50% {
						transform: rotate(-1deg) scale(1.05);
						opacity: 0.6;
					}
					75% {
						transform: rotate(1deg) scale(1.02);
						opacity: 0.4;
					}
				}

				@keyframes gentle-champagne-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.08;
					}
					50% {
						transform: scale(1.3);
						opacity: 0.2;
					}
				}

				@keyframes toast-clink {
					0%,
					100% {
						transform: rotate(-10deg) scale(0.9);
					}
					25% {
						transform: rotate(5deg) scale(1.1);
					}
					50% {
						transform: rotate(-5deg) scale(1.2);
					}
					75% {
						transform: rotate(2deg) scale(1);
					}
				}

				@keyframes champagne-glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(1.6);
						opacity: 0.3;
					}
				}
			`}</style>
		</div>
	);
}

// Sparkles mágicos - MUITO SUAVIZADO
export function CSSSparklesAnimation({
	variant = 'section',
	className,
}: CSSAnimationProps) {
	const isHero = variant === 'hero';

	return (
		<div
			className={`absolute z-1 pointer-events-none ${className}`}
			style={{
				animation: isHero
					? 'gentle-sparkle-twinkle 20s ease-in-out infinite'
					: 'sparkle-twinkle 12s ease-in-out infinite',
			}}
		>
			<div
				className={`relative inline-block ${
					isHero ? 'opacity-25' : 'opacity-12'
				}`}
			>
				<span className="text-sm">✨</span>
				<div
					className={`absolute inset-0 rounded-full ${
						isHero ? 'bg-yellow-200/15' : 'bg-yellow-200/10'
					} blur-sm`}
					style={{
						animation: isHero
							? 'gentle-sparkle-glow 25s ease-in-out infinite'
							: 'sparkle-glow 15s ease-in-out infinite',
					}}
				/>
			</div>

			<style jsx>{`
				@keyframes gentle-sparkle-twinkle {
					0%,
					100% {
						transform: scale(1) rotate(0deg);
						opacity: 0.25;
					}
					25% {
						transform: scale(1.1) rotate(90deg);
						opacity: 0.5;
					}
					50% {
						transform: scale(1.15) rotate(180deg);
						opacity: 0.6;
					}
					75% {
						transform: scale(1.05) rotate(270deg);
						opacity: 0.4;
					}
				}

				@keyframes gentle-sparkle-glow {
					0%,
					100% {
						transform: scale(0.8);
						opacity: 0.1;
					}
					50% {
						transform: scale(1.2);
						opacity: 0.3;
					}
				}

				@keyframes sparkle-twinkle {
					0%,
					100% {
						transform: scale(0.8) rotate(0deg);
					}
					25% {
						transform: scale(1.2) rotate(90deg);
					}
					50% {
						transform: scale(1.5) rotate(180deg);
					}
					75% {
						transform: scale(1) rotate(270deg);
					}
				}

				@keyframes sparkle-glow {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0;
					}
					50% {
						transform: scale(1.8);
						opacity: 0.4;
					}
				}
			`}</style>
		</div>
	);
}

// Componente de background combinado - ATUALIZADO
export function CSSWeddingBackground({
	density = 'medium',
	className = '',
}: {
	density?: 'low' | 'medium' | 'high';
	className?: string;
}) {
	const getAnimationCount = () => {
		switch (density) {
			case 'low':
				return {
					hearts: 2,
					rings: 1,
					flowers: 1,
					bouquets: 1,
					couples: 1,
					churches: 1,
					toasts: 1,
					sparkles: 2,
				};
			case 'medium':
				return {
					hearts: 3,
					rings: 2,
					flowers: 2,
					bouquets: 2,
					couples: 1,
					churches: 1,
					toasts: 2,
					sparkles: 3,
				};
			case 'high':
				return {
					hearts: 4,
					rings: 3,
					flowers: 3,
					bouquets: 3,
					couples: 2,
					churches: 2,
					toasts: 3,
					sparkles: 4,
				};
		}
	};

	const counts = getAnimationCount();

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
		>
			{/* Corações */}
			{[...Array(counts.hearts)].map((_, i) => (
				<div
					key={`css-heart-${i}`}
					className="absolute"
					style={{
						left: `${15 + ((i * 25) % 70)}%`,
						top: `${20 + ((i * 30) % 60)}%`,
					}}
				>
					<CSSHeartAnimation
						size={i % 2 === 0 ? 'md' : 'sm'}
						delay={i * 2000}
					/>
				</div>
			))}

			{/* Anéis */}
			{[...Array(counts.rings)].map((_, i) => (
				<div
					key={`css-rings-${i}`}
					className="absolute"
					style={{
						right: `${20 + ((i * 40) % 60)}%`,
						top: `${25 + ((i * 35) % 50)}%`,
					}}
				>
					<CSSRingsAnimation size="lg" delay={i * 3000} />
				</div>
			))}

			{/* Flores */}
			{[...Array(counts.flowers)].map((_, i) => (
				<div
					key={`css-flower-${i}`}
					className="absolute"
					style={{
						left: `${10 + ((i * 30) % 80)}%`,
						bottom: `${15 + ((i * 25) % 70)}%`,
					}}
				>
					<CSSFlowerAnimation
						size={i % 2 === 0 ? 'md' : 'sm'}
						delay={i * 1500}
					/>
				</div>
			))}

			{/* Buquês */}
			{[...Array(counts.bouquets)].map((_, i) => (
				<div
					key={`css-bouquet-${i}`}
					className="absolute"
					style={{
						right: `${15 + ((i * 35) % 70)}%`,
						bottom: `${20 + ((i * 40) % 60)}%`,
					}}
				>
					<CSSBouquetAnimation size="lg" delay={i * 4000} />
				</div>
			))}

			{/* Casal de noivos */}
			{[...Array(counts.couples)].map((_, i) => (
				<div
					key={`css-couple-${i}`}
					className="absolute"
					style={{
						left: `${25 + ((i * 50) % 50)}%`,
						top: `${40 + ((i * 30) % 40)}%`,
					}}
				>
					<CSSCoupleAnimation size="xl" delay={i * 6000} />
				</div>
			))}

			{/* Igrejas */}
			{[...Array(counts.churches)].map((_, i) => (
				<div
					key={`css-church-${i}`}
					className="absolute"
					style={{
						right: `${30 + ((i * 40) % 40)}%`,
						top: `${10 + ((i * 25) % 50)}%`,
					}}
				>
					<CSSChurchAnimation size="lg" delay={i * 5000} />
				</div>
			))}

			{/* Taças de champanhe */}
			{[...Array(counts.toasts)].map((_, i) => (
				<div
					key={`css-toast-${i}`}
					className="absolute"
					style={{
						left: `${35 + ((i * 30) % 60)}%`,
						bottom: `${35 + ((i * 25) % 50)}%`,
					}}
				>
					<CSSToastAnimation size="md" delay={i * 3500} />
				</div>
			))}

			{/* Sparkles */}
			{[...Array(counts.sparkles)].map((_, i) => (
				<div
					key={`css-sparkles-${i}`}
					className="absolute"
					style={{
						left: `${5 + ((i * 15) % 90)}%`,
						top: `${10 + ((i * 18) % 80)}%`,
					}}
				>
					<CSSSparklesAnimation size="sm" delay={i * 800} />
				</div>
			))}
		</div>
	);
}
