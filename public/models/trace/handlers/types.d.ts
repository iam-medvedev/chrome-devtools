import type * as Types from './../types/types.js';
import type * as ModelHandlers from './ModelHandlers.js';
export interface Handler {
    reset(): void;
    initialize?(freshRecording?: boolean): void;
    handleEvent(data: {}): void;
    finalize?(): Promise<void>;
    data(): unknown;
    deps?(): HandlerName[];
    handleUserConfig?(config: Types.Configuration.Configuration): void;
}
export type HandlerName = keyof typeof ModelHandlers;
export type EnabledHandlerDataWithMeta<T extends {
    [key: string]: Handler;
}> = {
    Meta: Readonly<ReturnType<typeof ModelHandlers['Meta']['data']>>;
} & {
    [K in keyof T]: Readonly<ReturnType<T[K]['data']>>;
};
export type HandlersWithMeta<T extends {
    [key: string]: Handler;
}> = {
    Meta: typeof ModelHandlers.Meta;
} & {
    [K in keyof T]: T[K];
};
export type ParsedTrace = Readonly<EnabledHandlerDataWithMeta<typeof ModelHandlers>>;
type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
export type ParsedTraceMutable = DeepWriteable<ParsedTrace>;
export type Handlers = typeof ModelHandlers;
export declare const enum HandlerState {
    UNINITIALIZED = 1,
    INITIALIZED = 2,
    FINALIZED = 3
}
export {};
