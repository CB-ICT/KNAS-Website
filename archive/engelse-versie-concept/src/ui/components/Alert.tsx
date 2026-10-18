import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useLocale } from '../../i18n';
import { ui } from '../../i18n/ui';
import './Alert.css';

type Tone = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  tone?: Tone;
  title?: string;
  dismissible?: boolean;
  children?: React.ReactNode;
}

const icons = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: XCircle };

// Kleur is nooit de enige drager: elk type heeft een eigen icoon én een (verborgen) label.
export default function Alert({ tone = 'info', title, dismissible, children }: AlertProps) {
  const [visible, setVisible] = useState(true);
  const t = ui[useLocale()];
  if (!visible) return null;
  const Icon = icons[tone];
  // Fouten en waarschuwingen worden direct voorgelezen; info/succes beleefd.
  const role = tone === 'error' || tone === 'warning' ? 'alert' : 'status';

  return (
    <div className={`k-alert k-alert--${tone}`} role={role}>
      <Icon className="k-alert__icon" aria-hidden="true" />
      <div className="k-alert__body">
        <span className="k-visually-hidden">{t.alertTone[tone]}: </span>
        {title && <p className="k-alert__title">{title}</p>}
        {children && <div className="k-alert__text">{children}</div>}
      </div>
      {dismissible && (
        <button type="button" className="k-alert__close" onClick={() => setVisible(false)} aria-label={t.alertClose}>
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
