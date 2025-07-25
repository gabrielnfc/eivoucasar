import { cn } from '@/lib/utils';
import { useId } from 'react';

interface LogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
	showText?: boolean;
}

const sizeDimensions = {
	sm: { width: 125, height: 30 },
	md: { width: 167, height: 39 },
	lg: { width: 250, height: 59 },
	xl: { width: 333, height: 79 },
};

export default function Logo({
	size = 'md',
	className,
	showText = false,
}: LogoProps) {
	const { width, height } = sizeDimensions[size];
	const uniqueId = useId();

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 500 118"
				className="transition-all duration-300"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					{/* Gradiente SEMPRE ESCURO para "Ei, vou" */}
					<linearGradient
						id={`eiVouGradient-${uniqueId}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop
							offset="0%"
							style={{ stopColor: '#0f172a', stopOpacity: 1 }}
						/>
						<stop
							offset="50%"
							style={{ stopColor: '#1e293b', stopOpacity: 1 }}
						/>
						<stop
							offset="100%"
							style={{ stopColor: '#334155', stopOpacity: 1 }}
						/>
					</linearGradient>

					{/* Gradiente rosa/colorido para "Casar" */}
					<linearGradient
						id={`casarGradientLight-${uniqueId}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop
							offset="0%"
							style={{ stopColor: '#ec4899', stopOpacity: 1 }}
						/>
						<stop
							offset="50%"
							style={{ stopColor: '#d946ef', stopOpacity: 1 }}
						/>
						<stop
							offset="100%"
							style={{ stopColor: '#8b5cf6', stopOpacity: 1 }}
						/>
					</linearGradient>

					<linearGradient
						id={`casarGradientDark-${uniqueId}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop
							offset="0%"
							style={{ stopColor: '#fda4af', stopOpacity: 1 }}
						/>
						<stop
							offset="50%"
							style={{ stopColor: '#f472b6', stopOpacity: 1 }}
						/>
						<stop
							offset="100%"
							style={{ stopColor: '#c084fc', stopOpacity: 1 }}
						/>
					</linearGradient>

					<linearGradient
						id={`heartGradient-${uniqueId}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop
							offset="0%"
							style={{ stopColor: '#f43f5e', stopOpacity: 1 }}
						/>
						<stop
							offset="30%"
							style={{ stopColor: '#ec4899', stopOpacity: 1 }}
						/>
						<stop
							offset="70%"
							style={{ stopColor: '#d946ef', stopOpacity: 1 }}
						/>
						<stop
							offset="100%"
							style={{ stopColor: '#8b5cf6', stopOpacity: 1 }}
						/>
					</linearGradient>

					<radialGradient
						id={`heartRadialGradient-${uniqueId}`}
						cx="50%"
						cy="50%"
						r="50%"
					>
						<stop
							offset="0%"
							style={{ stopColor: '#fda4af', stopOpacity: 1 }}
						/>
						<stop
							offset="50%"
							style={{ stopColor: '#f43f5e', stopOpacity: 1 }}
						/>
						<stop
							offset="100%"
							style={{ stopColor: '#be185d', stopOpacity: 1 }}
						/>
					</radialGradient>

					<filter
						id={`dropShadow-${uniqueId}`}
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feDropShadow
							dx="2"
							dy="4"
							stdDeviation="3"
							floodColor="#000000"
							floodOpacity="0.15"
						/>
					</filter>

					<filter
						id={`innerGlow-${uniqueId}`}
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					<filter
						id={`highlight-${uniqueId}`}
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feGaussianBlur stdDeviation="1" result="coloredBlur" />
						<feOffset dx="0" dy="-1" result="offsetBlur" />
						<feFlood
							floodColor="#ffffff"
							floodOpacity="0.3"
							result="whiteFlood"
						/>
						<feComposite
							in="whiteFlood"
							in2="offsetBlur"
							operator="in"
							result="coloredShadow"
						/>
						<feMerge>
							<feMergeNode in="SourceGraphic" />
							<feMergeNode in="coloredShadow" />
						</feMerge>
					</filter>
				</defs>

				<style>{`
					.heart-primary-${uniqueId} {
						animation: heartbeat-${uniqueId} 2s ease-in-out infinite;
						transform-origin: center;
					}
					
					.heart-secondary-${uniqueId} {
						animation: pulse-${uniqueId} 3s ease-in-out infinite;
						transform-origin: center;
					}
					
					@keyframes heartbeat-${uniqueId} {
						0%, 50%, 100% { 
							transform: scale(1); 
						}
						25% { 
							transform: scale(1.05); 
						}
						75% { 
							transform: scale(0.98); 
						}
					}
					
					@keyframes pulse-${uniqueId} {
						0%, 100% { 
							opacity: 1; 
							transform: scale(1);
						}
						50% { 
							opacity: 0.8; 
							transform: scale(1.02);
						}
					}
					
					/* "Ei, vou" sempre escuro */
					.ei-vou-${uniqueId} {
						fill: url(#eiVouGradient-${uniqueId});
					}
					
					/* "Casar" rosa/colorido */
					.casar-${uniqueId} {
						fill: url(#casarGradientLight-${uniqueId});
					}
					
					@media (prefers-color-scheme: dark) {
						.casar-${uniqueId} {
							fill: url(#casarGradientDark-${uniqueId});
						}
					}
					
					.logo-container-${uniqueId}:hover .heart-primary-${uniqueId} {
						animation-duration: 1.5s;
					}
					
					.logo-container-${uniqueId}:hover .heart-secondary-${uniqueId} {
						animation-duration: 2s;
					}
				`}</style>

				<g className={`logo-container-${uniqueId}`}>
					{/* GRUPO 1: "Ei, vou" - SEMPRE ESCURO */}
					<g
						className={`ei-vou-${uniqueId}`}
						filter={`url(#dropShadow-${uniqueId})`}
					>
						{/* E */}
						<path
							d="M140 63.5 l0 -25.5 8 0 8 0 0 3 c0 2.9 -0.1 3 -5 3 l-5 0 0 8 0 8 4 0 c3.8 0 4 0.2 4 2.9 0 2.7 -0.3 3 -3.7 3.3 l-3.8 0.3 0 8 0 8 5.3 0.3 c5 0.3 5.2 0.4 5.2 3.3 l0 2.9 -8.5 0 -8.5 0 0 -25.5z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* i (corpo) */}
						<path
							d="M165 71.6 c0 -9.2 0.1 -9.4 2.5 -9.8 1.3 -0.3 2.7 -0.3 3 0 0.3 0.3 0.5 4.6 0.5 9.7 l0 9.1 -3 0.2 -3 0.2 0 -9.4z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* i (ponto) */}
						<path
							d="M164.4 54.6 c-1.1 -2.8 0.4 -4.8 3.3 -4.4 2.2 0.2 2.8 0.8 2.8 2.8 0 2 -0.6 2.6 -2.8 2.8 -1.8 0.2 -2.9 -0.2 -3.3 -1.2z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* vírgula */}
						<path
							d="M182.7 85.3 c-0.4 -0.3 -0.2 -1.2 0.4 -1.9 0.9 -1.1 0.5 -1.6 -1.6 -2.4 -1.9 -0.7 -2.6 -1.6 -2.3 -3.2 0.7 -4.8 6.8 -2.8 6.8 2.1 -0.1 2.8 -2.3 6.5 -3.3 5.4z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* v */}
						<path
							d="M205.5 87 c-1.8 -3.2 -11.6 -41 -10.9 -42.1 0.3 -0.5 1.5 -0.9 2.8 -0.9 2.1 0 2.6 1.3 6.6 16 2.3 8.8 4.6 15.8 5 15.5 0.4 -0.2 3.1 -8.8 6.1 -19 5.4 -18.6 6.1 -19.9 9.7 -17.7 1.4 0.9 -4 21.9 -10 39.1 -3.1 8.8 -3.5 9.5 -6.1 9.6 -1.6 0 -3 -0.2 -3.2 -0.5z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* o */}
						<path
							d="M241.3 87 c-11.7 -7.1 -13.3 -30.6 -2.9 -42.6 3 -3.5 3.7 -3.8 9.7 -4.2 8.1 -0.5 12.2 1.9 15.9 9.3 2.1 4.2 2.5 6.4 2.5 14 0 7.9 -0.4 9.7 -2.8 14.8 -4.9 10 -14.4 13.6 -22.4 8.7z m13.5 -6.5 c7.4 -6.2 8.4 -24.7 1.7 -31.9 -3.5 -3.7 -10.5 -3.7 -14 0 -3.2 3.5 -4.8 9.3 -4.8 17.4 0 13.5 9.1 21.2 17.1 14.5z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* u */}
						<path
							d="M280.5 85.9 c-5.3 -4.7 -6.5 -10.1 -6.5 -30.1 l0 -16.8 3 0 3 0 0 17.3 c0 14.6 0.3 17.8 1.9 21.3 2.2 4.9 3.4 5.8 6.6 5 5.2 -1.3 7.5 -10.7 7.6 -30.4 l0.1 -13.2 2.9 0 2.9 0 0 13.3 c0 20.8 -2.6 30.7 -9.3 34.7 -4.6 2.8 -8 2.5 -12.2 -1.1z"
							filter={`url(#highlight-${uniqueId})`}
						/>
					</g>

					{/* GRUPO 2: "Casar" - ADAPTATIVO */}
					<g
						className={`casar-${uniqueId}`}
						filter={`url(#dropShadow-${uniqueId})`}
					>
						{/* C */}
						<path
							d="M321.5 87.6 c-7.7 -3.4 -12.2 -13.9 -11.1 -26.3 1.4 -17.3 11.1 -26.5 21.3 -20.3 3.5 2.1 6.8 7.4 5.9 9.6 -1 2.6 -4.3 1.5 -6.5 -2.1 -2.5 -4.3 -6.8 -4.8 -10.1 -1.3 -5.2 5.6 -6.5 22.8 -2.3 30 4.2 7.2 10.9 7.6 13.9 0.8 1.3 -3 2.4 -4 4.1 -4 5.2 0 0.9 11 -5.3 13.6 -4.1 1.7 -6 1.7 -9.9 0z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* a */}
						<path
							d="M369.8 83.3 l-1.4 -7.8 -5.8 -0.5 c-6.1 -0.6 -8.6 0.5 -8.6 3.6 0 0.8 -0.7 3 -1.5 5 -1.3 3.1 -1.7 3.4 -3.5 2.4 -1.1 -0.6 -2 -1.7 -2 -2.4 0 -0.8 3 -11 6.6 -22.8 3.7 -11.7 6.9 -22.1 7.1 -23 0.6 -2.1 3.6 -2.3 5.5 -0.4 0.9 0.8 3.2 11.2 5.6 24.7 5.4 30.8 5.2 28.3 2.1 28.7 -2.6 0.3 -2.7 0.1 -4.1 -7.5z m-3.4 -15.2 c0.3 -0.4 -0.1 -4.1 -0.8 -8 -1.3 -6.8 -2.1 -9 -3 -8 -0.9 1.1 -5.3 15.8 -4.8 16.3 0.9 0.9 8 0.7 8.6 -0.3z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* s */}
						<path
							d="M389.1 87.3 c-1.9 -1 -4.1 -2.8 -4.8 -4 -1.3 -1.9 -1.2 -2.3 0.7 -3.3 1.8 -1 2.6 -0.8 4.4 0.9 3 2.8 5.2 2.6 7.2 -0.4 2.1 -3.2 1.3 -5.2 -4.8 -12 -5.9 -6.6 -7.8 -10.4 -7.8 -16 0 -10.2 7.6 -16.3 16.1 -12.9 4.9 2 6.9 5.2 6.9 10.9 0 4.2 -0.2 4.6 -2.2 4.3 -1.6 -0.2 -2.4 -1.2 -2.9 -3.6 -2 -9.8 -11.9 -9.1 -11.9 0.9 0 5 1.1 7.1 6.7 13.1 7.2 7.8 8.4 14.5 3.6 19.7 -3.6 3.9 -6.9 4.6 -11.2 2.4z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* a */}
						<path
							d="M439.6 89.3 c-0.3 -1 -1 -4.6 -1.6 -7.9 l-1.2 -6.1 -5.7 -0.6 c-6.6 -0.7 -7.2 -0.3 -9.5 7 -1.5 4.6 -2 5.1 -3.9 4.4 -1.1 -0.4 -2.2 -1.2 -2.3 -1.7 -0.2 -0.5 3 -11.5 7 -24.4 l7.2 -23.5 2.8 0.2 c1.6 0.1 3 0.3 3.1 0.5 0.4 0.4 9.5 50.9 9.5 52.6 0 1.9 -4.8 1.5 -5.4 -0.5z m-4.7 -23.5 c-0.1 -4.9 -2.3 -12.9 -3.4 -12.9 -0.8 0 -5.4 12.9 -5.5 15.4 0 0.4 2 0.7 4.5 0.7 4.4 0 4.5 -0.1 4.4 -3.2z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* r */}
						<path
							d="M452.7 87.3 c-0.4 -0.3 -0.7 -11.4 -0.7 -24.5 l0 -23.8 5.4 0 c10 0 16 6.6 16 17.6 0 5.2 -0.5 6.9 -2.8 10.3 -1.6 2.3 -3.3 4.1 -3.7 4.1 -1.5 0 -1 2.7 0.8 4.1 2.1 1.8 5.6 9.6 4.8 10.9 -1.3 2 -4.5 1 -5.6 -1.7 -1.2 -3.4 -5.8 -8.3 -7.6 -8.3 -0.9 0 -1.3 1.6 -1.3 5.4 0 4 -0.4 5.5 -1.6 6 -2 0.8 -2.9 0.8 -3.7 -0.1z m9.4 -20 c3.2 -1.9 5.9 -6.8 5.9 -10.7 0 -6 -4.1 -11.6 -8.4 -11.6 -1.4 0 -1.6 1.8 -1.6 12 0 6.6 0.3 12 0.6 12 0.3 0 1.9 -0.8 3.5 -1.7z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* ponto final */}
						<path
							d="M484.1 87.7 c-1.7 -2.1 -0.3 -4.7 2.6 -4.7 2.1 0 2.4 0.4 2.1 2.7 -0.3 3.1 -2.9 4.1 -4.7 2z"
							filter={`url(#highlight-${uniqueId})`}
						/>
						{/* r (final) */}
						<path
							d="M483.7 76.4 c-0.9 -0.9 -0.8 -35.8 0.2 -37.2 0.4 -0.8 1.7 -1.2 2.7 -1 1.8 0.3 1.9 1.6 2.2 19.6 l0.2 19.2 -2.3 0 c-1.3 0 -2.6 -0.3 -3 -0.6z"
							filter={`url(#highlight-${uniqueId})`}
						/>
					</g>

					{/* CORAÇÕES - Mantidos iguais */}
					<g
						fill={`url(#heartGradient-${uniqueId})`}
						filter={`url(#dropShadow-${uniqueId})`}
					>
						<path
							className={`heart-primary-${uniqueId}`}
							d="M71.1 96.9 c-3.9 -8.3 -4.6 -11.9 -2.3 -11.9 0.8 0 1.6 1.6 6.1 12.3 1.1 2.6 2.7 4.7 3.4 4.7 2 0 19.6 -7.4 28.2 -11.8 8.8 -4.5 18.9 -14.2 19.8 -19.1 1.4 -7.1 -0.8 -11.8 -7.8 -16.5 -6.5 -4.4 -14.7 -3.3 -20.5 2.8 l-2.4 2.7 -1.2 -6.1 c-2.1 -10.1 -7.4 -15 -16.4 -15 -10.9 0 -17.1 9.6 -14.9 23.3 0.8 4.9 0.7 6.3 -0.4 7.5 -1.3 1.2 -1.6 1 -2.2 -1.9 -0.4 -1.9 -0.8 -6.8 -0.8 -11 -0.1 -6.5 0.3 -8.3 2.6 -12.1 3.7 -6.3 8.2 -8.8 16.1 -8.8 10.1 0 15.5 4.4 19 15.3 0.5 1.6 0.8 1.6 4.6 -0.4 5.9 -3.1 14.8 -2.2 19.9 1.9 5.6 4.5 8.1 8.8 8.1 14 0 9.2 -6.7 17.6 -19.9 25 -6.4 3.5 -31.6 14.2 -33.7 14.2 -0.6 0 -3 -4.1 -5.3 -9.1z"
							fill={`url(#heartRadialGradient-${uniqueId})`}
							filter={`url(#innerGlow-${uniqueId})`}
						/>

						<path
							className={`heart-secondary-${uniqueId}`}
							d="M48.9 84.3 c-15.3 -13.7 -29 -30.1 -33.7 -40.3 -5.4 -11.8 -2.7 -23.9 6.6 -30.5 3.8 -2.6 5.4 -3 12.1 -3.3 9.1 -0.5 12.6 0.9 18.2 7.1 l3.6 3.9 2.2 -3.1 c3.9 -5.5 9.8 -8.1 18 -8.1 10.9 0 18 4.5 21.6 13.8 1.7 4.1 1.7 12.3 0.1 13.9 -1 1.1 -3.6 -3.1 -3 -4.9 0.8 -2.7 -1.4 -9.4 -4.2 -12.8 -3.4 -4 -8.6 -6.1 -14.9 -6.2 -8 -0.1 -13.9 4.1 -18.3 12.6 l-1.9 4 -1.8 -3.5 c-6 -11.6 -14.1 -15.7 -24.1 -12.3 -8.8 2.9 -12.4 7.9 -12.4 17.1 0 6.8 3.3 14.6 9.9 23.3 4.6 6.2 27 29 28.5 29 1.3 0 17.6 -16.1 24.8 -24.6 3.4 -4.1 6.6 -7.4 7 -7.4 0.3 0 0.8 0.8 1 1.8 0.2 1 -2 4.7 -5.4 8.9 -6 7.4 -24.9 25.6 -27.2 26.1 -0.7 0.2 -3.7 -1.9 -6.7 -4.5z"
							filter={`url(#innerGlow-${uniqueId})`}
						/>
					</g>
				</g>
			</svg>
			{showText && (
				<span className="font-bold text-slate-900 dark:text-white text-xl">
					EiVouCasar
				</span>
			)}
		</div>
	);
}
