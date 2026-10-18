import { Button } from '../components';
import { PageHeader, PageShell, Placeholder, SkeletonLines } from './PageShell';

interface DetailTemplateProps {
  variant?: 'artikel' | 'club';
}

/*
 * Detailpagina. Artikel: één leeskolom (max. 68 tekens) voor rust.
 * Club: inhoud + zijbalk met de kerntaak ("Plan een proefles") die op mobiel direct ná de intro komt.
 */
export default function DetailTemplate({ variant = 'artikel' }: DetailTemplateProps) {
  if (variant === 'club') {
    return (
      <PageShell currentPath="/clubs">
        <PageHeader
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Vind een club', href: '/clubs' }, { label: '[Clubnaam]' }]}
          title="[Clubnaam]"
          intro={<SkeletonLines lines={1} />}
        />
        <div className="k-container k-layout-aside k-section k-section--flush-top">
          <aside className="k-layout-aside__aside" aria-label="Contact en proefles">
            <div className="k-panel">
              <Placeholder label="Adres · trainingstijden · wapens" height="9rem" />
              <Button variant="primary" href="#proefles" fullWidth>Plan een proefles</Button>
              <Button variant="secondary" href="#website" fullWidth>Website van de club</Button>
            </div>
          </aside>
          <div className="k-layout-aside__main k-stack" style={{ ['--stack-gap' as string]: 'var(--space-6)' }}>
            <Placeholder label="Foto van de club" height="16rem" />
            <section aria-labelledby="club-about">
              <h2 id="club-about">Over de club</h2>
              <SkeletonLines lines={4} />
            </section>
            <section aria-labelledby="club-training">
              <h2 id="club-training">Trainingen</h2>
              <Placeholder label="DataTable: dag · tijd · groep · wapen" height="10rem" />
            </section>
            <section aria-labelledby="club-location">
              <h2 id="club-location">Locatie</h2>
              <Placeholder label="Kaart" height="14rem" />
            </section>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell currentPath="/nieuws">
      <article>
        <PageHeader
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Nieuws', href: '/nieuws' }, { label: '[Titel]' }]}
          eyebrow="[Categorie]"
          title="[Titel van het artikel]"
          intro={<p className="k-muted">[Datum] · [Leestijd] · [Auteur]</p>}
        />
        <div className="k-container k-container--reading k-section k-section--flush-top k-stack" style={{ ['--stack-gap' as string]: 'var(--space-6)' }}>
          <Placeholder label="Omslagfoto (16:9) + bijschrift" height="20rem" />
          <div className="k-prose">
            <SkeletonLines lines={4} />
            <SkeletonLines lines={5} />
            <SkeletonLines lines={3} />
          </div>
          <Placeholder label="Downloads / bijlagen (optioneel)" height="5rem" />
          <Button variant="text" href="/nieuws">Terug naar nieuws</Button>
        </div>
      </article>
      <section className="k-section k-section--subtle" aria-labelledby="related">
        <div className="k-container">
          <h2 id="related" className="k-related__title">Meer nieuws</h2>
          <div className="k-grid k-grid--3">
            {[1, 2, 3].map((n) => <Placeholder key={n} label="NewsCard" height="18rem" />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
