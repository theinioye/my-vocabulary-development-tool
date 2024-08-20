import readlineSync from "readline-sync";
import { getDefinition } from "./api.mjs";
import { writeDefinitiontoFile } from "./file.mjs";

export async function run() {
  console.log(` Running saved words `);

  const word = readlineSync.question(
    `Welcome to your vocabulary builder 😊 Enter a word to define here ➡️`
  );

  console.log(`Defining ${word}...`);

  const definitions = await getDefinition(word);

  if (definitions != null) {
    const definitionsArr = definitions[0].meanings[0].definitions;

    await writeDefinitiontoFile(word, definitionsArr);

    console.log(
      ` ${definitionsArr.length} meanings for "${word}" saved in your vocabulary `
    );
  } else {
    console.error(`No definitions found.`);
  }
}
