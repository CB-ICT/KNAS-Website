import { ArrowRight, CalendarDays } from 'lucide-react';
import { NewsItem } from '../../types';
import { formatNewsDate } from '../../news';

interface NewsCardProps {
  item: NewsItem;
  onOpen: (item: NewsItem) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export default function NewsCard({ item, onOpen, variant = 'default' }: NewsCardProps) {
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group flex w-full items-center gap-4 rounded-xl bg-white p-3 text-left ring-1 ring-piste-silver transition hover:ring-primary hover:shadow-md"
      >
        <img src={item.image} alt="" loading="lazy" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0">
          <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-royal-orange">{item.category}</p>
          <span className="block mt-0.5 line-clamp-2 font-serif text-base font-bold leading-snug text-primary group-hover:text-royal-orange">
            {item.title}
          </span>
          <time className="mt-1 block font-sans text-xs text-on-surface-variant">{formatNewsDate(item, 'short')}</time>
        </div>
      </button>
    );
  }

  if (variant === 'featured') {
    return (
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group grid w-full overflow-hidden rounded-2xl bg-white text-left ring-1 ring-piste-silver transition hover:shadow-xl md:grid-cols-5"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[340px]">
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-royal-orange px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-white">
            Uitgelicht
          </span>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 md:col-span-2 md:p-8">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-royal-orange">{item.category}</p>
          <span className="block font-serif text-2xl font-bold leading-tight text-primary md:text-3xl">{item.title}</span>
          <p className="line-clamp-3 font-sans text-[15px] leading-relaxed text-on-surface-variant">{item.summary}</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <time className="flex items-center gap-1.5 font-sans text-xs text-on-surface-variant">
              <CalendarDays className="h-3.5 w-3.5" /> {formatNewsDate(item)}
            </time>
            <span className="inline-flex items-center gap-1 font-sans text-sm font-bold text-primary group-hover:text-royal-orange">
              Lees verder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left ring-1 ring-piste-silver transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time className="font-sans text-xs text-on-surface-variant">{formatNewsDate(item)}</time>
        <span className="block mt-1.5 line-clamp-3 font-serif text-lg font-bold leading-snug text-primary group-hover:text-royal-orange">
          {item.title}
        </span>
        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-on-surface-variant">{item.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-sans text-sm font-bold text-primary group-hover:text-royal-orange">
          Lees verder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
