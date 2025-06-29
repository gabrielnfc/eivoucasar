import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
	showText?: boolean;
}

const sizeClasses = {
	sm: 'h-6 w-auto',
	md: 'h-8 w-auto',
	lg: 'h-12 w-auto',
	xl: 'h-16 w-auto',
};

export default function Logo({
	size = 'md',
	className,
	showText = false,
}: LogoProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Image
				src="/image/logo-svg-eivoucasar.svg"
				alt="EiVouCasar"
				width={500}
				height={118}
				className={cn(sizeClasses[size], 'transition-all duration-300')}
				priority
			/>
			{showText && (
				<span className="font-bold text-slate-900 dark:text-white text-xl">
					EiVouCasar
				</span>
			)}
		</div>
	);
}
