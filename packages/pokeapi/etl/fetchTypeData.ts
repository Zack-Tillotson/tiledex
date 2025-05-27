import axios from "axios";
import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// List of all Pokémon types
const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

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
const API_BASE_URL = "https://pokeapi.co/api/v2";
const TYPE_ENDPOINT = "/type";
const OUTPUT_FILE = path.join(argv.outputDir as string, "types.json");
const DELAY_MS = 100; // Delay between requests to avoid rate limiting

// Ensure the output directory exists
fs.ensureDirSync(path.dirname(OUTPUT_FILE));

// Type definitions
interface TypeResponse {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
  };
}

interface ProcessedTypeData {
  id: number;
  name: string;
  superEffectiveAgainst: string[];
  notVeryEffectiveAgainst: string[];
  noEffectAgainst: string[];
  weakTo: string[];
  resistantTo: string[];
  immuneTo: string[];
}

/**
 * Fetches data for a single Pokémon type by name
 */
async function fetchType(name: string): Promise<TypeResponse | null> {
  try {
    const url = `${API_BASE_URL}${TYPE_ENDPOINT}/${name}`;
    console.log(`Fetching type data for ${name} from ${url}`);

    // For development purposes only - disable certificate validation
    // In production, you should use proper certificate validation
    const response = await axios.get<TypeResponse>(url, {
      httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching type ${name}: ${error.message}`);
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
      }
    } else {
      console.error(`Unknown error fetching type ${name}:`, error);
    }
    return null;
  }
}

/**
 * Process a single type's raw data into a more usable format
 */
function processType(rawData: TypeResponse): ProcessedTypeData {
  return {
    id: rawData.id,
    name: rawData.name,
    // Types that this type is super effective against (double damage to)
    superEffectiveAgainst: rawData.damage_relations.double_damage_to.map(
      (t) => t.name,
    ),
    // Types that this type is not very effective against (half damage to)
    notVeryEffectiveAgainst: rawData.damage_relations.half_damage_to.map(
      (t) => t.name,
    ),
    // Types that this type has no effect against (no damage to)
    noEffectAgainst: rawData.damage_relations.no_damage_to.map((t) => t.name),
    // Types that this type is weak to (double damage from)
    weakTo: rawData.damage_relations.double_damage_from.map((t) => t.name),
    // Types that this type is resistant to (half damage from)
    resistantTo: rawData.damage_relations.half_damage_from.map((t) => t.name),
    // Types that this type is immune to (no damage from)
    immuneTo: rawData.damage_relations.no_damage_from.map((t) => t.name),
  };
}

/**
 * Sleep function to add delay between API requests
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main function to fetch all type data
 */
async function fetchAllTypes(): Promise<void> {
  console.log(
    `Starting to fetch data for ${POKEMON_TYPES.length} Pokémon types...`,
  );
  console.log(`Data will be saved to ${OUTPUT_FILE}`);

  let successCount = 0;
  let errorCount = 0;
  const processedTypes: ProcessedTypeData[] = [];

  for (const typeName of POKEMON_TYPES) {
    const typeData = await fetchType(typeName);

    if (typeData) {
      const processedType = processType(typeData);
      processedTypes.push(processedType);
      successCount++;
      console.log(`Processed type: ${typeName}`);
    } else {
      errorCount++;
      console.error(`Failed to process type: ${typeName}`);
    }

    // Add a small delay to avoid hitting rate limits
    await sleep(DELAY_MS);
  }

  // Save the processed data
  fs.writeJsonSync(OUTPUT_FILE, processedTypes, { spaces: 2 });
  console.log(`Processed data saved to ${OUTPUT_FILE}`);

  console.log("\nFetch process completed!");
  console.log(`Successfully fetched: ${successCount} types`);
  console.log(`Errors: ${errorCount}`);
}

// Run the main function
fetchAllTypes()
  .then(() => {
    console.log("Type data fetch and processing completed successfully!");
  })
  .catch((error) => {
    console.error("Error in main process:", error);
    process.exit(1);
  });
