
import fs from "fs"
import path from "path"

// Directory path
const directoryPath = './definitions'; // replace with your directory path

// Read directory

export function run () {
    console.log ( ` Running saved words `)


fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } })

    // Loop through all the files by index
   
}