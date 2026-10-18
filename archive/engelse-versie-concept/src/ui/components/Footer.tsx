import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { contactInfo, getFooterLegal, getMainNav, socialLinks } from '../navigation';
import { useLocale } from '../../i18n';
import { ui } from '../../i18n/ui';
import './Footer.css';

const socialIcons = { facebook: Facebook, instagram: Instagram, youtube: Youtube };

// Footer herhaalt de hoofdstructuur (niveau 1 + 2 belangrijkste links) als vangnet voor wie onderaan zoekt.
export default function Footer({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const locale = useLocale();
  const t = ui[locale];
  const mainNav = getMainNav(locale);
  const footerLegal = getFooterLegal(locale);
  const year = new Date().getFullYear();
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    const href = (event.target as HTMLElement).closest('a')?.getAttribute('href') ?? '';
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (onNavigate && (href.startsWith('/') || href === window.location.hash)) {
      event.preventDefault();
      onNavigate(href);
    }
  };
  return (
    <footer className="k-footer k-on-dark" onClick={handleLinkClick}>
      <div className="k-container">
        <div className="k-footer__grid">
          <section className="k-footer__brand" aria-labelledby="k-footer-contact">
            <img src="images/brand/knas-logo.png" alt="" width="56" height="56" />
            <h2 id="k-footer-contact" className="k-footer__heading">KNAS</h2>
            <address className="k-footer__address">
              <span lang="nl">{contactInfo.name}</span><br />
              {contactInfo.street}<br />
              {contactInfo.city}<br />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </address>
            <ul className="k-footer__social" aria-label={t.social}>
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.id];
                return (
                  <li key={link.id}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} ${t.opensNewWindow}`} title={link.label}>
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <nav className="k-footer__nav" aria-label={t.footerNav}>
            {mainNav.map((item) => {
              const links = item.footerLinks ?? item.groups.flatMap((group) => group.links).slice(0, 3);
              return (
                <div key={item.id}>
                  <h2 className="k-footer__heading">
                    <a href={item.href}>{item.label}</a>
                  </h2>
                  {links.length > 0 && (
                    <ul>
                      {links.map((link) => (
                        <li key={link.href + link.label}>
                          <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                            {link.label}
                            {link.external && <span className="k-visually-hidden"> {t.externalSite}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="k-footer__bottom">
          <p>© {year} <span lang="nl">{t.copyright}</span></p>
          <ul>
            {footerLegal.map((link) => (
              <li key={link.href}>
                <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {link.label}
                  {link.external && <span className="k-visually-hidden"> {t.opensNewWindow}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
