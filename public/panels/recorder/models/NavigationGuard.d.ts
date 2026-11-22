import type * as puppeteer from '../../../third_party/puppeteer/puppeteer.js';
import type { UserFlow } from './Schema.js';
export interface AllowedNavigations {
    /** Origins of the URLs that have a non-opaque origin (for example, http: and https:). */
    origins: Set<string>;
    /** Complete URLs that have an opaque origin (for example, data:). */
    urls: Set<string>;
}
/**
 * Collects the navigations that a replay of `flow` is allowed to make: all
 * URLs in the recording, plus `currentUrl` if an interactive step can run
 * before the first main-page navigate step.
 */
export declare function collectAllowedNavigations(flow: UserFlow, currentUrl: string): AllowedNavigations;
/**
 * Returns true if a step can send input to a subframe. A target that is not
 * 'main' is the URL of a popup or of an out-of-process iframe.
 */
export declare function hasSubframeSteps(flow: UserFlow): boolean;
export declare function isNavigationAllowed(url: string, allowed: AllowedNavigations): boolean;
/**
 * Stops a replay if a page commits a navigation to an origin that is not in
 * the recording. The guard pauses document responses with the Fetch domain.
 * It continues HTTP redirect hops and attachment downloads, because they do
 * not commit a document.
 */
export declare class NavigationGuard {
    #private;
    /**
     * @param onError The guard calls it each time it blocks a navigation or
     * cannot enable the interception.
     */
    constructor(flow: UserFlow, currentUrl: string, onError: () => void);
    /** The first error of the guard, if a navigation was blocked. */
    get error(): Error | undefined;
    /**
     * Resolves when the guard has an error or when `dispose()` is called. Use
     * it to stop a wait for an operation that the guard blocked.
     */
    get errorOrDisposePromise(): Promise<void>;
    /**
     * Enables the guard on all frames of `guardedPage`. The guard also checks
     * the URLs that the frames have now, if `checkExistingFrames` is true or if
     * a step can send input to the inspected page before the page navigates.
     * A later call with `checkExistingFrames` set to true does this check for a
     * page that has the guard already.
     */
    guardPage(guardedPage: puppeteer.Page, checkExistingFrames: boolean): Promise<void>;
    /**
     * Enables the guard on each page that has the URL `targetUrl` or that
     * contains a frame with this URL (for example, an OOPIF in a popup). Waits
     * for a target with this URL for `timeout` milliseconds at most. The wait
     * stops when the guard has an error or is disposed.
     */
    guardStepTarget(browser: puppeteer.Browser, targetUrl: string, timeout: number): Promise<void>;
    /** Disables the interception and removes all listeners. */
    dispose(): Promise<void>;
}
