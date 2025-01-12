import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
export interface Change {
    selector: string;
    className: string;
    styles: Record<string, string>;
}
export declare const AI_ASSISTANCE_CSS_CLASS_NAME = "ai-style-change";
/**
 * Keeps track of changes done by the Styling agent. Currently, it is
 * primarily for stylesheet generation based on all changes.
 */
export declare class ChangeManager {
    #private;
    clear(): Promise<void>;
    addChange(cssModel: SDK.CSSModel.CSSModel, frameId: Protocol.Page.FrameId, change: Change): Promise<void>;
    buildChanges(changes: Array<Change>): string;
}
