// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import { ScreencastView } from './ScreencastView.js';
const { html, nothing, render } = Lit;
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Tooltip text that appears when hovering over the toggle screencast button in the Screencast app of the Remote devices tab when toggling screencast.
     */
    toggleScreencast: 'Toggle screencast',
};
const str_ = i18n.i18n.registerUIStrings('panels/screencast/ScreencastApp.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
let appInstance;
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>${UI.inspectorCommonStyles}</style>
    <devtools-split-view
      direction="column"
      sidebar-position="second"
      name="inspector-view.screencast-split-view-state"
      sidebar-initial-size="300"
      show=${input.screencastEnabled ? 'both' : 'sidebar'}
    >
      ${input.screenCaptureModel ? html `
        <devtools-widget
          slot="main"
          ${widget(ScreencastView, { screenCaptureModel: input.screenCaptureModel })}
        ></devtools-widget>
      ` : nothing}
      <devtools-widget
        slot="sidebar"
        ${widget(e => UI.InspectorView.InspectorView.instance({ element: e }))}
      ></devtools-widget>
    </devtools-split-view>
  `, target);
    // clang-format on
};
export class ScreencastApp {
    #universe;
    #view;
    #enabledSetting;
    #toggleButton;
    #screenCaptureModel;
    #rootView;
    constructor(universe, view = DEFAULT_VIEW) {
        this.#universe = universe;
        this.#view = view;
        this.#enabledSetting = Common.Settings.Settings.instance().createSetting('screencast-enabled', true);
        this.#toggleButton = new UI.Toolbar.ToolbarToggle(i18nString(UIStrings.toggleScreencast), 'devices');
        this.#toggleButton.setToggled(this.#enabledSetting.get());
        this.#toggleButton.setEnabled(false);
        this.#toggleButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.#toggleButtonClicked, this);
        SDK.TargetManager.TargetManager.instance().observeModels(SDK.ScreenCaptureModel.ScreenCaptureModel, this);
    }
    static instance(universe) {
        if (!appInstance) {
            if (!universe) {
                throw new Error('ScreencastApp.instance() requires a Universe on initial instantiation');
            }
            appInstance = new ScreencastApp(universe);
        }
        return appInstance;
    }
    get toggleButton() {
        return this.#toggleButton;
    }
    get rootView() {
        return this.#rootView;
    }
    presentUI(document) {
        this.#rootView = new UI.RootView.RootView(this.#universe);
        this.performUpdate();
        this.#rootView.attachToDocument(document);
        this.#rootView.focus();
    }
    modelAdded(screenCaptureModel) {
        if (screenCaptureModel.target() !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
            return;
        }
        this.#screenCaptureModel = screenCaptureModel;
        this.performUpdate();
    }
    modelRemoved(screenCaptureModel) {
        if (this.#screenCaptureModel !== screenCaptureModel) {
            return;
        }
        this.#screenCaptureModel = undefined;
        this.performUpdate();
    }
    #toggleButtonClicked() {
        const enabled = this.#toggleButton.isToggled();
        this.#enabledSetting.set(enabled);
        this.performUpdate();
    }
    performUpdate() {
        const hasModel = Boolean(this.#screenCaptureModel);
        const screencastEnabled = Boolean(this.#enabledSetting.get() && hasModel);
        this.#toggleButton.setEnabled(hasModel);
        this.#toggleButton.setToggled(screencastEnabled);
        if (this.#rootView) {
            this.#view({
                screencastEnabled,
                screenCaptureModel: this.#screenCaptureModel,
            }, {}, this.#rootView.contentElement);
        }
    }
}
let toolbarButtonProviderInstance;
export class ToolbarButtonProvider {
    static instance(opts = { forceNew: false }) {
        const { forceNew } = opts;
        if (!toolbarButtonProviderInstance || forceNew) {
            toolbarButtonProviderInstance = new ToolbarButtonProvider();
        }
        return toolbarButtonProviderInstance;
    }
    item() {
        return ScreencastApp.instance().toggleButton;
    }
}
let screencastAppProviderInstance;
export class ScreencastAppProvider {
    static instance(opts = { forceNew: false }) {
        const { forceNew } = opts;
        if (!screencastAppProviderInstance || forceNew) {
            screencastAppProviderInstance = new ScreencastAppProvider();
        }
        return screencastAppProviderInstance;
    }
    createApp(universe) {
        return ScreencastApp.instance(universe);
    }
}
//# sourceMappingURL=ScreencastApp.js.map