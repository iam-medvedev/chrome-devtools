import * as Utils from './utils/utils.js';
export declare class UIDevtoolsUtils {
    static isUiDevTools(): boolean;
    static categorizeEvents(): Record<string, Utils.EntryStyles.TimelineRecordStyle>;
    static categories(): Utils.EntryStyles.CategoryPalette;
    static getMainCategoriesList(): string[];
}
export declare enum RecordType {
    ViewPaint = "View::Paint",
    ViewOnPaint = "View::OnPaint",
    ViewPaintChildren = "View::PaintChildren",
    ViewOnPaintBackground = "View::OnPaintBackground",
    ViewOnPaintBorder = "View::OnPaintBorder",
    ViewLayout = "View::Layout",
    ViewLayoutBoundsChanged = "View::Layout(bounds_changed)",
    LayerPaintContentsToDisplayList = "Layer::PaintContentsToDisplayList",
    DirectRendererDrawFrame = "DirectRenderer::DrawFrame",
    RasterTask = "RasterTask",
    RasterizerTaskImplRunOnWorkerThread = "RasterizerTaskImpl::RunOnWorkerThread",
    BeginFrame = "BeginFrame",
    DrawFrame = "DrawFrame",
    NeedsBeginFrameChanged = "NeedsBeginFrameChanged",
    ThreadControllerImplRunTask = "ThreadControllerImpl::RunTask"
}
