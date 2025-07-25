// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import { Insets, MaxDeviceSize, MinDeviceSize } from './DeviceModeModel.js';
const UIStrings = {
    /**
     *@description Title of the Laptop with touch device
     */
    laptopWithTouch: 'Laptop with touch',
    /**
     *@description Title of the Laptop with HiDPI screen device
     */
    laptopWithHiDPIScreen: 'Laptop with HiDPI screen',
    /**
     *@description Title of the Laptop with MDPI screen device
     */
    laptopWithMDPIScreen: 'Laptop with MDPI screen',
};
const str_ = i18n.i18n.registerUIStrings('models/emulation/EmulatedDevices.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
export function computeRelativeImageURL(cssURLValue) {
    return cssURLValue.replace(/@url\(([^\)]*?)\)/g, (_match, url) => {
        return new URL(`../../emulated_devices/${url}`, import.meta.url).toString();
    });
}
export class EmulatedDevice {
    title;
    type;
    order;
    vertical;
    horizontal;
    deviceScaleFactor;
    capabilities;
    userAgent;
    userAgentMetadata;
    modes;
    isDualScreen;
    isFoldableScreen;
    verticalSpanned;
    horizontalSpanned;
    #showInternal;
    #showByDefault;
    constructor() {
        this.title = '';
        this.type = Type.Unknown;
        this.vertical = { width: 0, height: 0, outlineInsets: null, outlineImage: null, hinge: null };
        this.horizontal = { width: 0, height: 0, outlineInsets: null, outlineImage: null, hinge: null };
        this.deviceScaleFactor = 1;
        this.capabilities = ["touch" /* Capability.TOUCH */, "mobile" /* Capability.MOBILE */];
        this.userAgent = '';
        this.userAgentMetadata = null;
        this.modes = [];
        this.isDualScreen = false;
        this.isFoldableScreen = false;
        this.verticalSpanned = { width: 0, height: 0, outlineInsets: null, outlineImage: null, hinge: null };
        this.horizontalSpanned = { width: 0, height: 0, outlineInsets: null, outlineImage: null, hinge: null };
        this.#showInternal = Show.Default;
        this.#showByDefault = true;
    }
    static fromJSONV1(json) {
        try {
            function parseValue(object, key, type, defaultValue) {
                if (typeof object !== 'object' || object === null || !object.hasOwnProperty(key)) {
                    if (typeof defaultValue !== 'undefined') {
                        return defaultValue;
                    }
                    throw new Error('Emulated device is missing required property \'' + key + '\'');
                }
                const value = object[key];
                if (typeof value !== type || value === null) {
                    throw new Error('Emulated device property \'' + key + '\' has wrong type \'' + typeof value + '\'');
                }
                return value;
            }
            function parseIntValue(object, key) {
                const value = parseValue(object, key, 'number');
                if (value !== Math.abs(value)) {
                    throw new Error('Emulated device value \'' + key + '\' must be integer');
                }
                return value;
            }
            function parseInsets(json) {
                return new Insets(parseIntValue(json, 'left'), parseIntValue(json, 'top'), parseIntValue(json, 'right'), parseIntValue(json, 'bottom'));
            }
            function parseRGBA(json) {
                const result = {};
                result.r = parseIntValue(json, 'r');
                if (result.r < 0 || result.r > 255) {
                    throw new Error('color has wrong r value: ' + result.r);
                }
                result.g = parseIntValue(json, 'g');
                if (result.g < 0 || result.g > 255) {
                    throw new Error('color has wrong g value: ' + result.g);
                }
                result.b = parseIntValue(json, 'b');
                if (result.b < 0 || result.b > 255) {
                    throw new Error('color has wrong b value: ' + result.b);
                }
                result.a = parseValue(json, 'a', 'number');
                if (result.a < 0 || result.a > 1) {
                    throw new Error('color has wrong a value: ' + result.a);
                }
                return result;
            }
            function parseHinge(json) {
                const result = {};
                result.width = parseIntValue(json, 'width');
                if (result.width < 0 || result.width > MaxDeviceSize) {
                    throw new Error('Emulated device has wrong hinge width: ' + result.width);
                }
                result.height = parseIntValue(json, 'height');
                if (result.height < 0 || result.height > MaxDeviceSize) {
                    throw new Error('Emulated device has wrong hinge height: ' + result.height);
                }
                result.x = parseIntValue(json, 'x');
                if (result.x < 0 || result.x > MaxDeviceSize) {
                    throw new Error('Emulated device has wrong x offset: ' + result.height);
                }
                result.y = parseIntValue(json, 'y');
                if (result.x < 0 || result.x > MaxDeviceSize) {
                    throw new Error('Emulated device has wrong y offset: ' + result.height);
                }
                if (json['contentColor']) {
                    result.contentColor = parseRGBA(json['contentColor']);
                }
                if (json['outlineColor']) {
                    result.outlineColor = parseRGBA(json['outlineColor']);
                }
                return result;
            }
            function parseOrientation(json) {
                const result = {};
                result.width = parseIntValue(json, 'width');
                if (result.width < 0 || result.width > MaxDeviceSize || result.width < MinDeviceSize) {
                    throw new Error('Emulated device has wrong width: ' + result.width);
                }
                result.height = parseIntValue(json, 'height');
                if (result.height < 0 || result.height > MaxDeviceSize || result.height < MinDeviceSize) {
                    throw new Error('Emulated device has wrong height: ' + result.height);
                }
                const outlineInsets = parseValue(json['outline'], 'insets', 'object', null);
                if (outlineInsets) {
                    result.outlineInsets = parseInsets(outlineInsets);
                    if (result.outlineInsets.left < 0 || result.outlineInsets.top < 0) {
                        throw new Error('Emulated device has wrong outline insets');
                    }
                    result.outlineImage = parseValue(json['outline'], 'image', 'string');
                }
                if (json['hinge']) {
                    result.hinge = parseHinge(parseValue(json, 'hinge', 'object', undefined));
                }
                return result;
            }
            const result = new EmulatedDevice();
            result.title = parseValue(json, 'title', 'string');
            const type = parseValue(json, 'type', 'string');
            if (!Object.values(Type).includes(type)) {
                throw new Error('Emulated device has wrong type: ' + type);
            }
            result.type = type;
            result.order = parseValue(json, 'order', 'number', 0);
            const rawUserAgent = parseValue(json, 'user-agent', 'string');
            result.userAgent = SDK.NetworkManager.MultitargetNetworkManager.patchUserAgentWithChromeVersion(rawUserAgent);
            result.userAgentMetadata = parseValue(json, 'user-agent-metadata', 'object', null);
            const capabilities = parseValue(json, 'capabilities', 'object', []);
            if (!Array.isArray(capabilities)) {
                throw new Error('Emulated device capabilities must be an array');
            }
            result.capabilities = [];
            for (let i = 0; i < capabilities.length; ++i) {
                if (typeof capabilities[i] !== 'string') {
                    throw new Error('Emulated device capability must be a string');
                }
                result.capabilities.push(capabilities[i]);
            }
            result.deviceScaleFactor = parseValue(json['screen'], 'device-pixel-ratio', 'number');
            if (result.deviceScaleFactor < 0 || result.deviceScaleFactor > 100) {
                throw new Error('Emulated device has wrong deviceScaleFactor: ' + result.deviceScaleFactor);
            }
            result.vertical = parseOrientation(parseValue(json['screen'], 'vertical', 'object'));
            result.horizontal = parseOrientation(parseValue(json['screen'], 'horizontal', 'object'));
            result.isDualScreen = parseValue(json, 'dual-screen', 'boolean', false);
            result.isFoldableScreen = parseValue(json, 'foldable-screen', 'boolean', false);
            if (result.isDualScreen || result.isFoldableScreen) {
                result.verticalSpanned = parseOrientation(parseValue(json['screen'], 'vertical-spanned', 'object', null));
                result.horizontalSpanned = parseOrientation(parseValue(json['screen'], 'horizontal-spanned', 'object', null));
            }
            if ((result.isDualScreen || result.isFoldableScreen) && (!result.verticalSpanned || !result.horizontalSpanned)) {
                throw new Error('Emulated device \'' + result.title + '\'has dual screen without spanned orientations');
            }
            const modes = parseValue(json, 'modes', 'object', [
                { title: 'default', orientation: 'vertical' },
                { title: 'default', orientation: 'horizontal' },
            ]);
            if (!Array.isArray(modes)) {
                throw new Error('Emulated device modes must be an array');
            }
            result.modes = [];
            for (let i = 0; i < modes.length; ++i) {
                const mode = {};
                mode.title = parseValue(modes[i], 'title', 'string');
                mode.orientation = parseValue(modes[i], 'orientation', 'string');
                if (mode.orientation !== Vertical && mode.orientation !== Horizontal && mode.orientation !== VerticalSpanned &&
                    mode.orientation !== HorizontalSpanned) {
                    throw new Error('Emulated device mode has wrong orientation \'' + mode.orientation + '\'');
                }
                const orientation = result.orientationByName(mode.orientation);
                mode.insets = parseInsets(parseValue(modes[i], 'insets', 'object', { left: 0, top: 0, right: 0, bottom: 0 }));
                if (mode.insets.top < 0 || mode.insets.left < 0 || mode.insets.right < 0 || mode.insets.bottom < 0 ||
                    mode.insets.top + mode.insets.bottom > orientation.height ||
                    mode.insets.left + mode.insets.right > orientation.width) {
                    throw new Error('Emulated device mode \'' + mode.title + '\'has wrong mode insets');
                }
                mode.image = parseValue(modes[i], 'image', 'string', null);
                result.modes.push(mode);
            }
            result.#showByDefault = parseValue(json, 'show-by-default', 'boolean', undefined);
            const show = parseValue(json, 'show', 'string', Show.Default);
            if (!Object.values(Show).includes(show)) {
                throw new Error('Emulated device has wrong show mode: ' + show);
            }
            result.#showInternal = show;
            return result;
        }
        catch {
            return null;
        }
    }
    static deviceComparator(device1, device2) {
        const order1 = device1.order || 0;
        const order2 = device2.order || 0;
        if (order1 > order2) {
            return 1;
        }
        if (order2 > order1) {
            return -1;
        }
        return device1.title < device2.title ? -1 : (device1.title > device2.title ? 1 : 0);
    }
    modesForOrientation(orientation) {
        const result = [];
        for (let index = 0; index < this.modes.length; index++) {
            if (this.modes[index].orientation === orientation) {
                result.push(this.modes[index]);
            }
        }
        return result;
    }
    getSpanPartner(mode) {
        switch (mode.orientation) {
            case Vertical:
                return this.modesForOrientation(VerticalSpanned)[0];
            case Horizontal:
                return this.modesForOrientation(HorizontalSpanned)[0];
            case VerticalSpanned:
                return this.modesForOrientation(Vertical)[0];
            default:
                return this.modesForOrientation(Horizontal)[0];
        }
    }
    getRotationPartner(mode) {
        switch (mode.orientation) {
            case HorizontalSpanned:
                return this.modesForOrientation(VerticalSpanned)[0];
            case VerticalSpanned:
                return this.modesForOrientation(HorizontalSpanned)[0];
            case Horizontal:
                return this.modesForOrientation(Vertical)[0];
            default:
                return this.modesForOrientation(Horizontal)[0];
        }
    }
    toJSON() {
        const json = {};
        json['title'] = this.title;
        json['type'] = this.type;
        json['user-agent'] = this.userAgent;
        json['capabilities'] = this.capabilities;
        json['screen'] = {
            'device-pixel-ratio': this.deviceScaleFactor,
            vertical: this.orientationToJSON(this.vertical),
            horizontal: this.orientationToJSON(this.horizontal),
            'vertical-spanned': undefined,
            'horizontal-spanned': undefined,
        };
        if (this.isDualScreen || this.isFoldableScreen) {
            json['screen']['vertical-spanned'] = this.orientationToJSON(this.verticalSpanned);
            json['screen']['horizontal-spanned'] = this.orientationToJSON(this.horizontalSpanned);
        }
        json['modes'] = [];
        for (let i = 0; i < this.modes.length; ++i) {
            const mode = {
                title: this.modes[i].title,
                orientation: this.modes[i].orientation,
                insets: {
                    left: this.modes[i].insets.left,
                    top: this.modes[i].insets.top,
                    right: this.modes[i].insets.right,
                    bottom: this.modes[i].insets.bottom,
                },
                image: this.modes[i].image || undefined,
            };
            json['modes'].push(mode);
        }
        json['show-by-default'] = this.#showByDefault;
        json['dual-screen'] = this.isDualScreen;
        json['foldable-screen'] = this.isFoldableScreen;
        json['show'] = this.#showInternal;
        if (this.userAgentMetadata) {
            json['user-agent-metadata'] = this.userAgentMetadata;
        }
        return json;
    }
    orientationToJSON(orientation) {
        const json = {};
        json['width'] = orientation.width;
        json['height'] = orientation.height;
        if (orientation.outlineInsets) {
            json.outline = {
                insets: {
                    left: orientation.outlineInsets.left,
                    top: orientation.outlineInsets.top,
                    right: orientation.outlineInsets.right,
                    bottom: orientation.outlineInsets.bottom,
                },
                image: orientation.outlineImage,
            };
        }
        if (orientation.hinge) {
            json.hinge = {
                width: orientation.hinge.width,
                height: orientation.hinge.height,
                x: orientation.hinge.x,
                y: orientation.hinge.y,
                contentColor: undefined,
                outlineColor: undefined,
            };
            if (orientation.hinge.contentColor) {
                json.hinge.contentColor = {
                    r: orientation.hinge.contentColor.r,
                    g: orientation.hinge.contentColor.g,
                    b: orientation.hinge.contentColor.b,
                    a: orientation.hinge.contentColor.a,
                };
            }
            if (orientation.hinge.outlineColor) {
                json.hinge.outlineColor = {
                    r: orientation.hinge.outlineColor.r,
                    g: orientation.hinge.outlineColor.g,
                    b: orientation.hinge.outlineColor.b,
                    a: orientation.hinge.outlineColor.a,
                };
            }
        }
        return json;
    }
    modeImage(mode) {
        if (!mode.image) {
            return '';
        }
        return computeRelativeImageURL(mode.image);
    }
    outlineImage(mode) {
        const orientation = this.orientationByName(mode.orientation);
        if (!orientation.outlineImage) {
            return '';
        }
        return computeRelativeImageURL(orientation.outlineImage);
    }
    orientationByName(name) {
        switch (name) {
            case VerticalSpanned:
                return this.verticalSpanned;
            case HorizontalSpanned:
                return this.horizontalSpanned;
            case Vertical:
                return this.vertical;
            default:
                return this.horizontal;
        }
    }
    show() {
        if (this.#showInternal === Show.Default) {
            return this.#showByDefault;
        }
        return this.#showInternal === Show.Always;
    }
    setShow(show) {
        this.#showInternal = show ? Show.Always : Show.Never;
    }
    copyShowFrom(other) {
        this.#showInternal = other.#showInternal;
    }
    touch() {
        return this.capabilities.indexOf("touch" /* Capability.TOUCH */) !== -1;
    }
    mobile() {
        return this.capabilities.indexOf("mobile" /* Capability.MOBILE */) !== -1;
    }
}
export const Horizontal = 'horizontal';
export const Vertical = 'vertical';
export const HorizontalSpanned = 'horizontal-spanned';
export const VerticalSpanned = 'vertical-spanned';
var Type;
(function (Type) {
    /* eslint-disable @typescript-eslint/naming-convention -- Indexed access. */
    Type["Phone"] = "phone";
    Type["Tablet"] = "tablet";
    Type["Notebook"] = "notebook";
    Type["Desktop"] = "desktop";
    Type["Unknown"] = "unknown";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Type || (Type = {}));
var Show;
(function (Show) {
    /* eslint-disable @typescript-eslint/naming-convention -- Indexed access. */
    Show["Always"] = "Always";
    Show["Default"] = "Default";
    Show["Never"] = "Never";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Show || (Show = {}));
let emulatedDevicesListInstance;
export class EmulatedDevicesList extends Common.ObjectWrapper.ObjectWrapper {
    #standardSetting;
    #standardInternal;
    #customSetting;
    #customInternal;
    constructor() {
        super();
        this.#standardSetting = Common.Settings.Settings.instance().createSetting('standard-emulated-device-list', []);
        this.#standardInternal = new Set();
        this.listFromJSONV1(this.#standardSetting.get(), this.#standardInternal);
        this.updateStandardDevices();
        this.#customSetting = Common.Settings.Settings.instance().createSetting('custom-emulated-device-list', []);
        this.#customInternal = new Set();
        if (!this.listFromJSONV1(this.#customSetting.get(), this.#customInternal)) {
            this.saveCustomDevices();
        }
    }
    static instance() {
        if (!emulatedDevicesListInstance) {
            emulatedDevicesListInstance = new EmulatedDevicesList();
        }
        return emulatedDevicesListInstance;
    }
    updateStandardDevices() {
        const devices = new Set();
        for (const emulatedDevice of emulatedDevices) {
            const device = EmulatedDevice.fromJSONV1(emulatedDevice);
            if (device) {
                devices.add(device);
            }
        }
        this.copyShowValues(this.#standardInternal, devices);
        this.#standardInternal = devices;
        this.saveStandardDevices();
    }
    listFromJSONV1(jsonArray, result) {
        if (!Array.isArray(jsonArray)) {
            return false;
        }
        let success = true;
        for (let i = 0; i < jsonArray.length; ++i) {
            const device = EmulatedDevice.fromJSONV1(jsonArray[i]);
            if (device) {
                result.add(device);
                if (!device.modes.length) {
                    device.modes.push({ title: '', orientation: Horizontal, insets: new Insets(0, 0, 0, 0), image: null });
                    device.modes.push({ title: '', orientation: Vertical, insets: new Insets(0, 0, 0, 0), image: null });
                }
            }
            else {
                success = false;
            }
        }
        return success;
    }
    static rawEmulatedDevicesForTest() {
        return emulatedDevices;
    }
    standard() {
        return [...this.#standardInternal];
    }
    custom() {
        return [...this.#customInternal];
    }
    revealCustomSetting() {
        void Common.Revealer.reveal(this.#customSetting);
    }
    addCustomDevice(device) {
        this.#customInternal.add(device);
        this.saveCustomDevices();
    }
    removeCustomDevice(device) {
        this.#customInternal.delete(device);
        this.saveCustomDevices();
    }
    saveCustomDevices() {
        const json = [];
        this.#customInternal.forEach(device => json.push(device.toJSON()));
        this.#customSetting.set(json);
        this.dispatchEventToListeners("CustomDevicesUpdated" /* Events.CUSTOM_DEVICES_UPDATED */);
    }
    saveStandardDevices() {
        const json = [];
        this.#standardInternal.forEach(device => json.push(device.toJSON()));
        this.#standardSetting.set(json);
        this.dispatchEventToListeners("StandardDevicesUpdated" /* Events.STANDARD_DEVICES_UPDATED */);
    }
    copyShowValues(from, to) {
        const fromDeviceById = new Map();
        for (const device of from) {
            fromDeviceById.set(device.title, device);
        }
        for (const toDevice of to) {
            const fromDevice = fromDeviceById.get(toDevice.title);
            if (fromDevice) {
                toDevice.copyShowFrom(fromDevice);
            }
        }
    }
}
// These props should quoted for the script to work properly
/* eslint-disable @stylistic/quote-props */
const emulatedDevices = [
    // This is used by a python script to keep this list up-to-date with
    // chromedriver native code.
    // See //chrome/test/chromedriver/embed_mobile_devices_in_cpp.py in Chromium.
    // DEVICE-LIST-BEGIN
    {
        'order': 10,
        'show-by-default': true,
        'title': 'iPhone SE',
        'screen': {
            'horizontal': {
                'width': 667,
                'height': 375,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 375,
                'height': 667,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 12,
        'show-by-default': true,
        'title': 'iPhone XR',
        'screen': {
            'horizontal': {
                'width': 896,
                'height': 414,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 414,
                'height': 896,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 14,
        'show-by-default': true,
        'title': 'iPhone 12 Pro',
        'screen': {
            'horizontal': {
                'width': 844,
                'height': 390,
            },
            'device-pixel-ratio': 3,
            'vertical': {
                'width': 390,
                'height': 844,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 15,
        'show-by-default': true,
        'title': 'iPhone 14 Pro Max',
        'screen': {
            'horizontal': {
                'width': 932,
                'height': 430,
            },
            'device-pixel-ratio': 3,
            'vertical': {
                'width': 430,
                'height': 932,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 16,
        'show-by-default': false,
        'title': 'Pixel 3 XL',
        'screen': {
            'horizontal': {
                'width': 786,
                'height': 393,
            },
            'device-pixel-ratio': 2.75,
            'vertical': {
                'width': 393,
                'height': 786,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '11', 'architecture': '', 'model': 'Pixel 3', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 18,
        'show-by-default': true,
        'title': 'Pixel 7',
        'screen': {
            'horizontal': {
                'width': 915,
                'height': 412,
            },
            'device-pixel-ratio': 2.625,
            'vertical': {
                'width': 412,
                'height': 915,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '13', 'architecture': '', 'model': 'Pixel 5', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 20,
        'show-by-default': true,
        'title': 'Samsung Galaxy S8+',
        'screen': {
            'horizontal': {
                'width': 740,
                'height': 360,
            },
            'device-pixel-ratio': 4,
            'vertical': {
                'width': 360,
                'height': 740,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'SM-G955U', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 24,
        'show-by-default': true,
        'title': 'Samsung Galaxy S20 Ultra',
        'screen': {
            'horizontal': {
                'width': 915,
                'height': 412,
            },
            'device-pixel-ratio': 3.5,
            'vertical': {
                'width': 412,
                'height': 915,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '13', 'architecture': '', 'model': 'SM-G981B', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 26,
        'show-by-default': true,
        'title': 'iPad Mini',
        'screen': {
            'horizontal': {
                'width': 1024,
                'height': 768,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 768,
                'height': 1024,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
        'type': 'tablet',
    },
    {
        'order': 28,
        'show-by-default': true,
        'title': 'iPad Air',
        'screen': {
            'horizontal': {
                'width': 1180,
                'height': 820,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 820,
                'height': 1180,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15',
        'type': 'tablet',
    },
    {
        'order': 29,
        'show-by-default': true,
        'title': 'iPad Pro',
        'screen': {
            'horizontal': {
                'width': 1366,
                'height': 1024,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 1024,
                'height': 1366,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15',
        'type': 'tablet',
    },
    {
        'order': 30,
        'show-by-default': true,
        'title': 'Surface Pro 7',
        'screen': {
            'horizontal': {
                'width': 1368,
                'height': 912,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 912,
                'height': 1368,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
        'type': 'tablet',
    },
    {
        'order': 32,
        'show-by-default': true,
        'dual-screen': true,
        'title': 'Surface Duo',
        'screen': {
            'horizontal': { 'width': 720, 'height': 540 },
            'device-pixel-ratio': 2.5,
            'vertical': { 'width': 540, 'height': 720 },
            'vertical-spanned': {
                'width': 1114,
                'height': 720,
                'hinge': { 'width': 34, 'height': 720, 'x': 540, 'y': 0, 'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 1 } },
            },
            'horizontal-spanned': {
                'width': 720,
                'height': 1114,
                'hinge': { 'width': 720, 'height': 34, 'x': 0, 'y': 540, 'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 1 } },
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '11.0', 'architecture': '', 'model': 'Surface Duo', 'mobile': true },
        'type': 'phone',
        'modes': [
            { 'title': 'default', 'orientation': 'vertical', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            { 'title': 'default', 'orientation': 'horizontal', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            { 'title': 'spanned', 'orientation': 'vertical-spanned', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            {
                'title': 'spanned',
                'orientation': 'horizontal-spanned',
                'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 },
            },
        ],
    },
    {
        'order': 34,
        'show-by-default': true,
        'foldable-screen': true,
        'title': 'Galaxy Z Fold 5',
        'screen': {
            'horizontal': { 'width': 882, 'height': 344 },
            'device-pixel-ratio': 2.625,
            'vertical': { 'width': 344, 'height': 882 },
            'vertical-spanned': {
                'width': 690,
                'height': 829,
                'hinge': {
                    'width': 0,
                    'height': 829,
                    'x': 345,
                    'y': 0,
                    'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.2 },
                    'outlineColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.7 },
                },
            },
            'horizontal-spanned': {
                'width': 829,
                'height': 690,
                'hinge': {
                    'width': 829,
                    'height': 0,
                    'x': 0,
                    'y': 345,
                    'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.2 },
                    'outlineColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.7 },
                },
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '10.0', 'architecture': '', 'model': 'SM-F946U', 'mobile': true },
        'type': 'phone',
        'modes': [
            { 'title': 'default', 'orientation': 'vertical', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            { 'title': 'default', 'orientation': 'horizontal', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            { 'title': 'spanned', 'orientation': 'vertical-spanned', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            {
                'title': 'spanned',
                'orientation': 'horizontal-spanned',
                'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 },
            },
        ],
    },
    {
        'order': 35,
        'show-by-default': true,
        'foldable-screen': true,
        'title': 'Asus Zenbook Fold',
        'screen': {
            'horizontal': { 'width': 1280, 'height': 853 },
            'device-pixel-ratio': 1.5,
            'vertical': { 'width': 853, 'height': 1280 },
            'vertical-spanned': {
                'width': 1706,
                'height': 1280,
                'hinge': {
                    'width': 107,
                    'height': 1280,
                    'x': 800,
                    'y': 0,
                    'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.2 },
                    'outlineColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.7 },
                },
            },
            'horizontal-spanned': {
                'width': 1280,
                'height': 1706,
                'hinge': {
                    'width': 1706,
                    'height': 107,
                    'x': 0,
                    'y': 800,
                    'contentColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.2 },
                    'outlineColor': { 'r': 38, 'g': 38, 'b': 38, 'a': 0.7 },
                },
            },
        },
        'capabilities': ['touch'],
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
        'user-agent-metadata': { 'platform': 'Windows', 'platformVersion': '11.0', 'architecture': '', 'model': 'UX9702AA', 'mobile': false },
        'type': 'tablet',
        'modes': [
            { 'title': 'default', 'orientation': 'vertical', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            { 'title': 'default', 'orientation': 'horizontal', 'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 } },
            {
                'title': 'spanned',
                'orientation': 'vertical-spanned',
                'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 },
            },
            {
                'title': 'spanned',
                'orientation': 'horizontal-spanned',
                'insets': { 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 },
            },
        ],
    },
    {
        'order': 36,
        'show-by-default': true,
        'title': 'Samsung Galaxy A51/71',
        'screen': {
            'horizontal': {
                'width': 914,
                'height': 412,
            },
            'device-pixel-ratio': 2.625,
            'vertical': {
                'width': 412,
                'height': 914,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'SM-G955U', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 52,
        'show-by-default': true,
        'title': 'Nest Hub Max',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/google-nest-hub-max-horizontal.avif)',
                    'insets': { 'left': 92, 'top': 96, 'right': 91, 'bottom': 248 },
                },
                'width': 1280,
                'height': 800,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 1280,
                'height': 800,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36 CrKey/1.54.250320',
        'type': 'tablet',
        'modes': [{ 'title': 'default', 'orientation': 'horizontal' }],
    },
    {
        'order': 50,
        'show-by-default': true,
        'title': 'Nest Hub',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/google-nest-hub-horizontal.avif)',
                    'insets': { 'left': 82, 'top': 74, 'right': 83, 'bottom': 222 },
                },
                'width': 1024,
                'height': 600,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'width': 1024,
                'height': 600,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36 CrKey/1.54.248666',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '', 'architecture': '', 'model': '', 'mobile': false },
        'type': 'tablet',
        'modes': [{ 'title': 'default', 'orientation': 'horizontal' }],
    },
    {
        'order': 129,
        'show-by-default': false,
        'title': 'iPhone 4',
        'screen': {
            'horizontal': { 'width': 480, 'height': 320 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 320, 'height': 480 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
        'type': 'phone',
    },
    {
        'order': 130,
        'show-by-default': false,
        'title': 'iPhone 5/SE',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/iPhone5-landscape.avif)',
                    'insets': { 'left': 115, 'top': 25, 'right': 115, 'bottom': 28 },
                },
                'width': 568,
                'height': 320,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/iPhone5-portrait.avif)',
                    'insets': { 'left': 29, 'top': 105, 'right': 25, 'bottom': 111 },
                },
                'width': 320,
                'height': 568,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'type': 'phone',
    },
    {
        'order': 131,
        'show-by-default': false,
        'title': 'iPhone 6/7/8',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/iPhone6-landscape.avif)',
                    'insets': { 'left': 106, 'top': 28, 'right': 106, 'bottom': 28 },
                },
                'width': 667,
                'height': 375,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/iPhone6-portrait.avif)',
                    'insets': { 'left': 28, 'top': 105, 'right': 28, 'bottom': 105 },
                },
                'width': 375,
                'height': 667,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 132,
        'show-by-default': false,
        'title': 'iPhone 6/7/8 Plus',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/iPhone6Plus-landscape.avif)',
                    'insets': { 'left': 109, 'top': 29, 'right': 109, 'bottom': 27 },
                },
                'width': 736,
                'height': 414,
            },
            'device-pixel-ratio': 3,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/iPhone6Plus-portrait.avif)',
                    'insets': { 'left': 26, 'top': 107, 'right': 30, 'bottom': 111 },
                },
                'width': 414,
                'height': 736,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'order': 133,
        'show-by-default': false,
        'title': 'iPhone X',
        'screen': {
            'horizontal': { 'width': 812, 'height': 375 },
            'device-pixel-ratio': 3,
            'vertical': { 'width': 375, 'height': 812 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'BlackBerry Z30',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Nexus 4',
        'screen': {
            'horizontal': { 'width': 640, 'height': 384 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 384, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.4.2', 'architecture': '', 'model': 'Nexus 4', 'mobile': true },
        'type': 'phone',
    },
    {
        'title': 'Nexus 5',
        'type': 'phone',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '6.0', 'architecture': '', 'model': 'Nexus 5', 'mobile': true },
        'capabilities': ['touch', 'mobile'],
        'show-by-default': false,
        'screen': {
            'device-pixel-ratio': 3,
            'vertical': { 'width': 360, 'height': 640 },
            'horizontal': { 'width': 640, 'height': 360 },
        },
        'modes': [
            {
                'title': 'default',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 25, 'right': 0, 'bottom': 48 },
                'image': '@url(optimized/google-nexus-5-vertical-default-1x.avif) 1x, @url(optimized/google-nexus-5-vertical-default-2x.avif) 2x',
            },
            {
                'title': 'navigation bar',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 80, 'right': 0, 'bottom': 48 },
                'image': '@url(optimized/google-nexus-5-vertical-navigation-1x.avif) 1x, @url(optimized/google-nexus-5-vertical-navigation-2x.avif) 2x',
            },
            {
                'title': 'keyboard',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 80, 'right': 0, 'bottom': 312 },
                'image': '@url(optimized/google-nexus-5-vertical-keyboard-1x.avif) 1x, @url(optimized/google-nexus-5-vertical-keyboard-2x.avif) 2x',
            },
            {
                'title': 'default',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 25, 'right': 42, 'bottom': 0 },
                'image': '@url(optimized/google-nexus-5-horizontal-default-1x.avif) 1x, @url(optimized/google-nexus-5-horizontal-default-2x.avif) 2x',
            },
            {
                'title': 'navigation bar',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 80, 'right': 42, 'bottom': 0 },
                'image': '@url(optimized/google-nexus-5-horizontal-navigation-1x.avif) 1x, @url(optimized/google-nexus-5-horizontal-navigation-2x.avif) 2x',
            },
            {
                'title': 'keyboard',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 80, 'right': 42, 'bottom': 202 },
                'image': '@url(optimized/google-nexus-5-horizontal-keyboard-1x.avif) 1x, @url(optimized/google-nexus-5-horizontal-keyboard-2x.avif) 2x',
            },
        ],
    },
    {
        'title': 'Nexus 5X',
        'type': 'phone',
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'Nexus 5X', 'mobile': true },
        'capabilities': ['touch', 'mobile'],
        'show-by-default': false,
        'screen': {
            'device-pixel-ratio': 2.625,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/Nexus5X-portrait.avif)',
                    'insets': { 'left': 18, 'top': 88, 'right': 22, 'bottom': 98 },
                },
                'width': 412,
                'height': 732,
            },
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/Nexus5X-landscape.avif)',
                    'insets': { 'left': 88, 'top': 21, 'right': 98, 'bottom': 19 },
                },
                'width': 732,
                'height': 412,
            },
        },
        'modes': [
            {
                'title': 'default',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 24, 'right': 0, 'bottom': 48 },
                'image': '@url(optimized/google-nexus-5x-vertical-default-1x.avif) 1x, @url(optimized/google-nexus-5x-vertical-default-2x.avif) 2x',
            },
            {
                'title': 'navigation bar',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 80, 'right': 0, 'bottom': 48 },
                'image': '@url(optimized/google-nexus-5x-vertical-navigation-1x.avif) 1x, @url(optimized/google-nexus-5x-vertical-navigation-2x.avif) 2x',
            },
            {
                'title': 'keyboard',
                'orientation': 'vertical',
                'insets': { 'left': 0, 'top': 80, 'right': 0, 'bottom': 342 },
                'image': '@url(optimized/google-nexus-5x-vertical-keyboard-1x.avif) 1x, @url(optimized/google-nexus-5x-vertical-keyboard-2x.avif) 2x',
            },
            {
                'title': 'default',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 24, 'right': 48, 'bottom': 0 },
                'image': '@url(optimized/google-nexus-5x-horizontal-default-1x.avif) 1x, @url(optimized/google-nexus-5x-horizontal-default-2x.avif) 2x',
            },
            {
                'title': 'navigation bar',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 80, 'right': 48, 'bottom': 0 },
                'image': '@url(optimized/google-nexus-5x-horizontal-navigation-1x.avif) 1x, @url(optimized/google-nexus-5x-horizontal-navigation-2x.avif) 2x',
            },
            {
                'title': 'keyboard',
                'orientation': 'horizontal',
                'insets': { 'left': 0, 'top': 80, 'right': 48, 'bottom': 222 },
                'image': '@url(optimized/google-nexus-5x-horizontal-keyboard-1x.avif) 1x, @url(optimized/google-nexus-5x-horizontal-keyboard-2x.avif) 2x',
            },
        ],
    },
    {
        'show-by-default': false,
        'title': 'Nexus 6',
        'screen': {
            'horizontal': { 'width': 732, 'height': 412 },
            'device-pixel-ratio': 3.5,
            'vertical': { 'width': 412, 'height': 732 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '7.1.1', 'architecture': '', 'model': 'Nexus 6', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Nexus 6P',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/Nexus6P-landscape.avif)',
                    'insets': { 'left': 94, 'top': 17, 'right': 88, 'bottom': 17 },
                },
                'width': 732,
                'height': 412,
            },
            'device-pixel-ratio': 3.5,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/Nexus6P-portrait.avif)',
                    'insets': { 'left': 16, 'top': 94, 'right': 16, 'bottom': 88 },
                },
                'width': 412,
                'height': 732,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'Nexus 6P', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 120,
        'show-by-default': false,
        'title': 'Pixel 2',
        'screen': {
            'horizontal': { 'width': 731, 'height': 411 },
            'device-pixel-ratio': 2.625,
            'vertical': { 'width': 411, 'height': 731 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0', 'architecture': '', 'model': 'Pixel 2', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 121,
        'show-by-default': false,
        'title': 'Pixel 2 XL',
        'screen': {
            'horizontal': { 'width': 823, 'height': 411 },
            'device-pixel-ratio': 3.5,
            'vertical': { 'width': 411, 'height': 823 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'Pixel 2 XL', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Pixel 3',
        'screen': {
            'horizontal': { 'width': 786, 'height': 393 },
            'device-pixel-ratio': 2.75,
            'vertical': { 'width': 393, 'height': 786 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '9', 'architecture': '', 'model': 'Pixel 3', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Pixel 4',
        'screen': {
            'horizontal': { 'width': 745, 'height': 353 },
            'device-pixel-ratio': 3,
            'vertical': { 'width': 353, 'height': 745 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '10', 'architecture': '', 'model': 'Pixel 4', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'LG Optimus L70',
        'screen': {
            'horizontal': { 'width': 640, 'height': 384 },
            'device-pixel-ratio': 1.25,
            'vertical': { 'width': 384, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.4.2', 'architecture': '', 'model': 'LGMS323', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Nokia N9',
        'screen': {
            'horizontal': { 'width': 854, 'height': 480 },
            'device-pixel-ratio': 1,
            'vertical': { 'width': 480, 'height': 854 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Nokia Lumia 520',
        'screen': {
            'horizontal': { 'width': 533, 'height': 320 },
            'device-pixel-ratio': 1.5,
            'vertical': { 'width': 320, 'height': 533 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Microsoft Lumia 550',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 640, 'height': 360 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36 Edge/14.14263',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.2.1', 'architecture': '', 'model': 'Lumia 550', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Microsoft Lumia 950',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 4,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36 Edge/14.14263',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.2.1', 'architecture': '', 'model': 'Lumia 950', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy S III',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.0', 'architecture': '', 'model': 'GT-I9300', 'mobile': true },
        'type': 'phone',
    },
    {
        'order': 110,
        'show-by-default': false,
        'title': 'Galaxy S5',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 3,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '5.0', 'architecture': '', 'model': 'SM-G900P', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy S8',
        'screen': {
            'horizontal': { 'width': 740, 'height': 360 },
            'device-pixel-ratio': 3,
            'vertical': { 'width': 360, 'height': 740 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '7.0', 'architecture': '', 'model': 'SM-G950U', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy S9+',
        'screen': {
            'horizontal': { 'width': 658, 'height': 320 },
            'device-pixel-ratio': 4.5,
            'vertical': { 'width': 320, 'height': 658 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.0.0', 'architecture': '', 'model': 'SM-G965U', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy Tab S4',
        'screen': {
            'horizontal': { 'width': 1138, 'height': 712 },
            'device-pixel-ratio': 2.25,
            'vertical': { 'width': 712, 'height': 1138 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '8.1.0', 'architecture': '', 'model': 'SM-T837A', 'mobile': false },
        'type': 'phone',
    },
    {
        'order': 1,
        'show-by-default': false,
        'title': 'JioPhone 2',
        'screen': {
            'horizontal': { 'width': 320, 'height': 240 },
            'device-pixel-ratio': 1,
            'vertical': { 'width': 240, 'height': 320 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
        'user-agent-metadata': {
            'platform': 'Android',
            'platformVersion': '',
            'architecture': '',
            'model': 'LYF/F300B/LYF-F300B-001-01-15-130718-i',
            'mobile': true,
        },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Kindle Fire HDX',
        'screen': {
            'horizontal': { 'width': 1280, 'height': 800 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 800, 'height': 1280 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
        'type': 'tablet',
    },
    {
        'order': 140,
        'show-by-default': false,
        'title': 'iPad',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/iPad-landscape.avif)',
                    'insets': { 'left': 112, 'top': 56, 'right': 116, 'bottom': 52 },
                },
                'width': 1024,
                'height': 768,
            },
            'device-pixel-ratio': 2,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/iPad-portrait.avif)',
                    'insets': { 'left': 52, 'top': 114, 'right': 55, 'bottom': 114 },
                },
                'width': 768,
                'height': 1024,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'type': 'tablet',
    },
    {
        'order': 141,
        'show-by-default': false,
        'title': 'iPad Pro',
        'screen': {
            'horizontal': { 'width': 1366, 'height': 1024 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 1024, 'height': 1366 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'type': 'tablet',
    },
    {
        'show-by-default': false,
        'title': 'Blackberry PlayBook',
        'screen': {
            'horizontal': { 'width': 1024, 'height': 600 },
            'device-pixel-ratio': 1,
            'vertical': { 'width': 600, 'height': 1024 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        'type': 'tablet',
    },
    {
        'show-by-default': false,
        'title': 'Nexus 10',
        'screen': {
            'horizontal': { 'width': 1280, 'height': 800 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 800, 'height': 1280 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '6.0.1', 'architecture': '', 'model': 'Nexus 10', 'mobile': false },
        'type': 'tablet',
    },
    {
        'show-by-default': false,
        'title': 'Nexus 7',
        'screen': {
            'horizontal': { 'width': 960, 'height': 600 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 600, 'height': 960 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '6.0.1', 'architecture': '', 'model': 'Nexus 7', 'mobile': false },
        'type': 'tablet',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy Note 3',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 3,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.3', 'architecture': '', 'model': 'SM-N900T', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Galaxy Note II',
        'screen': {
            'horizontal': { 'width': 640, 'height': 360 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 360, 'height': 640 },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '4.1', 'architecture': '', 'model': 'GT-N7100', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        /* DEVICE-LIST-IF-JS */
        'title': i18nLazyString(UIStrings.laptopWithTouch),
        /* DEVICE-LIST-ELSE
        'title': 'Laptop with touch',
        DEVICE-LIST-END-IF */
        'screen': {
            'horizontal': { 'width': 1280, 'height': 950 },
            'device-pixel-ratio': 1,
            'vertical': { 'width': 950, 'height': 1280 },
        },
        'capabilities': ['touch'],
        'user-agent': '',
        'type': 'notebook',
        'modes': [{ 'title': 'default', 'orientation': 'horizontal' }],
    },
    {
        'show-by-default': false,
        /* DEVICE-LIST-IF-JS */
        'title': i18nLazyString(UIStrings.laptopWithHiDPIScreen),
        /* DEVICE-LIST-ELSE
        'title': 'Laptop with HiDPI screen',
        DEVICE-LIST-END-IF */
        'screen': {
            'horizontal': { 'width': 1440, 'height': 900 },
            'device-pixel-ratio': 2,
            'vertical': { 'width': 900, 'height': 1440 },
        },
        'capabilities': [],
        'user-agent': '',
        'type': 'notebook',
        'modes': [{ 'title': 'default', 'orientation': 'horizontal' }],
    },
    {
        'show-by-default': false,
        /* DEVICE-LIST-IF-JS */
        'title': i18nLazyString(UIStrings.laptopWithMDPIScreen),
        /* DEVICE-LIST-ELSE
        'title': 'Laptop with MDPI screen',
        DEVICE-LIST-END-IF */
        'screen': {
            'horizontal': { 'width': 1280, 'height': 800 },
            'device-pixel-ratio': 1,
            'vertical': { 'width': 800, 'height': 1280 },
        },
        'capabilities': [],
        'user-agent': '',
        'type': 'notebook',
        'modes': [{ 'title': 'default', 'orientation': 'horizontal' }],
    },
    {
        'show-by-default': false,
        'title': 'Moto G4',
        'screen': {
            'horizontal': {
                'outline': {
                    'image': '@url(optimized/MotoG4-landscape.avif)',
                    'insets': { 'left': 91, 'top': 30, 'right': 74, 'bottom': 30 },
                },
                'width': 640,
                'height': 360,
            },
            'device-pixel-ratio': 3,
            'vertical': {
                'outline': {
                    'image': '@url(optimized/MotoG4-portrait.avif)',
                    'insets': { 'left': 30, 'top': 91, 'right': 30, 'bottom': 74 },
                },
                'width': 360,
                'height': 640,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '6.0.1', 'architecture': '', 'model': 'Moto G (4)', 'mobile': true },
        'type': 'phone',
    },
    {
        'show-by-default': false,
        'title': 'Moto G Power',
        'screen': {
            'device-pixel-ratio': 1.75,
            'horizontal': {
                'width': 823,
                'height': 412,
            },
            'vertical': {
                'width': 412,
                'height': 823,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36',
        'user-agent-metadata': {
            'platform': 'Android',
            'platformVersion': '11',
            'architecture': '',
            'model': 'moto g power (2022)',
            'mobile': true,
        },
        'type': 'phone',
    },
    {
        'order': 200,
        'show-by-default': false,
        'title': 'Facebook on Android',
        'screen': {
            'horizontal': {
                'width': 892,
                'height': 412,
            },
            'device-pixel-ratio': 3.5,
            'vertical': {
                'width': 412,
                'height': 892,
            },
        },
        'capabilities': ['touch', 'mobile'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SQ3A.220705.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/%s Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/407.0.0.0.65;]',
        'user-agent-metadata': { 'platform': 'Android', 'platformVersion': '12', 'architecture': '', 'model': 'Pixel 6', 'mobile': true },
        'type': 'phone',
    },
    // DEVICE-LIST-END
];
/* eslint-enable @stylistic/quote-props */
//# sourceMappingURL=EmulatedDevices.js.map