// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as UI from './legacy.js';
describeWithEnvironment('SoftDropDown', () => {
    class Delegate {
        titleFor(item) {
            return item.title;
        }
        createElementForItem(item) {
            const element = document.createElement('div');
            element.textContent = this.titleFor(item);
            return element;
        }
        isItemSelectable(item) {
            return !item.disabled;
        }
        itemSelected(_item) {
        }
        highlightedItemChanged(_from, _to, _fromElement, _toElement) {
        }
    }
    const items = [
        { title: 'first', index: 0 },
        { title: 'second', index: 1 },
        { title: 'third', index: 2 },
        { title: 'fourth', index: 3 },
        { title: 'disabled 4.5', disabled: true, index: 4 },
        { title: 'fifth', index: 5 },
        { title: 'sixth', index: 6 },
        { title: 'seventh', index: 7 },
        { title: 'eighth', index: 8 },
    ];
    it('navigates with keyboard', () => {
        const model = new UI.ListModel.ListModel();
        const delegate = new Delegate();
        const dropDown = new UI.SoftDropDown.SoftDropDown(model, delegate);
        for (const item of items) {
            model.insertWithComparator(item, (a, b) => a.index - b.index);
        }
        // Initial check
        dropDown.selectItem(items[5]); // Select 'fifth'
        assert.strictEqual(dropDown.getSelectedItem()?.title, 'fifth');
        // Show dropdown
        dropDown.element.dispatchEvent(new MouseEvent('mousedown'));
        assert.strictEqual(dropDown.element.getAttribute('aria-expanded'), 'true');
        // Helper to simulate key press and check highlighted item
        function checkKeyDown(key, expectedTitle) {
            const list = dropDown.list;
            if (key.length === 1) {
                // SoftDropDown handles simple characters in 'onKeyDownList'
                list.element.dispatchEvent(new KeyboardEvent('keydown', { key }));
            }
            else {
                // Arrow keys are handled by SoftDropDown 'onKeyDownButton' or list
                // When dropdown is open, list is focused.
                const target = list.element;
                target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
            }
            const highlightedItem = list.selectedItem();
            assert.strictEqual(highlightedItem?.title, expectedTitle, `After pressing ${key}`);
        }
        // ArrowDown x3
        checkKeyDown('ArrowDown', 'sixth');
        checkKeyDown('ArrowDown', 'seventh');
        checkKeyDown('ArrowDown', 'eighth');
        // ArrowUp x3
        checkKeyDown('ArrowUp', 'seventh');
        checkKeyDown('ArrowUp', 'sixth');
        checkKeyDown('ArrowUp', 'fifth');
        // ArrowDown x2
        checkKeyDown('ArrowDown', 'sixth');
        checkKeyDown('ArrowDown', 'seventh');
        // Type 'f' -> 'first'
        checkKeyDown('f', 'first');
        // Type 'f' -> 'fourth'
        checkKeyDown('f', 'fourth');
        // Type 't' -> 'third'
        checkKeyDown('t', 'third');
    });
});
//# sourceMappingURL=SoftDropDown.test.js.map