import { CalendarDays, MapPin, Newspaper, Swords } from 'lucide-react';
import { Button, IconTile } from '../ui/components';
import '../ui/templates/templates.css';

export default function NotFoundView() {
  return (
    <div className="k-ds">
      <section className="k-section k-not-found" aria-labelledby="nf-title">
        <div className="k-container k-container--narrow k-stack" style={{ ['--stack-gap' as string]: 'var(--space-5)' }}>
          <p className="k-eyebrow">Foutcode 404</p>
          <h1 id="nf-title">Deze pagina bestaat niet (meer)</h1>
          <p className="k-lead">Misschien is de pagina verhuisd of is de link niet compleet. Kies een van deze routes.</p>
          <div className="k-grid k-grid--2">
            <IconTile href="/clubs" icon={<MapPin />} label="Vind een club" />
            <IconTile href="/beginnen" icon={<Swords />} label="Begin met schermen" />
            <IconTile href="/wedstrijden/kalender" icon={<CalendarDays />} label="Wedstrijdkalender" />
            <IconTile href="/nieuws" icon={<Newspaper />} label="Nieuws" />
          </div>
          <div>
            <Button variant="secondary" href="/">Naar de homepage</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
