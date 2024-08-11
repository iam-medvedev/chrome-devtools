import { ObjectWrapper } from './Object.js';
export declare class Console extends ObjectWrapper<EventTypes> {
    #private;
    /**
     * Instantiable via the instance() factory below.
     */
    constructor();
    static instance(opts?: {
        forceNew: boolean;
    }): Console;
    static removeInstance(): void;
    /**
     * Add a message to the Console panel.
     *
     * @param text the message text.
     * @param level the message level.
     * @param show whether to show the Console panel (if it's not already shown).
     * @param source the message source.
     */
    addMessage(text: string, level?: MessageLevel, show?: boolean, source?: FrontendMessageSource): void;
    log(text: string): void;
    warn(text: string, source?: FrontendMessageSource): void;
    /**
     * Adds an error message to the Console panel.
     *
     * @param text the message text.
     * @param show whether to show the Console panel (if it's not already shown).
     */
    error(text: string, show?: boolean): void;
    messages(): Message[];
    show(): void;
    showPromise(): Promise<void>;
}
export declare const enum Events {
    MessageAdded = "messageAdded"
}
export type EventTypes = {
    [Events.MessageAdded]: Message;
};
export declare const enum MessageLevel {
    Info = "info",
    Warning = "warning",
    Error = "error"
}
export declare enum FrontendMessageSource {
    CSS = "css",
    ConsoleAPI = "console-api",
    IssuePanel = "issue-panel",
    SelfXss = "self-xss"
}
export declare class Message {
    text: string;
    level: MessageLevel;
    timestamp: number;
    show: boolean;
    source?: FrontendMessageSource;
    constructor(text: string, level: MessageLevel, timestamp: number, show: boolean, source?: FrontendMessageSource);
}
