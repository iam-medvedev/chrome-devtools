import '../../ui/legacy/legacy.js';
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
    private readonly diffStats?;
    private readonly diffView?;
    private readonly combinedDiffView?;
    constructor();
    private renderDiffOrEmptyState;
    private selectedUISourceCodeChanged;
    revert(): void;
    copy(): Promise<void>;
    private click;
    private revealUISourceCode;
    wasShown(): void;
    willHide(): void;
    private refreshDiff;
    private hideDiff;
    private showDiffContainer;
    private showEmptyState;
    private renderDiffRows;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
