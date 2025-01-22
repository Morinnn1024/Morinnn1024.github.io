const fs = require('fs');
const path = require('path');

function generateTree(dirPath) {
  const stats = fs.statSync(dirPath);
  const info = {
    label: path.basename(dirPath)
  };

  if (stats.isDirectory()) {
    info.children = fs.readdirSync(dirPath)
      .filter(child => {
        const childPath = path.join(dirPath, child);
        const childStats = fs.statSync(childPath);
        return (childStats.isDirectory() && child !== 'source') || path.extname(child) === '.md';
      })
      .map(child => generateTree(path.join(dirPath, child)));
  }

  return info;
}

const tree = generateTree(path.join(__dirname));
fs.writeFileSync(path.join(__dirname, 'treeData.json'), JSON.stringify(tree, null, 2));
console.log('目录树已生成');