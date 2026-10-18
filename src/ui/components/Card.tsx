import React from 'react';
import { ArrowRight, Clock, MapPin, Swords } from 'lucide-react';
import './Card.css';

/*
 * Kaarten gebruiken het "stretched link"-patroon: alleen de titel is een echte link
 * (één tabstop, logische schermlezertekst), maar de hele kaart is klikbaar.
 */

interface NewsCardProps {
  href: string;
  title: string;
  date: string;
  dateTime: string;
  category?: string;
  summary?: string;
  image?: string;
  headingLevel?: 'h2' | 'h3';
}

export function NewsCard({ href, title, date, dateTime, category, summary, image, headingLevel = 'h3' }: NewsCardProps) {
  const Heading = headingLevel;
  return (
    <article className="k-card k-card--news">
      <div className="k-card__media">
        {image ? <img src={image} alt="" loading="lazy" /> : <span className="k-skeleton k-card__media-placeholder" />}
      </div>
      <div className="k-card__body">
        <p className="k-card__meta">
          {category && <span className="k-card__tag">{category}</span>}
          <time dateTime={dateTime}>{date}</time>
        </p>
        <Heading className="k-card__title">
          <a href={href} className="k-card__link">{title}</a>
        </Heading>
        {summary && <p className="k-card__text">{summary}</p>}
      </div>
    </article>
  );
}

interface ClubCardProps {
  href: string;
  name: string;
  city: string;
  weapons: string[];
  distance?: string;
  headingLevel?: 'h2' | 'h3';
}

export function ClubCard({ href, name, city, weapons, distance, headingLevel = 'h3' }: ClubCardProps) {
  const Heading = headingLevel;
  return (
    <article className="k-card k-card--club">
      <div className="k-card__body">
        <Heading className="k-card__title">
          <a href={href} className="k-card__link">{name}</a>
        </Heading>
        <p className="k-card__row">
          <MapPin aria-hidden="true" />
          <span>{city}{distance && <span className="k-card__muted"> · {distance}</span>}</span>
        </p>
        <p className="k-card__row">
          <Swords aria-hidden="true" />
          <span><span className="k-visually-hidden">Wapens: </span>{weapons.join(', ')}</span>
        </p>
      </div>
      <ArrowRight className="k-card__arrow" aria-hidden="true" />
    </article>
  );
}

interface EventCardProps {
  href: string;
  title: string;
  day: string;
  month: string;
  dateTime: string;
  location: string;
  type?: string;
  weapon?: string;
  external?: boolean;
  /** Extra regel onder de locatie, bv. de inschrijfdeadline. */
  note?: string;
  headingLevel?: 'h2' | 'h3';
}

export function EventCard({ href, title, day, month, dateTime, location, type, weapon, external, note, headingLevel = 'h3' }: EventCardProps) {
  const Heading = headingLevel;
  return (
    <article className="k-card k-card--event">
      <time className="k-card__date" dateTime={dateTime}>
        <span className="k-card__day">{day}</span>
        <span className="k-card__month">{month}</span>
      </time>
      <div className="k-card__body">
        {(type || weapon) && (
          <p className="k-card__meta">
            {type && <span className="k-card__tag">{type}</span>}
            {weapon && <span>{weapon}</span>}
          </p>
        )}
        <Heading className="k-card__title">
          <a href={href} className="k-card__link" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {title}
            {external && <span className="k-visually-hidden"> (externe site)</span>}
          </a>
        </Heading>
        <p className="k-card__row">
          <MapPin aria-hidden="true" />
          <span>{location}</span>
        </p>
        {note && (
          <p className="k-card__row k-card__note">
            <Clock aria-hidden="true" />
            <span>{note}</span>
          </p>
        )}
      </div>
    </article>
  );
}

interface IconTileProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
}

// Tegel = snelle route naar een taak. Korte label (max. 3 woorden), optioneel één regel uitleg.
export function IconTile({ href, icon, label, description }: IconTileProps) {
  return (
    <a href={href} className="k-tile">
      <span className="k-tile__icon" aria-hidden="true">{icon}</span>
      <span className="k-tile__text">
        <span className="k-tile__label">{label}</span>
        {description && <span className="k-tile__desc">{description}</span>}
      </span>
      <ArrowRight className="k-tile__arrow" aria-hidden="true" />
    </a>
  );
}

interface FeatureCardProps {
  href: string;
  image: string;
  title: string;
  text?: string;
  eyebrow?: string;
  className?: string;
}

// Grote fotokaart voor de belangrijkste routes: beeld draagt de sfeer, tekst staat op een donkere gradient (≥ 7:1).
export function FeatureCard({ href, image, title, text, eyebrow, className = '' }: FeatureCardProps) {
  return (
    <a href={href} className={`k-feature ${className}`}>
      <img src={image} alt="" loading="lazy" />
      <span className="k-feature__body">
        {eyebrow && <span className="k-feature__eyebrow">{eyebrow}</span>}
        <span className="k-feature__title">{title}</span>
        {text && <span className="k-feature__text">{text}</span>}
      </span>
      <span className="k-feature__arrow" aria-hidden="true"><ArrowRight /></span>
    </a>
  );
}
