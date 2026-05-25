'use client';

import NextLink from 'next/link';
import { forwardRef } from 'react';
import styles from '../styles/Link.module.scss';


type TProps = {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  underline?: 'always' | 'hover' | 'none';
  size?: 'small' | 'medium' | 'large';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  target?: '_blank' | '_self' | '_parent' | '_top';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};
export const Link = forwardRef<HTMLAnchorElement, TProps>(
  (
    {
      children,
      href,
      variant = 'primary',
      underline = 'hover',
      size = 'medium',
      target,
      onClick,
      className = '',
      style,
    },
    ref
  ) => {
    const classNames = [
      styles.link,
      styles[variant],
      styles[`underline-${underline}`],
      styles[`size-${size}`],
      className,
    ].filter(Boolean).join(' ');

    return (
      <NextLink
        href={href}
        className={classNames}
        style={style}
        target={target}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </NextLink>
    );
  }
);
