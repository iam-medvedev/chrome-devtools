import { type MetricRating } from './Utils.js';
export type CompareRating = 'better' | 'worse' | 'similar';
export declare function renderCompareText(options: {
    metric: string;
    rating: MetricRating;
    compare?: CompareRating;
    localValue: Element;
}): Element;
export declare function renderDetailedCompareText(options: {
    metric: string;
    localRating: MetricRating;
    fieldRating?: MetricRating;
    localValue: Element;
    fieldValue: Element;
    percent: string;
}): Element;
