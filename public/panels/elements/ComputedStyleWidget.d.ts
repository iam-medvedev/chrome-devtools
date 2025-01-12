import '../../ui/legacy/legacy.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type ComputedStyleModel } from './ComputedStyleModel.js';
export declare class ComputedStyleWidget extends UI.ThrottledWidget.ThrottledWidget {
    #private;
    private computedStyleModel;
    private readonly showInheritedComputedStylePropertiesSetting;
    private readonly groupComputedStylesSetting;
    input: UI.Toolbar.ToolbarInput;
    private filterRegex;
    private readonly noMatchesElement;
    private readonly linkifier;
    private readonly imagePreviewPopover;
    constructor(computedStyleModel: ComputedStyleModel);
    onResize(): void;
    wasShown(): void;
    willHide(): void;
    doUpdate(): Promise<void>;
    private fetchMatchedCascade;
    private rebuildAlphabeticalList;
    private rebuildGroupedList;
    private buildTraceNode;
    private createTreeNodeRenderer;
    private buildTreeNode;
    private handleContextMenuEvent;
    private computePropertyTraces;
    private computeNonInheritedProperties;
    private onFilterChanged;
    filterComputedStyles(regex: RegExp | null): Promise<void>;
    private nodeFilter;
    private filterAlphabeticalList;
    private filterGroupLists;
}
