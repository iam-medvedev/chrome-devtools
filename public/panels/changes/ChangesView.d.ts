import * as Common from '../../core/common/common.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ChangesSidebar } from './ChangesSidebar.js';
export declare class ChangesView extends UI.Widget.VBox {
    #private;
    private emptyWidget;
    private readonly workspaceDiff;
    readonly changesSidebar: ChangesSidebar;
    private selectedUISourceCode;
    private readonly diffContainer;
    private readonly toolbar;
    private readonly diffStats;
    private readonly diffView;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): ChangesView;
    private selectedUISourceCodeChanged;
    revert(): void;
    copy(): Promise<void>;
    private click;
    private revealUISourceCode;
    wasShown(): void;
    willHide(): void;
    private refreshDiff;
    private hideDiff;
    private renderDiffRows;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export declare class DiffUILocationRevealer implements Common.Revealer.Revealer<WorkspaceDiff.WorkspaceDiff.DiffUILocation> {
    reveal(diffUILocation: WorkspaceDiff.WorkspaceDiff.DiffUILocation, omitFocus?: boolean): Promise<void>;
}
