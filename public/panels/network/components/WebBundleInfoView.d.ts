import '../../../ui/legacy/components/data_grid/data_grid.js';
import '../../../ui/components/icon_button/icon_button.js';
import type * as SDK from '../../../core/sdk/sdk.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class WebBundleInfoView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    render(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-web-bundle-info': WebBundleInfoView;
    }
}
