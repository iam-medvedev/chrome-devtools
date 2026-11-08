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

  /* Queued and sent threads share a single scroll area below the toolbar. */
  .comments-scroll-container {
    /* Offset parent for the sections, so their offsetTop is their scroll position. */
    position: relative;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  /*
   * Only as tall as its content, so the footer follows the last queued row
   * when the queue fits in the panel.
   */
  .comments-queued-section {
    display: flex;
    flex-direction: column;
  }

  .comments-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Extra space between the Send to Agent footer and the sent comments separator. */
  .comments-sent-section {
    margin-top: var(--sys-size-11);
    /*
     * At least as tall as the panel, so the sent comments can always be
     * scrolled to the top of the drawer, even when the content above and the
     * sent list itself are short.
     */
    min-height: 100%;
  }

  /*
   * Looks like a pane header, but only visually separates the queued comments
   * (with their footer) from the comments already sent to the agent.
   */
  .comments-sent-separator {
    padding: var(--sys-size-3) var(--sys-size-5);
    border-top: var(--sys-size-1) solid var(--sys-color-divider);
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
    background-color: var(--sys-color-surface1);
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body4-size);
    line-height: var(--sys-typescale-body4-line-height);
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
    box-sizing: border-box;
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    margin-right: var(--sys-size-2);
    border-radius: var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-full) var(--sys-shape-corner-extra-small);
    border: var(--sys-size-2) solid var(--sys-color-primary);
    background-color: var(--sys-color-cdt-base-container);
    flex-shrink: 0;
  }

  .comment-pin-badge.resolved {
    border: none;
    background-color: var(--sys-color-primary);
  }

  .comment-thread-item.orphaned .comment-pin-badge {
    border-color: var(--sys-color-surface-variant);
  }

  .comment-thread-item.orphaned .comment-pin-badge.resolved {
    background-color: var(--sys-color-surface-variant);
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

  .thread-status-working,
  .thread-status-sent {
    display: flex;
    align-items: center;
    gap: var(--sys-size-4);
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body4-size);
    line-height: var(--sys-typescale-body4-line-height);
    font-weight: var(--ref-typeface-weight-medium);
    white-space: nowrap;
  }

  .thread-status-sent {
    gap: var(--sys-size-2);
  }

  .check-icon {
    width: var(--sys-size-8);
    height: var(--sys-size-8);
    color: var(--sys-color-on-surface-subtle);
  }

  .see-response-button {
    margin-right: calc(-1 * var(--sys-size-6));
  }

  .comments-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Fills the panel when there are no comments at all. */
    flex: 1;
    padding: var(--sys-size-13) var(--sys-size-8);
    text-align: center;
  }

  .comments-empty-state-title {
    margin-bottom: var(--sys-size-4);
    color: var(--sys-color-on-surface);
    font-size: var(--sys-typescale-headline5-size);
    line-height: var(--sys-typescale-headline5-line-height);
    font-weight: var(--ref-typeface-weight-medium);
  }

  .comments-empty-state-description {
    max-width: var(--sys-size-29);
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body3-size);
    line-height: var(--sys-typescale-body3-line-height);
    text-wrap: balance;
  }

  .comments-empty-state-icon {
    width: var(--sys-size-8);
    height: var(--sys-size-8);
    vertical-align: text-bottom;
    color: var(--sys-color-on-surface-subtle);
  }

  .comments-empty-state-link {
    margin-top: var(--sys-size-3);
  }

  /*
   * Sticks to the bottom of the panel while the queued rows overflow it, and
   * scrolls up with the end of the queued section once the sent rows are reached.
   */
  .comments-footer {
    position: sticky;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sys-size-5);
    /* Overlap the last queued row's bottom border so only a single divider is shown. */
    margin-top: calc(-1 * var(--sys-size-1));
    padding: var(--sys-size-5) var(--sys-size-8);
    border-top: var(--sys-size-1) solid var(--sys-color-divider);
    background-color: var(--sys-color-cdt-base-container);
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
}

/*# sourceURL=${import.meta.resolve("./commentsPane.css")} */`;

// ../../front_end/panels/comments/CommentsPane.ts
var { html, render, i18nTemplate, Directives: { classMap, ref, repeat } } = Lit;
var { widget } = UI.Widget;
var { computeCommentTitle, inputDisclaimer } = CommonPanels.CommentThreadWidget;
var UIStrings = {
  /**
   * @description Tooltip text for clearing all comments.
   */
  clearComments: "Clear all comments",
  /**
   * @description Title of the empty state shown in the Comments panel when there are no queued comments.
   */
  noQueuedComments: "No queued comments",
  /**
   * @description Title of the empty state shown in the Comments panel when there are no comments at all.
   */
  noComments: "No comments",
  /**
   * @description Description in the empty state of the Comments panel. PH1 is the comment mode icon, the same icon as
   * the button that turns on comment mode.
   * @example {(comment icon)} PH1
   */
  emptyStateDescription: "Use {PH1} to select an element and send tasks, questions, and context to your coding agent",
  /**
   * @description Accessible name of the comment mode icon shown inside the empty state description of the Comments panel.
   */
  commentModeIcon: "Comment mode",
  /**
   * @description Link in the empty state of the Comments panel that turns on comment mode so the user can add a comment.
   */
  addComment: "Add a comment",
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
   * @description Status text shown next to a checkmark when a comment thread has been sent but not yet picked up by
   * the agent.
   */
  sentStatus: "Sent",
  /**
   * @description Alt text for the checkmark icon shown on a comment thread that has been sent but not yet picked up
   * by the agent.
   */
  sentCheckmark: "Sent checkmark",
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
  removed: "removed",
  /**
   * @description Text in the bar that visually separates the queued comments from the comments already sent to the agent in the comments drawer.
   */
  sentComments: "Sent comments"
};
var str_ = i18n.i18n.registerUIStrings("panels/comments/CommentsPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var TOGGLE_COMMENT_MODE_ACTION_ID = "comments.toggle-comment-mode";
function renderThreadStatus(thread, onDeleteThread) {
  switch (thread.status) {
    case "SENT_TO_AGENT":
      if (!thread.transmitted) {
        return html`
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
      return html`
        <div class="thread-status-working">
          <devtools-spinner></devtools-spinner>
          <span>${i18nString(UIStrings.working)}</span>
        </div>
      `;
    case "RESOLVED":
      return html`
        <devtools-button
          class="see-response-button"
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
var DEFAULT_VIEW = (input, output, target) => {
  const isQueued = input.activeTab === "queued";
  const isSent = input.activeTab === "sent";
  const hasThreads = input.queuedThreads.length > 0 || input.sentThreads.length > 0;
  let sentSection;
  output.scrollToSection = (tab, { animate }) => {
    const { scrollContainer } = output;
    const top = tab === "queued" ? 0 : sentSection?.offsetTop;
    if (!scrollContainer || top === void 0 || Math.abs(top - scrollContainer.scrollTop) < 1) {
      return false;
    }
    scrollContainer.scrollTo({ top, behavior: animate ? "smooth" : "instant" });
    return animate;
  };
  output.sectionAtTop = () => {
    const { scrollContainer } = output;
    return scrollContainer && sentSection && sentSection.offsetTop - scrollContainer.scrollTop <= 1 ? "sent" : "queued";
  };
  const onThreadClick = (e, thread) => {
    const rowEl = e.currentTarget;
    const rowRect = rowEl.getBoundingClientRect();
    const badgeRect = rowEl.querySelector(".comment-pin-badge")?.getBoundingClientRect();
    input.onThreadClick(thread, { left: badgeRect?.left ?? rowRect.left, top: rowRect.top });
  };
  const renderThreadList = (threads, className) => html`
    <ul class="comments-list ${className}" role="list">
      ${repeat(
    threads,
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
            <div
              class=${classMap({
      "comment-pin-badge": true,
      resolved: item2.thread.status === "RESOLVED"
    })}
              aria-hidden="true">
            </div>
            <span class="anchor-chip ${item2.thread.isOrphaned ? "orphaned" : ""}">
              ${"node" in item2.title ? widget(CommonPanels.DOMLinkifier.DOMNodeLink, {
      node: item2.title.node,
      options: { preventKeyboardFocus: true, disabled: item2.thread.isOrphaned }
    }) : html`<span class="anchor-chip-text">${item2.title.text}</span>`}
              ${item2.thread.isOrphaned ? html`<span class="orphaned-label">(${i18nString(UIStrings.removed)})</span>` : Lit.nothing}
            </span>
            <div class="comment-text">${item2.commentText}</div>
            ${renderThreadStatus(item2.thread, input.onDeleteThread)}
          </li>
        `
  )}
    </ul>
  `;
  const renderFooter = () => html`
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
        jslog=${VisualLogging.action("comments-send-to-agent").track({ click: true })}>
        ${i18nString(UIStrings.sendToAgent)}
      </button>
    </div>
  `;
  const renderEmptyState = (title) => html`
    <div class="comments-empty-state">
      <div class="comments-empty-state-title">${title}</div>
      <div class="comments-empty-state-description">
        ${i18nTemplate(str_, UIStrings.emptyStateDescription, {
    PH1: html`<devtools-icon
            class="comments-empty-state-icon"
            name="comment-mode"
            role="img"
            aria-label=${i18nString(UIStrings.commentModeIcon)}
          ></devtools-icon>`
  })}
      </div>
      <devtools-button
        class="comments-empty-state-link"
        .data=${{
    variant: Buttons.Button.Variant.TEXT,
    jslogContext: "comments-add-comment"
  }}
        @click=${input.onAddComment}
      >${i18nString(UIStrings.addComment)}</devtools-button>
    </div>
  `;
  render(html`
    <style>${commentsPane_css_default}</style>
    <div class="comments-container" role="region" aria-label="Comments" jslog=${VisualLogging.panel("comments").track({ resize: true })}>
      <div class="comments-toolbar" role="toolbar" jslog=${VisualLogging.toolbar("comments-drawer")}>
        <div class="toolbar-left">
          <button
            class="tab-button ${isQueued ? "active" : ""}"
            aria-current=${isQueued ? "location" : "false"}
            @click=${() => input.onTabClick("queued")}
            jslog=${VisualLogging.sectionHeader("queued").track({ click: true })}>
            ${i18nString(UIStrings.queued)}
          </button>
          <button
            class="tab-button ${isSent ? "active" : ""}"
            aria-current=${isSent ? "location" : "false"}
            @click=${() => input.onTabClick("sent")}
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

      ${hasThreads ? html`
        <div
          class="comments-scroll-container"
          ${ref((element) => {
    output.scrollContainer = element;
  })}
          @scroll=${input.onScroll}
          @scrollend=${input.onScrollEnd}>
          <div class="comments-queued-section">
            ${input.queuedThreads.length > 0 ? html`
              ${renderThreadList(input.queuedThreads, "comments-queued-list")}
              ${renderFooter()}
            ` : renderEmptyState(i18nString(UIStrings.noQueuedComments))}
          </div>
          ${input.sentThreads.length > 0 ? html`
            <div class="comments-sent-section" ${ref((element) => {
    sentSection = element;
  })}>
              <div class="comments-sent-separator" role="separator" aria-label=${i18nString(UIStrings.sentComments)}>
                ${i18nString(UIStrings.sentComments)}
              </div>
              ${renderThreadList(input.sentThreads, "comments-sent-list")}
            </div>
          ` : Lit.nothing}
        </div>
      ` : renderEmptyState(i18nString(UIStrings.noComments))}
    </div>
  `, target);
};
var CommentsPane = class extends UI.Widget.Widget {
  static INJECT = [
    CommentManager.CommentManager.CommentManager
  ];
  #view;
  #commentManager;
  #cachedTitles = /* @__PURE__ */ new WeakMap();
  #viewOutput = {};
  #activeTab = "queued";
  // Set while a tab click smoothly scrolls the list. Scroll events then don't
  // change the highlighted tab, so it doesn't flicker on the way.
  #scrollingToTab = false;
  // Whether the previous render had sent comments and nothing queued. We jump
  // to Sent only when this changes from false to true. Without it, every update
  // (e.g. the agent resolving a thread) would jump back to Sent even after the
  // user clicked Queued or scrolled up.
  #onlySentComments = false;
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
    this.#commentManager.removeEventListener(
      CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED,
      this.#onThreadsChanged,
      this
    );
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
    if (thread.isGeneratedComment && thread.status !== "RESOLVED") {
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
      commentText: thread.comments[0]?.text ?? ""
    };
  }
  async performUpdate(signal) {
    const allThreads = this.#commentManager.getCommentThreads();
    const queued = allThreads.filter((thread) => thread.status === "ACTIVE");
    const sent = allThreads.filter((thread) => thread.status === "SENT_TO_AGENT" || thread.status === "RESOLVED");
    const [queuedThreads, sentThreads] = await Promise.all([
      Promise.all(queued.map((thread) => this.#toViewData(thread))),
      Promise.all(sent.map((thread) => this.#toViewData(thread)))
    ]);
    if (signal?.aborted) {
      return;
    }
    const onlySentComments = queuedThreads.length === 0 && sentThreads.length > 0;
    const showSentComments = onlySentComments && !this.#onlySentComments;
    this.#onlySentComments = onlySentComments;
    if (showSentComments) {
      this.#activeTab = "sent";
    } else if (sentThreads.length === 0) {
      this.#activeTab = "queued";
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
      onAddComment: this.#handleAddComment
    };
    this.#view(viewInput, this.#viewOutput, this.contentElement);
    if (showSentComments) {
      this.#viewOutput.scrollToSection?.("sent", { animate: false });
    }
  }
};
export {
  CommentsPane_exports as CommentsPane
};
//# sourceMappingURL=comments.js.map
