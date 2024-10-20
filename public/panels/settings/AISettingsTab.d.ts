import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class AISettingsTab extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-settings-ai-settings-tab': AISettingsTab;
    }
}
