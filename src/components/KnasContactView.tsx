import { Breadcrumb, Button, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const contacts = [
  { topic: 'Algemene vragen en verenigingsondersteuning', email: 'info@knas.nl' },
  { topic: 'Ledenadministratie', email: 'leden@knas.nl' },
  { topic: 'Facturen en declaraties', email: 'facturen@knas.nl' },
  { topic: 'Wedstrijdzaken en ranglijsten', email: 'wedstrijdzaken@knas.nl' },
  { topic: 'Internationale inschrijvingen', email: 'knasinternationaal@knas.nl' },
  { topic: 'Scheidsrechters', email: 'scheidsrechters@knas.nl' },
  { topic: 'Opleidingen', email: 'opleidingen@knas.nl' },
  { topic: 'Pers en media', email: 'media@knas.nl' },
  { topic: 'Website', email: 'webmaster@knas.nl' },
];

export default function KnasContactView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Over de KNAS', href: '/over-de-knas' }, { label: 'Contact' }]} />
          <div className="k-page-header__split">
          <div>
          <h1 className="k-page-header__title">Contact</h1>
          <p className="k-lead k-page-header__intro">
            Het bondsbureau in Nieuwegein is het aanspreekpunt voor ledenadministratie, verenigingsondersteuning, wedstrijdorganisatie en materiaal.
          </p>
          </div>
          <HeaderMosaic images={['images/referees/referees-4.jpg', 'images/youth/youth-4.jpg', 'images/referees/referees-7.jpg']} />
          </div>
        </div>
      </header>
      <SectionNav
        items={[
          { id: 'contact-office-title', label: 'Bondsbureau' },
          { id: 'contact-topics-title', label: 'Per onderwerp' },
          { id: 'contact-vacatures-title', label: 'Vrijwilligerswerk' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="contact-office-title">
        <div className="k-container">
          <h2 id="contact-office-title" className="k-block-title">Bondsbureau</h2>
          <ul className="k-rule-facts">
            <li><strong>Bezoekadres</strong> Kelvinbaan 48, 3439 MT Nieuwegein</li>
            <li><strong>Postadres</strong> Postbus 2650, 3430 GB Nieuwegein</li>
            <li><strong>Telefoon en e-mail</strong> <a href="tel:+31642340974">06 4234 0974</a> · <a href="mailto:info@knas.nl">info@knas.nl</a></li>
          </ul>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="contact-topics-title">
        <div className="k-container k-container--narrow">
          <h2 id="contact-topics-title" className="k-block-title">Contact per onderwerp</h2>
          <ul className="k-wedstrijd-overzicht k-clubs-contact">
            {contacts.map((contact) => (
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

      <section className="k-section k-section--subtle" aria-labelledby="contact-vacatures-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="contact-vacatures-title">Vrijwilligerswerk en vacatures</h2>
            <p>De KNAS draait grotendeels op vrijwilligers. We zoeken regelmatig mensen voor het bestuur, commissies of projecten. Ook zonder openstaande vacature horen we graag van je.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="secondary" href="mailto:info@knas.nl?subject=Vrijwilligerswerk">Laat van je horen</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
