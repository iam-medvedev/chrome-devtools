export declare const getFocusableCell: (shadowRoot: ShadowRoot) => HTMLTableCellElement;
export declare const getCellByIndexes: (shadowRoot: ShadowRoot, indexes: {
    column: number;
    row: number;
}) => HTMLTableCellElement;
export declare const getHeaderCells: (shadowRoot: ShadowRoot, options?: {
    onlyVisible: boolean;
}) => HTMLTableCellElement[];
export declare const getAllRows: (shadowRoot: ShadowRoot) => HTMLTableRowElement[];
export declare const assertGridContents: (gridComponent: HTMLElement, headerExpected: string[], rowsExpected: string[][]) => Element;
export declare const emulateUserKeyboardNavigation: (shadowRoot: ShadowRoot, key: "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown") => void;
export declare const getValuesOfAllBodyRows: (shadowRoot: ShadowRoot, options?: {
    onlyVisible: boolean;
}) => string[][];
