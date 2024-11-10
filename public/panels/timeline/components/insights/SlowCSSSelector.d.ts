import './Table.js';
import '../../../../ui/components/linkifier/linkifier.js';
import type { SlowCSSSelectorInsightModel } from '../../../../models/trace/insights/SlowCSSSelector.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './Helpers.js';
import { Category } from './types.js';
export declare class SlowCSSSelector extends BaseInsightComponent<SlowCSSSelectorInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
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
