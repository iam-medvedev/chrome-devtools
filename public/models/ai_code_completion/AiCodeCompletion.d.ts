import type * as Common from '../../core/common/common.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
import type { AgentOptions } from '../ai_assistance/ai_assistance.js';
export declare class AiCodeCompletion {
    #private;
    constructor(opts: AgentOptions, editor: TextEditor.TextEditor.TextEditor, throttler: Common.Throttler.Throttler);
    onTextChanged(prefix: string, suffix: string): void;
}
