import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    substitutions: Node[][];
    evaluations: Node[][];
    finalResult: Node[] | undefined;
    onToggle: () => void;
}
export interface ViewOutput {
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CSSValueTraceView extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    showTrace(substitutions: Node[][], evaluations: Node[][], finalResult: Node[] | undefined): void;
    performUpdate(): void;
}
