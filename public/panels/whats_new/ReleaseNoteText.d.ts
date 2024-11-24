interface ReleaseNote {
    version: number;
    header: string;
    markdownLinks: {
        key: string;
        link: string;
    }[];
    link: string;
}
export declare function setReleaseNoteForTest(testReleaseNote: ReleaseNote): void;
export declare function getReleaseNote(): ReleaseNote;
export {};
