import '../../ui/kit/kit.js';
import * as UI from '../../ui/legacy/legacy.js';
interface LocationsViewInput {
    onAddLocation: () => void;
}
export type ViewOutput = undefined;
export declare const DEFAULT_VIEW: (input: LocationsViewInput, _output: ViewOutput, target: HTMLElement) => void;
export type View = typeof DEFAULT_VIEW;
export declare class LocationsSettingsTab extends UI.Widget.VBox implements UI.ListWidget.Delegate<LocationDescription> {
    #private;
    private readonly list;
    private readonly customSetting;
    private editor?;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    performUpdate(): void;
    private locationsUpdated;
    private addButtonClicked;
    renderItem(location: LocationDescription, _editable: boolean): Element;
    removeItemRequested(_item: LocationDescription, index: number): void;
    commitEdit(location: LocationDescription, editor: UI.ListWidget.Editor<LocationDescription>, isNew: boolean): void;
    beginEdit(location: LocationDescription): UI.ListWidget.Editor<LocationDescription>;
    private createEditor;
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
export {};
