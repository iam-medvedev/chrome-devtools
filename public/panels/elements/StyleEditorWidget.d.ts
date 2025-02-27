import * as UI from '../../ui/legacy/legacy.js';
import type * as ElementsComponents from './components/components.js';
import type { StylePropertiesSection } from './StylePropertiesSection.js';
import type { StylesSidebarPane } from './StylesSidebarPane.js';
type PropertySelectedEvent = ElementsComponents.StylePropertyEditor.PropertySelectedEvent;
type PropertyDeselectedEvent = ElementsComponents.StylePropertyEditor.PropertyDeselectedEvent;
interface Editor extends HTMLElement {
    data: {
        authoredProperties: Map<String, String>;
        computedProperties: Map<String, String>;
    };
    getEditableProperties(): Array<{
        propertyName: string;
    }>;
    jslogContext: string;
}
/**
 * Thin UI.Widget wrapper around style editors to allow using it as a popover.
 */
export declare class StyleEditorWidget extends UI.Widget.VBox {
    #private;
    private editor?;
    private pane?;
    private section?;
    private editorContainer;
    constructor();
    getSection(): StylePropertiesSection | undefined;
    onPropertySelected(event: PropertySelectedEvent): Promise<void>;
    onPropertyDeselected(event: PropertyDeselectedEvent): Promise<void>;
    bindContext(pane: StylesSidebarPane, section: StylePropertiesSection): void;
    setTriggerKey(value: string): void;
    getTriggerKey(): string | undefined;
    unbindContext(): void;
    render(): Promise<void>;
    static instance(): StyleEditorWidget;
    setEditor(editorClass: {
        new (): Editor;
    }): void;
    static createTriggerButton(pane: StylesSidebarPane, section: StylePropertiesSection, editorClass: {
        new (): Editor;
    }, buttonTitle: string, triggerKey: string): HTMLElement;
}
export {};
