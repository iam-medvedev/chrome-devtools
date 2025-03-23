import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import type * as Diff from '../../third_party/diff/diff.js';
import * as UI from '../../ui/legacy/legacy.js';
interface SingleDiffViewInput {
    fileName: string;
    fileUrl: string;
    mimeType: string;
    icon: HTMLElement;
    diff: Diff.Diff.DiffArray;
    copied: boolean;
    onCopy: (fileUrl: string, diff: Diff.Diff.DiffArray) => void;
    onFileNameClick: (fileUrl: string) => void;
}
export interface ViewInput {
    singleDiffViewInputs: SingleDiffViewInput[];
}
type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare class CombinedDiffView extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    willHide(): void;
    set workspaceDiff(workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl);
    performUpdate(): Promise<void>;
}
export {};
