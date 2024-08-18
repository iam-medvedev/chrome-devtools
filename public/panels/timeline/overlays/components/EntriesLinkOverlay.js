// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import styles from './entriesLinkOverlay.css.js';
export class EntriesLinkOverlay extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-entries-link-overlay`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #coordinateFrom;
    #coordinateTo;
    #connectorLineContainer = null;
    #connector = null;
    // Value indicating if `coordinateTo` is pointing to an entry or an empty space.
    // It is used to check if the arrow needs to follow a mouse or is snap to an entry.
    entryToExists = false;
    constructor(initialEntryCoordinate) {
        super();
        this.#render();
        this.#coordinateFrom = initialEntryCoordinate;
        this.#coordinateTo = initialEntryCoordinate;
        this.#connectorLineContainer = this.#shadow.querySelector('.connectorContainer') ?? null;
        this.#connector = this.#connectorLineContainer?.querySelector('line') ?? null;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    set coordinateFrom(coordinateFrom) {
        this.#coordinateFrom = coordinateFrom;
        this.#redrawConnectionArrow();
    }
    set coordinateTo(coordinateTo) {
        this.#coordinateTo = coordinateTo;
        this.#redrawConnectionArrow();
    }
    #redrawConnectionArrow() {
        if (!this.#connector) {
            console.error('`connector` element is missing.');
            return;
        }
        this.#connector.setAttribute('x1', this.#coordinateFrom.x.toString());
        this.#connector.setAttribute('y1', this.#coordinateFrom.y.toString());
        this.#connector.setAttribute('x2', this.#coordinateTo.x.toString());
        this.#connector.setAttribute('y2', this.#coordinateTo.y.toString());
        this.#connector.setAttribute('stroke', 'black');
        this.#connector.setAttribute('stroke-width', '2');
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    /*
    The entries link overlay is an arrow connecting 2 entries.
    The Entries are drawn by Flamechart and this Overlay is only drawing the arrow between them.
     _________
    |__entry__|\
                \
                 \          <-- arrow connecting the sides of entries drawn by this overlay
                  \   ________________
                   ➘ |_____entry______|
    */
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
          <svg class="connectorContainer" width="100%" height="100%">
            <defs>
              <marker
                id='arrow'
                orient="auto"
                markerWidth='3'
                markerHeight='4'
                refX='4'
                refY='2'>
                <path d='M0,0 V4 L4,2 Z' fill="black" />
              </marker>
            </defs>
            <line marker-end='url(#arrow)'/>
          </svg>
        `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-entries-link-overlay', EntriesLinkOverlay);
//# sourceMappingURL=EntriesLinkOverlay.js.map