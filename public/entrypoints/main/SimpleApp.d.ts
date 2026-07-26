import type * as Foundation from '../../foundation/foundation.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class SimpleApp implements UI.App.App {
    #private;
    constructor(universe: Foundation.Universe.Universe);
    presentUI(document: Document): void;
}
export declare class SimpleAppProvider implements UI.AppProvider.AppProvider {
    createApp(universe: Foundation.Universe.Universe): UI.App.App;
}
