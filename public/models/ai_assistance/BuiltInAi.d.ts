export interface LanguageModel {
    promptStreaming: (arg0: string, opts?: {
        responseConstraint: Object;
        signal?: AbortSignal;
    }) => AsyncGenerator<string>;
    clone: () => LanguageModel;
    destroy: () => void;
}
export declare class BuiltInAi {
    #private;
    static isAvailable(): Promise<boolean>;
    static cachedIsAvailable(): boolean;
    private constructor();
    static instance(): Promise<BuiltInAi | undefined>;
    static removeInstance(): void;
    getConsoleInsight(prompt: string, abortController: AbortController): AsyncGenerator<string>;
}
