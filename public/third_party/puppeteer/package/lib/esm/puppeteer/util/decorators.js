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
import { asyncDisposeSymbol, disposeSymbol } from './disposable.js';
import { Mutex } from './Mutex.js';
const instances = new WeakSet();
export function moveable(Class, _) {
    let hasDispose = false;
    if (Class.prototype[disposeSymbol]) {
        const dispose = Class.prototype[disposeSymbol];
        Class.prototype[disposeSymbol] = function () {
            if (instances.has(this)) {
                instances.delete(this);
                return;
            }
            return dispose.call(this);
        };
        hasDispose = true;
    }
    if (Class.prototype[asyncDisposeSymbol]) {
        const asyncDispose = Class.prototype[asyncDisposeSymbol];
        Class.prototype[asyncDisposeSymbol] = function () {
            if (instances.has(this)) {
                instances.delete(this);
                return;
            }
            return asyncDispose.call(this);
        };
        hasDispose = true;
    }
    if (hasDispose) {
        Class.prototype.move = function () {
            instances.add(this);
            return this;
        };
    }
    return Class;
}
export function throwIfDisposed(message = value => {
    return `Attempted to use disposed ${value.constructor.name}.`;
}) {
    return (target, _) => {
        return function (...args) {
            if (this.disposed) {
                throw new Error(message(this));
            }
            return target.call(this, ...args);
        };
    };
}
/**
 * The decorator only invokes the target if the target has not been invoked with
 * the same arguments before. The decorated method throws an error if it's
 * invoked with a different number of elements: if you decorate a method, it
 * should have the same number of arguments
 *
 * @internal
 */
export function invokeAtMostOnceForArguments(target, _) {
    const cache = new WeakMap();
    let cacheDepth = -1;
    return function (...args) {
        if (cacheDepth === -1) {
            cacheDepth = args.length;
        }
        if (cacheDepth !== args.length) {
            throw new Error('Memoized method was called with the wrong number of arguments');
        }
        let freshArguments = false;
        let cacheIterator = cache;
        for (const arg of args) {
            if (cacheIterator.has(arg)) {
                cacheIterator = cacheIterator.get(arg);
            }
            else {
                freshArguments = true;
                cacheIterator.set(arg, new WeakMap());
                cacheIterator = cacheIterator.get(arg);
            }
        }
        if (!freshArguments) {
            return;
        }
        return target.call(this, ...args);
    };
}
export function guarded(getKey = function () {
    return this;
}) {
    return (target, _) => {
        const mutexes = new WeakMap();
        return async function (...args) {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const key = getKey.call(this);
                let mutex = mutexes.get(key);
                if (!mutex) {
                    mutex = new Mutex();
                    mutexes.set(key, mutex);
                }
                const _ = __addDisposableResource(env_1, await mutex.acquire(), true);
                return await target.call(this, ...args);
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                const result_1 = __disposeResources(env_1);
                if (result_1)
                    await result_1;
            }
        };
    };
}
//# sourceMappingURL=decorators.js.map