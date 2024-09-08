import * as SDK from '../../../core/sdk/sdk.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
declare const LitElement: typeof LitHtml.LitElement;
declare global {
    interface HTMLElementTagNameMap {
        'devtools-json-editor': JSONEditor;
    }
}
export declare const enum ParameterType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    ARRAY = "array",
    OBJECT = "object"
}
interface BaseParameter {
    optional: boolean;
    name: string;
    typeRef?: string;
    description: string;
    isCorrectType?: boolean;
    isKeyEditable?: boolean;
}
interface ArrayParameter extends BaseParameter {
    type: ParameterType.ARRAY;
    value?: Parameter[];
}
interface NumberParameter extends BaseParameter {
    type: ParameterType.NUMBER;
    value?: number;
}
interface StringParameter extends BaseParameter {
    type: ParameterType.STRING;
    value?: string;
}
interface BooleanParameter extends BaseParameter {
    type: ParameterType.BOOLEAN;
    value?: boolean;
}
interface ObjectParameter extends BaseParameter {
    type: ParameterType.OBJECT;
    value?: Parameter[];
}
export type Parameter = ArrayParameter | NumberParameter | StringParameter | BooleanParameter | ObjectParameter;
export interface Command {
    command: string;
    parameters: {
        [x: string]: unknown;
    };
    targetId?: string;
}
/**
 * Parents should listen for this event and register the listeners provided by
 * this event"
 */
export declare class SubmitEditorEvent extends Event {
    static readonly eventName = "submiteditor";
    readonly data: Command;
    constructor(data: Command);
}
export declare function suggestionFilter(option: string, query: string): boolean;
export declare class JSONEditor extends LitElement {
    #private;
    static styles: CSSStyleSheet[];
    metadataByCommand: Map<string, {
        parameters: Parameter[];
        description: string;
        replyArgs: string[];
    }>;
    typesByName: Map<string, Parameter[]>;
    enumsByName: Map<string, Record<string, string>>;
    parameters: Parameter[];
    targets: SDK.Target.Target[];
    command: string;
    targetId?: string;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    getParameters(): {
        [key: string]: unknown;
    };
    displayCommand(command: string, parameters: Record<string, unknown>, targetId?: string): void;
    getCommandJson(): string;
    populateParametersForCommandWithDefaultValues(): void;
    render(): LitHtml.TemplateResult;
}
export {};
