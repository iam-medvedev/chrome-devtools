import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type A11yAnnouncement } from './AccessibilityAnnouncementRecordingView.js';
export interface ViewInput {
    items: readonly A11yAnnouncement[];
    selectedItem: A11yAnnouncement | null;
    onContextMenu: (menu: UI.ContextMenu.ContextMenu, item: A11yAnnouncement) => void;
    onSelect: (item: A11yAnnouncement) => void;
    onDeselect: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare const AccessibilityAnnouncementRecordingListViewBase: Common.ObjectWrapper.EventMixin<AccessibilityAnnouncementRecordingListView.EventTypes, typeof UI.Widget.VBox>;
export declare class AccessibilityAnnouncementRecordingListView extends AccessibilityAnnouncementRecordingListViewBase {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    set items(items: readonly A11yAnnouncement[]);
    get items(): readonly A11yAnnouncement[];
    set selectedItem(item: A11yAnnouncement | null);
    get selectedItem(): A11yAnnouncement | null;
    reset(): void;
    performUpdate(): void;
}
export declare namespace AccessibilityAnnouncementRecordingListView {
    const enum Events {
        ANNOUNCEMENT_SELECTED = "announcement-selected",
        REVEAL_IN_ELEMENTS = "reveal-in-elements",
        REVEAL_IN_A11Y_TREE = "reveal-in-a11y-tree"
    }
    interface EventTypes {
        [Events.ANNOUNCEMENT_SELECTED]: A11yAnnouncement | null;
        [Events.REVEAL_IN_ELEMENTS]: A11yAnnouncement;
        [Events.REVEAL_IN_A11Y_TREE]: A11yAnnouncement;
    }
}
export {};
