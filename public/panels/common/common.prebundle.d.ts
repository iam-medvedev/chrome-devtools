import type * as Platform from '../../core/platform/platform.js';
export declare class TypeToAllowDialog {
    static show(options: {
        jslogContext: {
            dialog: string;
            input: string;
        };
        header: Platform.UIString.LocalizedString;
        message: Platform.UIString.LocalizedString;
        typePhrase: Platform.UIString.LocalizedString;
        inputPlaceholder: Platform.UIString.LocalizedString;
    }): Promise<boolean>;
}
export { AiCodeCompletionTeaser } from './AiCodeCompletionTeaser.js';
export { FreDialog } from './FreDialog.js';
export { AiCodeCompletionDisclaimer } from './AiCodeCompletionDisclaimer.js';
export { AiCodeCompletionSummaryToolbar } from './AiCodeCompletionSummaryToolbar.js';
