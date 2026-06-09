const fs = require('fs').promises;
const path = require('path');

console.log('📦 Image Compression Helper\n');

async function main() {
  console.log('This script helps manage image compression.');
  console.log('For actual optimization, run: npm run optimize-images\n');
  
  console.log('Available image files:');
  
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images');
    const files = await fs.readdir(imageDir);
    
    const images = files.filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
    
    images.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img}`);
    });
    
    console.log(`\nTotal: ${images.length} images`);
    console.log('\n💡 Tip: Large images (>1MB) will be optimized automatically');
    console.log('      when you run: npm run optimize-images');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();