import * as Dialogs from '../../../ui/components/dialogs/dialogs.js';
export interface ExportTraceOptionsData {
    onExport: (config: {
        includeScriptContent: boolean;
        includeSourceMaps: boolean;
        addModifications: boolean;
        shouldCompress: boolean;
    }) => Promise<void>;
    buttonEnabled: boolean;
}
export type ExportTraceDialogState = Dialogs.Dialog.DialogState;
export interface ExportTraceOptionsState {
    dialogState: ExportTraceDialogState;
    includeAnnotations: boolean;
    includeScriptContent: boolean;
    includeSourceMaps: boolean;
    shouldCompress: boolean;
    displayAnnotationsCheckbox?: boolean;
    displayScriptContentCheckbox?: boolean;
    displaySourceMapsCheckbox?: boolean;
}
export declare class ExportTraceOptions extends HTMLElement {
    #private;
    set data(data: ExportTraceOptionsData);
    set state(state: ExportTraceOptionsState);
    get state(): Readonly<ExportTraceOptionsState>;
    updateContentVisibility(options: {
        annotationsExist: boolean;
    }): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-perf-export-trace-options': ExportTraceOptions;
    }
}
