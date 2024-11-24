import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const releaseVersionSeen = "releaseNoteVersionSeen";
export declare const releaseNoteViewId: string;
export declare function showReleaseNoteIfNeeded(): boolean;
export declare function getReleaseNoteVersionSetting(): Common.Settings.Setting<number>;
export declare class HelpLateInitialization implements Common.Runnable.Runnable {
    static instance(opts?: {
        forceNew: boolean | null;
    }): HelpLateInitialization;
    run(): Promise<void>;
}
export declare class ReleaseNotesActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, _actionId: string): boolean;
    static instance(opts?: {
        forceNew: boolean | null;
    }): ReleaseNotesActionDelegate;
}
export declare class ReportIssueActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, _actionId: string): boolean;
    static instance(opts?: {
        forceNew: boolean | null;
    }): ReportIssueActionDelegate;
}
