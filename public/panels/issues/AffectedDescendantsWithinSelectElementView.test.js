// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import * as Issues from './issues.js';
const { AffectedDescendantsWithinSelectElementView, DEFAULT_VIEW } = Issues.AffectedDescendantsWithinSelectElementView;
function createRow(nodeName, backendNodeId = 1) {
    return {
        backendNodeId: backendNodeId,
        nodeName,
        target: null,
        onElementClick: () => { },
    };
}
function createIssueDetails(overrides = {}) {
    return {
        nodeId: 1,
        elementAccessibilityIssueReason: "DisallowedSelectChild" /* Protocol.Audits.ElementAccessibilityIssueReason.DisallowedSelectChild */,
        hasDisallowedAttributes: false,
        ...overrides,
    };
}
describe('AffectedDescendantsWithinSelectElementView', () => {
    describe('DEFAULT_VIEW', () => {
        setupLocaleHooks();
        function renderView(rows) {
            const target = document.createElement('table');
            renderElementIntoDOM(target);
            DEFAULT_VIEW({ rows }, undefined, target);
            return target;
        }
        it('renders one row per descendant row', () => {
            const target = renderView([createRow('first', 1), createRow('second', 2)]);
            const rows = target.querySelectorAll('tr');
            assert.lengthOf(rows, 2);
            assert.isTrue(rows[0].classList.contains('affected-resource-select-element-descendant'));
            assert.strictEqual(rows[0].cells[0].textContent, 'first');
            assert.strictEqual(rows[1].cells[0].textContent, 'second');
        });
        it('renders no rows when there are no descendant rows', () => {
            const target = renderView([]);
            assert.lengthOf(target.querySelectorAll('tr'), 0);
        });
        it('re-renders without duplicating rows', () => {
            const target = renderView([createRow('first')]);
            assert.lengthOf(target.querySelectorAll('tr'), 1);
            DEFAULT_VIEW({ rows: [createRow('replaced')] }, undefined, target);
            const rows = target.querySelectorAll('tr');
            assert.lengthOf(rows, 1);
            assert.strictEqual(rows[0].cells[0].textContent, 'replaced');
        });
    });
    describeWithEnvironment('presenter', () => {
        setupLocaleHooks();
        function createPresenter(issueDetailsList) {
            const aggregationKey = 'key';
            const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue("ElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.ElementAccessibilityIssue */, aggregationKey);
            for (const issueDetails of issueDetailsList) {
                aggregatedIssue.addInstance(new IssuesManager.ElementAccessibilityIssue.ElementAccessibilityIssue(issueDetails, null));
            }
            const mockIssueView = sinon.createStubInstance(Issues.IssueView.IssueView);
            const view = sinon.stub();
            const presenter = new AffectedDescendantsWithinSelectElementView(mockIssueView, aggregatedIssue, 'select-element-descendants', view);
            return { presenter, view };
        }
        function getCounterText(presenter) {
            return presenter.listItemElement.querySelector('.affected-resource-label')?.textContent ?? '';
        }
        it('passes one row per affected descendant to the view', () => {
            const { presenter, view } = createPresenter([
                createIssueDetails({ nodeId: 1 }),
                createIssueDetails({ nodeId: 2 }),
            ]);
            presenter.update();
            sinon.assert.calledOnce(view);
            const { rows } = view.lastCall.args[0];
            assert.lengthOf(rows, 2);
            assert.strictEqual(rows[0].nodeName, 'Disallowed descendant');
            assert.strictEqual(rows[0].backendNodeId, 1);
            assert.strictEqual(rows[1].nodeName, 'Disallowed descendant');
            assert.strictEqual(rows[1].backendNodeId, 2);
        });
        it('uses the descendant label for the affected resource count', () => {
            const { presenter } = createPresenter([
                createIssueDetails({ nodeId: 1 }),
                createIssueDetails({ nodeId: 2 }),
            ]);
            presenter.update();
            assert.strictEqual(getCounterText(presenter), '2 descendants');
            assert.isFalse(presenter.hidden);
        });
        it('uses the singular label for a single affected descendant', () => {
            const { presenter } = createPresenter([createIssueDetails()]);
            presenter.update();
            assert.strictEqual(getCounterText(presenter), '1 descendant');
        });
        it('is hidden when there are no affected descendants', () => {
            const { presenter, view } = createPresenter([]);
            presenter.update();
            assert.deepEqual(view.lastCall.args[0], { rows: [] });
            assert.isTrue(presenter.hidden);
        });
    });
});
//# sourceMappingURL=AffectedDescendantsWithinSelectElementView.test.js.map