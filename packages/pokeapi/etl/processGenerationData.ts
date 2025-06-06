import fs from "fs";
import path from "path";

interface GenerationData {
  id: number;
  name: string;
  region: string;
  pokemon: number[];
}

interface ProcessedGenerationData {
  generations: GenerationData[];
}

// Helper to build a name->id map from the etl/pokemon folder
function buildPokemonNameToIdMap(pokemonDir: string): Record<string, number> {
  const nameToId: Record<string, number> = {};
  const files = fs.readdirSync(pokemonDir);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(pokemonDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (data.name && data.id) {
        nameToId[data.name] = data.id;
      }
    }
  }
  return nameToId;
}

async function processGenerationData(
  inputDir: string,
  outputFile: string
): Promise<void> {
  const generationsDir = path.join(inputDir, "generations");
  const pokemonDir = path.join(inputDir, "pokemon");
  const generations: GenerationData[] = [];

  // Build name->id map
  const nameToId = buildPokemonNameToIdMap(pokemonDir);

  // Read all generation files
  const files = fs.readdirSync(generationsDir);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(generationsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      // Map pokemon names to IDs, filter out any not found
      const pokemonIds = (data.pokemon as string[])
        .map((name) => nameToId[name])
        .filter((id): id is number => typeof id === "number");
      generations.push({
        id: data.id,
        name: data.name,
        region: data.region,
        pokemon: pokemonIds,
      });
    }
  }

  // Sort generations by ID
  generations.sort((a, b) => a.id - b.id);

  // Create the combined data object
  const combinedData: ProcessedGenerationData = {
    generations,
  };

  // Write the combined data to the output file
  fs.writeFileSync(outputFile, JSON.stringify(combinedData, null, 2));
  console.log(`Processed ${generations.length} generations into ${outputFile}`);
}

// Allow running from command line
if (require.main === module) {
  const inputDir = process.argv[2] || path.join(__dirname, "../etl");
  const outputFile = process.argv[3] || path.join(__dirname, "../src/data/generations.json");

  processGenerationData(inputDir, outputFile).catch(console.error);
}

export { processGenerationData }; 