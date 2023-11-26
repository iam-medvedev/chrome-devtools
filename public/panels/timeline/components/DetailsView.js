// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Platform from '../../../core/platform/platform.js';
import * as TraceEngine from '../../../models/trace/trace.js';
import * as UI from '../../../ui/legacy/legacy.js';
// *********************************************************************
// At the moment this file consists of helpers to aid in the rendering
// of events details in the bottom drawer. In the future, we should use
// LitHtml for this section, and update this helpers accordingly.
// *********************************************************************
const UIStrings = {
    /**
     *@description Text in the Performance panel for a forced style and layout calculation of elements
     * in a page. See https://developer.mozilla.org/en-US/docs/Glossary/Reflow
     */
    forcedReflow: 'Forced reflow',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     *@example {Forced reflow} PH1
     */
    sIsALikelyPerformanceBottleneck: '{PH1} is a likely performance bottleneck.',
    /**
     *@description Text in the Performance panel for a function called during a time the browser was
     * idle (inactive), which to longer to execute than a predefined deadline.
     *@example {10ms} PH1
     */
    idleCallbackExecutionExtended: 'Idle callback execution extended beyond deadline by {PH1}',
    /**
     *@description Text in the Performance panel which describes how long a task took.
     *@example {task} PH1
     *@example {10ms} PH2
     */
    sTookS: '{PH1} took {PH2}.',
    /**
     *@description Text in the Performance panel for a task that took long. See
     * https://developer.mozilla.org/en-US/docs/Glossary/Long_task
     */
    longTask: 'Long task',
    /**
     *@description Text used to highlight a long interaction and link to web.dev/inp
     */
    longInteractionINP: 'Long interaction',
    /**
     *@description Text in Timeline UIUtils of the Performance panel when the
     *             user clicks on a long interaction.
     *@example {Long interaction} PH1
     */
    sIsLikelyPoorPageResponsiveness: '{PH1} is indicating poor page responsiveness.',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    websocketProtocol: 'WebSocket Protocol',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/DetailsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function buildWarningElementsForEvent(event, traceParsedData) {
    const warnings = traceParsedData.Warnings.perEvent.get(event);
    const warningElements = [];
    if (!warnings) {
        return warningElements;
    }
    for (const warning of warnings) {
        const duration = TraceEngine.Helpers.Timing.microSecondsToMilliseconds(TraceEngine.Types.Timing.MicroSeconds(event.dur || 0));
        const span = document.createElement('span');
        switch (warning) {
            case 'FORCED_STYLE':
            case 'FORCED_LAYOUT': {
                const forcedReflowLink = UI.XLink.XLink.create('https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts', i18nString(UIStrings.forcedReflow));
                span.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.sIsALikelyPerformanceBottleneck, { PH1: forcedReflowLink }));
                break;
            }
            case 'IDLE_CALLBACK_OVER_TIME': {
                if (!TraceEngine.Types.TraceEvents.isTraceEventFireIdleCallback(event)) {
                    break;
                }
                const exceededMs = i18n.TimeUtilities.millisToString((duration || 0) - event.args.data['allottedMilliseconds'], true);
                span.textContent = i18nString(UIStrings.idleCallbackExecutionExtended, { PH1: exceededMs });
                break;
            }
            case 'LONG_TASK': {
                const longTaskLink = UI.XLink.XLink.create('https://web.dev/optimize-long-tasks/', i18nString(UIStrings.longTask));
                span.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.sTookS, { PH1: longTaskLink, PH2: i18n.TimeUtilities.millisToString((duration || 0), true) }));
                break;
            }
            case 'LONG_INTERACTION': {
                const longInteractionINPLink = UI.XLink.XLink.create('https://web.dev/inp', i18nString(UIStrings.longInteractionINP));
                span.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.sIsLikelyPoorPageResponsiveness, { PH1: longInteractionINPLink }));
                break;
            }
            default: {
                Platform.assertNever(warning, `Unhandled warning type ${warning}`);
            }
        }
        warningElements.push(span);
    }
    return warningElements;
}
export function buildRowsForWebSocketEvent(event, traceParsedData) {
    const rows = [];
    const initiator = traceParsedData.Initiators.eventToInitiator.get(event);
    if (initiator && TraceEngine.Types.TraceEvents.isTraceEventWebSocketCreate(initiator)) {
        // The initiator will be a WebSocketCreate, but this check helps TypeScript to understand.
        rows.push({ key: i18n.i18n.lockedString('URL'), value: initiator.args.data.url });
        if (initiator.args.data.websocketProtocol) {
            rows.push({ key: i18nString(UIStrings.websocketProtocol), value: initiator.args.data.websocketProtocol });
        }
    }
    else if (TraceEngine.Types.TraceEvents.isTraceEventWebSocketCreate(event)) {
        rows.push({ key: i18n.i18n.lockedString('URL'), value: event.args.data.url });
        if (event.args.data.websocketProtocol) {
            rows.push({ key: i18nString(UIStrings.websocketProtocol), value: event.args.data.websocketProtocol });
        }
    }
    return rows;
}
//# sourceMappingURL=DetailsView.js.map