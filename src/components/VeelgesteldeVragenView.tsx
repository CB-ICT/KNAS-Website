import { HelpCircle } from 'lucide-react';
import { Accordion, Breadcrumb, Button } from '../ui/components';
import { faqData } from '../data';
import '../ui/templates/templates.css';

const beginnerFaq = [
  ...faqData,
  {
    id: 'faq-first-lesson',
    question: 'Wat gebeurt er tijdens een eerste les?',
    answer: 'Je maakt kennis met de trainer, krijgt uitleg over veiligheid en probeert eenvoudige oefeningen met voetenwerk, afstand en houding. Daarna kun je meestal met leenmateriaal een korte oefenpartij doen.',
  },
  {
    id: 'faq-clothing',
    question: 'Welke kleding heb ik nodig?',
    answer: 'Draag comfortabele sportkleding waarin je makkelijk beweegt en sportschoenen met grip. Voor een proefles hoef je meestal nog geen speciale schermkleding te hebben.',
  },
  {
    id: 'faq-weapon-choice',
    question: 'Moet ik vooraf al een wapen kiezen?',
    answer: 'Nee. Veel beginners maken eerst kennis met de basis en ontdekken daarna welk wapen bij hen past. De trainer kan je helpen kiezen op basis van tempo, tactiek en wat je leuk vindt.',
  },
  {
    id: 'faq-competition',
    question: 'Moet ik aan wedstrijden meedoen?',
    answer: 'Nee. Je kunt recreatief trainen zolang je wilt. Wie wedstrijden leuk vindt, kan via de club rustig kennismaken met lokale wedstrijden en later doorgroeien.',
  },
];

export default function VeelgesteldeVragenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-08.jpg" alt="Floretschermers in een partij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Beginnen', href: '/beginnen' }, { label: 'Veelgestelde vragen' }]} />
          <p className="k-eyebrow k-page-header__eyebrow">Praktisch</p>
          <h1 className="k-page-header__title">Veelgestelde vragen</h1>
          <p className="k-lead k-page-header__intro">Alles wat je wilt weten voordat je begint met schermen: van een proefles en materiaal tot leeftijd, veiligheid en kosten.</p>
        </div>
      </header>

      <div>
        <section className="k-section k-faq-section" aria-labelledby="faq-main-title">
          <div className="k-container k-container--narrow">
            <div className="k-faq-intro">
              <HelpCircle aria-hidden="true" />
              <div><h2 id="faq-main-title">Zoek je antwoord</h2><p>Open een vraag om het korte antwoord te lezen. Kom je er niet uit, vraag het dan aan de club waar je wilt kennismaken.</p></div>
            </div>
            <div className="k-faq-page-list">
              <Accordion name="beginner-faq-page" items={beginnerFaq.map((faq) => ({ question: faq.question, answer: <p>{faq.answer}</p> }))} />
            </div>
          </div>
        </section>

        <section className="k-section k-section--subtle k-next-step-light" aria-labelledby="faq-next-title">
          <div className="k-container k-next-step"><div><p className="k-eyebrow">Nog een vraag?</p><h2 id="faq-next-title">Een club kan je verder helpen</h2><p>Vraag naar een proefles, trainingsgroep en de mogelijkheden bij jou in de buurt.</p></div><Button variant="primary" href="/clubs">Vind een club</Button></div>
        </section>
      </div>
    </div>
  );
}
