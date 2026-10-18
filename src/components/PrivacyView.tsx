import { FileText } from 'lucide-react';
import { Breadcrumb } from '../ui/components';
import '../ui/templates/templates.css';

// Beschrijft alleen wat deze website technisch doet; de verwerking door de bond staat in de privacyverklaring van de KNAS.
export default function PrivacyView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy op deze website' }]} />
          <h1 className="k-page-header__title">Privacy op deze website</h1>
          <p className="k-lead k-page-header__intro">Wat deze website wel en niet met je gegevens doet.</p>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="privacy-site-title">
        <div className="k-container k-container--reading k-prose k-prose--spaced">
          <h2 id="privacy-site-title">Geen cookies en geen tracking</h2>
          <p>Deze website plaatst geen cookies en gebruikt geen analyse- of advertentiediensten. Lettertypen, foto's, documenten, nieuws en de wedstrijdkalender worden vanaf deze website zelf geladen.</p>

          <h2>Diensten van derden</h2>
          <ul>
            <li><strong>Kaart bij Vind een club.</strong> De kaart gebruikt kaarttegels van OpenStreetMap. Als je die pagina opent, vraagt je browser de kaarttegels op bij OpenStreetMap; daarbij ziet OpenStreetMap je IP-adres.</li>
            <li><strong>Zoeken op plaats of postcode.</strong> Als je bij Vind een club op Zoeken klikt met een plaats of postcode, gaat die zoekterm naar de Locatieserver van PDOK (Kadaster) om de locatie te bepalen. Zoeken op een clubnaam gebeurt alleen in je eigen browser.</li>
            <li><strong>Links naar andere websites.</strong> Links naar onder meer Nahouw, OnzeRelaties, onzeranglijsten.net, knas.nl, de FIE en sociale media openen een andere website. Daar geldt het privacybeleid van die website.</li>
            <li><strong>E-mailadressen.</strong> Een e-maillink opent je eigen e-mailprogramma. Deze website slaat zelf geen berichten of formuliergegevens op.</li>
          </ul>

          <h2>Privacyverklaring van de KNAS</h2>
          <p>Hoe de KNAS als bond persoonsgegevens verwerkt, bijvoorbeeld voor de ledenadministratie, staat in de privacyverklaring.</p>
          <p>
            <a href="docs/policy/privacyverklaring.pdf" className="k-inline-link" target="_blank" rel="noopener noreferrer">
              <FileText aria-hidden="true" /> Privacyverklaring KNAS (pdf)<span className="k-visually-hidden"> (opent in nieuw venster)</span>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
