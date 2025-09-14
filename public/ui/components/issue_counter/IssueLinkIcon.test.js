// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as IssuesManager from '../../../models/issues_manager/issues_manager.js';
import { renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { describeWithLocale } from '../../../testing/EnvironmentHelpers.js';
import * as IconButton from '../icon_button/icon_button.js';
import * as RenderCoordinator from '../render_coordinator/render_coordinator.js';
import * as IssueCounter from './issue_counter.js';
const renderIssueLinkIcon = async (data) => {
    const component = new IssueCounter.IssueLinkIcon.IssueLinkIcon();
    component.data = data;
    renderElementIntoDOM(component);
    assert.isNotNull(component.shadowRoot);
    await RenderCoordinator.done();
    return { component, shadowRoot: component.shadowRoot };
};
export const extractElements = (shadowRoot) => {
    const icon = shadowRoot.querySelector('devtools-icon');
    assert.instanceOf(icon, IconButton.Icon.Icon);
    const button = shadowRoot.querySelector('button');
    assert.instanceOf(button, HTMLButtonElement);
    return { icon, button };
};
class MockIssueResolver {
    #promiseMap = new Map();
    waitFor(issueId) {
        if (!issueId) {
            if (this.#promiseMap.size !== 1) {
                throw new Error('more than one issue being awaited, specify a issue id');
            }
            issueId = this.#promiseMap.keys().next().value;
        }
        issueId = issueId || '';
        const entry = this.#promiseMap.get(issueId);
        if (entry) {
            return entry.promise;
        }
        const { resolve, promise } = Promise.withResolvers();
        this.#promiseMap.set(issueId, { resolve, promise });
        return promise;
    }
    resolve(result, issueId) {
        if (!issueId && this.#promiseMap.size === 1) {
            issueId = this.#promiseMap.keys().next().value;
        }
        issueId = issueId || result?.getIssueId() || '';
        const entry = this.#promiseMap.get(issueId);
        if (!entry) {
            throw new Error('resolve uninitialized');
        }
        entry.resolve(result);
        this.#promiseMap.delete(issueId);
    }
}
describeWithLocale('IssueLinkIcon', () => {
    const issueId = 'issue1';
    const mockIssue = {
        getKind() {
            return "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */;
        },
        getIssueId() {
            return issueId;
        },
        getDescription() {
            return null;
        },
    };
    describe('with simple issues', () => {
        const failingIssueResolver = {
            async waitFor() {
                throw new Error('Couldn\'t resolve');
            },
        };
        it('renders correctly without an issue', async () => {
            const { shadowRoot } = await renderIssueLinkIcon({
                issueId,
                issueResolver: failingIssueResolver,
            });
            const { icon } = extractElements(shadowRoot);
            assert.strictEqual(icon.name, 'issue-questionmark-filled');
        });
        it('renders correctly with a "page error" issue', async () => {
            const { shadowRoot } = await renderIssueLinkIcon({
                issue: mockIssue,
            });
            const { icon } = extractElements(shadowRoot);
            assert.strictEqual(icon.name, 'issue-cross-filled');
        });
        it('the style reacts to the presence of the issue', async () => {
            const { shadowRoot } = await renderIssueLinkIcon({
                issue: mockIssue,
            });
            const { button } = extractElements(shadowRoot);
            assert.isTrue(button.classList.contains('link'));
        });
        it('the style reacts to the absence of an issue', async () => {
            const { shadowRoot } = await renderIssueLinkIcon({
                issueId,
                issueResolver: failingIssueResolver,
            });
            const { button } = extractElements(shadowRoot);
            assert.isFalse(button.classList.contains('link'));
        });
    });
    describe('transitions upon issue resolution', () => {
        it('to change the style correctly', async () => {
            const resolver = new MockIssueResolver();
            const { shadowRoot } = await renderIssueLinkIcon({
                issueId,
                issueResolver: resolver,
            });
            resolver.resolve(mockIssue);
            await RenderCoordinator.done({ waitForWork: true });
            assert.isTrue(extractElements(shadowRoot).button.classList.contains('link'));
        });
        it('handles multiple data assignments', async () => {
            const { shadowRoot, component } = await renderIssueLinkIcon({
                issue: mockIssue,
            });
            const mockIssue2 = {
                getKind() {
                    return "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */;
                },
            };
            component.data = {
                issue: mockIssue2,
            };
            await RenderCoordinator.done({ waitForWork: true });
            const { icon } = extractElements(shadowRoot);
            assert.strictEqual(icon.name, 'issue-exclamation-filled');
        });
    });
    describe('handles clicks correctly', () => {
        it('if the button is clicked', async () => {
            const revealOverride = sinon.fake(Common.Revealer.reveal);
            const { shadowRoot } = await renderIssueLinkIcon({
                issue: mockIssue,
                revealOverride,
            });
            const { button } = extractElements(shadowRoot);
            button.click();
            sinon.assert.called(revealOverride);
        });
    });
});
//# sourceMappingURL=IssueLinkIcon.test.js.map