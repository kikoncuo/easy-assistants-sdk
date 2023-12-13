import axios from 'axios';
import ToolsHandler from '../utils/ToolsHandler.js';  // Adjust the path as necessary

class ChatAPI {
    constructor(serverUrl, toolsMap) {
        if (!serverUrl) {
            throw new Error('Server URL is required to initialize ChatAPI');
        }
        this.serverUrl = serverUrl;
        this.toolHandler = new ToolsHandler(toolsMap);
    }

    async sendQuery(query, threadId = null, toolResponses = null, instructions = null) {
        try {
            const payload = { query };
            if (threadId) payload.threadId = threadId;
            if (toolResponses) payload.tool_outputs = toolResponses;
            if (instructions) payload.instructions = instructions;

            const response = await axios.post(`${this.serverUrl}/chat`, payload);

            if (response.data.responseContent === 'requires_action') {
                return await this.handleToolAction(response.data);
            }

            return response.data;
        } catch (error) {
            if (error.response) {
                console.log('Error in sending query:', error.response.data, "Status :", error.response.status);
            } else {
                console.log('Error in sending query:', error.message);
            }
            throw error;
        }
    }

    async handleToolAction(data) {
        const { threadId, tools } = data;
        const { calls, runID } = tools;

        const toolOutputs = await Promise.all(
            calls.map(async (call) => {
                const output = await this.toolHandler.execute(call.function.name, call.function.arguments);
                return {
                    tool_call_id: call.id,
                    output
                };
            })
        );

        const toolResponses = {
            responses: toolOutputs,
            runId: runID
        }
        console.log("Calling action_response", threadId, JSON.stringify(toolResponses, null, 2))
        return this.sendQuery('action_response', threadId, toolResponses);
    }

    async getFile(fileId) {
        try {
            const response = await axios.get(`${this.serverUrl}/files/${fileId}`, {
                responseType: 'stream' // This ensures that the response is streamed
            });

            return response.data;
        } catch (error) {
            console.log('Error in getting file:', error.message);
            throw error;
        }
    }

    setToolsMap(toolsMap) {
        // Ensure that a valid toolsMap is provided
        if (!toolsMap || typeof toolsMap !== 'object') {
            throw new Error('A valid tools map is required to update the ToolsHandler');
        }

        // Update each tool in the toolsMap
        for (const [toolName, toolFunction] of Object.entries(toolsMap)) {
            this.toolHandler.updateTool(toolName, toolFunction);
        }
    }

    getToolsMap() {
        return this.toolHandler.viewToolMap();
    }

    removeTool(toolName) {
        try {
            this.toolHandler.deleteTool(toolName);
            console.log(`Tool ${toolName} successfully removed`);
        } catch (error) {
            throw new Error(`Error removing tool: ${error.message}`);
        }
    }    
    
}

export default ChatAPI;
