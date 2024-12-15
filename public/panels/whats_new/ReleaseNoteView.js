// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Marked from '../../third_party/marked/marked.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { getReleaseNote } from './ReleaseNoteText.js';
const { render, html } = LitHtml;
import releaseNoteViewStyles from './releaseNoteView.css.js';
const UIStrings = {
    /**
     *@description Text that is usually a hyperlink to more documentation
     */
    seeFeatures: 'See all new features',
};
const str_ = i18n.i18n.registerUIStrings('panels/whats_new/ReleaseNoteView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export async function getMarkdownContent() {
    const markdown = await ReleaseNoteView.getFileContent();
    const markdownAst = Marked.Marked.lexer(markdown);
    const splitMarkdownAst = [];
    // Split markdown content into groups of content to be rendered together.
    // Each topic is supposed to be rendered in a separate card.
    let groupStartDepth = Number.MAX_SAFE_INTEGER;
    markdownAst.forEach((token) => {
        if (token.type === 'heading' && groupStartDepth >= token.depth) {
            splitMarkdownAst.push([token]);
            groupStartDepth = token.depth;
        }
        else if (splitMarkdownAst.length > 0) {
            splitMarkdownAst[splitMarkdownAst.length - 1].push(token);
        }
        else {
            // Missing a heading. Add to a separate section.
            splitMarkdownAst.push([token]);
        }
    });
    return splitMarkdownAst;
}
export class ReleaseNoteView extends UI.Widget.VBox {
    #view;
    constructor(element, view = (input, _output, target) => {
        const releaseNote = input.getReleaseNote();
        const markdownContent = input.markdownContent;
        // clang-format off
        render(html `
      <div class="whatsnew" jslog=${VisualLogging.section().context('release-notes')}>
        <div class="header">
          ${releaseNote.header}
        </div>
        <div>
          <devtools-button
                .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}
                .jslogContext=${'learn-more'}
                @click=${() => input.openNewTab(releaseNote.link)}
            >${i18nString(UIStrings.seeFeatures)}</devtools-button>
        </div>

        <div class="feature-container">
          <div class="video-container">
            <x-link
              href=${releaseNote.link}
              jslog=${VisualLogging.link().track({ click: true }).context('learn-more')}>
                <div class="video">
                  <img class="thumbnail" src=${new URL('../../Images/whatsnew.svg', import.meta.url).toString()}>
                  <div class="thumbnail-description"><span>${releaseNote.header}</span></div>
                </div>
            </x-link>
          </div>
          ${markdownContent.map((markdown) => {
            return html `<div class="feature"><devtools-markdown-view slot="content" .data=${{ tokens: markdown }}></devtools-markdown-view></div>`;
        })}
        </div>
      </div>
    `, target, { host: this });
        // clang-format on
    }) {
        super(true, undefined, element);
        this.#view = view;
        this.update();
    }
    static async getFileContent() {
        const url = new URL('./resources/WNDT.md', import.meta.url);
        try {
            const response = await fetch(url.toString());
            return response.text();
        }
        catch (error) {
            throw new Error(`Markdown file ${url.toString()} not found. Make sure it is correctly listed in the relevant BUILD.gn files.`);
        }
    }
    async doUpdate() {
        const markdownContent = await getMarkdownContent();
        this.#view({
            getReleaseNote,
            openNewTab: this.#openNewTab,
            markdownContent,
        }, this, this.contentElement);
    }
    #openNewTab(link) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(link);
    }
    wasShown() {
        super.wasShown();
        this.registerCSSFiles([releaseNoteViewStyles]);
    }
}
//# sourceMappingURL=ReleaseNoteView.js.map