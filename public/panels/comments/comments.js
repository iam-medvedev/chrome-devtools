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
import "../../ui/components/tooltips/tooltips.js";
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as CommentManager from "../../models/comment_manager/comment_manager.js";
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
    gap: var(--sys-size-3);
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

  .comment-pin-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    margin-right: var(--sys-size-2);
    border-radius: var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-extra-small);
    background-color: var(--sys-color-primary);
    color: var(--sys-color-on-primary);
    font-size: var(--sys-typescale-body5-size);
    font-weight: var(--ref-typeface-weight-bold);
    flex-shrink: 0;
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

  .delete-button {
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
    flex-shrink: 0;
  }

  .delete-button:hover {
    color: var(--sys-color-error);
    background-color: var(--sys-color-state-hover-on-subtle);
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
   * @description Text displayed when there are no comments to show.
   */
  noComments: "No active comments. Add comments on elements in DevTools to send to your AI coding agent.",
  /**
   * @description Tooltip and aria-label for deleting a comment thread.
   */
  deleteComment: "Delete comment",
  /**
   * @description Button text for sending comments to the agent.
   */
  sendToAgent: "Send to Agent"
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
var DEFAULT_VIEW = (input, _output, target) => {
  render(html`
    <style>${commentsPane_css_default}</style>
    <div class="comments-container" role="region" aria-label="Comments" jslog=${VisualLogging.panel("comments").track({ resize: true })}>
      <div class="comments-toolbar" role="toolbar" jslog=${VisualLogging.toolbar("comments-drawer")}>
        <div class="toolbar-left">
          <button
            class="toolbar-button"
            title=${i18nString(UIStrings.clearComments)}
            aria-label=${i18nString(UIStrings.clearComments)}
            @click=${input.onClearAll}
            jslog=${VisualLogging.action("clear-comments").track({ click: true })}>
            <devtools-icon name="clear"></devtools-icon>
          </button>
        </div>
      </div>

      ${input.threads.length === 0 ? html`
        <div class="comments-empty-state">
          <p>${i18nString(UIStrings.noComments)}</p>
        </div>
      ` : html`
        <ul class="comments-list" role="list">
          ${repeat(
    input.threads,
    (item2) => item2.thread.id,
    (item2) => html`
              <li
                class="comment-thread-item"
                role="listitem"
                tabindex="0"
                @click=${() => input.onThreadClick(item2.thread)}
                @keydown=${(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        input.onThreadClick(item2.thread);
      }
    }}
                jslog=${VisualLogging.item("comment-thread").track({ click: true })}>
                <div class="comment-pin-badge">${item2.thread.index}</div>
                <span class="anchor-chip">
                  ${"node" in item2.title ? widget(CommonPanels.DOMLinkifier.DOMNodeLink, { node: item2.title.node, options: { preventKeyboardFocus: true } }) : html`<span class="anchor-chip-text">${item2.title.text}</span>`}
                </span>
                <div class="comment-text">${item2.commentText}</div>
                <button
                  class="delete-button"
                  title=${i18nString(UIStrings.deleteComment)}
                  aria-label=${i18nString(UIStrings.deleteComment)}
                  @click=${(e) => {
      e.stopPropagation();
      input.onDeleteThread(item2.thread.id);
    }}
                  jslog=${VisualLogging.action("delete").track({ click: true })}>
                  <devtools-icon name="bin"></devtools-icon>
                </button>
              </li>
            `
  )}
        </ul>
      `}

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
          jslog=${VisualLogging.action("send-to-agent").track({ click: true })}>
          ${i18nString(UIStrings.sendToAgent)}
        </button>
      </div>
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
  #handleClearAll = () => {
    this.#cachedTitles.clear();
    this.#commentManager.clear();
    this.requestUpdate();
  };
  #handleThreadClick = (thread) => {
    void Common.Revealer.reveal(thread);
  };
  #handleDeleteThread = (threadId) => {
    this.#cachedTitles.delete(threadId);
    this.#commentManager.removeCommentThread(threadId);
    this.requestUpdate();
  };
  #handleSendToAgent = () => {
    for (const thread of this.#commentManager.getCommentThreads()) {
      if (thread.status === "ACTIVE") {
        thread.sendToAgent();
      }
    }
  };
  async performUpdate(signal) {
    const rawThreads = this.#commentManager.getCommentThreads().filter((thread) => thread.status !== "DRAFT");
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
      threads: threadViewData,
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
