import '../../ui/components/icon_button/icon_button.js';
import '../../ui/components/menus/menus.js';
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
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
export declare function suggestionFilter(option: string, query: string): boolean;
export declare const enum Events {
    SUBMIT_EDITOR = "submiteditor"
}
export interface EventTypes {
    [Events.SUBMIT_EDITOR]: Command;
}
declare const JSONEditor_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.SUBMIT_EDITOR>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.SUBMIT_EDITOR>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.SUBMIT_EDITOR>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.SUBMIT_EDITOR): boolean;
    dispatchEventToListeners<T extends Events.SUBMIT_EDITOR>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class JSONEditor extends JSONEditor_base {
    #private;
    constructor(element: HTMLElement);
    get metadataByCommand(): Map<string, {
        parameters: Parameter[];
        description: string;
        replyArgs: string[];
    }>;
    set metadataByCommand(metadataByCommand: Map<string, {
        parameters: Parameter[];
        description: string;
        replyArgs: string[];
    }>);
    get typesByName(): Map<string, Parameter[]>;
    set typesByName(typesByName: Map<string, Parameter[]>);
    get enumsByName(): Map<string, Record<string, string>>;
    set enumsByName(enumsByName: Map<string, Record<string, string>>);
    get parameters(): Parameter[];
    set parameters(parameters: Parameter[]);
    get targets(): SDK.Target.Target[];
    set targets(targets: SDK.Target.Target[]);
    get command(): string;
    set command(command: string);
    get targetId(): string | undefined;
    set targetId(targetId: string | undefined);
    wasShown(): void;
    willHide(): void;
    getParameters(): {
        [key: string]: unknown;
    };
    displayCommand(command: string, parameters: Record<string, unknown>, targetId?: string): void;
    getCommandJson(): string;
    populateParametersForCommandWithDefaultValues(): void;
    performUpdate(): void;
}
export {};
