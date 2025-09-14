import { Badge, BadgeAction } from './Badge.js';
export declare class StarterBadge extends Badge {
    readonly isStarterBadge = true;
    readonly name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fchrome-devtools-user";
    readonly title = "Chrome DevTools User";
    readonly imageUri: string;
    readonly interestedActions: readonly [BadgeAction.GDP_SIGN_UP_COMPLETE, BadgeAction.RECEIVE_BADGES_SETTING_ENABLED, BadgeAction.CSS_RULE_MODIFIED, BadgeAction.DOM_ELEMENT_OR_ATTRIBUTE_EDITED];
    handleAction(_action: BadgeAction): void;
}
