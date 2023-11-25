// Quick script to test the SDK manually in your terminal

import readline from 'readline';
import { ChatAPI } from '../index.js'; // Adjust the path as necessary
import fs from 'fs';

const serverUrl = 'http://localhost:3001'; // Replace with your server URL
const toolsMap = {testTool:consoleLogTool}; // No tools are defined

const chatApi = new ChatAPI(serverUrl, toolsMap);
let threadId = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function sendChat(query) {
    try {
        const response = await chatApi.sendQuery(query, threadId);
        console.log('Response:', JSON.stringify(response.responseContent, null, 2));
        
        // Update threadId for the next message
        if (response.threadId) {
            threadId = response.threadId;
        }

        // Prompt for the next message
        askQuestion();
    } catch (error) {
        console.error('Error:', error.message);
        rl.close();
    }
}

function getFile(fileId) {
    console.log("Downloading file...");

    chatApi.getFile(fileId)
        .then(stream => {
            const path = `./${fileId}.png`; // Here we are assuming it's always a png
            const writer = fs.createWriteStream(path);

            stream.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        })
        .then(() => {
            console.log('File download completed.');
        })
        .catch(error => {
            console.error('Error downloading the file:', error.message);
        });
}

function consoleLogTool(parameter){
    console.log("consoleLog tool executed with parameter" + parameter)
    return true;
}

function askQuestion() {
    rl.question('You: ', (query) => {
        sendChat(query);
    });
}

// Start the conversation
askQuestion();

//Test get a file:
//getFile('file-YkMOxhDyDqdSnYONjVhCzSfn');
