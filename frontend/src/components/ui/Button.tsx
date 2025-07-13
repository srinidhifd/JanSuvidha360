import React from 'react';
import { components, utils } from '../../design-system';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = components.button.base.replace(/\s+/g, ' ').trim();
    const sizeClasses = components.button.sizes[size];
    const variantClasses = components.button.variants[variant].replace(/\s+/g, ' ').trim();
    const widthClasses = fullWidth ? 'w-full' : '';
    
    const buttonClasses = utils.cn(
      baseClasses,
      sizeClasses,
      variantClasses,
      widthClasses,
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>{children || 'Loading...'}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 