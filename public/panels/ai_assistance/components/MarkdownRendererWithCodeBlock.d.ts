import type * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import type * as Lit from '../../../ui/lit/lit.js';
export declare class MarkdownRendererWithCodeBlock extends MarkdownView.MarkdownView.MarkdownInsightRenderer {
    templateForToken(token: Marked.Marked.MarkedToken): Lit.TemplateResult | null;
}
