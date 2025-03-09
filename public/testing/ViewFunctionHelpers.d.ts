import type * as UI from '../ui/legacy/legacy.js';
type WidgetConstructor = abstract new (...args: any[]) => UI.Widget.Widget | HTMLElement;
type ViewFunctionLike = ((input: any, output: any, target: HTMLElement) => void);
type FindViewFunction<ParametersT extends readonly unknown[]> = ParametersT extends [infer Head, ...infer Tail] ? Head extends ViewFunctionLike ? Head : FindViewFunction<Tail> : never;
type ViewFunction<WidgetConstructorT extends WidgetConstructor> = FindViewFunction<Required<ConstructorParameters<WidgetConstructorT>>>;
type ViewFunctionParameters<WidgetConstructorT extends WidgetConstructor> = Parameters<ViewFunction<WidgetConstructorT>>;
export type ViewInput<WidgetConstructorT extends WidgetConstructor> = ViewFunctionParameters<WidgetConstructorT>[0];
export type ViewOutput<WidgetConstructorT extends WidgetConstructor> = {} extends ViewFunctionParameters<WidgetConstructorT>[1] ? never : ViewFunctionParameters<WidgetConstructorT>[1];
interface ViewStubExtensions<WidgetConstructorT extends WidgetConstructor> {
    input: ViewInput<WidgetConstructorT>;
    nextInput: Promise<ViewInput<WidgetConstructorT>>;
    callCount: number;
}
export type ViewFunctionStub<WidgetConstructorT extends WidgetConstructor> = ViewFunction<WidgetConstructorT> & ViewStubExtensions<WidgetConstructorT>;
export declare function createViewFunctionStub<WidgetConstructorT extends WidgetConstructor>(constructor: WidgetConstructorT, outputValues?: ViewOutput<WidgetConstructorT>): ViewFunctionStub<WidgetConstructorT>;
export {};
