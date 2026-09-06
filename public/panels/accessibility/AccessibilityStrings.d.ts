import * as i18n from '../../core/i18n/i18n.js';
import type * as Protocol from '../../generated/protocol.js';
export declare const AXAttributes: Record<string, {
    name: i18n.LazyLocalizeString;
    description: i18n.LazyLocalizeString;
    group?: string;
}>;
export declare const AXSourceTypes: Record<Protocol.Accessibility.AXValueSourceType, {
    name: i18n.LazyLocalizeString;
    description: i18n.LazyLocalizeString;
}>;
export declare const AXNativeSourceTypes: Record<Protocol.Accessibility.AXValueNativeSourceType, {
    name: i18n.LazyLocalizeString;
    description: i18n.LazyLocalizeString;
}>;
