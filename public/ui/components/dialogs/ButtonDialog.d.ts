import type * as Buttons from '../../../ui/components/buttons/buttons.js';
import { DialogHorizontalAlignment, DialogVerticalPosition } from './Dialog.js';
export interface ButtonDialogData {
    openOnRender?: boolean;
    jslogContext?: string;
    variant: Buttons.Button.Variant.PRIMARY_TOOLBAR | Buttons.Button.Variant.TOOLBAR | Buttons.Button.Variant.ICON;
    iconName: string;
    disabled?: boolean;
    iconTitle?: string;
    position?: DialogVerticalPosition;
    horizontalAlignment?: DialogHorizontalAlignment;
    closeOnESC?: boolean;
    closeOnScroll?: boolean;
    closeButton?: boolean;
    dialogTitle: string;
}
export declare class ButtonDialog extends HTMLElement {
    #private;
    set data(data: ButtonDialogData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-button-dialog': ButtonDialog;
    }
}
