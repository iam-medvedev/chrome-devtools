// Copyright 2023 The Chromium Authors. All rights reserved.
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
//# sourceMappingURL=util.prebundle.js.map