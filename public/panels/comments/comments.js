var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/comments/CommentsPane.ts
var CommentsPane_exports = {};
__export(CommentsPane_exports, {
  CommentsPane: () => CommentsPane,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import "../../ui/components/spinners/spinners.js";
import "../../ui/components/tooltips/tooltips.js";
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as CommentManager from "../../models/comment_manager/comment_manager.js";
import * as Buttons from "../../ui/components/buttons/buttons.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as Lit from "../../ui/lit/lit.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";
import * as CommonPanels from "../common/common.js";

// gen/front_end/panels/comments/commentsPane.css.js
var commentsPane_css_default = `/*
 * Copyright 2026 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .comments-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .comments-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--sys-size-13);
    padding: 0 var(--sys-size-5);
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
    background-color: var(--sys-color-surface1);
    flex-shrink: 0;
  }

  .toolbar-left {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--sys-size-8);
    padding-left: var(--sys-size-3);
  }

  .tab-button {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 var(--sys-size-2);
    border: none;
    background: transparent;
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body4-size);
    font-weight: var(--ref-typeface-weight-regular);
    cursor: pointer;
  }

  .tab-button:hover {
    color: var(--sys-color-on-surface);
  }

  .tab-button:focus-visible {
    outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
    outline-offset: calc(-1 * var(--sys-size-2));
  }

  .tab-button.active {
    color: var(--sys-color-primary);
    font-weight: var(--ref-typeface-weight-bold);
  }

  .tab-button.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--sys-size-2);
    background-color: var(--sys-color-primary);
    border-radius: var(--sys-shape-corner-full) var(--sys-shape-corner-full) 0 0;
  }

  .toolbar-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sys-size-11);
    height: var(--sys-size-11);
    padding: 0;
    border: none;
    background: transparent;
    border-radius: var(--sys-shape-corner-extra-small);
    cursor: pointer;
    color: var(--sys-color-on-surface-subtle);
  }

  .toolbar-button:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
    color: var(--sys-color-on-surface);
  }

  .toolbar-button:active {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
  }

  .comments-list {
    flex: 1;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .comment-thread-item {
    display: flex;
    align-items: center;
    gap: var(--sys-size-5);
    padding: var(--sys-size-5) var(--sys-size-8);
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
    cursor: pointer;
    transition: background-color var(--sys-motion-duration-short4) var(--sys-motion-easing-emphasized);
  }

  .comment-thread-item:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  .comment-thread-item:focus-visible {
    background-color: var(--sys-color-state-hover-on-subtle);
    outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
    outline-offset: calc(-1 * var(--sys-size-2));
  }

  .comment-pin-badge {
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    margin-right: var(--sys-size-2);
    border-radius: var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-extra-small);
    background-color: var(--sys-color-primary);
    flex-shrink: 0;
  }

  .comment-thread-item.orphaned .comment-pin-badge {
    background-color: var(--sys-color-surface-variant);
    color: var(--sys-color-on-surface-subtle);
  }

  .anchor-chip {
    display: flex;
    height: calc(var(--sys-size-8) + var(--sys-size-2));
    padding: var(--sys-size-2) var(--sys-size-4) var(--sys-size-2) var(--sys-size-3);
    align-items: center;
    border-radius: var(--sys-shape-corner-extra-small);
    border: var(--sys-size-1) solid var(--sys-color-divider);
    background: var(--sys-color-surface2);
    font-family: var(--source-code-font-family);
    font-size: var(--monospace-font-size);
    color: var(--sys-color-token-tag);
    overflow: hidden;
    max-width: var(--sys-size-24);
    min-width: 0;
    flex-shrink: 0;
    pointer-events: none;
  }

  .anchor-chip.orphaned {
    border-style: dashed;
    border-color: var(--sys-color-neutral-outline);
    background: transparent;
    color: var(--sys-color-state-disabled);
    gap: var(--sys-size-3);
  }

  .anchor-chip.orphaned .anchor-chip-text {
    color: var(--sys-color-state-disabled);
  }

  .orphaned-label {
    flex-shrink: 0;
    color: var(--sys-color-on-surface-subtle);
    font-family: var(--default-font-family);
    font-size: var(--sys-typescale-body5-size);
    font-style: italic;
  }

  .anchor-chip devtools-widget,
  .anchor-chip-text {
    display: block;
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .comment-text {
    flex: 1;
    font-size: var(--sys-typescale-body4-size);
    line-height: var(--sys-typescale-body4-line-height);
    color: var(--sys-color-on-surface);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thread-status-working {
    display: flex;
    align-items: center;
    gap: var(--sys-size-4);
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body4-size);
    line-height: var(--sys-typescale-body4-line-height);
    font-weight: var(--ref-typeface-weight-medium);
    white-space: nowrap;
  }

  .comments-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body3-size);
    padding: var(--sys-size-13);
    text-align: center;
  }

  .comments-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sys-size-5);
    padding: var(--sys-size-5) var(--sys-size-8);
    border-top: var(--sys-size-1) solid var(--sys-color-divider);
    flex-shrink: 0;
  }

  .info-icon {
    color: var(--sys-color-on-surface-subtle);
    cursor: pointer;
  }

  .info-tooltip-container {
    max-width: var(--sys-size-28);
    padding: var(--sys-size-4) var(--sys-size-5);
  }

  .send-agent-button {
    background-color: var(--sys-color-primary);
    color: var(--sys-color-on-primary);
    border: none;
    border-radius: var(--sys-shape-corner-full);
    padding: var(--sys-size-4) var(--sys-size-8);
    font-size: var(--sys-typescale-body4-size);
    font-weight: var(--ref-typeface-weight-medium);
    cursor: pointer;
    transition: background-color var(--sys-motion-duration-short4) var(--sys-motion-easing-emphasized), box-shadow var(--sys-motion-duration-short4) var(--sys-motion-easing-emphasized);
  }

  .send-agent-button:hover {
    background-color: var(--sys-color-primary-bright);
    box-shadow: var(--sys-elevation-level1);
  }

  .send-agent-button:disabled {
    background-color: var(--sys-color-state-disabled-container);
    color: var(--sys-color-state-disabled);
    cursor: default;
    box-shadow: none;
  }
}

/*# sourceURL=${import.meta.resolve("./commentsPane.css")} */`;

// ../../front_end/panels/comments/CommentsPane.ts
var { html, render, Directives: { repeat } } = Lit;
var { widget } = UI.Widget;
var { computeCommentTitle } = CommonPanels.CommentThreadWidget;
var UIStrings = {
  /**
   * @description Tooltip text for clearing all comments.
   */
  clearComments: "Clear all comments",
  /**
   * @description Text displayed when there are no queued comments to show in the queued tab of the Comments panel.
   */
  noQueuedComments: "No queued comments. Add comments on elements in DevTools to send to your AI coding agent.",
  /**
   * @description Text displayed when there are no sent comments to show in the sent tab of the Comments panel.
   */
  noSentComments: "No sent comments. Send comments to your AI coding agent to see them here.",
  /**
   * @description Tooltip and aria-label for deleting a comment thread.
   */
  deleteComment: "Delete comment",
  /**
   * @description Button text for sending comments to the agent.
   */
  sendToAgent: "Send to Agent",
  /**
   * @description Status text shown next to a spinner when a comment thread is being processed by the agent.
   */
  working: "Working",
  /**
   * @description Button text shown on resolved comment threads to view the agent response.
   */
  seeResponse: "See response",
  /**
   * @description Tab label for queued comments in the comments drawer.
   */
  queued: "Queued",
  /**
   * @description Tab label for sent and resolved comments in the comments drawer.
   */
  sent: "Sent",
  /**
   * @description Label shown next to an element anchor in the comments drawer when the target DOM node has been removed or can no longer be found.
   */
  removed: "removed"
};
var UIStringsNotTranslate = {
  /**
   * @description Disclaimer text in the comments pane info tooltip.
   */
  inputDisclaimer: "Comment strings, DOM hierarchy snippets, tracked CSS and DOM changes, Visual Element (VE) paths and signatures, and tracked presenter changes are sent to the connected third-party agent to assist with debugging and code updates"
};
var str_ = i18n.i18n.registerUIStrings("panels/comments/CommentsPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var lockedString = i18n.i18n.lockedString;
function renderThreadStatus(thread, onDeleteThread) {
  switch (thread.status) {
    case "SENT_TO_AGENT":
      return html`
        <div class="thread-status-working">
          <devtools-spinner></devtools-spinner>
          <span>${i18nString(UIStrings.working)}</span>
        </div>
      `;
    case "RESOLVED":
      return html`
        <devtools-button
          .data=${{
        variant: Buttons.Button.Variant.TEXT,
        jslogContext: "comments-see-response"
      }}
          @keydown=${(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
        }
      }}
        >${i18nString(UIStrings.seeResponse)}</devtools-button>
      `;
    case "ACTIVE":
      return html`
        <devtools-button
          .data=${{
        variant: Buttons.Button.Variant.ICON,
        iconName: "bin",
        title: i18nString(UIStrings.deleteComment),
        jslogContext: "delete"
      }}
          @click=${(e) => {
        e.stopPropagation();
        onDeleteThread(thread.id);
      }}
          @keydown=${(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
        }
      }}
        ></devtools-button>
      `;
    default:
      return Lit.nothing;
  }
}
var DEFAULT_VIEW = (input, _output, target) => {
  const isQueued = input.activeTab === "queued";
  const isSent = input.activeTab === "sent";
  const onThreadClick = (e, thread) => {
    const rowEl = e.currentTarget;
    const rowRect = rowEl.getBoundingClientRect();
    const badgeRect = rowEl.querySelector(".comment-pin-badge")?.getBoundingClientRect();
    input.onThreadClick(thread, { left: badgeRect?.left ?? rowRect.left, top: rowRect.top });
  };
  render(html`
    <style>${commentsPane_css_default}</style>
    <div class="comments-container" role="region" aria-label="Comments" jslog=${VisualLogging.panel("comments").track({ resize: true })}>
      <div class="comments-toolbar" role="toolbar" jslog=${VisualLogging.toolbar("comments-drawer")}>
        <div class="toolbar-left" role="tablist">
          <button
            class="tab-button ${isQueued ? "active" : ""}"
            role="tab"
            aria-selected=${isQueued}
            @click=${() => input.onTabSelect("queued")}
            jslog=${VisualLogging.sectionHeader("queued").track({ click: true })}>
            ${i18nString(UIStrings.queued)}
          </button>
          <button
            class="tab-button ${isSent ? "active" : ""}"
            role="tab"
            aria-selected=${isSent}
            @click=${() => input.onTabSelect("sent")}
            jslog=${VisualLogging.sectionHeader("sent").track({ click: true })}>
            ${i18nString(UIStrings.sent)}
          </button>
        </div>
        <button
          class="toolbar-button"
          title=${i18nString(UIStrings.clearComments)}
          aria-label=${i18nString(UIStrings.clearComments)}
          @click=${input.onClearAll}
          jslog=${VisualLogging.action("clear-comments").track({ click: true })}>
          <devtools-icon name="clear"></devtools-icon>
        </button>
      </div>

      ${input.threads.length === 0 ? html`
        <div class="comments-empty-state">
          <p>${isQueued ? i18nString(UIStrings.noQueuedComments) : i18nString(UIStrings.noSentComments)}</p>
        </div>
      ` : html`
        <ul class="comments-list" role="list">
          ${repeat(
    input.threads,
    (item2) => item2.thread.id,
    (item2) => html`
              <li
                class="comment-thread-item ${item2.thread.isOrphaned ? "orphaned" : ""}"
                role="listitem"
                tabindex="0"
                @click=${(e) => onThreadClick(e, item2.thread)}
                @keydown=${(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onThreadClick(e, item2.thread);
      }
    }}
                jslog=${VisualLogging.item("comment-thread").track({ click: true })}>
                <div class="comment-pin-badge" aria-hidden="true"></div>
                <span class="anchor-chip ${item2.thread.isOrphaned ? "orphaned" : ""}">
                  ${"node" in item2.title ? widget(CommonPanels.DOMLinkifier.DOMNodeLink, { node: item2.title.node, options: { preventKeyboardFocus: true, disabled: item2.thread.isOrphaned } }) : html`<span class="anchor-chip-text">${item2.title.text}</span>`}
                  ${item2.thread.isOrphaned ? html`<span class="orphaned-label">(${i18nString(UIStrings.removed)})</span>` : Lit.nothing}
                </span>
                <div class="comment-text">${item2.commentText}</div>
                ${renderThreadStatus(item2.thread, input.onDeleteThread)}
              </li>
            `
  )}
        </ul>
      `}

      ${isQueued ? html`
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
              ${lockedString(UIStringsNotTranslate.inputDisclaimer)}
            </div>
          </devtools-tooltip>
          <button
            class="send-agent-button"
            ?disabled=${input.threads.length === 0}
            @click=${input.onSendToAgent}
            jslog=${VisualLogging.action("comments-send-to-agent").track({ click: true })}>
            ${i18nString(UIStrings.sendToAgent)}
          </button>
        </div>
      ` : Lit.nothing}
    </div>
  `, target);
};
var CommentsPane = class extends UI.Widget.Widget {
  static INJECT = [
    CommentManager.CommentManager.CommentManager
  ];
  #view;
  #commentManager;
  #cachedTitles = /* @__PURE__ */ new Map();
  #activeTab = "queued";
  constructor(element, [commentManager] = [
    new CommentManager.CommentManager.CommentManager()
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
    this.#commentManager.addEventListener(
      CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED,
      this.#onThreadsChanged,
      this
    );
    this.requestUpdate();
  }
  willHide() {
    this.#commentManager.removeEventListener(
      CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED,
      this.#onThreadsChanged,
      this
    );
    super.willHide();
  }
  #handleTabSelect = (tab) => {
    if (this.#activeTab === tab) {
      return;
    }
    this.#activeTab = tab;
    this.requestUpdate();
  };
  #handleClearAll = () => {
    this.#cachedTitles.clear();
    this.#commentManager.clear();
    this.requestUpdate();
  };
  #handleThreadClick = (thread, position) => {
    void Common.Revealer.reveal(new CommentManager.CommentThread.RevealableThread(thread, position));
  };
  #handleDeleteThread = (threadId) => {
    this.#cachedTitles.delete(threadId);
    this.#commentManager.removeCommentThread(threadId);
    this.requestUpdate();
  };
  #handleSendToAgent = () => {
    this.#commentManager.sendQueuedThreads();
  };
  async performUpdate(signal) {
    let rawThreads;
    if (this.#activeTab === "queued") {
      rawThreads = this.#commentManager.getCommentThreads().filter((thread) => thread.status === "ACTIVE");
    } else {
      rawThreads = this.#commentManager.getCommentThreads().filter((thread) => thread.status === "SENT_TO_AGENT" || thread.status === "RESOLVED");
    }
    const threadViewData = await Promise.all(
      rawThreads.map(async (thread) => {
        let title = this.#cachedTitles.get(thread.id);
        if (!title) {
          title = await computeCommentTitle(thread.anchor);
          this.#cachedTitles.set(thread.id, title);
        }
        return {
          thread,
          title,
          commentText: thread.comments[0]?.text ?? ""
        };
      })
    );
    if (signal?.aborted) {
      return;
    }
    const viewInput = {
      activeTab: this.#activeTab,
      threads: threadViewData,
      onTabSelect: this.#handleTabSelect,
      onClearAll: this.#handleClearAll,
      onThreadClick: this.#handleThreadClick,
      onDeleteThread: this.#handleDeleteThread,
      onSendToAgent: this.#handleSendToAgent
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
};
export {
  CommentsPane_exports as CommentsPane
};
//# sourceMappingURL=comments.js.map
