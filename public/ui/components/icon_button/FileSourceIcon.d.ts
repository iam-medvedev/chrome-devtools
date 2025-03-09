import './IconButton.js';
export interface FileSourceIconData {
    contentType?: string;
    hasDotBadge?: boolean;
    isDotPurple?: boolean;
    width?: number;
    height?: number;
}
export declare class FileSourceIcon extends HTMLElement {
    #private;
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
