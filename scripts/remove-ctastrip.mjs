import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/content/pages';

function getAllMdxFiles(dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const mdxFiles = getAllMdxFiles(pagesDir);

for (const file of mdxFiles) {
  let content = readFileSync(file, 'utf-8');
  
  // Remove CTAStrip import (handle duplicates)
  content = content.replace(/import CTAStrip from "@\/components\/sections\/CTAStrip\.astro"\n/g, '');
  
  // Remove CTAStrip component usage - match multiline pattern
  content = content.replace(/<CTAStrip[\s\S]*?\/>\n*/g, '');
  
  // Clean up extra blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  writeFileSync(file, content, 'utf-8');
  console.log(`Processed: ${file}`);
}

console.log('Done! Removed CTAStrip from all pages.');

