import '../../ui/components/markdown_view/markdown_view.js';
import type * as Platform from '../../core/platform/platform.js';
import * as Marked from '../../third_party/marked/marked.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type ReleaseNote, VideoType } from './ReleaseNoteText.js';
export declare const WHATS_NEW_THUMBNAIL: Platform.DevToolsPath.RawPathString;
export declare const DEVTOOLS_TIPS_THUMBNAIL: Platform.DevToolsPath.RawPathString;
export declare const GENERAL_THUMBNAIL: Platform.DevToolsPath.RawPathString;
export interface ViewInput {
    markdownContent: Marked.Marked.Token[][];
    getReleaseNote: () => ReleaseNote;
    openNewTab: (link: string) => void;
    getThumbnailPath: (type: VideoType) => Platform.DevToolsPath.UrlString;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export type ViewOutput = unknown;
export declare function getMarkdownContent(): Promise<Marked.Marked.Token[][]>;
export declare class ReleaseNoteView extends UI.Panel.Panel {
    #private;
    constructor(view?: View);
    static getFileContent(): Promise<string>;
    performUpdate(): Promise<void>;
}
