import axios from "axios";
import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Parse command line arguments using yargs
const argv = yargs(hideBin(process.argv))
  .options({
    rangeStart: {
      type: "number",
      description: "Starting Evolution Chain ID",
      default: 1,
    },
    rangeEnd: {
      type: "number",
      description: "Ending Evolution Chain ID",
      default: 30, // Covers most of Gen 1 Pokémon evolution chains
    },
  })
  .help()
  .alias("help", "h")
  .parseSync();

// Get command line arguments
const { rangeStart, rangeEnd } = argv;

console.log(`Using range: ${rangeStart} to ${rangeEnd}`);

// Configuration
const API_BASE_URL = "https://pokeapi.co/api/v2";
const EVOLUTION_CHAIN_ENDPOINT = "/evolution-chain";
const OUTPUT_DIR = path.join(__dirname, "evolution");
const DELAY_MS = 100; // Delay between requests to avoid rate limiting

// Ensure the output directory exists
fs.ensureDirSync(OUTPUT_DIR);

// Interface for evolution chain response
interface EvolutionChainResponse {
  id: number;
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolution_details: any[];
    evolves_to: any[];
  };
}

/**
 * Fetches data for a single evolution chain by ID
 */
async function fetchEvolutionChain(
  id: number,
): Promise<EvolutionChainResponse | null> {
  try {
    const url = `${API_BASE_URL}${EVOLUTION_CHAIN_ENDPOINT}/${id}`;
    console.log(`Fetching Evolution Chain #${id} from ${url}`);

    // For development purposes only - disable certificate validation
    // In production, you should use proper certificate validation
    const response = await axios.get<EvolutionChainResponse>(url, {
      httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching Evolution Chain #${id}: ${error.message}`);
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
      }
    } else {
      console.error(`Unknown error fetching Evolution Chain #${id}:`, error);
    }
    return null;
  }
}

/**
 * Saves evolution chain data to a JSON file
 */
function saveEvolutionData(evolutionChain: EvolutionChainResponse): void {
  const filePath = path.join(OUTPUT_DIR, `${evolutionChain.id}.json`);
  fs.writeJsonSync(filePath, evolutionChain, { spaces: 2 });
  console.log(`Saved Evolution Chain #${evolutionChain.id} to ${filePath}`);
}

/**
 * Sleep function to add delay between API requests
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main function to fetch all evolution chain data
 */
async function fetchAllEvolutionChains(): Promise<void> {
  console.log(
    `Starting to fetch data for Evolution Chains from ID ${rangeStart} to ${rangeEnd}...`,
  );
  console.log(`Data will be saved to ${OUTPUT_DIR}`);

  let successCount = 0;
  let errorCount = 0;

  for (let id = rangeStart; id <= rangeEnd; id++) {
    const evolutionChain = await fetchEvolutionChain(id);

    if (evolutionChain) {
      saveEvolutionData(evolutionChain);
      successCount++;
    } else {
      errorCount++;
    }

    // Add a small delay to avoid hitting rate limits
    await sleep(DELAY_MS);
  }

  console.log("\nFetch process completed!");
  console.log(`Successfully fetched: ${successCount} Evolution Chains`);
  console.log(`Errors: ${errorCount}`);
}

// Run the main function
fetchAllEvolutionChains()
  .then(() => {
    console.log("Evolution chain data fetch completed successfully!");
  })
  .catch((error) => {
    console.error("Error in main process:", error);
    process.exit(1);
  });
