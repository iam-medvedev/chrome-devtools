import * as Common from '../../core/common/common.js';
export declare enum BadgeAction {
    CSS_RULE_MODIFIED = "css-rule-modified",
    PERFORMANCE_INSIGHT_CLICKED = "performance-insight-clicked"
}
export type BadgeActionEvents = Record<BadgeAction, void>;
export interface BadgeContext {
    dispatchBadgeTriggeredEvent: (badge: Badge) => void;
    badgeActionEventTarget: Common.ObjectWrapper.ObjectWrapper<BadgeActionEvents>;
}
export declare abstract class Badge {
    #private;
    abstract readonly name: string;
    abstract readonly title: string;
    abstract readonly interestedActions: readonly BadgeAction[];
    readonly isStarterBadge: boolean;
    constructor(context: BadgeContext);
    abstract handleAction(action: BadgeAction): void;
    protected trigger(): void;
    activate(): void;
    deactivate(): void;
}
