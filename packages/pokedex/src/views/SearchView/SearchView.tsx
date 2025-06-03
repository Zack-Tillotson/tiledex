"use client";

import React from "react";
import { useSearchStore } from "../../stores/useSearchStore";
import { SearchForm } from "../SearchForm";
import { PokemonGrid } from "../PokemonGrid";

import styles from "./SearchView.module.css";

export function SearchView() {
  const { searchTerm, searchResults, performSearch, clearSearch } =
    useSearchStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Pokémon</h1>

      <SearchForm onSearch={performSearch} onClear={clearSearch} />

      {searchTerm && <PokemonGrid pokemon={searchResults} />}
    </div>
  );
}
