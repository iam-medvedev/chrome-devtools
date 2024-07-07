import type * as TraceEngine from '../../../models/trace/trace.js';
export declare enum NetworkCategory {
    HTML = "HTML",
    Script = "Script",
    Style = "Style",
    Media = "Media",
    Other = "Other"
}
export declare function colorForNetworkCategory(category: NetworkCategory): string;
export declare function colorForNetworkRequest(request: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest): string;
