import '../../../ui/components/lists/lists.js';
import '../../../ui/kit/kit.js';
import type * as Protocol from '../../../generated/protocol.js';
import * as EmulationModel from '../../../models/emulation/emulation.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as EmulationComponents from './components/components.js';
export type EditorFieldName = 'title' | 'width' | 'height' | 'scale' | 'user-agent' | 'ua-type' | 'safe-area-left' | 'safe-area-top' | 'safe-area-right' | 'safe-area-bottom' | 'landscape-safe-area-left' | 'landscape-safe-area-top' | 'landscape-safe-area-right' | 'landscape-safe-area-bottom' | 'cutout-shape' | 'cutout-x' | 'cutout-y' | 'cutout-width' | 'cutout-height' | 'cutout-border-radius' | 'cutout-upper-radius' | 'cutout-lower-radius' | 'cutout-cx' | 'cutout-cy' | 'cutout-radius';
export type EditorValues = Record<EditorFieldName, string>;
export interface DeviceGroupViewInput {
    title: string;
    hidden: boolean;
    devices: EmulationModel.EmulatedDevices.EmulatedDevice[];
}
export interface EditorStateViewInput {
    index: number;
    isNew: boolean;
    values: EditorValues;
    showSafeAreaAndCutout: boolean;
    clientHintsValue: EmulationComponents.UserAgentClientHintsForm.UserAgentClientHintsFormData;
    invalidFields: ReadonlySet<EditorFieldName>;
    isClientHintsInvalid: boolean;
    errorMessages: readonly string[];
    hasErrors: boolean;
    showValidationErrors: boolean;
}
export interface ViewInput {
    customDevices: EmulationModel.EmulatedDevices.EmulatedDevice[];
    defaultDeviceGroups: DeviceGroupViewInput[];
    editorState: EditorStateViewInput | null;
    successMessage: string;
    onAddCustomDevice: () => void;
    onToggleDevice: (device: EmulationModel.EmulatedDevices.EmulatedDevice, custom: boolean, show: boolean) => void;
    onBeginEdit: (index: number) => void;
    onRemoveDevice: (index: number) => void;
    onEditorInput: (field: EditorFieldName, value: string) => void;
    onClientHintsChange: (metaData: Protocol.Emulation.UserAgentMetadata) => void;
    onCommitEdit: () => void;
    onCancelEdit: () => void;
}
export interface ViewOutput {
    focusAddCustomButton?: () => void;
    focusDeviceNameField?: () => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class DevicesSettingsTab extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
    beginEdit(device: EmulationModel.EmulatedDevices.EmulatedDevice, index?: number, isNew?: boolean): void;
    commitEdit(): void;
}
