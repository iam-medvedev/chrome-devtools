/**
 * @file using private properties isn't a Closure violation in tests.
 */
/**
 * @returns
 */
export declare function isDebugTest(): boolean;
/**
 * This monkey patches console functions in DevTools context so the console
 * messages are shown in the right places, instead of having all of the console
 * messages printed at the top of the test expectation file (default behavior).
 */
export declare function _printDevToolsConsole(): void;
export declare function setInnerResult(updatedInnerResult: any): void;
/**
 * @param text
 */
export declare function addResult(text: any): void;
export declare function setInnerCompleteTest(updatedInnerCompleteTest: any): void;
export declare function completeTest(): void;
/**
 * @param textArray
 */
export declare function addResults(textArray: any): void;
/**
 * @param tests
 */
export declare function runTests(tests: any): void;
/**
 * @param receiver
 * @param methodName
 * @param override
 * @param opt_sticky
 */
export declare function addSniffer(receiver: any, methodName: any, override: any, opt_sticky: any): void;
/**
 * @param receiver
 * @param methodName
 * @returns
 */
export declare function addSnifferPromise(receiver: any, methodName: any): Promise<unknown>;
/**
 * @param textNode
 * @param start
 * @param end
 * @returns
 */
export declare function selectTextInTextNode(textNode: any, start: any, end: any): any;
/**
 * @param panel
 * @returns
 */
export declare function showPanel(panel: any): Promise<void>;
/**
 * @param key
 * @param ctrlKey
 * @param altKey
 * @param shiftKey
 * @param metaKey
 * @returns
 */
export declare function createKeyEvent(key: any, ctrlKey: any, altKey: any, shiftKey: any, metaKey: any): KeyboardEvent;
/**
 * Wraps a test function with an exception filter. Does not work
 * correctly for async functions; use safeAsyncWrap instead.
 * @param func
 * @param onexception
 * @returns
 */
export declare function safeWrap(func: any, onexception: any): () => any;
/**
 * @param node
 * @returns
 */
export declare function textContentWithLineBreaks(node: any): string;
/**
 * @param node
 * @returns
 */
export declare function textContentWithLineBreaksTrimmed(node: any): string;
/**
 * @param node
 * @returns
 */
export declare function textContentWithoutStyles(node: any): string;
/**
 * @param code
 * @returns
 */
export declare function evaluateInPageRemoteObject(code: any): Promise<any>;
/**
 * @param code
 * @param callback
 */
export declare function evaluateInPage(code: any, callback: any): Promise<void>;
/**
 * @param code
 * @returns
 *
 */
export declare function _evaluateInPage(code: any): Promise<any>;
/**
 * Doesn't append sourceURL to snippets evaluated in inspected page
 * to avoid churning test expectations
 * @param code
 * @param userGesture
 * @returns
 */
export declare function evaluateInPageAnonymously(code: any, userGesture: any): Promise<any>;
/**
 * @param code
 * @returns
 */
export declare function evaluateInPagePromise(code: any): Promise<unknown>;
/**
 * @param code
 * @returns
 */
export declare function evaluateInPageAsync(code: any): Promise<any>;
/**
 * @param name
 * @param args
 * @returns
 */
export declare function callFunctionInPageAsync(name: any, args: any): Promise<any>;
/**
 * @param code
 * @param userGesture
 */
export declare function evaluateInPageWithTimeout(code: any, userGesture: any): void;
/**
 * @param func
 * @param callback
 */
export declare function evaluateFunctionInOverlay(func: any, callback: any): void;
/**
 * @param passCondition
 * @param failureText
 */
export declare function check(passCondition: any, failureText: any): void;
/**
 * @param callback
 */
export declare function deprecatedRunAfterPendingDispatches(callback?: any): void;
/**
 * This ensures a base tag is set so all DOM references
 * are relative to the test file and not the inspected page
 * (i.e. http/tests/devtools/resources/inspected-page.html).
 * @param html
 * @returns
 */
export declare function loadHTML(html: any): Promise<any>;
/**
 * @param path
 * @returns
 */
export declare function addScriptTag(path: any): Promise<any>;
/**
 * @param path
 * @returns
 */
export declare function addStylesheetTag(path: any): Promise<any>;
/**
 * NOTE you should manually ensure the path is correct. There
 * is no error event triggered if it is incorrect, and this is
 * in line with the standard (crbug 365457).
 * @param path
 * @param options
 * @returns
 */
export declare function addIframe(path: any, options?: {}): Promise<any>;
/**
 * The old test framework executed certain snippets in the inspected page
 * context as part of loading a test helper file.
 *
 * This is deprecated because:
 * 1) it makes the testing API less intuitive (need to read the various *TestRunner.js
 * files to know which helper functions are available in the inspected page).
 * 2) it complicates the test framework's module loading process.
 *
 * In most cases, this is used to set up inspected page functions (e.g. makeSimpleXHR)
 * which should become a *TestRunner method (e.g. NetworkTestRunner.makeSimpleXHR)
 * that calls evaluateInPageAnonymously(...).
 * @param code
 */
export declare function deprecatedInitAsync(code: any): Promise<void>;
/**
 * @param title
 */
export declare function markStep(title: any): void;
export declare function startDumpingProtocolMessages(): void;
/**
 * @param url
 * @param content
 * @param frame
 */
export declare function addScriptForFrame(url: any, content: any, frame: any): void;
export declare const formatters: {
    /**
     * @param value
     * @returns
     */
    formatAsTypeName(value: any): string;
    /**
     * @param value
     * @returns
     */
    formatAsTypeNameOrNull(value: any): string;
    /**
     * @param value
     * @returns
     */
    formatAsRecentTime(value: any): string | Date;
    /**
     * @param value
     * @returns
     */
    formatAsURL(value: any): any;
    /**
     * @param value
     * @returns
     */
    formatAsDescription(value: any): any;
};
/**
 * @param object
 * @param customFormatters
 * @param prefix
 * @param firstLinePrefix
 */
export declare function addObject(object: any, customFormatters: any, prefix: any, firstLinePrefix: any): void;
/**
 * @param array
 * @param customFormatters
 * @param prefix
 * @param firstLinePrefix
 */
export declare function addArray(array: any, customFormatters: any, prefix: any, firstLinePrefix: any): void;
/**
 * @param node
 */
export declare function dumpDeepInnerHTML(node: any): void;
/**
 * @param node
 * @returns
 */
export declare function deepTextContent(node: any): any;
/**
 * @param value
 * @param customFormatters
 * @param prefix
 * @param prefixWithName
 */
export declare function dump(value: any, customFormatters: any, prefix: any, prefixWithName: any): void;
/**
 * @param eventName
 * @param obj
 * @param condition
 * @returns
 */
export declare function waitForEvent(eventName: any, obj: any, condition: any): Promise<unknown>;
/**
 * @param filter
 * @returns
 */
export declare function waitForTarget(filter: any): Promise<unknown>;
/**
 * @param targetToRemove
 * @returns
 */
export declare function waitForTargetRemoved(targetToRemove: any): Promise<unknown>;
/**
 * @param runtimeModel
 * @returns
 */
export declare function waitForExecutionContext(runtimeModel: any): any;
/**
 * @param context
 * @returns
 */
export declare function waitForExecutionContextDestroyed(context: any): Promise<unknown>;
/**
 * @param a
 * @param b
 * @param message
 */
export declare function assertGreaterOrEqual(a: any, b: any, message: any): void;
/**
 * @param url
 * @param callback
 */
export declare function navigate(url: any, callback: any): void;
/**
 * @returns
 */
export declare function navigatePromise(url: any): Promise<unknown>;
export declare function _pageNavigated(): void;
/**
 * @param callback
 */
export declare function hardReloadPage(callback: any): void;
/**
 * @param callback
 */
export declare function reloadPage(callback: any): void;
/**
 * @param injectedScript
 * @param callback
 */
export declare function reloadPageWithInjectedScript(injectedScript: any, callback: any): void;
/**
 * @returns
 */
export declare function reloadPagePromise(): Promise<unknown>;
/**
 * @param hardReload
 * @param injectedScript
 * @param callback
 */
export declare function _innerReloadPage(hardReload: any, injectedScript: any, callback: any): void;
export declare function pageLoaded(): void;
export declare function _handlePageLoaded(): Promise<void>;
/**
 * @param callback
 */
export declare function waitForPageLoad(callback: any): void;
/**
 * @param callback
 */
export declare function runWhenPageLoads(callback: any): void;
/**
 * @param testSuite
 */
export declare function runTestSuite(testSuite: any): void;
/**
 * @param testSuite
 */
export declare function runAsyncTestSuite(testSuite: any): Promise<void>;
/**
 * @param expected
 * @param found
 * @param message
 */
export declare function assertEquals(expected: any, found: any, message: any): void;
/**
 * @param found
 * @param message
 */
export declare function assertTrue(found: any, message: any): void;
/**
 * @param receiver
 * @param methodName
 * @param override
 * @param opt_sticky
 * @returns
 */
export declare function override(receiver: any, methodName: any, override: any, opt_sticky: any): any;
/**
 * @param text
 * @returns
 */
export declare function clearSpecificInfoFromStackFrames(text: any): any;
export declare function hideInspectorView(): void;
/**
 * @returns
 */
export declare function mainFrame(): any;
export declare class StringOutputStream {
    callback: (data: string) => void;
    buffer: string;
    /**
     * @param callback
     */
    constructor(callback: (data: string) => void);
    /**
     * @param fileName
     * @returns
     */
    open(fileName: string): Promise<boolean>;
    /**
     * @param chunk
     */
    write(chunk: string): Promise<void>;
    close(): Promise<void>;
}
export declare class MockSetting<V> {
    value: V;
    /**
     * @param value
     */
    constructor(value: V);
    /**
     * @returns
     */
    get(): V;
    /**
     * @param value
     */
    set(value: V): void;
}
/**
 * @param urlSuffix
 * @param projectType
 * @returns
 */
export declare function waitForUISourceCode(urlSuffix: any, projectType: any): Promise<unknown>;
/**
 * @param callback
 */
export declare function waitForUISourceCodeRemoved(callback: any): void;
/**
 * @param url
 * @returns
 */
export declare function url(url?: string): string;
/**
 * @param str
 * @param mimeType
 * @returns
 */
export declare function dumpSyntaxHighlight(str: any, mimeType: any): Promise<void>;
/**
 *
 * @param inputString
 * @returns
 */
export declare const findLineEndingIndexes: (inputString: any) => any[];
/**
 * @param querySelector
 */
export declare function dumpInspectedPageElementText(querySelector: any): Promise<void>;
/**
 * This method blocks until all currently queued live location update handlers are done.
 *
 * Creating and updating live locations causes the update handler of each live location
 * to run. These update handlers are potentially asynchronous and usually cause re-rendering or
 * UI updates. Web tests then check for these updates.
 * To give tests more control, waitForPendingLiveLocationUpdates returns a promise that resolves
 * once all currently-pending updates (at call time) are completed.
 */
export declare function waitForPendingLiveLocationUpdates(): Promise<void>;
