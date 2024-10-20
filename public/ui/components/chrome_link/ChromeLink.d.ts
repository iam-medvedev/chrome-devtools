import * as Platform from '../../../core/platform/platform.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-chrome-link': ChromeLink;
    }
}
export declare class ChromeLink extends HTMLElement {
    #private;
    connectedCallback(): void;
    set href(href: Platform.DevToolsPath.UrlString);
}
