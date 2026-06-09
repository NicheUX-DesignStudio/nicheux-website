// compress-all.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);

async function getAllImages() {
    const imagesDir = 'public/images';
    const files = await fs.readdir(imagesDir);
    
    // Get ALL image files (not just the huge ones)
    return files.filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file) && 
        !file.includes('_compressed') &&
        !file.includes('_optimized')
    );
}

async function compressImage(inputPath, outputPath, filename) {
    try {
        const stats = await fs.stat(inputPath);
        const originalKB = Math.round(stats.size / 1024);
        
        console.log(`Compressing: ${filename} (${originalKB}KB)`);
        
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Determine optimal compression
        const isPNG = filename.toLowerCase().endsWith('.png');
        const isJPEG = filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg');
        
        // Set max dimensions based on file size
        let maxWidth = 1920;
        let maxHeight = 1080;
        
        if (stats.size > 2 * 1024 * 1024) { // >2MB
            maxWidth = 1200;
            maxHeight = 800;
        } else if (stats.size > 1 * 1024 * 1024) { // >1MB
            maxWidth = 1600;
            maxHeight = 900;
        }
        
        // Resize if needed
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
            await image.resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }
        
        // Apply compression
        if (isPNG) {
            await image.png({
                quality: 70,
                compressionLevel: 9,
                palette: true
            }).toFile(outputPath);
        } else if (isJPEG) {
            await image.jpeg({
                quality: 65,
                mozjpeg: true,
                chromaSubsampling: '4:2:0'
            }).toFile(outputPath);
        } else {
            // Copy as-is for WebP
            await fs.copyFile(inputPath, outputPath);
        }
        
        const newStats = await fs.stat(outputPath);
        const newKB = Math.round(newStats.size / 1024);
        const savings = ((originalKB - newKB) / originalKB * 100).toFixed(1);
        
        if (newKB < originalKB) {
            console.log(`? ${filename}: ${originalKB}KB ? ${newKB}KB (${savings}% saved)`);
        } else {
            console.log(`??  ${filename}: ${originalKB}KB (already optimal)`);
        }
        
        return { originalKB, newKB };
        
    } catch (error) {
        console.error(`? Error compressing ${filename}:`, error.message);
        return { originalKB: 0, newKB: 0 };
    }
}

async function createWebPVersions() {
    const compressedDir = 'public/images/compressed';
    const webpDir = 'public/images/webp';
    
    await fs.mkdir(webpDir, { recursive: true });
    
    const files = await fs.readdir(compressedDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    console.log(`\n?? Creating WebP versions for ${imageFiles.length} images...\n`);
    
    for (const file of imageFiles) {
        const inputPath = path.join(compressedDir, file);
        const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const outputPath = path.join(webpDir, outputName);
        
        try {
            console.log(`Creating WebP: ${outputName}`);
            await sharp(inputPath)
                .webp({ quality: 65 })
                .toFile(outputPath);
            console.log(`? Created: ${outputName}`);
        } catch (error) {
            console.log(`? Skipping ${file}: ${error.message}`);
        }
    }
}

async function main() {
    console.log('?? COMPRESSING ALL IMAGES');
    console.log('='.repeat(50));
    
    const allImages = await getAllImages();
    console.log(`Found ${allImages.length} images to optimize\n`);
    
    await fs.mkdir('public/images/compressed', { recursive: true });
    
    let totalOriginalKB = 0;
    let totalCompressedKB = 0;
    let processed = 0;
    
    // Process in batches to avoid memory issues
    const batchSize = 5;
    for (let i = 0; i < allImages.length; i += batchSize) {
        const batch = allImages.slice(i, i + batchSize);
        
        const promises = batch.map(filename => {
            const inputPath = path.join('public/images', filename);
            const outputPath = path.join('public/images/compressed', filename);
            return compressImage(inputPath, outputPath, filename);
        });
        
        const results = await Promise.all(promises);
        
        results.forEach(result => {
            totalOriginalKB += result.originalKB;
            totalCompressedKB += result.newKB;
        });
        
        processed += batch.length;
        console.log(`Processed: ${processed}/${allImages.length}\n`);
    }
    
    console.log('='.repeat(50));
    console.log(`?? TOTAL BEFORE: ${Math.round(totalOriginalKB / 1024)}MB`);
    console.log(`?? TOTAL AFTER:  ${Math.round(totalCompressedKB / 1024)}MB`);
    console.log(`?? SAVINGS: ${((totalOriginalKB - totalCompressedKB) / totalOriginalKB * 100).toFixed(1)}%`);
    
    // Create WebP versions
    await createWebPVersions();
    
    console.log('\n? ALL IMAGES COMPRESSED!');
    console.log('\n?? Output folders:');
    console.log('   - public/images/compressed/ (JPG/PNG)');
    console.log('   - public/images/webp/ (WebP format)');
    console.log('\n?? Next: Update your image references!');
}

main().catch(console.error);
