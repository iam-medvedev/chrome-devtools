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
    #fromEntryDimentions;
    #coordinateTo;
    #toEntryDimentions = null;
    #connectorLineContainer = null;
    #connector = null;
    #entryFromWrapper = null;
    #entryToWrapper = null;
    constructor(initialFromEntryCoordinateAndDimentions) {
        super();
        this.#render();
        this.#coordinateFrom = { x: initialFromEntryCoordinateAndDimentions.x, y: initialFromEntryCoordinateAndDimentions.y };
        this.#fromEntryDimentions = {
            width: initialFromEntryCoordinateAndDimentions.width,
            height: initialFromEntryCoordinateAndDimentions.height,
        };
        this.#coordinateTo = { x: initialFromEntryCoordinateAndDimentions.x, y: initialFromEntryCoordinateAndDimentions.y };
        this.#connectorLineContainer = this.#shadow.querySelector('.connectorContainer') ?? null;
        this.#connector = this.#connectorLineContainer?.querySelector('line') ?? null;
        this.#entryFromWrapper = this.#connectorLineContainer?.querySelector('.entryFromWrapper') ?? null;
        this.#entryToWrapper = this.#connectorLineContainer?.querySelector('.entryToWrapper') ?? null;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    set fromEntryCoordinateAndDimentions(fromEntryParams) {
        this.#coordinateFrom = { x: fromEntryParams.x, y: fromEntryParams.y };
        this.#fromEntryDimentions = { width: fromEntryParams.length, height: fromEntryParams.height };
        this.#redrawConnectionArrow();
    }
    // The arrow might be pointing either to an entry or an empty space.
    // If the dimentions are not passed, it is pointing at an empty space.
    set toEntryCoordinateAndDimentions(toEntryParams) {
        this.#coordinateTo = { x: toEntryParams.x, y: toEntryParams.y };
        if (toEntryParams.length && toEntryParams.height) {
            this.#toEntryDimentions = { width: toEntryParams.length, height: toEntryParams.height };
        }
        else {
            this.#toEntryDimentions = null;
        }
        this.#redrawConnectionArrow();
    }
    #redrawConnectionArrow() {
        if (!this.#connector || !this.#entryFromWrapper || !this.#entryToWrapper) {
            console.error('`connector` element is missing.');
            return;
        }
        // The entry arrow starts from the end on the X axis and middle of the Y axis
        const halfEntryHeight = this.#fromEntryDimentions.height / 2;
        this.#connector.setAttribute('x1', (this.#coordinateFrom.x + this.#fromEntryDimentions.width).toString());
        this.#connector.setAttribute('y1', (this.#coordinateFrom.y + Number(halfEntryHeight)).toString());
        this.#entryFromWrapper.setAttribute('x', this.#coordinateFrom.x.toString());
        this.#entryFromWrapper.setAttribute('y', this.#coordinateFrom.y.toString());
        this.#entryFromWrapper.setAttribute('width', this.#fromEntryDimentions.width.toString());
        this.#entryFromWrapper.setAttribute('height', this.#fromEntryDimentions.height.toString());
        // If the arrow is pointing to the entry, point it to the middle of the entry and draw a box around the entry.
        if (this.#toEntryDimentions) {
            this.#entryToWrapper.setAttribute('visibility', 'visible');
            this.#entryToWrapper.setAttribute('x', this.#coordinateTo.x.toString());
            this.#entryToWrapper.setAttribute('y', this.#coordinateTo.y.toString());
            this.#entryToWrapper.setAttribute('width', this.#toEntryDimentions.width.toString());
            this.#entryToWrapper.setAttribute('height', this.#toEntryDimentions.height.toString());
            this.#connector.setAttribute('x2', this.#coordinateTo.x.toString());
            this.#connector.setAttribute('y2', (this.#coordinateTo.y + this.#toEntryDimentions.height / 2).toString());
        }
        else {
            this.#entryToWrapper.setAttribute('visibility', 'hidden');
            this.#connector.setAttribute('x2', this.#coordinateTo.x.toString());
            this.#connector.setAttribute('y2', this.#coordinateTo.y.toString());
        }
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
            <rect
              class="entryFromWrapper" fill="none" stroke="black" />
            <rect
              class="entryToWrapper" fill="none" stroke="black" />
          </svg>
        `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-entries-link-overlay', EntriesLinkOverlay);
//# sourceMappingURL=EntriesLinkOverlay.js.map