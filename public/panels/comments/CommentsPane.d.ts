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
    threads: ThreadViewData[];
    onTabSelect: (tab: Tab) => void;
    onClearAll: () => void;
    onThreadClick: (thread: CommentManager.CommentManager.CommentThread, fallbackPosition?: {
        left: number;
        top: number;
    }) => void;
    onDeleteThread: (threadId: string) => void;
    onSendToAgent: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class CommentsPane extends UI.Widget.Widget {
    #private;
    static readonly INJECT: readonly [
        typeof CommentManager.CommentManager.CommentManager
    ];
    constructor(element?: HTMLElement, [commentManager]?: UI.Widget.WidgetDependencies<typeof CommentsPane>, view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(signal?: AbortSignal): Promise<void>;
}
export {};
