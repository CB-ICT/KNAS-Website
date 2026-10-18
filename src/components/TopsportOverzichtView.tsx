import { Plane, Sprout, Trophy, Users } from 'lucide-react';
import { Breadcrumb, Button, IconTile, NewsCard, SectionNav } from '../ui/components';
import { allNews, articleHref, formatNewsDate } from '../news';
import { newsGroupOf } from '../newsGroups';
import '../ui/templates/templates.css';

const t = {
  breadcrumb: 'Topsport',
  eyebrow: 'Topsport',
  title: 'Van talent naar de internationale top',
  intro: 'De KNAS begeleidt talentvolle schermers van de club naar internationale jeugdtoernooien en de seniorentop. Senioren komen uit op World Cups, Grand Prix, EK en WK en maken deel uit van TeamNL.',
  championshipsButton: 'Titeltoernooien en selectie',
  talentButton: 'Het talentprogramma',
  imageAlt: 'Een Nederlandse schermer maakt een uitval tijdens het NK',
  nav: {
    route: 'Route naar de top',
    topics: 'Meer over topsport',
    news: 'Uitslagen',
    athletes: 'Atletencommissie',
  },
  routeTitle: 'De route naar de top',
  route: [
    { title: 'Vereniging', text: 'Iedere topsporter begint bij een club: structureel trainen, lessen volgen en meedoen aan nationale wedstrijden.' },
    { title: 'Talentprogramma', text: 'Per wapen begeleidt een begeleidingsteam cadetten en junioren met stages en internationale kwalificatiewedstrijden.' },
    { title: 'Jeugdtitels', text: 'De beste jeugd vertegenwoordigt Nederland op het EK en WK voor cadetten en junioren.' },
    { title: 'Senioren en TeamNL', text: 'Senioren schermen World Cups, Grand Prix, EK en WK, individueel en met een equipe.' },
  ],
  topicsTitle: 'Meer over topsport',
  topics: [
    { href: '/topsport/talentprogramma', label: 'Talentprogramma', description: 'Begeleidingsteams, intake en kosten' },
    { href: '/topsport/titeltoernooien', label: 'Titeltoernooien en selectie', description: 'Kalender 2026-2027 en selectie-eisen' },
    { href: '/topsport/internationaal-aanmelden', label: 'Internationaal aanmelden', description: 'Zo schrijf je je in voor buitenlandse wedstrijden' },
  ],
  newsTitle: 'Recente internationale uitslagen',
  allResults: 'Alle uitslagen',
  athletesTitle: 'Atletencommissie',
  athletesLead: 'De atletencommissie behartigt de belangen van topsporters en adviseert het bestuur over topsportbeleid vanuit het perspectief van de sporter.',
  members: 'Leden',
};

// Zelfde volgorde als t.topics.
const topicIcons = [<Sprout />, <Trophy />, <Plane />];

const athleteCommission = ['Tristan Tulen', 'Teun Jans Köhneke', 'Marleen Buitenhuis'];

const resultsNews = allNews.filter((item) => newsGroupOf(item.category) === 'topsport').slice(0, 3);

export default function TopsportOverzichtView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: t.breadcrumb }]} />
          <div className="k-page-header__layout">
            <div>
              <p className="k-eyebrow k-page-header__eyebrow">{t.eyebrow}</p>
              <h1 className="k-page-header__title">{t.title}</h1>
              <p className="k-lead k-page-header__intro">
                {t.intro}
              </p>
              <div className="k-page-header__actions">
                <Button variant="primary" href="/topsport/titeltoernooien">{t.championshipsButton}</Button>
                <Button variant="secondary" href="/topsport/talentprogramma">{t.talentButton}</Button>
              </div>
            </div>
            <figure className="k-page-header__media">
              <img src="images/fencing/fencing-04.jpg" alt={t.imageAlt} />
            </figure>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'topsport-route-title', label: t.nav.route },
          { id: 'topsport-topics-title', label: t.nav.topics },
          ...(resultsNews.length > 0 ? [{ id: 'topsport-news-title', label: t.nav.news }] : []),
          { id: 'topsport-athletes-title', label: t.nav.athletes },
        ]}
      />

      <section className="k-section k-section--subtle" aria-labelledby="topsport-route-title">
        <div className="k-container">
          <h2 id="topsport-route-title" className="k-block-title">{t.routeTitle}</h2>
          <ol className="k-timeline k-timeline--four">
            {t.route.map(({ title, text }) => (
              <li key={title} className="k-timeline__item"><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section" aria-labelledby="topsport-topics-title">
        <div className="k-container">
          <h2 id="topsport-topics-title" className="k-block-title">{t.topicsTitle}</h2>
          <div className="k-grid k-grid--3">
            {t.topics.map((topic, index) => <IconTile key={topic.href} icon={topicIcons[index]} {...topic} />)}
          </div>
        </div>
      </section>

      {resultsNews.length > 0 && (
        <section className="k-section k-section--subtle" aria-labelledby="topsport-news-title">
          <div className="k-container">
            <div className="k-section__head">
              <h2 id="topsport-news-title">{t.newsTitle}</h2>
              <Button variant="text" href="/nieuws?onderwerp=topsport">{t.allResults}</Button>
            </div>
            <ul className="k-grid k-grid--3 k-news-grid">
              {resultsNews.map((item) => (
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

      <section className="k-section" aria-labelledby="topsport-athletes-title">
        <div className="k-container k-split">
          <div>
            <h2 id="topsport-athletes-title" className="k-block-title">{t.athletesTitle}</h2>
            <p className="k-lead">{t.athletesLead}</p>
          </div>
          <aside className="k-aside-note">
            <Users aria-hidden="true" />
            <strong>{t.members}</strong>
            <ul className="k-check-list">
              {athleteCommission.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
