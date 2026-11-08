// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as CommentManager from '../../models/comment_manager/comment_manager.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as CommonPanels from '../common/common.js';
import commentsPaneStyles from './commentsPane.css.js';
const { html, render, i18nTemplate, Directives: { classMap, ref, repeat } } = Lit;
const { widget } = UI.Widget;
const { computeCommentTitle, inputDisclaimer } = CommonPanels.CommentThreadWidget;
const UIStrings = {
    /**
     * @description Tooltip text for clearing all comments.
     */
    clearComments: 'Clear all comments',
    /**
     * @description Title of the empty state shown in the Comments panel when there are no queued comments.
     */
    noQueuedComments: 'No queued comments',
    /**
     * @description Title of the empty state shown in the Comments panel when there are no comments at all.
     */
    noComments: 'No comments',
    /**
     * @description Description in the empty state of the Comments panel. PH1 is the comment mode icon, the same icon as
     * the button that turns on comment mode.
     * @example {(comment icon)} PH1
     */
    emptyStateDescription: 'Use {PH1} to select an element and send tasks, questions, and context to your coding agent',
    /**
     * @description Accessible name of the comment mode icon shown inside the empty state description of the Comments panel.
     */
    commentModeIcon: 'Comment mode',
    /**
     * @description Link in the empty state of the Comments panel that turns on comment mode so the user can add a comment.
     */
    addComment: 'Add a comment',
    /**
     * @description Tooltip and aria-label for deleting a comment thread.
     */
    deleteComment: 'Delete comment',
    /**
     * @description Button text for sending comments to the agent.
     */
    sendToAgent: 'Send to Agent',
    /**
     * @description Status text shown next to a spinner when a comment thread is being processed by the agent.
     */
    working: 'Working',
    /**
     * @description Status text shown next to a checkmark when a comment thread has been sent but not yet picked up by
     * the agent.
     */
    sentStatus: 'Sent',
    /**
     * @description Alt text for the checkmark icon shown on a comment thread that has been sent but not yet picked up
     * by the agent.
     */
    sentCheckmark: 'Sent checkmark',
    /**
     * @description Button text shown on resolved comment threads to view the agent response.
     */
    seeResponse: 'See response',
    /**
     * @description Tab label for queued comments in the comments drawer.
     */
    queued: 'Queued',
    /**
     * @description Tab label for sent and resolved comments in the comments drawer.
     */
    sent: 'Sent',
    /**
     * @description Label shown next to an element anchor in the comments drawer when the target DOM node has been removed or can no longer be found.
     */
    removed: 'removed',
    /**
     * @description Text in the bar that visually separates the queued comments from the comments already sent to the agent in the comments drawer.
     */
    sentComments: 'Sent comments',
};
const str_ = i18n.i18n.registerUIStrings('panels/comments/CommentsPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const TOGGLE_COMMENT_MODE_ACTION_ID = 'comments.toggle-comment-mode';
function renderThreadStatus(thread, onDeleteThread) {
    // clang-format off
    switch (thread.status) {
        case 'SENT_TO_AGENT':
            if (!thread.transmitted) {
                return html `
          <div class="thread-status-sent">
            <devtools-icon
              class="check-icon"
              name="checkmark"
              aria-label=${i18nString(UIStrings.sentCheckmark)}>
            </devtools-icon>
            <span>${i18nString(UIStrings.sentStatus)}</span>
          </div>
        `;
            }
            return html `
        <div class="thread-status-working">
          <devtools-spinner></devtools-spinner>
          <span>${i18nString(UIStrings.working)}</span>
        </div>
      `;
        case 'RESOLVED':
            return html `
        <devtools-button
          class="see-response-button"
          .data=${{
                variant: "text" /* Buttons.Button.Variant.TEXT */,
                jslogContext: 'comments-see-response',
            }}
          @keydown=${(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                }
            }}
        >${i18nString(UIStrings.seeResponse)}</devtools-button>
      `;
        case 'ACTIVE':
            return html `
        <devtools-button
          .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                iconName: 'bin',
                title: i18nString(UIStrings.deleteComment),
                jslogContext: 'delete',
            }}
          @click=${(e) => {
                e.stopPropagation();
                onDeleteThread(thread.id);
            }}
          @keydown=${(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                }
            }}
        ></devtools-button>
      `;
        default:
            return Lit.nothing;
    }
    // clang-format on
}
export const DEFAULT_VIEW = (input, output, target) => {
    const isQueued = input.activeTab === 'queued';
    const isSent = input.activeTab === 'sent';
    const hasThreads = input.queuedThreads.length > 0 || input.sentThreads.length > 0;
    let sentSection;
    output.scrollToSection = (tab, { animate }) => {
        const { scrollContainer } = output;
        const top = tab === 'queued' ? 0 : sentSection?.offsetTop;
        if (!scrollContainer || top === undefined || Math.abs(top - scrollContainer.scrollTop) < 1) {
            return false;
        }
        scrollContainer.scrollTo({ top, behavior: animate ? 'smooth' : 'instant' });
        return animate;
    };
    // "Sent" once the sent section has scrolled up to the top edge of the list.
    output.sectionAtTop = () => {
        const { scrollContainer } = output;
        return scrollContainer && sentSection && sentSection.offsetTop - scrollContainer.scrollTop <= 1 ? 'sent' : 'queued';
    };
    const onThreadClick = (e, thread) => {
        const rowEl = e.currentTarget;
        const rowRect = rowEl.getBoundingClientRect();
        const badgeRect = rowEl.querySelector('.comment-pin-badge')?.getBoundingClientRect();
        input.onThreadClick(thread, { left: badgeRect?.left ?? rowRect.left, top: rowRect.top });
    };
    // clang-format off
    const renderThreadList = (threads, className) => html `
    <ul class="comments-list ${className}" role="list">
      ${repeat(threads, item => item.thread.id, item => html `
          <li
            class="comment-thread-item ${item.thread.isOrphaned ? 'orphaned' : ''}"
            role="listitem"
            tabindex="0"
            @click=${(e) => onThreadClick(e, item.thread)}
            @keydown=${(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onThreadClick(e, item.thread);
        }
    }}
            jslog=${VisualLogging.item('comment-thread').track({ click: true })}>
            <div
              class=${classMap({
        'comment-pin-badge': true,
        resolved: item.thread.status === 'RESOLVED',
    })}
              aria-hidden="true">
            </div>
            <span class="anchor-chip ${item.thread.isOrphaned ? 'orphaned' : ''}">
              ${'node' in item.title ?
        widget(CommonPanels.DOMLinkifier.DOMNodeLink, {
            node: item.title.node,
            options: { preventKeyboardFocus: true, disabled: item.thread.isOrphaned },
        }) :
        html `<span class="anchor-chip-text">${item.title.text}</span>`}
              ${item.thread.isOrphaned ?
        html `<span class="orphaned-label">(${i18nString(UIStrings.removed)})</span>` :
        Lit.nothing}
            </span>
            <div class="comment-text">${item.commentText}</div>
            ${renderThreadStatus(item.thread, input.onDeleteThread)}
          </li>
        `)}
    </ul>
  `;
    const renderFooter = () => html `
    <div class="comments-footer">
      <devtools-icon
        class="info-icon"
        name="info"
        aria-label="Info"
        aria-details="comments-pane-info-tooltip"
        tabindex="0"
      ></devtools-icon>
      <devtools-tooltip
        id="comments-pane-info-tooltip"
        variant="rich"
      >
        <div class="info-tooltip-container">
          ${inputDisclaimer()}
        </div>
      </devtools-tooltip>
      <button
        class="send-agent-button"
        @click=${input.onSendToAgent}
        jslog=${VisualLogging.action('comments-send-to-agent').track({ click: true })}>
        ${i18nString(UIStrings.sendToAgent)}
      </button>
    </div>
  `;
    const renderEmptyState = (title) => html `
    <div class="comments-empty-state">
      <div class="comments-empty-state-title">${title}</div>
      <div class="comments-empty-state-description">
        ${i18nTemplate(str_, UIStrings.emptyStateDescription, {
        PH1: html `<devtools-icon
            class="comments-empty-state-icon"
            name="comment-mode"
            role="img"
            aria-label=${i18nString(UIStrings.commentModeIcon)}
          ></devtools-icon>`,
    })}
      </div>
      <devtools-button
        class="comments-empty-state-link"
        .data=${{
        variant: "text" /* Buttons.Button.Variant.TEXT */,
        jslogContext: 'comments-add-comment',
    }}
        @click=${input.onAddComment}
      >${i18nString(UIStrings.addComment)}</devtools-button>
    </div>
  `;
    render(html `
    <style>${commentsPaneStyles}</style>
    <div class="comments-container" role="region" aria-label="Comments" jslog=${VisualLogging.panel('comments').track({ resize: true })}>
      <div class="comments-toolbar" role="toolbar" jslog=${VisualLogging.toolbar('comments-drawer')}>
        <div class="toolbar-left">
          <button
            class="tab-button ${isQueued ? 'active' : ''}"
            aria-current=${isQueued ? 'location' : 'false'}
            @click=${() => input.onTabClick('queued')}
            jslog=${VisualLogging.sectionHeader('queued').track({ click: true })}>
            ${i18nString(UIStrings.queued)}
          </button>
          <button
            class="tab-button ${isSent ? 'active' : ''}"
            aria-current=${isSent ? 'location' : 'false'}
            @click=${() => input.onTabClick('sent')}
            jslog=${VisualLogging.sectionHeader('sent').track({ click: true })}>
            ${i18nString(UIStrings.sent)}
          </button>
        </div>
        <button
          class="toolbar-button"
          title=${i18nString(UIStrings.clearComments)}
          aria-label=${i18nString(UIStrings.clearComments)}
          @click=${input.onClearAll}
          jslog=${VisualLogging.action('clear-comments').track({ click: true })}>
          <devtools-icon name="clear"></devtools-icon>
        </button>
      </div>

      ${hasThreads ? html `
        <div
          class="comments-scroll-container"
          ${ref(element => {
        output.scrollContainer = element;
    })}
          @scroll=${input.onScroll}
          @scrollend=${input.onScrollEnd}>
          <div class="comments-queued-section">
            ${input.queuedThreads.length > 0 ? html `
              ${renderThreadList(input.queuedThreads, 'comments-queued-list')}
              ${renderFooter()}
            ` : renderEmptyState(i18nString(UIStrings.noQueuedComments))}
          </div>
          ${input.sentThreads.length > 0 ? html `
            <div class="comments-sent-section" ${ref(element => {
        sentSection = element;
    })}>
              <div class="comments-sent-separator" role="separator" aria-label=${i18nString(UIStrings.sentComments)}>
                ${i18nString(UIStrings.sentComments)}
              </div>
              ${renderThreadList(input.sentThreads, 'comments-sent-list')}
            </div>
          ` : Lit.nothing}
        </div>
      ` : renderEmptyState(i18nString(UIStrings.noComments))}
    </div>
  `, target);
    // clang-format on
};
export class CommentsPane extends UI.Widget.Widget {
    static INJECT = [
        CommentManager.CommentManager.CommentManager,
    ];
    #view;
    #commentManager;
    #cachedTitles = new WeakMap();
    #viewOutput = {};
    #activeTab = 'queued';
    // Set while a tab click smoothly scrolls the list. Scroll events then don't
    // change the highlighted tab, so it doesn't flicker on the way.
    #scrollingToTab = false;
    // Whether the previous render had sent comments and nothing queued. We jump
    // to Sent only when this changes from false to true. Without it, every update
    // (e.g. the agent resolving a thread) would jump back to Sent even after the
    // user clicked Queued or scrolled up.
    #onlySentComments = false;
    constructor(element, [commentManager] = [
        new CommentManager.CommentManager.CommentManager(),
    ], view = DEFAULT_VIEW) {
        super(element);
        this.#view = view;
        this.#commentManager = commentManager;
    }
    #onThreadsChanged = () => {
        this.requestUpdate();
    };
    wasShown() {
        super.wasShown();
        this.#commentManager.addEventListener("CommentThreadsChanged" /* CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED */, this.#onThreadsChanged, this);
        // Re-evaluated on the next render, so that opening the drawer with only
        // sent comments shows them at the top.
        this.#onlySentComments = false;
        this.requestUpdate();
    }
    /**
     * Lets `UI.Widget` store the list's scroll position when the drawer is hidden
     * and restore it when it is shown again.
     */
    elementsToRestoreScrollPositionsFor() {
        const { scrollContainer } = this.#viewOutput;
        return scrollContainer ? [this.element, scrollContainer] : [this.element];
    }
    willHide() {
        this.#scrollingToTab = false;
        this.#commentManager.removeEventListener("CommentThreadsChanged" /* CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED */, this.#onThreadsChanged, this);
        super.willHide();
    }
    #setActiveTab(tab) {
        if (this.#activeTab === tab) {
            return;
        }
        this.#activeTab = tab;
        this.requestUpdate();
    }
    #handleTabClick = (tab) => {
        this.#scrollingToTab = this.#viewOutput.scrollToSection?.(tab, { animate: true }) ?? false;
        this.#setActiveTab(tab);
    };
    #handleScroll = () => {
        if (!this.#scrollingToTab && this.#viewOutput.sectionAtTop) {
            this.#setActiveTab(this.#viewOutput.sectionAtTop());
        }
    };
    // Fires when a tab-click scroll finishes or the user interrupts it.
    #handleScrollEnd = () => {
        this.#scrollingToTab = false;
        this.#handleScroll();
    };
    #handleClearAll = () => {
        this.#commentManager.clear();
        this.requestUpdate();
    };
    #handleThreadClick = (thread, position) => {
        // Generated comments can only be revealed once resolved, to read the response.
        if (thread.isGeneratedComment && thread.status !== 'RESOLVED') {
            return;
        }
        void Common.Revealer.reveal(new CommentManager.CommentThread.RevealableThread(thread, position));
    };
    #handleDeleteThread = (threadId) => {
        this.#commentManager.removeCommentThread(threadId);
        this.requestUpdate();
    };
    #handleSendToAgent = () => {
        this.#commentManager.sendQueuedThreads();
    };
    #handleAddComment = () => {
        const actionRegistry = UI.ActionRegistry.ActionRegistry.instance();
        if (this.#commentManager.isCommentMode() || !actionRegistry.hasAction(TOGGLE_COMMENT_MODE_ACTION_ID)) {
            return;
        }
        void actionRegistry.getAction(TOGGLE_COMMENT_MODE_ACTION_ID).execute();
    };
    async #toViewData(thread) {
        let title = this.#cachedTitles.get(thread);
        if (!title) {
            title = await computeCommentTitle(thread.anchor);
            this.#cachedTitles.set(thread, title);
        }
        return {
            thread,
            title,
            commentText: thread.comments[0]?.text ?? '',
        };
    }
    async performUpdate(signal) {
        const allThreads = this.#commentManager.getCommentThreads();
        const queued = allThreads.filter(thread => thread.status === 'ACTIVE');
        const sent = allThreads.filter(thread => thread.status === 'SENT_TO_AGENT' || thread.status === 'RESOLVED');
        const [queuedThreads, sentThreads] = await Promise.all([
            Promise.all(queued.map(thread => this.#toViewData(thread))),
            Promise.all(sent.map(thread => this.#toViewData(thread))),
        ]);
        if (signal?.aborted) {
            return;
        }
        // When the list switches to only sent comments (on open, or e.g. after
        // sending the last queued comment), show the sent comments at the top.
        const onlySentComments = queuedThreads.length === 0 && sentThreads.length > 0;
        const showSentComments = onlySentComments && !this.#onlySentComments;
        this.#onlySentComments = onlySentComments;
        if (showSentComments) {
            this.#activeTab = 'sent';
        }
        else if (sentThreads.length === 0) {
            this.#activeTab = 'queued';
        }
        const viewInput = {
            activeTab: this.#activeTab,
            queuedThreads,
            sentThreads,
            onTabClick: this.#handleTabClick,
            onScroll: this.#handleScroll,
            onScrollEnd: this.#handleScrollEnd,
            onClearAll: this.#handleClearAll,
            onThreadClick: this.#handleThreadClick,
            onDeleteThread: this.#handleDeleteThread,
            onSendToAgent: this.#handleSendToAgent,
            onAddComment: this.#handleAddComment,
        };
        this.#view(viewInput, this.#viewOutput, this.contentElement);
        if (showSentComments) {
            this.#viewOutput.scrollToSection?.('sent', { animate: false });
        }
    }
}
//# sourceMappingURL=CommentsPane.js.map