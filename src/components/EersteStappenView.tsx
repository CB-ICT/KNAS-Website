import { Check, Shirt, ShieldCheck, Swords } from 'lucide-react';
import { Breadcrumb, Button, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const steps = [
  {
    number: '01',
    title: 'Kies een club',
    text: 'Zoek een vereniging in de buurt. Bekijk welke wapens, leeftijden en trainingsmomenten passen bij jou.',
  },
  {
    number: '02',
    title: 'Plan een proefles',
    text: 'Neem contact op met de club en vraag wanneer je kunt kennismaken. Vaak is aanmelden vooraf genoeg.',
  },
  {
    number: '03',
    title: 'Probeer het uit',
    text: 'Je krijgt uitleg, leenmateriaal en oefeningen. Een trainer begeleidt je bij je eerste stappen op de loper.',
  },
];

export default function EersteStappenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Beginnen', href: '/beginnen' }, { label: 'Eerste stappen en proefles' }]} />
          <div className="k-page-header__split">
          <div>
          <p className="k-eyebrow k-page-header__eyebrow">Eerste stappen</p>
          <h1 className="k-page-header__title">Zo ziet je eerste keer eruit</h1>
          <p className="k-lead k-page-header__intro">Je hoeft geen ervaring of eigen materiaal te hebben. Een proefles is de makkelijkste manier om te ontdekken of schermen bij je past.</p>
          <div className="k-page-header__actions">
            <Button variant="primary" href="/clubs">Vind een club</Button>
            <Button variant="secondary" href="/beginnen">Lees eerst over schermen</Button>
            <Button variant="text" href="/beginnen/veelgestelde-vragen">Bekijk de veelgestelde vragen</Button>
          </div>
          </div>
          <HeaderMosaic images={['images/youth/youth-3.jpg', 'images/youth/youth-1.jpg', 'images/youth/youth-5.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'steps-title', label: 'De drie stappen' },
          { id: 'bring-title', label: 'Wat neem je mee?' },
          { id: 'safe-title', label: 'Veilig leren' },
        ]}
      />

      <div>
        <section className="k-section" aria-labelledby="steps-title">
          <div className="k-container">
            <div className="k-section__head k-section__head--stacked">
              <div>
                <p className="k-eyebrow">In drie stappen</p>
                <h2 id="steps-title">Van nieuwsgierig naar op de loper</h2>
              </div>
            </div>
            <ol className="k-steps">
              {steps.map((step) => (
                <li key={step.number} className="k-step">
                  <span className="k-step__number" aria-hidden="true">{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="k-section k-section--subtle" aria-labelledby="bring-title">
          <div className="k-container k-grid k-grid--3">
            <div className="k-section__head k-section__head--stacked k-first-steps-intro">
              <p className="k-eyebrow">Praktisch</p>
              <h2 id="bring-title">Wat neem je mee?</h2>
              <p className="k-lead">Voor de eerste training is gewone sportkleding meestal voldoende. De club vertelt wat lokaal handig is.</p>
            </div>
            <article className="k-intro-point"><Shirt aria-hidden="true" /><h3>Sportkleding</h3><p>Comfortabele kleding waarin je makkelijk beweegt en sportschoenen met grip.</p></article>
            <article className="k-intro-point"><Swords aria-hidden="true" /><h3>Leenmateriaal</h3><p>Masker, vest, handschoen en wapen zijn bij veel clubs beschikbaar voor beginners.</p></article>
          </div>
        </section>

        <section className="k-section" aria-labelledby="safe-title">
          <div className="k-container k-layout-content">
            <div className="k-layout-content__main">
              <p className="k-eyebrow">Veilig leren</p>
              <h2 id="safe-title">Je begint rustig en onder begeleiding</h2>
              <ul className="k-check-list">
                <li><Check aria-hidden="true" /> Eerst voetenwerk, afstand en houding</li>
                <li><Check aria-hidden="true" /> Daarna eenvoudige aanval en verdediging</li>
                <li><Check aria-hidden="true" /> Altijd met uitleg van een trainer</li>
                <li><Check aria-hidden="true" /> Eigen materiaal pas wanneer je zeker weet dat je wilt doorgaan</li>
              </ul>
            </div>
            <aside className="k-aside-note k-layout-content__aside"><ShieldCheck aria-hidden="true" /><strong>Vraag het aan de club</strong><p>Iedere vereniging heeft eigen proeflessen en trainingsgroepen. Informeer vooraf naar leeftijd, tijden en materiaal.</p></aside>
          </div>
        </section>

        <section className="k-section k-section--inverse k-on-dark" aria-labelledby="first-steps-next">
          <div className="k-container k-next-step"><div><p className="k-eyebrow">Klaar om te kijken?</p><h2 id="first-steps-next">Vind een vereniging bij jou in de buurt</h2></div><Button variant="primary" href="/clubs">Vind een club</Button></div>
        </section>
      </div>
    </div>
  );
}
