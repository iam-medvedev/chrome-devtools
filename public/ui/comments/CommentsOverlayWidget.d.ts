import * as CommentManager from '../../models/comment_manager/comment_manager.js';
import * as UI from '../../ui/legacy/legacy.js';
import { CommentOverlayManager, type HighlightRectData, type HoverHighlightData, type PinPositionData } from './CommentOverlayManager.js';
export interface ViewInput {
    pins: PinPositionData[];
    highlights: HighlightRectData[];
    hoverHighlight: HoverHighlightData | null;
    commentMode: boolean;
    onPinClick: (threadId: string) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare class CommentsOverlayWidget extends UI.Widget.Widget {
    #private;
    constructor(element: HTMLElement | undefined, commentManager: CommentManager.CommentManager.CommentManager, view?: View);
    setOverlayManagerForTest(overlayManager: CommentOverlayManager): void;
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    #private;
    constructor(commentManager?: CommentManager.CommentManager.CommentManager);
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
