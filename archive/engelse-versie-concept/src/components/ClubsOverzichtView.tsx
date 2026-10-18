import type { ReactNode } from 'react';
import { FileText, Flag, GraduationCap, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Breadcrumb, Button, HeaderMosaic, IconTile } from '../ui/components';
import { useContent, useLocale } from '../i18n';
import { ui } from '../i18n/ui';
import content from '../i18n/content/clubsOverzicht';
import '../ui/templates/templates.css';

const topicIcons: Record<string, ReactNode> = {
  '/voor-clubs/ledenadministratie': <Users />,
  '/voor-clubs/trainersopleidingen': <GraduationCap />,
  '/wedstrijden/scheidsrechters': <Flag />,
  '/voor-clubs/veilig-sportklimaat': <ShieldCheck />,
  '/voor-clubs/club-oprichten': <MapPin />,
  '/voor-clubs/documenten': <FileText />,
};

export default function ClubsOverzichtView() {
  const t = useContent(content);
  const common = ui[useLocale()];
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: common.home, href: '/' }, { label: t.title }]} />
          <div className="k-page-header__split">
            <div>
              <h1 className="k-page-header__title">{t.title}</h1>
              <p className="k-lead k-page-header__intro">
                {t.lead}
              </p>
            </div>
            <HeaderMosaic images={['images/youth/youth-4.jpg', 'images/coach/coach-2.jpg', 'images/referees/referees-5.jpg']} />
          </div>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="clubs-topics-title">
        <div className="k-container">
          <h2 id="clubs-topics-title" className="k-block-title">{t.topicsTitle}</h2>
          <div className="k-grid k-grid--3">
            {t.topics.map((topic) => <IconTile key={topic.href} {...topic} icon={topicIcons[topic.href]} />)}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="clubs-organise-title">
        <div className="k-container k-split">
          <div>
            <h2 id="clubs-organise-title" className="k-block-title">{t.organiseTitle}</h2>
            <div className="k-prose k-prose--spaced">
              {t.organiseText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="k-page-header__actions">
              <Button variant="secondary" href={`mailto:wedstrijdzaken@knas.nl?subject=${encodeURIComponent(t.organiseMailSubject)}`}>{t.organiseMail}</Button>
              <Button variant="text" href="docs/source/handleiding-jeugdpuntentoernooi-2025-2026.pdf" external>{t.jptManual}</Button>
            </div>
          </div>
          <aside className="k-aside-note">
            <Flag aria-hidden="true" />
            <strong>{t.refereesTitle}</strong>
            <p>{t.refereesText}</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="clubs-contact-title">
        <div className="k-container k-container--narrow">
          <h2 id="clubs-contact-title" className="k-block-title">{t.contactTitle}</h2>
          <p className="k-lead">{t.contactLead}</p>
          <ul className="k-wedstrijd-overzicht k-clubs-contact">
            {t.contacts.map((contact) => (
              <li key={contact.email}>
                <a href={`mailto:${contact.email}`}>
                  <span>{contact.topic}</span>
                  <span className="k-clubs-contact__email">{contact.email}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
