import fs from "fs"
import path from "path"
import readlineSync from "readline-sync"

export function run () {
  console.log ( ` Running saved words `)

const userName = readlineSync.question(`Welcome to Jumanji. What is your name ? `)

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
const dirPath = './definitions'; 
const subdirs = listSubdirectories(dirPath);

console.log('Saved Words', subdirs);


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
        

  function saveScoreToFile(userName, score,totalQuestions, ) {
    const scoreData = `User : ${userName}, Score : ${score} out of ${totalQuestions}\n`
    const scoreFilePath = path.join(`./Scorefolder`, `scores.txt`)

    try {
      fs.appendFileSync(scoreFilePath,   scoreData,  `utf8`)
      console.log('You can compare your scores with past attempts at scores.txt')
    }catch (err) {
      console.error(`Error writing scores to file:`,  err )
    }
    }
  

  
  // Main logic
  try {
    const rootDirPath = './definitions'; 
    const subdirs = getSubdirectories(rootDirPath);
  
    if (subdirs.length === 0) {
      console.log('No subdirectories found in the directory.');
    } else {
      let score = 0
      let totalQuestions = 5

      for (let i = 0; i < totalQuestions; i++ ) {

      
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
        const userAnswer = readlineSync.question(`Question ${i+1 } : Which of  the saved words above best fit the definition ${fileContent.trim()}. Enter your answer here ➡️`);
  
        // Check the answer
        if (userAnswer.toLowerCase() === randomSubdir.toLowerCase()) {
          console.log("Correct!");
          score++
        } else {
          console.log(`Incorrect. The correct answer is ${randomSubdir}.`);
        }
      }
    }
    console.log(  `Thank you for playing ${userName}. Your final Score is : ${score} out of ${totalQuestions}`)


    saveScoreToFile(userName, score, totalQuestions)
  }
  } catch (err) {
    console.error('Error:', err);
  }
}