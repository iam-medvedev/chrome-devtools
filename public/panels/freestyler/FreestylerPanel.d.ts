import * as UI from '../../ui/legacy/legacy.js';
export declare class FreestylerPanel extends UI.Panel.Panel {
    #private;
    private view;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): FreestylerPanel;
    wasShown(): void;
    doUpdate(): void;
}
