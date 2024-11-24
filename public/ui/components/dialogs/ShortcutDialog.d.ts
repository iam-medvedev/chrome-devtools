import './ButtonDialog.js';
import type * as Platform from '../../../core/platform/platform.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-shortcut-dialog': ShortcutDialog;
    }
}
export interface Shortcut {
    title: string | Platform.UIString.LocalizedString;
    bindings: string[][];
}
export interface ShortcutDialogData {
    shortcuts: Shortcut[];
    open?: boolean;
}
export declare class ShortcutDialog extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: ShortcutDialogData);
    prependElement(element: HTMLElement): void;
}
