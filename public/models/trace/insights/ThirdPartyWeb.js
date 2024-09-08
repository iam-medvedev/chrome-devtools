// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Extras from '../extras/extras.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
export function deps() {
    return ['Meta', 'NetworkRequests', 'Renderer', 'ImagePainting'];
}
/**
 * Returns the origin portion of a Chrome extension URL.
 */
function getChromeExtensionOrigin(url) {
    return url.protocol + '//' + url.host;
}
function makeUpChromeExtensionEntity(entityCache, url, extensionName) {
    const parsedUrl = new URL(url);
    const origin = getChromeExtensionOrigin(parsedUrl);
    const host = new URL(origin).host;
    const name = extensionName || host;
    const cachedEntity = entityCache.get(origin);
    if (cachedEntity) {
        return cachedEntity;
    }
    const chromeExtensionEntity = {
        name,
        company: name,
        category: 'Chrome Extension',
        homepage: 'https://chromewebstore.google.com/detail/' + host,
        categories: [],
        domains: [],
        averageExecutionTime: 0,
        totalExecutionTime: 0,
        totalOccurrences: 0,
    };
    entityCache.set(origin, chromeExtensionEntity);
    return chromeExtensionEntity;
}
function makeUpEntity(entityCache, url) {
    if (url.startsWith('chrome-extension:')) {
        return makeUpChromeExtensionEntity(entityCache, url);
    }
    // Make up an entity only for valid http/https URLs.
    if (!url.startsWith('http')) {
        return;
    }
    // NOTE: Lighthouse uses a tld database to determine the root domain, but here
    // we are using third party web's database. Doesn't really work for the case of classifying
    // domains 3pweb doesn't know about, so it will just give us a guess.
    const rootDomain = ThirdPartyWeb.ThirdPartyWeb.getRootDomain(url);
    if (!rootDomain) {
        return;
    }
    if (entityCache.has(rootDomain)) {
        return entityCache.get(rootDomain);
    }
    const unrecognizedEntity = {
        name: rootDomain,
        company: rootDomain,
        category: '',
        categories: [],
        domains: [rootDomain],
        averageExecutionTime: 0,
        totalExecutionTime: 0,
        totalOccurrences: 0,
        isUnrecognized: true,
    };
    entityCache.set(rootDomain, unrecognizedEntity);
    return unrecognizedEntity;
}
function getSelfTimeByUrl(traceData, context) {
    const startTime = Types.Timing.MicroSeconds(context.navigation.ts);
    // TODO: we should also pass a time window for this navigation to each insight. Use infinity for now.
    const endTime = Types.Timing.MicroSeconds(Number.POSITIVE_INFINITY);
    const bounds = Helpers.Timing.traceWindowFromMicroSeconds(startTime, endTime);
    const selfTimeByUrl = new Map();
    for (const process of traceData.Renderer.processes.values()) {
        if (!process.isOnMainFrame) {
            continue;
        }
        for (const thread of process.threads.values()) {
            if (thread.name === 'CrRendererMain') {
                if (!thread.tree) {
                    break;
                }
                for (const event of thread.entries) {
                    if (!Helpers.Timing.eventIsInBounds(event, bounds)) {
                        continue;
                    }
                    const node = traceData.Renderer.entryToNode.get(event);
                    if (!node || !node.selfTime) {
                        continue;
                    }
                    const url = Extras.URLForEntry.get(traceData, event);
                    if (!url) {
                        continue;
                    }
                    selfTimeByUrl.set(url, node.selfTime + (selfTimeByUrl.get(url) ?? 0));
                }
            }
        }
    }
    return selfTimeByUrl;
}
function getSummaries(requests, entityByRequest, selfTimeByUrl) {
    const byRequest = new Map();
    const byEntity = new Map();
    const defaultSummary = { transferSize: 0, mainThreadTime: Types.Timing.MicroSeconds(0) };
    for (const request of requests) {
        const urlSummary = byRequest.get(request) || { ...defaultSummary };
        urlSummary.transferSize += request.args.data.encodedDataLength;
        urlSummary.mainThreadTime =
            Types.Timing.MicroSeconds(urlSummary.mainThreadTime + (selfTimeByUrl.get(request.args.data.url) ?? 0));
        byRequest.set(request, urlSummary);
    }
    // Map each request's stat to a particular entity.
    const requestsByEntity = new Map();
    for (const [request, requestSummary] of byRequest.entries()) {
        const entity = entityByRequest.get(request);
        if (!entity) {
            byRequest.delete(request);
            continue;
        }
        const entitySummary = byEntity.get(entity) || { ...defaultSummary };
        entitySummary.transferSize += requestSummary.transferSize;
        entitySummary.mainThreadTime =
            Types.Timing.MicroSeconds(entitySummary.mainThreadTime + requestSummary.mainThreadTime);
        byEntity.set(entity, entitySummary);
        const entityRequests = requestsByEntity.get(entity) || [];
        entityRequests.push(request);
        requestsByEntity.set(entity, entityRequests);
    }
    return { byEntity, byRequest, requestsByEntity };
}
export function generateInsight(traceData, context) {
    const networkRequests = [];
    for (const req of traceData.NetworkRequests.byTime) {
        if (req.args.data.frame !== context.frameId) {
            continue;
        }
        const navigation = Helpers.Trace.getNavigationForTraceEvent(req, context.frameId, traceData.Meta.navigationsByFrameId);
        if (navigation === context.navigation) {
            networkRequests.push(req);
        }
    }
    const entityByRequest = new Map();
    const madeUpEntityCache = new Map();
    for (const request of networkRequests) {
        const url = request.args.data.url;
        const entity = ThirdPartyWeb.ThirdPartyWeb.getEntity(url) ?? makeUpEntity(madeUpEntityCache, url);
        if (entity) {
            entityByRequest.set(request, entity);
        }
    }
    const selfTimeByUrl = getSelfTimeByUrl(traceData, context);
    const summaries = getSummaries(networkRequests, entityByRequest, selfTimeByUrl);
    const firstPartyUrl = context.navigation.args.data?.url ?? traceData.Meta.mainFrameURL;
    const firstPartyEntity = ThirdPartyWeb.ThirdPartyWeb.getEntity(firstPartyUrl) || makeUpEntity(madeUpEntityCache, firstPartyUrl);
    return {
        entityByRequest,
        requestsByEntity: summaries.requestsByEntity,
        summaryByRequest: summaries.byRequest,
        summaryByEntity: summaries.byEntity,
        firstPartyEntity,
    };
}
//# sourceMappingURL=ThirdPartyWeb.js.map