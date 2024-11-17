import '../../../../ui/components/markdown_view/markdown_view.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
export declare function shouldRenderForCategory(options: {
    activeCategory: Trace.Insights.Types.InsightCategory;
    insightCategory: Trace.Insights.Types.InsightCategory;
}): boolean;
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export declare function md(markdown: string): LitHtml.TemplateResult;
