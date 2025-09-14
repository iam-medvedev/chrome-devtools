import { Badge, type BadgeAction } from './Badge.js';
export declare class AiExplorerBadge extends Badge {
    readonly name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fai-explorer";
    readonly title = "AI Explorer";
    readonly imageUri: string;
    readonly interestedActions: readonly [];
    handleAction(_action: BadgeAction): void;
}
