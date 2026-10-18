import { CalendarDays, MapPin, Newspaper, Swords } from 'lucide-react';
import { Button, IconTile } from '../ui/components';
import { useContent } from '../i18n';
import content from '../i18n/content/notFound';
import '../ui/templates/templates.css';

export default function NotFoundView() {
  const t = useContent(content);
  return (
    <div className="k-ds">
      <section className="k-section k-not-found" aria-labelledby="nf-title">
        <div className="k-container k-container--narrow k-stack" style={{ ['--stack-gap' as string]: 'var(--space-5)' }}>
          <p className="k-eyebrow">{t.eyebrow}</p>
          <h1 id="nf-title">{t.title}</h1>
          <p className="k-lead">{t.lead}</p>
          <div className="k-grid k-grid--2">
            <IconTile href="/clubs" icon={<MapPin />} label={t.tiles.club} />
            <IconTile href="/beginnen" icon={<Swords />} label={t.tiles.start} />
            <IconTile href="/wedstrijden/kalender" icon={<CalendarDays />} label={t.tiles.calendar} />
            <IconTile href="/nieuws" icon={<Newspaper />} label={t.tiles.news} />
          </div>
          <div>
            <Button variant="secondary" href="/">{t.home}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
