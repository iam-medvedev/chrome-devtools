import type * as Platform from '../../core/platform/platform.js';
import * as Lit from '../../ui/lit/lit.js';
export declare class FreDialog {
    static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonTitle, learnMoreButtonAriaLabel }: {
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
        learnMoreButtonAriaLabel?: string;
    }): Promise<boolean>;
    private constructor();
}
