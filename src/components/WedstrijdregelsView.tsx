import { useState } from 'react';
import { ArrowRight, Clock3, FileText } from 'lucide-react';
import { Accordion, Breadcrumb, Button, DataTable, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

const sections = [
  { id: 'partij', label: 'Wedstrijdverloop' },
  { id: 'wapens', label: 'Treffers' },
  { id: 'kaarten', label: 'Kaarten' },
  { id: 'passiviteit', label: 'Passiviteit' },
  { id: 'categorieen', label: 'Categorieën' },
  { id: 'materiaal', label: 'Materiaal' },
  { id: 'documenten', label: 'Documenten' },
];

const weaponRows = [
  {
    id: 'floret', wapen: 'Floret',
    trefvlak: 'De romp, inclusief het geleidende deel van de maskerbaard',
    raken: 'Met de punt',
    tweeLampen: 'De scheidsrechter bepaalt wie voorrang had. Een correct uitgevoerde aanval gaat voor een tegenaanval; na een geslaagde parade heeft de riposte voorrang. Vallen twee aanvallen echt tegelijk, dan telt geen van beide.',
    buiten: 'Het witte lampje gaat aan. De actie stopt en er valt geen punt. Raakt de schermer met voorrang buiten het trefvlak, dan telt ook de geldige treffer van de tegenstander niet.',
  },
  {
    id: 'degen', wapen: 'Degen',
    trefvlak: 'Het hele lichaam, van masker tot voet',
    raken: 'Met de punt',
    tweeLampen: 'Er is geen voorrang: alleen de tijd telt. Raken beide schermers binnen 40 tot 50 milliseconden, dan krijgen ze allebei een punt. Is het verschil groter, dan gaat alleen de lamp van de eerste treffer aan.',
    buiten: 'Bestaat bij degen niet, want het hele lichaam telt. Een treffer op de geaarde loper of op de kom van het wapen registreert het apparaat niet.',
  },
  {
    id: 'sabel', wapen: 'Sabel',
    trefvlak: 'Boven de heuplijn, inclusief hoofd en armen, maar niet de handen',
    raken: 'Met de punt en de snijkanten',
    tweeLampen: 'Net als bij floret bepaalt de scheidsrechter wie voorrang had: een aanval gaat voor een tegenaanval, na een parade heeft de riposte voorrang. Vallen twee aanvallen echt tegelijk, dan telt geen van beide.',
    buiten: 'Er is geen wit lampje: het apparaat registreert alleen geldige treffers. Een treffer buiten het trefvlak telt niet en de partij gaat gewoon door.',
  },
];

const passivityRows = [
  { id: 'eerste', moment: 'Eerste keer', sanctie: 'P-rood voor beide schermers', gevolg: 'Beide tegenstanders krijgen een straftreffer. De partij gaat verder.' },
  { id: 'tweede', moment: 'Tweede keer in dezelfde partij', sanctie: 'P-zwart voor één schermer', gevolg: 'Wie achterstaat, verliest de partij. Bij gelijke stand beslist de oorspronkelijke startplaatsing, niet de plaatsing na de poules. Volgens de FIE volgt die uit de FIE-ranglijst; niet-gerangschikte schermers worden onderling ingeloot.' },
];

const ageCategories = [
  { name: 'Kuikens', age: 'U10', note: '7–9 jaar' },
  { name: 'Benjamins', age: 'U12', note: '10–11 jaar' },
  { name: 'Pupillen', age: 'U14', note: '12–13 jaar' },
  { name: 'Cadetten', age: 'U17', note: 'Jonger dan 17 op de peildatum' },
  { name: 'Junioren', age: 'U20', note: 'Jonger dan 20 op de peildatum' },
  { name: 'Onder 23', age: 'U23', note: 'Apart circuit, bijvoorbeeld FFE: maximaal 22 jaar' },
  { name: 'Senioren', age: 'Open', note: 'Geen maximumleeftijd' },
  { name: 'Veteranen', age: '40+', note: 'Groepen 40–49 · 50–59 · 60–69 · 70+' },
];

const materialRows = [
  { id: 'jong', categorie: 'Kuikens en benjamins', kleding: '350 N', ondervest: '800 N', masker: '350 N', kling: 'Normaal (maat 0)' },
  { id: 'pupillen', categorie: 'Pupillen', kleding: '800 N', ondervest: '800 N', masker: '1600 N', kling: 'Normaal (maat 5) · sabel S2000+' },
  { id: 'ouder', categorie: 'Cadetten, junioren en senioren', kleding: '800 N', ondervest: '800 N', masker: '1600 N', kling: 'FIE-keurmerk (floret/degen) · sabel S2000+' },
];

const cards = [
  { color: 'yellow', name: 'Waarschuwing', text: 'Bij bepaalde overtredingen krijg je eerst geel. Herhaling kan rood opleveren.' },
  { color: 'red', name: 'Straftreffer', text: 'Je tegenstander krijgt een punt. Soms volgt direct rood, zonder waarschuwing.' },
  { color: 'black', name: 'Uitsluiting', text: 'Bij ernstige overtredingen: uitsluiting van de competitie en mogelijk verdere sancties.' },
];

const technicalRules = 'https://static.fie.org/uploads/40/204126-Technical%20rules%20August%202026%20ang.pdf';
const organisationRules = 'https://static.fie.org/uploads/40/204282-Organisation%20rules%20August%202026%20ang.pdf';
const materialRules = 'https://static.fie.org/uploads/40/204156-book%20material%20August%202026%20ang.pdf';
const knasMaterial = 'https://www.knas.nl/sites/www.knas.nl/files/file/487/Veiligheids-%20en%20Materiaaleisen%202010.pdf';
const jptGuide = 'docs/source/handleiding-jeugdpuntentoernooi-2025-2026.pdf';

const documentGroups = [
  {
    title: 'KNAS',
    documents: [
      { title: 'Algemeen Reglement', meta: '2025 · PDF', href: 'docs/policy/algemeen-reglement-2025.pdf' },
      { title: 'Veiligheids- en materiaaleisen', meta: '2010 · PDF', href: knasMaterial },
      { title: 'Handleiding jeugdpuntentoernooi', meta: '2025–2026 · PDF', href: jptGuide },
      { title: 'Handboek voor de scheidsrechter', meta: 'PDF', href: 'https://www.knas.nl/sites/www.knas.nl/files/file/207/Handboek%20voor%20de%20Scheidsrechter.pdf' },
      { title: 'Wedstrijdreglement reclame', meta: 'PDF', href: 'https://www.knas.nl/sites/www.knas.nl/files/file/213/Wedstrijd%20Reglement%20-%20Reclame.pdf' },
    ],
  },
  {
    title: 'FIE (Engelstalig)',
    documents: [
      { title: 'Technical Rules', meta: 'aug. 2026 · PDF', href: technicalRules },
      { title: 'Material Rules', meta: 'aug. 2026 · PDF', href: materialRules },
      { title: 'Organisation Rules', meta: 'aug. 2026 · PDF', href: organisationRules },
      { title: 'Alle actuele FIE-regels', meta: 'fie.org', href: 'https://fie.org/fie/documents/rules' },
    ],
  },
];

function Sources({ links }: { links: { label: string; href: string }[] }) {
  return (
    <p className="k-rule-ref">
      <FileText aria-hidden="true" />
      <span>Bron:</span>
      {links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
    </p>
  );
}

export default function WedstrijdregelsView() {
  const [weaponId, setWeaponId] = useState('floret');
  const weapon = weaponRows.find((item) => item.id === weaponId) ?? weaponRows[0];
  return (
    <div className="k-ds k-reglement-page">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-07.jpg" alt="Degenschermers in een partij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: 'Wedstrijdreglement' }]} />
          <h1 className="k-page-header__title">Wedstrijdreglement</h1>
          <p className="k-lead k-page-header__intro">De regels op de loper. Van de eerste groet tot de beslissende treffer.</p>
        </div>
      </header>

      <SectionNav items={sections} />

      <section id="partij" className="k-reglement-band" aria-labelledby="partij-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">01 / Op de loper</p><h2 id="partij-title">De partij in het kort</h2></div>
          <div className="k-reglement-body">
            <h3 className="k-rule-subhead">Partijduur</h3>
            <dl className="k-rule-metrics">
              <div><dt>Poule</dt><dd><strong>5</strong> treffers<span>Max. 3 minuten</span></dd></div>
              <div><dt>Directe eliminatie</dt><dd><strong>15</strong> treffers<span>3 × 3 minuten, 1 minuut pauze</span></dd></div>
              <div><dt>Veteranen (eliminatie)</dt><dd><strong>10</strong> treffers<span>2 × 3 minuten, 1 minuut pauze</span></dd></div>
              <div><dt>Gelijke eindstand</dt><dd><strong>+1</strong> minuut<span>Met vooraf gelote voorrang</span></dd></div>
            </dl>
            <p className="k-rule-note"><strong>Sabel:</strong> in de eliminatie stopt de eerste periode ook bij 8 treffers (veteranen: 5). Jeugdwedstrijden kunnen afwijken; kijk in de uitnodiging.</p>
            <ol className="k-rule-sequence">
              <li><span>1</span><div><strong>Groet</strong><p>Materiaalcontrole en groet aan tegenstander, scheidsrechter en publiek.</p></div></li>
              <li><span>2</span><div><strong>Scherm</strong><p>Start bij “Allez”. Stop meteen bij “Halte”.</p></div></li>
              <li><span>3</span><div><strong>Sluit af</strong><p>Wacht op de beslissing en eindig met de schermgroet.</p></div></li>
            </ol>
            <Accordion items={[
              { question: 'Hoe werken poule en eliminatie?', answer: (
                <>
                  <p><strong>Poule.</strong> Je schermt tegen iedereen in je groep. Daarna volgt een tussenstand: eerst telt het percentage gewonnen partijen, dan het treffersverschil (gegeven min ontvangen treffers) en dan het aantal gegeven treffers. Die stand bepaalt je plaats in het afvalschema. Bij sommige wedstrijden valt na de poules al een deel van de schermers af.</p>
                  <p><strong>Directe eliminatie.</strong> De hoogst geplaatste schermer treft de laagst geplaatste. Wie wint, gaat door naar de volgende ronde; wie verliest, ligt eruit.</p>
                  <p><strong>Tijd op?</strong> Dan wint wie de meeste treffers heeft. Staat het gelijk, dan wordt eerst geloot wie voorrang krijgt en volgt een extra minuut. De eerste treffer beslist; valt er geen treffer, dan wint de schermer met voorrang. Dit geldt in de poule en in de eliminatie.</p>
                </>
              ) },
            ]} />
            <Sources links={[{ label: 'FIE Technical Rules t.38–t.42', href: `${technicalRules}#page=14` }]} />
          </div>
        </div>
      </section>

      <section id="wapens" className="k-reglement-band k-reglement-band--subtle" aria-labelledby="wapens-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">02 / Wat telt?</p><h2 id="wapens-title">Treffers per wapen</h2><p>Het apparaat registreert. De scheidsrechter beslist.</p></div>
          <div className="k-reglement-body">
            <div className="k-rule-weapons" role="group" aria-label="Wapenregels">
              {weaponRows.map((item) => <button key={item.id} type="button" aria-pressed={weaponId === item.id} onClick={() => setWeaponId(item.id)}>{item.wapen}</button>)}
            </div>
            <dl className="k-rule-weapon-facts" aria-live="polite">
              <div><dt>Trefvlak</dt><dd>{weapon.trefvlak}</dd></div>
              <div><dt>Hoe raak je?</dt><dd>{weapon.raken}</dd></div>
              <div><dt>Twee lampen</dt><dd>{weapon.tweeLampen}</dd></div>
              <div><dt>Buiten het trefvlak</dt><dd>{weapon.buiten}</dd></div>
            </dl>
            <Sources links={[{ label: 'FIE Technical Rules t.76–t.106 (conventies per wapen)', href: technicalRules }]} />
          </div>
        </div>
      </section>

      <section id="kaarten" className="k-reglement-band" aria-labelledby="kaarten-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">03 / Overtredingen</p><h2 id="kaarten-title">Drie kleuren,<br />drie gevolgen</h2><p>Niet elke overtreding begint met geel.</p></div>
          <div className="k-reglement-body">
            <ul className="k-rule-card-comparison">
              {cards.map((card) => <li key={card.color}><span className={`k-penalty-card__swatch k-penalty-card__swatch--${card.color}`} aria-hidden="true" /><h3>{card.name}</h3><p>{card.text}</p></li>)}
            </ul>
            <Accordion items={[{ question: 'Gedrag, masker en grenzen van de loper', answer: <ul><li>Houd je masker op tot “Halte” en vraag daarna om uitleg.</li><li>Gevaarlijk schermen, opzettelijke botsingen en onsportief gedrag kunnen worden bestraft.</li><li>Met beide voeten over de achterlijn? Je tegenstander krijgt een treffer. Voor de zijlijn gelden andere regels.</li></ul> }]} />
            <Sources links={[{ label: 'FIE Technical Rules t.158–t.170 (sanctietabel)', href: `${technicalRules}#page=49` }]} />
          </div>
        </div>
      </section>

      <section id="passiviteit" className="k-reglement-band k-reglement-band--subtle" aria-labelledby="passiviteit-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">04 / Actief blijven</p><h2 id="passiviteit-title">Passiviteit</h2><p>Individuele directe eliminatie en equipewedstrijden. Niet in de poule.</p></div>
          <div className="k-reglement-body">
            <div className="k-rule-clock"><Clock3 aria-hidden="true" /><strong>60<span>seconden</span></strong><p>Schermtijd zonder treffer of treffer buiten het trefvlak?<br /><b>De scheidsrechter roept “Halte”.</b></p></div>
            <ol className="k-rule-passivity">
              {passivityRows.map((row, index) => <li key={row.id}><span className={`k-penalty-card__swatch k-penalty-card__swatch--${index === 0 ? 'red' : 'black'}`} aria-hidden="true" /><div><span className="k-rule-passivity__moment">{row.moment}</span><h3>{row.sanctie}</h3><p>{row.gevolg}</p></div></li>)}
            </ol>
            <div className="k-rule-score"><span>Voorbeeld · eerste P-rood</span><strong>6–4</strong><ArrowRight aria-hidden="true" /><strong>7–5</strong><span>Beiden krijgen een straftreffer.</span></div>
            <Accordion items={[
              { question: 'Wanneer begint de minuut opnieuw?', answer: <><ul><li>Na elke treffer, ook een treffer buiten het trefvlak.</li><li>Na elke geannuleerde treffer en elke straftreffer, dus ook na P-rood.</li><li>Aan het begin van elke periode, en bij equipes aan het begin van elke estafettebeurt.</li><li>Het gaat om schermtijd: de klok loopt alleen tussen “Allez” en “Halte”. Alleen bewegen, aanvallen of een gewone onderbreking zonder zo’n gebeurtenis zet de minuut niet opnieuw op nul.</li></ul><Sources links={[{ label: 'FIE t.124.3.d: herstart van de minuut', href: `${technicalRules}#page=41` }]} /></> },
              { question: 'Uitzonderingen en equipewedstrijden', answer: <ul><li>Bij 14–14 (individueel) en 44–44 (equipe) worden geen P-kaarten gegeven.</li><li>In de extra minuut na een gelijke eindstand geldt de regel niet.</li><li>P-kaarten staan los van gewone kaarten. P-zwart betekent verlies van de partij, niet de disciplinaire uitsluiting van een gewone zwarte kaart.</li><li>Equipes: eerst P-rood voor beide teams, bij herhaling P-zwart voor het team dat achterstaat. Bij gelijke stand verliest het team met de lagere startplaatsing op de ranglijst.</li><li>Nationale en jeugdwedstrijden kunnen een eerdere FIE-versie of eigen afwijkingen hanteren. Kijk in de uitnodiging.</li></ul> },
            ]} />
            <Sources links={[{ label: 'FIE Technical Rules t.124 (augustus 2026)', href: `${technicalRules}#page=39` }]} />
          </div>
        </div>
      </section>

      <section id="categorieen" className="k-reglement-band" aria-labelledby="categorieen-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">05 / Inschrijven</p><h2 id="categorieen-title">Leeftijds&shy;categorieën</h2><p>U staat voor “under”: jonger dan.</p></div>
          <div className="k-reglement-body">
            <ul className="k-rule-ages">
              {ageCategories.map((cat) => <li key={cat.name}><strong>{cat.age}</strong><h3>{cat.name}</h3><p>{cat.note}</p></li>)}
            </ul>
            <p className="k-rule-note">Bij het JPT blijf je in principe het hele seizoen in dezelfde categorie. Voor FIE-cadetten en -junioren geldt 31 december van het seizoen als peildatum; veteranen worden ingedeeld naar hun leeftijd in het wedstrijdjaar. U23-circuits kunnen eigen toelatingsregels hanteren. Controleer de geboortejaren en deelname aan oudere categorieën in de uitnodiging.</p>
            <Sources links={[{ label: 'Handleiding JPT (leeftijdscategorieën)', href: `${jptGuide}#page=7` }, { label: 'FIE Organisation Rules o.29 / o.114', href: organisationRules }, { label: 'Handboek Schermer 2025', href: 'docs/source/handboek-schermer-2025.pdf' }]} />
          </div>
        </div>
      </section>

      <section id="materiaal" className="k-reglement-band k-reglement-band--subtle" aria-labelledby="materiaal-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">06 / Veiligheid</p><h2 id="materiaal-title">Materiaaleisen</h2><p>KNAS-basistabel uit 2010 voor wedstrijdsport. Controleer ook de actuele wedstrijdvoorwaarden.</p></div>
          <div className="k-reglement-body">
            <DataTable
              caption="Minimale beschermingswaarden per categorie (in newton)"
              captionHidden
              rowKey={(row) => row.id}
              rows={materialRows}
              columns={[
                { key: 'categorie', header: 'Categorie', primary: true },
                { key: 'kleding', header: 'Vest en broek' },
                { key: 'ondervest', header: 'Ondervest' },
                { key: 'masker', header: 'Masker' },
                { key: 'kling', header: 'Kling' },
              ]}
            />
            <ul className="k-rule-facts">
              <li><strong>Floret</strong> Lamé (elektrisch vest), masker met geleidende keellap en fil de masque (maskerkabel).</li>
              <li><strong>Degen</strong> Geen geleidende kleding nodig. Wel een elektrische degen en fil de corps (lichaamskabel).</li>
              <li><strong>Sabel</strong> Lamé, elektrisch masker met fil de masque en een geleidende manchet of sabelhandschoen.</li>
            </ul>
            <p className="k-rule-note">Bij alle wapens heb je een elektrisch wapen en een fil de corps nodig; neem van beide een reserve mee. <strong>Jeugdpuntentoernooi:</strong> voor alle leeftijden een ondervest van 800 N. Andere recreatieve wedstrijden kunnen afwijken.</p>
            <p className="k-rule-note">De scheidsrechter kan materiaal afkeuren. Bij internationale wedstrijden gelden de FIE-eisen.</p>
            <Sources links={[{ label: 'Veiligheids- en materiaaleisen KNAS 2010 (pdf)', href: knasMaterial }, { label: 'FIE Material Rules augustus 2026 (pdf)', href: materialRules }, { label: 'Handleiding JPT (materiaal)', href: `${jptGuide}#page=6` }]} />
          </div>
        </div>
      </section>

      <section id="documenten" className="k-reglement-band" aria-labelledby="documenten-title">
        <div className="k-container k-reglement-layout">
          <div className="k-reglement-heading"><p className="k-eyebrow">De officiële basis</p><h2 id="documenten-title">Documenten</h2><p>Deze pagina vat de regels samen. Bij twijfel gelden de officiële documenten.</p></div>
          <div className="k-reglement-body">
            <div className="k-grid k-grid--2">
              {documentGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="k-rule-subhead">{group.title}</h3>
                  <ul className="k-rule-documents">
                    {group.documents.map((doc) => (
                      <li key={doc.href}>
                        <a href={doc.href} target="_blank" rel="noopener noreferrer">
                          <FileText aria-hidden="true" /><span>{doc.title}</span><span className="k-rule-documents__type">{doc.meta}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="k-page-header__actions"><Button variant="secondary" href="/wedstrijden/scheidsrechters">Scheidsrechters</Button></div>
          </div>
        </div>
      </section>
    </div>
  );
}
