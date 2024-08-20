import readlineSync from "readline-sync";
import { searchTerm } from "./search.mjs";
import { run as runReview } from "./testreview.mjs";
import { run as runNewVocab } from "./index.mjs";
import { run as runVocabQuiz } from "./quiztest3.mjs";
import { run as runScores } from "./displayscores.mjs";

let userTries = 0;

while (true) {
  // Get user input
  if (userTries >= 3) {
    console.log(`❌ Ending the program`);
    break;
  }

  console.log(
    `[1] Search\n[2] Review \n[3]Add New Vocabulary\n[4]Vocabulary Quiz\n[5]Display Scores `
  );
  const userInput = parseInt(
    readlineSync.question(`Please select a choice from above:`)
  );

  console.log(`User input: ${userInput}`);

  const validInputs = [1, 2, 3, 4, 5];

  if (!validInputs.includes(userInput)) {
    console.log(
      `❌ Invalid Input Please enter a valid input from the following:  1, 2, 3, 4, 5`
    );

    userTries++;
    continue;
  }

  if (userInput == 1) {
    await searchTerm();
    console.log(`--------`);
  }

  if (userInput == 2) {
    runReview();
    console.log(`User selected 2`);
  }
  if (userInput == 3) {
    console.log(`User selected 3`);
    await runNewVocab();
  }
  if (userInput == 4) {
    console.log(`User selected 4`);
    runVocabQuiz();
  }
  if (userInput == 5) {
    runScores();
    console.log(`User selected 5`);
  }

  userTries = 0;
}
