import * as Bindings from '../../../models/bindings/bindings.js';
import type * as Workspace from '../../../models/workspace/workspace.js';
/**
 * File that formats a file for the LLM usage.
 */
export declare class FileFormatter {
    #private;
    static formatSourceMapDetails(selectedFile: Workspace.UISourceCode.UISourceCode, debuggerWorkspaceBinding: Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding): string;
    constructor(file: Workspace.UISourceCode.UISourceCode);
    formatFile(): string;
}
