// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import { html, render } from '../../../../ui/lit/lit.js';
import * as UI from '../../legacy.js';
import * as DataGrid from './data_grid.js';
const widgetRef = UI.Widget.widgetRef;
describeWithEnvironment('DataGrid', () => {
    it('can be instantiated from template', async () => {
        const container = document.createElement('div');
        renderElementIntoDOM(container);
        let widget;
        const dataGridOptions = {
            displayName: 'testGrid',
            columns: [{
                    id: 'test',
                    sortable: false,
                }],
            nodes: [new DataGrid.DataGrid.DataGridNode({ test: 'testNode' })],
            markAsRoot: true,
        };
        // clang-format off
        render(html `
        <!-- @ts-ignore -->
        <devtools-data-grid-widget
            .options=${dataGridOptions}
            ${widgetRef(DataGrid.DataGrid.DataGridWidget, e => { widget = e; })}
        ></devtools-data-grid-widget>
        `, container, { host: this });
        // clang-format on
        assert.exists(widget);
        // There is a single test row
        assert.lengthOf(widget.dataGrid.rootNode().children, 1);
    });
});
//# sourceMappingURL=DataGrid.test.js.map