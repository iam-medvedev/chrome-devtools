// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class ExecutionError extends Error {
}
export class SideEffectError extends Error {
}
/* istanbul ignore next */
function stringifyObjectOnThePage() {
    const seenBefore = new WeakMap();
    return JSON.stringify(this, function replacer(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seenBefore.has(value)) {
                return '(cycle)';
            }
            seenBefore.set(value, true);
        }
        if (value instanceof HTMLElement) {
            const idAttribute = value.id ? ` id="${value.id}"` : '';
            const classAttribute = value.classList.value ? ` class="${value.classList.value}"` : '';
            return `<${value.nodeName.toLowerCase()}${idAttribute}${classAttribute}>${value.hasChildNodes() ? '...' : ''}</${value.nodeName.toLowerCase()}>`;
        }
        if (this instanceof CSSStyleDeclaration) {
            // Do not add number keys to the output.
            if (!isNaN(Number(key))) {
                return undefined;
            }
        }
        return value;
    });
}
async function stringifyRemoteObject(object) {
    switch (object.type) {
        case "string" /* Protocol.Runtime.RemoteObjectType.String */:
            return `'${object.value}'`;
        case "bigint" /* Protocol.Runtime.RemoteObjectType.Bigint */:
            return `${object.value}n`;
        case "boolean" /* Protocol.Runtime.RemoteObjectType.Boolean */:
        case "number" /* Protocol.Runtime.RemoteObjectType.Number */:
            return `${object.value}`;
        case "undefined" /* Protocol.Runtime.RemoteObjectType.Undefined */:
            return 'undefined';
        case "symbol" /* Protocol.Runtime.RemoteObjectType.Symbol */:
        case "function" /* Protocol.Runtime.RemoteObjectType.Function */:
            return `${object.description}`;
        case "object" /* Protocol.Runtime.RemoteObjectType.Object */: {
            const res = await object.callFunction(stringifyObjectOnThePage);
            if (!res.object || res.object.type !== "string" /* Protocol.Runtime.RemoteObjectType.String */) {
                throw new Error('Could not stringify the object' + object);
            }
            return res.object.value;
        }
        default:
            throw new Error('Unknown type to stringify ' + object.type);
    }
}
export class FreestylerEvaluateAction {
    static async execute(code, executionContext, { throwOnSideEffect }) {
        const response = await executionContext.evaluate({
            expression: code,
            replMode: true,
            includeCommandLineAPI: true,
            returnByValue: false,
            silent: false,
            generatePreview: true,
            allowUnsafeEvalBlockedByCSP: false,
            throwOnSideEffect,
        }, 
        /* userGesture */ false, /* awaitPromise */ true);
        if (!response) {
            throw new Error('Response is not found');
        }
        if ('error' in response) {
            throw new ExecutionError(response.error);
        }
        if (response.exceptionDetails) {
            const exceptionDescription = response.exceptionDetails.exception?.description;
            if (exceptionDescription?.startsWith('EvalError: Possible side-effect in debug-evaluate')) {
                throw new SideEffectError(exceptionDescription);
            }
            throw new ExecutionError(exceptionDescription || 'JS exception');
        }
        return stringifyRemoteObject(response.object);
    }
}
//# sourceMappingURL=FreestylerEvaluateAction.js.map