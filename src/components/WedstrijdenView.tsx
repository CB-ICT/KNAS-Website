import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, RefreshCw, RotateCcw, Search } from 'lucide-react';
import { Breadcrumb, Button, EventCard } from '../ui/components';
import { calendarSyncedAt, tournamentsData } from '../data';
import { TournamentItem } from '../types';
import '../ui/templates/templates.css';

interface WedstrijdenViewProps {
  /** Route /wedstrijden/nk opent de kalender met alleen Nederlandse kampioenschappen. */
  championshipsOnly?: boolean;
  /** Filters uit de URL (?zoek=&wapen=&soort=&maand=), zodat een gefilterde kalender deelbaar is. */
  initialQuery?: URLSearchParams;
}

const weapons = ['Alle', 'Floret', 'Degen', 'Sabel'];

const kinds: { value: string; label: string; matches: (t: TournamentItem) => boolean }[] = [
  { value: 'alle', label: 'Alle soorten', matches: () => true },
  { value: 'nk', label: 'Nederlandse kampioenschappen', matches: (t) => /^(NK|NJK)\b/i.test(t.title) },
  { value: 'jeugd', label: 'Jeugdpuntentoernooien', matches: (t) => /jeugdpunten/i.test(t.title) },
  { value: 'recreatief', label: 'Recreatief', matches: (t) => (t.typeCode ?? '').startsWith('Rec') },
  { value: 'open', label: 'Nationaal en internationaal', matches: (t) => t.typeCode === 'Nat.' || t.typeCode === 'Int.' },
];

const dayMonth = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' });
const monthYear = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric' });
const asDate = (iso: string) => new Date(`${iso}T12:00:00`);

function registrationNote(tournament: TournamentItem, today: Date) {
  if (!tournament.closingDateISO) return undefined;
  const closing = asDate(tournament.closingDateISO);
  return closing < today ? 'Inschrijving gesloten' : `Inschrijven tot ${dayMonth.format(closing)}`;
}

export default function WedstrijdenView({ championshipsOnly = false, initialQuery }: WedstrijdenViewProps) {
  const defaultKind = championshipsOnly ? 'nk' : 'alle';
  const fromUrl = (key: string, allowed: string[], fallback: string) => {
    const value = initialQuery?.get(key);
    return value && allowed.includes(value) ? value : fallback;
  };
  const [query, setQuery] = useState(initialQuery?.get('zoek') ?? '');
  const [weapon, setWeapon] = useState(() => fromUrl('wapen', weapons, 'Alle'));
  const [kind, setKind] = useState(() => fromUrl('soort', kinds.map((k) => k.value), defaultKind));
  const [month, setMonth] = useState(() => fromUrl('maand', [...new Set(tournamentsData.map((t) => t.dateISO.slice(0, 7)))], 'alle'));

  // Menu-items "Wedstrijdkalender" en "Nederlandse kampioenschappen" delen deze view.
  const previousChampionshipsOnly = useRef(championshipsOnly);
  useEffect(() => {
    if (previousChampionshipsOnly.current === championshipsOnly) return;
    previousChampionshipsOnly.current = championshipsOnly;
    setKind(championshipsOnly ? 'nk' : 'alle');
  }, [championshipsOnly]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('zoek', query.trim());
    if (weapon !== 'Alle') params.set('wapen', weapon);
    if (kind !== defaultKind) params.set('soort', kind);
    if (month !== 'alle') params.set('maand', month);
    const qs = params.toString();
    const next = `#${championshipsOnly ? '/wedstrijden/nk' : '/wedstrijden/kalender'}${qs ? `?${qs}` : ''}`;
    if (window.location.hash !== next) window.history.replaceState(null, '', next);
  }, [query, weapon, kind, month, championshipsOnly, defaultKind]);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const months = useMemo(
    () => [...new Set(tournamentsData.map((t) => t.dateISO.slice(0, 7)))],
    [],
  );

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const kindFilter = kinds.find((k) => k.value === kind) ?? kinds[0];
    return tournamentsData.filter((t) =>
      (!search || `${t.title} ${t.city ?? ''}`.toLowerCase().includes(search))
      && (weapon === 'Alle' || t.category.toLowerCase().includes(weapon.toLowerCase()))
      && (month === 'alle' || t.dateISO.startsWith(month))
      && kindFilter.matches(t),
    );
  }, [kind, month, query, weapon]);

  const grouped = useMemo(() => {
    const groups = new Map<string, TournamentItem[]>();
    filtered.forEach((t) => {
      const key = t.dateISO.slice(0, 7);
      groups.set(key, [...(groups.get(key) ?? []), t]);
    });
    return [...groups.entries()];
  }, [filtered]);

  const hasFilters = query !== '' || weapon !== 'Alle' || month !== 'alle' || kind !== 'alle';
  const reset = () => { setQuery(''); setWeapon('Alle'); setMonth('alle'); setKind('alle'); };
  const title = kind === 'nk' ? 'Nederlandse kampioenschappen' : 'Wedstrijdkalender';
  const syncedLabel = calendarSyncedAt
    ? new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(calendarSyncedAt))
    : undefined;

  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-03.jpg" alt="Floretschermers in actie" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wedstrijden', href: '/wedstrijden' }, { label: title }]} />
          <h1 className="k-page-header__title">{title}</h1>
          <p className="k-lead k-page-header__intro">
            {kind === 'nk'
              ? 'De Nederlandse kampioenschappen voor jeugd, senioren en veteranen in de komende twaalf maanden.'
              : 'Alle Nederlandse schermwedstrijden van de komende twaalf maanden. Open een wedstrijd voor het programma, de inschrijving en na afloop de uitslag.'}
          </p>
          {syncedLabel && <p className="k-sync-note"><RefreshCw aria-hidden="true" /> Wedstrijdgegevens bijgewerkt op {syncedLabel}</p>}
        </div>
      </header>

      <section className="k-section k-calendar-section" aria-label="Wedstrijden zoeken">
        <div className="k-container">
          <div className="k-calendar-filterbar">
            <label className="k-calendar-search">
              <span className="k-visually-hidden">Zoek op naam of plaats</span>
              <Search aria-hidden="true" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Zoek op naam of plaats" />
            </label>
            <div className="k-filter-group" role="group" aria-label="Wapen">
              {weapons.map((item) => (
                <button key={item} type="button" aria-pressed={weapon === item} className={weapon === item ? 'is-active' : ''} onClick={() => setWeapon(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label className="k-filter-select">
              <span className="k-visually-hidden">Soort wedstrijd</span>
              <select value={kind} onChange={(e) => setKind(e.target.value)}>
                {kinds.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
              </select>
            </label>
            <label className="k-filter-select">
              <span className="k-visually-hidden">Maand</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="alle">Alle maanden</option>
                {months.map((m) => <option key={m} value={m}>{monthYear.format(asDate(`${m}-01`))}</option>)}
              </select>
            </label>
          </div>

          <div className="k-calendar-count" aria-live="polite">
            <span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'wedstrijd' : 'wedstrijden'}</span>
            {hasFilters && <Button variant="text" onClick={reset} iconLeft={<RotateCcw aria-hidden="true" />}>Wis filters</Button>}
          </div>

          {grouped.map(([key, items]) => (
            <section key={key} className="k-calendar-month" aria-labelledby={`month-${key}`}>
              <h2 id={`month-${key}`} className="k-calendar-month__title">{monthYear.format(asDate(`${key}-01`))}</h2>
              <div className="k-calendar-list">
                {items.map((t) => (
                  <EventCard
                    key={t.id}
                    href={t.actionUrl}
                    external
                    title={t.title}
                    day={t.dateDay}
                    month={dayMonth.format(asDate(t.dateISO)).split(' ')[1]}
                    dateTime={t.dateISO}
                    location={t.city ?? t.location}
                    type={t.type}
                    weapon={t.category}
                    note={registrationNote(t, today)}
                  />
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="k-empty-state">
              <CalendarDays aria-hidden="true" />
              <h2>Geen wedstrijden gevonden</h2>
              <p>Pas je zoekterm of filters aan.</p>
              <Button variant="secondary" onClick={reset}>Wis filters</Button>
            </div>
          )}

          <aside className="k-calendar-help" aria-label="Meer hulp">
            <div>
              <strong>Eerste keer naar een wedstrijd?</strong>
              <p>Lees wat je moet regelen en meenemen, en hoe een wedstrijddag verloopt.</p>
            </div>
            <Button variant="secondary" href="/wedstrijden/voorbereiden">Voorbereiden op een wedstrijd</Button>
          </aside>
        </div>
      </section>
    </div>
  );
}
