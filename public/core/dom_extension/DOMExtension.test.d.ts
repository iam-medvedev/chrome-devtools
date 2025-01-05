import './dom_extension.js';
declare global {
    interface HTMLElement {
        traverseNextNode(node: HTMLElement): HTMLElement;
        createChild<K extends keyof HTMLElementTagNameMap>(tagName: K, className?: string, content?: string): HTMLElementTagNameMap[K];
        createChild(tagName: string, className?: string, content?: string): HTMLElement;
    }
}
