import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

export interface Crumb {
  label: string;
  href?: string;
}

// Op mobiel tonen we alleen de stap terug ("‹ Wedstrijden") om ruimte te sparen; het volledige pad vanaf tablet.
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const parent = items.length > 1 ? items[items.length - 2] : undefined;
  return (
    <nav aria-label="Kruimelpad" className="k-breadcrumb">
      <ol className="k-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={`k-breadcrumb__item${item === parent ? ' is-parent' : ''}`}>
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {!isLast && <ChevronRight className="k-breadcrumb__sep" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
