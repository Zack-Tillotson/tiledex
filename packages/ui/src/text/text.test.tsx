import { render, screen } from '@testing-library/react';
import { Text } from './text';

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Test Content</Text>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Text variant="body">Body Text</Text>);
    expect(screen.getByText('Body Text')).toHaveClass('body');

    rerender(<Text variant="caption">Caption Text</Text>);
    expect(screen.getByText('Caption Text')).toHaveClass('caption');

    rerender(<Text variant="label">Label Text</Text>);
    expect(screen.getByText('Label Text')).toHaveClass('label');

    rerender(<Text variant="small">Small Text</Text>);
    expect(screen.getByText('Small Text')).toHaveClass('small');

    rerender(<Text variant="lead">Lead Text</Text>);
    expect(screen.getByText('Lead Text')).toHaveClass('lead');
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Text as="span">Span Text</Text>);
    expect(screen.getByText('Span Text').tagName).toBe('SPAN');

    rerender(<Text as="div">Div Text</Text>);
    expect(screen.getByText('Div Text').tagName).toBe('DIV');

    rerender(<Text as="label">Label Text</Text>);
    expect(screen.getByText('Label Text').tagName).toBe('LABEL');
  });
}); 