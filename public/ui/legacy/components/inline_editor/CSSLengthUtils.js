// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export const LENGTH_UNITS = [
    "px" /* LengthUnit.PIXEL */, "cm" /* LengthUnit.CENTIMETER */, "mm" /* LengthUnit.MILLIMETER */, "Q" /* LengthUnit.QUARTERMILLIMETER */,
    "in" /* LengthUnit.INCH */, "pc" /* LengthUnit.PICA */, "pt" /* LengthUnit.POINT */, "cap" /* LengthUnit.CAP */,
    "ch" /* LengthUnit.CH */, "em" /* LengthUnit.EM */, "ex" /* LengthUnit.EX */, "ic" /* LengthUnit.IC */,
    "lh" /* LengthUnit.LH */, "rcap" /* LengthUnit.RCAP */, "rch" /* LengthUnit.RCH */, "rem" /* LengthUnit.REM */,
    "rex" /* LengthUnit.REX */, "ric" /* LengthUnit.RIC */, "rlh" /* LengthUnit.RLH */, "vb" /* LengthUnit.VB */,
    "vh" /* LengthUnit.VH */, "vi" /* LengthUnit.VI */, "vw" /* LengthUnit.VW */, "vmin" /* LengthUnit.VMIN */,
    "vmax" /* LengthUnit.VMAX */,
];
export const CSSLengthRegex = new RegExp(`(?<value>[+-]?\\d*\\.?\\d+)(?<unit>${LENGTH_UNITS.join('|')})`);
export const parseText = (text) => {
    const result = text.match(CSSLengthRegex);
    if (!result || !result.groups) {
        return null;
    }
    return {
        value: Number(result.groups.value),
        unit: result.groups.unit,
    };
};
//# sourceMappingURL=CSSLengthUtils.js.map