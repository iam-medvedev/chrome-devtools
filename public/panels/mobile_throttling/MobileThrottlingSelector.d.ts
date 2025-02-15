import { type Conditions, type ConditionsList, type MobileThrottlingConditionsGroup } from './ThrottlingPresets.js';
export declare class MobileThrottlingSelector {
    private readonly populateCallback;
    private readonly selectCallback;
    private readonly options;
    constructor(populateCallback: (arg0: MobileThrottlingConditionsGroup[]) => ConditionsList, selectCallback: (arg0: number) => void);
    optionSelected(conditions: Conditions): void;
    private populateOptions;
    private conditionsChanged;
}
