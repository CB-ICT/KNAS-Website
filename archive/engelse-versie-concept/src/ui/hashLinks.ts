// De site gebruikt hash-routing; interne links staan in de code als "/pad".
// Door ze in de DOM om te zetten naar "#/pad" (of "#/en/pad" in het Engels) werken ook nieuw tabblad, middelklik en "link kopiëren".
import { getActiveLocale, withLocale } from '../i18n';

const toHashHref = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute('href');
  if (href && href.startsWith('/') && !href.startsWith('//')) anchor.setAttribute('href', `#${withLocale(href, getActiveLocale())}`);
};

const convertWithin = (root: ParentNode) => {
  if (root instanceof HTMLAnchorElement) toHashHref(root);
  root.querySelectorAll?.('a[href^="/"]').forEach((anchor) => toHashHref(anchor as HTMLAnchorElement));
};

export function enableHashLinks() {
  convertWithin(document.body);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        if (mutation.target instanceof HTMLAnchorElement) toHashHref(mutation.target);
      } else mutation.addedNodes.forEach((node) => { if (node instanceof Element) convertWithin(node); });
    }
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
}
