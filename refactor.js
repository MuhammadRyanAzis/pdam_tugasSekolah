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
  let lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  let newLines = [];
  
  let isClient = lines.some(l => l.includes('"use client"') || l.includes("'use client'"));
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.includes('process.env.NEXT_PUBLIC_APP_KEY')) {
      line = line.replace(/process\.env\.NEXT_PUBLIC_APP_KEY/g, "process.env.APP_KEY");
      changed = true;
    }

    if (isClient) {
      if (line.match(/const\s+token\s*=\s*await\s+getCookies\(["']token["']\);?/)) {
        changed = true;
        continue;
      }
      
      if (line.match(/["']app-key["']\s*:/) || line.match(/["']APP-KEY["']\s*:/) || line.match(/["']Authorization["']\s*:/)) {
        changed = true;
        continue;
      }

      if (line.includes('${process.env.NEXT_PUBLIC_BASE_URL}')) {
        line = line.replace(/\$\{process\.env\.NEXT_PUBLIC_BASE_URL\}/g, '/api-proxy');
        changed = true;
      }
    }
    newLines.push(line);
  }

  let content = newLines.join('\n');
  let originalContent = content;
  content = content.replace(/headers\s*:\s*\{\s*\},?\n?/g, '');
  if (content !== originalContent) changed = true;

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Safely updated: ${filePath}`);
  }
});
