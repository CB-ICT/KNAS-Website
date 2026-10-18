import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { getMainNav, getUtilityNav, mainNav, MainNavItem, NavLink } from '../navigation';
import { Locale, useLocale } from '../../i18n';
import { ui } from '../../i18n/ui';
import './Header.css';

interface HeaderProps {
  currentPath?: string;
  /** Hetzelfde adres in elke taal, voor de taalkeuze. */
  languagePaths?: Record<Locale, string>;
  /** Interne links ("/...") via de app afhandelen i.p.v. een volledige paginalading. */
  onNavigate?: (href: string) => void;
}

const isUnderItem = (item: MainNavItem, path: string) => path === item.href || path.startsWith(`${item.href}/`);

// Een pagina die in meerdere menu's staat, licht alleen op in de sectie waar zijn pad onder valt.
const isItemActive = (item: MainNavItem, path: string) =>
  isUnderItem(item, path) ||
  (!mainNav.some((other) => isUnderItem(other, path)) &&
    item.groups.some((group) => group.links.some((link) => link.href === path)));

function NavAnchor({ link, className, currentPath }: { link: NavLink; className?: string; currentPath?: string }) {
  const t = ui[useLocale()];
  return (
    <a
      href={link.href}
      className={className}
      aria-current={currentPath === link.href ? 'page' : undefined}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
      {link.external && (
        <>
          <ExternalLink className="k-icon-inline" aria-hidden="true" />
          <span className="k-visually-hidden"> {t.externalSite}</span>
        </>
      )}
    </a>
  );
}

const locales: Locale[] = ['nl', 'en'];

function LanguageSwitch({ paths, className }: { paths: Record<Locale, string>; className?: string }) {
  const locale = useLocale();
  const t = ui[locale];
  return (
    <nav className={`k-lang${className ? ` ${className}` : ''}`} aria-label={t.language}>
      {locales.map((code, index) => (
        <Fragment key={code}>
          {index > 0 && <span className="k-lang__sep" aria-hidden="true">|</span>}
          <a
            href={`#${paths[code]}`}
            lang={code}
            hrefLang={code}
            className="k-lang__link"
            aria-current={code === locale ? 'true' : undefined}
            aria-label={t.languageNames[code]}
          >
            {code.toUpperCase()}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}

export default function Header({ currentPath = '/', languagePaths = { nl: '/', en: '/en' }, onNavigate }: HeaderProps) {
  const locale = useLocale();
  const t = ui[locale];
  const nav = getMainNav(locale);
  const utilityNav = getUtilityNav(locale);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState<number | undefined>(undefined);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Esc sluit wat open staat en zet de focus terug op de knop die het opende.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openMenu) {
        triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      } else if (drawerOpen) {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [openMenu, drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    // De lade sluit altijd direct aan op de werkelijke onderrand van de header.
    if (drawerOpen && headerRef.current) setDrawerTop(headerRef.current.getBoundingClientRect().bottom);
    // Achter de open lade mag niets bereikbaar zijn met toetsenbord of schermlezer.
    const background = [document.getElementById('main'), document.querySelector('footer')];
    background.forEach((el) => el?.toggleAttribute('inert', drawerOpen));
    return () => {
      document.body.style.overflow = '';
      background.forEach((el) => el?.removeAttribute('inert'));
    };
  }, [drawerOpen]);

  // Navigeren via de terugknop sluit openstaande menu's.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [currentPath]);

  // Bij draaien/vergroten naar desktop mag de mobiele lade niet open blijven hangen.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64em)');
    const onChange = () => { if (mq.matches) setDrawerOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeWhenFocusLeaves = (event: React.FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenMenu(null);
  };

  const closeAll = () => {
    setOpenMenu(null);
    setDrawerOpen(false);
  };

  // Eén klikhandler voor alle links in de header (delegatie).
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') ?? '';
    if (href.startsWith('#') && !href.startsWith('#/')) {
      // Skip-link: focus naar de inhoud zonder de route in de adresbalk te wijzigen.
      event.preventDefault();
      document.getElementById(href.slice(1))?.focus();
      return;
    }
    closeAll();
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    // Een link naar de huidige pagina wijzigt de hash niet; de app scrolt dan zelf naar boven.
    if (onNavigate && (href.startsWith('/') || href === window.location.hash)) {
      event.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <header ref={headerRef} className="k-header" onClick={handleLinkClick}>
      <a href="#main" className="k-skip-link">{t.skipLink}</a>

      <div className="k-header__main">
        <div className="k-container k-header__bar">
          <a href="/" className="k-header__logo" aria-label={t.logoLabel}>
            <img src="images/brand/knas-logo.png" alt="" width="44" height="44" />
            <span className="k-header__logo-text">
              <strong>KNAS</strong>
              <span lang="nl">{t.federationName}</span>
            </span>
          </a>

          <nav className="k-header__nav" aria-label={t.mainNav}>
            <ul className="k-header__nav-list">
              {nav.map((item) => {
                const isOpen = openMenu === item.id;
                const panelId = `k-mega-${item.id}`;
                return (
                  <li key={item.id} className="k-header__nav-item" onBlur={closeWhenFocusLeaves}>
                    <button
                      ref={(el) => { triggerRefs.current[item.id] = el; }}
                      type="button"
                      className={`k-header__nav-trigger${item.accent ? ' k-header__nav-trigger--accent' : ''}${isItemActive(item, currentPath) ? ' is-active' : ''}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenMenu(isOpen ? null : item.id)}
                    >
                      {item.label}
                      <ChevronDown className="k-header__chevron" aria-hidden="true" />
                    </button>

                    <div id={panelId} className="k-mega" hidden={!isOpen}>
                      <div className="k-container k-mega__inner">
                        <div className="k-mega__intro">
                          <p className="k-mega__title">{item.label}</p>
                          <p className="k-muted">{item.intro}</p>
                          <a href={item.href} className="k-mega__overview">
                            {item.overviewLabel} <ArrowRight aria-hidden="true" />
                          </a>
                        </div>
                        <div className="k-mega__groups">
                          {item.groups.map((group, groupIndex) => (
                            <div key={group.title} className="k-mega__group">
                              <p className="k-mega__group-title" id={`${panelId}-g${groupIndex}`}>{group.title}</p>
                              <ul aria-labelledby={`${panelId}-g${groupIndex}`}>
                                {group.links.map((link) => (
                                  <li key={link.href + link.label}>
                                    <NavAnchor link={link} className="k-mega__link" currentPath={currentPath} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {item.promo && (
                          <a href={item.promo.href} className="k-mega__promo k-on-dark">
                            <span className="k-mega__promo-label">{item.promo.label}</span>
                            <span className="k-mega__promo-text">{item.promo.description}</span>
                            <ArrowRight aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="k-header__actions">
            <LanguageSwitch paths={languagePaths} />
            {/* Secundair (outline): oranje blijft beschikbaar voor de hoofdtaak van de pagina zelf. */}
            <a href="/clubs" className="k-btn k-btn--secondary k-header__cta">{t.findClub}</a>

            <button
              ref={hamburgerRef}
              type="button"
              className="k-header__icon-btn k-header__hamburger"
              aria-expanded={drawerOpen}
              aria-controls="k-mobile-nav"
              aria-label={drawerOpen ? t.menuClose : t.menuOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {drawerOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobiele lade: per hoofditem een uitklapbare sectie, zodat niveau 2 zichtbaar blijft zonder extra schermen. */}
      <div id="k-mobile-nav" className="k-drawer" hidden={!drawerOpen} style={drawerTop !== undefined ? { top: drawerTop } : undefined}>
        <nav aria-label={t.mainNavMobile} className="k-drawer__inner">
          <ul className="k-drawer__list">
            {nav.map((item) => {
              const expanded = mobileSection === item.id;
              const sectionId = `k-drawer-${item.id}`;
              return (
                <li key={item.id} className="k-drawer__item">
                  <button
                    type="button"
                    className={`k-drawer__trigger${isItemActive(item, currentPath) ? ' is-active' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={sectionId}
                    onClick={() => setMobileSection(expanded ? null : item.id)}
                  >
                    {item.label}
                    <ChevronDown className="k-header__chevron" aria-hidden="true" />
                  </button>
                  <div id={sectionId} className="k-drawer__panel" hidden={!expanded}>
                    <a href={item.href} className="k-drawer__overview">{item.overviewLabel}</a>
                    {item.groups.map((group) => (
                      <Fragment key={group.title}>
                        <p className="k-drawer__group-title">{group.title}</p>
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.href + link.label}>
                              <NavAnchor link={link} className="k-drawer__link" currentPath={currentPath} />
                            </li>
                          ))}
                        </ul>
                      </Fragment>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="k-drawer__utility">
            {utilityNav.map((link) => (
              <li key={link.href}>
                <NavAnchor link={link} className="k-drawer__link" currentPath={currentPath} />
              </li>
            ))}
          </ul>
          <a href="/clubs" className="k-btn k-btn--secondary k-btn--full">{t.findClub}</a>
        </nav>
      </div>
    </header>
  );
}
