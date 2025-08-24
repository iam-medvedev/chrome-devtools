// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import globalAiButtonStyles from './globalAiButton.css.js';
const { render, html, Directives: { classMap } } = Lit;
const UIStrings = {
    /**
     * @description Button's string in promotion state.
     */
    aiAssistance: 'AI assistance',
};
const str_ = i18n.i18n.registerUIStrings('entrypoints/main/GlobalAiButton.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const DELAY_BEFORE_PROMOTION_COLLAPSE_IN_MS = 5000;
const PROMOTION_END_DATE = new Date('2026-09-30');
function getClickCountSetting() {
    return Common.Settings.Settings.instance().createSetting('global-ai-button-click-count', 0, "Synced" /* Common.Settings.SettingStorageType.SYNCED */);
}
function incrementClickCountSetting() {
    const setting = getClickCountSetting();
    setting.set(setting.get() + 1);
}
export var GlobalAiButtonState;
(function (GlobalAiButtonState) {
    GlobalAiButtonState["PROMOTION"] = "promotion";
    GlobalAiButtonState["DEFAULT"] = "default";
})(GlobalAiButtonState || (GlobalAiButtonState = {}));
export const DEFAULT_VIEW = (input, output, target) => {
    const inPromotionState = input.state === GlobalAiButtonState.PROMOTION;
    const classes = classMap({
        'global-ai-button': true,
        expanded: inPromotionState,
    });
    // clang-format off
    render(html `
    <style>${globalAiButtonStyles}</style>
    <div class="global-ai-button-container">
      <button class=${classes} @click=${input.onClick} jslog=${VisualLogging.action().track({ click: true }).context('global-ai-button')}>
        <devtools-icon name="smart-assistant"></devtools-icon>
        <span class="button-text">${` ${i18nString(UIStrings.aiAssistance)}`}</span>
      </button>
    </div>
  `, target);
    // clang-format on
};
export class GlobalAiButton extends UI.Widget.Widget {
    #view;
    #buttonState = GlobalAiButtonState.DEFAULT;
    constructor(element, view) {
        super(element);
        this.#view = view ?? DEFAULT_VIEW;
        this.requestUpdate();
        if (this.#shouldTriggerPromotion()) {
            this.#triggerPromotion();
        }
    }
    // We only want to enable promotion when:
    // * The flag is enabled,
    // * The current date is before the promotion end date,
    // * The click count on this button is less than 2.
    #shouldTriggerPromotion() {
        const isFlagEnabled = Boolean(Root.Runtime.hostConfig.devToolsGlobalAiButton?.promotionEnabled);
        const isBeforeEndDate = (new Date()) < PROMOTION_END_DATE;
        return isFlagEnabled && isBeforeEndDate && getClickCountSetting().get() < 2;
    }
    #triggerPromotion() {
        this.#buttonState = GlobalAiButtonState.PROMOTION;
        this.requestUpdate();
        window.setTimeout(() => {
            this.#buttonState = GlobalAiButtonState.DEFAULT;
            this.requestUpdate();
        }, DELAY_BEFORE_PROMOTION_COLLAPSE_IN_MS);
    }
    #onClick() {
        UI.ViewManager.ViewManager.instance().showViewInLocation('freestyler', 'drawer-view');
        incrementClickCountSetting();
    }
    performUpdate() {
        this.#view({
            state: this.#buttonState,
            onClick: this.#onClick.bind(this),
        }, undefined, this.contentElement);
    }
}
let globalAiButtonToolbarProviderInstance;
export class GlobalAiButtonToolbarProvider {
    #toolbarItem;
    #widgetElement;
    constructor() {
        this.#widgetElement = document.createElement('devtools-widget');
        this.#widgetElement.widgetConfig = UI.Widget.widgetConfig(GlobalAiButton);
        this.#toolbarItem = new UI.Toolbar.ToolbarItemWithCompactLayout(this.#widgetElement);
        this.#toolbarItem.setVisible(false);
    }
    item() {
        return this.#toolbarItem;
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!globalAiButtonToolbarProviderInstance || forceNew) {
            globalAiButtonToolbarProviderInstance = new GlobalAiButtonToolbarProvider();
        }
        return globalAiButtonToolbarProviderInstance;
    }
}
//# sourceMappingURL=GlobalAiButton.js.map