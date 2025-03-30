import type * as Platform from '../../core/platform/platform.js';
import * as Lit from '../../ui/lit/lit.js';
export declare class FreDialog {
    static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonTitle }: {
        header: {
            iconName: string;
            text: Platform.UIString.LocalizedString;
        };
        reminderItems: Array<{
            iconName: string;
            content: Platform.UIString.LocalizedString | Lit.LitTemplate;
        }>;
        onLearnMoreClick: () => void;
        ariaLabel?: string;
        learnMoreButtonTitle?: string;
    }): Promise<boolean>;
    private constructor();
}
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
