import type * as Types from '../types/types.js';
import { type InsightModel, type InsightSetContext, type RequiredData } from './types.js';
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
export type ImageDeliveryInsightModel = InsightModel<{
    optimizableImages: OptimizableImage[];
    totalByteSavings: number;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ImageDeliveryInsightModel;
