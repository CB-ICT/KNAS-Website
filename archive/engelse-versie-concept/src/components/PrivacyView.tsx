import { FileText } from 'lucide-react';
import { Breadcrumb } from '../ui/components';
import { useContent, useLocale } from '../i18n';
import { ui } from '../i18n/ui';
import content from '../i18n/content/privacy';
import '../ui/templates/templates.css';

// Beschrijft alleen wat deze website technisch doet; de verwerking door de bond staat in de privacyverklaring van de KNAS.
export default function PrivacyView() {
  const t = useContent(content);
  const common = ui[useLocale()];
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: common.home, href: '/' }, { label: t.breadcrumb }]} />
          <h1 className="k-page-header__title">{t.title}</h1>
          <p className="k-lead k-page-header__intro">{t.lead}</p>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="privacy-site-title">
        <div className="k-container k-container--reading k-prose k-prose--spaced">
          <h2 id="privacy-site-title">{t.noTrackingTitle}</h2>
          <p>{t.noTracking}</p>

          <h2>{t.thirdPartiesTitle}</h2>
          <ul>
            {t.thirdParties.map((item) => (
              <li key={item.title}><strong>{item.title}</strong> {item.text}</li>
            ))}
          </ul>

          <h2>{t.statementTitle}</h2>
          <p>{t.statement}</p>
          <p>
            <a href="docs/policy/privacyverklaring.pdf" className="k-inline-link" target="_blank" rel="noopener noreferrer">
              <FileText aria-hidden="true" /> {t.statementLink}<span className="k-visually-hidden"> {common.opensNewWindow}</span>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
