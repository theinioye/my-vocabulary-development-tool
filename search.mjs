import readlineSync from "readline-sync";
import { getDefinition } from "./api.mjs";




export async function searchTerm() {
    const searchTerm = readlineSync.question(
        "Welcome to your vocabulary finder 😊. What word would you like to search today?  "
      );
      console.log(`Looking up definitions for "${searchTerm}" for you 🤗`);
      
      const foundDefinitions = await getDefinition(searchTerm);
      
      function compileDefinitions(arr) {
        for (let i = 0; i < arr.length; i++) {
          console.log(JSON.stringify(arr[i].definition, null, 2));
        }
      }
      
      if (foundDefinitions != null) {
        const searchArr = foundDefinitions[0].meanings[0].definitions;
      
        console.log(`(${searchArr.length}) definitions found`);
      
        console.log(compileDefinitions(searchArr));
      } else {
        console.log(`No definitions found`)
      }

}