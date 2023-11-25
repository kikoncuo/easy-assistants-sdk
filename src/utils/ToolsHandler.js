class ToolsHandler {
    constructor(toolsMap) {
        this.toolsMap = toolsMap || {};
    }

    async execute(toolName, args) {
        if (!this.toolsMap[toolName]) {
            throw new Error(`Tool ${toolName} is not defined`);
        }

        try {
            // The function for the tool is executed with the provided arguments.
            return await this.toolsMap[toolName](args);
        } catch (error) {
            console.log(`Error executing tool ${toolName}:`, error);
            throw error;
        }
    }

    // Method to add or update a tool function
    updateTool(toolName, toolFunction) {
        this.toolsMap[toolName] = toolFunction;
    }
}

export default ToolsHandler;
