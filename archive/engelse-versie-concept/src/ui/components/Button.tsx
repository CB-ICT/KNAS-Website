import React from 'react';
import { useLocale } from '../../i18n';
import { ui } from '../../i18n/ui';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'text';

interface ButtonProps {
  variant?: Variant;
  /** Met href wordt het een link (navigatie); zonder href een <button> (actie). */
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: any) => void;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

// Oranje (primary) maximaal één keer per scherm; de rest secondary of text.
export default function Button({
  variant = 'primary',
  href,
  external,
  type = 'button',
  onClick,
  iconLeft,
  iconRight,
  fullWidth,
  className = '',
  ariaLabel,
  children,
}: ButtonProps) {
  const classes = ['k-btn', `k-btn--${variant}`, fullWidth ? 'k-btn--full' : '', className].filter(Boolean).join(' ');
  const t = ui[useLocale()];
  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
      {external && <span className="k-visually-hidden"> {t.opensNewWindow}</span>}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
