import * as Common from '../../core/common/common.js';
import { EmulationModel } from './EmulationModel.js';
import { type SDKModelObserver } from './TargetManager.js';
export declare class CPUThrottlingManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements SDKModelObserver<EmulationModel> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): CPUThrottlingManager;
    cpuThrottlingRate(): number;
    setCPUThrottlingRate(rate: number): void;
    setHardwareConcurrency(concurrency: number): void;
    hasPrimaryPageTargetSet(): boolean;
    getHardwareConcurrency(): Promise<number>;
    modelAdded(emulationModel: EmulationModel): void;
    modelRemoved(_emulationModel: EmulationModel): void;
}
export declare const enum Events {
    RATE_CHANGED = "RateChanged",
    HARDWARE_CONCURRENCY_CHANGED = "HardwareConcurrencyChanged"
}
export type EventTypes = {
    [Events.RATE_CHANGED]: number;
    [Events.HARDWARE_CONCURRENCY_CHANGED]: number;
};
export declare function throttlingManager(): CPUThrottlingManager;
export declare enum CPUThrottlingRates {
    NO_THROTTLING = 1,
    MidTierMobile = 4,
    LowEndMobile = 6,
    EXTRA_SLOW = 20
}
