import { AccessibilitySubPane } from './AccessibilitySubPane.js';
export declare const BINDING_NAME = "__announcementsRecorderBinding";
export declare const enum AnnouncementApi {
    ARIA_LIVE = "aria-live",
    JS_TRIGGERED = "js-triggered"
}
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
    time: number;
}
export declare function injectedScript(ariaLiveApi: string, jsTriggeredApi: string): void;
export declare function teardownScript(): void;
export declare const INJECTED_SCRIPT_SOURCE: string;
export declare const TEARDOWN_SCRIPT_SOURCE: string;
export declare function checkForBlockedPayload(payload: unknown): string | null;
export declare function validateAndSanitizeAnnouncement(payload: unknown): A11yAnnouncement | null;
export declare class AccessibilityAnnouncementRecordingView extends AccessibilitySubPane {
    constructor();
}
