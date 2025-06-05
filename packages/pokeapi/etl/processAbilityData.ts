import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Pokemon, PokemonAbility } from "@repo/types";

// Parse command line arguments using yargs
const argv = yargs(hideBin(process.argv))
  .options({
    outputDir: {
      type: "string",
      description: "Output directory for processed data",
      default: path.join(__dirname, "..", "src", "data"),
    },
  })
  .help()
  .alias("help", "h")
  .parseSync();

// Configuration
const ABILITY_DIR = path.join(__dirname, "ability");
const POKEMON_FILE = path.join(argv.outputDir as string, "pokemon.json");
const OUTPUT_FILE = path.join(argv.outputDir as string, "pokemon.json");

// Interface for ability data
interface AbilityData {
  id: number;
  name: string;
  description: string;
  flavor_text: string;
  pokemon_ids: number[];
}

// Extended Pokemon ability interface with description and flavor text
interface ExtendedPokemonAbility extends PokemonAbility {
  description: string;
  flavor_text: string;
}

/**
 * Process a single ability file
 */
function processAbilityFile(abilityData: AbilityData): AbilityData {
  return {
    id: abilityData.id,
    name: abilityData.name,
    description: abilityData.description,
    flavor_text: abilityData.flavor_text,
    pokemon_ids: abilityData.pokemon_ids,
  };
}

/**
 * Main function to process all ability data
 */
async function processAllAbilityData(): Promise<void> {
  console.log("Starting to process ability data...");

  // Load Pokemon data
  if (!fs.existsSync(POKEMON_FILE)) {
    console.error(`Pokemon data file not found: ${POKEMON_FILE}`);
    console.error("Please run the Pokemon data ETL process first");
    process.exit(1);
  }

  const pokemonData: Pokemon[] = fs.readJsonSync(POKEMON_FILE);
  console.log(`Loaded ${pokemonData.length} Pokemon from ${POKEMON_FILE}`);

  // Get all ability files
  if (!fs.existsSync(ABILITY_DIR)) {
    console.error(`Ability data directory not found: ${ABILITY_DIR}`);
    console.error("Please run the ability data ETL process first");
    process.exit(1);
  }

  const files = fs
    .readdirSync(ABILITY_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => {
      const idA = parseInt(a.split(".")[0] || "0");
      const idB = parseInt(b.split(".")[0] || "0");
      return idA - idB;
    });

  console.log(`Found ${files.length} ability files to process`);

  // Process each ability file
  for (const file of files) {
    const abilityData: AbilityData = fs.readJsonSync(
      path.join(ABILITY_DIR, file)
    );
    const processedAbility = processAbilityFile(abilityData);

    // Update Pokemon data with ability information
    for (const pokemonId of processedAbility.pokemon_ids) {
      const pokemon = pokemonData.find((p) => p.id === pokemonId);
      if (pokemon) {
        // Find the ability in the Pokemon's abilities array
        const abilityIndex = pokemon.abilities.findIndex(
          (a) => a.name === processedAbility.name
        );

        if (abilityIndex !== -1) {
          // Update the ability with description and flavor text
          const updatedAbility: ExtendedPokemonAbility = {
            ...pokemon.abilities[abilityIndex],
            description: processedAbility.description,
            flavor_text: processedAbility.flavor_text,
          };
          pokemon.abilities[abilityIndex] = updatedAbility;
        }
      }
    }
  }

  // Save updated Pokemon data
  console.log(`Saving updated Pokemon data to ${OUTPUT_FILE}`);
  await fs.writeJson(OUTPUT_FILE, pokemonData, { spaces: 2 });
  console.log("Ability data processing completed!");
}

// Run the script
processAllAbilityData().catch((error) => {
  console.error("Error processing ability data:", error);
  process.exit(1);
}); 