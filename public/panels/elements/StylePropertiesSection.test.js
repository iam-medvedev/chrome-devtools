// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as ComputedStyle from '../../models/computed_style/computed_style.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { getMatchedStylesWithBlankRule, getMatchedStylesWithStylesheet } from '../../testing/StyleHelpers.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as Elements from './elements.js';
describeWithMockConnection('StylesPropertySection', () => {
    let computedStyleModel;
    beforeEach(() => {
        SDK.PageResourceLoader.PageResourceLoader.instance({ forceNew: true, loadOverride: null, maxConcurrentLoads: 1 });
        computedStyleModel = new ComputedStyle.ComputedStyleModel.ComputedStyleModel();
    });
    afterEach(() => {
        SDK.PageResourceLoader.PageResourceLoader.removeInstance();
    });
    it('contains specificity information', async () => {
        const specificity = { a: 0, b: 1, c: 0 };
        const matchedStyles = await getMatchedStylesWithBlankRule({ cssModel: new SDK.CSSModel.CSSModel(createTarget()) });
        const section = new Elements.StylePropertiesSection.StylePropertiesSection(new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel), matchedStyles, matchedStyles.nodeStyles()[0], 0, new Map(), new Map(), null);
        section.renderSelectors([{ text: '.child', specificity }], [true], new WeakMap());
        const selectorElement = section.element.querySelector('.selector');
        assert.strictEqual(selectorElement?.textContent, '.child');
        assert.deepEqual(section.element?.querySelector('devtools-tooltip')?.textContent?.trim(), 'Specificity: (0,1,0)');
    });
    it('renders selectors correctly', async () => {
        const matchedStyles = await getMatchedStylesWithBlankRule({ cssModel: new SDK.CSSModel.CSSModel(createTarget()) });
        const section = new Elements.StylePropertiesSection.StylePropertiesSection(new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel), matchedStyles, matchedStyles.nodeStyles()[0], 0, new Map(), new Map(), null);
        section.renderSelectors([{ text: '.child', specificity: { a: 0, b: 2, c: 0 } }, { text: '.item', specificity: { a: 0, b: 2, c: 0 } }], [true], new WeakMap());
        const selectorElement = section.element.querySelector('.selector');
        assert.deepEqual(selectorElement?.textContent, '.child, .item');
        section.renderSelectors([{ text: '.child', specificity: { a: 0, b: 2, c: 0 } }, { text: '& .item', specificity: { a: 0, b: 2, c: 0 } }], [true], new WeakMap());
        assert.deepEqual(selectorElement?.textContent, '.child, & .item');
        section.renderSelectors([{ text: '&.child', specificity: { a: 0, b: 2, c: 0 } }, { text: '& .item', specificity: { a: 0, b: 2, c: 0 } }], [true], new WeakMap());
        assert.deepEqual(selectorElement?.textContent, '&.child, & .item');
    });
    it('displays the proper sourceURL origin for constructed stylesheets', async () => {
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, endLine: 1, startColumn: 0, endColumn: 0 };
        const header = { sourceURL: 'constructed.css', isMutable: true, isConstructed: true, hasSourceURL: true, length: 1, ...range };
        const matchedPayload = [{
                rule: {
                    selectorList: { selectors: [{ text: 'div' }], text: 'div' },
                    origin,
                    styleSheetId,
                    style: { cssProperties: [{ name: 'color', value: 'red' }], shorthandEntries: [], range },
                },
                matchingSelectors: [0],
            }];
        const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...header, matchedPayload });
        const rule = matchedStyles.nodeStyles()[0].parentRule;
        const linkifier = sinon.createStubInstance(Components.Linkifier.Linkifier);
        const originNode = Elements.StylePropertiesSection.StylePropertiesSection.createRuleOriginNode(matchedStyles, linkifier, rule);
        assert.strictEqual(originNode.textContent, '<style>');
        sinon.assert.calledOnce(linkifier.linkifyCSSLocation);
        assert.strictEqual(linkifier.linkifyCSSLocation.args[0][0].styleSheetId, styleSheetId);
        assert.strictEqual(linkifier.linkifyCSSLocation.args[0][0].url, 'constructed.css');
    });
    it('displays the proper sourceMappingURL origin for constructed stylesheets', async () => {
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, endLine: 1, startColumn: 0, endColumn: 0 };
        const header = {
            sourceMapURL: 'http://example.com/constructed.css.map',
            isMutable: true,
            isConstructed: true,
            length: 1,
            ...range,
        };
        const matchedPayload = [{
                rule: {
                    selectorList: { selectors: [{ text: 'div' }], text: 'div' },
                    origin,
                    styleSheetId,
                    style: { cssProperties: [{ name: 'color', value: 'red' }], shorthandEntries: [], range },
                },
                matchingSelectors: [0],
            }];
        sinon.stub(SDK.PageResourceLoader.PageResourceLoader.instance(), 'loadResource').callsFake(url => Promise.resolve({
            content: url === header.sourceMapURL ? '{"sources": []}' : '',
        }));
        const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...header, matchedPayload });
        const styleSheetHeader = cssModel.styleSheetHeaderForId(styleSheetId);
        assert.exists(styleSheetHeader);
        const sourceMap = await cssModel.sourceMapManager().sourceMapForClientPromise(styleSheetHeader);
        assert.exists(sourceMap);
        const rule = matchedStyles.nodeStyles()[0].parentRule;
        const linkifier = sinon.createStubInstance(Components.Linkifier.Linkifier);
        const originNode = Elements.StylePropertiesSection.StylePropertiesSection.createRuleOriginNode(matchedStyles, linkifier, rule);
        assert.strictEqual(originNode.textContent, 'constructed stylesheet');
        sinon.assert.calledOnce(linkifier.linkifyCSSLocation);
        // Since we already asserted that a sourcemap exists for our header, it's sufficient to check that
        // linkifyCSSLocation has been called. Verifying that linkifyCSSLocation applies source mapping is out of scope
        // for this unit under test.
        assert.strictEqual(linkifier.linkifyCSSLocation.args[0][0].styleSheetId, styleSheetId);
        assert.strictEqual(linkifier.linkifyCSSLocation.args[0][0].url, '');
    });
    it('properly renders ancestor rules', async () => {
        Common.Settings.Settings.instance().moduleSetting('text-editor-indent').set('  ');
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const stylesSidebarPane = new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, startColumn: 0, endLine: 0, endColumn: 6 };
        {
            const matchedPayload = [{
                    rule: {
                        nestingSelectors: ['body', '& ul', 'div'],
                        ruleTypes: [
                            "StyleRule" /* Protocol.CSS.CSSRuleType.StyleRule */,
                            "StyleRule" /* Protocol.CSS.CSSRuleType.StyleRule */,
                            "StyleRule" /* Protocol.CSS.CSSRuleType.StyleRule */,
                        ],
                        selectorList: { selectors: [{ text: 'div' }], text: 'div' },
                        origin,
                        style: { cssProperties: [{ name: 'color', value: 'red' }], shorthandEntries: [] },
                    },
                    matchingSelectors: [0],
                }];
            const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...range, matchedPayload });
            const declaration = matchedStyles.nodeStyles()[0];
            assert.exists(declaration);
            const section = new Elements.StylePropertiesSection.StylePropertiesSection(stylesSidebarPane, matchedStyles, declaration, 0, null, null, null);
            assert.strictEqual(section.element.textContent, 'div {  & ul {    body {      div {      }    }  }}');
        }
        {
            const matchedPayload = [{
                    rule: {
                        nestingSelectors: ['body', 'div'],
                        ruleTypes: [
                            "StyleRule" /* Protocol.CSS.CSSRuleType.StyleRule */,
                            "StyleRule" /* Protocol.CSS.CSSRuleType.StyleRule */,
                        ],
                        selectorList: { selectors: [], text: '' },
                        origin,
                        style: { cssProperties: [{ name: 'color', value: 'red' }], shorthandEntries: [] },
                    },
                    matchingSelectors: [0],
                }];
            const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...range, matchedPayload });
            const declaration = matchedStyles.nodeStyles()[0];
            assert.exists(declaration);
            const section = new Elements.StylePropertiesSection.StylePropertiesSection(stylesSidebarPane, matchedStyles, declaration, 0, null, null, null);
            assert.strictEqual(section.element.textContent, 'div {  body {    }}');
        }
    });
    it('updates property rule property names', async () => {
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const stylesSidebarPane = new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, startColumn: 0, endLine: 0, endColumn: 6 };
        const propertyName = { text: '--prop', range };
        const propertyRuleStyle = {
            cssProperties: [
                { name: 'inherits', value: 'false' },
                { name: 'initial-value', value: 'red' },
                { name: 'syntax', value: '"<color>"' },
            ],
            shorthandEntries: [],
        };
        const propertyRules = [{
                propertyName,
                origin,
                style: propertyRuleStyle,
                styleSheetId,
            }];
        const matchedPayload = [{
                rule: {
                    selectorList: { selectors: [{ text: 'div' }], text: 'div' },
                    origin,
                    style: { cssProperties: [{ name: propertyName.text, value: 'red' }], shorthandEntries: [] },
                },
                matchingSelectors: [0],
            }];
        const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...range, propertyRules, matchedPayload });
        function assertIsPropertyRule(rule) {
            assert.instanceOf(rule, SDK.CSSRule.CSSPropertyRule);
        }
        const declaration = matchedStyles.getRegisteredProperty(propertyName.text)?.style();
        assert.exists(declaration);
        const rule = declaration.parentRule;
        assertIsPropertyRule(rule);
        const section = new Elements.StylePropertiesSection.RegisteredPropertiesSection(stylesSidebarPane, matchedStyles, declaration, 0, propertyName.text, /* expandedByDefault=*/ true);
        const forceUpdateSpy = sinon.spy(stylesSidebarPane, 'forceUpdate');
        const setNameSpy = sinon.stub(cssModel, 'setPropertyRulePropertyName');
        setNameSpy.returns(Promise.resolve(true));
        await section.setHeaderText(rule, propertyName.text);
        assert.isTrue(forceUpdateSpy.calledAfter(setNameSpy));
        sinon.assert.calledOnceWithExactly(setNameSpy, styleSheetId, sinon.match((r) => r.startLine === range.startLine &&
            r.startColumn === range.startColumn && r.endLine === range.endLine && r.endColumn === range.endColumn), propertyName.text);
    });
    it('renders braces correctly with a non-style-rule section', async () => {
        Common.Settings.Settings.instance().moduleSetting('text-editor-indent').set('  ');
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const stylesSidebarPane = new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, startColumn: 0, endLine: 0, endColumn: 6 };
        const fontPaletteValuesRule = {
            styleSheetId,
            origin,
            style: {
                range,
                cssProperties: [],
                shorthandEntries: [],
            },
            name: {
                range,
                text: '--palette-name',
            },
            type: "font-palette-values" /* Protocol.CSS.CSSAtRuleType.FontPaletteValues */,
        };
        const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...range, atRules: [fontPaletteValuesRule] });
        const declaration = matchedStyles.atRules()[0]?.style;
        assert.exists(declaration);
        const section = new Elements.StylePropertiesSection.AtRuleSection(stylesSidebarPane, matchedStyles, declaration, 0, true);
        assert.strictEqual(section.element.textContent, '@font-palette-values --palette-name {}');
    });
    it('renders active and inactive position-try rule sections correctly', async () => {
        const cssModel = createTarget().model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const stylesSidebarPane = new Elements.StylesSidebarPane.StylesSidebarPane(computedStyleModel);
        const origin = "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */;
        const styleSheetId = '0';
        const range = { startLine: 0, startColumn: 0, endLine: 0, endColumn: 6 };
        const positionTryRules = [
            {
                styleSheetId,
                origin,
                name: {
                    text: '--try-1',
                },
                style: {
                    range,
                    cssProperties: [],
                    shorthandEntries: [],
                },
                active: true,
            },
            {
                styleSheetId,
                origin,
                name: {
                    text: '--try-2',
                },
                style: {
                    range,
                    cssProperties: [],
                    shorthandEntries: [],
                },
                active: false,
            },
        ];
        const matchedStyles = await getMatchedStylesWithStylesheet({ cssModel, origin, styleSheetId, ...range, positionTryRules });
        const declaration1 = matchedStyles.positionTryRules()[0].style;
        const declaration2 = matchedStyles.positionTryRules()[1].style;
        assert.exists(declaration1);
        assert.exists(declaration2);
        const section1 = new Elements.StylePropertiesSection.PositionTryRuleSection(stylesSidebarPane, matchedStyles, declaration1, 0, positionTryRules[0].active);
        const section2 = new Elements.StylePropertiesSection.PositionTryRuleSection(stylesSidebarPane, matchedStyles, declaration1, 1, positionTryRules[1].active);
        assert.isFalse(section1.propertiesTreeOutline.element.classList.contains('no-affect'));
        assert.isTrue(section2.propertiesTreeOutline.element.classList.contains('no-affect'));
    });
});
//# sourceMappingURL=StylePropertiesSection.test.js.map