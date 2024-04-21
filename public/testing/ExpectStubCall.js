// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function expectCall(stub, fakeFn) {
    return new Promise(resolve => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stub.callsFake(function (...args) {
            resolve(args);
            return (fakeFn ? fakeFn.apply(this, args) : undefined);
        });
    });
}
//# sourceMappingURL=ExpectStubCall.js.map