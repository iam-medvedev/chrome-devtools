import * as UI from '../../ui/legacy/legacy.js';
export declare class GreenDevPanel extends UI.Panel.Panel {
    #private;
    private constructor();
    wasShown(): void;
    willHide(): void;
    closeSession(sessionId: string): void;
    static instance(opts?: {
        forceNew: boolean | null;
    }): GreenDevPanel;
}
