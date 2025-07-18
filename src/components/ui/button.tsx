import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
	{
		variants: {
			variant: {
				primary:
					'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95',
				secondary:
					'border-2 border-primary-200 bg-white dark:bg-neutral-800 text-primary-700 dark:text-primary-300 shadow-sm hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-md hover:-translate-y-0.5',
				accent:
					'bg-gradient-to-r from-accent-300 to-accent-500 text-neutral-900 shadow-lg hover:from-accent-400 hover:to-accent-600 hover:shadow-xl hover:-translate-y-0.5 active:scale-95',
				ghost:
					'text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300',
				link: 'text-primary-500 underline-offset-4 hover:underline hover:text-primary-600',
				gradient:
					'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-600 before:via-secondary-600 before:to-accent-600 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
				glass:
					'bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-white/20 dark:border-neutral-700/20 text-neutral-900 dark:text-neutral-100 shadow-xl hover:bg-white/80 dark:hover:bg-neutral-800/80 hover:shadow-2xl',
				outline:
					'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5',
				// Mantendo compatibilidade com variantes antigas
				default:
					'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95',
			},
			size: {
				xs: 'h-8 px-3 text-xs rounded-lg',
				sm: 'h-9 px-4 text-sm rounded-xl',
				md: 'h-11 px-6 text-base rounded-xl',
				lg: 'h-13 px-8 text-lg rounded-xl',
				xl: 'h-16 px-10 text-xl rounded-2xl',
				icon: 'h-10 w-10 rounded-xl',
				'icon-sm': 'h-8 w-8 rounded-lg',
				'icon-lg': 'h-12 w-12 rounded-xl',
			},
			animation: {
				none: '',
				pulse: 'animate-pulse',
				glow: 'animate-glow',
				bounce: 'hover:animate-bounce',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			animation: 'none',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			animation,
			asChild = false,
			loading = false,
			icon,
			iconPosition = 'left',
			children,
			disabled,
			...props
		},
		ref
	) => {
		const isDisabled = disabled || loading;

		return (
			<button
				className={cn(buttonVariants({ variant, size, animation, className }))}
				ref={ref}
				disabled={isDisabled}
				{...props}
			>
				{loading && (
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}

				{!loading && icon && iconPosition === 'left' && (
					<span className="mr-2">{icon}</span>
				)}

				{children}

				{!loading && icon && iconPosition === 'right' && (
					<span className="ml-2">{icon}</span>
				)}
			</button>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
