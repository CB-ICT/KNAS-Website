import { AlertTriangle, HeartHandshake, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, HeaderMosaic, SectionNav } from '../ui/components';
import '../ui/templates/templates.css';

export default function MeldpuntView() {
  return (
    <div className="k-ds k-meldpunt-page">
      <header className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Over de KNAS', href: '/over-de-knas' }, { label: 'Meldpunt Veilige Sport' }]} />
          <div className="k-page-header__split">
            <div>
              <p className="k-eyebrow k-page-header__eyebrow">Veilige sport</p>
              <h1 className="k-page-header__title">Meldpunt Veilige Sport</h1>
              <p className="k-lead k-page-header__intro">
                Een plek voor vragen en meldingen over ongewenst gedrag, integriteit, matchfixing en doping binnen de schermsport.
              </p>
              <div className="k-page-header__actions">
                <Button variant="primary" href="mailto:integriteit@knas.nl" iconLeft={<MessageCircle aria-hidden="true" />}>Mail het meldpunt</Button>
                <Button variant="secondary" href="https://centrumveiligesport.nl/contact" external>Centrum Veilige Sport</Button>
              </div>
            </div>
            <HeaderMosaic images={['images/coach/coach-5.jpg', 'images/youth/youth-2.jpg', 'images/referees/referees-7.jpg']} />
          </div>
        </div>
      </header>

      <SectionNav
        items={[
          { id: 'meldpunt-wanneer-title', label: 'Wanneer?' },
          { id: 'meldpunt-contact-title', label: 'Contact' },
          { id: 'meldpunt-hulp-title', label: 'Hulp' },
        ]}
      />

      <section className="k-section k-section--tight-top" aria-labelledby="meldpunt-wanneer-title">
        <div className="k-container">
          <h2 id="meldpunt-wanneer-title" className="k-block-title">Wanneer kun je hier terecht?</h2>
          <p className="k-lead k-onzerelaties-intro">Is er iets gebeurd wat niet hoort, of maak je je zorgen over iemand binnen de sport? Bespreek het eerst met je vertrouwenscontactpersoon of het bestuur van je vereniging. Je kunt ook rechtstreeks contact opnemen met het KNAS-meldpunt.</p>
          <div className="k-grid k-grid--2">
            <article className="k-intro-point">
              <ShieldCheck aria-hidden="true" />
              <h3>Ongewenst gedrag</h3>
              <p>Bijvoorbeeld grensoverschrijdend gedrag, machtsmisbruik, intimidatie, agressie, geweld, racisme, discriminatie, pesten of uitsluiting.</p>
            </article>
            <article className="k-intro-point">
              <AlertTriangle aria-hidden="true" />
              <h3>Integriteit in de sport</h3>
              <p>Ook seksuele intimidatie, matchfixing, ongewenst gokgedrag en dopingovertredingen kunnen bij het meldpunt worden gemeld.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="meldpunt-contact-title">
        <div className="k-container k-split">
          <div>
            <h2 id="meldpunt-contact-title" className="k-block-title">Vertrouwenscontactpersonen van de KNAS</h2>
            <p className="k-lead">De vertrouwenscontactpersonen luisteren, denken mee en verwijzen zo nodig door. Ze zijn geen hulpverlener en doen zelf geen onderzoek.</p>
            <ul className="k-rule-facts">
              <li><strong>Wouter Ypma</strong> Integriteitsmanager en vertrouwenscontactpersoon</li>
              <li><strong>Vera Aarts</strong> Vertrouwenscontactpersoon · <a href="tel:+31622487729">06 2248 7729</a></li>
              <li><strong>E-mail</strong> <a href="mailto:integriteit@knas.nl">integriteit@knas.nl</a></li>
            </ul>
            <div className="k-page-header__actions">
              <Button variant="primary" href="mailto:integriteit@knas.nl" iconLeft={<MessageCircle aria-hidden="true" />}>Mail integriteit@knas.nl</Button>
            </div>
          </div>
          <aside className="k-aside-note">
            <HeartHandshake aria-hidden="true" />
            <strong>Wat gebeurt er na een melding?</strong>
            <p>Het meldpunt neemt zo snel mogelijk contact met je op, in principe binnen twee werkdagen. Als dat nodig is, vraagt het om aanvullende informatie en toestemming om persoonsgegevens te verwerken.</p>
            <p>Het meldpunt geeft geen vertrouwelijk advies. Informatie moet zo nodig gedeeld kunnen worden met andere functionarissen of instanties.</p>
          </aside>
        </div>
      </section>

      <section className="k-section" aria-labelledby="meldpunt-hulp-title">
        <div className="k-container k-split">
          <div>
            <h2 id="meldpunt-hulp-title" className="k-block-title">Hulp buiten de bond</h2>
            <p className="k-lead">Je kunt ook rechtstreeks contact opnemen met het Centrum Veilige Sport Nederland (CVSN), het landelijke meldpunt voor alle sporten.</p>
            <ul className="k-check-list">
              <li><Phone aria-hidden="true" /><span><strong>CVSN:</strong> <a href="tel:09002025590">0900 202 55 90</a> op werkdagen van 8.30 tot 17.30 uur, of <a href="mailto:info@cvsn.nl">info@cvsn.nl</a>.</span></li>
              <li><MessageCircle aria-hidden="true" /><span>Buiten kantooruren kun je via de website van CVSN anoniem chatten.</span></li>
              <li><AlertTriangle aria-hidden="true" /><span>Bij een acute of dreigende situatie bel je <a href="tel:112">112</a>. Voor de politie zonder spoed bel je <a href="tel:09008844">0900 8844</a>.</span></li>
            </ul>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="https://centrumveiligesport.nl/contact" external>Bekijk CVSN</Button>
              <Button variant="text" href="https://www.speakupfeedback.eu/web/vertrouwenspuntsport" external>Anoniem melden via SpeakUp</Button>
            </div>
          </div>
          <aside className="k-aside-note">
            <strong>Voor verenigingen</strong>
            <p>Een eigen vertrouwenscontactpersoon is een belangrijk eerste aanspreekpunt voor leden, ouders en vrijwilligers.</p>
            <div className="k-page-header__actions">
              <Button variant="text" href="/voor-clubs/veilig-sportklimaat">Veilig sportklimaat in je club</Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
