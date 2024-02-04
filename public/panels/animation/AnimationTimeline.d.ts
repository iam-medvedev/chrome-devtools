import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { AnimationGroupPreviewUI } from './AnimationGroupPreviewUI.js';
import { type AnimationEffect, type AnimationGroup, AnimationModel } from './AnimationModel.js';
import { AnimationUI } from './AnimationUI.js';
export declare class AnimationTimeline extends UI.Widget.VBox implements SDK.TargetManager.SDKModelObserver<AnimationModel> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean;
    }): AnimationTimeline;
    get previewMap(): Map<AnimationGroup, AnimationGroupPreviewUI>;
    get uiAnimations(): AnimationUI[];
    get groupBuffer(): AnimationGroup[];
    wasShown(): void;
    willHide(): void;
    modelAdded(animationModel: AnimationModel): void;
    modelRemoved(animationModel: AnimationModel): void;
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
    private clearPreviews;
    private createPreview;
    private addAnimationGroup;
    private handleAnimationGroupKeyDown;
    private focusNextGroup;
    private removeAnimationGroup;
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
    pixelMsRatio(): number;
    private updateScrubber;
    private scrubberDragStart;
    private scrubberDragMove;
    private scrubberDragEnd;
}
export declare const GlobalPlaybackRates: number[];
export declare class NodeUI {
    #private;
    element: HTMLDivElement;
    constructor(_animationEffect: AnimationEffect);
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
