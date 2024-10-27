import type * as SDK from '../../core/sdk/sdk.js';
export declare class AnimationGroupPreviewUI {
    #private;
    element: HTMLButtonElement;
    constructor(model: SDK.AnimationModel.AnimationGroup);
    removeButton(): Element;
    replay(): void;
    render(): void;
}
