import './Table.js';
import '../../../../ui/components/linkifier/linkifier.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { Category } from './types.js';
export declare class SlowCSSSelector extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
    userVisibleTitle: string;
    description: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    private toSourceFileLocation;
    private getSelectorLinks;
    renderSlowCSSSelector(): LitHtml.LitTemplate;
    getRelatedEvents(): Trace.Types.Events.Event[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-slow-css-selector': SlowCSSSelector;
    }
}
