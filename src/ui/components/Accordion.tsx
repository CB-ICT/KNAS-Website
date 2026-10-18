import React from 'react';
import { Plus } from 'lucide-react';
import './Accordion.css';

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Zelfde naam = maar één item tegelijk open (native exclusive <details>). */
  name?: string;
  headingLevel?: 'h2' | 'h3';
}

// Native <details>/<summary>: toetsenbord, schermlezer en ctrl+F (zoeken in dichte items) werken zonder JS.
export default function Accordion({ items, name, headingLevel = 'h3' }: AccordionProps) {
  const Heading = headingLevel;
  return (
    <div className="k-accordion">
      {items.map((item) => (
        <details key={item.question} className="k-accordion__item" {...(name ? { name } : {})}>
          <summary className="k-accordion__summary">
            <Heading className="k-accordion__question">{item.question}</Heading>
            <Plus className="k-accordion__icon" aria-hidden="true" />
          </summary>
          <div className="k-accordion__answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
