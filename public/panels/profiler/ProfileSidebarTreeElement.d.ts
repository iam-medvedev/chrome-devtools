import * as UI from '../../ui/legacy/legacy.js';
import { type DataDisplayDelegate, type ProfileHeader } from './ProfileHeader.js';
export interface ViewInput {
    title: string;
    subtitle: string | null;
    wait: boolean;
    editing: boolean;
    populateContextMenu: (contextMenu: UI.ContextMenu.ContextMenu) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ProfileSidebarTreeElement extends UI.TreeOutline.TreeElement {
    #private;
    profile: ProfileHeader;
    constructor(dataDisplayDelegate: DataDisplayDelegate, profile: ProfileHeader, className: string, view?: View);
    performUpdate(): void;
    ondblclick(event: Event): boolean;
    dispose(): void;
    onselect(): boolean;
    ondelete(): boolean;
    setSmall(small: boolean): void;
    setMainTitle(title: string): void;
}
