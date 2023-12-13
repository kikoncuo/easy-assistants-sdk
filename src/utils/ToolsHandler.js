class ToolsHandler {
    constructor(toolsMap) {
        this.toolsMap = toolsMap || {};
    }

    async execute(toolName, args) {
        if (!this.toolsMap[toolName]) {
            throw new Error(`Tool ${toolName} is not defined, make sure you proive a tool with that name to the map when creating your ChatAOPI instance if you want to use it`);
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

    // Method to see the entire tools map
    viewToolMap() {
        return this.toolsMap;
    }

    // Method to delete a tool
    deleteTool(toolName) {
        if (!this.toolsMap[toolName]) {
            throw new Error(`Tool ${toolName} is not defined in the tools map, cannot delete`);
        }
        delete this.toolsMap[toolName];
    }
}

export default ToolsHandler;
