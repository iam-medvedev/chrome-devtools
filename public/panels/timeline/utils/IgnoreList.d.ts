import type * as Platform from '../../../core/platform/platform.js';
import * as Bindings from '../../../models/bindings/bindings.js';
import * as Trace from '../../../models/trace/trace.js';
export declare function isIgnoreListedEntry(entry: Trace.Types.Events.Event): boolean;
export declare function isIgnoreListedURL(url: Platform.DevToolsPath.UrlString, options?: Bindings.IgnoreListManager.IgnoreListGeneralRules): boolean;
