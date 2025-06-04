# Tiledex - A Modern Pokédex Application

A modern, performant Pokédex application built with Next.js and TypeScript, featuring a tile-based interface for exploring Pokémon.

## Features

- 🎮 Interactive tile-based Pokémon exploration
- ⚡ Fast and responsive UI with Next.js App Router
- 🎨 Modern, component-based architecture with reusable UI components
- 📱 Fully responsive design that works on all devices
- 🔍 Local PokeAPI data for blazing-fast performance
- 🌐 Server-side rendering for optimal performance

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS Modules with design tokens
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Monorepo Tools**: [Turborepo](https://turborepo.org/)
- **Hosting**: Firebase Hosting
- **Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript for static type checking

## Project Structure

The project is organized as a monorepo with the following structure:

### Apps
- `web`: The main Next.js application (Pokédex interface)

### Packages
- `@repo/ui`: Shared React component library
- `@repo/pokeapi`: Static PokeAPI data package
- `@repo/types`: Shared TypeScript types
- `@repo/pokedex`: Core Pokédex functionality
- `@repo/eslint-config`: Shared ESLint configuration
- `@repo/typescript-config`: Shared TypeScript configuration

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd tiledex
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

### Development

Run the development server:
```sh
pnpm dev
```

The application will be available at [http://localhost:3042](http://localhost:3042)

### Building

Build all packages and applications:
```sh
pnpm build
```

### Deployment

Deploy to Firebase Hosting:
```sh
pnpm deploy
```

## Development Guidelines

- Follow the component architecture guidelines:
  - Atomic components in `@repo/ui`
  - UI components for presentation
  - View components for business logic
  - Custom hooks for reusable logic
- Use CSS Modules for styling
- Write unit tests for all components and hooks
- Follow the Prettier code style
- Ensure type safety with TypeScript

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and type checking:
   ```sh
   pnpm lint
   pnpm check-types
   ```
4. Create a pull request

## License

This project is proprietary and confidential.
