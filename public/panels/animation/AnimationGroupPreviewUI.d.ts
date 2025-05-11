import type * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    isScrollDrivenAnimationGroup: boolean;
    isPreviewAnimationDisabled: boolean;
    isSelected: boolean;
    isPaused: boolean;
    isFocusable: boolean;
    label: string;
    animationGroupDuration: number;
    animations: SDK.AnimationModel.AnimationImpl[];
    onPreviewAnimationEnd: () => void;
    onRemoveAnimationGroup: () => void;
    onSelectAnimationGroup: () => void;
    onCreateScreenshotPopover: () => void;
    onFocusNextGroup: () => void;
    onFocusPreviousGroup: () => void;
}
interface ViewOutput {
    replay?: () => void;
    focus?: () => void;
}
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
interface AnimationGroupPreviewConfig {
    animationGroup: SDK.AnimationModel.AnimationGroup;
    label: string;
    onRemoveAnimationGroup: () => void;
    onSelectAnimationGroup: () => void;
    onCreateScreenshotPopover: () => void;
    onFocusNextGroup: () => void;
    onFocusPreviousGroup: () => void;
}
export declare class AnimationGroupPreviewUI extends UI.Widget.Widget {
    #private;
    constructor(config: AnimationGroupPreviewConfig, view?: View);
    setSelected(selected: boolean): void;
    setPaused(paused: boolean): void;
    setFocusable(focusable: boolean): void;
    performUpdate(): void;
    focus(): void;
    replay(): void;
}
export {};
