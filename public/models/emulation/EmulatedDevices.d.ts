import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import { Insets } from './DeviceModeModel.js';
export declare function computeRelativeImageURL(cssURLValue: string): string;
export declare class EmulatedDevice {
    #private;
    title: string;
    type: Type;
    order: number;
    vertical: Orientation;
    horizontal: Orientation;
    deviceScaleFactor: number;
    capabilities: string[];
    userAgent: string;
    userAgentMetadata: Protocol.Emulation.UserAgentMetadata | null;
    modes: Mode[];
    isDualScreen: boolean;
    isFoldableScreen: boolean;
    verticalSpanned: Orientation;
    horizontalSpanned: Orientation;
    constructor();
    static fromJSONV1(json: any): EmulatedDevice | null;
    static deviceComparator(device1: EmulatedDevice, device2: EmulatedDevice): number;
    modesForOrientation(orientation: string): Mode[];
    getSpanPartner(mode: Mode): Mode | undefined;
    getRotationPartner(mode: Mode): Mode | null;
    toJSON(): any;
    private orientationToJSON;
    modeImage(mode: Mode): string;
    outlineImage(mode: Mode): string;
    orientationByName(name: string): Orientation;
    show(): boolean;
    setShow(show: boolean): void;
    copyShowFrom(other: EmulatedDevice): void;
    touch(): boolean;
    mobile(): boolean;
}
export declare const Horizontal = "horizontal";
export declare const Vertical = "vertical";
export declare const HorizontalSpanned = "horizontal-spanned";
export declare const VerticalSpanned = "vertical-spanned";
declare enum Type {
    Phone = "phone",
    Tablet = "tablet",
    Notebook = "notebook",
    Desktop = "desktop",
    Unknown = "unknown"
}
export declare const enum Capability {
    TOUCH = "touch",
    MOBILE = "mobile"
}
export declare class EmulatedDevicesList extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    constructor();
    static instance(): EmulatedDevicesList;
    private updateStandardDevices;
    private listFromJSONV1;
    standard(): EmulatedDevice[];
    custom(): EmulatedDevice[];
    revealCustomSetting(): void;
    addCustomDevice(device: EmulatedDevice): void;
    removeCustomDevice(device: EmulatedDevice): void;
    saveCustomDevices(): void;
    saveStandardDevices(): void;
    private copyShowValues;
}
export declare const enum Events {
    CUSTOM_DEVICES_UPDATED = "CustomDevicesUpdated",
    STANDARD_DEVICES_UPDATED = "StandardDevicesUpdated"
}
export type EventTypes = {
    [Events.CUSTOM_DEVICES_UPDATED]: void;
    [Events.STANDARD_DEVICES_UPDATED]: void;
};
export interface Mode {
    title: string;
    orientation: string;
    insets: Insets;
    image: string | null;
}
export interface Orientation {
    width: number;
    height: number;
    outlineInsets: Insets | null;
    outlineImage: string | null;
    hinge: SDK.OverlayModel.Hinge | null;
}
export interface JSONMode {
    title: string;
    orientation: string;
    image?: string;
    insets: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
export {};
