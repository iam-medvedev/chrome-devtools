// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
const { html } = LitHtml;
export const primitiveRenderer = (value) => {
    return html `${value}`;
};
export const codeBlockRenderer = (value) => {
    if (!value) {
        return LitHtml.nothing;
    }
    const stringValue = String(value);
    return html `<code>${stringValue}</code>`;
};
export const iconRenderer = (icon) => {
    if (!icon) {
        return LitHtml.nothing;
    }
    return html `<div style="display: flex; justify-content: center;">${icon}</div>`;
};
//# sourceMappingURL=DataGridRenderers.js.map