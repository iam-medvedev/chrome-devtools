import type * as Workspace from '../../models/workspace/workspace.js';
/**
 * AgentProject wraps around a Workspace.Workspace.Project and
 * implements AI Assistance-specific logic for accessing workspace files
 * including additional checks and restrictions.
 */
export declare class AgentProject {
    #private;
    constructor(project: Workspace.Workspace.Project, options?: {
        maxFilesChanged: number;
        maxLinesChanged: number;
    });
    /**
     * Provides file names in the project to the agent.
     */
    getFiles(): string[];
    /**
     * Provides access to the file content in the working copy
     * of the matching UiSourceCode.
     */
    readFile(filepath: string): string | undefined;
    /**
     * This method updates the file content in the working copy of the
     * UiSourceCode identified by the filepath.
     */
    writeFile(filepath: string, content: string): void;
    /**
     * This method searches in files for the agent and provides the
     * matches to the agent.
     */
    searchFiles(query: string, caseSensitive?: boolean, isRegex?: boolean): Promise<Array<{
        filepath: string;
        lineNumber: number;
        columnNumber: number;
        matchLength: number;
    }>>;
}
