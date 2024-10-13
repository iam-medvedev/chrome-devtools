import '../../../ui/components/chrome_link/chrome_link.js';
import '../../../ui/components/expandable_list/expandable_list.js';
import '../../../ui/components/report_view/report_view.js';
import '../../../ui/components/tree_outline/tree_outline.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class BackForwardCacheView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    constructor();
    connectedCallback(): void;
    render(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-back-forward-cache-view': BackForwardCacheView;
    }
}
