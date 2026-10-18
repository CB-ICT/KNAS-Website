import { tournamentsData } from '../data';
import { allNews, articleHref, formatNewsDate } from '../news';
import { Button, EventCard, NewsCard } from '../ui/components';
import { clubLocations, uniqueClubsData } from '../allClubsData';
import { useContent, useLocale } from '../i18n';
import { competitionTypeLabel, competitionWeaponLabel, shortMonth } from '../i18n/competition';
import content from '../i18n/content/home';
import '../ui/templates/templates.css';

// Homepage volgens HomeTemplate (src/ui/templates): hero → statistieken → nieuws → wedstrijden.
export default function HomeView() {
  const locale = useLocale();
  const t = useContent(content);
  const homeNews = allNews.slice(0, 3);
  const homeTournaments = tournamentsData.slice(0, 3);

  return (
    <div className="k-ds">
      <section className="k-hero k-on-dark" aria-labelledby="home-title">
        <div className="k-hero__media" aria-hidden="true">
          <img src="images/fencing/fencing-03.jpg" alt="" />
        </div>
        <div className="k-container k-hero__content">
          <h1 id="home-title" className="k-hero__title">
            {t.heroTitle} <span className="k-hero__accent">{t.heroAccent}</span>
          </h1>
          <p className="k-lead">{t.heroLead}</p>
          <div className="k-hero__actions">
            <Button variant="primary" href="/clubs">{t.findClub}</Button>
            <Button variant="secondary" href="/beginnen">{t.howToStart}</Button>
          </div>
        </div>
      </section>

      <section className="k-stats-band" aria-labelledby="home-stats">
        <div className="k-container">
          <h2 id="home-stats" className="k-visually-hidden">{t.statsTitle}</h2>
          <dl className="k-stats">
            <div className="k-stat">
              <dt>{t.stats.clubs.label}</dt>
              <dd>{uniqueClubsData.length}</dd>
              <span>{t.stats.clubs.note}</span>
            </div>
            <div className="k-stat">
              <dt>{t.stats.weapons.label}</dt>
              <dd>3</dd>
              <span>{t.stats.weapons.note}</span>
            </div>
            <div className="k-stat">
              <dt>{t.stats.locations.label}</dt>
              <dd>{clubLocations.length}</dd>
              <span>{t.stats.locations.note}</span>
            </div>
            <div className="k-stat">
              <dt>{t.stats.since.label}</dt>
              <dd>1908</dd>
              <span>{t.stats.since.note}</span>
            </div>
          </dl>
        </div>
      </section>

      {homeNews.length > 0 && (
        <section className="k-section k-section--subtle" aria-labelledby="home-news">
          <div className="k-container">
            <div className="k-section__head">
              <h2 id="home-news">{t.newsTitle}</h2>
              <Button variant="text" href="/nieuws">{t.allNews}</Button>
            </div>
            {t.newsInDutch && <p className="k-muted k-news-language">{t.newsInDutch}</p>}
            <ul className="k-grid k-grid--3 k-news-grid">
              {homeNews.map((item) => (
                <li key={item.id}>
                  <NewsCard
                    href={articleHref(item.id)}
                    title={item.title}
                    date={formatNewsDate(item, 'long', locale)}
                    dateTime={item.dateISO ?? ''}
                    category={item.category}
                    summary={item.summary}
                    image={item.image}
                    lang={locale === 'nl' ? undefined : 'nl'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {homeTournaments.length > 0 && (
        <section className="k-section" aria-labelledby="home-events">
          <div className="k-container k-container--narrow">
            <div className="k-section__head">
              <h2 id="home-events">{t.eventsTitle}</h2>
              <Button variant="text" href="/wedstrijden/kalender">{t.fullCalendar}</Button>
            </div>
            <div className="k-stack">
              {homeTournaments.map((tour) => (
                <EventCard
                  key={tour.id}
                  href={tour.actionUrl}
                  external
                  title={tour.title}
                  day={tour.dateDay}
                  month={shortMonth(tour.dateISO, locale)}
                  dateTime={tour.dateISO}
                  location={tour.city ?? tour.location}
                  type={competitionTypeLabel(tour.typeCode, locale)}
                  weapon={competitionWeaponLabel(tour.weaponCode, locale)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
