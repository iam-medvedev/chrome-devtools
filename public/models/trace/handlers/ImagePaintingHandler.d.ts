import * as Types from '../types/types.js';
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(options: Types.Configuration.ParseOptions): Promise<void>;
export interface ImagePaintData {
    paintImageByDrawLazyPixelRef: Map<number, Types.Events.PaintImage>;
    paintImageForEvent: Map<Types.Events.Event, Types.Events.PaintImage>;
    paintImageEventForUrl: Map<string, Types.Events.PaintImage[]>;
    paintEventToCorrectedDisplaySize: Map<Types.Events.PaintImage, {
        width: number;
        height: number;
    }>;
    /** Go read the comment in finalize(). */
    didCorrectForHostDpr: boolean;
}
export declare function data(): ImagePaintData;
