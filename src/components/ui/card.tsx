import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-2xl p-6 transition-all duration-300', {
	variants: {
		variant: {
			default:
				'border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md',
			elevated:
				'border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl hover:-translate-y-1',
			glass:
				'border border-white/20 dark:border-neutral-700/20 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-xl',
			gradient:
				'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-100 dark:border-primary-800 shadow-lg',
			romantic:
				'bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 dark:from-primary-900/20 dark:via-accent-900/20 dark:to-secondary-900/20 border border-primary-100 dark:border-primary-800 shadow-romantic',
			outline:
				'border-2 border-primary-200 dark:border-primary-700 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/10',
			flat: 'bg-neutral-50 dark:bg-neutral-900 border-0',
		},
		size: {
			sm: 'p-4 rounded-xl',
			md: 'p-6 rounded-2xl',
			lg: 'p-8 rounded-2xl',
			xl: 'p-10 rounded-3xl',
		},
		interactive: {
			none: '',
			hover:
				'hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer',
			clickable:
				'hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:scale-105 cursor-pointer active:scale-95',
			magnetic:
				'hover:scale-110 cursor-pointer transition-transform duration-300',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
		interactive: 'none',
	},
});

export interface CardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, size, interactive, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(cardVariants({ variant, size, interactive, className }))}
			{...props}
		/>
	)
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { centered?: boolean }
>(({ className, centered = false, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex flex-col space-y-1.5',
			centered && 'text-center',
			className
		)}
		{...props}
	/>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement> & {
		gradient?: boolean;
		size?: 'sm' | 'md' | 'lg' | 'xl';
	}
>(({ className, gradient = false, size = 'md', ...props }, ref) => {
	const sizeClasses = {
		sm: 'text-lg font-semibold',
		md: 'text-xl font-semibold',
		lg: 'text-2xl font-bold',
		xl: 'text-3xl font-bold',
	};

	return (
		<h3
			ref={ref}
			className={cn(
				'leading-none tracking-tight',
				sizeClasses[size],
				gradient
					? 'text-gradient-primary'
					: 'text-neutral-900 dark:text-neutral-100',
				className
			)}
			{...props}
		/>
	);
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement> & {
		size?: 'sm' | 'md' | 'lg';
	}
>(({ className, size = 'md', ...props }, ref) => {
	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
	};

	return (
		<p
			ref={ref}
			className={cn(
				'leading-relaxed text-neutral-600 dark:text-neutral-400',
				sizeClasses[size],
				className
			)}
			{...props}
		/>
	);
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		noPadding?: boolean;
	}
>(({ className, noPadding = false, ...props }, ref) => (
	<div ref={ref} className={cn(!noPadding && 'pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		centered?: boolean;
		spaced?: boolean;
	}
>(({ className, centered = false, spaced = false, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex items-center pt-6',
			centered && 'justify-center',
			spaced && 'justify-between',
			!centered && !spaced && 'justify-start',
			className
		)}
		{...props}
	/>
));
CardFooter.displayName = 'CardFooter';

// Componente adicional para cards com ícone
const CardIcon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
	}
>(
	(
		{ className, variant = 'primary', size = 'md', children, ...props },
		ref
	) => {
		const variantClasses = {
			primary:
				'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
			secondary:
				'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
			accent:
				'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-700',
			neutral:
				'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
		};

		const sizeClasses = {
			sm: 'h-8 w-8 rounded-lg',
			md: 'h-12 w-12 rounded-xl',
			lg: 'h-16 w-16 rounded-2xl',
		};

		return (
			<div
				ref={ref}
				className={cn(
					'flex items-center justify-center flex-shrink-0',
					variantClasses[variant],
					sizeClasses[size],
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
CardIcon.displayName = 'CardIcon';

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardIcon,
	cardVariants,
};
