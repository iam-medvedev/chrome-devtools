import '../../ui/legacy/legacy.js';
import '../../ui/components/icon_button/icon_button.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import { SearchResultsPane } from './SearchResultsPane.js';
import type { SearchScope } from './SearchScope.js';
interface SearchViewInput {
    query: string;
    matchCase: boolean;
    isRegex: boolean;
    searchMessage: string;
    searchResultsMessage: string;
    searchResultsPane: SearchResultsPane | null;
    progress: Common.Progress.Progress | null;
    onQueryChange: (query: string) => void;
    onQueryKeyDown: (evt: KeyboardEvent) => void;
    onPanelKeyDown: (evt: KeyboardEvent) => void;
    onClearSearchInput: () => void;
    onToggleRegex: () => void;
    onToggleMatchCase: () => void;
    onRefresh: () => void;
    onClearSearch: () => void;
}
interface SearchViewOutput {
    focusSearchInput: () => void;
}
type View = (input: SearchViewInput, output: SearchViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class SearchView extends UI.Widget.VBox {
    #private;
    constructor(settingKey: string, throttler: Common.Throttler.Throttler, view?: View);
    performUpdate(): void;
    toggle(queryCandidate: string, searchImmediately?: boolean): void;
    createScope(): SearchScope;
    protected createSearchResultsPane(): SearchResultsPane;
    focus(): void;
    willHide(): void;
    get throttlerForTest(): Common.Throttler.Throttler;
}
export {};
