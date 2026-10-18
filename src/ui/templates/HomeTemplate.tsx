import { CalendarDays, GraduationCap, Medal, Swords } from 'lucide-react';
import { Button, IconTile, SearchBar } from '../components';
import { PageShell, Placeholder, SkeletonLines } from './PageShell';

/*
 * Homepage = verdeelstation, geen inhoudspagina.
 * Volgorde volgt de doelgroepen: 1) beginners (hero + club zoeken), 2) wedstrijdschermers (tegels/kalender),
 * 3) clubs/kader (tegel), 4) pers/geïnteresseerden (nieuws). Bewust weinig secties: rust > volledigheid.
 */
export default function HomeTemplate() {
  return (
    <PageShell currentPath="/">
      <section className="k-hero k-on-dark" aria-labelledby="home-title">
        <div className="k-hero__media" aria-hidden="true">
          <Placeholder label="Actiefoto schermers (16:9, donkere overlay)" height="100%" className="k-placeholder--dark" />
        </div>
        <div className="k-container k-hero__content">
          <h1 id="home-title" className="k-hero__title">
            Beweeg. Denk. <span className="k-hero__accent">Scherm.</span>
          </h1>
          <p className="k-lead">Eén zin die uitnodigt om te beginnen.</p>
          {/* De enige oranje actie op de homepage. */}
          <div className="k-hero__actions">
            <Button variant="primary" href="/clubs">Vind een club</Button>
            <Button variant="secondary" href="/beginnen">Hoe begin ik?</Button>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="home-tasks">
        <div className="k-container">
          <h2 id="home-tasks" className="k-visually-hidden">Direct naar</h2>
          <div className="k-grid k-grid--4">
            <IconTile href="/beginnen" icon={<Swords />} label="Begin met schermen" />
            <IconTile href="/wedstrijden/kalender" icon={<CalendarDays />} label="Wedstrijdkalender" />
            <IconTile href="/wedstrijden/ranglijsten" icon={<Medal />} label="Ranglijsten" />
            <IconTile href="/voor-clubs" icon={<GraduationCap />} label="Voor clubs" />
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="home-news">
        <div className="k-container">
          <div className="k-section__head">
            <h2 id="home-news">Laatste nieuws</h2>
            <Button variant="text" href="/nieuws">Alle nieuws</Button>
          </div>
          <div className="k-grid k-grid--3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="k-skeleton-card">
                <Placeholder label="NewsCard" height="12rem" />
                <SkeletonLines lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="home-events">
        <div className="k-container k-container--narrow">
          <div className="k-section__head">
            <h2 id="home-events">Komende wedstrijden</h2>
            <Button variant="text" href="/wedstrijden/kalender">Volledige kalender</Button>
          </div>
          <div className="k-stack">
            {[1, 2, 3].map((n) => <Placeholder key={n} label="EventCard" height="6rem" />)}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="home-search">
        <div className="k-container k-container--narrow">
          <h2 id="home-search" className="k-home-search__title">Niet gevonden wat je zoekt?</h2>
          <SearchBar size="lg" />
        </div>
      </section>
    </PageShell>
  );
}
