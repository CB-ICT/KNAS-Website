import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../ui/components';
import { mainNav } from '../ui/navigation';
import '../ui/templates/templates.css';

const wedstrijdNav = mainNav.find((item) => item.id === 'wedstrijden')!;

export default function WedstrijdenOverzichtView() {
  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-06.jpg" alt="Twee schermsters in een floretpartij" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden' }]} />
          <h1 className="k-page-header__title">Wedstrijden</h1>
          <p className="k-lead k-page-header__intro">{wedstrijdNav.intro}</p>
        </div>
      </header>
      <div className="k-container k-section k-grid k-grid--2">
        {wedstrijdNav.groups.map((group, index) => (
          <section key={group.title} aria-labelledby={`wedstrijd-groep-${index}`}>
            <h2 id={`wedstrijd-groep-${index}`} className="k-block-title">{group.title}</h2>
            <ul className="k-wedstrijd-overzicht">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}<ArrowRight aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}