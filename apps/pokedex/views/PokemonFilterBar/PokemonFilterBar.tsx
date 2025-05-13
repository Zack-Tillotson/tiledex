'use client'

import React, { useState, useEffect } from 'react';
import styles from './PokemonFilterBar.module.css';

interface FilterValues {
  mainType?: string;
  name?: string;
}

interface PokemonFilterBarProps {
  activeFilters: FilterValues;
  onOpenFilterForm: () => void;
  onClearFilter: (filterKey: keyof FilterValues) => void;
  onClearAllFilters: () => void;
}

export function PokemonFilterBar({
  activeFilters,
  onOpenFilterForm,
  onClearFilter,
  onClearAllFilters
}: PokemonFilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some(value => value);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile and track scroll position
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Track scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Show after scrolling 100px
    };
    
    // Initial checks
    checkMobile();
    handleScroll();
    
    // Add event listeners
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Format filter value for display (capitalize first letter)
  const formatFilterValue = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  return (
    <div className={`
      ${styles.filterBar} 
      ${isMobile && isScrolled ? styles.filterBarFixed : ''}
    `}>
      <button 
        className={styles.filterButton}
        onClick={onOpenFilterForm}
      >
        <svg className={styles.filterIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
        Filter
      </button>
      
      {hasActiveFilters && (
        <>
          <div className={styles.activeFilters}>
            {activeFilters.name && (
              <div className={styles.filterTag}>
                <span className={styles.filterLabel}>Name:</span>
                <span className={styles.filterValue}>{activeFilters.name.length > 10 ? `${activeFilters.name.substring(0, 10)}...` : activeFilters.name}</span>
                <button 
                  className={styles.clearFilterButton}
                  onClick={() => onClearFilter('name')}
                  aria-label="Clear name filter"
                >
                  ×
                </button>
              </div>
            )}
            
            {activeFilters.mainType && (
              <div className={styles.filterTag}>
                <span className={styles.filterLabel}>Type:</span>
                <span className={styles.filterValue}>{formatFilterValue(activeFilters.mainType)}</span>
                <button 
                  className={styles.clearFilterButton}
                  onClick={() => onClearFilter('mainType')}
                  aria-label="Clear main type filter"
                >
                  ×
                </button>
              </div>
            )}
            

          </div>
          
          <button 
            className={styles.clearAllButton}
            onClick={onClearAllFilters}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
}
