export declare const enum LengthUnit {
    PIXEL = "px",
    CENTIMETER = "cm",
    MILLIMETER = "mm",
    QUARTERMILLIMETER = "Q",
    INCH = "in",
    PICA = "pc",
    POINT = "pt",
    CAP = "cap",
    CH = "ch",
    EM = "em",
    EX = "ex",
    IC = "ic",
    LH = "lh",
    RCAP = "rcap",
    RCH = "rch",
    REM = "rem",
    REX = "rex",
    RIC = "ric",
    RLH = "rlh",
    VB = "vb",
    VH = "vh",
    VI = "vi",
    VW = "vw",
    VMIN = "vmin",
    VMAX = "vmax"
}
export declare const LENGTH_UNITS: readonly [LengthUnit.PIXEL, LengthUnit.CENTIMETER, LengthUnit.MILLIMETER, LengthUnit.QUARTERMILLIMETER, LengthUnit.INCH, LengthUnit.PICA, LengthUnit.POINT, LengthUnit.CAP, LengthUnit.CH, LengthUnit.EM, LengthUnit.EX, LengthUnit.IC, LengthUnit.LH, LengthUnit.RCAP, LengthUnit.RCH, LengthUnit.REM, LengthUnit.REX, LengthUnit.RIC, LengthUnit.RLH, LengthUnit.VB, LengthUnit.VH, LengthUnit.VI, LengthUnit.VW, LengthUnit.VMIN, LengthUnit.VMAX];
export declare const CSSLengthRegex: RegExp;
export interface Length {
    value: number;
    unit: LengthUnit;
}
export declare const parseText: (text: string) => Length | null;
