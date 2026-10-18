import { tournamentsData } from '../data';
import { allNews, articleHref, formatNewsDate } from '../news';
import { Button, EventCard, NewsCard } from '../ui/components';
import { clubLocations, uniqueClubsData } from '../allClubsData';
import '../ui/templates/templates.css';

// Homepage volgens HomeTemplate (src/ui/templates): hero → statistieken → nieuws → wedstrijden.
export default function HomeView() {
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
            Beweeg. Denk. <span className="k-hero__accent">Scherm.</span>
          </h1>
          <p className="k-lead">Snelheid, tactiek en conditie op de loper. Vind een club bij jou in de buurt en probeer het zelf.</p>
          <div className="k-hero__actions">
            <Button variant="primary" href="/clubs">Vind een club</Button>
            <Button variant="secondary" href="/beginnen">Hoe begin ik?</Button>
          </div>
        </div>
      </section>

      <section className="k-stats-band" aria-labelledby="home-stats">
        <div className="k-container">
          <h2 id="home-stats" className="k-visually-hidden">Schermsport in cijfers</h2>
          <dl className="k-stats">
            <div className="k-stat">
              <dt>Verenigingen</dt>
              <dd>{uniqueClubsData.length}</dd>
              <span>door heel Nederland</span>
            </div>
            <div className="k-stat">
              <dt>Wapens</dt>
              <dd>3</dd>
              <span>floret, degen en sabel</span>
            </div>
            <div className="k-stat">
              <dt>Trainingslocaties</dt>
              <dd>{clubLocations.length}</dd>
              <span>om dichtbij te schermen</span>
            </div>
            <div className="k-stat">
              <dt>Actief sinds</dt>
              <dd>1908</dd>
              <span>voor de schermsport</span>
            </div>
          </dl>
        </div>
      </section>

      {homeNews.length > 0 && (
        <section className="k-section k-section--subtle" aria-labelledby="home-news">
          <div className="k-container">
            <div className="k-section__head">
              <h2 id="home-news">Laatste nieuws</h2>
              <Button variant="text" href="/nieuws">Alle nieuws</Button>
            </div>
            <ul className="k-grid k-grid--3 k-news-grid">
              {homeNews.map((item) => (
                <li key={item.id}>
                  <NewsCard
                    href={articleHref(item.id)}
                    title={item.title}
                    date={formatNewsDate(item)}
                    dateTime={item.dateISO ?? ''}
                    category={item.category}
                    summary={item.summary}
                    image={item.image}
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
              <h2 id="home-events">Komende wedstrijden</h2>
              <Button variant="text" href="/wedstrijden/kalender">Volledige kalender</Button>
            </div>
            <div className="k-stack">
              {homeTournaments.map((tour) => (
                <EventCard
                  key={tour.id}
                  href={tour.actionUrl}
                  external
                  title={tour.title}
                  day={tour.dateDay}
                  month={tour.dateMonth}
                  dateTime={tour.dateISO}
                  location={tour.city ?? tour.location}
                  type={tour.type}
                  weapon={tour.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
