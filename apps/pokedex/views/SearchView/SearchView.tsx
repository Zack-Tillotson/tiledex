'use client'

import styles from './SearchView.module.css';
import { SearchForm } from '../SearchForm';
import { PokemonGrid } from '@repo/ui/pokemon-grid/pokemon-grid';
import { useSearchStore } from '../../stores/useSearchStore';

export function SearchView() {

  const {
    searchTerm, 
    searchResults, 
    performSearch, 
    clearSearch,
  } = useSearchStore();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Pokémon</h1>
      
      <SearchForm
        onSearch={performSearch}
        onClear={clearSearch}
      />
      
      {searchTerm && (
        <PokemonGrid
          pokemon={searchResults}
        />
      )}

    </div>
  );
}
