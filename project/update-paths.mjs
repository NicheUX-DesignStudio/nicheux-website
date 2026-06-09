import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';

// Find all TypeScript/JSX files
const files = [];
function findFiles(dir) {
    const items = readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory() && !item.name.includes('node_modules')) {
            findFiles(fullPath);
        } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
            files.push(fullPath);
        }
    });
}

findFiles('src');

let updates = 0;
files.forEach(file => {
    let content = readFileSync(file, 'utf8');
    
    // Simple replacement
    const newContent = content.replace(/src=["'](\/images\/[^"']+)["']/g, (match, imgPath) => {
        const filename = path.basename(imgPath);
        updates++;
        return `src="/images/compressed/${filename}"`;
    });
    
    if (newContent !== content) {
        writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

console.log(`\n✅ Updated ${updates} image paths`);