import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
const OUTPUT_FILE = path.join(argv.outputDir as string, "abilities.json");

// Interface for ability data
interface AbilityData {
  id: number;
  name: string;
  description: string;
  flavor_text: string;
  pokemon_ids: number[];
}

/**
 * Process all ability files into a single abilities list
 */
async function processAllAbilities(): Promise<void> {
  console.log("Starting to process abilities...");

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
  const abilities: AbilityData[] = [];
  for (const file of files) {
    const abilityData: AbilityData = fs.readJsonSync(
      path.join(ABILITY_DIR, file)
    );
    abilities.push(abilityData);
  }

  // Save abilities data
  console.log(`Saving abilities data to ${OUTPUT_FILE}`);
  await fs.writeJson(OUTPUT_FILE, abilities, { spaces: 2 });
  console.log("Abilities processing completed!");
}

// Run the script
processAllAbilities().catch((error) => {
  console.error("Error processing abilities:", error);
  process.exit(1);
}); 