import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"

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

// Main logic
try {
  const rootDirPath = './definitions'; // Replace with the actual path to your root directory
  const subdirs = getSubdirectories(rootDirPath);

  if (subdirs.length === 0) {
    console.log('No subdirectories found in the directory.');
  } else {
    // Select a random subdirectory
    const randomSubdir = selectRandomItem(subdirs);
    const subdirPath = path.join(rootDirPath, randomSubdir);

    // Get all files in the selected subdirectory
    const allFiles = getAllFiles(subdirPath);

    if (allFiles.length === 0) {
      console.log('No files found in the selected subdirectory.');
    } else {
      // Select a random file
      const randomFile = selectRandomItem(allFiles);

      // Read the content of the random file
      const fileContent = fs.readFileSync(randomFile, 'utf8');

      // Ask the question
      const userAnswer = readlineSync.question(`Which of  the saved words above best fit the definition ${fileContent.trim()}. Enter your answer here ➡️`);

      // Check the answer
      if (userAnswer.toLowerCase() === randomSubdir.toLowerCase()) {
        console.log("Correct!");
      } else {
        console.log(`Incorrect. The correct answer is ${randomSubdir}.`);
      }
    }
  }
} catch (err) {
  console.error('Error:', err);
}
