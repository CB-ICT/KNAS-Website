import React, { useId, useState } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  /** Zonder onSearch wordt het formulier als GET naar `action` verstuurd (werkt zonder JS). */
  action?: string;
  name?: string;
  onSearch?: (query: string) => void;
  size?: 'md' | 'lg';
  autoFocus?: boolean;
}

export default function SearchBar({
  label = 'Zoeken op de site',
  placeholder = 'Waar ben je naar op zoek?',
  defaultValue = '',
  action = '/zoeken',
  name = 'q',
  onSearch,
  size = 'md',
  autoFocus,
}: SearchBarProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (event: React.FormEvent) => {
    if (!onSearch) return;
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form role="search" action={action} method="get" onSubmit={handleSubmit} className={`k-search k-search--${size}`}>
      <label htmlFor={id} className="k-visually-hidden">{label}</label>
      <Search className="k-search__icon" aria-hidden="true" />
      <input
        id={id}
        name={name}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        className="k-search__input"
      />
      {value && (
        <button type="button" className="k-search__clear" onClick={() => setValue('')} aria-label="Zoekveld leegmaken">
          <X aria-hidden="true" />
        </button>
      )}
      {/* Zoeken is een ondersteunende actie: navy, zodat oranje vrij blijft voor de paginataak. */}
      <button type="submit" className="k-search__submit">Zoeken</button>
    </form>
  );
}
