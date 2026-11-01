import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as CommentManager from '../../models/comment_manager/comment_manager.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as CommonPanels from '../common/common.js';
type Title = CommonPanels.CommentThreadWidget.Title;
export type Tab = 'queued' | 'sent';
export interface ThreadViewData {
    thread: CommentManager.CommentManager.CommentThread;
    title: Title;
    commentText: string;
}
export interface ViewInput {
    activeTab: Tab;
    queuedThreads: ThreadViewData[];
    sentThreads: ThreadViewData[];
    onTabClick: (tab: Tab) => void;
    onScroll: () => void;
    onScrollEnd: () => void;
    onClearAll: () => void;
    onThreadClick: (thread: CommentManager.CommentManager.CommentThread, fallbackPosition?: {
        left: number;
        top: number;
    }) => void;
    onDeleteThread: (threadId: string) => void;
    onSendToAgent: () => void;
    onAddComment: () => void;
}
export interface ViewOutput {
    /** The element that scrolls the comments. Only used to restore its scroll position. */
    scrollContainer?: HTMLElement;
    /**
     * Scrolls "Queued" to the very top and "Sent" to the sent section, if there is one.
     * Returns whether a smooth scroll started, which ends with a `scrollend` event.
     */
    scrollToSection?: (tab: Tab, options: {
        animate: boolean;
    }) => boolean;
    /** The section that has reached the top of the list. */
    sectionAtTop?: () => Tab;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class CommentsPane extends UI.Widget.Widget {
    #private;
    static readonly INJECT: readonly [
        typeof CommentManager.CommentManager.CommentManager
    ];
    constructor(element?: HTMLElement, [commentManager]?: UI.Widget.WidgetDependencies<typeof CommentsPane>, view?: View);
    wasShown(): void;
    /**
     * Lets `UI.Widget` store the list's scroll position when the drawer is hidden
     * and restore it when it is shown again.
     */
    elementsToRestoreScrollPositionsFor(): Element[];
    willHide(): void;
    performUpdate(signal?: AbortSignal): Promise<void>;
}
export {};
