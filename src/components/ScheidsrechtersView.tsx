import { Check, FileText } from 'lucide-react';
import { Breadcrumb, Button, DataTable, HeaderMosaic } from '../ui/components';
import '../ui/templates/templates.css';

const tasks = [
  'Leidt de partij en geeft de commando’s',
  'Beoordeelt elke treffer en, bij floret en sabel, wie voorrang had',
  'Let op veiligheid en controleert zo nodig het materiaal',
  'Geeft kaarten bij overtredingen',
];

const commands = [
  { id: 'garde', commando: 'En garde!', betekenis: 'Neem je beginpositie in' },
  { id: 'prets', commando: 'Prêts?', betekenis: 'Zijn beide schermers klaar?' },
  { id: 'allez', commando: 'Allez!', betekenis: 'Begin met schermen' },
  { id: 'halte', commando: 'Halte!', betekenis: 'Stop direct' },
];

const route = [
  ['Begin bij je vereniging', 'Vraag je trainer of je kunt meekijken en oefenen bij clubwedstrijden en trainingen.'],
  ['Volg een opleiding', 'In een scheidsrechtersopleiding leer je de regels, de commando’s en hoe je een partij leidt.'],
  ['Doe ervaring op', 'Fluit eerst bij kleinere wedstrijden. Met ervaring kun je doorgroeien naar grotere toernooien.'],
];

export default function ScheidsrechtersView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: 'Scheidsrechters' }]} />
          <div className="k-page-header__split">
          <div>
          <h1 className="k-page-header__title">Scheidsrechters</h1>
          <p className="k-lead k-page-header__intro">Zonder scheidsrechters geen wedstrijd. Wat doet een scheidsrechter, en hoe word je er zelf een?</p>
          </div>
          <HeaderMosaic images={['images/referees/referees-3.jpg', 'images/referees/referees-2.jpg', 'images/referees/referees-6.jpg']} />
          </div>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="tasks-title">
        <div className="k-container k-split">
          <div>
            <h2 id="tasks-title" className="k-block-title">Wat doet een scheidsrechter?</h2>
            <ul className="k-check-list">
              {tasks.map((task) => <li key={task}><Check aria-hidden="true" /> {task}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="k-block-title">De commando’s</h2>
            <DataTable
              caption="Commando’s van de scheidsrechter"
              captionHidden
              rowKey={(row) => row.id}
              rows={commands}
              columns={[
                { key: 'commando', header: 'Commando', primary: true },
                { key: 'betekenis', header: 'Betekenis' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="route-title">
        <div className="k-container">
          <h2 id="route-title" className="k-block-title">Scheidsrechter worden</h2>
          <ol className="k-steps">
            {route.map(([title, text], index) => (
              <li key={title} className="k-step">
                <span className="k-step__number" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <a href="https://www.knas.nl/sites/www.knas.nl/files/file/207/Handboek%20voor%20de%20Scheidsrechter.pdf" className="k-inline-link" target="_blank" rel="noopener noreferrer">
            <FileText aria-hidden="true" /> Handboek voor de scheidsrechter (pdf)
            <span className="k-visually-hidden"> (opent in nieuw venster)</span>
          </a>
        </div>
      </section>

      <section className="k-section" aria-labelledby="ref-next-title">
        <div className="k-container k-closing-cta">
          <div>
            <h2 id="ref-next-title">Meer weten?</h2>
            <p>De scheidsrechterscommissie helpt je op weg met opleiding en begeleiding. Of lees eerst de belangrijkste wedstrijdregels.</p>
          </div>
          <div className="k-closing-cta__actions">
            <Button variant="primary" href="mailto:scheidsrechters@knas.nl?subject=Scheidsrechter%20worden">Mail de scheidsrechterscommissie</Button>
            <Button variant="secondary" href="/wedstrijden/reglementen">Lees het wedstrijdreglement</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
