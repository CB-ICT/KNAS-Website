import { Mail } from 'lucide-react';
import { Accordion, Breadcrumb, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const boardMembers = [
  { name: 'Roeland Reesinck', role: 'Voorzitter', email: 'voorzitter@knas.nl', image: 'images/board/roeland-reesinck.png' },
  { name: 'Remco Middelveld', role: 'Secretaris', email: 'secretaris@knas.nl', image: 'images/board/remco-middelveld.png' },
  { name: 'Patrice Masson', role: 'Penningmeester', email: 'penningmeester@knas.nl', image: 'images/board/patrice-masson.jpg' },
  { name: 'Jan-Willem Lammers', role: 'Bestuurslid', email: 'info@knas.nl', image: 'images/board/jan-willem-lammers.png' },
  { name: 'Claudia Bokel', role: 'Bestuurslid', email: 'info@knas.nl', image: 'images/board/claudia-bokel.png' },
];

type Commissie = { naam: string; doel: string; contact?: string; leden: string[] };

const commissieGroups: { title: string; items: Commissie[] }[] = [
  {
    title: 'Wedstrijden en reglementen',
    items: [
      { naam: 'Wedstrijden, Ondersteuning en Ranglijsten', doel: 'Beheert de wedstrijdkalender, ondersteunt organisatoren en onderhoudt de ranglijsten.', contact: 'wedstrijdzaken@knas.nl', leden: ['Christian Jansen', 'Henri Faber', 'Paul van Dam', 'Lars Kramer', 'Mark Balasz Farkas'] },
      { naam: 'Scheidsrechterscommissie', doel: 'Ondersteunt scheidsrechters, organiseert opleidingen en verzorgt de inzet bij kampioenschappen.', contact: 'scheidsrechters@knas.nl', leden: ['Nico Speelman', 'Hugo-Jan Dulfer', 'Katja Schober', 'Patrick Pieters', 'Niels Bosman', 'Daan Weber'] },
      { naam: 'Reglementencommissie', doel: 'Werkt aan de toepassing, actualisering en uitleg van de reglementen.', leden: ['Evert Jan Smit', 'Nico Speelman', 'Tristan Tulen'] },
      { naam: 'Materiaalcommissie', doel: 'Beheert het KNAS-materiaal en regelt opslag, uitgifte en retour.', contact: 'materiaal@knas.nl', leden: ['Kees Boon', 'Evert Jan Smit'] },
    ],
  },
  {
    title: 'Topsport en internationaal',
    items: [
      { naam: 'Atletencommissie', doel: 'Behartigt de belangen van topsporters en adviseert over topsportbeleid.', leden: ['Tristan Tulen', 'Teun Jans Köhneke', 'Marleen Buitenhuis'] },
      { naam: 'KNAS Internationaal', doel: 'Verwerkt informatie en inschrijvingen voor FIE- en EFC-wedstrijden.', contact: 'knasinternationaal@knas.nl', leden: ['Anton Oskamp', 'Remco Middelveld'] },
    ],
  },
  {
    title: 'Opleidingen',
    items: [
      { naam: 'KNAS Opleidingen', doel: 'Ondersteunt de opleidingen voor trainers en scheidsrechters.', contact: 'opleidingen@knas.nl', leden: ['Frans Posthuma'] },
      { naam: 'Toetsingscommissie', doel: 'Bewaakt de kwaliteit van de toetsing en behandelt vrijstellingen (EVC).', leden: ['Floris Nonhebel'] },
    ],
  },
  {
    title: 'Specifieke doelgroepen',
    items: [
      { naam: 'Commissie Veteranen', doel: 'Adviseert over het veteranenschermen, het wedstrijdcircuit en deelname aan EK en WK.', leden: ['Paul v.d. Berg', 'Paul van Dam', 'Ans Hom', 'Sef Laschek'] },
      { naam: 'Commissie Rolstoelschermen', doel: 'Adviseert over de ontwikkeling en toegankelijkheid van rolstoelschermen.', leden: ['Gaby van Ertekin'] },
    ],
  },
  {
    title: 'Advies en organisatie',
    items: [
      { naam: 'Financiële Commissie', doel: 'Beoordeelt het financiële beleid en het beheer van de bondsmiddelen.', leden: ['Sef Laschek', 'Martijn Hengeveld', 'Bas von Königslöw'] },
      { naam: 'Commissie Strategie en Innovatie', doel: 'Ontwikkelt vernieuwingsvoorstellen en de koers voor de lange termijn.', leden: ['Spencer van Erven', 'Ineke Knape', 'Etienne Van Cann', 'Cheryl de Jong', 'Anton Oskamp', 'Siebren Tigchelaar'] },
      { naam: 'Medische commissie', doel: 'Adviseert het bestuur over medisch beleid en sportmedische onderwerpen.', contact: 'info@fysiotherapievangilst.nl', leden: ['Pieter van Gilst'] },
      { naam: 'PR en communicatie', doel: 'Verzorgt communicatie over toernooien, promotie van de schermsport, de website en sociale media.', contact: 'media@knas.nl', leden: ['Paul Water', 'Julius Wagenaar', 'Sonja Lendi', 'Carmen Berends'] },
    ],
  },
];

export default function BestuurCommissiesView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-10.jpg" alt="Trainers en een schermer langs de loper tijdens een toernooi" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Over de KNAS', href: '/over-de-knas' }, { label: 'Bestuur en commissies' }]} />
          <h1 className="k-page-header__title">Bestuur en commissies</h1>
          <p className="k-lead k-page-header__intro">
            Het bestuur bepaalt de koers van de KNAS. Commissies van vrijwilligers werken de onderwerpen uit, van wedstrijden en scheidsrechters tot topsport en opleidingen.
          </p>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'org-bestuur-title', label: 'Bestuur' },
          { id: 'org-commissies-title', label: 'Commissies' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="org-bestuur-title">
        <div className="k-container">
          <h2 id="org-bestuur-title" className="k-block-title">Bestuur</h2>
          <p className="k-lead k-onzerelaties-intro">Het bestuur stelt de koers en het meerjarenbeleid vast, is verantwoordelijk voor de financiën en het bondsbureau, en legt verantwoording af aan de algemene ledenvergadering.</p>
          <div className="k-grid k-grid--3">
            {boardMembers.map((member) => (
              <article key={member.name} className="k-person">
                <img src={member.image} alt="" />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="org-commissies-title">
        <div className="k-container k-container--narrow">
          <h2 id="org-commissies-title" className="k-block-title">Commissies</h2>
          {commissieGroups.map((group) => (
            <div key={group.title} className="k-accordion-group">
              <h3 className="k-rule-subhead">{group.title}</h3>
              <Accordion
                items={group.items.map((c) => ({
                  question: c.naam,
                  answer: (
                    <>
                      <p>{c.doel}</p>
                      {c.leden.length > 0 && <p><strong>Leden:</strong> {c.leden.join(', ')}</p>}
                      {c.contact && <p><a href={`mailto:${c.contact}`} className="k-inline-link"><Mail aria-hidden="true" /> {c.contact}</a></p>}
                    </>
                  ),
                }))}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
