import { Pagination, SearchBar } from '../components';
import { PageHeader, PageShell, Placeholder, SkeletonLines } from './PageShell';

interface ListingTemplateProps {
  /** 'nieuws' = kaarten met foto in raster; 'clubs' = compacte lijst + kaartweergave. */
  variant?: 'nieuws' | 'clubs';
}

// Overzicht: zoeken en filteren staan bóven de resultaten (mobiel eerst), aantal resultaten wordt voorgelezen.
export default function ListingTemplate({ variant = 'nieuws' }: ListingTemplateProps) {
  const isClubs = variant === 'clubs';
  return (
    <PageShell currentPath={isClubs ? '/clubs' : '/nieuws'}>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: isClubs ? 'Vind een club' : 'Nieuws' }]}
        title={isClubs ? 'Vind een club' : 'Nieuws'}
        intro={<SkeletonLines lines={1} />}
      />

      <section className="k-section k-section--tight" aria-label="Zoeken en filteren">
        <div className="k-container k-listing__toolbar">
          <SearchBar
            label={isClubs ? 'Zoek een club op plaats of postcode' : 'Zoek in het nieuws'}
            placeholder={isClubs ? 'Plaats of postcode' : 'Zoek in het nieuws'}
            action={isClubs ? '/clubs' : '/nieuws'}
          />
          <Placeholder label={isClubs ? 'Filters: wapen · leeftijd · aangepast schermen' : 'Filterchips: onderwerpen'} height="3rem" />
        </div>
      </section>

      <section className="k-section k-section--flush-top" aria-labelledby="listing-results">
        <div className="k-container">
          <h2 id="listing-results" className="k-visually-hidden">Resultaten</h2>
          {/* aria-live: na filteren hoort een schermlezer hoeveel resultaten er over zijn. */}
          <p className="k-muted k-listing__count" aria-live="polite">[aantal] resultaten</p>

          {isClubs ? (
            <div className="k-listing__split">
              <div className="k-stack">
                {[1, 2, 3, 4, 5].map((n) => <Placeholder key={n} label="ClubCard" height="6rem" />)}
              </div>
              <Placeholder label="Kaart (optioneel, vanaf 1024px naast de lijst)" height="28rem" className="k-listing__map" />
            </div>
          ) : (
            <div className="k-grid k-grid--3">
              {[1, 2, 3, 4, 5, 6].map((n) => <Placeholder key={n} label="NewsCard" height="20rem" />)}
            </div>
          )}

          <div className="k-listing__pagination">
            <Pagination current={1} total={8} hrefFor={(page) => `?pagina=${page}`} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
