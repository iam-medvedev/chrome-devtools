export declare enum SubscriptionStatus {
    ENABLED = "SUBSCRIPTION_STATE_ENABLED",
    PENDING = "SUBSCRIPTION_STATE_PENDING",
    CANCELED = "SUBSCRIPTION_STATE_CANCELED",
    REFUNDED = "SUBSCRIPTION_STATE_REFUNDED",
    AWAITING_FIX = "SUBSCRIPTION_STATE_AWAITING_FIX",
    ON_HOLD = "SUBSCRIPTION_STATE_ACCOUNT_ON_HOLD"
}
export declare enum SubscriptionTier {
    PREMIUM_ANNUAL = "SUBSCRIPTION_TIER_PREMIUM_ANNUAL",
    PREMIUM_MONTHLY = "SUBSCRIPTION_TIER_PREMIUM_MONTHLY",
    PRO_ANNUAL = "SUBSCRIPTION_TIER_PRO_ANNUAL",
    PRO_MONTHLY = "SUBSCRIPTION_TIER_PRO_MONTHLY"
}
declare enum EligibilityStatus {
    ELIGIBLE = "ELIGIBLE",
    NOT_ELIGIBLE = "NOT_ELIGIBLE"
}
export declare enum EmailPreference {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED"
}
interface CheckElibigilityResponse {
    createProfile: EligibilityStatus;
}
export interface Profile {
    name: string;
    activeSubscription?: {
        subscriptionStatus: SubscriptionStatus;
        subscriptionTier: SubscriptionTier | string;
    };
}
export declare class GdpClient {
    #private;
    private constructor();
    static instance({ forceNew }?: {
        forceNew: boolean;
    }): GdpClient;
    initialize(): Promise<void>;
    getProfile(): Promise<Profile | null>;
    checkEligibility(): Promise<CheckElibigilityResponse | null>;
    isEligibleToCreateProfile(): Promise<boolean>;
    createProfile({ user, emailPreference }: {
        user: string;
        emailPreference: EmailPreference;
    }): Promise<Profile | null>;
}
export {};
