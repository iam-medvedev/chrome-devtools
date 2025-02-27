import * as Common from '../../core/common/common.js';
import type { ContextFlavorListener } from './ContextFlavorListener.js';
interface ConstructorFn<T> {
    new (...args: any[]): T;
}
export declare class Context {
    private readonly flavorsInternal;
    private readonly eventDispatchers;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): Context;
    static removeInstance(): void;
    setFlavor<T extends Object>(flavorType: ConstructorFn<T>, flavorValue: T | null): void;
    private dispatchFlavorChange;
    addFlavorChangeListener<T>(flavorType: ConstructorFn<T>, listener: (arg0: Common.EventTarget.EventTargetEvent<T>) => void, thisObject?: Object): void;
    removeFlavorChangeListener<T>(flavorType: ConstructorFn<T>, listener: (arg0: Common.EventTarget.EventTargetEvent<T>) => void, thisObject?: Object): void;
    flavor<T>(flavorType: ConstructorFn<T>): T | null;
    flavors(): Set<ConstructorFn<unknown>>;
}
declare const enum Events {
    FLAVOR_CHANGED = "FlavorChanged"
}
export interface EventTypes {
    [Events.FLAVOR_CHANGED]: any;
}
export declare function registerListener(registration: ContextFlavorListenerRegistration): void;
export interface ContextFlavorListenerRegistration {
    contextTypes: () => Function[];
    loadListener: () => Promise<ContextFlavorListener>;
}
export {};
