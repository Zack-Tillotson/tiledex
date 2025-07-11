# TiledEx

A monorepo for Pokémon-related applications and packages.

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Setup

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Building

```bash
pnpm build
```

### Cleaning Build Artifacts

The project includes several clean commands to remove build artifacts:

- `pnpm clean` - Removes build artifacts from all packages and apps (dist, .next, out directories)
- `pnpm clean:cache` - Removes Turbo cache only
- `pnpm clean:all` - Removes all build artifacts, cache, and node_modules (full clean)

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm check-types
```

## Project Structure

- `apps/web` - Next.js web application
- `packages/adventure` - Adventure game package
- `packages/pokedex` - Pokédex package
- `packages/ui` - Shared UI components
- `packages/types` - Shared TypeScript types
- `packages/pokeapi` - Pokémon API utilities
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration
