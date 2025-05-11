import '../icon_button/icon_button.js';
/**
 * A simple floating button component, primarily used to display the 'Ask AI!'
 * teaser when hovering over specific UI elements.
 *
 * Usage is simple:
 *
 * ```js
 * // Instantiate programmatically via the `create()` helper:
 * const button = Buttons.FloatingButton.create('smart-assistant', 'Ask AI!');
 *
 * // Use within a template:
 * html`
 * <devtools-floating-button icon-name="smart-assistant"
 *                           title="Ask AI!">
 * </devtools-floating-button>
 * `;
 * ```
 *
 * @attr icon-name - The basename of the icon file (not including the `.svg`
 *                   suffix).
 * @prop {String} iconName - The `"icon-name"` attribute is reflected as property.
 */
export declare class FloatingButton extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    constructor();
    /**
     * Yields the value of the `"icon-name"` attribute of this `FloatingButton`
     * (`null` in case there's no `"icon-name"` on this element).
     */
    get iconName(): string | null;
    /**
     * Changes the value of the `"icon-name"` attribute of this `FloatingButton`.
     * If you pass `null`, the `"icon-name"` attribute will be removed from this
     * element.
     *
     * @param the new icon name or `null` to unset.
     */
    set iconName(iconName: string | null);
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
/**
 * Helper function to programmatically create a `FloatingButton` instance with a
 * given `iconName` and `title`.
 *
 * @param iconName the name of the icon to use.
 * @param title the tooltip for the `FloatingButton`
 * @returns the newly created `FloatingButton` instance.
 */
export declare const create: (iconName: string, title: string) => FloatingButton;
declare global {
    interface HTMLElementTagNameMap {
        'devtools-floating-button': FloatingButton;
    }
}
