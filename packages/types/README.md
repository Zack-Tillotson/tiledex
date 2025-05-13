# @repo/types

This package contains shared TypeScript types and interfaces used across the Pokedex monorepo.

## Purpose

The types package centralizes type definitions that are shared between multiple packages and applications. This ensures type consistency across the project and makes it easier to maintain and update shared types.

## Usage

Import types from this package in other packages and applications:

```typescript
// Import specific types
import { Pokemon, PokemonType } from '@repo/types';

// Or import from a specific category
import { Pokemon, PokemonType } from '@repo/types/pokemon';
```

## Structure

- `src/pokemon/` - Pokemon-related types and interfaces
  - `models.ts` - Core Pokemon data models
  - `index.ts` - Re-exports all Pokemon types

## Adding New Types

When adding new shared types to the project, add them to this package instead of defining them in individual packages or applications. This ensures type consistency across the monorepo.

Follow these guidelines:
1. Group related types in appropriate subdirectories
2. Use descriptive names and add JSDoc comments
3. Create index files that re-export types for easier imports
4. Keep type definitions clean with minimal dependencies
