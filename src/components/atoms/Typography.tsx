import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn('text-4xl font-bold tracking-tight', className)}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn('text-3xl font-semibold tracking-tight', className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

H3.displayName = 'H3';

export const P = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-base leading-7', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

P.displayName = 'P';

export const Small = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <small
        ref={ref}
        className={cn('text-sm font-medium leading-none', className)}
        {...props}
      >
        {children}
      </small>
    );
  }
);

Small.displayName = 'Small';

export const Muted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-gray-500', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Muted.displayName = 'Muted';
