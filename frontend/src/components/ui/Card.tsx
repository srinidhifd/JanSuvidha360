import React from 'react';
import { components, utils } from '../../design-system';

interface CardProps {
  variant?: 'default' | 'hover' | 'interactive' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseClasses = components.card.base.replace(/\s+/g, ' ').trim();
  const variantClasses = components.card.variants[variant];
  const paddingClasses = components.card.padding[padding];
  
  const cardClasses = utils.cn(
    baseClasses,
    variantClasses,
    paddingClasses,
    className
  );

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 