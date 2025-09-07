import { Badge, BadgeAction } from './Badge.js';
export declare class SpeedsterBadge extends Badge {
    readonly name = "awards/speedster";
    readonly title = "Speedster";
    readonly interestedActions: readonly [BadgeAction.PERFORMANCE_INSIGHT_CLICKED];
    handleAction(_action: BadgeAction): void;
}
