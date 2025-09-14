// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as Lit from '../../ui/lit/lit.js';
import * as UI from './legacy.js';
const { render, html } = Lit;
describeWithEnvironment('NamedBitSetFilterUI', () => {
    it('is functional from template', async () => {
        const container = document.createElement('div');
        renderElementIntoDOM(container);
        let namedBitSetFilterUI;
        const filterItems = [
            {
                name: 'filter',
                label: () => 'filter',
                title: 'filter',
                jslogContext: 'filter',
            },
        ];
        // clang-format off
        render(html `
            <devtools-named-bit-set-filter
              .options=${{ items: filterItems }}
              ${Lit.Directives.ref((el) => {
            if (!el || !(el instanceof UI.FilterBar.NamedBitSetFilterUIElement)) {
                return;
            }
            namedBitSetFilterUI = el.getOrCreateNamedBitSetFilterUI();
        })}
            ></devtools-named-bit-set-filter>
        `, container, { host: this });
        // clang-format on
        assert.isTrue(namedBitSetFilterUI.accept('test'));
        const filter = namedBitSetFilterUI.element().querySelector('.filter');
        filter.click();
        assert.isFalse(namedBitSetFilterUI.accept('test'));
    });
});
//# sourceMappingURL=FilterBar.test.js.map