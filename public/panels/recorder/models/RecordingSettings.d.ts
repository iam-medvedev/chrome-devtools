import type { EmulateNetworkConditionsStep, SetViewportStep } from './Schema.js';
export interface RecordingSettings {
    viewportSettings?: SetViewportStep;
    networkConditionsSettings?: EmulateNetworkConditionsStep & {
        title?: string;
        i18nTitleKey?: string;
    };
    timeout?: number;
}
