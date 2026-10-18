import { CalendarDays, MapPin, Newspaper, Swords } from 'lucide-react';
import { Button, IconTile, SearchBar } from '../components';
import { PageShell } from './PageShell';

// 404: geen schuld bij de bezoeker, direct drie uitwegen: zoeken, toptaken, home.
export default function NotFoundTemplate() {
  return (
    <PageShell>
      <section className="k-section k-not-found" aria-labelledby="nf-title">
        <div className="k-container k-container--narrow k-stack" style={{ ['--stack-gap' as string]: 'var(--space-5)' }}>
          <p className="k-eyebrow">Foutcode 404</p>
          <h1 id="nf-title">Deze pagina bestaat niet (meer)</h1>
          <p className="k-lead">Misschien is de pagina verhuisd. Zoek wat je nodig hebt of kies een van deze routes.</p>
          <SearchBar size="lg" />
          <div className="k-grid k-grid--2">
            <IconTile href="/clubs" icon={<MapPin />} label="Vind een club" />
            <IconTile href="/beginnen" icon={<Swords />} label="Begin met schermen" />
            <IconTile href="/wedstrijden/kalender" icon={<CalendarDays />} label="Wedstrijdkalender" />
            <IconTile href="/nieuws" icon={<Newspaper />} label="Nieuws" />
          </div>
          <Button variant="secondary" href="/">Naar de homepage</Button>
        </div>
      </section>
    </PageShell>
  );
}
