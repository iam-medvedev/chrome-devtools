import type * as Platform from '../../core/platform/platform.js';
import { VBox } from './Widget.js';
export declare class EmptyWidget extends VBox {
    #private;
    constructor(header: string, text: string);
    appendLink(link: Platform.DevToolsPath.UrlString): HTMLElement;
    set text(text: string);
    set header(header: string);
    wasShown(): void;
}
