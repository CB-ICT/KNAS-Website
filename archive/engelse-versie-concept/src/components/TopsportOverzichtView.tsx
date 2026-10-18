import { Plane, Sprout, Trophy, Users } from 'lucide-react';
import { Breadcrumb, Button, IconTile, NewsCard, SectionNav } from '../ui/components';
import { allNews, articleHref, formatNewsDate } from '../news';
import { newsGroupOf } from '../newsGroups';
import { useContent, useLocale } from '../i18n';
import { ui } from '../i18n/ui';
import content from '../i18n/content/topsportOverzicht';
import '../ui/templates/templates.css';

// Zelfde volgorde als t.topics.
const topicIcons = [<Sprout />, <Trophy />, <Plane />];

const athleteCommission = ['Tristan Tulen', 'Teun Jans Köhneke', 'Marleen Buitenhuis'];

const resultsNews = allNews.filter((item) => newsGroupOf(item.category) === 'topsport').slice(0, 3);

export default function TopsportOverzichtView() {
  const locale = useLocale();
  const t = useContent(content);
  const common = ui[locale];
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: common.home, href: '/' }, { label: t.breadcrumb }]} />
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
