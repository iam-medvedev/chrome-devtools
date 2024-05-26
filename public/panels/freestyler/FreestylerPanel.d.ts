import * as UI from '../../ui/legacy/legacy.js';
import { State as FreestylerChatUiState } from './components/FreestylerChatUi.js';
export declare class FreestylerPanel extends UI.Panel.Panel {
    #private;
    private view;
    state: FreestylerChatUiState;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): FreestylerPanel;
    wasShown(): void;
    doUpdate(): void;
    onTextSubmit: () => void;
    onAcceptPrivacyNotice: () => void;
}
