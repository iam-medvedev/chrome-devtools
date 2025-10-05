// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './data_grid.js';
import { raf, renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as Lit from '../../../../ui/lit/lit.js';
import * as UI from '../../legacy.js';
const { render, html } = Lit;
function getFocusedElement() {
    let root = document;
    while (root.activeElement?.shadowRoot?.activeElement) {
        root = root.activeElement.shadowRoot;
    }
    return root.activeElement;
}
function sendKeydown(element, key) {
    element.focus();
    getFocusedElement().dispatchEvent(new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        composed: true,
    }));
}
describeWithEnvironment('DataGrid', () => {
    let container;
    let liveAnnouncerAlertStub;
    function getAlertAnnouncement(element) {
        element.blur();
        element.focus();
        assert.isTrue(liveAnnouncerAlertStub.called, 'Expected UI.ARIAUtils.LiveAnnouncer.alert to be called');
        return liveAnnouncerAlertStub.lastCall.args[0];
    }
    beforeEach(() => {
        liveAnnouncerAlertStub = sinon.stub(UI.ARIAUtils.LiveAnnouncer, 'alert').returns();
        container = document.createElement('div');
        container.style.display = 'flex';
        container.style.width = '640px';
        container.style.height = '480px';
        renderElementIntoDOM(container);
    });
    async function renderDataGrid(template) {
        render(template, container, { host: {} });
        await RenderCoordinator.done({ waitForWork: true });
        return container.querySelector('devtools-data-grid');
    }
    async function renderDataGridContent(template) {
        return await renderDataGrid(html `<devtools-data-grid striped name="Display Name" .template=${template}></devtools-data-grid>`);
    }
    async function renderDataGridWithData(columns, rows) {
        return await renderDataGridContent(html `<table>${columns}${rows}</table>`);
    }
    it('can be configured from template', async () => {
        const element = await renderDataGrid(html `
        <devtools-data-grid .striped=${true} .displayName=${'Display Name'}>
        </devtools-data-grid>`);
        assert.isTrue(getAlertAnnouncement(element).startsWith('Display Name Rows: 0'));
    });
    it('can initialize data from template', async () => {
        const element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        sendKeydown(element, 'ArrowDown');
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row  Column 1: Value 1, Column 2: Value 2');
    });
    it('can update data from template', async () => {
        await renderDataGridWithData(html `
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>`, html `
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        const element = await renderDataGridWithData(html `
            <tr>
              <th id="column-3">Column 3</th>
              <th id="column-4">Column 4</th>
            </tr>`, html `
            <tr>
              <td>Value 3</td>
              <td>Value 4</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        sendKeydown(element, 'ArrowDown');
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row  Column 3: Value 3, Column 4: Value 4');
    });
    it('can filter data', async () => {
        await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
            <tr>
              <td>Value 3</td>
              <td>Value 4</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        // clang-format off
        const element = await renderDataGrid(html `
        <devtools-data-grid
            striped name=${'Display Name'}
            .filters=${[{ key: 'column-1', text: '3', negative: false }]}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
            <tr>
              <td>Value 3</td>
              <td>Value 4</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        // clang-format on
        assert.isTrue(getAlertAnnouncement(element).startsWith('Display Name Rows: 1'));
        sendKeydown(element, 'ArrowDown');
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row  Column 1: Value 3, Column 2: Value 4');
    });
    it('can set selection from template', async () => {
        let element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
            <tr selected>
              <td>Value 3</td>
              <td>Value 4</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        // clang-format off
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row  Column 1: Value 3, Column 2: Value 4');
        element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
            <tr selected="false">
              <td>Value 3</td>
              <td>Value 4</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        // clang-format off
        assert.isTrue(getAlertAnnouncement(element).startsWith('Display Name Rows: 2'));
    });
    it('supports editable columns', async () => {
        const editCallback = sinon.stub();
        const element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1" editable>Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr @edit=${editCallback}>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
          </table>
        </devtools-data-grid>`);
        sendKeydown(element, 'ArrowDown');
        sendKeydown(element, 'Enter');
        getFocusedElement().textContent = 'New Value';
        sendKeydown(element, 'Enter');
        sinon.assert.calledOnce(editCallback);
        assert.isTrue(editCallback.firstCall.args[0].target.textContent.includes('Value 1'));
        assert.isTrue(editCallback.firstCall.args[0].target.textContent.includes('Value 2'));
        assert.strictEqual(editCallback.firstCall.args[0].detail.columnId, 'column-1');
        assert.strictEqual(editCallback.firstCall.args[0].detail.valueBeforeEditing, 'Value 1');
        assert.strictEqual(editCallback.firstCall.args[0].detail.newText, 'New Value');
    });
    it('supports creation node', async () => {
        const createCallback = sinon.stub();
        const editCallback = sinon.stub();
        const element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}
                            @create=${createCallback}>
          <table>
            <tr>
              <th id="column-1" editable>Column 1</th>
              <th id="column-2" editable>Column 2</th>
            </tr>
            <tr @edit=${editCallback}>
              <td>Value 1</td>
              <td>Value 2</td>
            </tr>
            <tr placeholder @edit=${editCallback}>
            </tr>
          </table>
        </devtools-data-grid>`);
        sendKeydown(element, 'ArrowDown');
        sendKeydown(element, 'ArrowDown');
        sendKeydown(element, 'Enter');
        getFocusedElement().textContent = 'New Value 1';
        sendKeydown(element, 'Tab');
        sinon.assert.notCalled(editCallback);
        sinon.assert.notCalled(createCallback);
        getFocusedElement().textContent = 'New Value 2';
        sendKeydown(element, 'Tab');
        sinon.assert.notCalled(editCallback);
        sinon.assert.calledOnce(createCallback);
        assert.deepEqual(createCallback.firstCall.args[0].detail, { 'column-1': 'New Value 1', 'column-2': 'New Value 2' });
    });
    it('can display nested nodes', async () => {
        const element = await renderDataGrid(html `
        <devtools-data-grid striped name=${'Display Name'}>
          <table>
            <tr>
              <th id="column-1">Column 1</th>
              <th id="column-2">Column 2</th>
            </tr>
            <tr>
              <td>Parent Value 1</td>
              <td>Parent Value 2</td>
              <td>
                <table>
                  <tr>
                    <td>Child Value 1</td>
                    <td>Child Value 2</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </devtools-data-grid>`);
        // Navigate to parent row.
        sendKeydown(element, 'ArrowDown');
        // It should identify it as a parent and collapsed.
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row collapsed level 1, Column 1: Parent Value 1, Column 2: Parent Value 2');
        // Expand parent row.
        sendKeydown(element, 'ArrowRight');
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row expanded level 1, Column 1: Parent Value 1, Column 2: Parent Value 2');
        await raf();
        // Navigate to child row.
        sendKeydown(element, 'ArrowDown');
        assert.strictEqual(getAlertAnnouncement(element), 'Display Name Row  level 2, Column 1: Child Value 1, Column 2: Child Value 2');
    });
});
//# sourceMappingURL=DataGridElement.test.js.map