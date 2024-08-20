import fs from "fs"
import path from 'path'







 export async function writeDefinitiontoFile(word,arr){

    const wordDir = `./definitions/${word.toLowerCase()}`
  
    const absoluteDirPath = path.resolve(process.cwd(), wordDir);
    if (!fs.existsSync(absoluteDirPath)) {
        fs.mkdirSync(absoluteDirPath, {recursive: true})
    
    } 

    for (let i = 0; i < arr.length ; i++ ) {
        fs.writeFile(
            `${wordDir}/${i +1 }.json `, 
            JSON.stringify(arr[i].definition,null,2),
            (err) => {
                if (err) throw err
            }
        )
    }
} 
