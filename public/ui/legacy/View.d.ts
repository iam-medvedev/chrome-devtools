import * as Platform from '../../core/platform/platform.js';
import type { TabbedPane } from './TabbedPane.js';
import type { ToolbarItem, ToolbarMenuButton } from './Toolbar.js';
import { VBox, type Widget } from './Widget.js';
export interface View {
    viewId(): string;
    title(): Platform.UIString.LocalizedString;
    isCloseable(): boolean;
    isPreviewFeature(): boolean;
    iconName(): string | undefined;
    isTransient(): boolean;
    toolbarItems(): Promise<ToolbarItem[]>;
    widget(): Promise<Widget>;
    disposeView(): void | Promise<void>;
}
export declare class SimpleView extends VBox implements View {
    #private;
    constructor(title: Platform.UIString.LocalizedString, useShadowDom?: boolean, viewId?: Lowercase<string>);
    viewId(): string;
    title(): Platform.UIString.LocalizedString;
    isCloseable(): boolean;
    isTransient(): boolean;
    toolbarItems(): Promise<ToolbarItem[]>;
    widget(): Promise<Widget>;
    revealView(): Promise<void>;
    disposeView(): void;
    isPreviewFeature(): boolean;
    iconName(): string | undefined;
}
export interface ViewLocation {
    appendApplicableItems(locationName: string): void;
    appendView(view: View, insertBefore?: View | null): void;
    showView(view: View, insertBefore?: View | null, userGesture?: boolean): Promise<void>;
    removeView(view: View): void;
    widget(): Widget;
}
export interface TabbedViewLocation extends ViewLocation {
    tabbedPane(): TabbedPane;
    enableMoreTabsButton(): ToolbarMenuButton;
}
export interface ViewLocationResolver {
    resolveLocation(location: string): ViewLocation | null;
}
