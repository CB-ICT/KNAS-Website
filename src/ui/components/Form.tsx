import React, { useEffect, useId, useRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import './Form.css';

/*
 * Formulierpatroon (gebaseerd op GOV.UK / NL Design System):
 * - Label altijd zichtbaar boven het veld, nooit alleen placeholder.
 * - Verplicht is de norm; optionele velden krijgen "(optioneel)" i.p.v. sterretjes op verplichte.
 * - Fout = rode rand + icoon + tekst die zegt hoe je het oplost, gekoppeld via aria-describedby.
 */

interface FieldBaseProps {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  name: string;
  /** Vaste id, nodig om vanuit de foutensamenvatting naar het veld te linken. */
  id?: string;
}

function useFieldIds(error?: string, hint?: string, customId?: string) {
  const generated = useId();
  const id = customId ?? generated;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { id, hintId, errorId, describedBy };
}

function FieldShell({
  id, label, hint, hintId, error, errorId, optional, children,
}: FieldBaseProps & { id: string; hintId?: string; errorId?: string; children?: React.ReactNode }) {
  return (
    <div className={`k-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id} className="k-field__label">
        {label}
        {optional && <span className="k-field__optional"> (optioneel)</span>}
      </label>
      {hint && <p id={hintId} className="k-field__hint">{hint}</p>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {children}
    </div>
  );
}

function ErrorMessage({ id, children }: { id?: string; children?: React.ReactNode }) {
  return (
    <p id={id} className="k-field__error">
      <AlertCircle aria-hidden="true" />
      <span><span className="k-visually-hidden">Fout: </span>{children}</span>
    </p>
  );
}

interface TextFieldProps extends FieldBaseProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password' | 'url';
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel' | 'url';
  /** Breedte volgt de verwachte invoer (postcode ≠ e-mailadres). */
  width?: 'sm' | 'md' | 'full';
  defaultValue?: string;
}

export function TextField({ id: customId, label, hint, error, optional, name, type = 'text', autoComplete, inputMode, width = 'full', defaultValue }: TextFieldProps) {
  const { id, hintId, errorId, describedBy } = useFieldIds(error, hint, customId);
  return (
    <FieldShell {...{ id, label, hint, hintId, error, errorId, optional, name }}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={defaultValue}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`k-input k-input--${width}`}
      />
    </FieldShell>
  );
}

export function TextArea({ id: customId, label, hint, error, optional, name, rows = 5 }: FieldBaseProps & { rows?: number }) {
  const { id, hintId, errorId, describedBy } = useFieldIds(error, hint, customId);
  return (
    <FieldShell {...{ id, label, hint, hintId, error, errorId, optional, name }}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="k-input k-input--full k-textarea"
      />
    </FieldShell>
  );
}

export function Select({ id: customId, label, hint, error, optional, name, options, placeholder = 'Maak een keuze' }: FieldBaseProps & { options: { value: string; label: string }[]; placeholder?: string }) {
  const { id, hintId, errorId, describedBy } = useFieldIds(error, hint, customId);
  return (
    <FieldShell {...{ id, label, hint, hintId, error, errorId, optional, name }}>
      <div className="k-select">
        <select
          id={id}
          name={name}
          required={!optional}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="k-input k-input--md"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown className="k-select__icon" aria-hidden="true" />
      </div>
    </FieldShell>
  );
}

interface ChoiceGroupProps extends FieldBaseProps {
  type: 'radio' | 'checkbox';
  options: { value: string; label: string; hint?: string }[];
}

// Groepen van keuzes: <fieldset>/<legend> zodat de vraag bij elke optie wordt voorgelezen.
export function ChoiceGroup({ id: customId, label, hint, error, optional, name, type, options }: ChoiceGroupProps) {
  const generated = useId();
  const id = customId ?? generated;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <fieldset
      className={`k-field k-fieldset${error ? ' has-error' : ''}`}
      aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
    >
      <legend className="k-field__label">
        {label}
        {optional && <span className="k-field__optional"> (optioneel)</span>}
      </legend>
      {hint && <p id={hintId} className="k-field__hint">{hint}</p>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      <div className="k-choices">
        {options.map((option, index) => {
          const optionId = `${id}-${index}`;
          return (
            <div key={option.value} className="k-choice">
              <input
                id={optionId}
                type={type}
                name={name}
                value={option.value}
                className={`k-choice__input k-choice__input--${type}`}
                aria-describedby={option.hint ? `${optionId}-hint` : undefined}
              />
              <label htmlFor={optionId} className="k-choice__label">
                {option.label}
                {option.hint && <span id={`${optionId}-hint`} className="k-field__hint">{option.hint}</span>}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

interface ErrorSummaryProps {
  errors: { fieldId?: string; href?: string; message: string }[];
}

// Bovenaan het formulier na verzenden: krijgt focus, zodat toetsenbord- en schermlezergebruikers direct weten wat er mis is.
export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (errors.length) ref.current?.focus(); }, [errors.length]);
  if (!errors.length) return null;
  return (
    <div ref={ref} className="k-error-summary" role="alert" tabIndex={-1} aria-labelledby="k-error-summary-title">
      <h2 id="k-error-summary-title" className="k-error-summary__title">
        Controleer {errors.length === 1 ? 'dit veld' : `deze ${errors.length} velden`}
      </h2>
      <ul>
        {errors.map((error) => (
          <li key={error.message}>
            <a href={error.href ?? `#${error.fieldId}`}>{error.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
