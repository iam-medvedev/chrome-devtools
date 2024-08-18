import * as Platform from '../platform/platform.js';
type NameValue = Platform.ServerTiming.NameValue;
/**
 * This is a wrapper for the ServerTiming implementation in
 * core/platform which uses localized strings for warnings. The
 * implementation at core/platform/ is kept without dependencies to the
 * i18n moduke so that it remains portable outside of devtools, which is
 * needed to be used by the trace/ model of the Performance panel.
 */
export declare class ServerTiming extends Platform.ServerTiming.ServerTiming {
    static parseHeaders(headers: NameValue[]): ServerTiming[] | null;
    /**
     * TODO(crbug.com/1011811): Instead of using !Object<string, *> we should have a proper type
     *                          with #name, desc and dur properties.
     */
    static createFromHeaderValue(valueString: string): {
        [x: string]: any;
    }[];
    static getParserForParameter(paramName: string): ((arg0: {
        [x: string]: any;
    }, arg1: string | null) => void) | null;
}
export {};
