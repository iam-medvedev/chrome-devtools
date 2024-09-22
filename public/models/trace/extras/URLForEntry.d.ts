import type * as Platform from '../../../core/platform/platform.js';
import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
export declare function get(parsedTrace: Handlers.Types.ParsedTrace, entry: Types.Events.Event): Platform.DevToolsPath.UrlString | null;
