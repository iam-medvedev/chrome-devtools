import '../../ui/legacy/legacy.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class PropertiesWidget extends UI.ThrottledWidget.ThrottledWidget {
    private node;
    private readonly showAllPropertiesSetting;
    private filterRegex;
    private readonly noMatchesElement;
    private readonly treeOutline;
    private readonly expandController;
    private lastRequestedNode?;
    constructor(throttlingTimeout?: number);
    private onFilterChanged;
    private filterList;
    private setNode;
    doUpdate(): Promise<void>;
    private onNodeChange;
}
