import fs from 'fs';
import path from 'path';

const subcategoryPages = [
  'src/content/pages/air-conditioning/ac-repair.mdx',
  'src/content/pages/air-conditioning/ac-installation-replacement.mdx',
  'src/content/pages/commercial/hvac-repair.mdx',
  'src/content/pages/commercial/hvac-installation.mdx',
  'src/content/pages/emergency/24-7-ac-repairs.mdx',
  'src/content/pages/emergency/24-7-emergency-repairs.mdx'
];

const cleanupPage = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove imports
  content = content.replace(/import PlaceholderContentSection from[^\n]+\n/g, '');
  content = content.replace(/import PromoTilesSection from[^\n]+\n/g, '');
  content = content.replace(/import FinancingPlansSection from[^\n]+\n/g, '');
  content = content.replace(/import FAQSection from[^\n]+\n/g, '');
  content = content.replace(/import ServiceAreaSection from[^\n]+\n/g, '');
  
  // Remove PlaceholderContentSection usage
  content = content.replace(/<PlaceholderContentSection[\s\S]*?\/>/g, '');
  
  // Remove PromoTilesSection usage
  content = content.replace(/<PromoTilesSection[\s\S]*?tiles=\{[\s\S]*?\]\s*\}\s*\/>/g, '');
  
  // Remove FinancingPlansSection usage
  content = content.replace(/<FinancingPlansSection[\s\S]*?items=\[[\s\S]*?\]\s*\}\s*\/>/g, '');
  
  // Remove FAQSection usage
  content = content.replace(/<FAQSection[\s\S]*?faqs=\[[\s\S]*?\]\s*\}\s*\/>/g, '');
  
  // Remove ServiceAreaSection usage
  content = content.replace(/<ServiceAreaSection[\s\S]*?\/>/g, '');
  
  // Clean up multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Cleaned: ${filePath}`);
};

console.log('🧹 Cleaning up subcategory pages...\n');

subcategoryPages.forEach(cleanupPage);

console.log('\n✨ Cleanup complete!');
