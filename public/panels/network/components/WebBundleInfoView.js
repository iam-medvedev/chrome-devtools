// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../ui/legacy/components/data_grid/data_grid.js';
import '../../../ui/components/icon_button/icon_button.js';
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import { PanelUtils } from '../../../panels/utils/utils.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import { html, render } from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import webBundleInfoViewStyles from './WebBundleInfoView.css.js';
const { mimeFromURL, fromMimeTypeOverride, fromMimeType } = Common.ResourceType.ResourceType;
const { iconDataForResourceType } = PanelUtils;
const UIStrings = {
    /**
     *@description Header for the column that contains URL of the resource in a web bundle.
     */
    bundledResource: 'Bundled resource',
};
const str_ = i18n.i18n.registerUIStrings('panels/network/components/WebBundleInfoView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class WebBundleInfoView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #shadow = this.attachShadow({ mode: 'open' });
    #webBundleInfo;
    #webBundleName;
    constructor(request) {
        super();
        const webBundleInfo = request.webBundleInfo();
        if (!webBundleInfo) {
            throw new Error('Trying to render a Web Bundle info without providing data');
        }
        this.#webBundleInfo = webBundleInfo;
        this.#webBundleName = request.parsedURL.lastPathComponent;
        this.setAttribute('jslog', `${VisualLogging.pane('webbundle').track({ resize: true })}`);
    }
    async render() {
        // clang-format off
        render(html `
      <style>${webBundleInfoViewStyles}</style>
      <div class="header">
        <devtools-icon class="icon"
          .data=${{ color: 'var(--icon-default)', iconName: 'bundle', width: '20px' }}>
        </devtools-icon>
        <span>${this.#webBundleName}</span>
        <x-link href="https://web.dev/web-bundles/#explaining-web-bundles"
          jslog=${VisualLogging.link('webbundle-explainer').track({
            click: true,
        })}>
          <devtools-icon class="icon"
            .data=${{ color: 'var(--icon-default)', iconName: 'help', width: '16px' }}>
          </devtools-icon>
        </x-link>
      </div>
      <devtools-data-grid striped>
        <table>
          <tr>
            <th id="url">${i18nString(UIStrings.bundledResource)}</th>
          </tr>
          ${this.#webBundleInfo.resourceUrls?.map(url => {
            const mimeType = mimeFromURL(url) || null;
            const resourceType = fromMimeTypeOverride(mimeType) || fromMimeType(mimeType);
            const iconData = iconDataForResourceType(resourceType);
            return html `<tr>
              <td>
                <div style="display: flex;">
                  <devtools-icon class="icon" .data=${{ ...iconData, width: '20px' }}>
                  </devtools-icon>
                  <span>${url}</span>
                </div>
              </td>
            </tr>`;
        })}
        </table>
      </devtools-data-grid>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-web-bundle-info', WebBundleInfoView);
//# sourceMappingURL=WebBundleInfoView.js.map