import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { type InsightProvider } from '../InsightProvider.js';
import { type PromptBuilder, type Source } from '../PromptBuilder.js';
export declare class CloseEvent extends Event {
    static readonly eventName = "close";
    constructor();
}
type PublicPromptBuilder = Pick<PromptBuilder, 'buildPrompt'>;
type PublicInsightProvider = Pick<InsightProvider, 'getInsights'>;
export declare class ConsoleInsight extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(promptBuilder: PublicPromptBuilder, insightProvider: PublicInsightProvider);
    connectedCallback(): void;
    set dogfood(value: boolean);
    get dogfood(): boolean;
    update(includeContext?: boolean): Promise<void>;
}
declare class ConsoleInsightSourcesList extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    set sources(values: Source[]);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-console-insight': ConsoleInsight;
        'devtools-console-insight-sources-list': ConsoleInsightSourcesList;
    }
}
export declare class MarkdownRenderer extends MarkdownView.MarkdownView.MarkdownLitRenderer {
    renderToken(token: Marked.Marked.Token): LitHtml.TemplateResult;
    templateForToken(token: Marked.Marked.Token): LitHtml.TemplateResult | null;
}
export {};
