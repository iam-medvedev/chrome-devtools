import * as UI from '../../ui/legacy/legacy.js';
interface Options {
    isNode?: boolean;
}
export declare class TimelineLandingPage extends UI.Widget.VBox {
    private readonly toggleRecordAction;
    constructor(toggleRecordAction: UI.ActionRegistration.Action, options?: Options);
}
export {};
