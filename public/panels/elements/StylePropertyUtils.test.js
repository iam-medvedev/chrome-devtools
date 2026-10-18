// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { it } from 'mocha';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as Elements from './elements.js';
describeWithEnvironment('StylePropertyUtils', () => {
    it('convert CSS declaration to JS property', () => {
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'display', value: 'flex' }), 'display: \'flex\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'box-sizing', value: 'border-box' }), 'boxSizing: \'border-box\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'background-color', value: 'var(--color-background-elevation-1)' }), 'backgroundColor: \'var(--color-background-elevation-1)\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: '--monospace-font-size', value: '12px' }), '\'--monospace-font-size\': \'12px\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'mask-position', value: 'bottom' }), 'maskPosition: \'bottom\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: '-webkit-mask-position', value: 'bottom' }), 'WebkitMaskPosition: \'bottom\'');
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'background-image', value: 'url("paper.gif")' }), 'backgroundImage: \'url("paper.gif")\'');
    });
    it('escapes single quotes in values', () => {
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'font-family', value: '\'Open Sans\'' }), String.raw `fontFamily: '\'Open Sans\''`);
    });
    it('escapes backslashes in values', () => {
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: 'content', value: String.raw `'\201C'` }), String.raw `content: '\'\\201C\''`);
    });
    it('escapes backslashes and single quotes in value', () => {
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: '--pwn', value: String.raw `\',x:globalThis.PWNED=1,y:1//` }), String.raw `'--pwn': '\\\',x:globalThis.PWNED=1,y:1//'`);
    });
    it('escapes backslashes and single quotes in custom property names', () => {
        assert.strictEqual(Elements.StylePropertyUtils.getCssDeclarationAsJavascriptProperty({ name: String.raw `--a\'b`, value: '1px' }), String.raw `'--a\\\'b': '1px'`);
    });
});
//# sourceMappingURL=StylePropertyUtils.test.js.map