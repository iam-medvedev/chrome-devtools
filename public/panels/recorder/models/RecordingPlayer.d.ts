import * as Common from '../../../core/common/common.js';
import type * as puppeteer from '../../../third_party/puppeteer/puppeteer.js';
import type { Step, UserFlow } from './Schema.js';
export declare const enum PlayRecordingSpeed {
    NORMAL = "normal",
    SLOW = "slow",
    VERY_SLOW = "very_slow",
    EXTREMELY_SLOW = "extremely_slow"
}
export declare const enum ReplayResult {
    FAILURE = "Failure",
    SUCCESS = "Success"
}
export declare const defaultTimeout = 5000;
export declare class RecordingPlayer extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    userFlow: UserFlow;
    speed: PlayRecordingSpeed;
    timeout: number;
    breakpointIndexes: Set<number>;
    steppingOver: boolean;
    aborted: boolean;
    abortPromise: Promise<void>;
    constructor(userFlow: UserFlow, { speed, breakpointIndexes, }: {
        speed: PlayRecordingSpeed;
        breakpointIndexes?: Set<number>;
    });
    static connectPuppeteer(): Promise<{
        page: puppeteer.Page;
        browser: puppeteer.Browser;
    }>;
    static disconnectPuppeteer(browser: puppeteer.Browser): Promise<void>;
    stop(): Promise<void>;
    abort(): void;
    disposeForTesting(): void;
    continue(): void;
    stepOver(): void;
    updateBreakpointIndexes(breakpointIndexes: Set<number>): void;
    play(): Promise<void>;
}
export declare const enum Events {
    ABORT = "Abort",
    DONE = "Done",
    STEP = "Step",
    STOP = "Stop",
    ERROR = "Error",
    CONTINUE = "Continue"
}
interface EventTypes {
    [Events.ABORT]: void;
    [Events.DONE]: void;
    [Events.STEP]: {
        step: Step;
        resolve: () => void;
    };
    [Events.STOP]: void;
    [Events.CONTINUE]: void;
    [Events.ERROR]: Error;
}
export {};
