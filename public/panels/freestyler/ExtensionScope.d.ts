import { type ChangeManager } from './ChangeManager.js';
export declare const FREESTYLER_WORLD_NAME = "devtools_freestyler";
export declare const FREESTYLER_BINDING_NAME = "__freestyler";
/**
 * Injects Freestyler extension functions in to the isolated world.
 */
export declare class ExtensionScope {
    #private;
    constructor(changes: ChangeManager);
    install(): Promise<void>;
    uninstall(): Promise<void>;
}
