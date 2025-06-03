# @repo/pokedex

This package contains Pokemon-specific domain knowledge and utilities. It serves as a central repository for Pokemon-related constants, types, and helper functions that are used across the application.

## Purpose

The package aims to:
1. Centralize Pokemon-specific domain knowledge
2. Provide type-safe access to Pokemon data structures
3. Ensure consistency in Pokemon-related data across the application
4. Reduce duplication of Pokemon-specific logic

## Contents

### Components
- `PokemonCard` - Card component for displaying Pokemon summary
- `PokemonGrid` - Grid layout for Pokemon cards
- `PokemonType` - Type badge with color and hover effects
- `PokemonDetail` - Detailed Pokemon information display
- `PokemonEvolution` - Evolution chain visualization
- `TypeCard` - Card component for type information
- `TypesGrid` - Grid layout for type cards

### Views
- `GenerationGrid` - Display Pokemon by generation
- `PokemonDetail` - Full Pokemon details page
- `PokemonGrid` - Filterable Pokemon grid
- `PokemonType` - Type-specific Pokemon listing
- `SearchForm` - Pokemon search interface
- `SearchView` - Search results display
- `TypesView` - Type overview and relationships

### Constants
- Pokemon types and their relationships
- Type-specific environments and characteristics
- Generation-specific data

### Types
- TypeScript definitions for Pokemon data structures
- Type guards and validation utilities
- Shared interfaces and types

## Usage

Install the package in your workspace:

```json
{
  "dependencies": {
    "@repo/pokedex": "workspace:*"
  }
}
```

Import components and utilities:

```typescript
import {
  PokemonCard,
  PokemonGrid,
  PokemonType,
  TypesView,
  isPokemonType,
  getTypeEnvironment
} from "@repo/pokedex";

// Use components
function MyComponent() {
  return (
    <PokemonGrid>
      <PokemonCard id={1} name="Bulbasaur" types={["grass", "poison"]} />
    </PokemonGrid>
  );
}

// Use utilities
const environment = getTypeEnvironment("water"); // "aquatic and coastal"
```

## Development

### Directory Structure
```
src/
  ├── components/        # React components
  ├── views/            # Page-level components
  ├── constants/        # Pokemon-specific constants
  ├── types/           # TypeScript types and interfaces
  └── hooks/           # React hooks
```

### Adding New Features

1. Place new features in appropriate directories
2. Include comprehensive tests
3. Update type definitions
4. Document usage in this README
5. Export from main index.ts

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## Contributing

When adding new Pokemon-related features:
1. Consider if it belongs in this package
2. Ensure type safety
3. Add comprehensive tests
4. Update documentation
5. Follow existing patterns
