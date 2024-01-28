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
    addMessage(text: string, level: MessageLevel, show?: boolean): void;
    log(text: string): void;
    warn(text: string): void;
    error(text: string): void;
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
export declare class Message {
    text: string;
    level: MessageLevel;
    timestamp: number;
    show: boolean;
    constructor(text: string, level: MessageLevel, timestamp: number, show: boolean);
}
