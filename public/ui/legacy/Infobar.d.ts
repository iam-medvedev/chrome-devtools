import type * as Common from '../../core/common/common.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import type { Widget } from './Widget.js';
export declare class Infobar {
    #private;
    element: HTMLElement;
    private readonly shadowRoot;
    private readonly contentElement;
    private readonly mainRow;
    private readonly detailsRows;
    private hasDetails;
    private detailsMessage;
    private readonly infoContainer;
    private readonly infoMessage;
    private infoText;
    private readonly actionContainer;
    private readonly disableSetting;
    private readonly closeContainer;
    private readonly toggleElement;
    private readonly closeButton;
    private closeCallback;
    private parentView?;
    constructor(type: Type, text: string, actions?: InfobarAction[], disableSetting?: Common.Settings.Setting<boolean>, jslogContext?: string);
    static create(type: Type, text: string, actions?: InfobarAction[], disableSetting?: Common.Settings.Setting<boolean>, jslogContext?: string): Infobar | null;
    dispose(): void;
    setText(text: string): void;
    setCloseCallback(callback: (() => void) | null): void;
    setParentView(parentView: Widget): void;
    private actionCallbackFactory;
    private onResize;
    private onDisable;
    private onToggleDetails;
    createDetailsRowMessage(message: Element | string): Element;
}
export interface InfobarAction {
    text: string;
    highlight: boolean;
    delegate: (() => void) | null;
    dismiss: boolean;
    buttonVariant?: Buttons.Button.Variant;
    jslogContext?: string;
}
export declare const enum Type {
    WARNING = "warning",
    INFO = "info",
    ISSUE = "issue",
    ERROR = "error"
}
