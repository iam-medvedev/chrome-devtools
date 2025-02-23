import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import type * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
/**
 * The structure of the project settings.
 *
 * @see https://goo.gle/devtools-json-design
 */
export interface ProjectSettings {
    readonly workspace?: {
        readonly root: Platform.DevToolsPath.RawPathString;
        readonly uuid: string;
    };
}
export declare class ProjectSettingsModel extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    /**
     * Yields the current project settings.
     *
     * @return the current project settings.
     */
    get projectSettings(): ProjectSettings;
    get projectSettingsPromise(): Promise<ProjectSettings>;
    private constructor();
    /**
     * Yields the `ProjectSettingsModel` singleton.
     *
     * @returns the singleton.
     */
    static instance({ forceNew, hostConfig, pageResourceLoader, targetManager }: {
        forceNew: boolean | null;
        hostConfig: Root.Runtime.HostConfig | null;
        pageResourceLoader: SDK.PageResourceLoader.PageResourceLoader | null;
        targetManager: SDK.TargetManager.TargetManager | null;
    }): ProjectSettingsModel;
    /**
     * Clears the `ProjectSettingsModel` singleton (if any).
     */
    static removeInstance(): void;
}
export declare const enum Events {
    PROJECT_SETTINGS_CHANGED = "ProjectSettingsChanged"
}
export interface EventTypes {
    [Events.PROJECT_SETTINGS_CHANGED]: ProjectSettings;
}
