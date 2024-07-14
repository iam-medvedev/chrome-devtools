import type * as Types from './../types/types.js';
import type * as ModelHandlers from './ModelHandlers.js';
export interface TraceEventHandler {
    reset(): void;
    initialize?(freshRecording?: boolean): void;
    handleEvent(data: {}): void;
    finalize?(): Promise<void>;
    data(): unknown;
    deps?(): TraceEventHandlerName[];
    handleUserConfig?(config: Types.Configuration.Configuration): void;
}
export type TraceEventHandlerName = keyof typeof ModelHandlers;
export type EnabledHandlerDataWithMeta<T extends {
    [key: string]: TraceEventHandler;
}> = {
    Meta: Readonly<ReturnType<typeof ModelHandlers['Meta']['data']>>;
} & {
    [K in keyof T]: Readonly<ReturnType<T[K]['data']>>;
};
export type HandlersWithMeta<T extends {
    [key: string]: TraceEventHandler;
}> = {
    Meta: typeof ModelHandlers.Meta;
} & {
    [K in keyof T]: T[K];
};
export type TraceParseData = Readonly<EnabledHandlerDataWithMeta<typeof ModelHandlers>>;
type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
export type TraceParseDataMutable = DeepWriteable<TraceParseData>;
export type Handlers = typeof ModelHandlers;
export declare const enum HandlerState {
    UNINITIALIZED = 1,
    INITIALIZED = 2,
    FINALIZED = 3
}
export {};
