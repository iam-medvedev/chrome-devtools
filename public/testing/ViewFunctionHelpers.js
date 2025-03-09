// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export function createViewFunctionStub(constructor, outputValues) {
    const result = ((input, output, _target) => {
        ++result.callCount;
        result.input = input;
        if (output && outputValues) {
            Object.assign(output, outputValues);
        }
        result.invoked?.(input);
    });
    result.callCount = 0;
    Object.defineProperty(result, 'nextInput', {
        get() {
            return new Promise(resolve => {
                result.invoked = resolve;
            });
        }
    });
    return result;
}
//# sourceMappingURL=ViewFunctionHelpers.js.map