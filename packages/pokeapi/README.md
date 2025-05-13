# PokeAPI Package

This package contains static data from the [PokeAPI](https://pokeapi.co/) website for use in the Pokedex application.

## Usage

```typescript
import { getPokemon, searchPokemon } from "@repo/pokeapi";

// Get a specific Pokemon by ID
const pikachu = getPokemon(25);

// Search for Pokemon by name
const results = searchPokemon("char");
```

## Data Structure

The package provides TypeScript interfaces for Pokemon data and utility functions to access and search the data.

## Development

To update the data in this package:
1. Run the data fetching scripts (to be implemented)
2. Build the package
3. Use the updated data in your application
