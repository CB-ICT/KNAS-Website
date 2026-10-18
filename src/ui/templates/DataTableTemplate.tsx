import { useEffect, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Column, DataTable, Pagination, Select } from '../components';
import { PageHeader, PageShell, SkeletonLines } from './PageShell';

interface DemoRow {
  id: string;
  datum: string;
  sort: number;
  naam: string;
  plaats: string;
  wapen: string;
  categorie: string;
}

// Lege demorijen met dezelfde vorm als echte data, om het responsieve gedrag te tonen.
const demoRows: DemoRow[] = [1, 2, 3, 4, 5].map((n) => ({
  id: String(n),
  datum: `[datum ${n}]`,
  sort: n,
  naam: `[Wedstrijdnaam ${n}]`,
  plaats: '[Plaats]',
  wapen: '[Wapen]',
  categorie: '[Categorie]',
}));

const columns: Column<DemoRow>[] = [
  { key: 'datum', header: 'Datum', sortValue: (row) => row.sort },
  { key: 'naam', header: 'Wedstrijd', primary: true, sortValue: (row) => row.naam },
  { key: 'plaats', header: 'Plaats' },
  { key: 'wapen', header: 'Wapen' },
  { key: 'categorie', header: 'Categorie' },
];

interface DataTableTemplateProps {
  variant?: 'kalender' | 'ranglijst';
}

/*
 * Kalender/ranglijst. Filters: op mobiel ingeklapt achter één knop (<details>), vanaf 1024px altijd zichtbaar
 * in een zijkolom. Filters werken via GET-parameters, zodat een gefilterde lijst deelbaar is.
 */
export default function DataTableTemplate({ variant = 'kalender' }: DataTableTemplateProps) {
  const isRanking = variant === 'ranglijst';
  const title = isRanking ? 'Ranglijsten' : 'Wedstrijdkalender';
  const filtersRef = useRef<HTMLDetailsElement>(null);

  // Mobiel ingeklapt (resultaten eerst), desktop altijd open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64em)');
    const sync = () => { if (filtersRef.current) filtersRef.current.open = mq.matches; };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return (
    <PageShell currentPath={isRanking ? '/wedstrijden/ranglijsten' : '/wedstrijden/kalender'}>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: title }]}
        title={title}
        intro={<SkeletonLines lines={1} />}
      />
      <div className="k-container k-layout-filters k-section k-section--flush-top">
        <details ref={filtersRef} className="k-filters">
          <summary className="k-filters__toggle">
            <SlidersHorizontal aria-hidden="true" /> Filters
          </summary>
          <form className="k-filters__form" method="get" aria-label="Filter de lijst">
            <Select name="wapen" label="Wapen" options={[{ value: 'floret', label: 'Floret' }, { value: 'degen', label: 'Degen' }, { value: 'sabel', label: 'Sabel' }]} placeholder="Alle wapens" optional />
            <Select name="categorie" label="Categorie" options={[{ value: 'jeugd', label: 'Jeugd' }, { value: 'senioren', label: 'Senioren' }, { value: 'veteranen', label: 'Veteranen' }]} placeholder="Alle categorieën" optional />
            <Select name={isRanking ? 'seizoen' : 'maand'} label={isRanking ? 'Seizoen' : 'Maand'} options={[{ value: '1', label: '[optie]' }]} placeholder="Alle" optional />
            <button type="submit" className="k-btn k-btn--secondary">Toon resultaten</button>
          </form>
        </details>

        <div className="k-layout-filters__results">
          <p className="k-muted" aria-live="polite">[aantal] {isRanking ? 'schermers' : 'wedstrijden'}</p>
          <DataTable caption={`${title}, gefilterd op [filters]`} captionHidden columns={columns} rows={demoRows} rowKey={(row) => row.id} />
          <div className="k-listing__pagination">
            <Pagination current={2} total={12} hrefFor={(page) => `?pagina=${page}`} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
