import * as TraceEngine from '../../../models/trace/trace.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
/**
 * An EntryBreakdown, or section, that makes up a TimespanBreakdown.
 */
export type EntryBreakdown = {
    bounds: TraceEngine.Types.Timing.TraceWindowMicroSeconds;
    label: string;
};
export declare class TimespanBreakdownOverlay extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    /**
     * Size to stagger sections of a TimespanBreakdownOverlay.
     */
    static readonly TIMESPAN_BREAKDOWN_OVERLAY_STAGGER_PX = 5;
    connectedCallback(): void;
    set canvasRect(rect: DOMRect | null);
    set sections(sections: Array<EntryBreakdown> | null);
    /**
     * We use this method after the overlay has been positioned in order to move
     * the section label as required to keep it on screen.
     * If the label is off to the left or right, we fix it to that corner and
     * align the text so the label is visible as long as possible.
     */
    afterOverlayUpdate(): void;
    renderSection(section: EntryBreakdown): LitHtml.TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-timespan-breakdown-overlay': TimespanBreakdownOverlay;
    }
}
