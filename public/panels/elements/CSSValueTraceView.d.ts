import type * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type MatchRenderer } from './PropertyRenderer.js';
export interface ViewInput {
    substitutions: Node[][];
    evaluations: Node[][];
    onToggle: () => void;
}
export interface ViewOutput {
    defaultFocusedElement?: Element;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CSSValueTraceView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    showTrace(property: SDK.CSSProperty.CSSProperty, subexpression: string | null, matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles, computedStyles: Map<string, string> | null, renderers: Array<MatchRenderer<SDK.CSSPropertyParser.Match>>, expandPercentagesInShorthands: boolean, shorthandPositionOffset: number): Promise<void>;
    performUpdate(): void;
}
