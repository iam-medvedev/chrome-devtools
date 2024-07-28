import type * as TraceEngine from '../../../models/trace/trace.js';
export declare enum NetworkCategory {
    Doc = "Doc",
    CSS = "CSS",
    JS = "JS",
    Font = "Font",
    Img = "Img",
    Media = "Media",
    Wasm = "Wasm",
    Other = "Other"
}
export declare function colorForNetworkCategory(category: NetworkCategory): string;
export declare function colorForNetworkRequest(request: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest): string;
