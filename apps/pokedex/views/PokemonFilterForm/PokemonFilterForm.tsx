'use client'

import React, { useState } from 'react';
import styles from './PokemonFilterForm.module.css';

// Define Pokemon types for the filter
const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

interface PokemonFilterFormProps {
  initialFilters?: {
    mainType?: string;
    name?: string;
  };
  onApplyFilters: (filters: { mainType?: string; name?: string }) => void;
  onClose: () => void;
}

export function PokemonFilterForm({ 
  initialFilters = {}, 
  onApplyFilters, 
  onClose 
}: PokemonFilterFormProps) {
  const [mainType, setMainType] = useState<string>(initialFilters.mainType || '');
  const [name, setName] = useState<string>(initialFilters.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters = {
      ...(mainType ? { mainType } : {}),
      ...(name ? { name } : {})
    };
    
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setMainType('');
    setName('');
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Filter Pokémon</h2>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close filter form"
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Pokémon name"
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="mainType" className={styles.label}>Main Type</label>
          <select
            id="mainType"
            value={mainType}
            onChange={(e) => setMainType(e.target.value)}
            className={styles.select}
          >
            <option value="">Any Type</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
        

        
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={handleReset} 
            className={styles.resetButton}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className={styles.applyButton}
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}
