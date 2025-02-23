export type TooltipVariant = 'simple' | 'rich';
export interface TooltipProperties {
    id?: string;
    variant?: TooltipVariant;
    anchor?: HTMLElement;
}
/**
 * @attr id - Id of the tooltip. Used for searching an anchor element with aria-describedby.
 * @attr hover-delay - Hover length in ms before the tooltip is shown and hidden.
 * @attr variant - Variant of the tooltip, `"simple"` for strings only, inverted background,
 *                 `"rich"` for interactive content, background according to theme's surface.
 * @attr use-click - If present, the tooltip will be shown on click instead of on hover.
 * @prop {String} id - reflects the `"id"` attribute.
 * @prop {Number} hoverDelay - reflects the `"hover-delay"` attribute.
 * @prop {String} variant - reflects the `"variant"` attribute.
 * @prop {Boolean} useClick - reflects the `"click"` attribute.
 */
export declare class Tooltip extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    get open(): boolean;
    get useClick(): boolean;
    set useClick(useClick: boolean);
    get hoverDelay(): number;
    set hoverDelay(delay: number);
    get variant(): TooltipVariant;
    set variant(variant: TooltipVariant);
    constructor({ id, variant, anchor }?: TooltipProperties);
    attributeChangedCallback(name: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    showTooltip: () => void;
    hideTooltip: (event: MouseEvent) => void;
    toggle: () => void;
}
export declare function closestAnchor(tooltip: Element, selector: string): Element | null;
declare global {
    interface HTMLElementTagNameMap {
        'devtools-tooltip': Tooltip;
    }
    interface CSSStyleDeclaration {
        anchorName: string;
        positionAnchor: string;
    }
}
