// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     *@description Title of the CSS overview panel
     */
    cssOverview: 'CSS overview',
    /**
     *@description Title of the CSS overview panel
     */
    showCssOverview: 'Show CSS overview',
};
const str_ = i18n.i18n.registerUIStrings('panels/css_overview/css_overview-meta.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
let loadedCSSOverviewModule;
async function loadCSSOverviewModule() {
    if (!loadedCSSOverviewModule) {
        loadedCSSOverviewModule = await import('./css_overview.js');
    }
    return loadedCSSOverviewModule;
}
UI.ViewManager.registerViewExtension({
    location: "panel" /* UI.ViewManager.ViewLocationValues.PANEL */,
    id: 'cssoverview',
    commandPrompt: i18nLazyString(UIStrings.showCssOverview),
    title: i18nLazyString(UIStrings.cssOverview),
    order: 95,
    persistence: "closeable" /* UI.ViewManager.ViewPersistence.CLOSEABLE */,
    async loadView() {
        const CSSOverview = await loadCSSOverviewModule();
        return new CSSOverview.CSSOverviewPanel.CSSOverviewPanel();
    },
    isPreviewFeature: true,
});
//# sourceMappingURL=css_overview-meta.prebundle.js.map