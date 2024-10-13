import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
export declare class EventReferenceClick extends Event {
    event: Trace.Types.Events.Event;
    static readonly eventName = "eventreferenceclick";
    constructor(event: Trace.Types.Events.Event);
}
declare class EventRef extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set text(text: string);
    set event(event: Trace.Types.Events.Event);
}
type EventRefSupportedEvents = Trace.Types.Events.SyntheticNetworkRequest;
export declare function eventRef(event: EventRefSupportedEvents): LitHtml.TemplateResult;
declare global {
    interface GlobalEventHandlersEventMap {
        [EventReferenceClick.eventName]: EventReferenceClick;
    }
    interface HTMLElementTagNameMap {
        'devtools-performance-event-ref': EventRef;
    }
}
export {};
