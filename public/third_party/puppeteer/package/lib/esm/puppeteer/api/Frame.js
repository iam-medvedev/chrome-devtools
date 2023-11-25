/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import { EventEmitter } from '../common/EventEmitter.js';
import { getQueryHandlerAndSelector } from '../common/GetQueryHandler.js';
import { transposeIterableHandle } from '../common/HandleIterator.js';
import { LazyArg } from '../common/LazyArg.js';
import { getPageContent, importFSPromises, withSourcePuppeteerURLIfNone, } from '../common/util.js';
import { assert } from '../util/assert.js';
import { throwIfDisposed } from '../util/decorators.js';
import { FunctionLocator, NodeLocator, } from './locators/locators.js';
/**
 * We use symbols to prevent external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var FrameEvent;
(function (FrameEvent) {
    FrameEvent.FrameNavigated = Symbol('Frame.FrameNavigated');
    FrameEvent.FrameSwapped = Symbol('Frame.FrameSwapped');
    FrameEvent.LifecycleEvent = Symbol('Frame.LifecycleEvent');
    FrameEvent.FrameNavigatedWithinDocument = Symbol('Frame.FrameNavigatedWithinDocument');
    FrameEvent.FrameDetached = Symbol('Frame.FrameDetached');
    FrameEvent.FrameSwappedByActivation = Symbol('Frame.FrameSwappedByActivation');
})(FrameEvent || (FrameEvent = {}));
/**
 * @internal
 */
export const throwIfDetached = throwIfDisposed(frame => {
    return `Attempted to use detached Frame '${frame._id}'.`;
});
/**
 * Represents a DOM frame.
 *
 * To understand frames, you can think of frames as `<iframe>` elements. Just
 * like iframes, frames can be nested, and when JavaScript is executed in a
 * frame, the JavaScript does not effect frames inside the ambient frame the
 * JavaScript executes in.
 *
 * @example
 * At any point in time, {@link Page | pages} expose their current frame
 * tree via the {@link Page.mainFrame} and {@link Frame.childFrames} methods.
 *
 * @example
 * An example of dumping frame tree:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://www.google.com/chrome/browser/canary.html');
 *   dumpFrameTree(page.mainFrame(), '');
 *   await browser.close();
 *
 *   function dumpFrameTree(frame, indent) {
 *     console.log(indent + frame.url());
 *     for (const child of frame.childFrames()) {
 *       dumpFrameTree(child, indent + '  ');
 *     }
 *   }
 * })();
 * ```
 *
 * @example
 * An example of getting text from an iframe element:
 *
 * ```ts
 * const frame = page.frames().find(frame => frame.name() === 'myframe');
 * const text = await frame.$eval('.selector', element => element.textContent);
 * console.log(text);
 * ```
 *
 * @remarks
 * Frame lifecycles are controlled by three events that are all dispatched on
 * the parent {@link Frame.page | page}:
 *
 * - {@link PageEvent.FrameAttached}
 * - {@link PageEvent.FrameNavigated}
 * - {@link PageEvent.FrameDetached}
 *
 * @public
 */
let Frame = (() => {
    let _classSuper = EventEmitter;
    let _instanceExtraInitializers = [];
    let _frameElement_decorators;
    let _evaluateHandle_decorators;
    let _evaluate_decorators;
    let _locator_decorators;
    let _$_decorators;
    let _$$_decorators;
    let _$eval_decorators;
    let _$$eval_decorators;
    let _$x_decorators;
    let _waitForSelector_decorators;
    let _waitForXPath_decorators;
    let _waitForFunction_decorators;
    let _content_decorators;
    let _addScriptTag_decorators;
    let _addStyleTag_decorators;
    let _click_decorators;
    let _focus_decorators;
    let _hover_decorators;
    let _select_decorators;
    let _tap_decorators;
    let _type_decorators;
    let _title_decorators;
    return class Frame extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _frameElement_decorators = [throwIfDetached];
            _evaluateHandle_decorators = [throwIfDetached];
            _evaluate_decorators = [throwIfDetached];
            _locator_decorators = [throwIfDetached];
            _$_decorators = [throwIfDetached];
            _$$_decorators = [throwIfDetached];
            _$eval_decorators = [throwIfDetached];
            _$$eval_decorators = [throwIfDetached];
            _$x_decorators = [throwIfDetached];
            _waitForSelector_decorators = [throwIfDetached];
            _waitForXPath_decorators = [throwIfDetached];
            _waitForFunction_decorators = [throwIfDetached];
            _content_decorators = [throwIfDetached];
            _addScriptTag_decorators = [throwIfDetached];
            _addStyleTag_decorators = [throwIfDetached];
            _click_decorators = [throwIfDetached];
            _focus_decorators = [throwIfDetached];
            _hover_decorators = [throwIfDetached];
            _select_decorators = [throwIfDetached];
            _tap_decorators = [throwIfDetached];
            _type_decorators = [throwIfDetached];
            _title_decorators = [throwIfDetached];
            __esDecorate(this, null, _frameElement_decorators, { kind: "method", name: "frameElement", static: false, private: false, access: { has: obj => "frameElement" in obj, get: obj => obj.frameElement }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _evaluateHandle_decorators, { kind: "method", name: "evaluateHandle", static: false, private: false, access: { has: obj => "evaluateHandle" in obj, get: obj => obj.evaluateHandle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _evaluate_decorators, { kind: "method", name: "evaluate", static: false, private: false, access: { has: obj => "evaluate" in obj, get: obj => obj.evaluate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _locator_decorators, { kind: "method", name: "locator", static: false, private: false, access: { has: obj => "locator" in obj, get: obj => obj.locator }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _$_decorators, { kind: "method", name: "$", static: false, private: false, access: { has: obj => "$" in obj, get: obj => obj.$ }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _$$_decorators, { kind: "method", name: "$$", static: false, private: false, access: { has: obj => "$$" in obj, get: obj => obj.$$ }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _$eval_decorators, { kind: "method", name: "$eval", static: false, private: false, access: { has: obj => "$eval" in obj, get: obj => obj.$eval }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _$$eval_decorators, { kind: "method", name: "$$eval", static: false, private: false, access: { has: obj => "$$eval" in obj, get: obj => obj.$$eval }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _$x_decorators, { kind: "method", name: "$x", static: false, private: false, access: { has: obj => "$x" in obj, get: obj => obj.$x }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _waitForSelector_decorators, { kind: "method", name: "waitForSelector", static: false, private: false, access: { has: obj => "waitForSelector" in obj, get: obj => obj.waitForSelector }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _waitForXPath_decorators, { kind: "method", name: "waitForXPath", static: false, private: false, access: { has: obj => "waitForXPath" in obj, get: obj => obj.waitForXPath }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _waitForFunction_decorators, { kind: "method", name: "waitForFunction", static: false, private: false, access: { has: obj => "waitForFunction" in obj, get: obj => obj.waitForFunction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _content_decorators, { kind: "method", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addScriptTag_decorators, { kind: "method", name: "addScriptTag", static: false, private: false, access: { has: obj => "addScriptTag" in obj, get: obj => obj.addScriptTag }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addStyleTag_decorators, { kind: "method", name: "addStyleTag", static: false, private: false, access: { has: obj => "addStyleTag" in obj, get: obj => obj.addStyleTag }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _click_decorators, { kind: "method", name: "click", static: false, private: false, access: { has: obj => "click" in obj, get: obj => obj.click }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _focus_decorators, { kind: "method", name: "focus", static: false, private: false, access: { has: obj => "focus" in obj, get: obj => obj.focus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _hover_decorators, { kind: "method", name: "hover", static: false, private: false, access: { has: obj => "hover" in obj, get: obj => obj.hover }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _select_decorators, { kind: "method", name: "select", static: false, private: false, access: { has: obj => "select" in obj, get: obj => obj.select }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tap_decorators, { kind: "method", name: "tap", static: false, private: false, access: { has: obj => "tap" in obj, get: obj => obj.tap }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _type_decorators, { kind: "method", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _title_decorators, { kind: "method", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @internal
         */
        _id = (__runInitializers(this, _instanceExtraInitializers), void 0);
        /**
         * @internal
         */
        _parentId;
        /**
         * @internal
         */
        worlds;
        /**
         * @internal
         */
        _name;
        /**
         * @internal
         */
        _hasStartedLoading = false;
        /**
         * @internal
         */
        constructor() {
            super();
        }
        #_document;
        /**
         * @internal
         */
        #document() {
            if (!this.#_document) {
                this.#_document = this.isolatedRealm()
                    .evaluateHandle(() => {
                    return document;
                })
                    .then(handle => {
                    return this.mainRealm().transferHandle(handle);
                });
            }
            return this.#_document;
        }
        /**
         * Used to clear the document handle that has been destroyed.
         *
         * @internal
         */
        clearDocumentHandle() {
            this.#_document = undefined;
        }
        /**
         * @internal
         */
        async frameElement() {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const parentFrame = this.parentFrame();
                if (!parentFrame) {
                    return null;
                }
                const list = __addDisposableResource(env_1, await parentFrame.isolatedRealm().evaluateHandle(() => {
                    return document.querySelectorAll('iframe');
                }), false);
                for await (const iframe_1 of transposeIterableHandle(list)) {
                    const env_2 = { stack: [], error: void 0, hasError: false };
                    try {
                        const iframe = __addDisposableResource(env_2, iframe_1, false);
                        const frame = await iframe.contentFrame();
                        if (frame._id === this._id) {
                            return iframe.move();
                        }
                    }
                    catch (e_1) {
                        env_2.error = e_1;
                        env_2.hasError = true;
                    }
                    finally {
                        __disposeResources(env_2);
                    }
                }
                return null;
            }
            catch (e_2) {
                env_1.error = e_2;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        }
        /**
         * Behaves identically to {@link Page.evaluateHandle} except it's run within
         * the context of this frame.
         *
         * @see {@link Page.evaluateHandle} for details.
         */
        async evaluateHandle(pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
            return await this.mainRealm().evaluateHandle(pageFunction, ...args);
        }
        /**
         * Behaves identically to {@link Page.evaluate} except it's run within the
         * the context of this frame.
         *
         * @see {@link Page.evaluate} for details.
         */
        async evaluate(pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
            return await this.mainRealm().evaluate(pageFunction, ...args);
        }
        /**
         * @internal
         */
        locator(selectorOrFunc) {
            if (typeof selectorOrFunc === 'string') {
                return NodeLocator.create(this, selectorOrFunc);
            }
            else {
                return FunctionLocator.create(this, selectorOrFunc);
            }
        }
        /**
         * Queries the frame for an element matching the given selector.
         *
         * @param selector - The selector to query for.
         * @returns A {@link ElementHandle | element handle} to the first element
         * matching the given selector. Otherwise, `null`.
         */
        async $(selector) {
            // eslint-disable-next-line rulesdir/use-using -- This is cached.
            const document = await this.#document();
            return await document.$(selector);
        }
        /**
         * Queries the frame for all elements matching the given selector.
         *
         * @param selector - The selector to query for.
         * @returns An array of {@link ElementHandle | element handles} that point to
         * elements matching the given selector.
         */
        async $$(selector) {
            // eslint-disable-next-line rulesdir/use-using -- This is cached.
            const document = await this.#document();
            return await document.$$(selector);
        }
        /**
         * Runs the given function on the first element matching the given selector in
         * the frame.
         *
         * If the given function returns a promise, then this method will wait till
         * the promise resolves.
         *
         * @example
         *
         * ```ts
         * const searchValue = await frame.$eval('#search', el => el.value);
         * ```
         *
         * @param selector - The selector to query for.
         * @param pageFunction - The function to be evaluated in the frame's context.
         * The first element matching the selector will be passed to the function as
         * its first argument.
         * @param args - Additional arguments to pass to `pageFunction`.
         * @returns A promise to the result of the function.
         */
        async $eval(selector, pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
            // eslint-disable-next-line rulesdir/use-using -- This is cached.
            const document = await this.#document();
            return await document.$eval(selector, pageFunction, ...args);
        }
        /**
         * Runs the given function on an array of elements matching the given selector
         * in the frame.
         *
         * If the given function returns a promise, then this method will wait till
         * the promise resolves.
         *
         * @example
         *
         * ```ts
         * const divsCounts = await frame.$$eval('div', divs => divs.length);
         * ```
         *
         * @param selector - The selector to query for.
         * @param pageFunction - The function to be evaluated in the frame's context.
         * An array of elements matching the given selector will be passed to the
         * function as its first argument.
         * @param args - Additional arguments to pass to `pageFunction`.
         * @returns A promise to the result of the function.
         */
        async $$eval(selector, pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
            // eslint-disable-next-line rulesdir/use-using -- This is cached.
            const document = await this.#document();
            return await document.$$eval(selector, pageFunction, ...args);
        }
        /**
         * @deprecated Use {@link Frame.$$} with the `xpath` prefix.
         *
         * Example: `await frame.$$('xpath/' + xpathExpression)`
         *
         * This method evaluates the given XPath expression and returns the results.
         * If `xpath` starts with `//` instead of `.//`, the dot will be appended
         * automatically.
         * @param expression - the XPath expression to evaluate.
         */
        async $x(expression) {
            // eslint-disable-next-line rulesdir/use-using -- This is cached.
            const document = await this.#document();
            return await document.$x(expression);
        }
        /**
         * Waits for an element matching the given selector to appear in the frame.
         *
         * This method works across navigations.
         *
         * @example
         *
         * ```ts
         * import puppeteer from 'puppeteer';
         *
         * (async () => {
         *   const browser = await puppeteer.launch();
         *   const page = await browser.newPage();
         *   let currentURL;
         *   page
         *     .mainFrame()
         *     .waitForSelector('img')
         *     .then(() => console.log('First URL with image: ' + currentURL));
         *
         *   for (currentURL of [
         *     'https://example.com',
         *     'https://google.com',
         *     'https://bbc.com',
         *   ]) {
         *     await page.goto(currentURL);
         *   }
         *   await browser.close();
         * })();
         * ```
         *
         * @param selector - The selector to query and wait for.
         * @param options - Options for customizing waiting behavior.
         * @returns An element matching the given selector.
         * @throws Throws if an element matching the given selector doesn't appear.
         */
        async waitForSelector(selector, options = {}) {
            const { updatedSelector, QueryHandler } = getQueryHandlerAndSelector(selector);
            return (await QueryHandler.waitFor(this, updatedSelector, options));
        }
        /**
         * @deprecated Use {@link Frame.waitForSelector} with the `xpath` prefix.
         *
         * Example: `await frame.waitForSelector('xpath/' + xpathExpression)`
         *
         * The method evaluates the XPath expression relative to the Frame.
         * If `xpath` starts with `//` instead of `.//`, the dot will be appended
         * automatically.
         *
         * Wait for the `xpath` to appear in page. If at the moment of calling the
         * method the `xpath` already exists, the method will return immediately. If
         * the xpath doesn't appear after the `timeout` milliseconds of waiting, the
         * function will throw.
         *
         * For a code example, see the example for {@link Frame.waitForSelector}. That
         * function behaves identically other than taking a CSS selector rather than
         * an XPath.
         *
         * @param xpath - the XPath expression to wait for.
         * @param options - options to configure the visibility of the element and how
         * long to wait before timing out.
         */
        async waitForXPath(xpath, options = {}) {
            if (xpath.startsWith('//')) {
                xpath = `.${xpath}`;
            }
            return await this.waitForSelector(`xpath/${xpath}`, options);
        }
        /**
         * @example
         * The `waitForFunction` can be used to observe viewport size change:
         *
         * ```ts
         * import puppeteer from 'puppeteer';
         *
         * (async () => {
         * .  const browser = await puppeteer.launch();
         * .  const page = await browser.newPage();
         * .  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
         * .  page.setViewport({width: 50, height: 50});
         * .  await watchDog;
         * .  await browser.close();
         * })();
         * ```
         *
         * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
         *
         * ```ts
         * const selector = '.foo';
         * await frame.waitForFunction(
         *   selector => !!document.querySelector(selector),
         *   {}, // empty options object
         *   selector
         * );
         * ```
         *
         * @param pageFunction - the function to evaluate in the frame context.
         * @param options - options to configure the polling method and timeout.
         * @param args - arguments to pass to the `pageFunction`.
         * @returns the promise which resolve when the `pageFunction` returns a truthy value.
         */
        async waitForFunction(pageFunction, options = {}, ...args) {
            return await this.mainRealm().waitForFunction(pageFunction, options, ...args);
        }
        /**
         * The full HTML contents of the frame, including the DOCTYPE.
         */
        async content() {
            return await this.evaluate(getPageContent);
        }
        /**
         * The frame's `name` attribute as specified in the tag.
         *
         * @remarks
         * If the name is empty, it returns the `id` attribute instead.
         *
         * @remarks
         * This value is calculated once when the frame is created, and will not
         * update if the attribute is changed later.
         */
        name() {
            return this._name || '';
        }
        /**
         * Is`true` if the frame has been detached. Otherwise, `false`.
         *
         * @deprecated Use the `detached` getter.
         */
        isDetached() {
            return this.detached;
        }
        /**
         * @internal
         */
        get disposed() {
            return this.detached;
        }
        /**
         * Adds a `<script>` tag into the page with the desired url or content.
         *
         * @param options - Options for the script.
         * @returns An {@link ElementHandle | element handle} to the injected
         * `<script>` element.
         */
        async addScriptTag(options) {
            let { content = '', type } = options;
            const { path } = options;
            if (+!!options.url + +!!path + +!!content !== 1) {
                throw new Error('Exactly one of `url`, `path`, or `content` must be specified.');
            }
            if (path) {
                const fs = await importFSPromises();
                content = await fs.readFile(path, 'utf8');
                content += `//# sourceURL=${path.replace(/\n/g, '')}`;
            }
            type = type ?? 'text/javascript';
            return await this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ Deferred }, { url, id, type, content }) => {
                const deferred = Deferred.create();
                const script = document.createElement('script');
                script.type = type;
                script.text = content;
                if (url) {
                    script.src = url;
                    script.addEventListener('load', () => {
                        return deferred.resolve();
                    }, { once: true });
                    script.addEventListener('error', event => {
                        deferred.reject(new Error(event.message ?? 'Could not load script'));
                    }, { once: true });
                }
                else {
                    deferred.resolve();
                }
                if (id) {
                    script.id = id;
                }
                document.head.appendChild(script);
                await deferred.valueOrThrow();
                return script;
            }, LazyArg.create(context => {
                return context.puppeteerUtil;
            }), { ...options, type, content }));
        }
        /**
         * @internal
         */
        async addStyleTag(options) {
            let { content = '' } = options;
            const { path } = options;
            if (+!!options.url + +!!path + +!!content !== 1) {
                throw new Error('Exactly one of `url`, `path`, or `content` must be specified.');
            }
            if (path) {
                const fs = await importFSPromises();
                content = await fs.readFile(path, 'utf8');
                content += '/*# sourceURL=' + path.replace(/\n/g, '') + '*/';
                options.content = content;
            }
            return await this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ Deferred }, { url, content }) => {
                const deferred = Deferred.create();
                let element;
                if (!url) {
                    element = document.createElement('style');
                    element.appendChild(document.createTextNode(content));
                }
                else {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = url;
                    element = link;
                }
                element.addEventListener('load', () => {
                    deferred.resolve();
                }, { once: true });
                element.addEventListener('error', event => {
                    deferred.reject(new Error(event.message ?? 'Could not load style'));
                }, { once: true });
                document.head.appendChild(element);
                await deferred.valueOrThrow();
                return element;
            }, LazyArg.create(context => {
                return context.puppeteerUtil;
            }), options));
        }
        /**
         * Clicks the first element found that matches `selector`.
         *
         * @remarks
         * If `click()` triggers a navigation event and there's a separate
         * `page.waitForNavigation()` promise to be resolved, you may end up with a
         * race condition that yields unexpected results. The correct pattern for
         * click and wait for navigation is the following:
         *
         * ```ts
         * const [response] = await Promise.all([
         *   page.waitForNavigation(waitOptions),
         *   frame.click(selector, clickOptions),
         * ]);
         * ```
         *
         * @param selector - The selector to query for.
         */
        async click(selector, options = {}) {
            const env_3 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_3, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                await handle.click(options);
                await handle.dispose();
            }
            catch (e_3) {
                env_3.error = e_3;
                env_3.hasError = true;
            }
            finally {
                __disposeResources(env_3);
            }
        }
        /**
         * Focuses the first element that matches the `selector`.
         *
         * @param selector - The selector to query for.
         * @throws Throws if there's no element matching `selector`.
         */
        async focus(selector) {
            const env_4 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_4, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                await handle.focus();
            }
            catch (e_4) {
                env_4.error = e_4;
                env_4.hasError = true;
            }
            finally {
                __disposeResources(env_4);
            }
        }
        /**
         * Hovers the pointer over the center of the first element that matches the
         * `selector`.
         *
         * @param selector - The selector to query for.
         * @throws Throws if there's no element matching `selector`.
         */
        async hover(selector) {
            const env_5 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_5, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                await handle.hover();
            }
            catch (e_5) {
                env_5.error = e_5;
                env_5.hasError = true;
            }
            finally {
                __disposeResources(env_5);
            }
        }
        /**
         * Selects a set of value on the first `<select>` element that matches the
         * `selector`.
         *
         * @example
         *
         * ```ts
         * frame.select('select#colors', 'blue'); // single selection
         * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
         * ```
         *
         * @param selector - The selector to query for.
         * @param values - The array of values to select. If the `<select>` has the
         * `multiple` attribute, all values are considered, otherwise only the first
         * one is taken into account.
         * @returns the list of values that were successfully selected.
         * @throws Throws if there's no `<select>` matching `selector`.
         */
        async select(selector, ...values) {
            const env_6 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_6, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                return await handle.select(...values);
            }
            catch (e_6) {
                env_6.error = e_6;
                env_6.hasError = true;
            }
            finally {
                __disposeResources(env_6);
            }
        }
        /**
         * Taps the first element that matches the `selector`.
         *
         * @param selector - The selector to query for.
         * @throws Throws if there's no element matching `selector`.
         */
        async tap(selector) {
            const env_7 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_7, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                await handle.tap();
            }
            catch (e_7) {
                env_7.error = e_7;
                env_7.hasError = true;
            }
            finally {
                __disposeResources(env_7);
            }
        }
        /**
         * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
         * in the text.
         *
         * @remarks
         * To press a special key, like `Control` or `ArrowDown`, use
         * {@link Keyboard.press}.
         *
         * @example
         *
         * ```ts
         * await frame.type('#mytextarea', 'Hello'); // Types instantly
         * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
         * ```
         *
         * @param selector - the selector for the element to type into. If there are
         * multiple the first will be used.
         * @param text - text to type into the element
         * @param options - takes one option, `delay`, which sets the time to wait
         * between key presses in milliseconds. Defaults to `0`.
         */
        async type(selector, text, options) {
            const env_8 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_8, await this.$(selector), false);
                assert(handle, `No element found for selector: ${selector}`);
                await handle.type(text, options);
            }
            catch (e_8) {
                env_8.error = e_8;
                env_8.hasError = true;
            }
            finally {
                __disposeResources(env_8);
            }
        }
        /**
         * @deprecated Replace with `new Promise(r => setTimeout(r, milliseconds));`.
         *
         * Causes your script to wait for the given number of milliseconds.
         *
         * @remarks
         * It's generally recommended to not wait for a number of seconds, but instead
         * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
         * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
         *
         * @example
         *
         * Wait for 1 second:
         *
         * ```ts
         * await frame.waitForTimeout(1000);
         * ```
         *
         * @param milliseconds - the number of milliseconds to wait.
         */
        async waitForTimeout(milliseconds) {
            return await new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }
        /**
         * The frame's title.
         */
        async title() {
            return await this.isolatedRealm().evaluate(() => {
                return document.title;
            });
        }
    };
})();
export { Frame };
//# sourceMappingURL=Frame.js.map