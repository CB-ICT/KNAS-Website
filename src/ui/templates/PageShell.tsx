import React from 'react';
import { Breadcrumb, Crumb, Footer, Header } from '../components';
import './templates.css';

/** Gelabeld grijs vlak: laat in een skeleton zien welke inhoud waar komt. */
export function Placeholder({ label, height = '6rem', className = '' }: { label: string; height?: string; className?: string }) {
  return (
    <div className={`k-placeholder ${className}`} style={{ minHeight: height }} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

/** Tekstregels-skeleton; laatste regel korter, zoals echte alinea's. */
export function SkeletonLines({ lines = 3 }: { lines?: number }) {
  return (
    <div className="k-skeleton-lines" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="k-skeleton" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  );
}

interface PageShellProps {
  currentPath?: string;
  children?: React.ReactNode;
}

// Elke pagina: skip-link → header → <main id="main"> → footer. Eén h1 per pagina, in de template.
export function PageShell({ currentPath, children }: PageShellProps) {
  return (
    <div className="k-page">
      <Header currentPath={currentPath} />
      <main id="main" tabIndex={-1} className="k-page__main">{children}</main>
      <Footer />
    </div>
  );
}

interface PageHeaderProps {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
}

// Paginakop voor alles behalve de homepage: waar ben ik, wat is dit, wat kan ik hier.
export function PageHeader({ breadcrumbs, eyebrow, title, intro, actions }: PageHeaderProps) {
  return (
    <div className="k-page-header">
      <div className="k-container">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        {eyebrow && <p className="k-eyebrow k-page-header__eyebrow">{eyebrow}</p>}
        <h1 className="k-page-header__title">{title}</h1>
        {intro && <div className="k-lead k-page-header__intro">{intro}</div>}
        {actions && <div className="k-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
}
