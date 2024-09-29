import type * as Platform from '../../../core/platform/platform.js';
import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
/**
 * Use this helper whenever resolving an URL's source mapping is not an
 * option. For example when processing non-ui data. Otherwise use the
 * helper SourceMapsResolver::resolvedURLForEntry
 *
 * If an URL will be displayed in the UI, it's likely you should not use
 * this helper and prefer the other option instead.
 */
export declare function getNonResolved(parsedTrace: Handlers.Types.ParsedTrace, entry: Types.Events.Event): Platform.DevToolsPath.UrlString | null;
