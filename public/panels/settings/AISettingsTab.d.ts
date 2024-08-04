import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class AISettingsTab extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    static readonly litTagName: import("../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    render(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-settings-ai-settings-tab': AISettingsTab;
    }
}
