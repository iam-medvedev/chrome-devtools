export declare class ShowDialog extends Event {
    static readonly eventName = "showdialog";
    constructor();
}
export declare class FieldSettingsDialog extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-field-settings-dialog': FieldSettingsDialog;
    }
}
