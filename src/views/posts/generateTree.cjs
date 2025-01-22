const fs = require('fs');
const path = require('path');

let idCounter = 0;

function generateTree(dirPath, rootPathLength) {
  const stats = fs.statSync(dirPath);
  const relativePath = dirPath.substring(rootPathLength);
  const info = {
    id: idCounter++,
    label: path.basename(dirPath),
    path: relativePath
  };

  if (stats.isDirectory()) {
    info.children = fs.readdirSync(dirPath)
      .filter(child => {
        const childPath = path.join(dirPath, child);
        const childStats = fs.statSync(childPath);
        return (childStats.isDirectory() && child !== 'source') || path.extname(child) === '.md';
      })
      .map(child => generateTree(path.join(dirPath, child), rootPathLength));
  }

  return info;
}

const rootDir = path.join(__dirname);
const tree = generateTree(rootDir, rootDir.length + 1);
fs.writeFileSync(path.join(__dirname, 'treeData.json'), JSON.stringify(tree, null, 2));
console.log('目录树已生成');