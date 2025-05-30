// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
export class ContrastInfo extends Common.ObjectWrapper.ObjectWrapper {
    isNullInternal;
    contrastRatioInternal;
    contrastRatioAPCAInternal;
    contrastRatioThresholds;
    contrastRatioAPCAThresholdInternal;
    fgColor;
    bgColorInternal;
    colorFormatInternal;
    constructor(contrastInfo) {
        super();
        this.isNullInternal = true;
        this.contrastRatioInternal = null;
        this.contrastRatioAPCAInternal = null;
        this.contrastRatioThresholds = null;
        this.contrastRatioAPCAThresholdInternal = 0;
        this.fgColor = null;
        this.bgColorInternal = null;
        if (!contrastInfo) {
            return;
        }
        if (!contrastInfo.computedFontSize || !contrastInfo.computedFontWeight) {
            return;
        }
        this.isNullInternal = false;
        this.contrastRatioThresholds =
            Common.ColorUtils.getContrastThreshold(contrastInfo.computedFontSize, contrastInfo.computedFontWeight);
        this.contrastRatioAPCAThresholdInternal =
            Common.ColorUtils.getAPCAThreshold(contrastInfo.computedFontSize, contrastInfo.computedFontWeight);
        if (!contrastInfo.backgroundColors || contrastInfo.backgroundColors.length !== 1) {
            return;
        }
        const bgColorText = contrastInfo.backgroundColors[0];
        const bgColor = Common.Color.parse(bgColorText)?.asLegacyColor();
        if (bgColor) {
            this.setBgColorInternal(bgColor);
        }
    }
    isNull() {
        return this.isNullInternal;
    }
    setColor(fgColor, colorFormat) {
        this.fgColor = fgColor;
        this.colorFormatInternal = colorFormat;
        this.updateContrastRatio();
        this.dispatchEventToListeners("ContrastInfoUpdated" /* Events.CONTRAST_INFO_UPDATED */);
    }
    colorFormat() {
        return this.colorFormatInternal;
    }
    color() {
        return this.fgColor;
    }
    contrastRatio() {
        return this.contrastRatioInternal;
    }
    contrastRatioAPCA() {
        return this.contrastRatioAPCAInternal;
    }
    contrastRatioAPCAThreshold() {
        return this.contrastRatioAPCAThresholdInternal;
    }
    setBgColor(bgColor) {
        this.setBgColorInternal(bgColor);
        this.dispatchEventToListeners("ContrastInfoUpdated" /* Events.CONTRAST_INFO_UPDATED */);
    }
    setBgColorInternal(bgColor) {
        this.bgColorInternal = bgColor;
        if (!this.fgColor) {
            return;
        }
        const fgRGBA = this.fgColor.rgba();
        // If we have a semi-transparent background color over an unknown
        // background, draw the line for the "worst case" scenario: where
        // the unknown background is the same color as the text.
        if (bgColor.hasAlpha()) {
            const blendedRGBA = Common.ColorUtils.blendColors(bgColor.rgba(), fgRGBA);
            this.bgColorInternal = new Common.Color.Legacy(blendedRGBA, "rgba" /* Common.Color.Format.RGBA */);
        }
        this.contrastRatioInternal = Common.ColorUtils.contrastRatio(fgRGBA, this.bgColorInternal.rgba());
        this.contrastRatioAPCAInternal =
            Common.ColorUtils.contrastRatioAPCA(this.fgColor.rgba(), this.bgColorInternal.rgba());
    }
    bgColor() {
        return this.bgColorInternal;
    }
    updateContrastRatio() {
        if (!this.bgColorInternal || !this.fgColor) {
            return;
        }
        this.contrastRatioInternal = Common.ColorUtils.contrastRatio(this.fgColor.rgba(), this.bgColorInternal.rgba());
        this.contrastRatioAPCAInternal =
            Common.ColorUtils.contrastRatioAPCA(this.fgColor.rgba(), this.bgColorInternal.rgba());
    }
    contrastRatioThreshold(level) {
        if (!this.contrastRatioThresholds) {
            return null;
        }
        return this.contrastRatioThresholds[level];
    }
}
//# sourceMappingURL=ContrastInfo.js.map