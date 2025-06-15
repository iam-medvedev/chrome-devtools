import '../../ui/legacy/legacy.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ChangesSidebar } from './ChangesSidebar.js';
export declare class ChangesView extends UI.Widget.VBox {
    private emptyWidget;
    private readonly workspaceDiff;
    readonly changesSidebar: ChangesSidebar;
    private selectedUISourceCode;
    private readonly diffContainer;
    private readonly combinedDiffView;
    constructor();
    private renderDiffOrEmptyState;
    private selectedUISourceCodeChanged;
    wasShown(): void;
    willHide(): void;
    private hideDiff;
    private showDiff;
}
