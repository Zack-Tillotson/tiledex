import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { PokemonResponse as PokemonRaw, ProcessedPokemon } from "./types";

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
const INPUT_DIR = path.join(__dirname, "pokemon");
const OUTPUT_FILE = path.join(argv.outputDir as string, "pokemon.json");

// Image paths configuration
const IMAGE_BASE_PATH = "/images"; // Base path for local images in the public directory

/**
 * Generate a local image path for a Pokemon sprite
 */
function getLocalImagePath(id: number, spriteType: string): string {
  return `${IMAGE_BASE_PATH}/${spriteType}/${id}.png`;
}

/**
 * Process a single Pokemon's raw data into a more usable format
 */
function processPokemon(rawData: PokemonRaw): ProcessedPokemon {
  const id = rawData.id;

  // Create sprites object with local image paths
  const sprites = {
    front_default: `${IMAGE_BASE_PATH}/front_default/${id}.png`,
    back_default: `${IMAGE_BASE_PATH}/back_default/${id}.png`,
    front_shiny: `${IMAGE_BASE_PATH}/front_shiny/${id}.png`,
    back_shiny: `${IMAGE_BASE_PATH}/back_shiny/${id}.png`,
    official_artwork: `${IMAGE_BASE_PATH}/official_artwork/${id}.png`,
  };

  return {
    id,
    name: rawData.name,
    types: rawData.types.map((t) => t.type.name),
    sprites,
    stats: rawData.stats.map((s) => ({
      name: s.stat.name,
      base_stat: s.base_stat,
    })),
    height: rawData.height,
    weight: rawData.weight,
    abilities: rawData.abilities.map((a) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
    })),
    species: rawData.species.name,
  };
}

/**
 * Main function to process all Pokemon data
 */
async function processAllPokemon(): Promise<void> {
  console.log("Starting to process Pokemon data...");
  console.log("Using local image paths...");

  // Ensure the output directory exists
  fs.ensureDirSync(path.dirname(OUTPUT_FILE));

  // Get all JSON files in the input directory
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => {
      const idA = parseInt(a.split(".")[0] || "0");
      const idB = parseInt(b.split(".")[0] || "0");
      return idA - idB;
    });

  console.log(`Found ${files.length} Pokemon files to process`);

  // Process each file
  const processedPokemon: ProcessedPokemon[] = [];

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const rawData = fs.readJsonSync(filePath) as PokemonRaw;
    const processed = processPokemon(rawData);
    processedPokemon.push(processed);
  }

  // Save the processed data
  fs.writeJsonSync(OUTPUT_FILE, processedPokemon, { spaces: 2 });
  console.log(`Processed data saved to ${OUTPUT_FILE}`);
}

// Run the main function
processAllPokemon()
  .then(() => {
    console.log("Pokemon data processing completed successfully!");
  })
  .catch((error) => {
    console.error("Error in processing:", error);
    process.exit(1);
  });
