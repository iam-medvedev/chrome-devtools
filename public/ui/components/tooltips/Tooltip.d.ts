export type TooltipVariant = 'simple' | 'rich';
export interface TooltipProperties {
    id: string;
    variant?: TooltipVariant;
    anchor?: HTMLElement;
    jslogContext?: string;
}
/**
 * @attr id - Id of the tooltip. Used for searching an anchor element with aria-describedby.
 * @attr hover-delay - Hover length in ms before the tooltip is shown and hidden.
 * @attr variant - Variant of the tooltip, `"simple"` for strings only, inverted background, `"rich"` for interactive
 *                 content, background according to theme's surface.
 * @attr use-click - If present, the tooltip will be shown on click instead of on hover.
 * @attr use-hotkey - If present, the tooltip will be shown on hover but not when receiving focus. Requires a hotkey to
 *                    open when fosed (Alt-down). When `"use-click"` is present as well, use-click takes precedence.
 * @prop {String} id - reflects the `"id"` attribute.
 * @prop {Number} hoverDelay - reflects the `"hover-delay"` attribute.
 * @prop {String} variant - reflects the `"variant"` attribute.
 * @prop {Boolean} useClick - reflects the `"click"` attribute.
 * @prop {Boolean} useHotkey - reflects the `"use-hotkey"` attribute.
 */
export declare class Tooltip extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    get open(): boolean;
    get useHotkey(): boolean;
    set useHotkey(useHotkey: boolean);
    get useClick(): boolean;
    set useClick(useClick: boolean);
    get hoverDelay(): number;
    set hoverDelay(delay: number);
    get variant(): TooltipVariant;
    set variant(variant: TooltipVariant);
    get jslogContext(): string | null;
    set jslogContext(jslogContext: string);
    get anchor(): HTMLElement | null;
    constructor(properties?: TooltipProperties);
    attributeChangedCallback(name: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    showTooltip: () => void;
    hideTooltip: (event?: MouseEvent | FocusEvent) => void;
    toggle: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-tooltip': Tooltip;
    }
    interface CSSStyleDeclaration {
        anchorName: string;
        positionAnchor: string;
    }
}
