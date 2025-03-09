import '../data_grid/data_grid.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as IconButton from '../../../components/icon_button/icon_button.js';
import * as UI from '../../legacy.js';
interface ViewInput {
    data: CookieData[];
    selectedKey?: string;
    editable?: boolean;
    renderInline?: boolean;
    portBindingEnabled?: boolean;
    schemeBindingEnabled?: boolean;
    onEdit: (event: CustomEvent<{
        node: HTMLElement;
        columnId: string;
        valueBeforeEditing: string;
        newText: string;
    }>) => void;
    onCreate: (event: CustomEvent<CookieData>) => void;
    onRefresh: () => void;
    onDelete: (event: CustomEvent<HTMLElement>) => void;
    onContextMenu: (event: CustomEvent<{
        menu: UI.ContextMenu.ContextMenu;
        element: HTMLElement;
    }>) => void;
    onSelect: (event: CustomEvent<HTMLElement | null>) => void;
}
type ViewFunction = (input: ViewInput, output: object, target: HTMLElement) => void;
type AttributeWithIcon = SDK.Cookie.Attribute.NAME | SDK.Cookie.Attribute.VALUE | SDK.Cookie.Attribute.DOMAIN | SDK.Cookie.Attribute.PATH | SDK.Cookie.Attribute.SECURE | SDK.Cookie.Attribute.SAME_SITE;
type CookieData = {
    [key in SDK.Cookie.Attribute]?: string;
} & {
    name: string;
    value: string;
} & {
    key?: string;
    flagged?: boolean;
    icons?: {
        [key in AttributeWithIcon]?: IconButton.Icon.Icon;
    };
    priorityValue?: number;
    expiresTooltip?: string;
    dirty?: boolean;
    inactive?: boolean;
};
export declare class CookiesTable extends UI.Widget.VBox {
    private saveCallback?;
    private readonly refreshCallback?;
    private readonly selectedCallback?;
    private readonly deleteCallback?;
    private lastEditedColumnId;
    private data;
    private cookies;
    private cookieDomain;
    private cookieToBlockedReasons;
    private cookieToExemptionReason;
    private readonly view;
    private selectedKey?;
    private readonly editable;
    private readonly renderInline;
    private readonly schemeBindingEnabled;
    private readonly portBindingEnabled;
    constructor(renderInline?: boolean, saveCallback?: ((arg0: SDK.Cookie.Cookie, arg1: SDK.Cookie.Cookie | null) => Promise<boolean>), refreshCallback?: (() => void), selectedCallback?: (() => void), deleteCallback?: ((arg0: SDK.Cookie.Cookie, arg1: () => void) => void), view?: ViewFunction);
    setCookies(cookies: SDK.Cookie.Cookie[], cookieToBlockedReasons?: ReadonlyMap<SDK.Cookie.Cookie, SDK.CookieModel.BlockedReason[]>, cookieToExemptionReason?: ReadonlyMap<SDK.Cookie.Cookie, SDK.CookieModel.ExemptionReason>): void;
    setCookieDomain(cookieDomain: string): void;
    selectedCookie(): SDK.Cookie.Cookie | null;
    willHide(): void;
    performUpdate(): void;
    private onSelect;
    private onDeleteCookie;
    private onUpdateCookie;
    private onCreateCookie;
    private setDefaults;
    private saveCookie;
    private createCookieFromData;
    private createCookieData;
    private isValidCookieData;
    private isValidDomain;
    private isValidPath;
    private isValidDate;
    private isValidPartitionKey;
    private refresh;
    private populateContextMenu;
}
export {};
