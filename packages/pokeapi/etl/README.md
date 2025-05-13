# PokeAPI ETL Process

This directory contains scripts to fetch and process data from the [PokeAPI](https://pokeapi.co/) website.

## Scripts

### `fetchPokemonData.ts`

Fetches Pokemon data from the PokeAPI and saves it as individual JSON files in the `pokemon` directory.

```bash
# Fetch with default range (1-151)
pnpm fetch-data

# Fetch with custom range
pnpm fetch-data:range 1 25
```

### `processPokemonData.ts`

Processes the individual Pokemon JSON files and combines them into a single JSON file that can be used by the package.

```bash
pnpm process-data
```

### Running the Full ETL Process

To run both scripts in sequence, use:

```bash
# Run with default range (1-151)
pnpm etl

# Run with custom range
pnpm etl:range 1 25
```

## Configuration

### Command Line Parameters

The ETL scripts accept the following command line parameters:

- `--start`: The starting Pokemon ID (default: 1)
- `--end`: The ending Pokemon ID (default: 151, which is the first generation)

### Other Configuration

You can modify the following configuration variables in the scripts:

- `DELAY_MS`: The delay between API requests to avoid rate limiting (default: 100ms)

## Output

The ETL process produces the following outputs:

1. Individual Pokemon JSON files in the `pokemon` directory
2. A combined JSON file at `src/data/pokemon.json` that is used by the package

## Notes

- The PokeAPI has rate limits, so be mindful when increasing the number of Pokemon to fetch
- The ETL process should be run whenever you want to update the Pokemon data
- The processed data is not included in the Git repository and needs to be generated
