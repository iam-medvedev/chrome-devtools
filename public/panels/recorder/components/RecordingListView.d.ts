import '../../../ui/components/icon_button/icon_button.js';
import * as UI from '../../../ui/legacy/legacy.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-recording-list-view': RecordingListView;
    }
    interface HTMLElementEventMap {
        openrecording: OpenRecordingEvent;
        deleterecording: DeleteRecordingEvent;
    }
}
export declare class CreateRecordingEvent extends Event {
    static readonly eventName = "createrecording";
    constructor();
}
export declare class DeleteRecordingEvent extends Event {
    storageName: string;
    static readonly eventName = "deleterecording";
    constructor(storageName: string);
}
export declare class OpenRecordingEvent extends Event {
    storageName: string;
    static readonly eventName = "openrecording";
    constructor(storageName: string);
}
export declare class PlayRecordingEvent extends Event {
    storageName: string;
    static readonly eventName = "playrecording";
    constructor(storageName: string);
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
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set recordings(recordings: readonly Recording[]);
    set replayAllowed(value: boolean);
    performUpdate(): void;
    wasShown(): void;
}
export {};
