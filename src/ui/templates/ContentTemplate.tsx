import { Accordion } from '../components';
import { mainNav } from '../navigation';
import { PageHeader, PageShell, Placeholder, SkeletonLines } from './PageShell';

/*
 * Contentpagina (bv. "Hoe werkt een toernooi?").
 * Zijbalk = sectienavigatie (zelfde groep als in het mega-menu) zodat je zonder terug te gaan verder kunt.
 * Op mobiel staat de sectienavigatie ONDER de tekst: eerst het antwoord, dan pas doorklikken.
 */
export default function ContentTemplate() {
  const section = mainNav.find((item) => item.id === 'wedstrijden')!;
  const currentPath = '/wedstrijden/voorbereiden';

  return (
    <PageShell currentPath={currentPath}>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: section.label, href: section.href }, { label: '[Paginatitel]' }]}
        title="[Paginatitel]"
        intro={<SkeletonLines lines={2} />}
      />
      <div className="k-container k-layout-content k-section k-section--flush-top">
        <div className="k-layout-content__main">
          <nav className="k-toc" aria-labelledby="toc-title">
            <p id="toc-title" className="k-toc__title">Op deze pagina</p>
            <ol>
              <li><a href="#deel-1">[Tussenkop 1]</a></li>
              <li><a href="#deel-2">[Tussenkop 2]</a></li>
              <li><a href="#faq">Veelgestelde vragen</a></li>
            </ol>
          </nav>
          <div className="k-prose">
            <h2 id="deel-1">[Tussenkop 1]</h2>
            <SkeletonLines lines={4} />
            <h2 id="deel-2">[Tussenkop 2]</h2>
            <SkeletonLines lines={3} />
            <Placeholder label="Afbeelding, video of Alert (optioneel)" height="10rem" />
          </div>
          <section id="faq" aria-labelledby="faq-title" className="k-layout-content__faq">
            <h2 id="faq-title">Veelgestelde vragen</h2>
            <Accordion
              name="faq"
              items={[
                { question: '[Vraag 1]', answer: <SkeletonLines lines={2} /> },
                { question: '[Vraag 2]', answer: <SkeletonLines lines={2} /> },
                { question: '[Vraag 3]', answer: <SkeletonLines lines={2} /> },
              ]}
            />
          </section>
        </div>

        <aside className="k-layout-content__aside" aria-label={`Meer in ${section.label}`}>
          <nav className="k-subnav" aria-labelledby="subnav-title">
            <p id="subnav-title" className="k-subnav__title">{section.label}</p>
            {section.groups.map((group) => (
              <ul key={group.title}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} aria-current={link.href === currentPath ? 'page' : undefined}>{link.label}</a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
          <Placeholder label="Hulpblok: vraag? contactpersoon / e-mail" height="8rem" />
        </aside>
      </div>
    </PageShell>
  );
}
