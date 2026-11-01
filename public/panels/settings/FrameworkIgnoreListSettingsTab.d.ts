import '../../ui/components/lists/lists.js';
import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    enabledSetting: Common.Settings.Setting<boolean>;
    skipContentScriptsSetting: Common.Settings.Setting<boolean>;
    automaticallyIgnoreListSetting: Common.Settings.Setting<boolean>;
    skipAnonymousScriptsSetting: Common.Settings.Setting<boolean>;
    enabled: boolean;
    patterns: Common.Settings.RegExpSettingItem[];
    editingIndex: number | null;
    editingValue: string;
    validationError: Common.UIString.LocalizedString | null;
    showValidationError: boolean;
    onLearnMoreClick: () => void;
    onAddPatternClick: () => void;
    onTogglePattern: (index: number, checked: boolean) => void;
    onBeginEdit: (index: number) => void;
    onRemovePattern: (index: number) => void;
    onEditorInput: (value: string) => void;
    onCommitEdit: () => void;
    onCancelEdit: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class FrameworkIgnoreListSettingsTab extends UI.Widget.VBox {
    #private;
    private readonly setting;
    private readonly enabledSetting;
    private readonly skipContentScriptsSetting;
    private readonly automaticallyIgnoreListSetting;
    private readonly skipAnonymousScriptsSetting;
    constructor(view?: View);
    performUpdate(): void;
    wasShown(): void;
}
