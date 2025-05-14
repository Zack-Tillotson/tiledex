'use client'

import React, { useState, FormEvent } from 'react';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  initialSearch?: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

export function SearchForm({ initialSearch = '', onSearch, onClear }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>      
      <div className={styles.formGroup}>
        <label htmlFor="search" className={styles.label}>Pokémon Name</label>
        <input
          id="search"
          type="text"
          className={styles.input}
          placeholder="Enter a Pokémon name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className={styles.buttonGroup}>
        {searchTerm && (
          <button 
            type="button" 
            className={styles.clearButton}
            onClick={handleClear}
          >
            Clear
          </button>
        )}
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
}
