import * as ThemeSupport from '../../../ui/legacy/theme_support/theme_support.js';
export var NetworkCategory;
(function (NetworkCategory) {
    NetworkCategory["HTML"] = "HTML";
    NetworkCategory["Script"] = "Script";
    NetworkCategory["Style"] = "Style";
    NetworkCategory["Media"] = "Media";
    NetworkCategory["Other"] = "Other";
})(NetworkCategory || (NetworkCategory = {}));
function syntheticNetworkRequestCategory(request) {
    switch (request.args.data.mimeType) {
        case 'text/html':
            return NetworkCategory.HTML;
        case 'application/javascript':
        case 'application/x-javascript':
        case 'text/javascript':
            return NetworkCategory.Script;
        case 'text/css':
            return NetworkCategory.Style;
        case 'audio/ogg':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg+xml':
        case 'image/webp':
        case 'image/x-icon':
        case 'font/opentype':
        case 'font/woff2':
        case 'font/ttf':
        case 'application/font-woff':
            return NetworkCategory.Media;
        default:
            return NetworkCategory.Other;
    }
}
export function colorForNetworkCategory(category) {
    let cssVarName = '--app-color-system';
    switch (category) {
        case NetworkCategory.HTML:
            cssVarName = '--app-color-loading';
            break;
        case NetworkCategory.Script:
            cssVarName = '--app-color-scripting';
            break;
        case NetworkCategory.Style:
            cssVarName = '--app-color-rendering';
            break;
        case NetworkCategory.Media:
            cssVarName = '--app-color-painting';
            break;
        default:
            cssVarName = '--app-color-system';
            break;
    }
    return ThemeSupport.ThemeSupport.instance().getComputedValue(cssVarName);
}
export function colorForNetworkRequest(request) {
    const category = syntheticNetworkRequestCategory(request);
    return colorForNetworkCategory(category);
}
//# sourceMappingURL=Utils.js.map