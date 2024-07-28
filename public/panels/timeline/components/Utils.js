import * as ThemeSupport from '../../../ui/legacy/theme_support/theme_support.js';
export var NetworkCategory;
(function (NetworkCategory) {
    NetworkCategory["Doc"] = "Doc";
    NetworkCategory["CSS"] = "CSS";
    NetworkCategory["JS"] = "JS";
    NetworkCategory["Font"] = "Font";
    NetworkCategory["Img"] = "Img";
    NetworkCategory["Media"] = "Media";
    NetworkCategory["Wasm"] = "Wasm";
    NetworkCategory["Other"] = "Other";
})(NetworkCategory || (NetworkCategory = {}));
function syntheticNetworkRequestCategory(request) {
    switch (request.args.data.mimeType) {
        case 'text/html':
            return NetworkCategory.Doc;
        case 'application/javascript':
        case 'application/x-javascript':
        case 'text/javascript':
            return NetworkCategory.JS;
        case 'text/css':
            return NetworkCategory.CSS;
        case 'image/gif':
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg+xml':
        case 'image/webp':
        case 'image/x-icon':
            return NetworkCategory.Img;
        case 'audio/aac':
        case 'audio/midi':
        case 'audio/x-midi':
        case 'audio/mpeg':
        case 'audio/ogg':
        case 'audio/wav':
        case 'audio/webm':
            return NetworkCategory.Media;
        case 'font/opentype':
        case 'font/woff2':
        case 'font/ttf':
        case 'application/font-woff':
            return NetworkCategory.Font;
        case 'application/wasm':
            return NetworkCategory.Wasm;
        default:
            return NetworkCategory.Other;
    }
}
export function colorForNetworkCategory(category) {
    let cssVarName = '--app-color-system';
    switch (category) {
        case NetworkCategory.Doc:
            cssVarName = '--app-color-doc';
            break;
        case NetworkCategory.JS:
            cssVarName = '--app-color-scripting';
            break;
        case NetworkCategory.CSS:
            cssVarName = '--app-color-css';
            break;
        case NetworkCategory.Img:
            cssVarName = '--app-color-image';
            break;
        case NetworkCategory.Media:
            cssVarName = '--app-color-media';
            break;
        case NetworkCategory.Font:
            cssVarName = '--app-color-font';
            break;
        case NetworkCategory.Wasm:
            cssVarName = '--app-color-wasm';
            break;
        case NetworkCategory.Other:
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