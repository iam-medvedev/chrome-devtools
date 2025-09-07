export interface UnitFormatters {
    millis: (x: number) => string;
    micros: (x: number) => string;
    bytes: (x: number) => string;
}
