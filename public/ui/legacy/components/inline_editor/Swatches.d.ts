import * as IconButton from '../../../components/icon_button/icon_button.js';
import type { CSSShadowModel } from './CSSShadowEditor.js';
export declare class BezierSwatch extends HTMLElement {
    #private;
    constructor();
    static create(): BezierSwatch;
    bezierText(): string;
    setBezierText(text: string): void;
    hideText(hide: boolean): void;
    iconElement(): IconButton.Icon.Icon;
}
export declare class CSSShadowSwatch extends HTMLElement {
    #private;
    constructor(model: CSSShadowModel);
    model(): CSSShadowModel;
    iconElement(): IconButton.Icon.Icon;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-bezier-swatch': BezierSwatch;
        'css-shadow-swatch': CSSShadowSwatch;
    }
}
