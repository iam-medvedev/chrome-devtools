import * as Host from '../../core/host/host.js';
export declare enum Step {
    THOUGHT = "thought",
    ACTION = "action",
    OBSERVATION = "observation",
    ANSWER = "answer"
}
export declare class FreestylerAgent {
    #private;
    constructor({ aidaClient }: {
        aidaClient: Host.AidaClient.AidaClient;
    });
    run(query: string, onStep: (step: Step, stepOutput: string) => void): Promise<void>;
}
