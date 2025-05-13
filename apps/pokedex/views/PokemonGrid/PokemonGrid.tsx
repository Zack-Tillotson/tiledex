'use client' 

import React, { useState, useEffect } from 'react';
import styles from './PokemonGrid.module.css';
import { 
  getPaginatedPokemon, 
  searchPokemon, 
  type Pokemon, 
  type PaginationData 
} from '@repo/pokeapi';
import { PokemonCard } from '@repo/ui/pokemon-card/pokemon-card';
import { PokemonFilterBar } from '../PokemonFilterBar/PokemonFilterBar';
import { PokemonFilterForm } from '../PokemonFilterForm/PokemonFilterForm';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface PokemonGridProps {
  initialPage?: number;
  initialFilters?: {
    mainType?: string;
    name?: string;
  };
}

export function PokemonGrid({ initialPage = 1, initialFilters = {} }: PokemonGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    pageSize: 50,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [filters, setFilters] = useState(initialFilters);
  const [showFilterForm, setShowFilterForm] = useState(false);

  // Apply filters and pagination
  useEffect(() => {
    const result = getPaginatedPokemon(initialPage, 50);
    let filteredPokemon = [...result.pokemon];
    let totalFilteredItems = result.pagination.totalItems;
    
    // Apply filters if any are active
    if (Object.values(filters).some(value => value)) {
      // Start with all Pokemon
      let allPokemon: Pokemon[] = [];
      
      // Apply name filter
      if (filters.name) {
        allPokemon = searchPokemon(filters.name);
      } else {
        // Get all Pokemon (we'll paginate later)
        for (let i = 1; i <= result.pagination.totalPages; i++) {
          const pageResult = getPaginatedPokemon(i, 20);
          allPokemon = [...allPokemon, ...pageResult.pokemon];
        }
      }
      
      // Apply type filter
      if (filters.mainType) {
        allPokemon = allPokemon.filter(p => p.types.includes(filters.mainType!));
      }
      
      // Update total count for pagination
      totalFilteredItems = allPokemon.length;
      
      // Apply pagination to filtered results
      const startIndex = (initialPage - 1) * 20;
      const endIndex = startIndex + 20;
      filteredPokemon = allPokemon.slice(startIndex, endIndex);
      
      // Update pagination data
      const totalPages = Math.ceil(totalFilteredItems / 20);
      setPagination({
        currentPage: initialPage,
        totalPages,
        totalItems: totalFilteredItems,
        pageSize: 20,
        hasNextPage: initialPage < totalPages,
        hasPreviousPage: initialPage > 1
      });
    } else {
      // No filters, use default pagination
      setPagination(result.pagination);
    }
    
    setPokemon(filteredPokemon);
  }, [initialPage, filters]);
  
  // Update URL with current filters and page
  useEffect(() => {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add page parameter
    if (pagination.currentPage > 1) {
      params.set('page', pagination.currentPage.toString());
    }
    
    // Add filter parameters
    if (filters.name) params.set('name', filters.name);
    if (filters.mainType) params.set('mainType', filters.mainType);
    
    // Update URL without causing a navigation (replace instead of push)
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl);
  }, [filters, pagination.currentPage, pathname, router]);
  
  // Handle filter changes
  const handleApplyFilters = (newFilters: typeof filters) => {
    // Reset to page 1 when applying new filters
    setFilters(newFilters);
    setShowFilterForm(false);
  };
  
  const handleClearFilter = (filterKey: keyof typeof filters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  };
  
  const handleClearAllFilters = () => {
    setFilters({});
  };
  
  // Helper function to build pagination URLs that preserve filter parameters
  const buildPaginationUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    // Add page parameter
    params.set('page', pageNumber.toString());
    
    // Add filter parameters
    if (filters.name) params.set('name', filters.name);
    if (filters.mainType) params.set('mainType', filters.mainType);
    
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={styles.container}>      
      {/* Filter Bar */}
      <PokemonFilterBar
        activeFilters={filters}
        onOpenFilterForm={() => setShowFilterForm(true)}
        onClearFilter={handleClearFilter}
        onClearAllFilters={handleClearAllFilters}
      />
      
      {/* Filter Form Modal */}
      {showFilterForm && (
        <div className={styles.modalOverlay} onClick={() => setShowFilterForm(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <PokemonFilterForm
              initialFilters={filters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFilterForm(false)}
            />
          </div>
        </div>
      )}
      
      {/* Results Count */}
      <div className={styles.resultsCount}>
        {pagination.totalItems} Pokémon found
      </div>
      
      <div className={styles.grid}>
        {pokemon.length > 0 ? (
          pokemon.map((poke: Pokemon) => (
            <PokemonCard 
              key={poke.id} 
              pokemon={poke} 
              linkPath={`/pokemon/${poke.id}`} 
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No Pokémon found matching your filters.</p>
            <button 
              className={styles.resetButton}
              onClick={handleClearAllFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      <div className={styles.pagination}>
        {pagination.hasPreviousPage ? (
          <Link 
            href={buildPaginationUrl(pagination.currentPage - 1)}
            className={styles.paginationButton}
          >
            Previous
          </Link>
        ) : (
          <span className={`${styles.paginationButton} ${styles.paginationButtonDisabled}`}>
            Previous
          </span>
        )}
        <span className={styles.paginationInfo}>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        {pagination.hasNextPage ? (
          <Link 
            href={buildPaginationUrl(pagination.currentPage + 1)}
            className={styles.paginationButton}
          >
            Next
          </Link>
        ) : (
          <span className={`${styles.paginationButton} ${styles.paginationButtonDisabled}`}>
            Next
          </span>
        )}
      </div>
    </div>
  );
}
