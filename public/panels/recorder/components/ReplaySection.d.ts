import * as Platform from '../../../core/platform/platform.js';
import * as UI from '../../../ui/legacy/legacy.js';
import type * as Extensions from '../extensions/extensions.js';
import * as Models from '../models/models.js';
import { PlayRecordingSpeed } from '../models/RecordingPlayer.js';
interface Item {
    value: string;
    buttonIconName: string;
    buttonLabel?: () => Platform.UIString.LocalizedString;
    label: () => Platform.UIString.LocalizedString;
}
interface Group {
    name: string;
    items: Item[];
}
interface ViewInput {
    disabled: boolean;
    groups: Group[];
    selectedItem: Item;
    actionTitle: string;
    onButtonClick: () => void;
    onItemSelected: (item: string) => void;
}
export type ViewOutput = undefined;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void;
/**
 * This presenter combines built-in replay speeds and extensions into a single
 * select menu + a button.
 */
export declare class ReplaySection extends UI.Widget.Widget {
    #private;
    onStartReplay?: (speed: PlayRecordingSpeed, extension?: Extensions.ExtensionManager.Extension) => void;
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set settings(settings: Models.RecorderSettings.RecorderSettings | undefined);
    set replayExtensions(replayExtensions: Extensions.ExtensionManager.Extension[]);
    get disabled(): boolean;
    set disabled(disabled: boolean);
    wasShown(): void;
    performUpdate(): void;
}
export {};
