import '../../ui/kit/kit.js';
import * as UI from '../../ui/legacy/legacy.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-recording-list-view': RecordingListView;
    }
}
interface Recording {
    storageName: string;
    name: string;
}
interface ViewInput {
    recordings: readonly Recording[];
    replayAllowed: boolean;
    onCreateClick: () => void;
    onDeleteClick: (storageName: string, event: Event) => void;
    onOpenClick: (storageName: string, event: Event) => void;
    onPlayRecordingClick: (storageName: string, event: Event) => void;
    onKeyDown: (storageName: string, event: Event) => void;
}
export type ViewOutput = object;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void;
export declare class RecordingListView extends UI.Widget.Widget {
    #private;
    onCreateRecording?: () => void;
    onDeleteRecording?: (storageName: string) => void;
    onOpenRecording?: (storageName: string) => void;
    onPlayRecording?: (storageName: string) => void;
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set recordings(recordings: readonly Recording[]);
    set replayAllowed(value: boolean);
    performUpdate(): void;
    wasShown(): void;
}
export {};
