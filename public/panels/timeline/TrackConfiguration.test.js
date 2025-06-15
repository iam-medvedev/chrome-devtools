// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Timeline from './timeline.js';
const { buildPersistedConfig } = Timeline.TrackConfiguration;
function buildTestGroup(opts) {
    const group = {
        name: opts.name,
        startLevel: 0, // doesn't matter for these tests
        style: {},
    };
    if (opts.hidden) {
        group.hidden = true;
    }
    if (opts.expanded) {
        group.expanded = true;
    }
    return group;
}
describe('TrackConfiguration', () => {
    it('builds a representation of the groups and their visual order', () => {
        const groups = [
            buildTestGroup({ name: 'Group 1' }),
            buildTestGroup({ name: 'Group 2', hidden: true }),
            buildTestGroup({ name: 'Group 3', expanded: true }),
        ];
        const visualOrder = [1, 2, 0];
        const data = buildPersistedConfig(groups, visualOrder);
        assert.deepEqual(data, [
            { expanded: false, hidden: false, originalIndex: 0, visualIndex: 2 },
            { expanded: false, hidden: true, originalIndex: 1, visualIndex: 0 },
            { expanded: true, hidden: false, originalIndex: 2, visualIndex: 1 },
        ]);
    });
});
//# sourceMappingURL=TrackConfiguration.test.js.map