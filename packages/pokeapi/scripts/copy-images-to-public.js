/**
 * Script to copy downloaded Pokemon images to the Next.js public directory
 * This ensures the images are served statically by Next.js
 */
const fs = require('fs-extra');
const path = require('path');

// Source directory (where images are downloaded)
const SOURCE_DIR = path.join(__dirname, '../src/images');

// Target directory (Next.js public directory)
const TARGET_DIR = path.join(__dirname, '../../../apps/pokedex/public/images');

// Sprite types
const SPRITE_TYPES = [
  'front_default',
  'back_default',
  'front_shiny',
  'back_shiny',
  'official_artwork'
];

/**
 * Copy images from source to target directory
 */
async function copyImages() {
  try {
    console.log(`Copying Pokemon images from ${SOURCE_DIR} to ${TARGET_DIR}`);
    
    // Ensure target directory exists
    await fs.ensureDir(TARGET_DIR);
    
    // Copy each sprite type directory
    for (const spriteType of SPRITE_TYPES) {
      const sourceTypeDir = path.join(SOURCE_DIR, spriteType);
      const targetTypeDir = path.join(TARGET_DIR, spriteType);
      
      // Check if source directory exists
      if (await fs.pathExists(sourceTypeDir)) {
        console.log(`Copying ${spriteType} sprites...`);
        
        // Ensure target type directory exists
        await fs.ensureDir(targetTypeDir);
        
        // Copy all files from source to target
        await fs.copy(sourceTypeDir, targetTypeDir);
        
        // Count files copied
        const files = await fs.readdir(targetTypeDir);
        console.log(`Copied ${files.length} ${spriteType} sprites`);
      } else {
        console.log(`No ${spriteType} sprites found in source directory`);
      }
    }
    
    console.log('Image copy completed successfully!');
  } catch (error) {
    console.error('Error copying images:', error);
    process.exit(1);
  }
}

// Run the copy process
copyImages();
