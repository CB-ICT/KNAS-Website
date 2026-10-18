import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

interface PaginationProps {
  current: number;
  total: number;
  /** Bouwt de URL per pagina, zodat elke pagina deelbaar en terug-knop-vriendelijk is. */
  hrefFor: (page: number) => string;
}

// Toont 1 … (huidige ±1) … laatste: nooit meer dan 7 knoppen, ook op 375px breed.
function pageWindow(current: number, total: number): (number | 'gap')[] {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'gap')[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push('gap');
    result.push(page);
  });
  return result;
}

export default function Pagination({ current, total, hrefFor }: PaginationProps) {
  if (total <= 1) return null;
  return (
    <nav aria-label="Paginering" className="k-pagination">
      <ul className="k-pagination__list">
        <li>
          {current > 1 ? (
            <a href={hrefFor(current - 1)} className="k-pagination__step" rel="prev">
              <ChevronLeft aria-hidden="true" /> <span className="k-pagination__step-label">Vorige</span>
              <span className="k-visually-hidden"> pagina</span>
            </a>
          ) : (
            <span className="k-pagination__step is-disabled" aria-hidden="true"><ChevronLeft /></span>
          )}
        </li>
        {pageWindow(current, total).map((page, index) =>
          page === 'gap' ? (
            <li key={`gap-${index}`} className="k-pagination__gap" aria-hidden="true">…</li>
          ) : (
            <li key={page}>
              <a
                href={hrefFor(page)}
                className="k-pagination__page"
                aria-current={page === current ? 'page' : undefined}
                aria-label={`Pagina ${page}`}
              >
                {page}
              </a>
            </li>
          ),
        )}
        <li>
          {current < total ? (
            <a href={hrefFor(current + 1)} className="k-pagination__step" rel="next">
              <span className="k-pagination__step-label">Volgende</span>
              <span className="k-visually-hidden"> pagina</span> <ChevronRight aria-hidden="true" />
            </a>
          ) : (
            <span className="k-pagination__step is-disabled" aria-hidden="true"><ChevronRight /></span>
          )}
        </li>
      </ul>
    </nav>
  );
}
