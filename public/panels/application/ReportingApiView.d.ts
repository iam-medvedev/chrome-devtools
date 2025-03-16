import type * as Platform from '../../core/platform/platform.js';
import * as UI from '../../ui/legacy/legacy.js';
import type * as ApplicationComponents from './components/components.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export declare class ReportingApiView extends UI.SplitWidget.SplitWidget {
    #private;
    private readonly endpointsGrid;
    private endpoints;
    constructor(endpointsGrid: ApplicationComponents.EndpointsGrid.EndpointsGrid);
    private onEndpointsChangedForOrigin;
}
