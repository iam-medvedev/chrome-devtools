export interface ActionProperties {
    label: string;
    title?: string;
    onClick: () => void;
}
export interface SnackbarProperties {
    message: string;
    closable?: boolean;
    actionProperties?: ActionProperties;
}
export declare const DEFAULT_AUTO_DISMISS_MS = 5000;
/**
 * @attr dismiss-timeout - Timeout in ms after which the snackbar is dismissed.
 * @attr message - The message to display in the snackbar.
 * @attr closable - If true, the snackbar will have a dismiss button. This cancels the auto dismiss behavior.
 * @attr action-button-label - The label for the action button.
 * @attr action-button-title - The title for the action button.
 *
 * @prop {Number} dismissTimeout - reflects the `"dismiss-timeout"` attribute.
 * @prop {String} message - reflects the `"message"` attribute.
 * @prop {Boolean} closable - reflects the `"closable"` attribute.
 * @prop {String} actionButtonLabel - reflects the `"action-button-label"` attribute.
 * @prop {String} actionButtonTitle - reflects the `"action-button-title"` attribute.
 * @prop {Function} actionButtonClickHandler - Function to be triggered when action button is clicked.
 */
export declare class Snackbar extends HTMLElement {
    #private;
    static snackbarQueue: Snackbar[];
    /**
     * Reflects the `dismiss-timeout` attribute. Sets the message to be displayed on the snackbar.
     */
    get dismissTimeout(): number;
    set dismissTimeout(dismissMs: number);
    /**
     * Reflects the `message` attribute. Sets the message to be displayed on the snackbar.
     */
    get message(): string | null;
    set message(message: string);
    /**
     * Reflects the `closable` attribute. If true, the snackbar will have a button to close the toast.
     * @default false
     */
    get closable(): boolean;
    set closable(closable: boolean);
    /**
     * Reflects the `action-button-label` attribute. Sets the title of the action button.
     */
    get actionButtonLabel(): string | null;
    set actionButtonLabel(actionButtonLabel: string);
    /**
     * Reflects the `action-button-title` attribute. Sets the aria label of the action button.
     */
    get actionButtonTitle(): string | null;
    set actionButtonTitle(actionButtonTitle: string);
    /**
     * Sets the function to be triggered when the action button is clicked.
     * @param {Function} actionButtonClickHandler
     */
    set actionButtonClickHandler(actionButtonClickHandler: () => void);
    constructor(properties: SnackbarProperties);
    static show(properties: SnackbarProperties): Snackbar;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-snackbar': Snackbar;
    }
}
