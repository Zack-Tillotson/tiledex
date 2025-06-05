"use client";

import React from "react";
import { useSearchStore } from "../../stores/useSearchStore";
import { SearchForm } from "../SearchForm";
import { PokemonGrid } from "../PokemonGrid";

import styles from "./SearchView.module.css";
import { Header } from "@repo/ui";

export function SearchView() {
  const { searchTerm, performSearch, clearSearch } = useSearchStore();

  return (
    <div className={styles.container}>
      <Header>Search Pokémon</Header>

      <SearchForm onSearch={performSearch} onClear={clearSearch} />

      {searchTerm && <PokemonGrid name={searchTerm} />}
    </div>
  );
}
