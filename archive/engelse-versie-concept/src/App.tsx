import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Header, Footer } from './ui/components';
import { scrollToSection, sectionTop } from './ui/scrollToSection';
import { allNews } from './news';
import { LocaleContext, localeOfPath, setActiveLocale, stripLocale, withLocale } from './i18n';
import { pageMeta } from './i18n/meta';
import { ui } from './i18n/ui';
import HomeView from './components/HomeView';

const SchermenView = lazy(() => import('./components/SchermenView'));
const VerenigingenView = lazy(() => import('./components/VerenigingenView'));
const WedstrijdenView = lazy(() => import('./components/WedstrijdenView'));
const WedstrijdenOverzichtView = lazy(() => import('./components/WedstrijdenOverzichtView'));
const WedstrijdinformatieView = lazy(() => import('./components/WedstrijdinformatieView'));
const RanglijstenView = lazy(() => import('./components/RanglijstenView'));
const TrainersopleidingenView = lazy(() => import('./components/TrainersopleidingenView'));
const ClubsOverzichtView = lazy(() => import('./components/ClubsOverzichtView'));
const LedenadministratieView = lazy(() => import('./components/LedenadministratieView'));
const ClubOprichtenView = lazy(() => import('./components/ClubOprichtenView'));
const ClubDocumentenView = lazy(() => import('./components/ClubDocumentenView'));
const VeiligSportklimaatView = lazy(() => import('./components/VeiligSportklimaatView'));
const OverDeKnasView = lazy(() => import('./components/OverDeKnasView'));
const BestuurCommissiesView = lazy(() => import('./components/BestuurCommissiesView'));
const NieuwsView = lazy(() => import('./components/NieuwsView'));
const KnasContactView = lazy(() => import('./components/KnasContactView'));
const TopsportOverzichtView = lazy(() => import('./components/TopsportOverzichtView'));
const TalentprogrammaView = lazy(() => import('./components/TalentprogrammaView'));
const TiteltoernooienView = lazy(() => import('./components/TiteltoernooienView'));
const InternationaalAanmeldenView = lazy(() => import('./components/InternationaalAanmeldenView'));
const KnasEreledenView = lazy(() => import('./components/KnasEreledenView'));
const LidmaatschapTarievenView = lazy(() => import('./components/LidmaatschapTarievenView'));
const EersteStappenView = lazy(() => import('./components/EersteStappenView'));
const VeelgesteldeVragenView = lazy(() => import('./components/VeelgesteldeVragenView'));
const WedstrijdregelsView = lazy(() => import('./components/WedstrijdregelsView'));
const ScheidsrechtersView = lazy(() => import('./components/ScheidsrechtersView'));
const NotFoundView = lazy(() => import('./components/NotFoundView'));
const PrivacyView = lazy(() => import('./components/PrivacyView'));

// De sitemap (src/ui/navigation.ts) gebruikt URL-paden; deze tabel koppelt ze aan views.
const exactRoutes: Record<string, string> = {
  '/': 'home',
  '/clubs': 'verenigingen',
  '/beginnen/rolstoelschermen': 'clubs-veilig',
  '/diversiteit-en-inclusie': 'clubs-veilig',
  '/beginnen/lid-worden': 'lidmaatschap',
  '/beginnen/uitrusting': 'lidmaatschap',
  '/beginnen/eerste-stappen': 'eerste-stappen',
  '/beginnen/wapens': 'schermen',
  '/beginnen/veelgestelde-vragen': 'veelgestelde-vragen',
  '/wedstrijden': 'wedstrijden-overzicht',
  '/wedstrijden/kalender': 'wedstrijden',
  '/wedstrijden/nk': 'wedstrijden',
  '/wedstrijden/voorbereiden': 'wedstrijdinformatie',
  '/wedstrijden/soorten': 'wedstrijdinformatie',
  '/wedstrijden/ranglijsten': 'ranglijsten',
  '/wedstrijden/reglementen': 'wedstrijdregels',
  '/wedstrijden/leeftijdscategorieen': 'wedstrijdregels',
  '/wedstrijden/materiaaleisen': 'wedstrijdregels',
  '/wedstrijden/scheidsrechters': 'scheidsrechters',
  '/voor-clubs/ledenadministratie': 'clubs-ledenadministratie',
  '/voor-clubs/onzerelaties': 'clubs-ledenadministratie',
  '/voor-clubs/club-oprichten': 'clubs-oprichten',
  '/voor-clubs/documenten': 'clubs-documenten',
  '/voor-clubs/trainersopleidingen': 'opleidingen',
  '/voor-clubs/veilig-sportklimaat': 'clubs-veilig',
  '/topsport/talentprogramma': 'topsport-talent',
  '/topsport/talentontwikkeling': 'topsport-talent',
  '/topsport/titeltoernooien': 'topsport-titels',
  '/topsport/selecties': 'topsport-titels',
  '/topsport/internationaal-aanmelden': 'topsport-aanmelden',
  '/topsport/aanmelden': 'topsport-aanmelden',
  '/over-de-knas/bestuur': 'bestuur',
  '/over-de-knas/commissies': 'bestuur',
  '/over-de-knas/lidmaatschap': 'lidmaatschap',
  '/over-de-knas/ereleden': 'ereleden',
  '/over-de-knas/bondsbureau': 'contact',
  '/over-de-knas/vacatures': 'contact',
  '/contact': 'contact',
  '/meldpunt': 'contact',
  '/privacy': 'privacy',
};

const prefixRoutes: [string, string][] = [
  ['/beginnen', 'schermen'],
  ['/wedstrijden', 'wedstrijden'],
  ['/voor-clubs', 'voor-clubs'],
  // Oude adressen van de sectie blijven werken.
  ['/clubs-en-kader/opleidingen', 'opleidingen'],
  ['/clubs-en-kader', 'voor-clubs'],
  ['/topsport', 'topsport'],
  ['/nieuws', 'nieuws'],
  ['/over-de-knas', 'over-knas'],
];

// Oude of samengevoegde adressen die naar een ander adres doorverwijzen.
const redirects: Record<string, string> = {
  '/wedstrijden/uitslagen': '/nieuws?onderwerp=alle-uitslagen',
};

const sectionForPath: Record<string, string> = {
  '/beginnen/wapens': 'weapons-start',
  '/voor-clubs/onzerelaties': 'onzerelaties-title',
  '/beginnen/rolstoelschermen': 'veilig-wheelchair-title',
  '/diversiteit-en-inclusie': 'veilig-people-title',
  '/topsport/atletencommissie': 'topsport-athletes-title',
  '/over-de-knas/commissies': 'org-commissies-title',
  '/over-de-knas/vacatures': 'contact-vacatures-title',
  '/meldpunt': 'contact-confidential-title',
  '/over-de-knas/reglementen': 'over-docs-title',
  '/over-de-knas/documenten': 'over-docs-title',
  '/over-de-knas/alv': 'over-org-title',
  '/wedstrijden/leeftijdscategorieen': 'categorieen-title',
  '/wedstrijden/materiaaleisen': 'materiaal-title',
  '/wedstrijden/soorten': 'kinds-title',
};

// Routes gelden voor beide talen; het taalvoorvoegsel (/en) wordt eerst verwijderd.
const basePath = (href: string) => stripLocale(href).split(/[?#]/)[0];

const tabForPath = (href: string) => {
  const path = basePath(href);
  return exactRoutes[path] ?? prefixRoutes.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1] ?? 'not-found';
};

const articleIdFromPath = (href: string) => {
  const match = basePath(href).match(/^\/nieuws\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

const queryOf = (href: string) => new URLSearchParams(href.split('?')[1] ?? '');

// Hash-routing (#/pad): werkt op elke statische host en met relatieve assets, ook na vernieuwen.
const readHashPath = () => {
  const path = window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/';
  const target = redirects[basePath(path)];
  if (!target) return path;
  const localized = withLocale(target, localeOfPath(path));
  window.history.replaceState(null, '', `#${localized}`);
  return localized;
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wacht tot een (lazy geladen) view een element heeft gerenderd.
const whenAvailable = (find: () => HTMLElement | null, run: (el: HTMLElement | null) => void, tries = 25) => {
  const el = find();
  if (el || tries <= 0) run(el);
  else window.setTimeout(() => whenAvailable(find, run, tries - 1), 80);
};

export default function App() {
  const [path, setPath] = useState<string>(readHashPath);
  const previousPath = useRef(path);
  const inAppNavigations = useRef(0);
  const locale = localeOfPath(path);
  // Moet vóór het renderen van de kinderen staan: nieuwe links krijgen zo direct het juiste taalvoorvoegsel.
  setActiveLocale(locale);
  const routePath = stripLocale(path);
  const activeTab = tabForPath(path);
  const articleId = activeTab === 'nieuws' ? articleIdFromPath(path) : null;

  const afterNavigation = (targetPath: string, moveFocus: boolean, restoreY?: number) => {
    const sectionId = restoreY === undefined ? sectionForPath[basePath(targetPath)] : undefined;
    // Wacht op de viewtransitie voordat er gescrold wordt.
    window.setTimeout(() => {
      whenAvailable(
        () => (sectionId ? document.getElementById(sectionId) : document.querySelector<HTMLElement>('main h1')),
        (target) => {
          if (restoreY !== undefined) window.scrollTo({ top: restoreY, behavior: 'auto' });
          else if (sectionId && target) {
            scrollToSection(target);
            // Later ladende foto's en lettertypen kunnen de sectie nog verschuiven: corrigeer een paar keer.
            [700, 1400, 2200].forEach((delay) => window.setTimeout(() => {
              const offset = Math.abs(sectionTop(target));
              // Grote afwijking = de bezoeker heeft zelf verder gescrold; dan niet ingrijpen.
              if (offset > 4 && offset < 300) window.scrollTo({ top: sectionTop(target) + window.scrollY, behavior: 'auto' });
            }, delay));
          }
          else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          if (moveFocus && target) {
            const focusTarget = /^H[1-6]$/.test(target.tagName) ? target : target.closest('section')?.querySelector<HTMLElement>('h2') ?? target;
            if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
            focusTarget.focus({ preventScroll: true });
          }
        },
      );
    }, sectionId ? 150 : 0);
  };

  useEffect(() => {
    const onHashChange = () => {
      if (!window.location.hash.startsWith('#/') && window.location.hash !== '') return;
      const next = readHashPath();
      const prev = previousPath.current;
      previousPath.current = next;
      inAppNavigations.current += 1;
      setPath(next);
      // Een artikel openen of sluiten is geen paginawissel: de lijst blijft op zijn plek staan.
      const togglesArticle = tabForPath(prev) === 'nieuws' && tabForPath(next) === 'nieuws' && basePath(prev) !== basePath(next);
      // Bij terug/vooruit staat de eerder bewaarde scrollpositie in de history-state; nieuwe items hebben die niet.
      const savedY = (window.history.state as { scrollY?: number } | null)?.scrollY;
      if (!togglesArticle) afterNavigation(next, !articleIdFromPath(next), typeof savedY === 'number' ? savedY : undefined);
    };
    let saveTimer = 0;
    const saveScroll = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        try {
          window.history.replaceState({ ...(window.history.state ?? {}), scrollY: window.scrollY }, '');
        } catch {
          // Sommige browsers begrenzen het aantal replaceState-aanroepen; dan vervalt alleen het herstel.
        }
      }, 200);
    };
    window.history.scrollRestoration = 'manual';
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', saveScroll, { passive: true });
    if (sectionForPath[basePath(path)]) afterNavigation(path, false);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', saveScroll);
      window.clearTimeout(saveTimer);
    };
  }, []);

  useEffect(() => {
    const article = articleId ? allNews.find((item) => item.id === articleId) : undefined;
    const metaSet = pageMeta[locale];
    const meta = metaSet[basePath(path) === '/wedstrijden/nk' ? 'wedstrijden-nk' : activeTab] ?? metaSet.home;
    document.documentElement.lang = locale;
    document.title = activeTab === 'home' ? 'KNAS | Koninklijke Nederlandse Algemene Schermbond' : `${article?.title ?? meta.title} | KNAS`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', article?.summary ?? meta.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locale === 'en' ? 'en_GB' : 'nl_NL');
    // Taalalternatieven van deze pagina; worden pas echt bruikbaar voor zoekmachines met echte URL's i.p.v. #-routes.
    const base = `${window.location.origin}${window.location.pathname}`;
    const alternates: [string, string][] = [['nl', routePath], ['en', withLocale(routePath, 'en')], ['x-default', routePath]];
    alternates.forEach(([lang, target]) => {
      let link = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = `${base}#${target}`;
    });
  }, [activeTab, articleId, path, locale, routePath]);

  const navigateToPath = (href: string) => {
    const target = href.startsWith('#') ? href.slice(1) : withLocale(href, locale);
    if (readHashPath() === target) afterNavigation(target, true);
    else window.location.hash = target;
  };

  const closeArticle = () => {
    if (inAppNavigations.current > 0) window.history.back();
    else navigateToPath('/nieuws');
  };

  // Ankers op dezelfde pagina (#sectie) en links naar de huidige pagina; overige interne links werken via de hash zelf.
  const handleContentClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!anchor || !href || anchor.target === '_blank') return;
    if (href.startsWith('#') && !href.startsWith('#/')) {
      event.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) scrollToSection(target);
      return;
    }
    if (href.startsWith('/') || href === window.location.hash) {
      event.preventDefault();
      navigateToPath(href);
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'schermen':
        return <SchermenView />;
      case 'eerste-stappen':
        return <EersteStappenView />;
      case 'veelgestelde-vragen':
        return <VeelgesteldeVragenView />;
      case 'verenigingen':
        return <VerenigingenView wheelchairOnlyInitial={queryOf(path).has('rolstoelschermen')} />;
      case 'wedstrijden-overzicht':
        return <WedstrijdenOverzichtView />;
      case 'wedstrijden':
        return <WedstrijdenView championshipsOnly={basePath(path) === '/wedstrijden/nk'} initialQuery={queryOf(path)} />;
      case 'wedstrijdinformatie':
        return <WedstrijdinformatieView />;
      case 'wedstrijdregels':
        return <WedstrijdregelsView />;
      case 'scheidsrechters':
        return <ScheidsrechtersView />;
      case 'ranglijsten':
        return <RanglijstenView />;
      case 'opleidingen':
        return <TrainersopleidingenView />;
      case 'voor-clubs':
        return <ClubsOverzichtView />;
      case 'clubs-ledenadministratie':
        return <LedenadministratieView />;
      case 'clubs-oprichten':
        return <ClubOprichtenView />;
      case 'clubs-documenten':
        return <ClubDocumentenView />;
      case 'clubs-veilig':
        return <VeiligSportklimaatView />;
      case 'over-knas':
        return <OverDeKnasView />;
      case 'nieuws':
        return <NieuwsView group={queryOf(path).get('onderwerp')} articleId={articleId} onCloseArticle={closeArticle} />;
      case 'contact':
        return <KnasContactView />;
      case 'topsport':
        return <TopsportOverzichtView />;
      case 'topsport-talent':
        return <TalentprogrammaView />;
      case 'topsport-titels':
        return <TiteltoernooienView />;
      case 'topsport-aanmelden':
        return <InternationaalAanmeldenView />;
      case 'ereleden':
        return <KnasEreledenView />;
      case 'lidmaatschap':
        return <LidmaatschapTarievenView />;
      case 'bestuur':
        return <BestuurCommissiesView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <NotFoundView />;
    }
  };

  return (
    <LocaleContext.Provider value={locale}>
      {/* Andere taal = alles opnieuw opbouwen, zodat elke link en tekst de nieuwe taal krijgt. */}
      <div key={locale} className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans antialiased selection:bg-royal-orange/30 selection:text-primary">
        <Header
          currentPath={basePath(path)}
          languagePaths={{ nl: routePath, en: withLocale(routePath, 'en') }}
          onNavigate={navigateToPath}
        />

        <main id="main" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none" onClick={handleContentClick}>
          <div key={activeTab} className="k-route-view flex-1 flex flex-col">
            <Suspense fallback={<div className="k-route-loading" role="status"><span className="k-visually-hidden">{ui[locale].pageLoading}</span></div>}>
              {renderActiveView()}
            </Suspense>
          </div>
        </main>

        <Footer onNavigate={navigateToPath} />
      </div>
    </LocaleContext.Provider>
  );
}
