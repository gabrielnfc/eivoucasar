'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

// Adicionando estilos globais para animações suaves
const globalStyles = `
@keyframes gentle-pulse {
  0%, 100% { 
    opacity: 0.3;
  }
  50% { 
    opacity: 0.6;
  }
}
`;
import {
	CSSHeartAnimation,
	CSSRingsAnimation,
	CSSFlowerAnimation,
	CSSBouquetAnimation,
	CSSCoupleAnimation,
	CSSChurchAnimation,
	CSSToastAnimation,
	CSSSparklesAnimation,
} from './css-wedding-animations';

interface RomanticDecorationsProps {
	variant?: 'hero' | 'section' | 'minimal';
	className?: string;
}

export default function RomanticDecorations({
	variant = 'section',
	className = '',
}: RomanticDecorationsProps) {
	const getElementCount = () => {
		switch (variant) {
			case 'hero':
				return {
					hearts: 4,
					flowers: 3,
					rings: 3,
					bouquets: 3,
					petals: 10,
					cssHearts: 6,
					cssRings: 4,
					cssFlowers: 4,
					cssBouquets: 4,
					cssCouples: 3,
					cssChurches: 2,
					cssToasts: 4,
					cssSparkles: 8,
				};
			case 'section':
				return {
					hearts: 3,
					flowers: 2,
					rings: 2,
					bouquets: 2,
					petals: 6,
					cssHearts: 4,
					cssRings: 2,
					cssFlowers: 3,
					cssBouquets: 3,
					cssCouples: 2,
					cssChurches: 1,
					cssToasts: 2,
					cssSparkles: 5,
				};
			case 'minimal':
				return {
					hearts: 2,
					flowers: 1,
					rings: 1,
					bouquets: 1,
					petals: 4,
					cssHearts: 2,
					cssRings: 1,
					cssFlowers: 2,
					cssBouquets: 2,
					cssCouples: 1,
					cssChurches: 1,
					cssToasts: 1,
					cssSparkles: 3,
				};
			default:
				return {
					hearts: 3,
					flowers: 2,
					rings: 2,
					bouquets: 2,
					petals: 6,
					cssHearts: 4,
					cssRings: 2,
					cssFlowers: 3,
					cssBouquets: 3,
					cssCouples: 2,
					cssChurches: 1,
					cssToasts: 2,
					cssSparkles: 5,
				};
		}
	};

	// Função para gerar posições determinísticas (sem Math.random para evitar hydration mismatch)
	const generatePositions = (
		count: number,
		type: 'top' | 'bottom' | 'center' | 'corners' | 'edges' | 'couple-spotlight'
	) => {
		const positions = [];

		// Sequência determinística para variar posições sem Math.random()
		const deterministicOffsets = [
			3, 7, 2, 8, 1, 9, 4, 6, 5, 0, 3.5, 7.5, 2.5, 8.5,
		];

		switch (type) {
			case 'top':
				for (let i = 0; i < count; i++) {
					const offset = deterministicOffsets[i % deterministicOffsets.length];
					positions.push({
						left: `${5 + (i * 90) / count + offset}%`,
						top: `${5 + offset * 2.5}%`,
					});
				}
				break;
			case 'bottom':
				for (let i = 0; i < count; i++) {
					const offset = deterministicOffsets[i % deterministicOffsets.length];
					positions.push({
						left: `${5 + (i * 90) / count + offset}%`,
						bottom: `${5 + offset * 2}%`,
					});
				}
				break;
			case 'center':
				const centerPositions = [
					{ left: '25%', top: '35%' },
					{ left: '45%', top: '45%' },
					{ left: '65%', top: '40%' },
					{ left: '30%', top: '60%' },
					{ left: '55%', top: '55%' },
					{ left: '75%', top: '50%' },
					{ left: '20%', top: '50%' },
					{ left: '40%', top: '30%' },
				];
				for (let i = 0; i < Math.min(count, centerPositions.length); i++) {
					positions.push(centerPositions[i]);
				}
				break;
			case 'couple-spotlight':
				// Posições especiais para o casal sempre em destaque
				const couplePositions = [
					{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }, // Centro absoluto
					{ left: '25%', top: '35%', transform: 'translate(-50%, -50%)' }, // Centro-esquerda
					{ right: '25%', top: '45%', transform: 'translate(50%, -50%)' }, // Centro-direita
					{ left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }, // Centro-baixo
					{ left: '30%', top: '25%', transform: 'translate(-50%, -50%)' }, // Superior-esquerda
					{ right: '30%', top: '65%', transform: 'translate(50%, -50%)' }, // Inferior-direita
				];
				for (let i = 0; i < Math.min(count, couplePositions.length); i++) {
					positions.push(couplePositions[i]);
				}
				break;
			case 'corners':
				const cornerPositions = [
					{ left: '5%', top: '5%' },
					{ right: '5%', top: '5%' },
					{ left: '5%', bottom: '5%' },
					{ right: '5%', bottom: '5%' },
					{ left: '15%', top: '15%' },
					{ right: '15%', top: '15%' },
					{ left: '15%', bottom: '15%' },
					{ right: '15%', bottom: '15%' },
				];
				for (let i = 0; i < Math.min(count, cornerPositions.length); i++) {
					positions.push(cornerPositions[i]);
				}
				break;
			case 'edges':
				const edgePositions = [
					// Left edge
					{ left: '2%', top: '25%' },
					{ left: '4%', top: '45%' },
					{ left: '1%', top: '65%' },
					// Right edge
					{ right: '2%', top: '30%' },
					{ right: '4%', top: '50%' },
					{ right: '3%', top: '70%' },
					// Top edge
					{ left: '25%', top: '2%' },
					{ left: '45%', top: '4%' },
					{ left: '65%', top: '1%' },
					// Bottom edge
					{ left: '30%', bottom: '2%' },
					{ left: '50%', bottom: '4%' },
					{ left: '70%', bottom: '3%' },
				];
				for (let i = 0; i < Math.min(count, edgePositions.length); i++) {
					positions.push(edgePositions[i]);
				}
				break;
		}

		return positions;
	};

	// SVG Components for romantic elements (mantendo apenas os complementares)
	const FlowerSVG = ({
		size = 24,
		className = '',
	}: {
		size?: number;
		className?: string;
	}) => (
		<svg width={size} height={size} viewBox="0 0 24 24" className={className}>
			<path
				d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z"
				fill="currentColor"
			/>
			<path
				d="M12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18Z"
				fill="currentColor"
			/>
			<path
				d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z"
				fill="currentColor"
			/>
			<path
				d="M18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10Z"
				fill="currentColor"
			/>
			<circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
		</svg>
	);

	const RingSVG = ({
		size = 20,
		className = '',
	}: {
		size?: number;
		className?: string;
	}) => (
		<svg width={size} height={size} viewBox="0 0 24 24" className={className}>
			<circle
				cx="12"
				cy="12"
				r="8"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<circle cx="12" cy="8" r="2" fill="currentColor" />
		</svg>
	);

	const PetalSVG = ({
		size = 12,
		className = '',
	}: {
		size?: number;
		className?: string;
	}) => (
		<svg width={size} height={size} viewBox="0 0 24 24" className={className}>
			<path
				d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2Z"
				fill="currentColor"
				opacity="0.8"
			/>
		</svg>
	);

	const counts = getElementCount();

	// Gerar posições estratégicas para cada tipo de elemento
	const heartPositions = generatePositions(counts.cssHearts, 'center');
	const ringPositions = generatePositions(counts.cssRings, 'corners');
	const flowerPositions = generatePositions(counts.cssFlowers, 'edges');
	const bouquetPositions = generatePositions(counts.cssBouquets, 'bottom');
	const couplePositions = generatePositions(
		counts.cssCouples,
		'couple-spotlight'
	);
	const churchPositions = generatePositions(counts.cssChurches, 'top');
	const toastPositions = generatePositions(counts.cssToasts, 'bottom');
	const sparklePositions = generatePositions(counts.cssSparkles, 'edges');

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
		>
			{/* CSS Heart Animations - Distribuídos no centro */}
			{heartPositions.map((position, i) => (
				<div
					key={`css-heart-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSHeartAnimation variant={variant} />
				</div>
			))}

			{/* CSS Wedding Rings - Cantos estratégicos */}
			{ringPositions.map((position, i) => (
				<div
					key={`css-rings-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSRingsAnimation variant={variant} />
				</div>
			))}

			{/* CSS Romantic Flowers - Bordas */}
			{flowerPositions.map((position, i) => (
				<div
					key={`css-flower-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSFlowerAnimation variant={variant} />
				</div>
			))}

			{/* CSS Wedding Bouquets - Parte inferior */}
			{bouquetPositions.map((position, i) => (
				<div
					key={`css-bouquet-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSBouquetAnimation variant={variant} />
				</div>
			))}

			{/* CSS Wedding Couple - SEMPRE EM BACKGROUND */}
			{couplePositions.map((position, i) => (
				<div
					key={`css-couple-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSCoupleAnimation variant={variant} />
				</div>
			))}

			{/* CSS Wedding Church - Parte superior */}
			{churchPositions.map((position, i) => (
				<div
					key={`css-church-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSChurchAnimation variant={variant} />
				</div>
			))}

			{/* CSS Toast Glasses - Parte inferior para celebração */}
			{toastPositions.map((position, i) => (
				<div
					key={`css-toast-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSToastAnimation variant={variant} />
				</div>
			))}

			{/* CSS Sparkles - Espalhados pelas bordas */}
			{sparklePositions.map((position, i) => (
				<div
					key={`css-sparkles-${i}`}
					className="absolute z-1 pointer-events-none"
					style={position}
				>
					<CSSSparklesAnimation variant={variant} />
				</div>
			))}

			{/* Corações SVG complementares (reduzidos) */}
			{[...Array(counts.hearts)].map((_, i) => (
				<motion.div
					key={`svg-heart-${i}`}
					className={`absolute text-rose-400/${
						variant === 'hero' ? '15' : '10'
					} z-1 pointer-events-none`}
					style={{
						left: `${8 + ((i * 20) % 84)}%`,
						top: `${25 + ((i * 15) % 50)}%`,
					}}
					animate={{
						y: [0, -15, 0],
						x: [0, 3, 0],
						scale: [0.8, 0.95, 0.8],
						rotate: [0, 5, -5, 0],
						opacity: variant === 'hero' ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: variant === 'hero' ? 15 + i * 2 : 9 + i,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: i * 2,
					}}
				>
					<Heart size={10 + (i % 3) * 2} fill="currentColor" />
				</motion.div>
			))}

			{/* SVG Flowers complementares */}
			{[...Array(counts.flowers)].map((_, i) => (
				<motion.div
					key={`svg-flower-${i}`}
					className={`absolute text-pink-300/${
						variant === 'hero' ? '12' : '10'
					} z-1 pointer-events-none`}
					style={{
						left: `${30 + ((i * 20) % 50)}%`,
						top: `${40 + ((i * 15) % 35)}%`,
					}}
					animate={{
						rotate: [0, 360],
						scale: [1, 1.05, 1],
						opacity: variant === 'hero' ? [0.25, 0.5, 0.25] : [0.1, 0.3, 0.1],
					}}
					transition={{
						duration: variant === 'hero' ? 35 + i * 8 : 20 + i * 5,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: i * 4,
					}}
				>
					<FlowerSVG
						size={12 + (i % 2) * 3}
						className={`text-pink-400/${variant === 'hero' ? '25' : '20'}`}
					/>
				</motion.div>
			))}

			{/* Wedding Rings SVG complementares */}
			{[...Array(counts.rings)].map((_, i) => (
				<motion.div
					key={`svg-ring-${i}`}
					className="absolute text-yellow-400/8 z-1 pointer-events-none"
					style={{
						left: `${40 + ((i * 20) % 40)}%`,
						top: `${50 + ((i * 15) % 35)}%`,
					}}
					animate={{
						rotate: [0, 180, 360],
						y: [0, -8, 0],
						scale: [0.9, 0.95, 0.9],
					}}
					transition={{
						duration: 15 + i,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: i * 5,
					}}
				>
					<RingSVG size={14 + (i % 2) * 2} className="text-amber-400/15" />
				</motion.div>
			))}

			{/* Falling Petals SVG - Mais distribuídos */}
			{[...Array(counts.petals)].map((_, i) => (
				<motion.div
					key={`svg-petal-${i}`}
					className="absolute text-rose-300/8 z-1 pointer-events-none"
					style={{
						left: `${1 + ((i * 10) % 98)}%`,
						top: `-8%`,
					}}
					animate={{
						y: ['0vh', '108vh'],
						x: [0, 8, -8, 0],
						rotate: [0, 120, 240, 360],
						opacity: [0, 0.2, 0.1, 0],
					}}
					transition={{
						duration: 18 + i * 4,
						repeat: Infinity,
						ease: 'linear',
						delay: i * 3,
					}}
				>
					<PetalSVG size={4 + (i % 3)} className="text-pink-400/15" />
				</motion.div>
			))}

			{/* Sparkles tradicionais (complementar) */}
			{[...Array(variant === 'hero' ? 6 : variant === 'section' ? 3 : 2)].map(
				(_, i) => (
					<motion.div
						key={`svg-sparkle-${i}`}
						className={`absolute text-yellow-300/${
							variant === 'hero' ? '20' : '15'
						} z-1 pointer-events-none`}
						style={{
							left: `${12 + ((i * 15) % 76)}%`,
							top: `${55 + ((i * 10) % 35)}%`,
						}}
						animate={{
							scale: variant === 'hero' ? [0.8, 1.2, 0.8] : [0, 1, 0],
							opacity: variant === 'hero' ? [0.4, 0.8, 0.4] : [0, 0.6, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: variant === 'hero' ? 8 : 4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 1.2,
						}}
					>
						<Sparkles size={6 + (i % 3) * 2} />
					</motion.div>
				)
			)}

			{/* Wedding Themed Message Particles (apenas no hero) */}
			{variant === 'hero' && (
				<>
					{[
						'👰‍♀️🤵‍♂️',
						'💕',
						'💒',
						'🎊',
						'💐',
						'💖',
						'🌹',
						'🎉',
						'💫',
						'👰‍♀️🤵‍♂️',
						'💍',
					].map((emoji, i) => (
						<motion.div
							key={`emoji-${i}`}
							className="absolute text-base opacity-15 z-1 pointer-events-none"
							style={{
								left: `${15 + ((i * 8) % 70)}%`,
								top: `${60 + ((i * 6) % 30)}%`,
							}}
							animate={{
								y: [0, -10, 0],
								opacity: [0.15, 0.35, 0.15], // Sempre visível, nunca desaparece
								scale: [0.85, 0.95, 0.85],
							}}
							transition={{
								duration: 18 + i * 3, // Muito mais lento
								repeat: Infinity,
								ease: 'easeInOut',
								delay: i * 6, // Delays maiores para espalhar no tempo
							}}
						>
							{emoji}
						</motion.div>
					))}
				</>
			)}

			{/* Romantic Gradient Overlay - Mais sutil */}
			<div
				className={`absolute inset-0 bg-gradient-to-r from-rose-50/${
					variant === 'hero' ? '1' : '1'
				} via-pink-50/${variant === 'hero' ? '1' : '1'} to-purple-50/${
					variant === 'hero' ? '1' : '1'
				} z-1 pointer-events-none`}
				style={{
					animation:
						variant === 'hero'
							? 'gentle-pulse 12s ease-in-out infinite'
							: 'pulse 8s ease-in-out infinite',
				}}
			/>

			{/* Subtle Performance Overlay - Mais sutil */}
			<div className="absolute inset-0 bg-gradient-to-t from-white/0.2 via-transparent to-white/0.2 z-1 pointer-events-none" />

			{/* CSS Global para animação suave do hero */}
			<style jsx global>
				{globalStyles}
			</style>
		</div>
	);
}
