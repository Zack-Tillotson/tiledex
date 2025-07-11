"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import styles from "./SearchForm.module.css";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";

interface SearchFormProps {
  initialSearch?: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

export function SearchForm({
  initialSearch = "",
  onSearch,
  onClear,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <Input
        name="search"
        label="Pokémon Name"
        id="search"
        type="text"
        placeholder="Enter a Pokémon name..."
        value={searchTerm}
        onChange={handleChange}
      />

      <div className={styles.buttonGroup}>
        {searchTerm && (
          <Button variant="outline" onClick={handleClear} type="button">
            Clear
          </Button>
        )}
        <Button variant="primary" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
}
