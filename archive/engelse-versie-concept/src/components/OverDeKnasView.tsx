import { FileText, Users } from 'lucide-react';
import { Breadcrumb, FeatureCard, IconTile, SectionNav } from '../ui/components';
import { uniqueClubsData } from '../allClubsData';
import { useContent, useLocale } from '../i18n';
import { ui } from '../i18n/ui';
import content from '../i18n/content/overDeKnas';
import '../ui/templates/templates.css';

export default function OverDeKnasView() {
  const t = useContent(content);
  const common = ui[useLocale()];
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: common.home, href: '/' }, { label: t.breadcrumb }]} />
          <div className="k-page-header__layout">
            <div>
              <h1 className="k-page-header__title">{t.title}</h1>
              <p className="k-lead k-page-header__intro">
                {t.intro}
              </p>
            </div>
            <figure className="k-page-header__media">
              <img src="images/fencing/fencing-11.jpg" alt={t.heroAlt} style={{ objectPosition: '50% 15%' }} />
            </figure>
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'over-mission-title', label: t.sectionNav.mission },
          { id: 'over-work-title', label: t.sectionNav.work },
          { id: 'over-org-title', label: t.sectionNav.org },
          { id: 'over-docs-title', label: t.sectionNav.docs },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="over-mission-title">
        <div className="k-container">
          <h2 id="over-mission-title" className="k-block-title">{t.missionTitle}</h2>
          <p className="k-lead k-onzerelaties-intro">{t.missionLead}</p>
          <dl className="k-rule-metrics">
            <div><dt>{t.metrics.founded.label}</dt><dd><strong>1908</strong><span>{t.metrics.founded.note}</span></dd></div>
            <div><dt>{t.metrics.royal.label}</dt><dd><strong>1923</strong><span>{t.metrics.royal.note}</span></dd></div>
            <div><dt>{t.metrics.clubs.label}</dt><dd><strong>{uniqueClubsData.length}</strong><span>{t.metrics.clubs.note}</span></dd></div>
            <div><dt>{t.metrics.fencers.label}</dt><dd><strong>{t.metrics.fencers.value}</strong><span>{t.metrics.fencers.note}</span></dd></div>
          </dl>
          <p className="k-rule-note">{t.membershipNote}</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="over-work-title">
        <div className="k-container">
          <h2 id="over-work-title" className="k-block-title">{t.workTitle}</h2>
          <div className="k-grid k-grid--2">
            {t.domains.map((domain) => (
              <FeatureCard key={domain.title} href={domain.href} image={domain.image} title={domain.title} text={domain.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="over-org-title">
        <div className="k-container k-split">
          <div>
            <h2 id="over-org-title" className="k-block-title">{t.orgTitle}</h2>
            <ul className="k-rule-facts k-rule-facts--stacked">
              {t.orgFacts.map((fact) => (
                <li key={fact.title}><strong>{fact.title}</strong> {fact.text}</li>
              ))}
            </ul>
          </div>
          <div className="k-stack">
            <IconTile href="/over-de-knas/bestuur" icon={<Users />} label={t.boardTile.label} description={t.boardTile.description} />
            <IconTile href="/contact" icon={<FileText />} label={t.contactTile.label} description={t.contactTile.description} />
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="over-docs-title">
        <div className="k-container k-container--narrow">
          <h2 id="over-docs-title" className="k-block-title">{t.docsTitle}</h2>
          <p className="k-lead k-onzerelaties-intro">{t.docsLead}</p>
          <ul className="k-rule-documents">
            {t.documents.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" /><span>{doc.title}</span><span className="k-rule-documents__type">{t.docType}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="k-page-header__actions">
            <a href="/voor-clubs/documenten" className="k-inline-link">{t.clubDocsLink}</a>
            <a href="/wedstrijden/reglementen" className="k-inline-link">{t.rulesLink}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
