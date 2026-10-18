import { ArrowRight, FileText } from 'lucide-react';
import { Breadcrumb, HeaderMosaic } from '../ui/components';
import '../ui/templates/templates.css';

interface DocumentLink {
  title: string;
  href: string;
  type: 'PDF' | 'Pagina';
}

const groups: { title: string; documents: DocumentLink[] }[] = [
  {
    title: 'Reglementen',
    documents: [
      { title: 'Algemeen Reglement 2025', href: 'docs/policy/algemeen-reglement-2025.pdf', type: 'PDF' },
      { title: 'Wedstrijdreglement (samenvatting en FIE-regels)', href: '/wedstrijden/reglementen', type: 'Pagina' },
    ],
  },
  {
    title: 'Ledenadministratie en clubontwikkeling',
    documents: [
      { title: 'Leden overschrijven', href: '/voor-clubs/ledenadministratie', type: 'Pagina' },
      { title: 'Witte Vlekkenplan', href: '/voor-clubs/club-oprichten', type: 'Pagina' },
    ],
  },
  {
    title: 'Opleidingen en wedstrijden',
    documents: [
      { title: 'Opleidingsgids Trainer-Coach Schermen (TCS1-5)', href: 'docs/knas-opleidingen-tcs1-5.pdf', type: 'PDF' },
      { title: 'Handleiding jeugdpuntentoernooi 2025-2026', href: 'docs/source/handleiding-jeugdpuntentoernooi-2025-2026.pdf', type: 'PDF' },
      { title: 'Handboek Schermer 2025', href: 'docs/source/handboek-schermer-2025.pdf', type: 'PDF' },
    ],
  },
  {
    title: 'Beleid',
    documents: [
      { title: 'Meerjarenbeleidsplan 2025-2028', href: 'docs/policy/meerjarenbeleidsplan-2025-2028.pdf', type: 'PDF' },
      { title: 'VOG-beleid KNAS (juli 2024)', href: 'docs/policy/vog-beleid-2024.pdf', type: 'PDF' },
      { title: 'Vrijwilligersbeleid 2025', href: 'docs/source/vrijwilligersbeleid-2025.pdf', type: 'PDF' },
      { title: 'Beleid diversiteit en inclusie 2025', href: 'docs/source/beleid-diversiteit-inclusie-2025.pdf', type: 'PDF' },
      { title: 'Privacyverklaring', href: 'docs/policy/privacyverklaring.pdf', type: 'PDF' },
    ],
  },
];

export default function ClubDocumentenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Voor clubs', href: '/voor-clubs' }, { label: 'Documenten en formulieren' }]} />
          <div className="k-page-header__split">
          <div>
          <h1 className="k-page-header__title">Documenten en formulieren</h1>
          <p className="k-lead k-page-header__intro">Reglementen, handleidingen en beleidsstukken voor verenigingen op één plek.</p>
          </div>
          <HeaderMosaic images={['images/epee/epee-1.jpg', 'images/foil/foil-3.jpg', 'images/sabre/sabre-5.jpg']} />
          </div>
        </div>
      </header>

      <div className="k-container k-section k-section--tight-top k-grid k-grid--2">
        {groups.map((group, index) => (
          <section key={group.title} aria-labelledby={`docs-group-${index}`}>
            <h2 id={`docs-group-${index}`} className="k-block-title">{group.title}</h2>
            <ul className="k-rule-documents">
              {group.documents.map((doc) => {
                const internal = doc.type === 'Pagina';
                return (
                  <li key={doc.href}>
                    <a href={doc.href} {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                      {internal ? <ArrowRight aria-hidden="true" /> : <FileText aria-hidden="true" />}
                      <span>{doc.title}</span>
                      <span className="k-rule-documents__type">{doc.type}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
