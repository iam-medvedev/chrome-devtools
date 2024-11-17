import * as UI from '../../ui/legacy/legacy.js';
export declare class ElementStatePaneWidget extends UI.Widget.Widget {
    private readonly inputs;
    private readonly inputStates;
    private readonly duals;
    private cssModel?;
    private specificPseudoStateDivs;
    private specificHeader;
    private readonly throttler;
    constructor();
    private updateModel;
    wasShown(): void;
    update(): void;
    private updateElementSpecificStatesTable;
    updateElementSpecificStatesTableForTest(): void;
}
export declare class ButtonProvider implements UI.Toolbar.Provider {
    private readonly button;
    private view;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): ButtonProvider;
    private clicked;
    item(): UI.Toolbar.ToolbarToggle;
}
