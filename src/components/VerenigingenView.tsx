import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Accessibility, Globe, Mail, MapPin, Phone, RotateCcw, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { clubLocations, uniqueClubsData } from '../allClubsData';
import { ClubItem } from '../types';
import { Breadcrumb, Button } from '../ui/components';
import '../ui/templates/templates.css';

interface VerenigingenViewProps {
  wheelchairOnlyInitial?: boolean;
}

type Located = ClubItem & { distanceKm?: number };
type Point = { lat: number; lng: number };

const MOBILE_PAGE = 10;
const NL_CENTER: [number, number] = [52.1326, 5.2913];

// Clubs zonder eigen site verwijzen in de bron naar de clublijst op knas.nl.
const hasOwnSite = (club: ClubItem) => Boolean(club.website) && !club.website.includes('knas.nl');

const toRadians = (degrees: number) => degrees * (Math.PI / 180);
const distanceKm = (from: Point, to: Point) => {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};
const formatDistance = (km?: number) => (km === undefined ? '' : km < 10 ? `${km.toFixed(1).replace('.', ',')} km` : `${Math.round(km)} km`);

const isPostcode = (query: string) => /^\d{4}\s?[a-z]{0,2}$/i.test(query.trim());

// PDOK Locatieserver (Kadaster): Nederlandse plaatsen en postcodes, zonder tracking of API-sleutel.
async function geocode(query: string): Promise<Point | null> {
  const postcode = query.replace(/\s+/g, '').toUpperCase();
  const params = isPostcode(query)
    ? `fq=type:postcode&q=${encodeURIComponent(`postcode:${postcode}${postcode.length === 4 ? '*' : ''}`)}`
    : `fq=${encodeURIComponent('type:(woonplaats OR gemeente)')}&q=${encodeURIComponent(query)}`;
  const response = await fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?rows=1&fl=centroide_ll&${params}`);
  if (!response.ok) return null;
  const data = (await response.json()) as { response?: { docs?: { centroide_ll?: string }[] } };
  const match = data.response?.docs?.[0]?.centroide_ll?.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  return match ? { lng: Number(match[1]), lat: Number(match[2]) } : null;
}

const pinIcon = (selected: boolean) =>
  new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    className: selected ? 'k-clubmap__pin is-selected' : 'k-clubmap__pin',
  });
const defaultPin = pinIcon(false);
const selectedPin = pinIcon(true);

function FitBounds({ clubs }: { clubs: ClubItem[] }) {
  const map = useMap();
  useEffect(() => {
    if (!clubs.length) {
      map.setView(NL_CENTER, 7);
      return;
    }
    map.fitBounds(L.latLngBounds(clubs.map((club) => [club.lat, club.lng] as [number, number])), { padding: [16, 16], maxZoom: 12 });
  }, [clubs, map]);
  return null;
}

export default function VerenigingenView({ wheelchairOnlyInitial = false }: VerenigingenViewProps) {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState<{ point: Point; label: string } | null>(null);
  const [status, setStatus] = useState<'idle' | 'searching' | 'not-found' | 'error'>('idle');
  const [wheelchairOnly, setWheelchairOnly] = useState(wheelchairOnlyInitial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const profileRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setWheelchairOnly(wheelchairOnlyInitial), [wheelchairOnlyInitial]);

  const pool = useMemo(() => (wheelchairOnly ? clubLocations.filter((club) => club.wheelchair) : clubLocations), [wheelchairOnly]);

  // Zoeken op naam of adres gebeurt direct tijdens het typen; afstand pas na "Zoeken" op plaats of postcode.
  const results: Located[] = useMemo(() => {
    if (origin) {
      return pool
        .map((club) => ({ ...club, distanceKm: distanceKm(origin.point, club) }))
        .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
        .slice(0, 8);
    }
    const q = query.trim().toLowerCase();
    const list = q ? pool.filter((club) => `${club.name} ${club.address}`.toLowerCase().includes(q)) : pool;
    return [...list].sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  }, [origin, pool, query]);

  const selected = results.find((club) => club.id === selectedId) ?? null;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    const textMatches = pool.some((club) => `${club.name} ${club.address}`.toLowerCase().includes(q.toLowerCase()));
    if (textMatches && !isPostcode(q)) return;
    setStatus('searching');
    try {
      const point = await geocode(q);
      if (point) {
        setOrigin({ point, label: q });
        setStatus('idle');
      } else setStatus('not-found');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setQuery('');
    setOrigin(null);
    setStatus('idle');
    setSelectedId(null);
  };

  const selectClub = (id: string) => {
    setSelectedId(id);
    // Op smalle schermen staat het profiel onder de lijst: breng het in beeld.
    window.requestAnimationFrame(() => {
      const heading = profileRef.current;
      if (!heading) return;
      if (!window.matchMedia('(min-width: 64em)').matches) {
        heading.closest('section')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
      heading.focus({ preventScroll: true });
    });
  };

  const visible = showAll ? results : results.slice(0, MOBILE_PAGE);
  const countLabel = origin
    ? `De ${results.length} dichtstbijzijnde locaties bij ${origin.label}`
    : `${results.length} ${results.length === 1 ? 'locatie' : 'locaties'}${query.trim() ? ` voor “${query.trim()}”` : ''}`;

  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-04.jpg" alt="" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Beginnen', href: '/beginnen' }, { label: 'Vind een club' }]} />
          <h1 className="k-page-header__title">Vind een club</h1>
          <p className="k-lead k-page-header__intro">
            Er zijn {uniqueClubsData.length} schermverenigingen aangesloten bij de KNAS. Zoek op plaats, postcode of clubnaam en neem contact op voor een proefles.
          </p>
        </div>
      </header>

      <section className="k-section k-section--tight-top" aria-label="Clubs zoeken">
        <div className="k-container">
          <form className="k-clubfinder__search" role="search" onSubmit={onSubmit}>
            <label htmlFor="club-query" className="k-clubfinder__label">Plaats, postcode of clubnaam</label>
            <div className="k-clubfinder__row">
              <div className="k-calendar-search">
                <Search aria-hidden="true" />
                <input
                  id="club-query"
                  type="search"
                  value={query}
                  autoComplete="off"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOrigin(null);
                    setStatus('idle');
                    setShowAll(false);
                  }}
                  placeholder="Bijvoorbeeld Utrecht of 3439"
                />
              </div>
              <Button type="submit" variant="primary">Zoeken</Button>
            </div>
            <label className="k-clubfinder__check">
              <input type="checkbox" checked={wheelchairOnly} onChange={(event) => setWheelchairOnly(event.target.checked)} />
              <Accessibility aria-hidden="true" />
              Alleen clubs met rolstoelschermen
            </label>
          </form>

          <div className="k-calendar-count" aria-live="polite">
            <span>
              {status === 'searching' && 'Locatie zoeken…'}
              {status === 'not-found' && `Geen plaats of postcode gevonden voor “${query.trim()}”. Controleer de spelling of zoek op een plaats in de buurt.`}
              {status === 'error' && 'Zoeken op afstand lukt nu niet. Zoek op clubnaam of plaatsnaam.'}
              {status === 'idle' && countLabel}
            </span>
            {(query || origin) && <Button variant="text" onClick={reset} iconLeft={<RotateCcw aria-hidden="true" />}>Wis zoekopdracht</Button>}
          </div>

          <div className="k-clubfinder">
            <div className="k-clubfinder__results">
              {results.length > 0 ? (
                <ul className="k-clubfinder__list">
                  {visible.map((club) => (
                    <li key={club.id}>
                      <button
                        type="button"
                        className="k-clubfinder__item"
                        aria-pressed={club.id === selectedId}
                        onClick={() => selectClub(club.id)}
                      >
                        <span className="k-clubfinder__name">{club.name}</span>
                        <span className="k-clubfinder__address"><MapPin aria-hidden="true" />{club.address}</span>
                        <span className="k-clubfinder__meta">
                          {club.distanceKm !== undefined && <span className="k-clubfinder__distance">{formatDistance(club.distanceKm)}</span>}
                          {club.wheelchair && <span className="k-clubfinder__tag"><Accessibility aria-hidden="true" /> Rolstoelschermen</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                status === 'idle' && (
                  <div className="k-empty-state">
                    <MapPin aria-hidden="true" />
                    <h2>Geen club gevonden</h2>
                    <p>Controleer de spelling, of druk op Zoeken om op afstand te zoeken.</p>
                    <Button variant="secondary" onClick={reset}>Wis zoekopdracht</Button>
                  </div>
                )
              )}
              {!showAll && results.length > MOBILE_PAGE && (
                <Button variant="secondary" fullWidth className="k-clubfinder__more" onClick={() => setShowAll(true)}>
                  Toon alle {results.length} locaties
                </Button>
              )}
            </div>

            <div className="k-clubfinder__side">
              <div className="k-clubmap">
                <MapContainer center={NL_CENTER} zoom={7} className="k-clubmap__canvas" scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>-bijdragers'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FitBounds clubs={results} />
                  {results.map((club) => (
                    <Marker
                      key={club.id}
                      position={[club.lat, club.lng]}
                      icon={club.id === selectedId ? selectedPin : defaultPin}
                      zIndexOffset={club.id === selectedId ? 1000 : 0}
                      title={club.name}
                      alt={club.name}
                      eventHandlers={{ click: () => selectClub(club.id) }}
                    />
                  ))}
                </MapContainer>
              </div>

              <section className="k-clubprofile" aria-labelledby="club-profile-title">
                {selected ? (
                  <>
                    <h2 id="club-profile-title" ref={profileRef} tabIndex={-1}>{selected.name}</h2>
                    <ul className="k-clubprofile__facts">
                      <li><MapPin aria-hidden="true" /><span>{selected.address}</span></li>
                      {selected.phone && (
                        <li><Phone aria-hidden="true" /><a href={`tel:${selected.phone.replace(/[^\d+]/g, '')}`}>{selected.phone}</a></li>
                      )}
                      {selected.email && (
                        <li><Mail aria-hidden="true" /><a href={`mailto:${selected.email}`}>{selected.email}</a></li>
                      )}
                      {hasOwnSite(selected) && (
                        <li>
                          <Globe aria-hidden="true" />
                          <a href={selected.website} target="_blank" rel="noopener noreferrer">
                            Website van de club<span className="k-visually-hidden"> (opent in nieuw venster)</span>
                          </a>
                        </li>
                      )}
                    </ul>
                    {selected.wheelchair && (
                      <p className="k-clubprofile__note">
                        <Accessibility aria-hidden="true" /> Deze club biedt rolstoelschermen aan of ondersteunt het. Vraag naar de trainingsmogelijkheden en de toegankelijkheid van de locatie.
                      </p>
                    )}
                    <p className="k-muted">Trainingstijden en proeflessen verschillen per club. Kijk op de website van de club of neem contact op.</p>
                    <div className="k-page-header__actions">
                      {selected.email && (
                        <Button
                          variant="secondary"
                          href={`mailto:${selected.email}?subject=${encodeURIComponent('Vraag over een proefles')}&body=${encodeURIComponent(`Beste ${selected.name},\n\nIk ben geïnteresseerd in een proefles en hoor graag meer over de mogelijkheden en trainingstijden.\n\nMet vriendelijke groet,`)}`}
                          iconLeft={<Mail aria-hidden="true" />}
                        >
                          Mail over een proefles
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 id="club-profile-title" ref={profileRef} tabIndex={-1}>Kies een club</h2>
                    <p className="k-muted">Kies een club in de lijst of op de kaart om de contactgegevens te zien.</p>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
