import * as SDK from '../../core/sdk/sdk.js';
import * as NetworkTimeCalculator from '../../models/network_time_calculator/network_time_calculator.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class RequestTimingView extends UI.Widget.VBox {
    private request;
    private calculator;
    private lastMinimumBoundary;
    private tableElement?;
    constructor(request: SDK.NetworkRequest.NetworkRequest, calculator: NetworkTimeCalculator.NetworkTimeCalculator);
    private static timeRangeTitle;
    static createTimingTable(request: SDK.NetworkRequest.NetworkRequest, calculator: NetworkTimeCalculator.NetworkTimeCalculator): Element;
    private constructFetchDetailsView;
    private getLocalizedResponseSourceForCode;
    private onToggleFetchDetails;
    private constructRouterEvaluationView;
    private onToggleRouterEvaluationDetails;
    wasShown(): void;
    willHide(): void;
    private refresh;
    private boundaryChanged;
}
