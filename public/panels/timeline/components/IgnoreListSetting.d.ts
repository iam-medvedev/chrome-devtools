import '../../../ui/components/menus/menus.js';
import * as Common from '../../../core/common/common.js';
export declare class IgnoreListSetting extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-perf-ignore-list-setting': IgnoreListSetting;
    }
}
/**
 * Returns if a new regex string is valid for the given regex setting array.
 *
 * Export for test reason
 * @param existingRegexes an array of objects, each representing a regex pattern and its state.
 * @param inputValue new regex in string format
 * @returns if the regex is valid and if not, why it is invalid
 */
export declare function patternValidator(existingRegexes: Common.Settings.RegExpSettingItem[], inputValue: string): ({
    valid: true;
} | {
    valid: false;
    errorMessage: string;
});
