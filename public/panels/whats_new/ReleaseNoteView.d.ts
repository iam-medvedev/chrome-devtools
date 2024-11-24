import '../../ui/components/markdown_view/markdown_view.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class ReleaseNoteViewWrapper extends UI.Widget.VBox {
    releaseNoteElement: ReleaseNoteView;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): ReleaseNoteViewWrapper;
}
export declare class ReleaseNoteView extends HTMLElement {
    #private;
    connectedCallback(): void;
    static getFileContent(): Promise<string>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-release-note-view': ReleaseNoteView;
    }
}
