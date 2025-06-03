# @pokedex/ui

This package contains atomic UI components intended for generic use-cases across the Pokedex application.

## Guidelines

- Components should be generic and reusable
- Each component should have its own styles
- Components should be thoroughly tested
- Components should be properly documented with JSDoc
- Styles should use design tokens from our theme

## Component Categories

### Layout Components
- `Card` - Container component with consistent padding and elevation
- `Grid` - Flexible grid layout component

### Typography Components
- `Text` - Text component with variants for different use cases
- `Header` - Header component with different levels (h1-h6)

### Interactive Components
- `Button` - Button component with various styles and states
- `Input` - Input component with validation and states
- `Link` - Link component with consistent styling

## Usage

```tsx
import { Card, Text, Button } from "@pokedex/ui";

function MyComponent() {
  return (
    <Card>
      <Text variant="body">Hello World</Text>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
```

## Development

1. Each component should be in its own directory with:
   - Component file (e.g., `button.tsx`)
   - Styles file (e.g., `button.module.css`)
   - Test file (e.g., `button.test.tsx`)
   - Index file for exports

2. Use design tokens for consistency:
   ```css
   .button {
     padding: var(--spacing-2);
     color: var(--color-text);
     background: var(--color-background);
   }
   ```

3. Document props with JSDoc:
   ```tsx
   /**
    * Button component with various styles and states
    * @param variant - The visual style of the button
    * @param size - The size of the button
    * @param children - The content to render inside the button
    */
   ``` 