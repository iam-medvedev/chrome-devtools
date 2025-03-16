// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { checkForPendingActivity } from '../../../testing/TrackAsyncOperations.js';
import * as Lit from '../../lit/lit.js';
import * as Tooltips from './tooltips.js';
const { html, nothing } = Lit;
function renderTooltip({ variant = 'simple', attribute = 'aria-describedby', useClick = false, useHotkey = false, jslogContext = undefined, } = {}) {
    const container = document.createElement('div');
    // clang-format off
    Lit.render(html `
    ${attribute === 'aria-details' ?
        html `<button aria-details="tooltip-id">Button</button>` :
        html `<button aria-describedby="tooltip-id">Button</button>`}
    <devtools-tooltip
     id="tooltip-id"
     variant=${variant}
     ?use-click=${useClick}
     ?use-hotkey=${useHotkey}
     jslogContext=${jslogContext ?? nothing}
     >
      ${variant === 'rich' ? html `<p>Rich content</p>` : 'Simple content'}
    </devtools-tooltip>
  `, container);
    // clang-format on
    renderElementIntoDOM(container);
    return container;
}
describe('Tooltip', () => {
    it('renders a simple tooltip', () => {
        const container = renderTooltip();
        const tooltip = container.querySelector('devtools-tooltip');
        assert.strictEqual(tooltip?.variant, 'simple');
        assert.strictEqual(container.querySelector('devtools-tooltip')?.textContent?.trim(), 'Simple content');
    });
    it('renders a rich tooltip', () => {
        const container = renderTooltip({ variant: 'rich', attribute: 'aria-details' });
        const tooltip = container.querySelector('devtools-tooltip');
        assert.strictEqual(tooltip?.variant, 'rich');
        assert.strictEqual(container.querySelector('devtools-tooltip')?.querySelector('p')?.textContent, 'Rich content');
    });
    it('should be activated if hovered', async () => {
        const container = renderTooltip();
        const button = container.querySelector('button');
        button?.dispatchEvent(new MouseEvent('mouseenter'));
        await checkForPendingActivity();
        assert.isTrue(container.querySelector('devtools-tooltip')?.open);
    });
    it('should be activated if focused', async () => {
        const container = renderTooltip();
        const button = container.querySelector('button');
        button?.dispatchEvent(new FocusEvent('focus'));
        await checkForPendingActivity();
        assert.isTrue(container.querySelector('devtools-tooltip')?.open);
    });
    it('should not be activated if un-hovered', async () => {
        const container = renderTooltip();
        const button = container.querySelector('button');
        button?.dispatchEvent(new MouseEvent('mouseenter'));
        button?.dispatchEvent(new MouseEvent('mouseleave'));
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    it('should not be activated if un-focused', async () => {
        const container = renderTooltip();
        const button = container.querySelector('button');
        button?.dispatchEvent(new FocusEvent('focus'));
        button?.dispatchEvent(new FocusEvent('blur'));
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    it('should not open on hover if use-click is set', async () => {
        const container = renderTooltip({ useClick: true });
        const button = container.querySelector('button');
        button?.dispatchEvent(new MouseEvent('mouseenter'));
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    it('should not open on focus if use-click is set', async () => {
        const container = renderTooltip({ useClick: true });
        const button = container.querySelector('button');
        button?.dispatchEvent(new FocusEvent('focus'));
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    it('should open with click if use-click is set', () => {
        const container = renderTooltip({ useClick: true });
        const button = container.querySelector('button');
        button?.click();
        assert.isTrue(container.querySelector('devtools-tooltip')?.open);
    });
    it('should open with hotkey if use-hotkey is set', () => {
        const container = renderTooltip({ useHotkey: true });
        const button = container.querySelector('button');
        button?.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key: 'ArrowDown' }));
        assert.isTrue(container.querySelector('devtools-tooltip')?.open);
    });
    it('should not open on focus if use-hotkey is set', async () => {
        const container = renderTooltip({ useHotkey: true });
        const button = container.querySelector('button');
        button?.dispatchEvent(new FocusEvent('focus'));
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    const eventsNotToPropagate = ['click', 'mouseup'];
    eventsNotToPropagate.forEach(eventName => {
        it('shoould stop propagation of click events', () => {
            const container = renderTooltip();
            const callback = sinon.spy();
            container.addEventListener(eventName, callback);
            const tooltip = container.querySelector('devtools-tooltip');
            tooltip?.dispatchEvent(new Event(eventName, { bubbles: true }));
            assert.isFalse(callback.called);
            container.removeEventListener(eventName, callback);
        });
    });
    it('should print a warning if rich tooltip is used with wrong aria label on anchor', () => {
        const consoleSpy = sinon.spy(console, 'warn');
        renderTooltip({ variant: 'rich' });
        assert.isTrue(consoleSpy.calledOnce);
    });
    it('can be instantiated programatically', () => {
        const container = document.createElement('div');
        const anchor = document.createElement('button');
        anchor.setAttribute('aria-describedby', 'tooltip-id');
        const tooltip = new Tooltips.Tooltip.Tooltip({ id: 'tooltip-id', anchor });
        tooltip.append('Text content');
        container.appendChild(anchor);
        container.appendChild(tooltip);
        renderElementIntoDOM(container);
        assert.strictEqual(anchor.style.anchorName, '--devtools-tooltip-tooltip-id-anchor');
    });
    it('should hide the tooltip if anchor is removed from DOM', async () => {
        const container = renderTooltip();
        const button = container.querySelector('button');
        button?.dispatchEvent(new MouseEvent('mouseenter'));
        await checkForPendingActivity();
        button?.remove();
        await checkForPendingActivity();
        assert.isFalse(container.querySelector('devtools-tooltip')?.open);
    });
    it('automatically sets and updates jslog', () => {
        const container = renderTooltip({ jslogContext: 'context' });
        const tooltip = container.querySelector('devtools-tooltip');
        assert.exists(tooltip);
        assert.strictEqual(tooltip.getAttribute('jslog'), 'Popover; context: context; parent: mapped');
        tooltip.setAttribute('jslogcontext', 'context2');
        assert.strictEqual(tooltip.getAttribute('jslog'), 'Popover; context: context2; parent: mapped');
        const anchor = container.createChild('button');
        anchor.setAttribute('aria-details', 'constructed-tooltip-id');
        const constructedTooltip = new Tooltips.Tooltip.Tooltip({ id: 'constructed-tooltip-id', jslogContext: 'context3', anchor });
        container.appendChild(constructedTooltip);
        assert.strictEqual(constructedTooltip.getAttribute('jslog'), 'Popover; context: context3; parent: mapped');
    });
});
//# sourceMappingURL=Tooltip.test.js.map