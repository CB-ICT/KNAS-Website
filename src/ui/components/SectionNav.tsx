import { MouseEvent, useEffect, useRef, useState } from 'react';
import { scrollToSection, sectionTop } from '../scrollToSection';
import './SectionNav.css';

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

export default function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Vervaagde rand als er rechts nog items buiten beeld staan.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const check = () => setHasMore(list.scrollWidth - list.clientWidth - list.scrollLeft > 4);
    check();
    list.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      list.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [items]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = '';
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && sectionTop(el) <= 24) current = item.id;
      }
      setActiveId(atBottom && current ? items[items.length - 1].id : current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (list && link && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [activeId]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollToSection(target);
  };

  return (
    <nav ref={navRef} className="k-sectionnav" aria-label="Snel naar op deze pagina">
      <div className="k-container k-sectionnav__inner">
        <span className="k-sectionnav__label" aria-hidden="true">Snel naar</span>
        <ol ref={listRef} className={`k-sectionnav__list${hasMore ? ' has-more' : ''}`}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-id={item.id}
                className="k-sectionnav__link"
                aria-current={activeId === item.id ? 'location' : undefined}
                onClick={(event) => handleClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
