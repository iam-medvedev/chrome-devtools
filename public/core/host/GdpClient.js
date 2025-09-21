// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../root/root.js';
import { InspectorFrontendHostInstance } from './InspectorFrontendHost.js';
export var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ENABLED"] = "SUBSCRIPTION_STATE_ENABLED";
    SubscriptionStatus["PENDING"] = "SUBSCRIPTION_STATE_PENDING";
    SubscriptionStatus["CANCELED"] = "SUBSCRIPTION_STATE_CANCELED";
    SubscriptionStatus["REFUNDED"] = "SUBSCRIPTION_STATE_REFUNDED";
    SubscriptionStatus["AWAITING_FIX"] = "SUBSCRIPTION_STATE_AWAITING_FIX";
    SubscriptionStatus["ON_HOLD"] = "SUBSCRIPTION_STATE_ACCOUNT_ON_HOLD";
})(SubscriptionStatus || (SubscriptionStatus = {}));
export var SubscriptionTier;
(function (SubscriptionTier) {
    SubscriptionTier["PREMIUM_ANNUAL"] = "SUBSCRIPTION_TIER_PREMIUM_ANNUAL";
    SubscriptionTier["PREMIUM_MONTHLY"] = "SUBSCRIPTION_TIER_PREMIUM_MONTHLY";
    SubscriptionTier["PRO_ANNUAL"] = "SUBSCRIPTION_TIER_PRO_ANNUAL";
    SubscriptionTier["PRO_MONTHLY"] = "SUBSCRIPTION_TIER_PRO_MONTHLY";
})(SubscriptionTier || (SubscriptionTier = {}));
var EligibilityStatus;
(function (EligibilityStatus) {
    EligibilityStatus["ELIGIBLE"] = "ELIGIBLE";
    EligibilityStatus["NOT_ELIGIBLE"] = "NOT_ELIGIBLE";
})(EligibilityStatus || (EligibilityStatus = {}));
export var EmailPreference;
(function (EmailPreference) {
    EmailPreference["ENABLED"] = "ENABLED";
    EmailPreference["DISABLED"] = "DISABLED";
})(EmailPreference || (EmailPreference = {}));
// The `batchGet` awards endpoint returns badge names with an
// obfuscated user ID (e.g., `profiles/12345/awards/badge-name`).
// This function normalizes them to use `me` instead of the ID
// (e.g., `profiles/me/awards/badge-path`) to match the format
// used for client-side requests.
function normalizeBadgeName(name) {
    return name.replace(/profiles\/[^/]+\/awards\//, 'profiles/me/awards/');
}
export const GOOGLE_DEVELOPER_PROGRAM_PROFILE_LINK = 'https://developers.google.com/profile/u/me';
async function makeHttpRequest(request) {
    if (!isGdpProfilesAvailable()) {
        return null;
    }
    const response = await new Promise(resolve => {
        InspectorFrontendHostInstance.dispatchHttpRequest(request, resolve);
    });
    debugLog({ request, response });
    if ('response' in response && response.statusCode === 200) {
        return JSON.parse(response.response);
    }
    return null;
}
const SERVICE_NAME = 'gdpService';
let gdpClientInstance = null;
export class GdpClient {
    #cachedProfilePromise;
    #cachedEligibilityPromise;
    constructor() {
    }
    static instance({ forceNew } = { forceNew: false }) {
        if (!gdpClientInstance || forceNew) {
            gdpClientInstance = new GdpClient();
        }
        return gdpClientInstance;
    }
    async initialize() {
        void this.getProfile();
        void this.checkEligibility();
    }
    async getProfile() {
        if (this.#cachedProfilePromise) {
            return await this.#cachedProfilePromise;
        }
        this.#cachedProfilePromise = makeHttpRequest({
            service: SERVICE_NAME,
            path: '/v1beta1/profile:get',
            method: 'GET',
        });
        return await this.#cachedProfilePromise;
    }
    async checkEligibility() {
        if (this.#cachedEligibilityPromise) {
            return await this.#cachedEligibilityPromise;
        }
        this.#cachedEligibilityPromise =
            makeHttpRequest({ service: SERVICE_NAME, path: '/v1beta1/eligibility:check', method: 'GET' });
        return await this.#cachedEligibilityPromise;
    }
    /**
     * @returns null if the request fails, the awarded badge names otherwise.
     */
    async getAwardedBadgeNames({ names }) {
        const result = await makeHttpRequest({
            service: SERVICE_NAME,
            path: '/v1beta1/profiles/me/awards:batchGet',
            method: 'GET',
            queryParams: {
                allowMissing: 'true',
                names,
            }
        });
        if (!result) {
            return null;
        }
        return new Set(result.awards?.map(award => normalizeBadgeName(award.name)) ?? []);
    }
    async isEligibleToCreateProfile() {
        return (await this.checkEligibility())?.createProfile === EligibilityStatus.ELIGIBLE;
    }
    async createProfile({ user, emailPreference }) {
        const result = await makeHttpRequest({
            service: SERVICE_NAME,
            path: '/v1beta1/profiles',
            method: 'POST',
            body: JSON.stringify({
                user,
                newsletter_email: emailPreference,
            }),
        });
        if (result) {
            this.#clearCache();
        }
        return result;
    }
    #clearCache() {
        this.#cachedProfilePromise = undefined;
        this.#cachedEligibilityPromise = undefined;
    }
    createAward({ name }) {
        return makeHttpRequest({
            service: SERVICE_NAME,
            path: '/v1beta1/profiles/me/awards',
            method: 'POST',
            body: JSON.stringify({
                awardingUri: 'devtools://devtools',
                name,
            })
        });
    }
}
function isDebugMode() {
    return Boolean(localStorage.getItem('debugGdpIntegrationEnabled'));
}
function debugLog(...log) {
    if (!isDebugMode()) {
        return;
    }
    // eslint-disable-next-line no-console
    console.log('debugLog', ...log);
}
function setDebugGdpIntegrationEnabled(enabled) {
    if (enabled) {
        localStorage.setItem('debugGdpIntegrationEnabled', 'true');
    }
    else {
        localStorage.removeItem('debugGdpIntegrationEnabled');
    }
}
export function isGdpProfilesAvailable() {
    const isBaseFeatureEnabled = Boolean(Root.Runtime.hostConfig.devToolsGdpProfiles?.enabled);
    const isBrandedBuild = Boolean(Root.Runtime.hostConfig.devToolsGdpProfilesAvailability?.enabled);
    const isOffTheRecordProfile = Root.Runtime.hostConfig.isOffTheRecord;
    const isDisabledByEnterprisePolicy = getGdpProfilesEnterprisePolicy() === Root.Runtime.GdpProfilesEnterprisePolicyValue.DISABLED;
    return isBaseFeatureEnabled && isBrandedBuild && !isOffTheRecordProfile && !isDisabledByEnterprisePolicy;
}
export function getGdpProfilesEnterprisePolicy() {
    return (Root.Runtime.hostConfig.devToolsGdpProfilesAvailability?.enterprisePolicyValue ??
        Root.Runtime.GdpProfilesEnterprisePolicyValue.DISABLED);
}
// @ts-expect-error
globalThis.setDebugGdpIntegrationEnabled = setDebugGdpIntegrationEnabled;
//# sourceMappingURL=GdpClient.js.map