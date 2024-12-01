import type * as CrUXManager from '../../crux-manager/crux-manager.js';
import * as Types from '../types/types.js';
export declare function forNewRecording(isCpuProfile: boolean, recordStartTime?: number, emulatedDeviceTitle?: string, cruxFieldData?: CrUXManager.PageResult[]): Promise<Types.File.MetaData>;
