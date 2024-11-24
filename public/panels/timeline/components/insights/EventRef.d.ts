import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
export declare class EventReferenceClick extends Event {
    event: Trace.Types.Events.Event;
    static readonly eventName = "eventreferenceclick";
    constructor(event: Trace.Types.Events.Event);
}
declare class EventRef extends HTMLElement {
    #private;
    connectedCallback(): void;
    set text(text: string);
    set event(event: Trace.Types.Events.Event);
}
type EventRefSupportedEvents = Trace.Types.Events.SyntheticNetworkRequest;
export declare function eventRef(event: EventRefSupportedEvents): LitHtml.TemplateResult;
declare class ImageRef extends HTMLElement {
    #private;
    connectedCallback(): void;
    set request(request: Trace.Types.Events.SyntheticNetworkRequest);
    set imagePaint(imagePaint: Trace.Types.Events.PaintImage | undefined);
}
export declare function imageRef(request: Trace.Types.Events.SyntheticNetworkRequest, imagePaint?: Trace.Types.Events.PaintImage): LitHtml.TemplateResult;
declare global {
    interface GlobalEventHandlersEventMap {
        [EventReferenceClick.eventName]: EventReferenceClick;
    }
    interface HTMLElementTagNameMap {
        'devtools-performance-event-ref': EventRef;
        'devtools-performance-image-ref': ImageRef;
    }
}
export {};
