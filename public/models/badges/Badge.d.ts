import * as Common from '../../core/common/common.js';
export declare enum BadgeAction {
    GDP_SIGN_UP_COMPLETE = "gdp-sign-up-complete",
    RECEIVE_BADGES_SETTING_ENABLED = "receive-badges-setting-enabled",
    CSS_RULE_MODIFIED = "css-rule-modified",
    DOM_ELEMENT_OR_ATTRIBUTE_EDITED = "dom-element-or-attribute-edited",
    MODERN_DOM_BADGE_CLICKED = "modern-dom-badge-clicked",
    PERFORMANCE_INSIGHT_CLICKED = "performance-insight-clicked"
}
export type BadgeActionEvents = Record<BadgeAction, void>;
export interface BadgeContext {
    onTriggerBadge: (badge: Badge) => void;
    badgeActionEventTarget: Common.ObjectWrapper.ObjectWrapper<BadgeActionEvents>;
}
export declare abstract class Badge {
    #private;
    abstract readonly name: string;
    abstract readonly title: string;
    abstract readonly imageUri: string;
    abstract readonly interestedActions: readonly BadgeAction[];
    readonly isStarterBadge: boolean;
    constructor(context: BadgeContext);
    abstract handleAction(action: BadgeAction): void;
    protected trigger(): void;
    activate(): void;
    deactivate(): void;
}
