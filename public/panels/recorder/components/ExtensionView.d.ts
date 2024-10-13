import '../../../ui/legacy/legacy.js';
import '../../../ui/components/icon_button/icon_button.js';
import type * as PublicExtensions from '../../../models/extensions/extensions.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-recorder-extension-view': ExtensionView;
    }
    interface HTMLElementEventMap {
        recorderextensionviewclosed: ClosedEvent;
    }
}
export declare class ClosedEvent extends Event {
    static readonly eventName = "recorderextensionviewclosed";
    constructor();
}
export declare class ExtensionView extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    set descriptor(descriptor: PublicExtensions.RecorderPluginManager.ViewDescriptor);
}
