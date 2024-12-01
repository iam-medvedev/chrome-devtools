import * as Types from '../types/types.js';
export declare function reset(): void;
export declare function handleEvent(_: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export declare function data(): {
    schedulerToRunEntryPoints: Map<Types.Events.SyntheticProfileCall, Types.Events.Event[]>;
};
export declare function deps(): ['Renderer', 'Flows'];
