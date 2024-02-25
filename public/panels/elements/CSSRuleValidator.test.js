// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Elements from './elements.js';
const { assert } = chai;
describeWithEnvironment('CSSRuleValidator', () => {
    const tests = [
        {
            description: 'Reports a rule violation when element align-content is set on flex container whose flex-wrap property\'s value is nowrap',
            computedStyles: new Map([
                ['display', 'inline-flex'],
                ['flex-wrap', 'nowrap'],
                ['align-content', 'center'],
            ]),
            validator: () => new Elements.CSSRuleValidator.AlignContentValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation if flex-wrap is set to nowrap, but the element is not a flex container',
            computedStyles: new Map([
                ['display', 'block'],
                ['flex-wrap', 'nowrap'],
                ['align-content', 'center'],
            ]),
            validator: () => new Elements.CSSRuleValidator.AlignContentValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `align-content`, validation passes when the element is a grid container',
            computedStyles: new Map([
                ['align-content', 'center'],
                ['display', 'grid'],
            ]),
            validator: () => new Elements.CSSRuleValidator.AlignContentValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `align-content`, validation passes when the element is a block container',
            computedStyles: new Map([
                ['align-content', 'center'],
                ['display', 'block'],
            ]),
            validator: () => new Elements.CSSRuleValidator.AlignContentValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `align-content`, validation does not pass when the element is a math container',
            computedStyles: new Map([
                ['align-content', 'center'],
                ['display', 'block math'],
            ]),
            validator: () => new Elements.CSSRuleValidator.AlignContentValidator(),
            hintExpected: true,
        },
        {
            description: 'Test `justify-content`, validation passes when the element is flex containers',
            computedStyles: new Map([
                ['display', 'flex'],
                ['justify-content', 'flex-end'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexGridValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `justify-content`, validation passes when the element is grid containers',
            computedStyles: new Map([
                ['display', 'grid'],
                ['justify-content', 'center'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexGridValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `place-content`, validation passes when the element is grid containers',
            computedStyles: new Map([
                ['display', 'grid'],
                ['place-content', 'center'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexGridValidator(),
            hintExpected: false,
        },
        {
            description: 'Test `align-items`, validation does not pass when the element is not flex containers or grid containers',
            computedStyles: new Map([
                ['align-items', 'center'],
                ['display', 'block'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexGridValidator(),
            hintExpected: true,
        },
        {
            description: 'Test `place-content`, validation does not pass when the element is not flex containers or grid containers',
            computedStyles: new Map([
                ['display', 'block'],
                ['place-content', 'center'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexGridValidator(),
            hintExpected: true,
        },
        {
            description: 'Reports a rule validation when flex properties are set to non-flex items',
            computedStyles: new Map([
                ['flex', '1'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'table'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexItemValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when flex properties are set to flex items',
            computedStyles: new Map([
                ['flex', '1'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'flex'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Passes the validation when flex container properties are set to flex container',
            computedStyles: new Map([
                ['display', 'flex'],
                ['flex-direction', 'column'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.FlexContainerValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when flex container properties are set to non-flex container',
            computedStyles: new Map([
                ['display', 'block'],
                ['flex-direction', 'column'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.FlexContainerValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when grid container properties are set to grid container',
            computedStyles: new Map([
                ['display', 'grid'],
                ['grid', '100px / 200px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.GridContainerValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when grid container properties are set to non-grid container',
            computedStyles: new Map([
                ['display', 'flex'],
                ['grid', '100px / 200px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.GridContainerValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when grid item properties are set to grid items',
            computedStyles: new Map([
                ['grid-area', 'auto / auto / auto / auto'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'grid'],
            ]),
            validator: () => new Elements.CSSRuleValidator.GridItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when grid item properties are set to non-grid items',
            computedStyles: new Map([
                ['grid-area', 'auto / auto / auto / auto'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'flex'],
            ]),
            validator: () => new Elements.CSSRuleValidator.GridItemValidator(),
            hintExpected: true,
        },
        {
            description: 'Reports a rule validation when flex or grid item properties are set to non-flex or non-grid items',
            computedStyles: new Map([
                ['align-self', 'baseline'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when flex or grid item properties are set to flex or grid items',
            computedStyles: new Map([
                ['align-self', 'baseline'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'flex'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Passes the validation when flex or grid item properties are set to grid items',
            computedStyles: new Map([
                ['align-self', 'baseline'],
            ]),
            parentsComputedStyles: new Map([
                ['display', 'grid'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Passes the validation when padding is not set to table elements',
            computedStyles: new Map([
                ['display', 'block'],
                ['padding', '15px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.PaddingValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when padding is set to table elements',
            computedStyles: new Map([
                ['display', 'table-row'],
                ['padding', '15px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.PaddingValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when top is set to non-static positioned element',
            computedStyles: new Map([
                ['position', 'absolute'],
                ['top', '20px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.PositionValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when top is set to static positioned elements',
            computedStyles: new Map([
                ['position', 'static'],
                ['top', '20px'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.PositionValidator(),
            hintExpected: true,
        },
        {
            description: 'Passes the validation when z-index is set to non-static positioned element',
            computedStyles: new Map([
                ['position', 'absolute'],
                ['z-index', '5'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.ZIndexValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a rule validation when z-index is set to static positioned elements',
            computedStyles: new Map([
                ['position', 'static'],
                ['z-index', '5'],
            ]),
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.ZIndexValidator(),
            hintExpected: true,
        },
        {
            description: 'Validates width on an inline element',
            computedStyles: new Map([
                ['display', 'inline'],
                ['width', '100px'],
            ]),
            nodeName: 'span',
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.SizingValidator(),
            hintExpected: true,
        },
        {
            description: 'Validates height on an inline element',
            computedStyles: new Map([
                ['display', 'inline'],
                ['height', '100px'],
            ]),
            nodeName: 'span',
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.SizingValidator(),
            hintExpected: true,
        },
        {
            description: 'Does not validate width on an inline element that could be replaced',
            computedStyles: new Map([
                ['display', 'inline'],
                ['width', '100px'],
            ]),
            nodeName: 'input',
            parentsComputedStyles: new Map(),
            validator: () => new Elements.CSSRuleValidator.SizingValidator(),
            hintExpected: false,
        },
        {
            description: 'Shows a hint the order property on non-flex/grid items',
            computedStyles: new Map([
                ['order', '1'],
            ]),
            nodeName: 'input',
            parentsComputedStyles: new Map([
                ['display', 'block'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: true,
        },
        {
            description: 'Does not show a hint for the order property on a flex item',
            computedStyles: new Map([
                ['order', '1'],
            ]),
            nodeName: 'input',
            parentsComputedStyles: new Map([
                ['display', 'flex'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Does not show a hint for the order property on a grid item',
            computedStyles: new Map([
                ['order', '1'],
            ]),
            nodeName: 'input',
            parentsComputedStyles: new Map([
                ['display', 'grid'],
            ]),
            validator: () => new Elements.CSSRuleValidator.FlexOrGridItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Does not show a hint for a flex item without a parent',
            computedStyles: new Map([
                ['flex', 'none'],
            ]),
            nodeName: 'input',
            parentsComputedStyles: undefined,
            validator: () => new Elements.CSSRuleValidator.FlexItemValidator(),
            hintExpected: false,
        },
        {
            description: 'Does not show a hint for a grid item with a z-index',
            computedStyles: new Map([
                ['z-index', '1'],
            ]),
            nodeName: 'div',
            parentsComputedStyles: new Map([
                ['display', 'grid'],
            ]),
            validator: () => new Elements.CSSRuleValidator.ZIndexValidator(),
            hintExpected: false,
        },
        {
            description: 'Reports a hint for invalid font variation settings',
            computedStyles: new Map([
                ['font-variation-settings', '"wght" 251, "wdth" 59'],
                ['font-family', 'Family'],
            ]),
            fontFaces: [new SDK.CSSFontFace.CSSFontFace({
                    fontFamily: 'Family',
                    fontStyle: 'string',
                    fontVariant: 'string',
                    fontWeight: 'string',
                    fontStretch: 'string',
                    fontDisplay: 'string',
                    unicodeRange: 'string',
                    src: 'string',
                    platformFontFamily: 'Family',
                    fontVariationAxes: [{
                            tag: 'wght',
                            name: 'Weight',
                            minValue: 10,
                            maxValue: 20,
                            defaultValue: 15,
                        }],
                })],
            nodeName: 'div',
            validator: () => new Elements.CSSRuleValidator.FontVariationSettingsValidator(),
            hintExpected: true,
        },
        {
            description: 'Does not report a hint for valid font variation settings',
            computedStyles: new Map([
                ['font-variation-settings', '"wght" 15, "wdth" 59'],
                ['font-family', 'Family'],
            ]),
            fontFaces: [new SDK.CSSFontFace.CSSFontFace({
                    fontFamily: 'Family',
                    fontStyle: 'string',
                    fontVariant: 'string',
                    fontWeight: 'string',
                    fontStretch: 'string',
                    fontDisplay: 'string',
                    unicodeRange: 'string',
                    src: 'string',
                    platformFontFamily: 'Family',
                    fontVariationAxes: [{
                            tag: 'wght',
                            name: 'Weight',
                            minValue: 10,
                            maxValue: 20,
                            defaultValue: 15,
                        }],
                })],
            nodeName: 'div',
            validator: () => new Elements.CSSRuleValidator.FontVariationSettingsValidator(),
            hintExpected: false,
        },
    ];
    for (const test of tests) {
        it(test.description, () => {
            const actualResult = test.validator().getHint(test.validator().getApplicableProperties()[0], test.computedStyles, test.parentsComputedStyles, test.nodeName, test.fontFaces);
            if (test.hintExpected) {
                assert.isDefined(actualResult);
            }
            else {
                assert.isUndefined(actualResult);
            }
        });
    }
});
//# sourceMappingURL=CSSRuleValidator.test.js.map