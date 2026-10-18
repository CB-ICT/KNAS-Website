// Ruimte die de plakkende kopbalk (en eventueel de Snel naar-balk) bovenaan inneemt.
function stickyOffset(): number {
  const nav = document.querySelector<HTMLElement>('.k-sectionnav');
  if (nav) return parseFloat(getComputedStyle(nav).top) + nav.offsetHeight;
  return document.querySelector<HTMLElement>('.k-header')?.offsetHeight ?? 0;
}

// Een sectiekop telt vanaf het begin van zijn sectie, zodat label en witruimte erboven zichtbaar blijven.
function anchorFor(target: HTMLElement): HTMLElement {
  const section = target.closest('section');
  return section && section !== target && section.querySelector('h2') === target ? section : target;
}

export function sectionTop(target: HTMLElement): number {
  const anchor = anchorFor(target);
  const gap = anchor.tagName === 'SECTION' ? 0 : 16;
  return anchor.getBoundingClientRect().top - stickyOffset() - gap;
}

export function scrollToSection(target: HTMLElement) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: sectionTop(target) + window.scrollY, behavior: reduceMotion ? 'auto' : 'smooth' });
}
