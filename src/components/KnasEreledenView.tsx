import { Award } from 'lucide-react';
import { Breadcrumb } from '../ui/components';
import '../ui/templates/templates.css';

const honoraryMembers = ['Henk Kenter', 'Bert v.d. Flier', 'Wiebe Mokken', 'Anton Oskamp', 'Etienne Van Cann', 'Rob Wolthuis'];

const membersOfMerit = [
  'Bas Verwijlen OLY', 'Pierre Peeters', 'Indra Angad-Gaur', 'Arwin Kardolus', 'Olaf Kardolus', 'Sonja Tol', 'Mieke de Graaf-Stoel',
  'Tristan Tulen', 'Rafael Tulen', 'David van Nunen', 'Konrad Veenenbos', 'Leon Pijnappel', 'Ad van der Weg',
];

export default function KnasEreledenView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-11.jpg" alt="Schermsters samen op de foto met hun medailles" style={{ objectPosition: '50% 15%' }} />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Over de KNAS', href: '/over-de-knas' }, { label: 'Ereleden' }]} />
          <h1 className="k-page-header__title">Ereleden en leden van verdienste</h1>
          <p className="k-lead k-page-header__intro">Schermers en vrijwilligers die zich op bijzondere wijze hebben ingezet voor de Nederlandse schermsport.</p>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-label="Ereleden en leden van verdienste">
        <div className="k-container k-grid k-grid--2">
          <div>
            <h2 className="k-block-title">Ereleden</h2>
            <p>Een blijvende erkenning voor een uitzonderlijke bijdrage aan de bond en de schermsport.</p>
            <ul className="k-check-list">
              {honoraryMembers.map((name) => <li key={name}><Award aria-hidden="true" /> {name}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="k-block-title">Leden van verdienste</h2>
            <p>Voor bijzondere inzet als sporter, vrijwilliger, bestuurder, trainer, official of organisator.</p>
            <ul className="k-check-list k-check-list--columns">
              {membersOfMerit.map((name) => <li key={name}><Award aria-hidden="true" /> {name}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
