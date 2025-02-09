export type TooltipVariant = 'simple' | 'rich';
/**
 * @attr id - Id of the tooltip. Used for searching an anchor element with aria-describedby.
 * @attr hover-delay - Hover length in ms before the tooltip is shown and hidden.
 * @attr variant - Variant of the tooltip, `"simple"` for strings only, inverted background,
 *                 `"rich"` for interactive content, background according to theme's surface.
 * @prop {String} id - reflects the `"id"` attribute.
 * @prop {Number} hoverDelay - reflects the `"hover-delay"` attribute.
 * @prop {String} variant - reflects the `"variant"` attribute.
 */
export declare class Tooltip extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    get hoverDelay(): number;
    set hoverDelay(delay: number);
    get variant(): TooltipVariant;
    set variant(variant: TooltipVariant);
    attributeChangedCallback(name: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    showTooltip: () => void;
    hideTooltip: (event: MouseEvent) => void;
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
