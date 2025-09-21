import * as TextUtils from '../../models/text_utils/text_utils.js';
import type * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
import type { SearchResult } from './SearchScope.js';
export declare class SearchResultsPane extends UI.Widget.VBox {
    private readonly searchConfig;
    private readonly searchResults;
    private readonly treeElements;
    private readonly initializedTreeElements;
    private treeOutline;
    private matchesExpandedCount;
    constructor(searchConfig: Workspace.SearchConfig.SearchConfig);
    addSearchResult(searchResult: SearchResult): void;
    showAllMatches(): void;
    collapseAllResults(): void;
    private addTreeElement;
    private updateMatchesUI;
    private appendSearchMatches;
    private appendShowMoreMatchesElement;
    private regexMatchRanges;
    private showMoreMatchesElementSelected;
}
export declare const matchesExpandedByDefault = 200;
export declare const matchesShownAtOnce = 20;
declare const DEFAULT_OPTS: {
    prefixLength: number;
    maxLength: number;
};
/**
 * Takes a whole line and calculates the substring we want to actually display in the UI.
 * Also returns a translated {matchRange} (the parameter is relative to {lineContent} but the
 * caller needs it relative to {lineSegment}).
 *
 * {lineContent} is modified in the following way:
 *
 *   * Whitespace is trimmed from the beginning (unless the match includes it).
 *   * We only leave {options.prefixLength} characters before the match (and add an ellipsis in
 *     case we removed anything)
 *   * Truncate the remainder to {options.maxLength} characters.
 */
export declare function lineSegmentForMatch(lineContent: string, range: TextUtils.TextRange.SourceRange, optionsArg?: Partial<typeof DEFAULT_OPTS>): {
    lineSegment: string;
    matchRange: TextUtils.TextRange.SourceRange;
};
export {};
