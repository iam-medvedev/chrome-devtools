import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import type { ChangeManager } from './ChangeManager.js';
/**
 * Injects Freestyler extension functions in to the isolated world.
 */
export declare class ExtensionScope {
    #private;
    constructor(changes: ChangeManager, agentId: string);
    get target(): SDK.Target.Target;
    get frameId(): Protocol.Page.FrameId;
    install(): Promise<void>;
    uninstall(): Promise<void>;
    static getSelectorForRule(matchedStyles: SDK.CSSMatchedStyles.CSSMatchedStyles): string;
    static getSelectorForNode(node: SDK.DOMModel.DOMNode): string;
}
