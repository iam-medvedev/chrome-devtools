import * as Common from '../../core/common/common.js';
export type MetricNames = 'cumulative_layout_shift' | 'first_contentful_paint' | 'first_input_delay' | 'interaction_to_next_paint' | 'largest_contentful_paint' | 'experimental_time_to_first_byte';
export type FormFactor = 'DESKTOP' | 'PHONE' | 'TABLET';
export type DeviceScope = FormFactor | 'ALL';
export type PageScope = 'url' | 'origin';
export type ConnectionType = 'offline' | 'slow-2G' | '2G' | '3G' | '4G';
export interface CrUXRequest {
    effectiveConnectionType?: ConnectionType;
    formFactor?: FormFactor;
    metrics?: Array<MetricNames>;
    origin?: string;
    url?: string;
}
export interface MetricResponse {
    histogram: Array<{
        start: number;
        end?: number;
        density?: number;
    }>;
    percentiles: {
        p75: number | string;
    };
}
interface CollectionDate {
    year: number;
    month: number;
    day: number;
}
interface Record {
    key: Omit<CrUXRequest, 'metrics'>;
    metrics: {
        [K in MetricNames]?: MetricResponse;
    };
    collectionPeriod: {
        firstDate: CollectionDate;
        lastDate: CollectionDate;
    };
}
export interface CrUXResponse {
    record: Record;
    urlNormalizationDetails?: {
        originalUrl: string;
        normalizedUrl: string;
    };
}
export type PageResult = {
    [K in `${PageScope}-${DeviceScope}`]: CrUXResponse | null;
};
export interface ConfigSetting {
    enabled: boolean;
    override: string;
}
export declare const DEVICE_SCOPE_LIST: DeviceScope[];
export declare class CrUXManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): CrUXManager;
    getConfigSetting(): Common.Settings.Setting<ConfigSetting>;
    getFieldDataForPage(pageUrl: string): Promise<PageResult>;
    /**
     * In general, this function should use the main document URL
     * (i.e. the URL after all redirects but before SPA navigations)
     *
     * However, we can't detect the main document URL of the current page if it's
     * navigation occurred before DevTools was first opened. This function will fall
     * back to the currently inspected URL (i.e. what is displayed in the omnibox) if
     * the main document URL cannot be found.
     */
    getFieldDataForCurrentPage(): Promise<PageResult>;
    setEndpointForTesting(endpoint: string): void;
}
export declare const enum Events {
    FieldDataChanged = "field-data-changed"
}
type EventTypes = {
    [Events.FieldDataChanged]: PageResult | undefined;
};
export {};
