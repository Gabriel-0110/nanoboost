import { config } from 'dotenv';
config();

const API_KEY = process.env.VITE_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
