import type * as SDK from '../../core/sdk/sdk.js';
import * as SourceFrame from '../../ui/legacy/components/source_frame/source_frame.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class RequestResponseView extends UI.Widget.VBox {
    #private;
    request: SDK.NetworkRequest.NetworkRequest;
    private contentViewPromise;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    wasShown(): void;
    private doShowPreview;
    showPreview(): Promise<UI.Widget.Widget>;
    createPreview(): Promise<UI.Widget.Widget>;
    revealPosition(position: SourceFrame.SourceFrame.RevealPosition): Promise<void>;
}
