export declare function _executeTestScript(): Promise<void>;
/**
 * @implements {SDK.TargetManager.Observer}
 */
export declare class _TestObserver {
    /**
     * @override
     * @param {!SDK.Target.Target} target
     */
    targetAdded(target: any): void;
    /**
     * @override
     * @param {!SDK.Target.Target} target
     */
    targetRemoved(target: any): void;
}
declare const globalTestRunner: any;
export { globalTestRunner as TestRunner };
