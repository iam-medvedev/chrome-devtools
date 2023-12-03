// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../i18n/i18n.js';
const UIStrings = {
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    elementsPanel: 'Elements panel',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    stylesSidebar: 'styles sidebar',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    changesDrawer: 'Changes drawer',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    issuesView: 'Issues view',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    networkPanel: 'Network panel',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    applicationPanel: 'Application panel',
    /**
     *@description The UI destination when right clicking an item that can be revealed
     */
    sourcesPanel: 'Sources panel',
};
const str_ = i18n.i18n.registerUIStrings('core/common/Revealer.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
export let reveal = async function reveal(revealable, omitFocus) {
    const promises = await Promise.all(getApplicableRegisteredRevealers(revealable).map(registration => registration.loadRevealer()));
    if (!promises.length) {
        throw new Error('Can\'t reveal ' + revealable);
    }
    return await Promise.race(promises.map(revealer => revealer.reveal(revealable, omitFocus)));
};
export function setRevealForTest(newReveal) {
    reveal = newReveal;
}
export function revealDestination(revealable) {
    for (const { destination } of getApplicableRegisteredRevealers(revealable)) {
        if (destination) {
            return destination();
        }
    }
    return null;
}
const registeredRevealers = [];
export function registerRevealer(registration) {
    registeredRevealers.push(registration);
}
function getApplicableRegisteredRevealers(revealable) {
    return registeredRevealers.filter(revealerRegistration => {
        if (!revealerRegistration.contextTypes) {
            return true;
        }
        for (const contextType of revealerRegistration.contextTypes()) {
            if (revealable instanceof contextType) {
                return true;
            }
        }
        return false;
    });
}
export const RevealerDestination = {
    ELEMENTS_PANEL: i18nLazyString(UIStrings.elementsPanel),
    STYLES_SIDEBAR: i18nLazyString(UIStrings.stylesSidebar),
    CHANGES_DRAWER: i18nLazyString(UIStrings.changesDrawer),
    ISSUES_VIEW: i18nLazyString(UIStrings.issuesView),
    NETWORK_PANEL: i18nLazyString(UIStrings.networkPanel),
    APPLICATION_PANEL: i18nLazyString(UIStrings.applicationPanel),
    SOURCES_PANEL: i18nLazyString(UIStrings.sourcesPanel),
};
//# sourceMappingURL=Revealer.js.map