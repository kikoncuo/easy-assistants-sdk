# README.md for easy-assistant-sdk

## 🚀 Getting Started

This guide will help you understand how to integrate and use the easy-assistant-sdk with your applications to interact with the easy-assistant-server. This SDK simplifies sending queries and managing tool functionalities.
Prerequisites

    Node.js environment
    Basic knowledge of JavaScript and Node.js
    easy-assistant-server setup and running

Installation

To start using easy-assistant-sdk, follow these steps:

    Ensure Node.js is installed on your system.
    Clone or download the easy-assistant-sdk repository.
    Navigate to the project directory.
    Install necessary dependencies (if any).

## 🛠️ Configuration

Configure the SDK to connect with your easy-assistant-server:

    Import the SDK into your project.
    Create an instance of the SDK, providing the server URL and a map of tool functions.

Example:

```javascript

import { ChatAPI } from 'easy-assistant-sdk';

const serverUrl = 'http://localhost:3001'; // Replace with your server's URL
const toolsMap = {
    // Define your tool functions here
};

const chatApi = new ChatAPI(serverUrl, toolsMap);
```
## 🖥️ Using the SDK
Sending a Query

To send a query, use the sendQuery method. This method sends a user's query to the server and returns the response.

Example:

```javascript

const response = await chatApi.sendQuery("Your query here");
console.log(response);
```
Managing Threads

For continuous conversations, manage thread IDs:

    Store and reuse thread IDs returned by the server.
    Pass the thread ID with subsequent queries to maintain conversation context.

Handling Files

Use getFile to download files:

    The SDK provides the getFile method to handle file downloads.
    This method takes a file ID and handles the download process.

Example:

```javascript

chatApi.getFile("file_id_here")
    .then(stream => /* Handle the file stream */)
    .catch(error => console.error(error));
```
Custom Tools Integration

Integrate custom tools by mapping tool names to functions in the toolsMap.

Example assuming you have a tool called customTool in your assistant:

```javascript

const toolsMap = {
    customTool: consoleLogTool
};

function consoleLogTool(parameter){
    console.log("consoleLog tool executed with parameter" + parameter)
    return true;
}
```

Setting Tools Map

Use setToolsMap to update the tools at any time:

```javascript

const toolsMap = {
    // Define your tool functions here
};

chatApi.setToolsMap(toolsMap);
```

Viewing the Current Tools Map

Use viewCurrentTools to view the current state of the tools map at any time. This function retrieves and displays the current tools registered in the ToolsHandler.
Usage

```javascript

const viewCurrentTools = () => {
    const currentToolsMap = chatApi.getToolsMap();
    console.log('Current Tools:', currentToolsMap);
};

viewCurrentTools();
```

Deleting a Tool from the Tools Map

Use removeTool to delete a specific tool from the tools map. This function takes the name of the tool as an argument and removes it from the ToolsHandler.
Usage

```javascript

const removeTool = (toolName) => {
    try {
        chatApi.removeTool(toolName);
        console.log(`Tool ${toolName} successfully removed`);
    } catch (error) {
        console.error(`Error removing tool: ${error.message}`);
    }
};

// Example: Remove a tool named 'exampleTool'
removeTool('exampleTool');
```

## 📝 Example Implementation

To see a comprehensive example of how to implement all the features of the easy-assistant-sdk, refer to the src/test/testChatScript.js file in the SDK repository. This script provides a hands-on demonstration and can be directly run using Node.js.

This script demonstrates:

    Establishing a connection with the easy-assistant-server.
    Sending queries and handling responses.
    Managing thread IDs for ongoing conversations.
    Using the getFile method for file downloads.
    Integrating and using custom tools defined in the toolsMap.


## 🌟 Features

    Simple and intuitive interface for sending queries to easy-assistant-server.
    Thread management for maintaining conversation flow.
    File handling capabilities for downloading files from the server.
    Extensibility for integrating custom client-side tools.

## 📚 Additional Information

    Ensure proper connection and configuration with the easy-assistant-server.
    Familiarize yourself with JavaScript and async programming for effective SDK usage.
    The SDK is designed to be lightweight and easy to integrate into various projects.

## 📞 Support

For support or questions regarding the SDK, contact the maintainer or refer to the documentation.