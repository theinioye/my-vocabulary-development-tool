import axios from "axios"
const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export async function getDefinition( wordToDefine) {
    try {
        const response = await axios.get( `${BASE_URL}/${wordToDefine}`)
        console.log("GET request successful")

        return response.data
    }
    catch (error) { 
        console.error ( "Error making GET request")

        return null
    }
}