// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as DataGrid from '../../ui/components/data_grid/data_grid.js';
import * as Linkifier from '../../ui/components/linkifier/linkifier.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
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
    rejectPercentage: '% of slow-path non-matches',
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
    constructor() {
        super();
        this.#datagrid = new DataGrid.DataGridController.DataGridController();
        this.#selectorLocations = new Map();
        this.#datagrid.data = {
            label: i18nString(UIStrings.selectorStats),
            showScrollbar: true,
            initialSort: {
                columnId: "elapsed (us)" /* SelectorTimingsKey.Elapsed */,
                direction: "DESC" /* DataGrid.DataGridUtils.SortDirection.DESC */,
            },
            columns: [
                {
                    id: "elapsed (us)" /* SelectorTimingsKey.Elapsed */,
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
                    id: "match_attempts" /* SelectorTimingsKey.MatchAttempts */,
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
                    id: "match_count" /* SelectorTimingsKey.MatchCount */,
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
                    id: "reject_percentage" /* SelectorTimingsKey.RejectPercentage */,
                    title: i18nString(UIStrings.rejectPercentage),
                    sortable: true,
                    widthWeighting: 1,
                    visible: true,
                    hideable: true,
                    styles: {
                        'text-align': 'right',
                    },
                },
                {
                    id: "selector" /* SelectorTimingsKey.Selector */,
                    title: i18nString(UIStrings.selector),
                    sortable: true,
                    widthWeighting: 4,
                    visible: true,
                    hideable: true,
                },
                {
                    id: "style_sheet_id" /* SelectorTimingsKey.StyleSheetId */,
                    title: i18nString(UIStrings.styleSheetId),
                    sortable: true,
                    widthWeighting: 4,
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
                                if (cell.columnId === "style_sheet_id" /* SelectorTimingsKey.StyleSheetId */) {
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
        const selectorStats = event.args['selector_stats'];
        if (!selectorStats) {
            this.#datagrid.data = { ...this.#datagrid.data, rows: [] };
            return false;
        }
        // Host.userMetrics.recordPerformancePanelAction(Host.UserMetrics.PerformancePanelAction.ViewSelectorStats);
        const timings = selectorStats['selector_timings'];
        void this.createRowsForTable(timings).then(rows => {
            this.#datagrid.data = { ...this.#datagrid.data, rows };
        });
        return true;
    }
    setAggregatedEvent(events) {
        const timings = [];
        const selectorMap = new Map();
        while (events.length > 0) {
            const e = events.pop();
            const selectorStats = e?.args['selector_stats'];
            if (!selectorStats) {
                continue;
            }
            else {
                const data = selectorStats['selector_timings'];
                for (const timing of data) {
                    const key = timing["selector" /* SelectorTimingsKey.Selector */] + '_' + timing["style_sheet_id" /* SelectorTimingsKey.StyleSheetId */];
                    const findTiming = selectorMap.get(key);
                    if (findTiming !== undefined) {
                        findTiming["elapsed (us)" /* SelectorTimingsKey.Elapsed */] += timing["elapsed (us)" /* SelectorTimingsKey.Elapsed */];
                        findTiming["fast_reject_count" /* SelectorTimingsKey.FastRejectCount */] += timing["fast_reject_count" /* SelectorTimingsKey.FastRejectCount */];
                        findTiming["match_attempts" /* SelectorTimingsKey.MatchAttempts */] += timing["match_attempts" /* SelectorTimingsKey.MatchAttempts */];
                        findTiming["match_count" /* SelectorTimingsKey.MatchCount */] += timing["match_count" /* SelectorTimingsKey.MatchCount */];
                    }
                    else {
                        selectorMap.set(key, structuredClone(timing));
                    }
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
            return false;
        }
        void this.createRowsForTable(timings).then(rows => {
            this.#datagrid.data = { ...this.#datagrid.data, rows };
        });
        return true;
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
            const key = JSON.stringify({ selectorText: selectorText, styleSheetId: styleSheetId });
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
            const styleSheetId = x["style_sheet_id" /* SelectorTimingsKey.StyleSheetId */];
            const selectorText = x["selector" /* SelectorTimingsKey.Selector */].trim();
            const elapsedTimeInMs = x["elapsed (us)" /* SelectorTimingsKey.Elapsed */] / 1000.0;
            const nonMatches = x["match_attempts" /* SelectorTimingsKey.MatchAttempts */] - x["match_count" /* SelectorTimingsKey.MatchCount */];
            const rejectPercentage = (nonMatches ? x["fast_reject_count" /* SelectorTimingsKey.FastRejectCount */] / nonMatches : 1) * 100;
            const locations = await toSourceFileLocation(cssModel, styleSheetId, selectorText, this.#selectorLocations);
            return {
                cells: [
                    {
                        columnId: "elapsed (us)" /* SelectorTimingsKey.Elapsed */,
                        value: elapsedTimeInMs,
                        renderer() {
                            return LitHtml.html `${elapsedTimeInMs.toFixed(3)}`;
                        },
                    },
                    {
                        columnId: "reject_percentage" /* SelectorTimingsKey.RejectPercentage */,
                        value: rejectPercentage,
                        renderer() {
                            return LitHtml.html `${rejectPercentage.toFixed(2)}`;
                        },
                    },
                    { columnId: "match_attempts" /* SelectorTimingsKey.MatchAttempts */, value: x["match_attempts" /* SelectorTimingsKey.MatchAttempts */] },
                    { columnId: "match_count" /* SelectorTimingsKey.MatchCount */, value: x["match_count" /* SelectorTimingsKey.MatchCount */] },
                    {
                        columnId: "selector" /* SelectorTimingsKey.Selector */,
                        title: x["selector" /* SelectorTimingsKey.Selector */],
                        value: x["selector" /* SelectorTimingsKey.Selector */],
                    },
                    {
                        columnId: "style_sheet_id" /* SelectorTimingsKey.StyleSheetId */,
                        value: x["style_sheet_id" /* SelectorTimingsKey.StyleSheetId */],
                        renderer() {
                            if (!locations) {
                                return LitHtml.html `<span title=${i18nString(UIStrings.unableToLinkViaStyleSheetId, {
                                    PH1: x["style_sheet_id" /* SelectorTimingsKey.StyleSheetId */],
                                })} aria-label=${i18nString(UIStrings.unableToLinkViaStyleSheetId, {
                                    PH1: x["style_sheet_id" /* SelectorTimingsKey.StyleSheetId */],
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