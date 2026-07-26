import * as UI from '../../ui/legacy/legacy.js';
import * as Models from './models/models.js';
import { type Assignments, type DeepImmutable, type DeepPartial, type Keys } from './util/util.js';
type Attribute = Keys<Models.Schema.Step>;
type DataType<A extends Attribute> = ReturnType<typeof typeConverters[typeof dataTypeByAttribute[A]]>;
declare const typeConverters: Readonly<{
    string: (value: string) => string;
    number: (value: string) => number;
    boolean: (value: string) => boolean;
}>;
declare const dataTypeByAttribute: Readonly<{
    readonly selectors: "string";
    readonly offsetX: "number";
    readonly offsetY: "number";
    readonly target: "string";
    readonly frame: "number";
    readonly assertedEvents: "string";
    readonly value: "string";
    readonly key: "string";
    readonly operator: "string";
    readonly count: "number";
    readonly expression: "string";
    readonly x: "number";
    readonly y: "number";
    readonly url: "string";
    readonly type: "string";
    readonly timeout: "number";
    readonly duration: "number";
    readonly button: "string";
    readonly deviceType: "string";
    readonly width: "number";
    readonly height: "number";
    readonly deviceScaleFactor: "number";
    readonly isMobile: "boolean";
    readonly hasTouch: "boolean";
    readonly isLandscape: "boolean";
    readonly download: "number";
    readonly upload: "number";
    readonly latency: "number";
    readonly name: "string";
    readonly parameters: "string";
    readonly visible: "boolean";
    readonly properties: "string";
    readonly attributes: "string";
}>;
declare const defaultValuesByAttribute: DeepImmutable<{
    selectors: string[][];
    offsetX: number;
    offsetY: number;
    target: string;
    frame: number[];
    assertedEvents: {
        type: string;
        url: string;
        title: string;
    }[];
    value: string;
    key: string;
    operator: string;
    count: number;
    expression: string;
    x: number;
    y: number;
    url: string;
    timeout: number;
    duration: number;
    deviceType: string;
    button: string;
    type: string;
    width: number;
    height: number;
    deviceScaleFactor: number;
    isMobile: boolean;
    hasTouch: boolean;
    isLandscape: boolean;
    download: number;
    upload: number;
    latency: number;
    name: string;
    parameters: string;
    properties: string;
    attributes: {
        name: string;
        value: string;
    }[];
    visible: boolean;
}>;
export interface EditorState {
    type: Models.Schema.StepType;
    target?: string;
    selectors?: string[][];
    frame?: number[];
    x?: number;
    y?: number;
    offsetX?: number;
    offsetY?: number;
    key?: string;
    expression?: string;
    value?: string;
    operator?: string;
    count?: number;
    assertedEvents?: Models.Schema.AssertedEvent[];
    url?: string;
    timeout?: number;
    button?: string;
    duration?: number;
    deviceType?: string;
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
    isLandscape?: boolean;
    download?: number;
    upload?: number;
    latency?: number;
    name?: string;
    parameters?: string;
    visible?: boolean;
    properties?: string;
    attributes?: Array<{
        name: string;
        value: string;
    }>;
}
export declare class EditorState {
    #private;
    static default(type: Models.Schema.StepType): Promise<DeepImmutable<EditorState>>;
    static defaultByAttribute<Attribute extends keyof typeof defaultValuesByAttribute>(state: DeepImmutable<EditorState>, attribute: Attribute): Promise<DeepImmutable<typeof defaultValuesByAttribute[Attribute]>>;
    static fromStep(step: Models.Schema.Step): DeepImmutable<EditorState>;
    static toStep(state: DeepImmutable<EditorState>): Models.Schema.Step;
}
/**
 * @fires RequestSelectorAttributeEvent#requestselectorattribute
 * @fires StepEditedEvent#stepedited
 */
export interface ViewInput {
    state: DeepImmutable<EditorState>;
    disabled: boolean;
    error: string | undefined;
    isTypeEditable: boolean;
    handleInputBlur: <A extends Attribute>(opts: {
        attribute: A;
        from(value: DataType<A>): DeepImmutable<DeepPartial<Assignments<EditorState>>> | undefined;
    }) => (event: Event) => void;
    handleTypeInputBlur: (event: Event) => Promise<void>;
    handleAddRowClickEvent: (event: MouseEvent) => Promise<void>;
    handleDeleteRowClick: (attribute: Attribute) => (event: MouseEvent) => void;
    handleSelectorPicked: (data: Models.Schema.StepWithSelectors & Pick<Models.Schema.ClickAttributes, 'offsetX' | 'offsetY'>) => void;
    handleAttributeRequested: (send: (attribute?: string) => void) => void;
    handleAddOrRemoveClick: (assignments: DeepImmutable<DeepPartial<Assignments<EditorState>>>, query: string) => (event: Event) => void;
    handleKeyDownEvent: (event: Event) => void;
}
type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare class StepEditor extends UI.Widget.Widget {
    #private;
    onStepEdited?: (step: Models.Schema.Step) => void;
    onAttributeRequested?: (send: (attribute?: string) => void) => void;
    constructor(element?: HTMLElement, view?: View);
    set isTypeEditable(value: boolean);
    set disabled(value: boolean);
    set step(step: Models.Schema.Step);
    performUpdate(): void;
}
export {};
