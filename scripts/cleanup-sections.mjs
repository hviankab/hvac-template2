import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/content/pages';

function getAllMdxFiles(dir) {
  let files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getAllMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function cleanupFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Remove PlaceholderContentSection import
  if (content.includes('import PlaceholderContentSection')) {
    content = content.replace(/import PlaceholderContentSection from.*\n/g, '');
    modified = true;
  }
  
  // Remove PromoTilesSection import
  if (content.includes('import PromoTilesSection')) {
    content = content.replace(/import PromoTilesSection from.*\n/g, '');
    modified = true;
  }
  
  // Remove FinancingPlansSection import
  if (content.includes('import FinancingPlansSection')) {
    content = content.replace(/import FinancingPlansSection from.*\n/g, '');
    modified = true;
  }
  
  // Remove PlaceholderContentSection usage
  content = content.replace(/<PlaceholderContentSection[\s\S]*?\/>\n\n/g, '');
  
  // Remove PromoTilesSection usage (with tiles array)
  content = content.replace(/<PromoTilesSection[\s\S]*?tiles=\{[\s\S]*?\]\s*\}\s*\/>\n\n/g, '');
  
  // Remove FinancingPlansSection usage (with items array)
  content = content.replace(/<FinancingPlansSection[\s\S]*?items=\{[\s\S]*?\]\s*\}\s*\/>\n\n/g, '');
  
  if (modified || content !== readFileSync(filePath, 'utf-8')) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Cleaned: ${filePath}`);
    return true;
  }
  
  return false;
}

const files = getAllMdxFiles(pagesDir);
let cleanedCount = 0;

for (const file of files) {
  if (cleanupFile(file)) {
    cleanedCount++;
  }
}

console.log(`\nCleaned ${cleanedCount} files`);
