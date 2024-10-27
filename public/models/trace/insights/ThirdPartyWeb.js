// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Extras from '../extras/extras.js';
import * as Helpers from '../helpers/helpers.js';
export function deps() {
    return ['Meta', 'NetworkRequests', 'Renderer', 'ImagePainting'];
}
function getRelatedEvents(summaries, firstPartyEntity) {
    const events = [];
    for (const [entity, requests] of summaries.requestsByEntity.entries()) {
        if (entity !== firstPartyEntity) {
            events.push(...requests);
        }
    }
    return events;
}
export function generateInsight(parsedTrace, context) {
    const networkRequests = parsedTrace.NetworkRequests.byTime.filter(event => {
        if (!context.navigation) {
            return false;
        }
        if (event.args.data.frame !== context.frameId) {
            return false;
        }
        return Helpers.Timing.eventIsInBounds(event, context.bounds);
    });
    const { entityByRequest, madeUpEntityCache, summaries } = Extras.ThirdParties.getSummariesAndEntitiesForTraceBounds(parsedTrace, context.bounds, networkRequests);
    const firstPartyUrl = context.navigation?.args.data?.documentLoaderURL ?? parsedTrace.Meta.mainFrameURL;
    const firstPartyEntity = ThirdPartyWeb.ThirdPartyWeb.getEntity(firstPartyUrl) ||
        Extras.ThirdParties.makeUpEntity(madeUpEntityCache, firstPartyUrl);
    return {
        relatedEvents: getRelatedEvents(summaries, firstPartyEntity),
        entityByRequest,
        requestsByEntity: summaries.requestsByEntity,
        summaryByRequest: summaries.byRequest,
        summaryByEntity: summaries.byEntity,
        firstPartyEntity,
    };
}
//# sourceMappingURL=ThirdPartyWeb.js.map