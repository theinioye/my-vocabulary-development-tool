import { readFileSync } from "node:fs";

export function run() {
  const files = readFileSync("./Scorefolder/scores.txt", `utf8`);

  console.log(files);
}
