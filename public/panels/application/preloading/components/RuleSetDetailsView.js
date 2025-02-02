// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assertNotNullOrUndefined } from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as Formatter from '../../../../models/formatter/formatter.js';
import * as CodeMirror from '../../../../third_party/codemirror.next/codemirror.next.js';
import * as CodeHighlighter from '../../../../ui/components/code_highlighter/code_highlighter.js';
import * as LegacyWrapper from '../../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as RenderCoordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as TextEditor from '../../../../ui/components/text_editor/text_editor.js';
import * as Lit from '../../../../ui/lit/lit.js';
import ruleSetDetailsViewStylesRaw from './RuleSetDetailsView.css.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const ruleSetDetailsViewStyles = new CSSStyleSheet();
ruleSetDetailsViewStyles.replaceSync(ruleSetDetailsViewStylesRaw.cssContent);
const { html } = Lit;
const codeMirrorJsonType = await CodeHighlighter.CodeHighlighter.languageFromMIME('application/json');
export class RuleSetDetailsView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #shadow = this.attachShadow({ mode: 'open' });
    #data = null;
    #shouldPrettyPrint = true;
    #editorState;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [ruleSetDetailsViewStyles];
    }
    set data(data) {
        this.#data = data;
        void this.#render();
    }
    set shouldPrettyPrint(shouldPrettyPrint) {
        this.#shouldPrettyPrint = shouldPrettyPrint;
    }
    async #render() {
        await RenderCoordinator.write('RuleSetDetailsView render', async () => {
            if (this.#data === null) {
                Lit.render(Lit.nothing, this.#shadow, { host: this });
                return;
            }
            const sourceText = await this.#getSourceText();
            // Disabled until https://crbug.com/1079231 is fixed.
            // clang-format off
            Lit.render(html `
        <div class="content">
          <div class="ruleset-header" id="ruleset-url">${this.#data?.url || SDK.TargetManager.TargetManager.instance().inspectedURL()}</div>
          ${this.#maybeError()}
        </div>
        <div class="text-ellipsis">
          ${this.#renderSource(sourceText)}
        </div>
      `, this.#shadow, { host: this });
            // clang-format on
        });
    }
    // TODO(https://crbug.com/1425354): Support i18n.
    #maybeError() {
        assertNotNullOrUndefined(this.#data);
        if (this.#data.errorMessage === undefined) {
            return Lit.nothing;
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        return html `
      <div class="ruleset-header">
        <devtools-icon
          .data=${{
            iconName: 'cross-circle',
            color: 'var(--icon-error)',
            width: '16px',
            height: '16px',
        }}>
        </devtools-icon>
        <span id="error-message-text">${this.#data.errorMessage}</span>
      </div>
    `;
        // clang-format on
    }
    #renderSource(sourceText) {
        this.#editorState = CodeMirror.EditorState.create({
            doc: sourceText,
            extensions: [
                TextEditor.Config.baseConfiguration(sourceText || ''),
                CodeMirror.lineNumbers(),
                CodeMirror.EditorState.readOnly.of(true),
                codeMirrorJsonType,
                CodeMirror.syntaxHighlighting(CodeHighlighter.CodeHighlighter.highlightStyle),
            ],
        });
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        // TODO(https://crbug.com/1425354): Add Raw button.
        return html `
      <devtools-text-editor .style.flexGrow=${'1'} .state=${this.#editorState}></devtools-text-editor>
    `;
        // clang-format on
    }
    async #getSourceText() {
        if (this.#shouldPrettyPrint && this.#data?.sourceText !== undefined) {
            const formattedResult = await Formatter.ScriptFormatter.formatScriptContent('application/json', this.#data.sourceText);
            return formattedResult.formattedContent;
        }
        return this.#data?.sourceText || '';
    }
}
customElements.define('devtools-resources-rulesets-details-view', RuleSetDetailsView);
//# sourceMappingURL=RuleSetDetailsView.js.map