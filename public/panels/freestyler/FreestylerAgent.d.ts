import * as Host from '../../core/host/host.js';
export declare enum Step {
    THOUGHT = "thought",
    ACTION = "action",
    ANSWER = "answer"
}
export type StepData = {
    step: Step.THOUGHT | Step.ANSWER;
    text: string;
} | {
    step: Step.ACTION;
    code: string;
    output: string;
};
export declare class FreestylerAgent {
    #private;
    constructor({ aidaClient }: {
        aidaClient: Host.AidaClient.AidaClient;
    });
    static buildRequest(input: string, preamble?: string, chatHistory?: Host.AidaClient.Chunk[]): Host.AidaClient.AidaRequest;
    static parseResponse(response: string): {
        thought?: string;
        action?: string;
        answer?: string;
    };
    run(query: string, onStep: (data: StepData) => void): Promise<void>;
}
