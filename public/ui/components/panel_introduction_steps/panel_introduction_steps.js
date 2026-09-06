var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/ui/components/panel_introduction_steps/PanelIntroductionSteps.ts
var PanelIntroductionSteps_exports = {};
__export(PanelIntroductionSteps_exports, {
  PanelIntroductionSteps: () => PanelIntroductionSteps
});
import * as ComponentHelpers from "../helpers/helpers.js";
import { html, render } from "../../lit/lit.js";

// gen/front_end/ui/components/panel_introduction_steps/panelIntroductionSteps.css.js
var panelIntroductionSteps_css_default = `/*
 * Copyright 2022 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: block;
}

h1 {
  font-weight: normal;
  font-size: var(--sys-typescale-headline3-size);
  line-height: var(--sys-size-12);
  padding: 0;
  margin-top: 0;
  color: var(--sys-color-on-surface);
}

.intro-steps {
  counter-reset: custom-counter;
  list-style: none;
  margin: var(--sys-size-8) 0 30px 30px;
  padding: 0;
}

.intro-steps li {
  color: var(--sys-color-on-surface);
  counter-increment: custom-counter;
  font-size: var(--sys-typescale-body3-size);
  letter-spacing: 0.03em;
  line-height: 1.54;
  margin-bottom: 9px;
  position: relative;
}

.intro-steps li::before {
  --override-color-counter-background: var(--sys-color-tonal-container);

  box-sizing: border-box;
  background: var(--override-color-counter-background);
  border-radius: var(--sys-shape-corner-full);
  color: var(--sys-color-primary);
  content: counter(custom-counter);
  font-size: var(--sys-typescale-body4-size);
  height: 18px;
  left: -30px;
  line-height: var(--sys-size-9);
  position: absolute;
  text-align: center;
  top: 0;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*# sourceURL=${import.meta.resolve("./panelIntroductionSteps.css")} */`;

// ../../front_end/ui/components/panel_introduction_steps/PanelIntroductionSteps.ts
var PanelIntroductionSteps = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  connectedCallback() {
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #render() {
    if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
      throw new Error("FeedbackButton render was not scheduled");
    }
    render(html`
      <style>${panelIntroductionSteps_css_default}</style>
      <h1><slot name="title">slot: title</slot></h1>

      <ol class="intro-steps">
        <li><slot name="step-1">slot: step-1</slot></li>
        <li><slot name="step-2">slot: step-2</slot></li>
        <li><slot name="step-3">slot: step-3</slot></li>
      </ol>
    `, this.#shadow, { host: this });
  }
};
customElements.define("devtools-panel-introduction-steps", PanelIntroductionSteps);
export {
  PanelIntroductionSteps_exports as PanelIntroductionSteps
};
//# sourceMappingURL=panel_introduction_steps.js.map
