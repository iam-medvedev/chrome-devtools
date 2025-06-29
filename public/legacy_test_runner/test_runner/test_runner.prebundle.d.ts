export declare function _executeTestScript(): Promise<void>;
/**
 * @implements {SDK.TargetManager.Observer}
 */
export declare class _TestObserver {
    /**
     * @param {!SDK.Target.Target} target
     * @override
     */
    targetAdded(target: any): void;
    /**
     * @param {!SDK.Target.Target} target
     * @override
     */
    targetRemoved(target: any): void;
}
declare const globalTestRunner: any;
export { globalTestRunner as TestRunner };
