import { VBox } from './Widget.js';
export declare class ThrottledWidget extends VBox {
    private readonly updateThrottler;
    private updateWhenVisible;
    protected lastUpdatePromise: Promise<void>;
    constructor(useShadowDom?: boolean, timeout?: number);
    protected doUpdate(): Promise<void>;
    update(): void;
    get updateComplete(): Promise<boolean>;
    wasShown(): void;
}
