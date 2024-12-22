import type * as Platform from '../../core/platform/platform.js';
export interface ReleaseNote {
    version: number;
    header: string;
    markdownLinks: {
        key: string;
        link: string;
    }[];
    videoLinks: {
        description: string;
        link: Platform.DevToolsPath.UrlString;
        type?: VideoType;
    }[];
    link: string;
}
export declare const enum VideoType {
    WHATS_NEW = "WhatsNew",
    DEVTOOLS_TIPS = "DevtoolsTips",
    OTHER = "Other"
}
export declare function setReleaseNoteForTest(testReleaseNote: ReleaseNote): void;
export declare function getReleaseNote(): ReleaseNote;
