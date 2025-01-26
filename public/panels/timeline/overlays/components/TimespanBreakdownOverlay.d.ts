import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
/**
 * An EntryBreakdown, or section, that makes up a TimespanBreakdown.
 */
export interface EntryBreakdown {
    bounds: Trace.Types.Timing.TraceWindowMicro;
    label: string | LitHtml.LitTemplate;
    showDuration: boolean;
}
export declare class TimespanBreakdownOverlay extends HTMLElement {
    #private;
    connectedCallback(): void;
    set isBelowEntry(isBelow: boolean);
    set canvasRect(rect: DOMRect | null);
    set sections(sections: Array<EntryBreakdown> | null);
    /**
     * We use this method after the overlay has been positioned in order to move
     * the section label as required to keep it on screen.
     * If the label is off to the left or right, we fix it to that corner and
     * align the text so the label is visible as long as possible.
     */
    checkSectionLabelPositioning(): void;
    renderedSections(): HTMLElement[];
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-timespan-breakdown-overlay': TimespanBreakdownOverlay;
    }
}
