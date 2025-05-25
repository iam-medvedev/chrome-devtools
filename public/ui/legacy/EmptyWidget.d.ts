import type * as Platform from '../../core/platform/platform.js';
import { VBox } from './Widget.js';
export declare class EmptyWidget extends VBox {
    #private;
    constructor(header: string, text: string);
    set link(link: Platform.DevToolsPath.UrlString | undefined | null);
    set text(text: string);
    set header(header: string);
}
