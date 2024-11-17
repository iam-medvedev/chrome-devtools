import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class DeviceModeView extends UI.Widget.VBox {
    wrapperInstance: UI.Widget.VBox | null;
    blockElementToWidth: WeakMap<HTMLElement, number>;
    private model;
    private readonly mediaInspector;
    private showMediaInspectorSetting;
    private showRulersSetting;
    private readonly topRuler;
    private readonly leftRuler;
    private presetBlocks;
    private responsivePresetsContainer;
    private screenArea;
    private pageArea;
    private outlineImage;
    private contentClip;
    private contentArea;
    private rightResizerElement;
    private leftResizerElement;
    private bottomResizerElement;
    private bottomRightResizerElement;
    private bottomLeftResizerElement;
    private cachedResizable;
    private mediaInspectorContainer;
    private screenImage;
    private toolbar;
    private slowPositionStart?;
    private resizeStart?;
    private cachedCssScreenRect?;
    private cachedCssVisiblePageRect?;
    private cachedOutlineRect?;
    private cachedMediaInspectorVisible?;
    private cachedShowRulers?;
    private cachedScale?;
    private handleWidth?;
    private handleHeight?;
    constructor();
    private createUI;
    private populatePresetsContainer;
    private createResizer;
    private onResizeStart;
    private onResizeUpdate;
    exitHingeMode(): void;
    private onResizeEnd;
    private updateUI;
    private loadImage;
    private onImageLoaded;
    setNonEmulatedAvailableSize(element: Element): void;
    private contentAreaResized;
    private measureHandles;
    private zoomChanged;
    onResize(): void;
    wasShown(): void;
    willHide(): void;
    captureScreenshot(): Promise<void>;
    captureFullSizeScreenshot(): Promise<void>;
    captureAreaScreenshot(clip?: Protocol.Page.Viewport): Promise<void>;
    private saveScreenshotBase64;
    private paintImage;
    private saveScreenshot;
}
export declare class Ruler extends UI.Widget.VBox {
    private contentElementInternal;
    private readonly horizontal;
    private scale;
    private count;
    private readonly throttler;
    private readonly applyCallback;
    private renderedScale;
    private renderedZoomFactor;
    constructor(horizontal: boolean, applyCallback: (arg0: number) => void);
    render(scale: number): void;
    onResize(): void;
    update(): Promise<void>;
    private onMarkerClick;
}
