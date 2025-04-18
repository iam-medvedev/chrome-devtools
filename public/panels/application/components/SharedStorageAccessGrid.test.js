// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { getValuesOfAllBodyRows } from '../../../testing/DataGridHelpers.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithLocale } from '../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as ApplicationComponents from './components.js';
async function renderSharedStorageAccessGrid(events) {
    const component = new ApplicationComponents.SharedStorageAccessGrid.SharedStorageAccessGrid();
    renderElementIntoDOM(component);
    component.data = events;
    // The data-grid's renderer is scheduled, so we need to wait until the coordinator
    // is done before we can test against it.
    await RenderCoordinator.done();
    return component;
}
function getInternalDataGridShadowRoot(component) {
    const dataGrid = component.shadowRoot.querySelector('devtools-data-grid');
    assert.isNotNull(dataGrid.shadowRoot);
    return dataGrid.shadowRoot;
}
describeWithLocale('SharedStorageAccessGrid', () => {
    it('renders shared storage access events', async () => {
        const noId = '';
        const params1 = { key: 'key0', value: 'value0' };
        const params2 = { key: 'key0' };
        const component = await renderSharedStorageAccessGrid([
            {
                accessTime: 0,
                method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
                mainFrameId: noId,
                ownerOrigin: 'https://owner1.com',
                ownerSite: 'https://owner1.com',
                params: params1,
                scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
            },
            {
                accessTime: 10,
                method: "delete" /* Protocol.Storage.SharedStorageAccessMethod.Delete */,
                mainFrameId: noId,
                ownerOrigin: 'https://owner2.com',
                ownerSite: 'https://owner2.com',
                params: params2,
                scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
            },
        ]);
        const dataGridShadowRoot = getInternalDataGridShadowRoot(component);
        const rowValues = getValuesOfAllBodyRows(dataGridShadowRoot);
        const expectedValues = [
            [
                (new Date(0 * 1e3)).toLocaleString(), 'window', 'append', 'https://owner1.com', 'https://owner1.com',
                JSON.stringify(params1)
            ],
            [
                (new Date(10 * 1e3)).toLocaleString(), 'sharedStorageWorklet', 'delete', 'https://owner2.com',
                'https://owner2.com', JSON.stringify(params2)
            ],
        ];
        assert.deepEqual(rowValues, expectedValues);
    });
    it('hides shared storage event table when there are no events', async () => {
        const component = await renderSharedStorageAccessGrid([]);
        const nullGridElement = component.shadowRoot.querySelector('devtools-new-data');
        assert.isNull(nullGridElement);
        const noEventsElement = component.shadowRoot.querySelector('.empty-state');
        assert.instanceOf(noEventsElement, HTMLDivElement);
    });
});
//# sourceMappingURL=SharedStorageAccessGrid.test.js.map