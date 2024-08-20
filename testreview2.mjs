import fs from "fs"
import path from "path"
const dirPath = './definitions'; 




try {
  // Read the contents of the directory
  const items = fs.readdirSync(dirPath);
  
  // Filter out subdirectories
  const subDirs = items.filter(item => {
    const itemPath = path.join(dirPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log('Here are the saved words in your vocabulary', subDirs);

  // Loop over each subdirectory and read files inside them
  subDirs.forEach(subDir => {
    const subDirPath = path.join(dirPath, subDir);
    const files = fs.readdirSync(subDirPath);

    files.forEach(file => {
      const filePath = path.join(subDirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');

        console.log(`Definition ${file} in ${subDir}:\n${content}`);
      }
    });
  });
} catch (err) {
  console.error(err);
}

