import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders as a link when linkComponent is provided', () => {
    const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href} data-testid="link">{children}</a>
    );
    
    render(
      <Card linkComponent={Link} href="/test">
        Link Content
      </Card>
    );
    
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link Content');
  });

  it('is keyboard accessible when interactive', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Interactive</Card>);
    
    const card = screen.getByText('Interactive');
    expect(card).toHaveAttribute('tabIndex', '0');
    
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
}); 