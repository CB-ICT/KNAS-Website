import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, MotionConfig } from 'motion/react';
import { CalendarDays, Clock, Download, User, X } from 'lucide-react';
import { NewsItem } from '../../types';
import { formatNewsDate, readingMinutes } from '../../news';

interface ArticleReaderProps {
  item: NewsItem;
  onClose: () => void;
  /** Na sluiten krijgt de link met deze href weer de focus. */
  returnFocusHref?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ArticleReader({ item, onClose, returnFocusHref }: ArticleReaderProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const showPhoto = item.hasOwnImage !== false;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
      // Focus blijft binnen het venster zolang het open is.
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    const dialog = dialogRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      if (returnFocusHref) {
        window.setTimeout(() => {
          // Staat het venster er nog (bv. dubbele effect-run in StrictMode), dan niet terugspringen.
          if (dialog?.isConnected) return;
          document.querySelector<HTMLElement>(`a[href="#${returnFocusHref}"], a[href="${returnFocusHref}"]`)?.focus({ preventScroll: true });
        }, 50);
      }
    };
  }, [returnFocusHref]);

  const paragraphs = item.contentHtml
    ? []
    : (item.fullContent ?? item.summary)
        .split(/\n\s*\n/)
        .map((block) => block.replace(/\s+/g, ' ').trim())
        .filter(Boolean);

  return createPortal(
    <MotionConfig reducedMotion="user">
    <motion.div
      ref={dialogRef}
      className="fixed inset-0 z-[200] overflow-y-auto bg-ebony-slate/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-title"
    >
      <div className="flex min-h-full items-start justify-center px-3 py-6 md:py-12">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-primary shadow-md transition hover:bg-primary hover:text-white"
            aria-label="Artikel sluiten"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {showPhoto ? (
            <img src={item.image} alt="" className="max-h-[420px] w-full object-cover" />
          ) : (
            <div className="relative h-28 bg-primary">
              <div className="absolute inset-0 fencing-mesh-pattern opacity-10" aria-hidden />
            </div>
          )}

          <div className="px-6 pb-8 pt-7 md:px-12 md:pb-12 md:pt-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-royal-orange/15 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-[#a85f00]">
                {item.category}
              </span>
              {item.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-container-low px-3 py-1 font-sans text-xs font-semibold text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>

            <h2 id="article-title" className="mt-4 font-serif text-3xl font-bold leading-tight text-primary md:text-4xl">
              {item.title}
            </h2>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-piste-silver pb-6 font-sans text-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" aria-hidden="true" /> {formatNewsDate(item)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> {readingMinutes(item)} min lezen</span>
              {item.author && <span className="flex items-center gap-1.5"><User className="h-4 w-4" aria-hidden="true" /> {item.author}</span>}
            </div>

            {item.contentHtml ? (
              <div className="article-content mt-6" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
            ) : (
              <div className="article-content mt-6">
                {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
              </div>
            )}

            {item.attachments && item.attachments.length > 0 && (
              <div className="mt-8 rounded-xl bg-surface-container-low p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Downloads</p>
                <ul className="mt-3 space-y-2">
                  {item.attachments.map((file) => (
                    <li key={file.url}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        <Download className="h-4 w-4 shrink-0 text-[#a35700]" aria-hidden="true" /> {file.title}
                        <span className="sr-only"> (opent in nieuw venster)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-piste-silver px-6 py-3 font-sans text-sm font-bold text-primary transition hover:border-primary"
              >
                Terug naar overzicht
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
    </MotionConfig>,
    document.body,
  );
}
