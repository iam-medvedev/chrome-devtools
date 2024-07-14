// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
// This key is expected to be visible in the frontend.
// b/349721878
const CRUX_API_KEY = 'AIzaSyCCSOx25vrb5z0tbedCB3_JRzzbVW6Uwgw';
const DEFAULT_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${CRUX_API_KEY}`;
let cruxManagerInstance;
// TODO: Potentially support `TABLET`. Tablet field data will always be `null` until then.
export const DEVICE_SCOPE_LIST = ['ALL', 'DESKTOP', 'PHONE'];
const pageScopeList = ['origin', 'url'];
const metrics = ['largest_contentful_paint', 'cumulative_layout_shift', 'interaction_to_next_paint'];
export class CrUXManager extends Common.ObjectWrapper.ObjectWrapper {
    #originCache = new Map();
    #urlCache = new Map();
    #mainDocumentUrl;
    #configSetting = Common.Settings.Settings.instance().createSetting('field-data', { enabled: false, override: '' });
    #endpoint = DEFAULT_ENDPOINT;
    constructor() {
        super();
        this.#configSetting.addChangeListener(() => {
            void this.#automaticRefresh();
        });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.FrameNavigated, this.#onFrameNavigated, this);
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!cruxManagerInstance || forceNew) {
            cruxManagerInstance = new CrUXManager();
        }
        return cruxManagerInstance;
    }
    getConfigSetting() {
        return this.#configSetting;
    }
    async getFieldDataForPage(pageUrl) {
        const pageResult = {
            'origin-ALL': null,
            'origin-DESKTOP': null,
            'origin-PHONE': null,
            'origin-TABLET': null,
            'url-ALL': null,
            'url-DESKTOP': null,
            'url-PHONE': null,
            'url-TABLET': null,
        };
        try {
            const normalizedUrl = this.#normalizeUrl(pageUrl);
            const promises = [];
            for (const pageScope of pageScopeList) {
                for (const deviceScope of DEVICE_SCOPE_LIST) {
                    const promise = this.#getScopedData(normalizedUrl, pageScope, deviceScope).then(response => {
                        pageResult[`${pageScope}-${deviceScope}`] = response;
                    });
                    promises.push(promise);
                }
            }
            await Promise.all(promises);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            return pageResult;
        }
    }
    /**
     * In general, this function should use the main document URL
     * (i.e. the URL after all redirects but before SPA navigations)
     *
     * However, we can't detect the main document URL of the current page if it's
     * navigation occurred before DevTools was first opened. This function will fall
     * back to the currently inspected URL (i.e. what is displayed in the omnibox) if
     * the main document URL cannot be found.
     */
    async getFieldDataForCurrentPage() {
        const pageUrl = this.#configSetting.get().override || this.#mainDocumentUrl || await this.#getInspectedURL();
        return this.getFieldDataForPage(pageUrl);
    }
    async #getInspectedURL() {
        const targetManager = SDK.TargetManager.TargetManager.instance();
        let inspectedURL = targetManager.inspectedURL();
        if (!inspectedURL) {
            inspectedURL = await new Promise(resolve => {
                function handler(event) {
                    const newInspectedURL = event.data.inspectedURL();
                    if (newInspectedURL) {
                        resolve(newInspectedURL);
                        targetManager.removeEventListener("InspectedURLChanged" /* SDK.TargetManager.Events.InspectedURLChanged */, handler);
                    }
                }
                targetManager.addEventListener("InspectedURLChanged" /* SDK.TargetManager.Events.InspectedURLChanged */, handler);
            });
        }
        return inspectedURL;
    }
    async #onFrameNavigated(event) {
        if (!event.data.isPrimaryFrame()) {
            return;
        }
        this.#mainDocumentUrl = event.data.url;
        await this.#automaticRefresh();
    }
    async #automaticRefresh() {
        // This does 2 things:
        // - Tells listeners to clear old data so it isn't shown during a URL transition
        // - Tells listeners to clear old data when field data is disabled.
        this.dispatchEventToListeners("field-data-changed" /* Events.FieldDataChanged */, undefined);
        if (!this.#configSetting.get().enabled) {
            return;
        }
        const pageResult = await this.getFieldDataForCurrentPage();
        this.dispatchEventToListeners("field-data-changed" /* Events.FieldDataChanged */, pageResult);
    }
    #normalizeUrl(inputUrl) {
        const normalizedUrl = new URL(inputUrl);
        normalizedUrl.hash = '';
        normalizedUrl.search = '';
        return normalizedUrl;
    }
    async #getScopedData(normalizedUrl, pageScope, deviceScope) {
        const { origin, href: url } = normalizedUrl;
        const cache = pageScope === 'origin' ? this.#originCache : this.#urlCache;
        const cacheKey = pageScope === 'origin' ? `${origin}-${deviceScope}` : `${url}-${deviceScope}`;
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse !== undefined) {
            return cachedResponse;
        }
        // We shouldn't cache the result in the case of an error
        // The error could be a transient issue with the network/CrUX server/etc.
        try {
            const formFactor = deviceScope === 'ALL' ? undefined : deviceScope;
            const result = pageScope === 'origin' ? await this.#makeRequest({ origin, metrics, formFactor }) :
                await this.#makeRequest({ url, metrics, formFactor });
            cache.set(cacheKey, result);
            return result;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async #makeRequest(request) {
        const body = JSON.stringify(request);
        const response = await fetch(this.#endpoint, {
            method: 'POST',
            body,
        });
        if (!response.ok && response.status !== 404) {
            throw new Error(`Failed to fetch data from CrUX server (Status code: ${response.status})`);
        }
        const responseData = await response.json();
        if (response.status === 404) {
            // This is how CrUX tells us that there is not data available for the provided url/origin
            // Since it's a valid response, just return null instead of throwing an error.
            if (responseData?.error?.status === 'NOT_FOUND') {
                return null;
            }
            throw new Error(`Failed to fetch data from CrUX server (Status code: ${response.status})`);
        }
        if (!('record' in responseData)) {
            throw new Error(`Failed to find data in CrUX response: ${JSON.stringify(responseData)}`);
        }
        return responseData;
    }
    setEndpointForTesting(endpoint) {
        this.#endpoint = endpoint;
    }
}
//# sourceMappingURL=CrUXManager.js.map