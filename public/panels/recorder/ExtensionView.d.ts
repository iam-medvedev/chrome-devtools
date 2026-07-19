import type * as PublicExtensions from '../../models/extensions/extensions.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    descriptor: PublicExtensions.RecorderPluginManager.ViewDescriptor;
    iframe: HTMLElement;
}
export interface ViewOutput {
    closeView: () => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ExtensionView extends UI.Widget.VBox {
    #private;
    set onClose(callback: () => void);
    constructor(element?: HTMLElement, view?: View);
    get descriptor(): PublicExtensions.RecorderPluginManager.ViewDescriptor | undefined;
    set descriptor(descriptor: PublicExtensions.RecorderPluginManager.ViewDescriptor | undefined);
    willHide(): void;
    performUpdate(): void;
}
