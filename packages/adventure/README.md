# @repo/adventure

This package contains Adventure-specific domain knowledge and utilities. It serves as a central repository for Adventure-related constants, types, and helper functions that are used across the application.

## Purpose

The package aims to:
1. Centralize Adventure-specific domain knowledge
2. Provide type-safe access to Adventure data structures
3. Ensure consistency in Adventure-related data across the application
4. Reduce duplication of Adventure-specific logic

## Contents

## Development

### Directory Structure
```
src/
  ├── components/        # React components
  ├── views/            # Page-level components
  ├── constants/        # Package constants
  ├── types/           # TypeScript types and interfaces
  └── hooks/           # React hooks
```

### Adding New Features

1. Place new features in appropriate directories
2. Include comprehensive tests
3. Update type definitions
4. Document usage in this README
5. Export views from package.json

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## Contributing

When adding new Adventure-related features:
1. Consider if it belongs in this package
2. Ensure type safety
3. Add comprehensive tests
4. Update documentation
5. Follow existing patterns
