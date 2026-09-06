import * as SDK from '../../core/sdk/sdk.js';
import * as TestRunner from './TestRunner.js';
export declare function _executeTestScript(): Promise<void>;
export declare class _TestObserver implements SDK.TargetManager.Observer {
    /**
     * @override
     * @param target
     */
    targetAdded(target: SDK.Target.Target): void;
    /**
     * @override
     * @param target
     */
    targetRemoved(target: SDK.Target.Target): void;
}
declare const globalTestRunner: typeof TestRunner;
export { globalTestRunner as TestRunner };
