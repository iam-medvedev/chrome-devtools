import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as EventListeners from '../event_listeners/event_listeners.js';
export declare class ObjectEventListenersSidebarPane extends EventListeners.EventListenersView.EventListenersView implements UI.Toolbar.ItemsProvider {
    #private;
    protected readonly jslog: string;
    toolbarItems(): Lit.TemplateResult;
    performUpdate(): Promise<void>;
    wasShown(): void;
    willHide(): void;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
export declare const objectGroupName = "object-event-listeners-sidebar-pane";
