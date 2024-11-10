import type * as Common from '../../core/common/common.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type DataDisplayDelegate, type ProfileHeader, type StatusUpdate } from './ProfileHeader.js';
export declare class ProfileSidebarTreeElement extends UI.TreeOutline.TreeElement {
    readonly iconElement: HTMLDivElement;
    readonly titlesElement: HTMLDivElement;
    readonly menuElement: Buttons.Button.Button;
    titleContainer: HTMLElement;
    titleElement: HTMLElement;
    subtitleElement: HTMLElement;
    readonly className: string;
    small: boolean;
    readonly dataDisplayDelegate: DataDisplayDelegate;
    profile: ProfileHeader;
    editing: UI.InplaceEditor.Controller | null;
    constructor(dataDisplayDelegate: DataDisplayDelegate, profile: ProfileHeader, className: string);
    updateStatus(event: Common.EventTarget.EventTargetEvent<StatusUpdate>): void;
    ondblclick(event: Event): boolean;
    startEditing(eventTarget: Element): void;
    editingCommitted(_container: Element, newTitle: string): void;
    editingCancelled(): void;
    dispose(): void;
    onselect(): boolean;
    ondelete(): boolean;
    onattach(): void;
    handleContextMenuEvent(event: Event): void;
    setSmall(small: boolean): void;
    setMainTitle(title: string): void;
}
