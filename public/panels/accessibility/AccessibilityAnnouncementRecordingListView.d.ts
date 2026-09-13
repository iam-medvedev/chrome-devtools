import '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type A11yAnnouncement } from './AccessibilityAnnouncementRecordingView.js';
export interface ViewInput {
    items: readonly A11yAnnouncement[];
    selectedItem: A11yAnnouncement | null;
    onSelect: (item: A11yAnnouncement) => void;
    onDeselect: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AccessibilityAnnouncementRecordingListView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    set items(items: readonly A11yAnnouncement[]);
    get items(): readonly A11yAnnouncement[];
    set selectedItem(item: A11yAnnouncement | null);
    get selectedItem(): A11yAnnouncement | null;
    set onSelect(onSelect: (item: A11yAnnouncement | null) => void);
    reset(): void;
    performUpdate(): void;
}
