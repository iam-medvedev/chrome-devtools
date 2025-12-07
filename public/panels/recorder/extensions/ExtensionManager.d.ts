import * as Common from '../../../core/common/common.js';
import * as PanelCommon from '../../common/common.js';
export interface Extension {
    getName(): string;
    getMediaType(): string | undefined;
    stringify(recording: Object): Promise<string>;
    stringifyStep(step: Object): Promise<string>;
    getCapabilities(): Array<'replay' | 'export'>;
    replay(recording: Object): void;
}
export declare class ExtensionManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    static instance(): ExtensionManager;
    constructor();
    attach(): void;
    detach(): void;
    extensions(): Extension[];
    getView(descriptorId: string): PanelCommon.ExtensionIframe.ExtensionIframe;
}
export declare const enum Events {
    EXTENSIONS_UPDATED = "extensionsUpdated"
}
export interface EventTypes {
    [Events.EXTENSIONS_UPDATED]: Extension[];
}
