import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { AnimationGroupPreviewUI } from './AnimationGroupPreviewUI.js';
import { AnimationUI } from './AnimationUI.js';
export declare class AnimationTimeline extends UI.Widget.VBox implements SDK.TargetManager.SDKModelObserver<SDK.AnimationModel.AnimationModel> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean;
    }): AnimationTimeline;
    get previewMap(): Map<SDK.AnimationModel.AnimationGroup, AnimationGroupPreviewUI>;
    get uiAnimations(): AnimationUI[];
    get groupBuffer(): SDK.AnimationModel.AnimationGroup[];
    wasShown(): void;
    willHide(): void;
    revealAnimationGroup(animationGroup: SDK.AnimationModel.AnimationGroup): Promise<void>;
    modelAdded(animationModel: SDK.AnimationModel.AnimationModel): void;
    modelRemoved(animationModel: SDK.AnimationModel.AnimationModel): void;
    private addEventListeners;
    private removeEventListeners;
    private nodeChanged;
    private createScrubber;
    private createHeader;
    private handlePlaybackRateControlKeyDown;
    private focusNextPlaybackRateButton;
    private togglePauseAll;
    private setPlaybackRate;
    private updatePlaybackControls;
    private controlButtonToggle;
    private updateControlButton;
    private effectivePlaybackRate;
    private togglePause;
    private replay;
    duration(): number;
    setDuration(duration: number): void;
    private clearTimeline;
    private reset;
    private animationGroupStarted;
    scheduledRedrawAfterAnimationGroupUpdatedForTest(): void;
    private animationGroupUpdated;
    private clearPreviews;
    private createPreview;
    previewsCreatedForTest(): void;
    scrubberOnFinishForTest(): void;
    private createPreviewForCollectedGroups;
    private addAnimationGroup;
    private focusNextGroup;
    private removeAnimationGroup;
    private clearCurrentTimeText;
    private setCurrentTimeText;
    private selectAnimationGroup;
    animationGroupSelectedForTest(): void;
    private addAnimation;
    private markNodeAsRemoved;
    private hasAnimationGroupActiveNodes;
    private renderGrid;
    scheduleRedraw(): void;
    private render;
    onResize(): void;
    width(): number;
    private syncScrubber;
    private animateTime;
    pixelTimeRatio(): number;
    private updateScrubber;
    private scrubberDragStart;
    private updateScrollOffsetOnPage;
    private setTimelineScrubberPosition;
    private scrubberDragMove;
    private scrubberDragEnd;
}
export declare const GlobalPlaybackRates: number[];
export declare class NodeUI {
    #private;
    element: HTMLDivElement;
    constructor(_animationEffect: SDK.AnimationModel.AnimationEffect);
    nodeResolved(node: SDK.DOMModel.DOMNode | null): void;
    createNewRow(): Element;
    nodeRemoved(): void;
    hasActiveNode(): boolean;
    nodeChanged(): void;
}
export declare class StepTimingFunction {
    steps: number;
    stepAtPosition: string;
    constructor(steps: number, stepAtPosition: string);
    static parse(text: string): StepTimingFunction | null;
}
export declare class AnimationGroupRevealer implements Common.Revealer.Revealer<SDK.AnimationModel.AnimationGroup> {
    reveal(animationGroup: SDK.AnimationModel.AnimationGroup): Promise<void>;
}
