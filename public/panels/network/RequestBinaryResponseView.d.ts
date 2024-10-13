import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as LinearMemoryInspector from '../linear_memory_inspector/linear_memory_inspector.js';
/**
 * Adapter for the linear memory inspector that can show a {@link StreamingContentData}.
 */
export declare class RequestBinaryResponseView extends LinearMemoryInspector.LinearMemoryInspectorPane.LinearMemoryInspectorView {
    #private;
    constructor(streamingContentData: TextUtils.StreamingContentData.StreamingContentData);
    wasShown(): void;
    willHide(): void;
    refreshData(): void;
}
