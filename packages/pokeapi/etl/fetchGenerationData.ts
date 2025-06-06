// Disable SSL certificate validation for local development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

interface GenerationData {
  id: number;
  name: string;
  region: string;
  pokemon: string[];
}

interface PokeAPIGeneration {
  id: number;
  name: string;
  main_region: {
    name: string;
  };
  pokemon_species: Array<{
    name: string;
  }>;
}

async function fetchGenerationData(
  outputDir: string,
  startId: number = 1,
  endId: number = 9
): Promise<void> {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let id = startId; id <= endId; id++) {
    try {
      console.log(`Fetching generation ${id}...`);
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const generation = await response.json() as PokeAPIGeneration;

      const simplifiedData: GenerationData = {
        id: generation.id,
        name: generation.name,
        region: generation.main_region.name,
        pokemon: generation.pokemon_species.map((p) => p.name),
      };

      const outputPath = path.join(outputDir, `${id}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(simplifiedData, null, 2));
      console.log(`Saved generation ${id} to ${outputPath}`);
    } catch (error) {
      console.error(`Error fetching generation ${id}:`, error);
    }
  }
}

// Allow running from command line
if (require.main === module) {
  const outputDir = process.argv[2] || path.join(__dirname, "./generations");
  const startId = parseInt(process.argv[3] || "1", 10);
  const endId = parseInt(process.argv[4] || "9", 10);

  fetchGenerationData(outputDir, startId, endId).catch(console.error);
}

export { fetchGenerationData }; 