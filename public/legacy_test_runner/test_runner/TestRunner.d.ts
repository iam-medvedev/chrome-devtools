import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
/**
 * @file using private properties isn't a Closure violation in tests.
 */
/**
 * @returns {boolean}
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
 * @param {*} text
 */
export declare function addResult(text: any): void;
export declare function setInnerCompleteTest(updatedInnerCompleteTest: any): void;
export declare function completeTest(): void;
/**
 * @param {!Array<string>} textArray
 */
export declare function addResults(textArray: Array<string>): void;
/**
 * @param {!Array<function()>} tests
 */
export declare function runTests(tests: Array<Function>): void;
/**
 * @param {!Object} receiver
 * @param {string} methodName
 * @param {!Function} override
 * @param {boolean=} opt_sticky
 */
export declare function addSniffer(receiver: Object, methodName: string, override: Function, opt_sticky?: boolean | undefined): void;
/**
 * @param {!Object} receiver
 * @param {string} methodName
 * @returns {!Promise<*>}
 */
export declare function addSnifferPromise(receiver: Object, methodName: string): Promise<any>;
/**
 * @param {Text} textNode
 * @param {number=} start
 * @param {number=} end
 * @returns {Text}
 */
export declare function selectTextInTextNode(textNode: Text, start?: number | undefined, end?: number | undefined): Text;
/**
 * @param {string} panel
 * @returns {!Promise.<?UI.Panel.Panel>}
 */
export declare function showPanel(panel: string): Promise<UI.Panel.Panel | null>;
/**
 * @param {string} key
 * @param {boolean=} ctrlKey
 * @param {boolean=} altKey
 * @param {boolean=} shiftKey
 * @param {boolean=} metaKey
 * @returns {!KeyboardEvent}
 */
export declare function createKeyEvent(key: string, ctrlKey?: boolean | undefined, altKey?: boolean | undefined, shiftKey?: boolean | undefined, metaKey?: boolean | undefined): KeyboardEvent;
/**
 * Wraps a test function with an exception filter. Does not work
 * correctly for async functions; use safeAsyncWrap instead.
 * @param {!Function|undefined} func
 * @param {!Function=} onexception
 * @returns {!Function}
 */
export declare function safeWrap(func: Function | undefined, onexception?: Function | undefined): Function;
/**
 * @param {!Node} node
 * @returns {string}
 */
export declare function textContentWithLineBreaks(node: Node): string;
/**
 * @param {!Node} node
 * @returns {string}
 */
export declare function textContentWithLineBreaksTrimmed(node: Node): string;
/**
 * @param {!Node} node
 * @returns {string}
 */
export declare function textContentWithoutStyles(node: Node): string;
/**
 * @param {string} code
 * @returns {!Promise<*>}
 */
export declare function evaluateInPageRemoteObject(code: string): Promise<any>;
/**
 * @param {string} code
 * @param {function(*, !Protocol.Runtime.ExceptionDetails=):void} callback
 */
export declare function evaluateInPage(code: string, callback: Function): Promise<void>;
/**
 * @param {string} code
 * @returns {!Promise<undefined|{response: (!SDK.RuntimeModel.RemoteObject|undefined),
 *   exceptionDetails: (!Protocol.Runtime.ExceptionDetails|undefined)}>}
 */
export declare function _evaluateInPage(code: string): Promise<undefined | {
    response: (SDK.RuntimeModel.RemoteObject | undefined);
    exceptionDetails: (Protocol.Runtime.ExceptionDetails | undefined);
}>;
/**
 * Doesn't append sourceURL to snippets evaluated in inspected page
 * to avoid churning test expectations
 * @param {string} code
 * @param {boolean=} userGesture
 * @returns {!Promise<*>}
 */
export declare function evaluateInPageAnonymously(code: string, userGesture?: boolean | undefined): Promise<any>;
/**
 * @param {string} code
 * @returns {!Promise<*>}
 */
export declare function evaluateInPagePromise(code: string): Promise<any>;
/**
 * @param {string} code
 * @returns {!Promise<*>}
 */
export declare function evaluateInPageAsync(code: string): Promise<any>;
/**
 * @param {string} name
 * @param {!Array<*>} args
 * @returns {!Promise<*>}
 */
export declare function callFunctionInPageAsync(name: string, args: Array<any>): Promise<any>;
/**
 * @param {string} code
 * @param {boolean=} userGesture
 */
export declare function evaluateInPageWithTimeout(code: string, userGesture?: boolean | undefined): void;
/**
 * @param {function():*} func
 * @param {function(*):void} callback
 */
export declare function evaluateFunctionInOverlay(func: Function, callback: Function): void;
/**
 * @param {boolean} passCondition
 * @param {string} failureText
 */
export declare function check(passCondition: boolean, failureText: string): void;
/**
 * @param {!Function} callback
 */
export declare function deprecatedRunAfterPendingDispatches(callback: Function): void;
/**
 * This ensures a base tag is set so all DOM references
 * are relative to the test file and not the inspected page
 * (i.e. http/tests/devtools/resources/inspected-page.html).
 * @param {string} html
 * @returns {!Promise<*>}
 */
export declare function loadHTML(html: string): Promise<any>;
/**
 * @param {string} path
 * @returns {!Promise<*>}
 */
export declare function addScriptTag(path: string): Promise<any>;
/**
 * @param {string} path
 * @returns {!Promise<*>}
 */
export declare function addStylesheetTag(path: string): Promise<any>;
/**
 * NOTE you should manually ensure the path is correct. There
 * is no error event triggered if it is incorrect, and this is
 * in line with the standard (crbug 365457).
 * @param {string} path
 * @param {!Object|undefined} options
 * @returns {!Promise<*>}
 */
export declare function addIframe(path: string, options?: Object | undefined): Promise<any>;
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
 * @param {string} code
 */
export declare function deprecatedInitAsync(code: string): Promise<void>;
/**
 * @param {string} title
 */
export declare function markStep(title: string): void;
export declare function startDumpingProtocolMessages(): void;
/**
 * @param {string} url
 * @param {string} content
 * @param {!SDK.ResourceTreeModel.ResourceTreeFrame} frame
 */
export declare function addScriptForFrame(url: string, content: string, frame: SDK.ResourceTreeModel.ResourceTreeFrame): void;
export declare const formatters: {
    /**
     * @param {*} value
     * @returns {string}
     */
    formatAsTypeName(value: any): string;
    /**
     * @param {*} value
     * @returns {string}
     */
    formatAsTypeNameOrNull(value: any): string;
    /**
     * @param {*} value
     * @returns {string|!Date}
     */
    formatAsRecentTime(value: any): string | Date;
    /**
     * @param {string} value
     * @returns {string}
     */
    formatAsURL(value: string): string;
    /**
     * @param {string} value
     * @returns {string}
     */
    formatAsDescription(value: string): string;
};
/**
 * @param {!Object} object
 * @param {!TestRunner.CustomFormatters=} customFormatters
 * @param {string=} prefix
 * @param {string=} firstLinePrefix
 */
export declare function addObject(object: Object, customFormatters?: TestRunner.CustomFormatters | undefined, prefix?: string | undefined, firstLinePrefix?: string | undefined): void;
/**
 * @param {!Array} array
 * @param {!TestRunner.CustomFormatters=} customFormatters
 * @param {string=} prefix
 * @param {string=} firstLinePrefix
 */
export declare function addArray(array: any[], customFormatters?: TestRunner.CustomFormatters | undefined, prefix?: string | undefined, firstLinePrefix?: string | undefined): void;
/**
 * @param {!Node} node
 */
export declare function dumpDeepInnerHTML(node: Node): void;
/**
 * @param {!Node} node
 * @returns {string}
 */
export declare function deepTextContent(node: Node): string;
/**
 * @param {*} value
 * @param {!TestRunner.CustomFormatters=} customFormatters
 * @param {string=} prefix
 * @param {string=} prefixWithName
 */
export declare function dump(value: any, customFormatters?: TestRunner.CustomFormatters | undefined, prefix?: string | undefined, prefixWithName?: string | undefined): void;
/**
 * @param {symbol} eventName
 * @param {!Common.ObjectWrapper.ObjectWrapper} obj
 * @param {function(?):boolean=} condition
 * @returns {!Promise}
 */
export declare function waitForEvent(eventName: symbol, obj: Common.ObjectWrapper.ObjectWrapper<any>, condition: Function): Promise<any>;
/**
 * @param {function(!SDK.Target.Target):boolean} filter
 * @returns {!Promise<!SDK.Target.Target>}
 */
export declare function waitForTarget(filter: Function): Promise<SDK.Target.Target>;
/**
 * @param {!SDK.Target.Target} targetToRemove
 * @returns {!Promise<!SDK.Target.Target>}
 */
export declare function waitForTargetRemoved(targetToRemove: SDK.Target.Target): Promise<SDK.Target.Target>;
/**
 * @param {!SDK.RuntimeModel.RuntimeModel} runtimeModel
 * @returns {!Promise}
 */
export declare function waitForExecutionContext(runtimeModel: SDK.RuntimeModel.RuntimeModel): Promise<any>;
/**
 * @param {!SDK.RuntimeModel.ExecutionContext} context
 * @returns {!Promise}
 */
export declare function waitForExecutionContextDestroyed(context: SDK.RuntimeModel.ExecutionContext): Promise<any>;
/**
 * @param {number} a
 * @param {number} b
 * @param {string=} message
 */
export declare function assertGreaterOrEqual(a: number, b: number, message?: string | undefined): void;
/**
 * @param {string} url
 * @param {function():void} callback
 */
export declare function navigate(url: string, callback: Function): void;
/**
 * @returns {!Promise}
 */
export declare function navigatePromise(url: any): Promise<any>;
export declare function _pageNavigated(): void;
/**
 * @param {function():void} callback
 */
export declare function hardReloadPage(callback: Function): void;
/**
 * @param {function():void} callback
 */
export declare function reloadPage(callback: Function): void;
/**
 * @param {(string|undefined)} injectedScript
 * @param {function():void} callback
 */
export declare function reloadPageWithInjectedScript(injectedScript: (string | undefined), callback: Function): void;
/**
 * @returns {!Promise}
 */
export declare function reloadPagePromise(): Promise<any>;
/**
 * @param {boolean} hardReload
 * @param {(string|undefined)} injectedScript
 * @param {function():void} callback
 */
export declare function _innerReloadPage(hardReload: boolean, injectedScript: (string | undefined), callback: Function): void;
export declare function pageLoaded(): void;
export declare function _handlePageLoaded(): Promise<void>;
/**
 * @param {function():void} callback
 */
export declare function waitForPageLoad(callback: Function): void;
/**
 * @param {function():void} callback
 */
export declare function runWhenPageLoads(callback: Function): void;
/**
 * @param {!Array<function(function():void)>} testSuite
 */
export declare function runTestSuite(testSuite: Array<Function>): void;
/**
 * @param {!Array<function():Promise<*>>} testSuite
 */
export declare function runAsyncTestSuite(testSuite: Array<Function>): Promise<void>;
/**
 * @param {*} expected
 * @param {*} found
 * @param {string} message
 */
export declare function assertEquals(expected: any, found: any, message: string): void;
/**
 * @param {*} found
 * @param {string} message
 */
export declare function assertTrue(found: any, message: string): void;
/**
 * @param {!Object} receiver
 * @param {string} methodName
 * @param {!Function} override
 * @param {boolean=} opt_sticky
 * @returns {!Function}
 */
export declare function override(receiver: Object, methodName: string, override: Function, opt_sticky?: boolean | undefined): Function;
/**
 * @param {string} text
 * @returns {string}
 */
export declare function clearSpecificInfoFromStackFrames(text: string): string;
export declare function hideInspectorView(): void;
/**
 * @returns {?SDK.ResourceTreeModel.ResourceTreeFrame}
 */
export declare function mainFrame(): SDK.ResourceTreeModel.ResourceTreeFrame | null;
export declare class StringOutputStream {
    callback: Function;
    buffer: string;
    /**
     * @param {function(string):void} callback
     */
    constructor(callback: Function);
    /**
     * @param {string} fileName
     * @returns {!Promise<boolean>}
     */
    open(fileName: string): Promise<boolean>;
    /**
     * @param {string} chunk
     */
    write(chunk: string): Promise<void>;
    close(): Promise<void>;
}
/**
 * @template V
 */
export declare class MockSetting<V> {
    value: V;
    /**
     * @param {V} value
     */
    constructor(value: V);
    /**
     * @returns {V}
     */
    get(): V;
    /**
     * @param {V} value
     */
    set(value: V): void;
}
/**
 * @param {string} urlSuffix
 * @param {!Workspace.Workspace.projectTypes=} projectType
 * @returns {!Promise}
 */
export declare function waitForUISourceCode(urlSuffix: string, projectType?: Workspace.Workspace.projectTypes | undefined): Promise<any>;
/**
 * @param {!Function} callback
 */
export declare function waitForUISourceCodeRemoved(callback: Function): void;
/**
 * @param {string=} url
 * @returns {string}
 */
export declare function url(url?: string | undefined): string;
/**
 * @param {string} str
 * @param {string} mimeType
 * @returns {!Promise.<undefined>}
 */
export declare function dumpSyntaxHighlight(str: string, mimeType: string): Promise<undefined>;
/**
 *
 * @param {string} inputString
 * @returns {!Array.<number>}
 */
export declare const findLineEndingIndexes: (inputString: string) => Array<number>;
/**
 * @param {string} querySelector
 */
export declare function dumpInspectedPageElementText(querySelector: string): Promise<void>;
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
