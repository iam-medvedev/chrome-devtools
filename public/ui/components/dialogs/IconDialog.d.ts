import '../../../ui/components/icon_button/icon_button.js';
import './Dialog.js';
import type * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import type { DialogHorizontalAlignment, DialogVerticalPosition } from './Dialog.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-icon-dialog': IconDialog;
    }
}
export declare class ShowDialog extends Event {
    static readonly eventName = "showdialog";
    constructor();
}
export interface IconDialogData {
    iconData: IconButton.Icon.IconData;
    closeButton: boolean;
    position: DialogVerticalPosition;
    horizontalAlignment: DialogHorizontalAlignment;
    closeOnESC: boolean;
    closeOnScroll: boolean;
}
export declare class IconDialog extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: IconDialogData);
}
