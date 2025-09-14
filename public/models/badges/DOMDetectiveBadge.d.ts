import { Badge, BadgeAction } from './Badge.js';
export declare class DOMDetectiveBadge extends Badge {
    readonly name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fdom-detective";
    readonly title = "DOM Detective";
    readonly imageUri: string;
    readonly interestedActions: readonly [BadgeAction.MODERN_DOM_BADGE_CLICKED];
    handleAction(_action: BadgeAction): void;
}
