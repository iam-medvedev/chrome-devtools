import * as Common from '../../core/common/common.js';
import type { ActionDelegate } from './ActionRegistration.js';
import type { Context } from './Context.js';
import { type Provider, ToolbarButton, type ToolbarItem } from './Toolbar.js';
export declare class DockController extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    private canDockInternal;
    readonly closeButton: ToolbarButton;
    private readonly currentDockStateSetting;
    private readonly lastDockStateSetting;
    private dockSideInternal;
    constructor(canDock: boolean);
    static instance(opts?: {
        forceNew: boolean | null;
        canDock: boolean;
    }): DockController;
    initialize(): void;
    private dockSideChanged;
    dockSide(): DockState | undefined;
    canDock(): boolean;
    isVertical(): boolean;
    setDockSide(dockSide: DockState): void;
    private setIsDockedResponse;
    toggleDockSide(): void;
    announceDockLocation(): void;
}
export declare const enum DockState {
    BOTTOM = "bottom",
    RIGHT = "right",
    LEFT = "left",
    UNDOCKED = "undocked"
}
export declare const enum Events {
    BEFORE_DOCK_SIDE_CHANGED = "BeforeDockSideChanged",
    DOCK_SIDE_CHANGED = "DockSideChanged",
    AFTER_DOCK_SIDE_CHANGED = "AfterDockSideChanged"
}
export interface ChangeEvent {
    from: DockState | undefined;
    to: DockState;
}
export interface EventTypes {
    [Events.BEFORE_DOCK_SIDE_CHANGED]: ChangeEvent;
    [Events.DOCK_SIDE_CHANGED]: ChangeEvent;
    [Events.AFTER_DOCK_SIDE_CHANGED]: ChangeEvent;
}
export declare class ToggleDockActionDelegate implements ActionDelegate {
    handleAction(_context: Context, _actionId: string): boolean;
}
export declare class CloseButtonProvider implements Provider {
    static instance(opts?: {
        forceNew: boolean | null;
    }): CloseButtonProvider;
    item(): ToolbarItem | null;
}
