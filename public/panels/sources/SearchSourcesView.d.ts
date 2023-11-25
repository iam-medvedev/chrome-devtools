import * as UI from '../../ui/legacy/legacy.js';
import * as Search from '../search/search.js';
export declare class SearchSourcesView extends Search.SearchView.SearchView {
    private constructor();
    static instance(): SearchSourcesView;
    static openSearch(query: string, searchImmediately?: boolean): Promise<UI.Widget.Widget>;
    createScope(): Search.SearchScope.SearchScope;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, _actionId: string): boolean;
    private showSearch;
}
