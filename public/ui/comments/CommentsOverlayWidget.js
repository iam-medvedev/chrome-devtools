// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../core/root/root.js';
import * as CommentManager from '../../models/comment_manager/comment_manager.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import { CommentOverlayManager, } from './CommentOverlayManager.js';
import commentsOverlayStyles from './commentsOverlay.css.js';
const { html, render, nothing, Directives: { styleMap } } = Lit;
// clang-format off
const DEFAULT_VIEW = (input, _output, target) => {
    render(html `
    <style>${commentsOverlayStyles}</style>
    <div class="comments-overlay-container">
      ${input.hoverHighlight && input.hoverHighlight.visible ? html `
        <div
          class="comment-hover-highlight"
          style=${styleMap({
        top: `${input.hoverHighlight.top}px`,
        left: `${input.hoverHighlight.left}px`,
        width: `${input.hoverHighlight.width}px`,
        height: `${input.hoverHighlight.height}px`,
    })}>
        </div>
      ` : nothing}
      ${input.highlights.map(h => h.visible ? html `
        <div
          class="comment-anchor-highlight"
          data-comment-id=${h.id}
          style=${styleMap({
        top: `${h.top}px`,
        left: `${h.left}px`,
        width: `${h.width}px`,
        height: `${h.height}px`,
    })}>
        </div>
      ` : nothing)}
      ${input.pins.map(p => p.visible ? html `
        <div
          class="comment-pin"
          data-comment-id=${p.id}
          style=${styleMap({
        top: `${p.top}px`,
        left: `${p.left}px`,
    })}
          @click=${() => input.onPinClick(p.id)}>
          💬
        </div>
      ` : nothing)}
    </div>
  `, target);
};
// clang-format on
export class CommentsOverlayWidget extends UI.Widget.Widget {
    #view;
    #commentManager;
    #commentOverlayManager;
    constructor(element, commentManager, view = DEFAULT_VIEW) {
        super(element, { useShadowDom: false });
        this.#view = view;
        this.#commentManager = commentManager;
        this.#commentOverlayManager = new CommentOverlayManager(this.#commentManager);
    }
    setOverlayManagerForTest(overlayManager) {
        this.#commentOverlayManager = overlayManager;
    }
    wasShown() {
        super.wasShown();
        this.#commentOverlayManager.start();
        this.#commentOverlayManager.addEventListener("PositionsUpdated" /* CommentOverlayManagerEvents.POSITIONS_UPDATED */, this.#onStateChanged, this);
        this.#commentOverlayManager.addEventListener("HoverHighlightChanged" /* CommentOverlayManagerEvents.HOVER_HIGHLIGHT_CHANGED */, this.#onStateChanged, this);
        this.#commentManager.addEventListener("CommentThreadsChanged" /* CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED */, this.#onStateChanged, this);
        this.#commentManager.addEventListener("CommentModeChanged" /* CommentManager.CommentManager.Events.COMMENT_MODE_CHANGED */, this.#onCommentModeChanged, this);
        this.requestUpdate();
    }
    willHide() {
        this.#commentOverlayManager.stop();
        this.#commentOverlayManager.removeEventListener("PositionsUpdated" /* CommentOverlayManagerEvents.POSITIONS_UPDATED */, this.#onStateChanged, this);
        this.#commentOverlayManager.removeEventListener("HoverHighlightChanged" /* CommentOverlayManagerEvents.HOVER_HIGHLIGHT_CHANGED */, this.#onStateChanged, this);
        this.#commentManager.removeEventListener("CommentThreadsChanged" /* CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED */, this.#onStateChanged, this);
        this.#commentManager.removeEventListener("CommentModeChanged" /* CommentManager.CommentManager.Events.COMMENT_MODE_CHANGED */, this.#onCommentModeChanged, this);
        super.willHide();
    }
    #onCommentModeChanged(event) {
        const isModeActive = event.data;
        const action = UI.ActionRegistry.ActionRegistry.instance().getAction('comments.toggle-comment-mode');
        action?.setToggled(isModeActive);
        this.requestUpdate();
    }
    #onStateChanged() {
        this.requestUpdate();
    }
    #handlePinClick = (_threadId) => { };
    performUpdate() {
        const viewInput = {
            pins: this.#commentOverlayManager.getPinPositions(),
            highlights: this.#commentOverlayManager.getHighlightRects(),
            hoverHighlight: this.#commentOverlayManager.getHoverHighlight(),
            commentMode: this.#commentManager.isCommentMode(),
            onPinClick: this.#handlePinClick,
        };
        this.#view(viewInput, undefined, this.contentElement);
    }
}
let widgetInstance = null;
export class ActionDelegate {
    #commentManager;
    constructor(commentManager) {
        this.#commentManager = commentManager ??
            Root.DevToolsContext.globalInstance().get(CommentManager.CommentManager.CommentManager);
    }
    handleAction(_context, actionId) {
        if (actionId === 'comments.toggle-comment-mode') {
            if (!widgetInstance) {
                widgetInstance = new CommentsOverlayWidget(undefined, this.#commentManager);
                widgetInstance.markAsRoot();
                widgetInstance.show(document.body);
            }
            this.#commentManager.setCommentMode(!this.#commentManager.isCommentMode());
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=CommentsOverlayWidget.js.map