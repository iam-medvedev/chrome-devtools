import * as SDK from '../../core/sdk/sdk.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
export declare const BINDING_NAME = "__announcementsRecorderBinding";
export declare enum AnnouncementApi {
    ARIA_LIVE = "aria-live",
    JS_TRIGGERED = "js-triggered"
}
export declare const enum RecordTypeFilter {
    BOTH = "both",
    ARIA_LIVE = "aria-live",
    JS_TRIGGERED = "js-triggered"
}
export interface BlockedTargetInfo {
    targetName: string;
    reason: string;
}
export interface ViewInput {
    isRecording: boolean;
    onToggleRecording: () => void;
    onClear: () => void;
    onExportCsv: () => void;
    canExport: boolean;
    recordTypeFilter: RecordTypeFilter;
    onRecordTypeFilterChange: (type: RecordTypeFilter) => void;
    textFilter: string;
    onTextFilterChange: (text: string) => void;
    blockedTargets: BlockedTargetInfo[];
    announcements: readonly A11yAnnouncement[];
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare global {
    interface Window {
        __announcementsRecorderBinding?: (payload: string) => void;
        __announcementsRecorderBinding_loaded?: boolean;
        __announcementsRecorderBinding_cleanup?: () => void;
    }
}
export interface A11yAnnouncement {
    api: AnnouncementApi;
    message: string;
    politeness: string;
    element: string;
    elementId?: string;
    stack?: string;
    target?: SDK.Target.Target;
    time: number;
}
export declare function injectedScript(ariaLiveApi: string, jsTriggeredApi: string): void;
export declare function teardownScript(): void;
export declare const INJECTED_SCRIPT_SOURCE: string;
export declare const TEARDOWN_SCRIPT_SOURCE: string;
export declare function checkForBlockedPayload(payload: unknown): string | null;
export declare function validateAndSanitizeAnnouncement(payload: unknown): A11yAnnouncement | null;
export declare function buildCsvContent(announcements: readonly A11yAnnouncement[]): string;
export declare class AccessibilityAnnouncementRecordingView extends AccessibilitySubPane implements SDK.TargetManager.Observer {
    #private;
    constructor(view?: View);
    wasShown(): void;
    targetAdded(target: SDK.Target.Target): Promise<void>;
    targetRemoved(target: SDK.Target.Target): Promise<void>;
    startRecording(): Promise<void>;
    stopRecording(): Promise<void>;
    clearAnnouncements(): void;
    get filteredAnnouncements(): readonly A11yAnnouncement[];
    setRecordTypeFilter(type: RecordTypeFilter): void;
    setTextFilter(text: string): void;
    exportCsvForTest(): string;
    performUpdate(): void;
    announcementsForTest(): A11yAnnouncement[];
    blockedReasonForTargetForTest(target: SDK.Target.Target): string | undefined;
    blockedTargetsForTest(): Map<SDK.Target.Target, string>;
    isRecordingForTest(): boolean;
}
