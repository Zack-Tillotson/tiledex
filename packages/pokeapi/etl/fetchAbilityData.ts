/// <reference types="node" />
import fs from 'fs';
import path from 'path';
import url from 'url';
import { EtlArgs } from './types';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import https from 'https';

interface AbilityResponse {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
    is_hidden: boolean;
  }[];
}

interface ProcessedAbility {
  id: number;
  name: string;
  description: string;
  flavor_text: string;
  pokemon_ids: number[];
}

interface AbilityArgs extends EtlArgs {
  refresh?: boolean;
  abilityName?: string;
}

const POKEMON_DATA_DIR = path.join(process.cwd(), 'data', 'pokemon');
const ABILITY_DATA_DIR = path.join(process.cwd(), 'data', 'abilities');

async function fetchAbilityData(abilityName: string): Promise<ProcessedAbility> {
  const apiUrl = `https://pokeapi.co/api/v2/ability/${abilityName}`;
  
  return new Promise((resolve, reject) => {
    const options = {
      rejectUnauthorized: false // Ignore SSL certificate errors
    };

    https.get(apiUrl, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData: AbilityResponse = JSON.parse(data);
          // Get English effect entry
          const effectEntry = parsedData.effect_entries.find(
            (entry) => entry.language.name === "en"
          );

          // Get English flavor text from the latest version group
          const flavorTextEntry = parsedData.flavor_text_entries
            .filter((entry) => entry.language.name === "en")
            .sort((a, b) => {
              // Sort by version group name to get the latest
              return b.version_group.name.localeCompare(a.version_group.name);
            })[0];

          // Extract Pokemon IDs from the API response
          const pokemon_ids = parsedData.pokemon.map(p => {
            const urlParts = p.pokemon.url.split('/');
            const idStr = urlParts[urlParts.length - 2];
            if (!idStr) throw new Error(`Invalid Pokemon URL: ${p.pokemon.url}`);
            return parseInt(idStr, 10);
          });

          resolve({
            id: parsedData.id,
            name: parsedData.name,
            description: effectEntry?.effect || "",
            flavor_text: flavorTextEntry?.flavor_text || "",
            pokemon_ids,
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function processPokemonAbilities(
  pokemonDir: string,
  abilityDir: string,
  args: AbilityArgs
): Promise<void> {
  // Create ability directory if it doesn't exist
  await fs.promises.mkdir(abilityDir, { recursive: true });

  // Read all pokemon files
  const pokemonFiles = await fs.promises.readdir(pokemonDir);
  // Map ability name to set of pokemon IDs
  const abilityToPokemonIds: Record<string, Set<number>> = {};

  // Filter files by range if specified
  const filteredFiles = pokemonFiles.filter((file) => {
    if (!file.endsWith(".json")) return false;
    if (!args.rangeStart || !args.rangeEnd) return true;

    const fileName = file.split(".")[0];
    if (!fileName) return false;
    
    const pokemonId = parseInt(fileName, 10);
    return pokemonId >= args.rangeStart && pokemonId <= args.rangeEnd;
  });

  // First pass: collect all pokemon IDs for each ability
  for (const file of filteredFiles) {
    const pokemonData = JSON.parse(
      await fs.promises.readFile(path.join(pokemonDir, file), "utf-8")
    );
    const fileName = file.split(".")[0];
    if (!fileName) continue;
    const pokemonId = parseInt(fileName, 10);
    for (const ability of pokemonData.abilities) {
      const abilityName = ability.ability.name;
      if (!abilityToPokemonIds[abilityName]) abilityToPokemonIds[abilityName] = new Set();
      abilityToPokemonIds[abilityName].add(pokemonId);
    }
  }

  // Second pass: fetch and write ability data for each ability
  const abilitiesToProcess = args.abilityName
    ? [args.abilityName]
    : Object.keys(abilityToPokemonIds);

  for (const abilityName of abilitiesToProcess) {
    // Only process if we have pokemon for this ability
    const pokemonIdSet = abilityToPokemonIds[abilityName];
    if (!pokemonIdSet) continue;
    const abilityFile = path.join(abilityDir, `${abilityName}.json`);
    // Check if we need to download the ability data
    const shouldDownload =
      args.refresh || !(await fs.promises.stat(abilityFile).catch(() => false));
    if (shouldDownload) {
      try {
        console.log(`Fetching ability data for ${abilityName}...`);
        const abilityData = await fetchAbilityData(abilityName);
        await fs.promises.writeFile(
          abilityFile,
          JSON.stringify(abilityData, null, 2)
        );
        console.log(`Saved ability data for ${abilityName}`);
        // Throttle requests by 250ms
        await new Promise(res => setTimeout(res, 250));
      } catch (error) {
        console.error(`Error processing ability ${abilityName}:`, error);
      }
    }
  }
}

// Main function
export async function main(args: AbilityArgs): Promise<void> {
  const pokemonDir = path.join(__dirname, "pokemon");
  const abilityDir = path.join(__dirname, "ability");

  console.log("Starting ability data ETL process...");
  if (args.abilityName) {
    console.log(`Processing single ability: ${args.abilityName}`);
  } else if (args.rangeStart && args.rangeEnd) {
    console.log(`Processing abilities for Pokemon ${args.rangeStart} to ${args.rangeEnd}`);
  } else {
    console.log("Processing all abilities");
  }
  await processPokemonAbilities(pokemonDir, abilityDir, args);
  console.log("Ability data ETL process completed!");
}

// Run if called directly
if (require.main === module) {
  const args: AbilityArgs = {
    rangeStart: parseInt(process.argv.find(arg => arg.startsWith("--rangeStart="))?.split("=")[1] || "1", 10),
    rangeEnd: parseInt(process.argv.find(arg => arg.startsWith("--rangeEnd="))?.split("=")[1] || "151", 10),
    refresh: process.argv.includes("--refresh"),
    abilityName: process.argv.find(arg => arg.startsWith("--ability="))?.split("=")[1],
  };
  main(args).catch(console.error);
} 