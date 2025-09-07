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
async function makeHttpRequest(request) {
    if (!Root.Runtime.hostConfig.devToolsGdpProfiles?.enabled) {
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
    async isEligibleToCreateProfile() {
        return (await this.checkEligibility())?.createProfile === EligibilityStatus.ELIGIBLE;
    }
    createProfile({ user, emailPreference }) {
        return makeHttpRequest({
            service: SERVICE_NAME,
            path: '/v1beta1/profiles',
            method: 'POST',
            body: JSON.stringify({
                user,
                newsletter_email: emailPreference,
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
// @ts-expect-error
globalThis.setDebugGdpIntegrationEnabled = setDebugGdpIntegrationEnabled;
//# sourceMappingURL=GdpClient.js.map