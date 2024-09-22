// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../../ui/components/icon_button/icon_button.js';
import * as ThemeSupport from '../../../../ui/legacy/theme_support/theme_support.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
const UIStrings = {
    /**
     *@description Accessible label used to explain to a user that they are viewing an arrow representing a link between two entries.
     */
    diagram: 'Links bteween entries',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/overlays/components/EntriesLinkOverlay.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
// In other overlays, the border line width is set to 2px.
const BORDER_LINE_WIDTH = 2;
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
    #entryFromConnector = null;
    #entryToConnector = null;
    #entryFromVisible = true;
    #entryToVisible = true;
    #canvasRect = null;
    // These flags let us know if the entry we are drawing from/to are the
    // originals, or if they are the parent, which can happen if an entry is
    // collapsed. We care about this because if the entry is not the source, we
    // draw the border as dashed, not solid.
    #fromEntryIsSource = true;
    #toEntryIsSource = true;
    #arrowHidden = false;
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
        this.#entryFromConnector = this.#connectorLineContainer?.querySelector('.entryFromConnector') ?? null;
        this.#entryToConnector = this.#connectorLineContainer?.querySelector('.entryToConnector') ?? null;
    }
    set canvasRect(rect) {
        if (rect === null) {
            return;
        }
        if (this.#canvasRect && this.#canvasRect.width === rect.width && this.#canvasRect.height === rect.height) {
            return;
        }
        this.#canvasRect = rect;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    /**
     * If one entry that is linked is in a collapsed track, we show the outlines
     * but hide only the arrow.
     */
    set hideArrow(shouldHide) {
        this.#arrowHidden = shouldHide;
        if (this.#connector) {
            this.#connector.style.display = shouldHide ? 'none' : 'block';
        }
    }
    set fromEntryCoordinateAndDimentions(fromEntryParams) {
        this.#coordinateFrom = { x: fromEntryParams.x, y: fromEntryParams.y };
        this.#fromEntryDimentions = { width: fromEntryParams.length, height: fromEntryParams.height };
        this.#redrawConnectionArrow();
    }
    set entriesVisibility(entriesVisibility) {
        this.#entryFromVisible = entriesVisibility.fromEntryVisibility;
        this.#entryToVisible = entriesVisibility.toEntryVisibility;
    }
    // The arrow might be pointing either to an entry or an empty space.
    // If the dimensions are not passed, it is pointing at an empty space.
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
    set fromEntryIsSource(x) {
        if (x === this.#fromEntryIsSource) {
            return;
        }
        this.#fromEntryIsSource = x;
        this.#render();
    }
    set toEntryIsSource(x) {
        if (x === this.#toEntryIsSource) {
            return;
        }
        this.#toEntryIsSource = x;
        this.#render();
    }
    #redrawConnectionArrow() {
        if (!this.#connector || !this.#entryFromWrapper || !this.#entryToWrapper || !this.#entryFromConnector ||
            !this.#entryToConnector) {
            console.error('`connector` element is missing.');
            return;
        }
        // If the user is zoomed out, the connector circles can be as large as the
        // event itself. So if the rectangle for this entry is too small, we
        // don't draw the circles.
        const minWidthToDrawConnectorCircles = 8;
        // We do not draw the connectors if the entry is not visible, or if the
        // entry we are connecting to isn't the actual source entry.
        // We also don't draw them if an entry is completely hidden, in which case
        // we aren't drawing the arrows, so it doesn't make sense to draw the
        // connectors.
        const drawFromEntryConnectorCircle = this.#entryFromVisible && !this.#arrowHidden && this.#fromEntryIsSource &&
            this.#fromEntryDimentions.width >= minWidthToDrawConnectorCircles;
        const widthOfToEntry = this.#toEntryDimentions?.width ?? 0;
        const drawToEntryConnectorCircle = !this.#arrowHidden && this.#entryToVisible && this.#toEntryIsSource &&
            widthOfToEntry >= minWidthToDrawConnectorCircles && !this.#arrowHidden;
        this.#entryFromConnector.setAttribute('visibility', drawFromEntryConnectorCircle ? 'visible' : 'hidden');
        this.#entryToConnector.setAttribute('visibility', drawToEntryConnectorCircle ? 'visible' : 'hidden');
        // If the entry is visible, the entry arrow starts from the end on the X axis and middle of the Y axis.
        // If not, draw it to the same y point without the entry height offset and the box around the entry.
        // This way it will be attached to the track edge.
        if (this.#entryFromVisible) {
            const halfEntryHeight = this.#fromEntryDimentions.height / 2;
            const endConnectionPointX = String(this.#coordinateFrom.x + this.#fromEntryDimentions.width);
            const endConnectionPointY = String(this.#coordinateFrom.y + halfEntryHeight);
            this.#connector.setAttribute('x1', endConnectionPointX);
            this.#connector.setAttribute('y1', endConnectionPointY);
            this.#entryFromConnector.setAttribute('cx', endConnectionPointX);
            this.#entryFromConnector.setAttribute('cy', endConnectionPointY);
            const adjustedEntryFromWrapperX = String(this.#coordinateFrom.x + BORDER_LINE_WIDTH / 2);
            const adjustedEntryFromWrapperY = String(this.#coordinateFrom.y + BORDER_LINE_WIDTH / 2);
            const adjustedWidth = String(this.#fromEntryDimentions.width - BORDER_LINE_WIDTH);
            const adjustedHeight = String(this.#fromEntryDimentions.height - BORDER_LINE_WIDTH);
            this.#entryFromWrapper.setAttribute('visibility', 'visible');
            this.#entryFromWrapper.setAttribute('x', adjustedEntryFromWrapperX);
            this.#entryFromWrapper.setAttribute('y', adjustedEntryFromWrapperY);
            this.#entryFromWrapper.setAttribute('width', adjustedWidth);
            this.#entryFromWrapper.setAttribute('height', adjustedHeight);
        }
        else {
            this.#connector.setAttribute('x1', (this.#coordinateFrom.x + this.#fromEntryDimentions.width).toString());
            this.#connector.setAttribute('y1', this.#coordinateFrom.y.toString());
            this.#entryFromWrapper.setAttribute('visibility', 'hidden');
        }
        // If the arrow is pointing to the entry, point it to the middle of the entry and draw a box around the entry.
        // If the arrow is pointing to an entry, but it is not visible, the coordinates are for the edge of the track
        // and we don't need the half entry height offset.
        // Otherwise, the arrow is following the mouse so we assign it to the provided coordinates.
        if (this.#toEntryDimentions) {
            if (this.#entryToVisible) {
                const adjustedEntryToWrapperX = String(this.#coordinateTo.x + BORDER_LINE_WIDTH / 2);
                const adjustedEntryToWrapperY = String(this.#coordinateTo.y + BORDER_LINE_WIDTH / 2);
                const adjustedWidth = String(this.#toEntryDimentions.width - BORDER_LINE_WIDTH);
                const adjustedHeight = String(this.#toEntryDimentions.height - BORDER_LINE_WIDTH);
                this.#entryToWrapper.setAttribute('visibility', 'visible');
                this.#entryToWrapper.setAttribute('x', adjustedEntryToWrapperX);
                this.#entryToWrapper.setAttribute('y', adjustedEntryToWrapperY);
                this.#entryToWrapper.setAttribute('width', adjustedWidth);
                this.#entryToWrapper.setAttribute('height', adjustedHeight);
                const connectionPointX = String(this.#coordinateTo.x);
                const connectionPointY = String(this.#coordinateTo.y + this.#toEntryDimentions.height / 2);
                this.#connector.setAttribute('x2', connectionPointX);
                this.#connector.setAttribute('y2', connectionPointY);
                this.#entryToConnector.setAttribute('cx', connectionPointX);
                this.#entryToConnector.setAttribute('cy', connectionPointY);
            }
            else {
                this.#entryToWrapper.setAttribute('visibility', 'hidden');
                this.#connector.setAttribute('x2', this.#coordinateTo.x.toString());
                this.#connector.setAttribute('y2', (this.#coordinateTo.y).toString());
            }
        }
        else {
            this.#entryToWrapper.setAttribute('visibility', 'hidden');
            this.#connector.setAttribute('x2', this.#coordinateTo.x.toString());
            this.#connector.setAttribute('y2', this.#coordinateTo.y.toString());
        }
        this.#connector.setAttribute('stroke-width', '2');
        if (this.#toEntryDimentions && this.#entryFromVisible && !this.#entryToVisible) {
            this.#connector.setAttribute('stroke', 'url(#fromVisibleLineGradient)');
        }
        else if (this.#toEntryDimentions && this.#entryToVisible && !this.#entryFromVisible) {
            this.#connector.setAttribute('stroke', 'url(#toVisibleLineGradient)');
        }
        else {
            const arrowColor = ThemeSupport.ThemeSupport.instance().getComputedValue('--color-text-primary');
            this.#connector.setAttribute('stroke', arrowColor);
        }
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    /*
     * When only one entry from the connection is visible, the connection
     * line becomes a gradient from the visible entry to the edge of
     * the screen towards the entry that is not visible.
     *
     * To achieve this, we need to calculate what percentage of the
     * visible screen the connection is currently occupying and apply
     * that gradient to the visible connection part.
     */
    #partlyVisibleConnectionLinePercentage() {
        if (!this.#canvasRect) {
            return 100;
        }
        const lineLength = this.#coordinateTo.x - (this.#coordinateFrom.x + this.#fromEntryDimentions.width);
        let visibleLineLength = 0;
        // If the visible entry is the 'From' entry, find the length of the visible arrow by
        // substracting the point where the arrow starts from the whole canvas length.
        // If the 'to' entry is visible, the coordinate of the entry will be equal to
        // the visible arrow length.
        if (this.#entryFromVisible && !this.#entryToVisible) {
            visibleLineLength = this.#canvasRect.width - (this.#coordinateFrom.x + this.#fromEntryDimentions.width);
        }
        else if (!this.#entryFromVisible && this.#entryToVisible) {
            visibleLineLength = this.#coordinateTo.x;
        }
        const visibleLineFromTotalPercentage = (visibleLineLength * 100) / lineLength;
        return (visibleLineFromTotalPercentage < 100) ? visibleLineFromTotalPercentage : 100;
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
        const arrowColor = ThemeSupport.ThemeSupport.instance().getComputedValue('--color-text-primary');
        // clang-format off
        LitHtml.render(LitHtml.html `
          <svg class="connectorContainer" width="100%" height="100%" role="region" aria-label=${i18nString(UIStrings.diagram)}>
            <defs>
              <linearGradient
                id="fromVisibleLineGradient"
                x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  stop-color=${arrowColor}
                  stop-opacity="1" />
                <stop
                  offset="${this.#partlyVisibleConnectionLinePercentage()}%"
                  stop-color=${arrowColor}
                  stop-opacity="0" />
              </linearGradient>

              <linearGradient
                id="toVisibleLineGradient"
                x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="${100 - this.#partlyVisibleConnectionLinePercentage()}%"
                  stop-color=${arrowColor}
                  stop-opacity="0" />
                <stop
                  offset="100%"
                  stop-color=${arrowColor}
                  stop-opacity="1" />
              </linearGradient>
              <marker
                id="arrow"
                orient="auto"
                markerWidth="3"
                markerHeight="4"
                fill-opacity="1"
                refX="4"
                refY="2">
                <path d="M0,0 V4 L4,2 Z" fill=${arrowColor} />
              </marker>
            </defs>
            <line
              marker-end="url(#arrow)"
              stroke-dasharray=${!this.#fromEntryIsSource || !this.#toEntryIsSource ? DASHED_STROKE_AMOUNT : 'none'}
              stroke-opacity=${!this.#entryFromVisible && !this.#entryToVisible ? OUT_OF_VIEW_STROKE_OPACITY : 1}
              />

            <rect
              class="entryFromWrapper" fill="none" stroke=${arrowColor} stroke-width=${BORDER_LINE_WIDTH} stroke-dasharray=${this.#fromEntryIsSource ? 'none' : DASHED_STROKE_AMOUNT} />
            <rect
              class="entryToWrapper" fill="none" stroke=${arrowColor} stroke-width=${BORDER_LINE_WIDTH} stroke-dasharray=${this.#toEntryIsSource ? 'none' : DASHED_STROKE_AMOUNT} />

            <circle class="entryFromConnector" fill="none" stroke=${arrowColor} stroke-width=${CONNECTOR_CIRCLE_STROKE_WIDTH} r=${CONNECTOR_CIRCLE_RADIUS} />
            <circle class="entryToConnector" fill="none" stroke=${arrowColor} stroke-width=${CONNECTOR_CIRCLE_STROKE_WIDTH} r=${CONNECTOR_CIRCLE_RADIUS} />
          </svg>
        `, this.#shadow, { host: this });
        // clang-format on
    }
}
const CONNECTOR_CIRCLE_RADIUS = 2;
const CONNECTOR_CIRCLE_STROKE_WIDTH = 1;
export class CreateEntriesLinkRemoveEvent extends Event {
    static eventName = 'createentrieslinkremoveevent';
    constructor() {
        super(CreateEntriesLinkRemoveEvent.eventName);
    }
}
export class CreateEntriesLinkOverlay extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-create-entries-link-overlay`;
    #shadow = this.attachShadow({ mode: 'open' });
    #fromEntryData;
    constructor(initialFromEntryParams) {
        super();
        this.#render();
        this.#fromEntryData = initialFromEntryParams;
        this.#updateCreateLinkBox();
        const createLinkBox = this.#shadow.querySelector('.create-link-box');
        const createLinkIcon = createLinkBox?.querySelector('.create-link-icon') ?? null;
        createLinkIcon?.addEventListener('click', this.#onClick.bind(this));
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
    }
    set fromEntryData(fromEntryParams) {
        this.#fromEntryData = fromEntryParams;
        this.#updateCreateLinkBox();
    }
    #updateCreateLinkBox() {
        const createLinkBox = this.#shadow.querySelector('.create-link-box');
        const createLinkIcon = createLinkBox?.querySelector('.create-link-icon') ?? null;
        const entryHighlightWrapper = createLinkBox?.querySelector('.entry-highlight-wrapper') ?? null;
        if (!createLinkBox || !createLinkIcon || !entryHighlightWrapper) {
            console.error('creating element is missing.');
            return;
        }
        const { entryStartX, entryStartY, entryWidth, entryHeight } = this.#fromEntryData;
        createLinkIcon.style.left = `${entryStartX + entryWidth}px`;
        createLinkIcon.style.top = `${entryStartY}px`;
        entryHighlightWrapper.style.left = `${entryStartX}px`;
        entryHighlightWrapper.style.top = `${entryStartY}px`;
        entryHighlightWrapper.style.width = `${entryWidth}px`;
        entryHighlightWrapper.style.height = `${entryHeight}px`;
    }
    #onClick() {
        this.dispatchEvent(new CreateEntriesLinkRemoveEvent());
    }
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
        <div class='create-link-box'>
          <div class="entry-highlight-wrapper"></div>
          <${IconButton.Icon.Icon.litTagName}
            class='create-link-icon'
            name='arrow-right-circle'>
          </${IconButton.Icon.Icon.litTagName}>
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
// Defines the gap in the border when we are drawing a dashed outline.
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
const DASHED_STROKE_AMOUNT = 4;
const OUT_OF_VIEW_STROKE_OPACITY = 0.2;
customElements.define('devtools-entries-link-overlay', EntriesLinkOverlay);
customElements.define('devtools-create-entries-link-overlay', CreateEntriesLinkOverlay);
//# sourceMappingURL=EntriesLinkOverlay.js.map