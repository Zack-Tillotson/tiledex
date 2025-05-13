import React from "react";

// Define Pokemon interface directly to avoid import issues
interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
    official_artwork?: string;
  };
  height: number;
  weight: number;
}

// Helper functions removed as they're no longer used in the compact view

// Type color mapping
const typeColors: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  linkPath?: string;
  onClick?: () => void;
}

// Inline styles to avoid CSS module issues
const getCardStyle = (isLink: boolean) => ({
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  margin: "0.5rem",
  padding: "0.75rem",
  cursor: isLink ? "pointer" : "default",
  textDecoration: "none",
  color: "inherit",
  ...(isLink && {
    ':hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
    }
  })
});

const imageContainerStyle = {
  flexShrink: 0,
  marginRight: "1rem"
};

const imageStyle = {
  width: "70px",
  height: "70px",
  objectFit: "contain" as const
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center"
};

const idStyle = {
  fontSize: "0.875rem",
  color: "#666",
  marginBottom: "0.25rem"
};

const nameStyle = {
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "capitalize" as const,
  marginBottom: "0.5rem",
  lineHeight: 1.2
};

const typesStyle = {
  display: "flex",
  gap: "0.5rem"
};

const typeStyle = (type: string) => ({
  padding: "0.2rem 0.6rem",
  borderRadius: "12px",
  fontSize: "0.75rem",
  textTransform: "capitalize" as const,
  color: "white",
  backgroundColor: typeColors[type] || "#777"
});

export function PokemonCard({ pokemon, className = "", linkPath, onClick }: PokemonCardProps): React.ReactElement {
  const isLink = !!linkPath || !!onClick;
  const cardStyle = getCardStyle(isLink);
  
  const content = (
    <>
      <div style={imageContainerStyle}>
        <img 
          src={pokemon.sprites.official_artwork || pokemon.sprites.front_default}
          alt={`${pokemon.name} image`}
          style={imageStyle}
        />
      </div>
      <div style={contentStyle}>
        <div style={idStyle}>#{pokemon.id.toString().padStart(3, '0')}</div>
        <h3 style={nameStyle}>{pokemon.name}</h3>
        <div style={typesStyle}>
          {pokemon.types.map((type: string) => (
            <span key={type} style={typeStyle(type)}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (linkPath) {
    return (
      <a href={linkPath} style={cardStyle} className={className}>
        {content}
      </a>
    );
  } else if (onClick) {
    return (
      <div 
        style={cardStyle} 
        className={className} 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {content}
      </div>
    );
  } else {
    return (
      <div style={cardStyle} className={className}>
        {content}
      </div>
    );
  }
}
