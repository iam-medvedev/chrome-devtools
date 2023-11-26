export declare const enum Category {
    Animation = "Animation",
    AuctionWorklet = "AuctionWorklet",
    Canvas = "Canvas",
    Clipboard = "Clipboard",
    Control = "Control",
    Device = "Device",
    DomMutation = "DomMutation",
    DragDrop = "DragDrop",
    Geolocation = "Geolocation",
    Keyboard = "Keyboard",
    Load = "Load",
    Media = "Media",
    Mouse = "Mouse",
    Notification = "Notification",
    Parse = "Parse",
    PictureInPicture = "PictureInPicture",
    Pointer = "Pointer",
    Script = "Script",
    SharedStorageWorklet = "SharedStorageWorklet",
    Timer = "Timer",
    Touch = "Touch",
    TrustedTypeViolation = "TrustedTypeViolation",
    WebAudio = "WebAudio",
    Window = "Window",
    Worker = "Worker",
    Xhr = "Xhr"
}
export declare class CategorizedBreakpoint {
    #private;
    /**
     * The name of this breakpoint as passed to 'setInstrumentationBreakpoint',
     * 'setEventListenerBreakpoint' and 'setBreakOnCSPViolation'.
     *
     * Note that the backend adds a 'listener:' and 'instrumentation:' prefix
     * to this name in the 'Debugger.paused' CDP event.
     */
    readonly name: string;
    private enabledInternal;
    constructor(category: Category, name: string);
    category(): Category;
    enabled(): boolean;
    setEnabled(enabled: boolean): void;
}
