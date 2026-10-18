import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Breadcrumb, Button, DataTable } from '../ui/components';
import '../ui/templates/templates.css';

type Weapon = 'floret' | 'degen' | 'sabel';
type RankingRow = { category: string } & Record<`${Weapon}${'Heren' | 'Dames'}`, string>;

const RANKING_BASE_URL = 'https://knas.onzeranglijsten.net';

const weapons: { id: Weapon; label: string }[] = [
  { id: 'floret', label: 'Floret' },
  { id: 'degen', label: 'Degen' },
  { id: 'sabel', label: 'Sabel' },
];

// Paden naar de bronranglijsten op onzeranglijsten.net, op leeftijdsvolgorde.
const rankingRows: RankingRow[] = [
  { category: 'Kuikens (U10)', sabelHeren: '/pag/8094/rls/b564', sabelDames: '/pag/8094/rls/da6b', floretHeren: '/pag/8094/rls/ac7e', floretDames: '/pag/8094/rls/b645', degenHeren: '/pag/8094/rls/2148', degenDames: '/pag/8094/rls/ad5f' },
  { category: 'Benjamins (U11–U12)', sabelHeren: '/pag/8094/rls/8465', sabelDames: '/pag/8094/rls/6f68', floretHeren: '/pag/8094/rls/fb7f', floretDames: '/pag/8094/rls/cb42', degenHeren: '/pag/8094/rls/7049', degenDames: '/pag/8094/rls/c25c' },
  { category: 'Pupillen (U13–U14)', sabelHeren: '/pag/8094/rls/1862', sabelDames: '/pag/8094/rls/bd69', floretHeren: '/pag/8094/rls/107c', floretDames: '/pag/8094/rls/1943', degenHeren: '/pag/8094/rls/eb56', degenDames: '/pag/8094/rls/105d' },
  { category: 'Cadetten (U15–U17)', sabelHeren: '/pag/8094/rls/6763', sabelDames: '/pag/8094/rls/3976', floretHeren: '/pag/8094/rls/5e7d', floretDames: '/pag/8094/rls/ae40', degenHeren: '/pag/8094/rls/3a57', degenDames: '/pag/8094/rls/a55a' },
  { category: 'Junioren (U18–U20)', sabelHeren: '/pag/8094/rls/fc60', sabelDames: '/pag/8094/rls/777', floretHeren: '/pag/8094/rls/f37a', floretDames: '/pag/8094/rls/fc41', degenHeren: '/pag/8094/rls/4f54', degenDames: '/pag/8094/rls/f35b' },
  { category: 'U23', sabelHeren: '/pag/8094/rls/286c', sabelDames: '/pag/8094/rls/db6b', floretHeren: '/pag/8094/rls/766d', floretDames: '/pag/8094/rls/6e68', degenHeren: '/pag/8094/rls/8d6a', degenDames: '/pag/8094/rls/bc69' },
  { category: 'Senioren', sabelHeren: '/pag/8094/rls/2167', sabelDames: '/pag/8094/rls/8c6a', floretHeren: '/pag/8094/rls/3171', floretDames: '/pag/8094/rls/6844', degenHeren: '/pag/8094/rls/8d4b', degenDames: '/pag/8094/rls/5f5e' },
  { category: 'Veteranen algemeen', sabelHeren: '/pag/8094/rls/ca61', sabelDames: '/pag/8094/rls/9c74', floretHeren: '/pag/8094/rls/c17b', floretDames: '/pag/8094/rls/784e', degenHeren: '/pag/8094/rls/9d55', degenDames: '/pag/8094/rls/858' },
  { category: 'Veteranen A', sabelHeren: '/pag/8094/rls/466e', sabelDames: '/pag/8094/rls/eb75', floretHeren: '/pag/8094/rls/5678', floretDames: '/pag/8094/rls/464f', degenHeren: '/pag/8094/rls/3252', degenDames: '/pag/8094/rls/5759' },
  { category: 'Veteranen B', sabelHeren: '/pag/8094/rls/946f', sabelDames: '/pag/8094/rls/7f72', floretHeren: '/pag/8094/rls/a479', floretDames: '/pag/8094/rls/db4c', degenHeren: '/pag/8094/rls/53', degenDames: '/pag/8094/rls/b726' },
  { category: 'Veteranen C', sabelHeren: '/pag/8094/rls/296c', sabelDames: '/pag/8094/rls/4e73', floretHeren: '/pag/8094/rls/8546', floretDames: '/pag/8094/rls/2a4d', degenHeren: '/pag/8094/rls/9550', degenDames: '/pag/8094/rls/8527' },
  { category: 'Veteranen D', sabelHeren: '/pag/8094/rls/776d', sabelDames: '/pag/8094/rls/e270', floretHeren: '/pag/8094/rls/d347', floretDames: '/pag/8094/rls/be4a', degenHeren: '/pag/8094/rls/e351', degenDames: '/pag/8094/rls/1a24' },
];

function RankingLink({ href, label, context }: { href: string; label: string; context: string }) {
  return (
    <a href={`${RANKING_BASE_URL}${href}`} className="k-inline-link" target="_blank" rel="noopener noreferrer">
      {label}
      <span className="k-visually-hidden"> – {context} (opent in nieuw venster)</span>
      <ExternalLink aria-hidden="true" />
    </a>
  );
}

export default function RanglijstenView() {
  const [weapon, setWeapon] = useState<Weapon>('floret');
  const weaponLabel = weapons.find((item) => item.id === weapon)!.label;

  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-06.jpg" alt="" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: 'Ranglijsten' }]} />
          <h1 className="k-page-header__title">Ranglijsten</h1>
          <p className="k-lead k-page-header__intro">
            De nationale ranglijsten per wapen en leeftijdscategorie. De actuele lijsten staan op onzeranglijsten.net.
          </p>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-labelledby="rankings-title">
        <div className="k-container k-container--narrow">
          <h2 id="rankings-title" className="k-block-title">Kies een wapen</h2>
          <div className="k-filter-group" role="group" aria-label="Wapen">
            {weapons.map((item) => (
              <button key={item.id} type="button" aria-pressed={weapon === item.id} className={weapon === item.id ? 'is-active' : ''} onClick={() => setWeapon(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="k-rankings-table">
            <DataTable<RankingRow>
              caption={`Ranglijsten ${weaponLabel.toLowerCase()}`}
              rowKey={(row) => row.category}
              rows={rankingRows}
              columns={[
                { key: 'category', header: 'Categorie', primary: true },
                { key: 'heren', header: 'Heren', render: (row) => <RankingLink href={row[`${weapon}Heren`]} label="Heren" context={`${weaponLabel} ${row.category}`} /> },
                { key: 'dames', header: 'Dames', render: (row) => <RankingLink href={row[`${weapon}Dames`]} label="Dames" context={`${weaponLabel} ${row.category}`} /> },
              ]}
            />
          </div>

          <p className="k-rule-note">
            Alleen resultaten van toernooien die aan de eisen voldoen tellen mee. De beste resultaten in de relevante periode bepalen je positie.
          </p>

          <aside className="k-calendar-help" aria-label="Meer over wedstrijden">
            <div>
              <strong>Op zoek naar een wedstrijd?</strong>
              <p>In de kalender zie je alle Nederlandse wedstrijden van de komende twaalf maanden.</p>
            </div>
            <Button variant="secondary" href="/wedstrijden/kalender">Naar de wedstrijdkalender</Button>
          </aside>
        </div>
      </section>
    </div>
  );
}
