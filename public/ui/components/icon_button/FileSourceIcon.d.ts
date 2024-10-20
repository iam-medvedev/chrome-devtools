export interface FileSourceIconData {
    contentType?: string;
    hasDotBadge?: boolean;
    isDotPurple?: boolean;
}
export declare class FileSourceIcon extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    constructor(iconType: string);
    set data(data: FileSourceIconData);
    get data(): FileSourceIconData;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-file-source-icon': FileSourceIcon;
    }
}
