import { Badge, BadgeAction } from './Badge.js';
export declare class StarterBadge extends Badge {
    readonly isStarterBadge = true;
    readonly name = "awards/chrome-devtools-user";
    readonly title = "Chrome DevTools User";
    readonly interestedActions: readonly [BadgeAction.CSS_RULE_MODIFIED];
    handleAction(_action: BadgeAction): void;
}
