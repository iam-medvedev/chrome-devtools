export declare class CodeBlock extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    connectedCallback(): void;
    set code(value: string);
    get code(): string;
    set codeLang(value: string);
    set timeout(value: number);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-code-block': CodeBlock;
    }
}
