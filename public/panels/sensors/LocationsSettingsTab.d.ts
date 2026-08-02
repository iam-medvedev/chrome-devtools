import '../../ui/kit/kit.js';
import '../../ui/components/lists/lists.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type LitTemplate } from '../../ui/lit/lit.js';
import locationsSettingsTabStyles from './locationsSettingsTab.css.js';
export { locationsSettingsTabStyles };
export interface EditorInputControls {
    titleInput: LitTemplate | Element;
    latInput: LitTemplate | Element;
    longInput: LitTemplate | Element;
    timezoneIdInput: LitTemplate | Element;
    localeInput: LitTemplate | Element;
    accuracyInput: LitTemplate | Element;
}
export interface LocationValidationErrors {
    title?: string | null;
    lat?: string | null;
    long?: string | null;
    timezoneId?: string | null;
    locale?: string | null;
    accuracy?: string | null;
}
export interface LocationDialogInput {
    location: LocationDescription;
    isNew: boolean;
    errors?: LocationValidationErrors;
    onSave: (location: LocationDescription) => void;
    onCancel: () => void;
    onValidateErrors: (errors: LocationValidationErrors) => void;
}
export declare function renderEditorView(controls: EditorInputControls, errors?: LocationDialogInput['errors'], isDialog?: boolean): LitTemplate;
export declare function renderLocationDialog(input: LocationDialogInput): LitTemplate;
interface LocationsViewInput {
    locations: LocationDescription[];
    onAddLocation: () => void;
    onEditLocation: (index: number) => void;
    onRemoveLocation: (index: number) => void;
    activeDialog?: LocationDialogInput;
}
export type ViewOutput = undefined;
export declare const DEFAULT_VIEW: (input: LocationsViewInput, _output: ViewOutput, target: HTMLElement) => void;
export type View = typeof DEFAULT_VIEW;
export declare class LocationsSettingsTab extends UI.Widget.VBox {
    #private;
    private readonly customSetting;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    performUpdate(): void;
    private locationsUpdated;
    private addButtonClicked;
    private editLocationClicked;
    private removeLocationClicked;
    private saveDialog;
    private closeDialog;
    private updateDialogErrors;
}
export interface LocationDescription {
    title: string;
    lat: number;
    long: number;
    timezoneId: string;
    locale: string;
    accuracy?: number;
}
export declare function validateTitle(value: string): string | null;
export declare function validateLatitude(value: string): string | null;
export declare function validateLongitude(value: string): string | null;
export declare function validateTimezoneId(value: string): string | null;
export declare function validateLocale(value: string): string | null;
export declare function validateAccuracy(value: string): string | null;
