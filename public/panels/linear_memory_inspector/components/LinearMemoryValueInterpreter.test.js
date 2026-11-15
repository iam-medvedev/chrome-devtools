// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describe, it } from 'mocha';
import { assertScreenshot, renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { setupLocaleHooks } from '../../../testing/LocaleHelpers.js';
import * as LinearMemoryInspectorComponents from './components.js';
describe('LinearMemoryValueInterpreter Screenshots', () => {
    setupLocaleHooks();
    it('renders the value interpreter with representative data', async () => {
        const component = new LinearMemoryInspectorComponents.LinearMemoryValueInterpreter.LinearMemoryValueInterpreter();
        renderElementIntoDOM(component, { includeCommonStyles: true });
        const array = [0xC8, 0xC9, 0xCA, 0xCB];
        component.buffer = new Uint8Array(array).buffer;
        component.endianness = "Little Endian" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.Endianness.LITTLE */;
        component.valueTypes = new Set([
            "Integer 8-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT8 */,
            "Integer 16-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT16 */,
            "Integer 32-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT32 */,
            "Float 32-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.FLOAT32 */,
            "Pointer 32-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.POINTER32 */,
        ]);
        component.valueTypeModes = new Map([
            [
                "Integer 8-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT8 */,
                "oct" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueTypeMode.OCTAL */,
            ],
            [
                "Integer 16-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT16 */,
                "hex" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueTypeMode.HEXADECIMAL */,
            ],
            [
                "Integer 32-bit" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType.INT32 */,
                "dec" /* LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueTypeMode.DECIMAL */,
            ],
        ]);
        component.memoryLength = array.length;
        await component.updateComplete;
        await assertScreenshot('linear_memory_inspector/linear-memory-value-interpreter.png');
    });
});
//# sourceMappingURL=LinearMemoryValueInterpreter.test.js.map