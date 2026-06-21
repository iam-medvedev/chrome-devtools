// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as LayerViewer from '../layer_viewer/layer_viewer.js';
const { html, render } = Lit;
const { widget } = UI.Widget;
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <devtools-split-view direction="column" jslog=${VisualLogging.pane('layers.paint-profiler').track({ resize: true })}>
      <devtools-widget slot="sidebar"
          ${widget(LayerViewer.PaintProfilerView.PaintProfilerCommandLogView, {
        commandLog: input.log,
        selectionWindow: input.selectionWindow,
    })}>
      </devtools-widget>
      <devtools-widget slot="main"
          ${widget(LayerViewer.PaintProfilerView.PaintProfilerView, {
        showImageCallback: input.showImageCallback,
        snapshotAndLog: { snapshot: input.snapshot, log: input.log },
        scale: input.scale,
    })}
          @WindowChanged=${(e) => input.onWindowChanged(e.detail)}>
      </devtools-widget>
    </devtools-split-view>
  `, target);
    // clang-format on
};
export class LayerPaintProfilerView extends UI.Widget.VBox {
    #showImageCallback;
    #snapshot = null;
    #log = [];
    #scale = 1;
    #selectionWindow = null;
    #view;
    constructor(showImageCallback, view = DEFAULT_VIEW) {
        super();
        this.#showImageCallback = showImageCallback;
        this.#view = view;
    }
    wasShown() {
        super.wasShown();
        this.requestUpdate();
    }
    performUpdate() {
        const input = {
            showImageCallback: this.#showImageCallback,
            snapshot: this.#snapshot,
            log: this.#log,
            scale: this.#scale,
            selectionWindow: this.#selectionWindow,
            onWindowChanged: this.onWindowChanged,
        };
        this.#view(input, undefined, this.contentElement);
    }
    reset() {
        if (this.#snapshot) {
            this.#snapshot.release();
        }
        this.#snapshot = null;
        this.#log = [];
        this.#selectionWindow = null;
        this.requestUpdate();
    }
    profile(snapshot) {
        void snapshot.commandLog().then(log => {
            if (this.#snapshot) {
                this.#snapshot.release();
            }
            this.#snapshot = snapshot;
            this.#log = log || [];
            this.requestUpdate();
        });
    }
    setScale(scale) {
        this.#scale = scale;
        this.requestUpdate();
    }
    onWindowChanged = (window) => {
        this.#selectionWindow = window;
        this.requestUpdate();
    };
}
//# sourceMappingURL=LayerPaintProfilerView.js.map