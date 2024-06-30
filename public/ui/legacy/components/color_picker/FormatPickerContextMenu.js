// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as IconButton from '../../../components/icon_button/icon_button.js';
import * as UI from '../../legacy.js';
const UIStrings = {
    /**
     *@description Tooltip text describing that a color was clipped after conversion to match the target gamut
     *@example {rgb(255 255 255)} PH1
     */
    colorClippedTooltipText: 'This color was clipped to match the format\'s gamut. The actual result was {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('ui/legacy/components/color_picker/FormatPickerContextMenu.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class FormatPickerContextMenu {
    #color;
    constructor(color) {
        this.#color = color;
    }
    async show(e, onSelect) {
        let resolveShowPromise = undefined;
        const showPromise = new Promise(resolve => {
            resolveShowPromise = resolve;
        });
        const legacyFormats = [
            "hex" /* Common.Color.Format.HEX */,
            "hexa" /* Common.Color.Format.HEXA */,
            "rgb" /* Common.Color.Format.RGB */,
            "rgba" /* Common.Color.Format.RGBA */,
            "hsl" /* Common.Color.Format.HSL */,
            "hwb" /* Common.Color.Format.HWB */,
        ];
        const modernFormats = [
            "lch" /* Common.Color.Format.LCH */,
            "oklch" /* Common.Color.Format.OKLCH */,
            "lab" /* Common.Color.Format.LAB */,
            "oklab" /* Common.Color.Format.OKLAB */,
            "srgb" /* Common.Color.Format.SRGB */,
            "srgb-linear" /* Common.Color.Format.SRGB_LINEAR */,
            "display-p3" /* Common.Color.Format.DISPLAY_P3 */,
            "a98-rgb" /* Common.Color.Format.A98_RGB */,
            "prophoto-rgb" /* Common.Color.Format.PROPHOTO_RGB */,
            "rec2020" /* Common.Color.Format.REC_2020 */,
            "xyz" /* Common.Color.Format.XYZ */,
            "xyz-d50" /* Common.Color.Format.XYZ_D50 */,
            "xyz-d65" /* Common.Color.Format.XYZ_D65 */,
        ];
        const menu = new UI.ContextMenu.ContextMenu(e, { onSoftMenuClosed: () => resolveShowPromise?.() });
        const legacySection = menu.section('legacy');
        const wideSection = menu.section('wide');
        const colorFunctionSection = menu.section('color-function').appendSubMenuItem('color()', false, 'color').section();
        if (!(this.#color instanceof Common.Color.Nickname)) {
            const nickname = this.#color.asLegacyColor().nickname();
            if (nickname) {
                this.addColorToSection(nickname, legacySection, onSelect);
            }
        }
        if (!(this.#color instanceof Common.Color.ShortHex)) {
            const shortHex = this.#color.as((this.#color.alpha ?? 1) === 1 ? "hex" /* Common.Color.Format.HEX */ : "hexa" /* Common.Color.Format.HEXA */)
                .shortHex();
            if (shortHex) {
                this.addColorToSection(shortHex, legacySection, onSelect);
            }
        }
        for (const format of [...legacyFormats, ...modernFormats]) {
            if (format === this.#color.format()) {
                continue;
            }
            const newColor = this.#color.as(format);
            const section = legacyFormats.includes(format) ? legacySection :
                newColor instanceof Common.Color.ColorFunction ? colorFunctionSection :
                    wideSection;
            this.addColorToSection(newColor, section, onSelect);
        }
        await menu.show();
        await showPromise;
    }
    addColorToSection(newColor, section, onSelect) {
        if (newColor instanceof Common.Color.Legacy) {
            const originalHasAlpha = (this.#color.alpha ?? 1) !== 1;
            const isAlphaFormat = newColor.alpha !== null;
            // When the original color has alpha, only print alpha legacy formats. Otherwise, only print non-alpha legacy
            // formats.
            if (isAlphaFormat !== originalHasAlpha) {
                return;
            }
        }
        const label = newColor.asString();
        if (!label) {
            return;
        }
        let icon = undefined;
        if (newColor.isGamutClipped()) {
            icon = new IconButton.Icon.Icon();
            icon.data = {
                iconName: 'warning',
                color: 'var(--icon-default)',
                width: '16px',
                height: '16px',
            };
            icon.style.marginLeft = '1px';
            icon.style.marginTop = '-1px';
            icon.style.minWidth = '16px';
            icon.style.minHeight = '16px';
        }
        const tooltip = icon ? i18nString(UIStrings.colorClippedTooltipText, { PH1: newColor.getAsRawString() ?? 'none' }) : undefined;
        const handler = () => onSelect(newColor);
        section.appendItem(label, handler, { additionalElement: icon, tooltip, jslogContext: newColor.isGamutClipped() ? 'color' : 'clipped-color' });
    }
}
//# sourceMappingURL=FormatPickerContextMenu.js.map