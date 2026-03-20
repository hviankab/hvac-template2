import fs from 'fs';

const subcategoryPages = [
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
  
  // Find the end of CouponsSection
  const couponsEndIndex = content.lastIndexOf('/>');
  
  if (couponsEndIndex === -1) {
    console.log(`⚠️  Could not find CouponsSection end in: ${filePath}`);
    return;
  }
  
  // Keep everything up to and including the CouponsSection closing tag
  const cleanContent = content.substring(0, couponsEndIndex + 2) + '\n';
  
  fs.writeFileSync(filePath, cleanContent, 'utf-8');
  console.log(`✅ Cleaned: ${filePath}`);
};

console.log('🧹 Final cleanup of subcategory pages...\n');

subcategoryPages.forEach(cleanupPage);

console.log('\n✨ Cleanup complete!');
