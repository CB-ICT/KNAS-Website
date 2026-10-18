import { defineContent } from '../index';

export default defineContent({
  nl: {
    breadcrumb: 'Privacy op deze website',
    title: 'Privacy op deze website',
    lead: 'Wat deze website wel en niet met je gegevens doet.',
    noTrackingTitle: 'Geen cookies en geen tracking',
    noTracking: "Deze website plaatst geen cookies en gebruikt geen analyse- of advertentiediensten. Lettertypen, foto's, documenten, nieuws en de wedstrijdkalender worden vanaf deze website zelf geladen.",
    thirdPartiesTitle: 'Diensten van derden',
    thirdParties: [
      { title: 'Kaart bij Vind een club.', text: 'De kaart gebruikt kaarttegels van OpenStreetMap. Als je die pagina opent, vraagt je browser de kaarttegels op bij OpenStreetMap; daarbij ziet OpenStreetMap je IP-adres.' },
      { title: 'Zoeken op plaats of postcode.', text: 'Als je bij Vind een club op Zoeken klikt met een plaats of postcode, gaat die zoekterm naar de Locatieserver van PDOK (Kadaster) om de locatie te bepalen. Zoeken op een clubnaam gebeurt alleen in je eigen browser.' },
      { title: 'Links naar andere websites.', text: 'Links naar onder meer Nahouw, OnzeRelaties, onzeranglijsten.net, knas.nl, de FIE en sociale media openen een andere website. Daar geldt het privacybeleid van die website.' },
      { title: 'E-mailadressen.', text: 'Een e-maillink opent je eigen e-mailprogramma. Deze website slaat zelf geen berichten of formuliergegevens op.' },
    ],
    statementTitle: 'Privacyverklaring van de KNAS',
    statement: 'Hoe de KNAS als bond persoonsgegevens verwerkt, bijvoorbeeld voor de ledenadministratie, staat in de privacyverklaring.',
    statementLink: 'Privacyverklaring KNAS (pdf)',
  },
  en: {
    breadcrumb: 'Privacy on this website',
    title: 'Privacy on this website',
    lead: 'What this website does and does not do with your data.',
    noTrackingTitle: 'No cookies and no tracking',
    noTracking: 'This website does not set cookies and does not use any analytics or advertising services. Fonts, photos, documents, news and the competition calendar are all served from this website itself.',
    thirdPartiesTitle: 'Third-party services',
    thirdParties: [
      { title: 'Map on Find a club.', text: 'The map uses map tiles from OpenStreetMap. When you open that page, your browser requests the tiles from OpenStreetMap, which means OpenStreetMap can see your IP address.' },
      { title: 'Searching by town or postcode.', text: 'If you click Search on Find a club with a town or postcode, that search term is sent to the PDOK Locatieserver (Kadaster, the Dutch land registry) to determine the location. Searching by club name happens entirely in your own browser.' },
      { title: 'Links to other websites.', text: 'Links to sites such as Nahouw, OnzeRelaties, onzeranglijsten.net, knas.nl, the FIE and social media open another website. The privacy policy of that website applies there.' },
      { title: 'Email addresses.', text: 'An email link opens your own email program. This website does not store any messages or form data itself.' },
    ],
    statementTitle: 'KNAS privacy statement',
    statement: 'How the KNAS, as a federation, processes personal data, for example for membership administration, is set out in its privacy statement.',
    statementLink: 'KNAS privacy statement (PDF, in Dutch)',
  },
});
