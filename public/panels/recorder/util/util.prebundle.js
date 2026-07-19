// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SharedObject from './SharedObject.js';
// Setting this to `true` enables extra logging for the injected scripts.
const isDebugBuild = false;
const DEVTOOLS_RECORDER_WORLD_NAME = 'devtools_recorder';
class InjectedScript {
    static #injectedScript;
    static async get() {
        if (!this.#injectedScript) {
            this.#injectedScript = (await fetch(new URL('../injected/injected.generated.js', import.meta.url)))
                .text();
        }
        return await this.#injectedScript;
    }
}
export { DEVTOOLS_RECORDER_WORLD_NAME, InjectedScript, isDebugBuild, SharedObject };
export const mod = (a, n) => {
    return ((a % n) + n) % n;
};
export function assert(predicate, message = 'Assertion failed!') {
    if (!predicate) {
        throw new Error(message);
    }
}
export const deepFreeze = (object) => {
    for (const name of Reflect.ownKeys(object)) {
        const value = object[name];
        if ((value && typeof value === 'object') || typeof value === 'function') {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
};
export class InsertAssignment {
    value;
    constructor(value) {
        this.value = value;
    }
}
export class ArrayAssignments {
    value;
    constructor(value) {
        this.value = value;
    }
}
export const immutableDeepAssign = (object, assignments) => {
    if (assignments instanceof ArrayAssignments) {
        assert(Array.isArray(object), `Expected an array. Got ${typeof object}.`);
        const updatedObject = [...object];
        const keys = Object.keys(assignments.value)
            .sort((a, b) => Number(b) - Number(a));
        for (const key of keys) {
            const update = assignments.value[Number(key)];
            if (update === undefined) {
                updatedObject.splice(Number(key), 1);
            }
            else if (update instanceof InsertAssignment) {
                updatedObject.splice(Number(key), 0, update.value);
            }
            else {
                updatedObject[Number(key)] = immutableDeepAssign(updatedObject[key], update);
            }
        }
        return Object.freeze(updatedObject);
    }
    if (typeof assignments === 'object' && !Array.isArray(assignments)) {
        assert(!Array.isArray(object), 'Expected an object. Got an array.');
        const updatedObject = { ...object };
        const keys = Object.keys(assignments);
        for (const key of keys) {
            const update = assignments[key];
            if (update === undefined) {
                delete updatedObject[key];
            }
            else {
                updatedObject[key] = immutableDeepAssign(updatedObject[key], update);
            }
        }
        return Object.freeze(updatedObject);
    }
    return assignments;
};
//# sourceMappingURL=util.prebundle.js.map