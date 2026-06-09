// compress-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function compressAllImages() {
    console.log('?? COMPRESSING ALL IMAGES...\n');
    
    const imagesDir = 'public/images';
    const compressedDir = 'public/images/compressed';
    const webpDir = 'public/images/webp';
    
    // Create directories
    await fs.mkdir(compressedDir, { recursive: true });
    await fs.mkdir(webpDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png)$/i.test(file) && 
        !file.includes('_compressed') &&
        !file.includes('_optimized')
    );
    
    console.log(`Found ${imageFiles.length} images to compress\n`);
    
    let totalOriginalKB = 0;
    let totalCompressedKB = 0;
    
    // Process each image
    for (const filename of imageFiles) {
        const inputPath = path.join(imagesDir, filename);
        const compressedPath = path.join(compressedDir, filename);
        const webpPath = path.join(webpDir, filename.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        
        try {
            const stats = await fs.stat(inputPath);
            const originalKB = Math.round(stats.size / 1024);
            totalOriginalKB += originalKB;
            
            console.log(`Processing: ${filename} (${originalKB}KB)`);
            
            const image = sharp(inputPath);
            const metadata = await image.metadata();
            
            // Determine compression settings based on size
            let quality = 75;
            let maxWidth = 1920;
            
            if (stats.size > 2 * 1024 * 1024) { // >2MB
                quality = 60;
                maxWidth = 1200;
            } else if (stats.size > 1 * 1024 * 1024) { // >1MB
                quality = 65;
                maxWidth = 1600;
            }
            
            // Resize if too large
            if (metadata.width > maxWidth) {
                await image.resize(maxWidth, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                });
            }
            
            // Compress based on format
            if (filename.toLowerCase().endsWith('.png')) {
                await image.png({ quality: quality, compressionLevel: 9 })
                          .toFile(compressedPath);
            } else {
                await image.jpeg({ quality: quality, mozjpeg: true })
                          .toFile(compressedPath);
            }
            
            // Create WebP version
            await sharp(compressedPath)
                .webp({ quality: quality - 5 }) // Slightly lower quality for WebP
                .toFile(webpPath);
            
            const newStats = await fs.stat(compressedPath);
            const compressedKB = Math.round(newStats.size / 1024);
            totalCompressedKB += compressedKB;
            
            const savings = ((originalKB - compressedKB) / originalKB * 100).toFixed(1);
            console.log(`? ${originalKB}KB ? ${compressedKB}KB (${savings}% saved)\n`);
            
        } catch (error) {
            console.error(`? Error processing ${filename}:`, error.message);
        }
    }
    
    console.log('='.repeat(50));
    console.log(`?? TOTAL BEFORE: ${Math.round(totalOriginalKB / 1024)}MB`);
    console.log(`?? TOTAL AFTER:  ${Math.round(totalCompressedKB / 1024)}MB`);
    console.log(`?? SAVINGS: ${((totalOriginalKB - totalCompressedKB) / totalOriginalKB * 100).toFixed(1)}%`);
    console.log('\n? All images compressed!');
    console.log('?? Check: public/images/compressed/');
    console.log('?? WebP versions: public/images/webp/');
}

compressAllImages().catch(console.error);
