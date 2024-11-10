import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type NetworkTimeCalculator } from './NetworkTimeCalculator.js';
export declare class RequestTimingView extends UI.Widget.VBox {
    private request;
    private calculator;
    private lastMinimumBoundary;
    private tableElement?;
    constructor(request: SDK.NetworkRequest.NetworkRequest, calculator: NetworkTimeCalculator);
    private static timeRangeTitle;
    static calculateRequestTimeRanges(request: SDK.NetworkRequest.NetworkRequest, navigationStart: number): RequestTimeRange[];
    static createTimingTable(request: SDK.NetworkRequest.NetworkRequest, calculator: NetworkTimeCalculator): Element;
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
export declare const enum RequestTimeRangeNames {
    PUSH = "push",
    QUEUEING = "queueing",
    BLOCKING = "blocking",
    CONNECTING = "connecting",
    DNS = "dns",
    PROXY = "proxy",
    RECEIVING = "receiving",
    RECEIVING_PUSH = "receiving-push",
    SENDING = "sending",
    SERVICE_WORKER = "serviceworker",
    SERVICE_WORKER_PREPARATION = "serviceworker-preparation",
    SERVICE_WORKER_RESPOND_WITH = "serviceworker-respondwith",
    SERVICE_WORKER_ROUTER_EVALUATION = "serviceworker-routerevaluation",
    SERVICE_WORKER_CACHE_LOOKUP = "serviceworker-cachelookup",
    SSL = "ssl",
    TOTAL = "total",
    WAITING = "waiting"
}
export declare const ServiceWorkerRangeNames: Set<RequestTimeRangeNames>;
export declare const ConnectionSetupRangeNames: Set<RequestTimeRangeNames>;
export interface RequestTimeRange {
    name: RequestTimeRangeNames;
    start: number;
    end: number;
}
