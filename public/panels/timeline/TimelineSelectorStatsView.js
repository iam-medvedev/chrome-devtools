// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as DataGrid from '../../ui/components/data_grid/data_grid.js';
import * as Linkifier from '../../ui/components/linkifier/linkifier.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
const UIStrings = {
    /**
     *@description Label for selector stats data table
     */
    selectorStats: 'Selector Stats',
    /**
     *@description Column name and time unit for elapsed time spent computing a style rule
     */
    elapsed: 'Elapsed (ms)',
    /**
     *@description Column name and percentage of slow mach non-matches computing a style rule
     */
    rejectPercentage: '% of Slow-Path Non-Matches',
    /**
     *@description Tooltip description '% of slow-path non-matches'
     */
    rejectPercentageExplanation: 'The percentage of non-matching nodes (Match Attempts - Match Count) that couldn\'t be quickly ruled out by the bloom filter. Lower is better.',
    /**
     *@description Column name for count of elements that the engine attempted to match against a style rule
     */
    matchAttempts: 'Match Attempts',
    /**
     *@description Column name for count of elements that matched a style rule
     */
    matchCount: 'Match Count',
    /**
     *@description Column name for a style rule's CSS selector text
     */
    selector: 'Selector',
    /**
     *@description Column name for a style rule's CSS selector text
     */
    styleSheetId: 'Style Sheet',
    /**
     *@description A context menu item in data grids to copy entire table to clipboard
     */
    copyTable: 'Copy Table',
    /**
     *@description A cell value displayed in table when no source file can be traced via css style
     */
    unableToLink: 'Unable to link',
    /**
     *@description Tooltip for the cell that no source file can be traced via style sheet id
     *@example {style-sheet-4} PH1
     */
    unableToLinkViaStyleSheetId: 'Unable to link via {PH1}',
    /**
     *@description Text for announcing that the entire table was copied to clipboard
     */
    tableCopiedToClipboard: 'Table copied to clipboard',
    /**
     *@description Text shown as the "Selectelector" cell value for one row of the Selector Stats table, however this particular row is the totals. While normally the Selector cell is values like "div.container", the parenthesis can denote this description is not an actual selector, but a general row description.
     */
    totalForAllSelectors: '(Totals for all selectors)',
    /**
     *@description Text for showing the location of a selector in the style sheet
     *@example {256} PH1
     *@example {14} PH2
     */
    lineNumber: 'Line {PH1}:{PH2}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/TimelineSelectorStatsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class TimelineSelectorStatsView extends UI.Widget.VBox {
    #datagrid;
    #selectorLocations;
    #traceParsedData = null;
    /**
     * We store the last event (or array of events) that we renderered. We do
     * this because as the user zooms around the panel this view is updated,
     * however if the set of events that are populating the view is the same as it
     * was the last time, we can bail without doing any re-rendering work.
     * If the user views a single event, this will be set to that single event, but if they are viewing a range of events, this will be set to an array.
     * If it's null, that means we have not rendered yet.
     */
    #lastStatsSourceEventOrEvents = null;
    constructor(traceParsedData) {
        super();
        this.#datagrid = new DataGrid.DataGridController.DataGridController();
        this.element.setAttribute('jslog', `${VisualLogging.pane('selector-stats').track({ resize: true })}`);
        this.#selectorLocations = new Map();
        this.#traceParsedData = traceParsedData;
        this.#datagrid.data = {
            label: i18nString(UIStrings.selectorStats),
            showScrollbar: true,
            autoScrollToBottom: false,
            initialSort: {
                columnId: "elapsed (us)" /* SelectorTimingsKey.ELAPSED */,
                direction: "DESC" /* DataGrid.DataGridUtils.SortDirection.DESC */,
            },
            columns: [
                {
                    id: "elapsed (us)" /* SelectorTimingsKey.ELAPSED */,
                    title: i18nString(UIStrings.elapsed),
                    sortable: true,
                    widthWeighting: 1,
                    visible: true,
                    hideable: true,
                    styles: {
                        'text-align': 'right',
                    },
                },
                {
                    id: "match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */,
                    title: i18nString(UIStrings.matchAttempts),
                    sortable: true,
                    widthWeighting: 1,
                    visible: true,
                    hideable: true,
                    styles: {
                        'text-align': 'right',
                    },
                },
                {
                    id: "match_count" /* SelectorTimingsKey.MATCH_COUNT */,
                    title: i18nString(UIStrings.matchCount),
                    sortable: true,
                    widthWeighting: 1,
                    visible: true,
                    hideable: true,
                    styles: {
                        'text-align': 'right',
                    },
                },
                {
                    id: "reject_percentage" /* SelectorTimingsKey.REJECT_PERCENTAGE */,
                    title: i18nString(UIStrings.rejectPercentage),
                    titleElement: LitHtml.html `<span title=${i18nString(UIStrings.rejectPercentageExplanation)}>${i18nString(UIStrings.rejectPercentage)}</span>`,
                    sortable: true,
                    widthWeighting: 1,
                    visible: true,
                    hideable: true,
                    styles: {
                        'text-align': 'right',
                    },
                },
                {
                    id: "selector" /* SelectorTimingsKey.SELECTOR */,
                    title: i18nString(UIStrings.selector),
                    sortable: true,
                    widthWeighting: 3,
                    visible: true,
                    hideable: true,
                },
                {
                    id: "style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */,
                    title: i18nString(UIStrings.styleSheetId),
                    sortable: true,
                    widthWeighting: 1.5,
                    visible: true,
                    hideable: true,
                },
            ],
            rows: [],
            contextMenus: {
                bodyRow: (menu, columns, row, rows) => {
                    menu.defaultSection().appendItem(i18nString(UIStrings.copyTable), () => {
                        const tableData = [];
                        const columnName = columns.map(col => col.title);
                        tableData.push(columnName.join('\t'));
                        for (const rowData of rows) {
                            const cellsValue = rowData.cells;
                            const rowValue = cellsValue.map(cell => {
                                if (cell.columnId === "style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */) {
                                    // Export link via raw StyleSheetId data
                                    const defaultLinkValue = i18nString(UIStrings.unableToLink);
                                    let linkData = '';
                                    const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
                                    const cssModel = target?.model(SDK.CSSModel.CSSModel);
                                    if (cssModel) {
                                        const styleSheetHeader = cssModel.styleSheetHeaderForId(cell.value);
                                        if (styleSheetHeader) {
                                            linkData = styleSheetHeader.resourceURL().toString();
                                        }
                                    }
                                    return linkData ? linkData.toString() : defaultLinkValue;
                                }
                                return String(cell.value);
                            });
                            tableData.push(rowValue.join('\t'));
                        }
                        const data = tableData.join('\n');
                        void navigator.clipboard.writeText(data);
                        UI.ARIAUtils.alert(i18nString(UIStrings.tableCopiedToClipboard));
                    });
                },
            },
        };
        this.contentElement.appendChild(this.#datagrid);
    }
    setEvent(event) {
        if (!this.#traceParsedData) {
            return false;
        }
        if (this.#lastStatsSourceEventOrEvents === event) {
            // The event that is populating the selector stats table has not changed,
            // so no need to do any work because the data will be the same.
            return false;
        }
        this.#lastStatsSourceEventOrEvents = event;
        const selectorStats = this.#traceParsedData.SelectorStats.dataForUpdateLayoutEvent.get(event);
        if (!selectorStats) {
            this.#datagrid.data = { ...this.#datagrid.data, rows: [] };
            return false;
        }
        const timings = selectorStats.timings;
        void this.createRowsForTable(timings).then(rows => {
            this.#datagrid.data = { ...this.#datagrid.data, rows };
        });
        return true;
    }
    setAggregatedEvents(events) {
        const timings = [];
        const selectorMap = new Map();
        if (!this.#traceParsedData) {
            return;
        }
        const sums = {
            ["elapsed (us)" /* SelectorTimingsKey.ELAPSED */]: 0,
            ["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */]: 0,
            ["match_count" /* SelectorTimingsKey.MATCH_COUNT */]: 0,
            ["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */]: 0,
        };
        // Now we want to check if the set of events we have been given matches the
        // set of events we last rendered. We can't just compare the arrays because
        // they will be different events, so instead for each event in the new
        // array we see if it has a match in the old set of events at the same
        // index.
        if (Array.isArray(this.#lastStatsSourceEventOrEvents)) {
            if (this.#lastStatsSourceEventOrEvents.length === events.length && events.every((event, index) => {
                // This is true due to the isArray check, but without this cast TS
                // would want us to repeat the isArray() check inside this callback,
                // but we want to avoid that extra work.
                const previousEvents = this.#lastStatsSourceEventOrEvents;
                return event === previousEvents[index];
            })) {
                return;
            }
        }
        this.#lastStatsSourceEventOrEvents = events;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const selectorStats = event ? this.#traceParsedData.SelectorStats.dataForUpdateLayoutEvent.get(event) : undefined;
            if (!selectorStats) {
                continue;
            }
            else {
                const data = selectorStats.timings;
                for (const timing of data) {
                    const key = timing["selector" /* SelectorTimingsKey.SELECTOR */] + '_' + timing["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */];
                    const findTiming = selectorMap.get(key);
                    if (findTiming !== undefined) {
                        findTiming["elapsed (us)" /* SelectorTimingsKey.ELAPSED */] += timing["elapsed (us)" /* SelectorTimingsKey.ELAPSED */];
                        findTiming["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */] += timing["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */];
                        findTiming["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */] += timing["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */];
                        findTiming["match_count" /* SelectorTimingsKey.MATCH_COUNT */] += timing["match_count" /* SelectorTimingsKey.MATCH_COUNT */];
                    }
                    else {
                        selectorMap.set(key, structuredClone(timing));
                    }
                    // Keep track of the total times for a sum row.
                    sums["elapsed (us)" /* SelectorTimingsKey.ELAPSED */] += timing["elapsed (us)" /* SelectorTimingsKey.ELAPSED */];
                    sums["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */] += timing["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */];
                    sums["match_count" /* SelectorTimingsKey.MATCH_COUNT */] += timing["match_count" /* SelectorTimingsKey.MATCH_COUNT */];
                    sums["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */] += timing["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */];
                }
            }
        }
        if (selectorMap.size > 0) {
            selectorMap.forEach(timing => {
                timings.push(timing);
            });
            selectorMap.clear();
        }
        else {
            this.#datagrid.data = { ...this.#datagrid.data, rows: [] };
            return;
        }
        // Add the sum row.
        timings.unshift({
            ["elapsed (us)" /* SelectorTimingsKey.ELAPSED */]: sums["elapsed (us)" /* SelectorTimingsKey.ELAPSED */],
            ["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */]: sums["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */],
            ["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */]: sums["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */],
            ["match_count" /* SelectorTimingsKey.MATCH_COUNT */]: sums["match_count" /* SelectorTimingsKey.MATCH_COUNT */],
            ["selector" /* SelectorTimingsKey.SELECTOR */]: i18nString(UIStrings.totalForAllSelectors),
            ["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */]: 'n/a',
        });
        void this.createRowsForTable(timings).then(rows => {
            this.#datagrid.data = { ...this.#datagrid.data, rows };
        });
    }
    async createRowsForTable(timings) {
        async function toSourceFileLocation(cssModel, styleSheetId, selectorText, selectorLocations) {
            if (!cssModel) {
                return undefined;
            }
            const styleSheetHeader = cssModel.styleSheetHeaderForId(styleSheetId);
            if (!styleSheetHeader || !styleSheetHeader.resourceURL()) {
                return undefined;
            }
            // get the locations from cache if available
            const key = JSON.stringify({ selectorText, styleSheetId });
            let ranges = selectorLocations.get(key);
            if (!ranges) {
                const result = await cssModel.agent.invoke_getLocationForSelector({ styleSheetId, selectorText });
                if (result.getError() || !result.ranges) {
                    return undefined;
                }
                ranges = result.ranges;
                selectorLocations.set(key, ranges);
            }
            const linkData = ranges.map(range => {
                return {
                    url: styleSheetHeader.resourceURL(),
                    lineNumber: range.startLine,
                    columnNumber: range.startColumn,
                    linkText: i18nString(UIStrings.lineNumber, { PH1: range.startLine + 1, PH2: range.startColumn + 1 }),
                };
            });
            return linkData;
        }
        const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        const cssModel = target?.model(SDK.CSSModel.CSSModel);
        if (!cssModel) {
            return [];
        }
        const rows = await Promise.all(timings.map(async (x) => {
            const styleSheetId = x["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */];
            const selectorText = x["selector" /* SelectorTimingsKey.SELECTOR */].trim();
            const elapsedTimeInMs = x["elapsed (us)" /* SelectorTimingsKey.ELAPSED */] / 1000.0;
            const nonMatches = x["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */] - x["match_count" /* SelectorTimingsKey.MATCH_COUNT */];
            const rejectPercentage = (nonMatches ? x["fast_reject_count" /* SelectorTimingsKey.FAST_REJECT_COUNT */] / nonMatches : 1) * 100;
            const locations = styleSheetId === 'n/a' ?
                null :
                await toSourceFileLocation(cssModel, styleSheetId, selectorText, this.#selectorLocations);
            return {
                cells: [
                    {
                        columnId: "elapsed (us)" /* SelectorTimingsKey.ELAPSED */,
                        value: elapsedTimeInMs,
                        renderer() {
                            return LitHtml.html `${elapsedTimeInMs.toFixed(3)}`;
                        },
                    },
                    { columnId: "match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */, value: x["match_attempts" /* SelectorTimingsKey.MATCH_ATTEMPTS */] },
                    { columnId: "match_count" /* SelectorTimingsKey.MATCH_COUNT */, value: x["match_count" /* SelectorTimingsKey.MATCH_COUNT */] },
                    {
                        columnId: "reject_percentage" /* SelectorTimingsKey.REJECT_PERCENTAGE */,
                        value: rejectPercentage,
                        renderer() {
                            return LitHtml.html `${rejectPercentage.toFixed(1)}`;
                        },
                    },
                    {
                        columnId: "selector" /* SelectorTimingsKey.SELECTOR */,
                        title: x["selector" /* SelectorTimingsKey.SELECTOR */],
                        value: x["selector" /* SelectorTimingsKey.SELECTOR */],
                    },
                    {
                        columnId: "style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */,
                        value: x["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */],
                        renderer() {
                            if (locations === null) {
                                return LitHtml.html `<span></span>`;
                            }
                            if (locations === undefined) {
                                return LitHtml.html `<span title=${i18nString(UIStrings.unableToLinkViaStyleSheetId, {
                                    PH1: x["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */],
                                })} aria-label=${i18nString(UIStrings.unableToLinkViaStyleSheetId, {
                                    PH1: x["style_sheet_id" /* SelectorTimingsKey.STYLE_SHEET_ID */],
                                })}>${i18nString(UIStrings.unableToLink)}</span>`;
                            }
                            return LitHtml.html `
              ${locations.map((location, itemIndex) => {
                                if (itemIndex !== locations.length - 1) {
                                    // eslint-disable-next-line rulesdir/ban_a_tags_in_lit_html
                                    return LitHtml.html `<${Linkifier.Linkifier.Linkifier.litTagName} .data=${location}></${Linkifier.Linkifier.Linkifier.litTagName}>
                    <a>, </a>`;
                                }
                                return LitHtml.html `<${Linkifier.Linkifier.Linkifier.litTagName} .data=${location}></${Linkifier.Linkifier.Linkifier.litTagName}>`;
                            })}
              `;
                        },
                    },
                ],
            };
        }));
        return rows;
    }
}
//# sourceMappingURL=TimelineSelectorStatsView.js.map