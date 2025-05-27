import { create } from "zustand";
import { searchPokemon, type Pokemon } from "@repo/pokeapi";

interface SearchState {
  // State
  searchTerm: string;
  searchResults: Pokemon[];
  isSearching: boolean;

  // Actions
  setSearchTerm: (term: string) => void;
  performSearch: (term: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  searchTerm: "",
  searchResults: [],
  isSearching: false,

  // Actions
  setSearchTerm: (term: string) => set({ searchTerm: term }),

  performSearch: (term: string) => {
    // Update state to indicate search is in progress
    set({ isSearching: true, searchTerm: term });

    // Perform the search
    try {
      const results = term ? searchPokemon(term) : [];
      set({
        searchResults: results,
        isSearching: false,
      });
    } catch (error) {
      console.error("Error searching for Pokémon:", error);
      set({
        searchResults: [],
        isSearching: false,
      });
    }
  },

  clearSearch: () =>
    set({
      searchTerm: "",
      searchResults: [],
    }),
}));
