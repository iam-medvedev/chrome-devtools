import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import type * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as Bindings from '../../models/bindings/bindings.js';
import { ProfileHeader, type ProfileType } from './ProfileHeader.js';
export declare class WritableProfileHeader extends ProfileHeader implements Common.StringOutputStream.OutputStream {
    #private;
    readonly debuggerModel: SDK.DebuggerModel.DebuggerModel | null;
    fileName?: Platform.DevToolsPath.RawPathString;
    jsonifiedProfile?: string | null;
    profile?: Protocol.Profiler.Profile;
    protocolProfileInternal?: Protocol.Profiler.Profile;
    constructor(debuggerModel: SDK.DebuggerModel.DebuggerModel | null, type: ProfileType, title?: string);
    onChunkTransferred(_reader: Bindings.FileUtils.ChunkedReader): void;
    onError(reader: Bindings.FileUtils.ChunkedReader): void;
    write(text: string): Promise<void>;
    close(): Promise<void>;
    dispose(): void;
    canSaveToFile(): boolean;
    saveToFile(): Promise<void>;
    loadFromFile(file: File): Promise<Error | null>;
    setProtocolProfile(profile: Protocol.Profiler.Profile): void;
}
