import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"


function listSubdirectories(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    const subdirs = files.filter(file => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    });

    return subdirs;
  } catch (err) {
    console.error('Error reading directory:', err);
    return [];
  }
}

// Example usage
const dirPath = './definitions'; // Replace with the actual path to your directory
const subdirs = listSubdirectories(dirPath);

console.log('Saved Words', subdirs);


// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}


// Function to get all subdirectories in a directory
function getSubdirectories(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
}

// Function to select a random item from an array
function selectRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Main logic`
try {
  const dirPath = './definitions'; // Replace with the actual path to your directory
  const allFiles = getAllFiles(dirPath);

  if (allFiles.length === 0) {
    console.log('No files found in the directory.');
  } else {
    // Select a random file
    const randomFile = selectRandomFile(allFiles);

    // Read and store the content of the random file
    const fileContent = fs.readFileSync(randomFile, 'utf8');
    //console.log(`Random file selected: ${randomFile}`);
    //console.log(`\n${fileContent}`);


    const userAnswer = readlineSync.question(`Which of  the saved words above best fit the definition ${fileContent.trim()}. Enter your answer here ➡️`);

    
      // Check the answer
      if (userAnswer.toLowerCase() === randomSubdir.toLowerCase()) {
        console.log("Correct!");
      } else {
        console.log(`Incorrect. The correct answer is ${randomSubdir}.`);
      }
    }
    
} catch (err) {
  console.error(err);
}

