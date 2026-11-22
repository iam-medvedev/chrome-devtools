import type * as Platform from '../../core/platform/platform.js';
import { AffectedElementsView } from './AffectedElementsView.js';
export declare class AffectedPermissionElementsView extends AffectedElementsView {
    update(): void;
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
}
