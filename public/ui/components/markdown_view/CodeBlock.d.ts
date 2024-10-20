import '../../../ui/legacy/legacy.js';
export interface Heading {
    showCopyButton: boolean;
    text: string;
}
export declare class CodeBlock extends HTMLElement {
    #private;
    connectedCallback(): void;
    set code(value: string);
    get code(): string;
    set codeLang(value: string);
    set timeout(value: number);
    set displayNotice(value: boolean);
    set header(header: string);
    set showCopyButton(show: boolean);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-code-block': CodeBlock;
    }
}
