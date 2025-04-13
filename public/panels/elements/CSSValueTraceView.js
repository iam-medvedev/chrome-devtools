// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as Lit from '../../third_party/lit/lit.js';
import * as UI from '../../ui/legacy/legacy.js';
import cssValueTraceViewStyles from './cssValueTraceView.css.js';
import { Highlighting, Renderer, RenderingContext, TracingContext, } from './PropertyRenderer.js';
import stylePropertiesTreeOutlineStyles from './stylePropertiesTreeOutline.css.js';
const { html, render, Directives: { ref, classMap, ifDefined } } = Lit;
function defaultView(input, output, target) {
    const [firstEvaluation, ...intermediateEvaluations] = input.evaluations;
    const hiddenSummary = !firstEvaluation || intermediateEvaluations.length === 0;
    const summaryTabIndex = hiddenSummary ? undefined : 0;
    const singleResult = input.evaluations.length === 0 && input.substitutions.length === 0;
    render(
    // clang-format off
    html `
      <div
       role=dialog
       ${ref(e => {
        output.defaultFocusedElement = e?.querySelector('[tabindex]') ?? undefined;
    })}
       class="css-value-trace monospace"
       @keydown=${onKeyDown}
       >
        ${input.substitutions.map(line => html `<span class="trace-line-icon" aria-label="is equal to">↳</span
              ><span class="trace-line">${line}</span>`)}
        ${firstEvaluation && intermediateEvaluations.length === 0
        ? html `<span class="trace-line-icon" aria-label="is equal to">↳</span
              ><span class="trace-line">${firstEvaluation}</span>`
        : html `<details
              @toggle=${input.onToggle}
              ?hidden=${hiddenSummary}
            >
              <summary tabindex=${ifDefined(summaryTabIndex)}>
                <span class="trace-line-icon" aria-label="is equal to">↳</span
                ><devtools-icon class="marker"></devtools-icon
                ><span class="trace-line">${firstEvaluation}</span>
              </summary>
              <div>
                ${intermediateEvaluations.map(evaluation => html `<span class="trace-line-icon" aria-label="is equal to"
                        >↳</span
                      ><span class="trace-line">${evaluation}</span>`)}
              </div>
            </details>`}
        ${!input.finalResult
        ? ''
        : html `<span
                class="trace-line-icon"
                aria-label="is equal to"
                ?hidden=${singleResult}
              >↳</span
              ><span class=${classMap({ 'trace-line': true, 'full-row': singleResult })}>${input.finalResult}</span>`}
      </div>
    `, 
    // clang-format on
    target);
    function onKeyDown(e) {
        // prevent styles-tab keyboard navigation
        if (!e.altKey) {
            if (e.key.startsWith('Arrow') || e.key === ' ' || e.key === 'Enter') {
                e.consume();
            }
        }
        // Capture tab focus within
        if (e.key === 'Tab') {
            const tabstops = this.querySelectorAll('[tabindex]') ?? [];
            const firstTabStop = tabstops[0];
            const lastTabStop = tabstops[tabstops.length - 1];
            if (e.target === lastTabStop && !e.shiftKey) {
                e.consume(true);
                if (firstTabStop instanceof HTMLElement) {
                    firstTabStop.focus();
                }
            }
            if (e.target === firstTabStop && e.shiftKey) {
                e.consume(true);
                if (lastTabStop instanceof HTMLElement) {
                    lastTabStop.focus();
                }
            }
        }
    }
}
export class CSSValueTraceView extends UI.Widget.VBox {
    #highlighting;
    #view;
    #finalResult = undefined;
    #evaluations = [];
    #substitutions = [];
    constructor(element, view = defaultView) {
        super(true, false, element);
        this.registerRequiredCSS(cssValueTraceViewStyles, stylePropertiesTreeOutlineStyles);
        this.#view = view;
        this.requestUpdate();
    }
    showTrace(property, subexpression, matchedStyles, computedStyles, renderers) {
        const matchedResult = subexpression === null ?
            property.parseValue(matchedStyles, computedStyles) :
            property.parseExpression(subexpression, matchedStyles, computedStyles);
        if (!matchedResult) {
            return undefined;
        }
        return this.#showTrace(property, matchedResult, renderers);
    }
    #showTrace(property, matchedResult, renderers) {
        this.#highlighting = new Highlighting();
        const rendererMap = new Map(renderers.map(r => [r.matchType, r]));
        // Compute all trace lines
        // 1st: Apply substitutions for var() functions
        const substitutions = [];
        const evaluations = [];
        const tracing = new TracingContext(this.#highlighting, matchedResult);
        while (tracing.nextSubstitution()) {
            const context = new RenderingContext(matchedResult.ast, property, rendererMap, matchedResult, 
            /* cssControls */ undefined, 
            /* options */ {}, tracing);
            substitutions.push(Renderer.render(matchedResult.ast.tree, context).nodes);
        }
        // 2nd: Apply evaluations for calc, min, max, etc.
        while (tracing.nextEvaluation()) {
            const context = new RenderingContext(matchedResult.ast, property, rendererMap, matchedResult, 
            /* cssControls */ undefined, 
            /* options */ {}, tracing);
            evaluations.push(Renderer.render(matchedResult.ast.tree, context).nodes);
        }
        this.#substitutions = substitutions;
        this.#finalResult = evaluations.pop();
        this.#evaluations = evaluations;
        if (evaluations.length === 0 && !tracing.didApplyEvaluations()) {
            this.#substitutions.pop();
        }
        this.requestUpdate();
    }
    performUpdate() {
        const viewInput = {
            substitutions: this.#substitutions,
            evaluations: this.#evaluations,
            finalResult: this.#finalResult,
            onToggle: () => this.onResize(),
        };
        const viewOutput = {};
        this.#view(viewInput, viewOutput, this.contentElement);
        this.setDefaultFocusedElement(viewOutput.defaultFocusedElement ?? null);
    }
}
//# sourceMappingURL=CSSValueTraceView.js.map