export type Change = {
    selector: string;
    styles: string;
};
export declare const AI_ASSISTANT_CSS_CLASS_NAME = "ai-assistant-change";
/**
 * Keeps track of changes done by Freestyler. Currently, it is primarily
 * for stylesheet generation based on all changes.
 */
export declare class ChangeManager {
    #private;
    addChange(change: Change): void;
    buildStyleSheet(): string;
}
