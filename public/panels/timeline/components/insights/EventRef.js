// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as Utils from '../../utils/utils.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
const { html } = LitHtml;
export class EventReferenceClick extends Event {
    event;
    static eventName = 'eventreferenceclick';
    constructor(event) {
        super(EventReferenceClick.eventName, { bubbles: true, composed: true });
        this.event = event;
    }
}
class EventRef extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-event-ref`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #text = null;
    #event = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
    }
    set text(text) {
        this.#text = text;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set event(event) {
        this.#event = event;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #render() {
        if (!this.#text || !this.#event) {
            return;
        }
        // clang-format off
        LitHtml.render(html `
      <button type="button" class="timeline-link" @click=${(e) => {
            e.stopPropagation();
            if (this.#event) {
                this.dispatchEvent(new EventReferenceClick(this.#event));
            }
        }}>${this.#text}</button>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
export function eventRef(event) {
    let title, text;
    if (Trace.Types.Events.isSyntheticNetworkRequest(event)) {
        text = Utils.Helpers.shortenUrl(new URL(event.args.data.url));
        title = event.args.data.url;
    }
    else {
        Platform.TypeScriptUtilities.assertNever(event, `unsupported event in eventRef: ${event.name}`);
    }
    return html `<devtools-performance-event-ref
    .event=${event}
    .text=${text}
    title=${title}
  ></devtools-performance-event-ref>`;
}
customElements.define('devtools-performance-event-ref', EventRef);
//# sourceMappingURL=EventRef.js.map