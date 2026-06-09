const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  try {
    const imageDir = path.join(process.cwd(), 'public', 'images');
    console.log('📁 Optimizing images in:', imageDir);
    
    // Get all PNG/JPG files
    const allFiles = await fs.readdir(imageDir);
    const imageFiles = allFiles.filter(file => /\.(png|jpg|jpeg)$/i.test(file));
    
    console.log(`📊 Found ${imageFiles.length} images to optimize`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(imageDir, file);
      const baseName = path.basename(file, path.extname(file));
      const webpPath = path.join(imageDir, `${baseName}.webp`);
      
      try {
        // Skip if WebP already exists
        try {
          await fs.access(webpPath);
          console.log(`⏭️  Skipping ${file} (WebP already exists)`);
          continue;
        } catch {}
        
        console.log(`🔄 Converting ${file} to WebP...`);
        
        // Create optimized WebP
        await sharp(inputPath)
          .resize(1200, 1200, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .webp({ 
            quality: 80,
            effort: 3 
          })
          .toFile(webpPath);
        
        // Get file sizes
        const origStats = await fs.stat(inputPath);
        const webpStats = await fs.stat(webpPath);
        const savings = Math.round((1 - webpStats.size / origStats.size) * 100);
        
        console.log(`✅ Created ${baseName}.webp (saved ${savings}%)`);
        
      } catch (error) {
        console.error(`❌ Error with ${file}:`, error.message);
      }
    }
    
    console.log('\n🎉 Image optimization complete!');
    console.log('💡 All images now available as .webp files');
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
  }
}

optimizeImages();