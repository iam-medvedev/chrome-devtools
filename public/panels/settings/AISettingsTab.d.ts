import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
export interface AllowedTool {
    toolName: AiAssistanceModel.Tool.ToolName;
    displayName: string;
}
interface SettingItem {
    iconName: string;
    text: Common.UIString.LocalizedString;
}
interface AiSettingParams {
    settingName: Platform.UIString.LocalizedString;
    setting?: Common.Settings.Setting<boolean> | AiAssistanceModel.AiSetting.AiSetting<boolean>;
    disabledReasons?: Platform.UIString.LocalizedString[];
    iconName: string;
    settingDescription: Platform.UIString.LocalizedString;
    enableSettingText: Common.UIString.LocalizedString;
    settingItems: SettingItem[];
    toConsiderSettingItems: SettingItem[];
    learnMoreLink: {
        url: string;
        linkJSLogContext: string;
    };
    settingExpandState: {
        isSettingExpanded: boolean;
        expandSettingJSLogContext: string;
    };
}
interface ViewInput {
    disabledReasons: string[];
    sharedDisclaimerBulletPoints: Array<{
        icon: string;
        text: Common.UIString.LocalizedString | Lit.LitTemplate;
    }>;
    settingToParams: Map<string, AiSettingParams>;
    isNaturalLanguageInterfaceEnabled: boolean;
    allowedTools: AllowedTool[];
    expandSetting(settingName: string): void;
    toggleSetting(settingName: string, ev: Event): void;
    removeAllowedTool(name: AiAssistanceModel.Tool.ToolName): void;
}
interface ViewOutput {
    highlightAllowedTools?: () => void;
}
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const AI_SETTINGS_TAB_DEFAULT_VIEW: View;
export declare class AISettingsTab extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
    /**
     * Called by `SettingsScreen.Revealer` after this tab is shown via `Common.Revealer.reveal(setting)`.
     */
    highlightObject(object: Object): void;
}
export {};
