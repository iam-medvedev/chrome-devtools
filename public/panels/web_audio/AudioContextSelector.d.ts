import * as Common from '../../core/common/common.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class AudioContextSelector extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    private readonly placeholderText;
    private readonly selectElement;
    private readonly items;
    private readonly toolbarItemInternal;
    constructor();
    private addPlaceholderOption;
    private onListItemReplaced;
    contextCreated({ data: context }: Common.EventTarget.EventTargetEvent<Protocol.WebAudio.BaseAudioContext>): void;
    contextDestroyed({ data: contextId }: Common.EventTarget.EventTargetEvent<string>): void;
    contextChanged({ data: changedContext }: Common.EventTarget.EventTargetEvent<Protocol.WebAudio.BaseAudioContext>): void;
    selectedContext(): Protocol.WebAudio.BaseAudioContext | null;
    onSelectionChanged(): void;
    itemSelected(item: Protocol.WebAudio.BaseAudioContext | null): void;
    reset(): void;
    titleFor(context: Protocol.WebAudio.BaseAudioContext): string;
    toolbarItem(): UI.Toolbar.ToolbarItem;
}
export declare const enum Events {
    CONTEXT_SELECTED = "ContextSelected"
}
export interface EventTypes {
    [Events.CONTEXT_SELECTED]: Protocol.WebAudio.BaseAudioContext | null;
}
