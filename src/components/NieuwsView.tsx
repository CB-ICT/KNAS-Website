import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Newspaper, RefreshCw, RotateCcw, Search } from 'lucide-react';
import { allNews, articleHref, formatNewsDate, newsSyncedAt } from '../news';
import { groupsForFilter, newsGroupOf, newsGroups } from '../newsGroups';
import { Alert, Breadcrumb, Button, NewsCard } from '../ui/components';
import ArticleReader from './news/ArticleReader';
import '../ui/templates/templates.css';

const PAGE_SIZE = 9;

const availableGroups = newsGroups.filter((group) => allNews.some((item) => newsGroupOf(item.category) === group.slug));

interface NieuwsViewProps {
  group?: string | null;
  articleId?: string | null;
  onCloseArticle: () => void;
}

export default function NieuwsView({ group: groupFromUrl, articleId, onCloseArticle }: NieuwsViewProps) {
  const [activeGroups, setActiveGroups] = useState<string[]>(groupsForFilter(groupFromUrl));
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setActiveGroups(groupsForFilter(groupFromUrl));
    setVisibleCount(PAGE_SIZE);
  }, [groupFromUrl]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allNews.filter((item) => {
      if (activeGroups.length > 0 && !activeGroups.includes(newsGroupOf(item.category))) return false;
      if (!q) return true;
      return [item.title, item.summary, item.category, ...(item.tags ?? [])].join(' ').toLowerCase().includes(q);
    });
  }, [activeGroups, query]);

  const visible = filtered.slice(0, visibleCount);
  const article = articleId ? allNews.find((item) => item.id === articleId) : undefined;
  const hasFilters = activeGroups.length > 0 || query.trim() !== '';

  const syncedLabel = newsSyncedAt
    ? new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(newsSyncedAt))
    : null;

  const reset = () => {
    setQuery('');
    setActiveGroups([]);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="k-ds">
      <header className="k-page-header k-page-header--media k-on-dark">
        <figure className="k-page-header__media">
          <img src="images/fencing/fencing-09.jpg" alt="" />
        </figure>
        <div className="k-container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Nieuws' }]} />
          <h1 className="k-page-header__title">Nieuws</h1>
          <p className="k-lead k-page-header__intro">Uitslagen, kampioenschappen, jeugd en nieuws van de bond en de verenigingen.</p>
          {syncedLabel && <p className="k-sync-note"><RefreshCw aria-hidden="true" /> Bijgewerkt op {syncedLabel}</p>}
        </div>
      </header>

      <section className="k-section k-calendar-section" aria-label="Nieuwsberichten">
        <div className="k-container">
          <div className="k-news-filterbar">
            <label className="k-calendar-search">
              <span className="k-visually-hidden">Zoek in het nieuws</span>
              <Search aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Zoek in het nieuws, bijvoorbeeld NK of veteranen"
              />
            </label>
            <div className="k-filter-group" role="group" aria-label="Onderwerp">
              {[{ slug: '', label: 'Alles' }, ...availableGroups].map(({ slug, label }) => {
                const isActive = slug ? activeGroups.includes(slug) : activeGroups.length === 0;
                return (
                  <button
                    key={slug || 'alles'}
                    type="button"
                    aria-pressed={isActive}
                    className={isActive ? 'is-active' : ''}
                    onClick={() => { setActiveGroups(slug ? [slug] : []); setVisibleCount(PAGE_SIZE); }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {articleId && !article && (
            <div className="k-news-missing">
              <Alert tone="warning" title="Bericht niet gevonden">Dit bericht is niet (meer) beschikbaar. Hieronder vind je het overige nieuws.</Alert>
            </div>
          )}

          <div className="k-calendar-count" aria-live="polite">
            <span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'bericht' : 'berichten'}</span>
            {hasFilters && <Button variant="text" onClick={reset} iconLeft={<RotateCcw aria-hidden="true" />}>Wis filters</Button>}
          </div>

          {visible.length > 0 ? (
            <ul className="k-grid k-grid--3 k-news-grid">
              {visible.map((item) => (
                <li key={item.id}>
                  <NewsCard
                    href={articleHref(item.id)}
                    title={item.title}
                    date={formatNewsDate(item)}
                    dateTime={item.dateISO ?? ''}
                    category={item.category}
                    summary={item.summary}
                    image={item.image}
                    headingLevel="h2"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="k-empty-state">
              <Newspaper aria-hidden="true" />
              <h2>Geen berichten gevonden</h2>
              <p>Probeer een andere zoekterm of kies een ander onderwerp.</p>
              <Button variant="secondary" onClick={reset}>Toon alle berichten</Button>
            </div>
          )}

          {filtered.length > visibleCount && (
            <div className="k-news-more">
              <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Meer berichten ({filtered.length - visibleCount})
              </Button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {article && <ArticleReader key={article.id} item={article} onClose={onCloseArticle} returnFocusHref={articleHref(article.id)} />}
      </AnimatePresence>
    </div>
  );
}
