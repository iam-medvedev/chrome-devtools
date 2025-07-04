// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { RecorderController } from './RecorderController.js';
let recorderPanelInstance;
export class RecorderPanel extends UI.Panel.Panel {
    static panelName = 'chrome-recorder';
    #controller;
    constructor() {
        super(RecorderPanel.panelName);
        this.element.setAttribute('jslog', `${VisualLogging.panel('chrome-recorder').track({ resize: true })}`);
        this.#controller = new RecorderController();
        this.contentElement.append(this.#controller);
        this.setHideOnDetach();
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!recorderPanelInstance || forceNew) {
            recorderPanelInstance = new RecorderPanel();
        }
        return recorderPanelInstance;
    }
    wasShown() {
        UI.Context.Context.instance().setFlavor(RecorderPanel, this);
        // Focus controller so shortcuts become active
        this.#controller.focus();
    }
    willHide() {
        UI.Context.Context.instance().setFlavor(RecorderPanel, null);
    }
    handleActions(actionId) {
        this.#controller.handleActions(actionId);
    }
    isActionPossible(actionId) {
        return this.#controller.isActionPossible(actionId);
    }
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        void (async () => {
            await UI.ViewManager.ViewManager.instance().showView(RecorderPanel.panelName);
            const view = UI.ViewManager.ViewManager.instance().view(RecorderPanel.panelName);
            if (view) {
                const widget = (await view.widget());
                widget.handleActions(actionId);
            }
        })();
        return true;
    }
}
//# sourceMappingURL=RecorderPanel.js.map