import * as Marked from '../../third_party/marked/marked.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type ReleaseNote } from './ReleaseNoteText.js';
export interface ViewInput {
    markdownContent: Marked.Marked.Token[][];
    getReleaseNote: () => ReleaseNote;
    openNewTab: (link: string) => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export type ViewOutput = unknown;
export declare function getMarkdownContent(): Promise<Marked.Marked.Token[][]>;
export declare class ReleaseNoteView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    static getFileContent(): Promise<string>;
    doUpdate(): Promise<void>;
    wasShown(): void;
}
