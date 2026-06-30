const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(__dirname, 'app'), (filePath) => {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Clean up broken headers block like: headers: {\n  "\n},
  content = content.replace(/headers\s*:\s*\{\s*["']?\s*\},?/g, '');
  // Clean up empty headers block
  content = content.replace(/headers\s*:\s*\{\s*\},?/g, '');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Cleaned up headers in ${filePath}`);
  }
});
