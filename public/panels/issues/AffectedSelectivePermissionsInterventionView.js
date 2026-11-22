// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected violations in the selective permissions intervention table.
     */
    nViolations: '{n, plural, =1 {# violation} other {# violations}}',
    /**
     * @description Column header in the Issues panel for API names in the selective permissions intervention affected resources table.
     */
    api: 'API',
    /**
     * @description Column header in the Issues panel for scripts in the selective permissions intervention affected resources table.
     */
    script: 'Script',
    /**
     * @description Column header in the Issues panel for ad ancestry in the selective permissions intervention affected resources table.
     */
    adAncestry: 'Ad ancestry',
    /**
     * @description Fallback text in the Issues panel when a stack trace is unknown in the selective permissions intervention affected resources table.
     */
    unknown: 'Unknown',
    /**
     * @description Text in the Issues panel displayed while a stack trace is loading in the selective permissions intervention affected resources table.
     */
    loading: 'Loading…',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedSelectivePermissionsInterventionView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { widget } = UI.Widget;
const STACK_TRACE_OPTIONS = {
    expandable: true,
};
export const DEFAULT_VIEW = (input, _output, target) => {
    const renderScriptCell = (script) => {
        switch (script.status) {
            case 'unknown':
                return html `<span>${i18nString(UIStrings.unknown)}</span>`;
            case 'loading':
                return html `<span>${i18nString(UIStrings.loading)}</span>`;
            case 'ready':
                return html `${widget(Components.JSPresentationUtils.StackTracePreviewContent, {
                    stackTrace: script.stackTrace,
                    options: STACK_TRACE_OPTIONS,
                })}`;
            default:
                Platform.assertNever(script, `Unhandled script cell state: ${JSON.stringify(script)}`);
        }
    };
    // clang-format off
    render(html `
    <tr>
      <td class="affected-resource-header">${i18nString(UIStrings.api)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.script)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.adAncestry)}</td>
    </tr>
    ${input.rows.map(row => html `
      <tr class="affected-resource-directive">
        <td>${row.apiName}</td>
        <td>${renderScriptCell(row.script)}</td>
        <td class="affected-resource-cell">
          <div class="ad-ancestry-list">
            ${row.adAncestryScripts.map(script => html `
              <div>${widget(Components.Linkifier.ScriptLocationLink, {
        target: script.target ?? undefined,
        scriptId: script.scriptId,
        sourceURL: Platform.DevToolsPath.EmptyUrlString,
        lineNumber: 0,
    })}</div>
            `)}
            ${row.rootScriptFilterlistRule ? html `<div>Rule: ${row.rootScriptFilterlistRule}</div>` : nothing}
          </div>
        </td>
      </tr>
    `)}
  `, target);
    // clang-format on
};
export class AffectedSelectivePermissionsInterventionView extends AffectedResourcesView {
    #view;
    #updateId = 0;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nViolations, { n: count });
    }
    #appendDetails(issues) {
        const updateId = ++this.#updateId;
        const rows = [];
        const pendingResolutions = [];
        for (const issue of issues) {
            const details = issue.details();
            const issuesModel = issue.model();
            const target = issuesModel && !issuesModel.target().isDisposed() ? issuesModel.target() : null;
            const rowIndex = rows.length;
            rows.push({
                apiName: details.apiName,
                script: (details.stackTrace && target) ? { status: 'loading' } : { status: 'unknown' },
                adAncestryScripts: (details.adAncestry?.ancestryChain ?? []).map(script => ({
                    target,
                    scriptId: script.scriptId,
                })),
                rootScriptFilterlistRule: details.adAncestry?.rootScriptFilterlistRule,
            });
            if (details.stackTrace && target) {
                pendingResolutions.push(this.#resolveStackTrace(details.stackTrace, target).then(stackTrace => {
                    if (updateId !== this.#updateId) {
                        return;
                    }
                    rows[rowIndex] = {
                        ...rows[rowIndex],
                        script: { status: 'ready', stackTrace },
                    };
                    this.#view({ rows: [...rows] }, undefined, this.affectedResources);
                }));
            }
        }
        this.#view({ rows: [...rows] }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
        void Promise.all(pendingResolutions);
    }
    async #resolveStackTrace(stackTrace, target) {
        const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
        return await debuggerWorkspaceBinding.createStackTraceFromProtocolRuntime(stackTrace, target);
    }
    clear() {
        ++this.#updateId;
        this.requestResolver.clear();
        this.#view({ rows: [] }, undefined, this.affectedResources);
    }
    update() {
        this.requestResolver.clear();
        this.#appendDetails(this.issue.getSelectivePermissionsInterventionIssues());
    }
}
//# sourceMappingURL=AffectedSelectivePermissionsInterventionView.js.map