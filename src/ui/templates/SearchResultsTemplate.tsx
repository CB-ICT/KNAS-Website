import { Pagination, SearchBar } from '../components';
import { PageHeader, PageShell, Placeholder, SkeletonLines } from './PageShell';

const resultTypes = ['Alles', 'Pagina’s', 'Nieuws', 'Clubs', 'Documenten'];

// Zoekresultaten: de zoekterm blijft staan en is aanpasbaar; per resultaat type + pad, zodat je weet waar je landt.
export default function SearchResultsTemplate() {
  return (
    <PageShell currentPath="/zoeken">
      <PageHeader breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Zoeken' }]} title="Zoekresultaten" />
      <div className="k-container k-container--narrow k-section k-section--flush-top k-stack" style={{ ['--stack-gap' as string]: 'var(--space-5)' }}>
        <SearchBar size="lg" defaultValue="[zoekterm]" />

        <nav aria-label="Soort resultaat">
          <ul className="k-chips">
            {resultTypes.map((type, index) => (
              <li key={type}>
                <a href={`?type=${index}`} className="k-chip" aria-current={index === 0 ? 'true' : undefined}>{type}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="k-muted" aria-live="polite">[aantal] resultaten voor “[zoekterm]”</p>

        <ol className="k-results">
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} className="k-result">
              <p className="k-result__type">[Type] · [Hoofdsectie] › [Pagina]</p>
              <h2 className="k-result__title"><a href="#">[Titel resultaat {n}]</a></h2>
              <SkeletonLines lines={2} />
            </li>
          ))}
        </ol>

        <Pagination current={1} total={5} hrefFor={(page) => `?q=term&pagina=${page}`} />

        <section aria-labelledby="no-results-title" className="k-panel">
          <h2 id="no-results-title" className="k-panel__title">Variant: geen resultaten</h2>
          <Placeholder label="Tips: andere spelling · minder woorden · populaire pagina's (IconTiles)" height="6rem" />
        </section>
      </div>
    </PageShell>
  );
}
