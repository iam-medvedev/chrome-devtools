/// <reference types="sinon" />
export declare function expectCall<TArgs extends any[] = any[], TReturnValue = any>(stub: sinon.SinonStub<TArgs, TReturnValue>, fakeFn?: (...args: TArgs) => TReturnValue): Promise<TArgs>;
export declare function expectCalled<TArgs extends any[] = any[], TReturnValue = any>(stub: sinon.SinonStub<TArgs, TReturnValue>, fakeFn?: (...args: TArgs) => TReturnValue): Promise<TArgs>;
