// update-image-paths.js
const fs = require('fs');
const path = require('path');

function updateImagePaths() {
    console.log('?? Updating image paths in source files...\n');
    
    // Get all source files
    const srcFiles = [];
    
    function scanDir(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            if (file.isDirectory() && !file.name.includes('node_modules')) {
                scanDir(fullPath);
            } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.jsx')) {
                srcFiles.push(fullPath);
            }
        }
    }
    
    scanDir('src');
    
    let totalUpdates = 0;
    
    srcFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Pattern 1: src="/images/filename.ext"
        const pattern1 = /src=["'](\/images\/([^"']+\.(jpg|jpeg|png|webp|svg)))["']/gi;
        content = content.replace(pattern1, (match, fullPath, filename) => {
            updated = true;
            totalUpdates++;
            // Use compressed version
            return match.replace(fullPath, `/images/compressed/${filename}`);
        });
        
        // Pattern 2: src={"/images/filename.ext"}
        const pattern2 = /src=\{["'](\/images\/([^"']+\.(jpg|jpeg|png|webp|svg)))["']\}/gi;
        content = content.replace(pattern2, (match, fullPath, filename) => {
            updated = true;
            totalUpdates++;
            return match.replace(fullPath, `/images/compressed/${filename}`);
        });
        
        // Pattern 3: src={`/images/filename.ext`}
        const pattern3 = /src=\{\`(\/images\/([^\`]+\.(jpg|jpeg|png|webp|svg)))\`\}/gi;
        content = content.replace(pattern3, (match, fullPath, filename) => {
            updated = true;
            totalUpdates++;
            return match.replace(fullPath, `/images/compressed/${filename}`);
        });
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`? Updated: ${path.relative(process.cwd(), filePath)}`);
        }
    });
    
    console.log(`\n? Updated ${totalUpdates} image references`);
    console.log('\n?? For even better performance, use WebP format:');
    console.log('<picture>');
    console.log('  <source srcset="/images/webp/image.webp" type="image/webp">');
    console.log('  <img src="/images/compressed/image.jpg" alt="Description">');
    console.log('</picture>');
}

updateImagePaths();
