import { KeyboardEvent, useState } from 'react';
import { Dumbbell, Eye, Sparkles, Zap } from 'lucide-react';
import { Breadcrumb, Button, HeaderMosaic, SectionNav } from '../ui/components';
import { useContent, useLocale } from '../i18n';
import { ui } from '../i18n/ui';
import content from '../i18n/content/schermen';
import '../ui/templates/templates.css';

export default function SchermenView() {
  const t = useContent(content);
  const common = ui[useLocale()];
  const weaponsData = t.weapons;
  const [activeWeaponId, setActiveWeaponId] = useState('floret');
  const activeWeapon = weaponsData.find((weapon) => weapon.id === activeWeaponId) ?? weaponsData[0];

  // Tabpatroon (WAI-ARIA): pijltjes, Home en End wisselen van wapen.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: weaponsData.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + weaponsData.length) % weaponsData.length;
    setActiveWeaponId(weaponsData[next].id);
    document.getElementById(`weapon-tab-${weaponsData[next].id}`)?.focus();
  };

  return (
    <div className="k-ds">
      <header id="wat-is-schermen" className="k-page-header k-page-header--mosaic k-on-dark">
        <div className="k-container">
          <Breadcrumb items={[{ label: common.home, href: '/' }, { label: t.breadcrumbStart, href: '/beginnen' }, { label: t.breadcrumb }]} />
          <div className="k-page-header__split">
          <div>
          <p className="k-eyebrow k-page-header__eyebrow">{t.eyebrow}</p>
          <h1 className="k-page-header__title">{t.title}</h1>
          <p className="k-lead k-page-header__intro">
            {t.lead}
          </p>
          <div className="k-page-header__actions">
            <Button variant="primary" href="/clubs">{t.findClub}</Button>
            <Button variant="secondary" href="/beginnen/eerste-stappen">{t.trialLesson}</Button>
          </div>
          </div>
          <HeaderMosaic images={['images/foil/foil-2.jpg', 'images/epee/epee-3.jpg', 'images/sabre/sabre-4.jpg']} />
          </div>
        </div>
      </header>

      <SectionNav items={t.sections} />

      <section id="why-fencing" className="k-section k-section--subtle" aria-label={t.whyLabel}>
        <div className="k-container">
          <div className="k-grid k-grid--3">
            <article className="k-intro-point">
              <Zap aria-hidden="true" />
              <h2>{t.why.speed.title}</h2>
              <p>{t.why.speed.text}</p>
            </article>
            <article className="k-intro-point">
              <Sparkles aria-hidden="true" />
              <h2>{t.why.recreational.title}</h2>
              <p>{t.why.recreational.text}</p>
            </article>
            <article className="k-intro-point">
              <Dumbbell aria-hidden="true" />
              <h2>{t.why.fit.title}</h2>
              <p>{t.why.fit.text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="weapons-title">
        <div className="k-container">
          <div className="k-section__head k-section__head--stacked">
            <div>
              <p className="k-eyebrow" id="weapons-start">{t.weaponsEyebrow}</p>
              <h2 id="weapons-title">{t.weaponsTitle}</h2>
            </div>
          </div>
          <div className="k-weapon-tabs" role="tablist" aria-label={t.weaponsTablist}>
            {weaponsData.map((weapon, index) => (
              <button
                key={weapon.id}
                id={`weapon-tab-${weapon.id}`}
                type="button"
                role="tab"
                aria-selected={activeWeapon.id === weapon.id}
                aria-controls="weapon-panel"
                tabIndex={activeWeapon.id === weapon.id ? 0 : -1}
                className={`k-weapon-tab${activeWeapon.id === weapon.id ? ' is-active' : ''}`}
                onClick={() => setActiveWeaponId(weapon.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className="k-weapon-tab__name">{weapon.name}</span>
                <span>{weapon.type}</span>
              </button>
            ))}
          </div>
          <article id="weapon-panel" className="k-weapon-feature" role="tabpanel" aria-labelledby={`weapon-tab-${activeWeapon.id}`} tabIndex={0}>
            <div className="k-weapon-feature__image">
              <img src={activeWeapon.image} alt={t.weaponAlt(activeWeapon.name)} />
              <div><span>{activeWeapon.type}</span><strong>{activeWeapon.name}</strong></div>
            </div>
            <div className="k-weapon-feature__body">
              <p className="k-weapon-feature__lead">{activeWeapon.description}</p>
              <div className="k-weapon-feature__highlight">
                <Sparkles aria-hidden="true" />
                <div><strong>{t.whyWeapon}</strong><p>{activeWeapon.positiveNote}</p></div>
              </div>
              <div className="k-weapon-feature__columns">
                <div><Eye aria-hidden="true" /><strong>{t.forBeginners}</strong><p>{activeWeapon.beginnerFeel}</p></div>
                <div><Zap aria-hidden="true" /><strong>{t.tactical}</strong><p>{activeWeapon.tacticalFocus}</p></div>
              </div>
              <dl className="k-weapon-card__facts">
                <div><dt>{t.target}</dt><dd>{activeWeapon.target}</dd></div>
                <div><dt>{t.characteristics}</dt><dd>{activeWeapon.tags.join(' · ')}</dd></div>
              </dl>
            </div>
          </article>
        </div>
      </section>

      <section className="k-section k-section--subtle" aria-labelledby="first-steps-title">
        <div className="k-container k-layout-content k-layout-content--reverse-mobile">
          <div className="k-layout-content__main">
            <p className="k-eyebrow">{t.firstEyebrow}</p>
            <h2 id="first-steps-title">{t.firstTitle}</h2>
            <div className="k-prose k-prose--spaced">
              {t.firstParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="k-page-header__actions">
              <Button variant="secondary" href="/beginnen/eerste-stappen">{t.firstSteps}</Button>
              <Button variant="text" href="/clubs">{t.searchClub}</Button>
              <Button variant="text" href="/beginnen/veelgestelde-vragen">{t.faq}</Button>
            </div>
          </div>
          <aside className="k-layout-content__aside k-aside-note" aria-label={t.goodToKnow}>
            <Eye aria-hidden="true" />
            <strong>{t.goodToKnow}</strong>
            <p>{t.goodToKnowText}</p>
          </aside>
        </div>
      </section>

      <section className="k-section k-section--inverse k-on-dark" aria-labelledby="next-step-title">
        <div className="k-container k-next-step">
          <div>
            <p className="k-eyebrow">{t.nextEyebrow}</p>
            <h2 id="next-step-title">{t.nextTitle}</h2>
            <p>{t.nextText}</p>
          </div>
          <Button variant="primary" href="/clubs">{t.findClub}</Button>
        </div>
      </section>
    </div>
  );
}