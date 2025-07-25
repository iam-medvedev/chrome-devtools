// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ElementsComponents from './components.js';
describe('CSSPropertyIconResolver', () => {
    function mapFromStyle(style) {
        const result = new Map();
        for (const key of Object.keys(style)) {
            result.set(key, style[key]);
        }
        return result;
    }
    it('can computed actual directions for row and column', () => {
        const tests = [
            {
                style: {
                    direction: 'ltr',
                    display: 'flex',
                },
                expected: {
                    row: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                    column: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'row-reverse': "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'column-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                },
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                expected: {
                    row: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                expected: {
                    row: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    column: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                    'row-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    'column-reverse': "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                },
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'tb',
                    display: 'flex',
                },
                expected: {
                    row: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'tb-rl',
                    display: 'flex',
                },
                expected: {
                    row: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
            {
                style: {
                    direction: 'rtl',
                    display: 'flex',
                },
                expected: {
                    row: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    column: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'row-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                    'column-reverse': "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                },
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                expected: {
                    row: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                expected: {
                    row: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    column: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                    'row-reverse': "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'column-reverse': "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                },
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'tb',
                    display: 'flex',
                },
                expected: {
                    row: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'tb-rl',
                    display: 'flex',
                },
                expected: {
                    row: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
                    column: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
                    'row-reverse': "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
                    'column-reverse': "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
                },
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.getPhysicalDirections(mapFromStyle(test.style)), test.expected, `Test ${JSON.stringify(test.style)} failed.`);
        }
    });
    it('can rotate the icon', () => {
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon("left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */), {
            iconName: 'flex-direction',
            rotate: -90,
            scaleX: -1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon("right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */), {
            iconName: 'flex-direction',
            rotate: 90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon("top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */), {
            iconName: 'flex-direction',
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon("bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */), {
            iconName: 'flex-direction',
            rotate: 0,
            scaleX: 1,
            scaleY: -1,
        });
    });
    it('can find an icon for flex-direction row', () => {
        const tests = [
            {
                style: {
                    direction: 'ltr',
                    display: 'flex',
                },
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'tb',
                    display: 'flex',
                },
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    direction: 'ltr',
                    'writing-mode': 'tb-rl',
                    display: 'flex',
                },
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    direction: 'rtl',
                    display: 'flex',
                },
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'tb',
                    display: 'flex',
                },
                expected: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                expected: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                expected: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
            },
            {
                style: {
                    direction: 'rtl',
                    'writing-mode': 'tb-rl',
                    display: 'flex',
                },
                expected: "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('flex-direction: row', mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon(test.expected), `Test 'flex-direction: row'(${JSON.stringify(test.style)}) failed.`);
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('flex-direction: row-reverse', mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon(ElementsComponents.CSSPropertyIconResolver.reverseDirection(test.expected)), `Test 'flex-direction: row-reverse'(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can find an icon for flex-direction: column and column-reverse', () => {
        const tests = [
            {
                style: {
                    direction: 'ltr',
                    display: 'flex',
                },
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('flex-direction: column', mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon(test.expected), `Test 'flex-direction: column'(${JSON.stringify(test.style)}) failed.`);
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('flex-direction: column-reverse', mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateFlexDirectionIcon(ElementsComponents.CSSPropertyIconResolver.reverseDirection(test.expected)), `Test 'flex-direction: column-reverse'(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can rotate an icon for align-content', () => {
        const iconName = 'iconName';
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignContentIcon(iconName, "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */), {
            iconName,
            rotate: -90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignContentIcon(iconName, "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */), {
            iconName,
            rotate: 90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignContentIcon(iconName, "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignContentIcon(iconName, "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
    });
    it('can find an icon for align-content properties', () => {
        const tests = [
            // flexbox
            {
                style: {
                    'flex-direction': 'row',
                    'align-content': 'center',
                    display: 'flex',
                },
                iconName: 'align-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'column',
                    'align-content': 'center',
                    display: 'flex',
                },
                iconName: 'align-content-center',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'align-content': 'center',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                iconName: 'align-content-center',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'align-content': 'center',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                iconName: 'align-content-center',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'row-reverse',
                    'align-content': 'center',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                iconName: 'align-content-center',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            // grid
            {
                style: {
                    'align-content': 'center',
                    display: 'grid',
                },
                iconName: 'align-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'align-content': 'center',
                    'writing-mode': 'vertical-rl',
                    display: 'grid',
                },
                iconName: 'align-content-center',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`align-content: ${test.style['align-content']}`, mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateAlignContentIcon(test.iconName, test.expected), `Test align-content(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can rotate an icon for justify-content', () => {
        const iconName = 'iconName';
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyContentIcon(iconName, "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyContentIcon(iconName, "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */), {
            iconName,
            rotate: 0,
            scaleX: -1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyContentIcon(iconName, "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */), {
            iconName,
            rotate: 90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyContentIcon(iconName, "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */), {
            iconName,
            rotate: -90,
            scaleX: 1,
            scaleY: 1,
        });
    });
    it('can find an icon for justify-content properties', () => {
        const tests = [
            // flexbox
            {
                style: {
                    'flex-direction': 'row',
                    'justify-content': 'center',
                    display: 'flex',
                },
                iconName: 'justify-content-center',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    display: 'flex',
                },
                iconName: 'justify-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'justify-content': 'center',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                iconName: 'justify-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'justify-content': 'center',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                iconName: 'justify-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'row-reverse',
                    'justify-content': 'center',
                    display: 'flex',
                },
                iconName: 'justify-content-center',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            // grid
            {
                style: {
                    'justify-content': 'center',
                    display: 'grid',
                },
                iconName: 'justify-content-center',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'justify-content': 'center',
                    'writing-mode': 'vertical-rl',
                    display: 'grid',
                },
                iconName: 'justify-content-center',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`justify-content: ${test.style['justify-content']}`, mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateJustifyContentIcon(test.iconName, test.expected), `Test justify-content(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can rotate an icon for align-items', () => {
        const iconName = 'iconName';
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(iconName, "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */), {
            iconName,
            rotate: -90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(iconName, "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */), {
            iconName,
            rotate: 90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(iconName, "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(iconName, "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
    });
    it('can find an icon for align-items properties', () => {
        const tests = [
            // flexbox
            {
                style: {
                    'flex-direction': 'row',
                    'align-items': 'flex-start',
                    display: 'flex',
                },
                iconName: 'align-items-start',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'column',
                    'align-items': 'flex-start',
                    display: 'flex',
                },
                iconName: 'align-items-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'align-items': 'flex-start',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                iconName: 'align-items-start',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'align-items': 'flex-start',
                    'writing-mode': 'vertical-lr',
                    display: 'flex',
                },
                iconName: 'align-items-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'column-reverse',
                    'align-items': 'flex-start',
                    display: 'flex',
                },
                iconName: 'align-items-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            // grid
            {
                style: {
                    'align-items': 'start',
                    display: 'grid',
                },
                iconName: 'align-items-start',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'align-items': 'start',
                    'writing-mode': 'vertical-lr',
                    display: 'grid',
                },
                iconName: 'align-items-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`align-items: ${test.style['align-items']}`, mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(test.iconName, test.expected), `Test align-items(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can find baseline icons', () => {
        const baselineIconInfo = {
            iconName: 'align-items-baseline',
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        };
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('align-items: baseline', mapFromStyle({ display: 'flex' })), baselineIconInfo, 'Assertion for the \'align-items: baseline\' icon failed.');
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('align-self: baseline', null, mapFromStyle({ display: 'flex' })), baselineIconInfo, 'Assertion for the \'align-self: baseline\' icon failed.');
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon('align-content: baseline', mapFromStyle({ display: 'flex' })), baselineIconInfo, 'Assertion for the \'align-content: baseline\' icon failed.');
    });
    it('can find an icon for align-self properties', () => {
        const tests = [
            // flexbox
            {
                style: {
                    'align-self': 'flex-start',
                },
                parentStyle: {
                    'flex-direction': 'row',
                    display: 'flex',
                },
                iconName: 'align-self-start',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'align-self': 'flex-start',
                },
                parentStyle: {
                    'flex-direction': 'column',
                    display: 'flex',
                },
                iconName: 'align-self-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'align-self': 'flex-start',
                },
                parentStyle: {
                    'flex-direction': 'row',
                    'writing-mode': 'vertical-rl',
                    display: 'flex',
                },
                iconName: 'align-self-start',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    'align-self': 'flex-start',
                },
                parentStyle: {
                    'writing-mode': 'vertical-lr',
                    'flex-direction': 'row',
                    display: 'flex',
                },
                iconName: 'align-self-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'align-self': 'flex-start',
                },
                parentStyle: {
                    'flex-direction': 'column-reverse',
                    display: 'flex',
                },
                iconName: 'align-self-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            // grid
            {
                style: {
                    'align-self': 'start',
                },
                parentStyle: {
                    display: 'grid',
                },
                iconName: 'align-self-start',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'align-self': 'start',
                },
                parentStyle: {
                    'writing-mode': 'vertical-rl',
                    display: 'grid',
                },
                iconName: 'align-self-start',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
            {
                style: {
                    'align-self': 'start',
                },
                parentStyle: {
                    'writing-mode': 'vertical-lr',
                    display: 'grid',
                },
                iconName: 'align-self-start',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`align-self: ${test.style['align-self']}`, mapFromStyle(test.style), mapFromStyle(test.parentStyle)), ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(test.iconName, test.expected), `Test align-self(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can find an icon for flex-wrap properties', () => {
        const tests = [
            {
                style: {
                    'flex-direction': 'row',
                    'flex-wrap': 'wrap',
                    display: 'flex',
                },
                iconName: 'flex-wrap',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'row',
                    'flex-wrap': 'nowrap',
                    display: 'flex',
                },
                iconName: 'flex-no-wrap',
                expected: "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */,
            },
            {
                style: {
                    'flex-direction': 'column',
                    'flex-wrap': 'wrap',
                    display: 'flex',
                },
                iconName: 'flex-wrap',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'flex-direction': 'column',
                    'flex-wrap': 'nowrap',
                    display: 'flex',
                },
                iconName: 'flex-no-wrap',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`flex-wrap: ${test.style['flex-wrap']}`, mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateFlexWrapIcon(test.iconName, test.expected), `Test flex-wrap(${JSON.stringify(test.style)}) failed.`);
        }
    });
    it('can rotate an icon for justify-items', () => {
        const iconName = 'iconName';
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyItemsIcon(iconName, "left-to-right" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.LEFT_TO_RIGHT */), {
            iconName,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyItemsIcon(iconName, "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */), {
            iconName,
            rotate: 0,
            scaleX: -1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyItemsIcon(iconName, "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */), {
            iconName,
            rotate: 90,
            scaleX: 1,
            scaleY: 1,
        });
        assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.rotateJustifyItemsIcon(iconName, "bottom-to-top" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.BOTTOM_TO_TOP */), {
            iconName,
            rotate: -90,
            scaleX: 1,
            scaleY: 1,
        });
    });
    it('can find an icon for justify-items properties', () => {
        const tests = [
            // grid
            {
                style: {
                    'justify-items': 'start',
                    display: 'grid',
                },
                iconName: 'justify-items-start',
                expected: "top-to-bottom" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.TOP_TO_BOTTOM */,
            },
            {
                style: {
                    'justify-items': 'start',
                    'writing-mode': 'vertical-lr',
                    display: 'grid',
                },
                iconName: 'justify-items-start',
                expected: "right-to-left" /* ElementsComponents.CSSPropertyIconResolver.PhysicalDirection.RIGHT_TO_LEFT */,
            },
        ];
        for (const test of tests) {
            assert.deepEqual(ElementsComponents.CSSPropertyIconResolver.findIcon(`justify-items: ${test.style['justify-items']}`, mapFromStyle(test.style)), ElementsComponents.CSSPropertyIconResolver.rotateAlignItemsIcon(test.iconName, test.expected), `Test justify-items(${JSON.stringify(test.style)}) failed.`);
        }
    });
});
//# sourceMappingURL=CSSPropertyIconResolver.test.js.map