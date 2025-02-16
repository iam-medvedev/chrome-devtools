import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
export declare const UIStrings: {
    /**
     * @description Title of an insight that recommends ways to reduce the size of images downloaded and used on the page.
     */
    title: string;
    /**
     * @description Description of an insight that recommends ways to reduce the size of images downloaded and used on the page.
     */
    description: string;
    /**
     * @description Message displayed in a chip explaining that an image file size is large for the # of pixels it has and recommends possible adjustments to improve the image size.
     */
    useCompression: string;
    /**
     * @description Message displayed in a chip explaining that an image file size is large for the # of pixels it has and recommends possible adjustments to improve the image size.
     */
    useModernFormat: string;
    /**
     * @description Message displayed in a chip advising the user to use video formats instead of GIFs because videos generally have smaller file sizes.
     */
    useVideoFormat: string;
    /**
     * @description Message displayed in a chip explaining that an image was displayed on the page with dimensions much smaller than the image file dimensions.
     * @example {1000x500} PH1
     * @example {100x50} PH2
     */
    useResponsiveSize: string;
    /**
     * @description Column header for a table column containing network requests for images which can improve their file size (e.g. use a different format, increase compression, etc).
     */
    optimizeFile: string;
    /**
     * @description Table row value representing the remaining items not shown in the table due to size constraints. This row will always represent at least 2 items.
     * @example {5} PH1
     */
    others: string;
    /**
     * @description Text status indicating that no potential optimizations were found for any image file
     */
    noOptimizableImages: string;
    /**
     * @description Text describing the estimated number of bytes that an image file optimization can save. This text is appended to another block of text describing the image optimization in more detail. "Est" means "Estimated".
     * @example {Use the correct image dimensions to reduce the image file size.} PH1
     * @example {50 MB} PH2
     */
    estimatedSavings: string;
};
export declare const i18nString: (id: string, values?: import("../../../core/i18n/i18nTypes.js").Values | undefined) => import("../../../core/platform/UIString.js").LocalizedString;
export declare function deps(): ['NetworkRequests', 'Meta', 'ImagePainting'];
export declare enum ImageOptimizationType {
    ADJUST_COMPRESSION = "ADJUST_COMPRESSION",
    MODERN_FORMAT_OR_COMPRESSION = "MODERN_FORMAT_OR_COMPRESSION",
    VIDEO_FORMAT = "VIDEO_FORMAT",
    RESPONSIVE_SIZE = "RESPONSIVE_SIZE"
}
export type ImageOptimization = {
    type: Exclude<ImageOptimizationType, ImageOptimizationType.RESPONSIVE_SIZE>;
    byteSavings: number;
} | {
    type: ImageOptimizationType.RESPONSIVE_SIZE;
    byteSavings: number;
    fileDimensions: {
        width: number;
        height: number;
    };
    displayDimensions: {
        width: number;
        height: number;
    };
};
export interface OptimizableImage {
    request: Types.Events.SyntheticNetworkRequest;
    optimizations: ImageOptimization[];
    byteSavings: number;
    /**
     * If the an image resource has multiple `PaintImage`s, we compare its intrinsic size to the largest of the displayed sizes.
     *
     * It is theoretically possible for `PaintImage` events with the same URL to have different intrinsic sizes.
     * However, this should be rare because it requires serving different images from the same URL.
     */
    largestImagePaint: Types.Events.PaintImage;
}
export type ImageDeliveryInsightModel = InsightModel<typeof UIStrings, {
    /** Sorted by potential byte savings, then by size of image. */
    optimizableImages: OptimizableImage[];
    totalByteSavings: number;
}>;
export declare function getOptimizationMessage(optimization: ImageOptimization): string;
export declare function getOptimizationMessageWithBytes(optimization: ImageOptimization): string;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ImageDeliveryInsightModel;
