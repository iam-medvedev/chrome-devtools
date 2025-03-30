// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/markdown_view/markdown_view.js';
import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import '../../ui/legacy/legacy.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as Persistence from '../../models/persistence/persistence.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as ChangesPanel from '../changes/changes.js';
const { classMap } = Directives;
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Text displayed for showing patch widget view.
     */
    unsavedChanges: 'Unsaved changes',
    /**
     *@description Loading text displayed as a summary title when the patch suggestion is getting loaded
     */
    applyingToPageTree: 'Applying to page tree…',
    /**
     *@description Button text for applying chanes to page tree.
     */
    applyToPageTree: 'Apply to page tree',
    /**
     *@description Button text to cancel applying to page tree.
     */
    cancel: 'Cancel',
    /**
     *@description Button text to discard the suggested changes and not save them to file system
     */
    discard: 'Discard',
    /**
     *@description Button text to save all the suggested changes to the file system
     */
    saveToWorkspace: 'Save to workspace',
    /**
     *@description Header text after the user saved the changes to the disk.
     */
    savedToDisk: 'Saved to disk',
    /**
     *@description Disclaimer text shown for using code snippets with caution
     */
    codeDisclaimer: 'Use code snippets with caution',
    /**
     *@description Tooltip text for the info icon beside the "Apply to page tree" button
     */
    disclaimerTooltip: 'The source code of the inspected page and its assets, and any data the inspected page can access is sent to Google to generate code suggestions.',
    /**
     *@description Tooltip text for the info icon beside the "Apply to page tree" button when enterprise logging is off
     */
    disclaimerTooltipNoLogging: 'The source code of the inspected page and its assets, and any data the inspected page can access is sent to Google to generate code suggestions. This data will not be used to improve Google’s AI models.',
    /**
     *@description Tooltip link for the navigating to "AI innovations" page in settings.
     */
    learnMore: 'Learn more',
    /**
     * @description Title of the link opening data that was used to
     * produce a code suggestion.
     */
    viewUploadedFiles: 'View data sent to Google',
    /**
     * @description Text indicating that a link opens in a new tab (for a11y).
     */
    opensInNewTab: '(opens in a new tab)',
    /**
     * @description Generic error text for the case the changes were not applied to the page tree.
     */
    genericErrorMessage: 'Changes couldn’t be applied to the page tree.',
};
const lockedString = i18n.i18n.lockedString;
export var PatchSuggestionState;
(function (PatchSuggestionState) {
    /**
     * The user did not attempt patching yet
     */
    PatchSuggestionState["INITIAL"] = "initial";
    /**
     * Applying to page tree is in progress
     */
    PatchSuggestionState["LOADING"] = "loading";
    /**
     * Applying to page tree succeeded
     */
    PatchSuggestionState["SUCCESS"] = "success";
    /**
     * Applying to page tree failed
     */
    PatchSuggestionState["ERROR"] = "error";
})(PatchSuggestionState || (PatchSuggestionState = {}));
export class PatchWidget extends UI.Widget.Widget {
    changeSummary = '';
    changeManager;
    #view;
    #viewOutput = {};
    #aidaClient;
    #applyPatchAbortController;
    #patchSources;
    #savedToDisk;
    #noLogging; // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
    #patchSuggestionState = PatchSuggestionState.INITIAL;
    #workspaceDiff = WorkspaceDiff.WorkspaceDiff.workspaceDiff();
    #persistence = Persistence.Persistence.PersistenceImpl.instance();
    constructor(element, view, opts) {
        super(false, false, element);
        this.#aidaClient = opts?.aidaClient ?? new Host.AidaClient.AidaClient();
        this.#noLogging = Root.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue ===
            Root.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
        // clang-format off
        this.#view = view ?? ((input, output, target) => {
            if (!input.changeSummary) {
                return;
            }
            output.tooltipRef = output.tooltipRef ?? Directives.createRef();
            function renderSourcesLink() {
                if (!input.sources) {
                    return nothing;
                }
                return html `<x-link
          class="link sources-link"
          title="${UIStringsNotTranslate.viewUploadedFiles} ${UIStringsNotTranslate.opensInNewTab}"
          href="data:text/plain,${encodeURIComponent(input.sources)}"
          jslog=${VisualLogging.link('files-used-in-patching').track({ click: true })}>
          ${UIStringsNotTranslate.viewUploadedFiles}
        </x-link>`;
            }
            function renderHeader() {
                if (input.savedToDisk) {
                    return html `
            <devtools-icon class="green-bright-icon summary-badge" .name=${'check-circle'}></devtools-icon>
            <span class="header-text">
              ${lockedString(UIStringsNotTranslate.savedToDisk)}
            </span>
          `;
                }
                if (input.patchSuggestionState === PatchSuggestionState.SUCCESS) {
                    return html `
            <devtools-icon class="on-tonal-icon summary-badge" .name=${'difference'}></devtools-icon>
            <span class="header-text">
              ${lockedString('File changes in page')}
            </span>
            <devtools-icon
              class="arrow"
              .name=${'chevron-down'}
            ></devtools-icon>
          `;
                }
                return html `
          <devtools-icon class="on-tonal-icon summary-badge" .name=${'pen-spark'}></devtools-icon>
          <span class="header-text">
            ${lockedString(UIStringsNotTranslate.unsavedChanges)}
          </span>
          <devtools-icon
            class="arrow"
            .name=${'chevron-down'}
          ></devtools-icon>
        `;
            }
            function renderContent() {
                if (!input.changeSummary || input.savedToDisk) {
                    return nothing;
                }
                if (input.patchSuggestionState === PatchSuggestionState.SUCCESS) {
                    return html `<devtools-widget .widgetConfig=${UI.Widget.widgetConfig(ChangesPanel.CombinedDiffView.CombinedDiffView, {
                        workspaceDiff: input.workspaceDiff,
                    })}></devtools-widget>`;
                }
                return html `<devtools-code-block
          .code=${input.changeSummary}
          .codeLang=${'css'}
          .displayNotice=${true}
        ></devtools-code-block>
        ${input.patchSuggestionState === PatchSuggestionState.ERROR
                    ? html `<div class="error-container">
              <devtools-icon .name=${'cross-circle-filled'}></devtools-icon>${lockedString(UIStringsNotTranslate.genericErrorMessage)} ${renderSourcesLink()}
            </div>`
                    : nothing}`;
            }
            function renderFooter() {
                if (input.savedToDisk) {
                    return nothing;
                }
                if (input.patchSuggestionState === PatchSuggestionState.SUCCESS) {
                    return html `
          <div class="footer">
            <x-link class="link disclaimer-link" href="https://support.google.com/legal/answer/13505487" jslog=${VisualLogging.link('code-disclaimer').track({
                        click: true,
                    })}>
              ${lockedString(UIStringsNotTranslate.codeDisclaimer)}
            </x-link>
            ${renderSourcesLink()}
            <div class="save-or-discard-buttons">
              <devtools-button
                @click=${input.onDiscard}
                .jslogContext=${'patch-widget.discard'}
                .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}>
                  ${lockedString(UIStringsNotTranslate.discard)}
              </devtools-button>
              ${input.onSaveToWorkspace ? html `
                <devtools-button
                  @click=${input.onSaveToWorkspace}
                  .jslogContext=${'patch-widget.save-to-workspace'}
                  .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}>
                    ${lockedString(UIStringsNotTranslate.saveToWorkspace)}
                </devtools-button>
              ` : nothing}
            </div>
          </div>
          `;
                }
                return html `
        <div class="footer">
          <div class="apply-to-page-tree-container">
            ${input.patchSuggestionState === PatchSuggestionState.LOADING ? html `
              <div class="loading-text-container">
                <devtools-spinner></devtools-spinner>
                <span>
                  ${lockedString(UIStringsNotTranslate.applyingToPageTree)}
                </span>
              </div>
            ` : html `
              <devtools-button
                @click=${input.onApplyToPageTree}
                .jslogContext=${'apply-to-page-tree'}
                .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}>
                ${lockedString(UIStringsNotTranslate.applyToPageTree)}
              </devtools-button>
            `}
            ${input.patchSuggestionState === PatchSuggestionState.LOADING ? html `<devtools-button
              @click=${input.onCancel}
              .jslogContext=${'cancel'}
              .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}>
              ${lockedString(UIStringsNotTranslate.cancel)}
            </devtools-button>` : nothing}
            <devtools-button
              aria-details="info-tooltip"
              .iconName=${'info'}
              .variant=${"icon" /* Buttons.Button.Variant.ICON */}
              ></devtools-button>
            <devtools-tooltip variant="rich" id="info-tooltip" ${Directives.ref(output.tooltipRef)}>
              <div class="info-tooltip-container">
                ${input.disclaimerTooltipText}
                <button
                  class="link tooltip-link"
                  role="link"
                  jslog=${VisualLogging.link('open-ai-settings').track({
                    click: true,
                })}
                  @click=${input.onLearnMoreTooltipClick}
                >${lockedString(UIStringsNotTranslate.learnMore)}</button>
              </div>
            </devtools-tooltip>
          </div>
        </div>`;
            }
            render(html `
          <details class=${classMap({
                'change-summary': true,
                'saved-to-disk': Boolean(input.savedToDisk)
            })}>
            <summary>
              ${renderHeader()}
            </summary>
            ${renderContent()}
            ${renderFooter()}
          </details>
        `, target, { host: target });
        });
        // clang-format on
        this.requestUpdate();
    }
    #onLearnMoreTooltipClick() {
        this.#viewOutput.tooltipRef?.value?.hidePopover();
        void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
    }
    performUpdate() {
        this.#view({
            workspaceDiff: this.#workspaceDiff,
            changeSummary: this.changeSummary,
            patchSuggestionState: this.#patchSuggestionState,
            sources: this.#patchSources,
            savedToDisk: this.#savedToDisk,
            disclaimerTooltipText: this.#noLogging ? lockedString(UIStringsNotTranslate.disclaimerTooltipNoLogging) :
                lockedString(UIStringsNotTranslate.disclaimerTooltip),
            onLearnMoreTooltipClick: this.#onLearnMoreTooltipClick.bind(this),
            onApplyToPageTree: this.#onApplyToPageTree.bind(this),
            onCancel: () => {
                this.#applyPatchAbortController?.abort();
            },
            onDiscard: this.#onDiscard.bind(this),
            onSaveToWorkspace: this.#canSaveToWorkspace() ? this.#onSaveToWorkspace.bind(this) : undefined,
        }, this.#viewOutput, this.contentElement);
    }
    wasShown() {
        super.wasShown();
        if (isAiAssistancePatchingEnabled()) {
            // @ts-expect-error temporary global function for local testing.
            window.aiAssistanceTestPatchPrompt = async (changeSummary) => {
                return await this.#applyPatch(changeSummary);
            };
        }
    }
    async #onApplyToPageTree() {
        if (!isAiAssistancePatchingEnabled()) {
            return;
        }
        const changeSummary = this.changeSummary;
        if (!changeSummary) {
            throw new Error('Change summary does not exist');
        }
        this.#patchSuggestionState = PatchSuggestionState.LOADING;
        this.requestUpdate();
        const { response, processedFiles } = await this.#applyPatch(changeSummary);
        if (response?.type === "answer" /* AiAssistanceModel.ResponseType.ANSWER */) {
            await this.changeManager?.stashChanges();
            this.#patchSuggestionState = PatchSuggestionState.SUCCESS;
        }
        else if (response?.type === "error" /* AiAssistanceModel.ResponseType.ERROR */ &&
            response.error === "abort" /* AiAssistanceModel.ErrorType.ABORT */) {
            // If this is an abort error, we're returning back to the initial state.
            this.#patchSuggestionState = PatchSuggestionState.INITIAL;
        }
        else {
            this.#patchSuggestionState = PatchSuggestionState.ERROR;
        }
        this.#patchSources = `Filenames in page.
Files:
${processedFiles.map(filename => `* ${filename}`).join('\n')}`;
        this.requestUpdate();
    }
    #onDiscard() {
        this.#workspaceDiff.modifiedUISourceCodes().forEach(modifiedUISourceCode => {
            modifiedUISourceCode.resetWorkingCopy();
        });
        this.#patchSuggestionState = PatchSuggestionState.INITIAL;
        this.#patchSources = undefined;
        void this.changeManager?.popStashedChanges();
        this.requestUpdate();
    }
    #canSaveToWorkspace() {
        if (this.#patchSuggestionState !== PatchSuggestionState.SUCCESS) {
            return false;
        }
        // TODO(crbug.com/406699819): investigate why the inspector-stylesheet shows up here
        const filteredModifiedUISourceCodes = this.#workspaceDiff.modifiedUISourceCodes().filter(sourceCode => sourceCode.origin() !== 'inspector://');
        return filteredModifiedUISourceCodes.length > 0 &&
            filteredModifiedUISourceCodes.every(sourceCode => this.#persistence.binding(sourceCode));
    }
    #onSaveToWorkspace() {
        this.#workspaceDiff.modifiedUISourceCodes().forEach(modifiedUISourceCode => {
            const binding = this.#persistence.binding(modifiedUISourceCode);
            if (binding) {
                binding.fileSystem.commitWorkingCopy();
            }
        });
        this.#savedToDisk = true;
        void this.changeManager?.dropStashedChanges();
        this.requestUpdate();
    }
    async #applyPatch(changeSummary) {
        this.#applyPatchAbortController = new AbortController();
        const agent = new AiAssistanceModel.PatchAgent({
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: false,
        });
        const { responses, processedFiles } = await agent.applyChanges(changeSummary, { signal: this.#applyPatchAbortController.signal });
        return {
            response: responses.at(-1),
            processedFiles,
        };
    }
}
export function isAiAssistancePatchingEnabled() {
    return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.patching);
}
//# sourceMappingURL=PatchWidget.js.map