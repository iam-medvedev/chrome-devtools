// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as CommentManager from '../../models/comment_manager/comment_manager.js';
import { deepQuerySelectorAll, isElementVisible, rematchCommentAnchor, resolveCommentAnchor, resolveCommentAnchorElement, } from './CommentAnchorResolver.js';
/**
 * Orchestrates live DOM overlay positioning, coordinates interactive commenting UI mode,
 * and tracks live DOM element positions via observers and event listeners.
 */
export class CommentOverlayManager extends Common.ObjectWrapper.ObjectWrapper {
    #commentManager;
    #liveNodeCache = new WeakMap();
    #observedThreads = new WeakSet();
    #intersectionObserver;
    #hoverData = null;
    #pinPositions = [];
    #highlightRects = [];
    #clickListener;
    #hoverListener;
    #suppressListener;
    #clickContainer;
    #hoverEventTypes = [
        'mouseover',
        'mouseout',
        'mouseenter',
        'mouseleave',
        'pointerover',
        'pointerout',
        'mousemove',
    ];
    #suppressEventTypes = [
        'mousedown',
        'pointerdown',
        'mouseup',
        'pointerup',
        'dblclick',
    ];
    #scrollListener;
    #scrollTarget;
    #scrollRafId;
    #devToolsResizeObserver;
    #resizeRafId;
    #mutationObserver;
    #rematchTimeoutId;
    constructor(commentManager) {
        super();
        this.#commentManager = commentManager;
        this.#commentManager.addEventListener("CommentThreadsChanged" /* CommentManager.CommentManager.Events.COMMENT_THREADS_CHANGED */, () => {
            this.#updatePositions();
        }, this);
        this.#commentManager.addEventListener("CommentModeChanged" /* CommentManager.CommentManager.Events.COMMENT_MODE_CHANGED */, ({ data: active }) => {
            if (!active) {
                this.#setHoverHighlight(null);
            }
            document.body.style.cursor = active ? 'crosshair' : '';
        }, this);
    }
    get commentManager() {
        return this.#commentManager;
    }
    /**
     * Lazily creates an IntersectionObserver that monitors the visibility and viewport intersection
     * of elements with active comment anchors.
     *
     * As anchored DOM nodes scroll in or out of visible viewport regions or virtualized lists,
     * the observer triggers position recalculations to ensure comment pins and highlights are
     * positioned accurately or hidden when out of view.
     */
    #getIntersectionObserver() {
        if (!this.#intersectionObserver) {
            this.#intersectionObserver = new IntersectionObserver(() => {
                this.#updatePositions();
            });
        }
        return this.#intersectionObserver;
    }
    setCommentMode(active) {
        this.#commentManager.setCommentMode(active);
    }
    isCommentMode() {
        return this.#commentManager.isCommentMode();
    }
    #setHoverHighlight(data) {
        if (data === null && this.#hoverData === null) {
            return;
        }
        if (data && this.#hoverData && data.top === this.#hoverData.top && data.left === this.#hoverData.left &&
            data.width === this.#hoverData.width && data.height === this.#hoverData.height &&
            data.visible === this.#hoverData.visible) {
            return;
        }
        this.#hoverData = data;
        this.dispatchEventToListeners("HoverHighlightChanged" /* Events.HOVER_HIGHLIGHT_CHANGED */, data);
    }
    getHoverHighlight() {
        return this.#hoverData;
    }
    getPinPositions() {
        return this.#pinPositions;
    }
    getHighlightRects() {
        return this.#highlightRects;
    }
    handleElementClick(element, commentText = 'New comment') {
        if (!this.isCommentMode()) {
            return null;
        }
        return this.createComment(element, commentText, 'DEVELOPER');
    }
    createComment(element, text, author = 'DEVELOPER', changes) {
        const anchorEl = resolveCommentAnchorElement(element);
        const anchor = resolveCommentAnchor(element);
        if (!anchor || !anchorEl) {
            return null;
        }
        const thread = this.#commentManager.createCommentThread(anchor, text, author, changes);
        this.#liveNodeCache.set(thread, anchorEl);
        const observer = this.#getIntersectionObserver();
        observer.observe(anchorEl);
        this.#observedThreads.add(anchorEl);
        this.#updatePositions();
        return thread;
    }
    getCommentThread(id) {
        return this.#commentManager.getCommentThread(id);
    }
    getCommentThreads() {
        return this.#commentManager.getCommentThreads();
    }
    removeCommentThread(id) {
        const thread = this.#commentManager.getCommentThread(id);
        if (!thread) {
            return;
        }
        const el = this.#liveNodeCache.get(thread);
        this.#liveNodeCache.delete(thread);
        if (el && this.#intersectionObserver) {
            let isElementStillObserved = false;
            for (const remainingThread of this.#commentManager.getCommentThreads()) {
                if (remainingThread.id !== id && this.#liveNodeCache.get(remainingThread) === el) {
                    isElementStillObserved = true;
                    break;
                }
            }
            if (!isElementStillObserved) {
                this.#intersectionObserver.unobserve(el);
                this.#observedThreads.delete(el);
            }
        }
        this.#commentManager.removeCommentThread(id);
    }
    /**
     * Rematches stored comments to live DOM nodes across dynamic container updates.
     *
     * Pre-queries [jslog] elements once across the container to avoid redundant deep DOM traversals
     * during batch rematching, and cleans up unobserved IntersectionObserver nodes in O(N) time.
     */
    #rematchAllComments(root = document) {
        const jslogElements = deepQuerySelectorAll(root, '[jslog]');
        const oldElements = new Set();
        const newElements = new Set();
        for (const thread of this.#commentManager.getCommentThreads()) {
            const oldEl = this.#liveNodeCache.get(thread);
            if (oldEl) {
                oldElements.add(oldEl);
            }
            // Always try to rematch to support virtualized lists where DOM nodes are recycled.
            const el = rematchCommentAnchor(thread, root, jslogElements);
            if (el) {
                this.#liveNodeCache.set(thread, el);
                newElements.add(el);
            }
            else {
                this.#liveNodeCache.delete(thread);
            }
        }
        if (this.#intersectionObserver) {
            // Unobserve old elements no longer referenced by any comment thread in O(N) time.
            for (const oldEl of oldElements) {
                if (!newElements.has(oldEl)) {
                    this.#intersectionObserver.unobserve(oldEl);
                    this.#observedThreads.delete(oldEl);
                }
            }
        }
        this.#updatePositions();
    }
    #updatePositions() {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const newPins = [];
        const newHighlights = [];
        const elementPinCounts = new Map();
        for (const thread of this.#commentManager.getCommentThreads()) {
            const el = this.#liveNodeCache.get(thread) || null;
            if (!el || !el.isConnected) {
                continue;
            }
            const observer = this.#getIntersectionObserver();
            if (!this.#observedThreads.has(el)) {
                observer.observe(el);
                this.#observedThreads.add(el);
            }
            if (!isElementVisible(el)) {
                continue;
            }
            const rect = el.getBoundingClientRect();
            const offsetIndex = elementPinCounts.get(el) || 0;
            elementPinCounts.set(el, offsetIndex + 1);
            // Offset by 26px vertically (24px pin icon height + 2px spacing) so multiple comment pins on the same element stack vertically without overlapping.
            const offsetY = offsetIndex * 26;
            // Offset by -12px (half of the 24px pin diameter) so the pin icon is centered on the top-right corner of the target element.
            newPins.push({
                id: thread.id,
                top: scrollY + rect.top - 12 + offsetY,
                left: scrollX + rect.right - 12,
                visible: true,
            });
            newHighlights.push({
                id: thread.id,
                top: scrollY + rect.top,
                left: scrollX + rect.left,
                width: rect.width,
                height: rect.height,
                visible: true,
            });
        }
        this.#pinPositions = newPins;
        this.#highlightRects = newHighlights;
        this.dispatchEventToListeners("PositionsUpdated" /* Events.POSITIONS_UPDATED */, {
            pins: newPins,
            highlights: newHighlights,
        });
    }
    /**
     * Initializes event listeners and lifecycle observers across the target DOM container.
     *
     * Sets up:
     * - Capturing click, hover, and interaction suppression handlers to coordinate comment placement.
     * - A capturing scroll listener on the window to track scrolling across nested subpanes.
     * - A ResizeObserver to recalculate overlay coordinates when DevTools panels or drawers are resized.
     * - A MutationObserver to automatically rematch existing comment anchors when the DOM re-renders.
     */
    start(rootOrOptions, defaultText = 'New comment') {
        let root;
        let scrollTarget;
        let resizeTarget;
        let text = defaultText;
        if (rootOrOptions && !(rootOrOptions instanceof Document) && !(rootOrOptions instanceof Element)) {
            root = rootOrOptions.root;
            scrollTarget = rootOrOptions.scrollTarget;
            resizeTarget = rootOrOptions.resizeTarget;
            text = rootOrOptions.defaultText ?? defaultText;
        }
        else if (rootOrOptions) {
            root = rootOrOptions;
        }
        root = root || document;
        scrollTarget = scrollTarget || (root instanceof Document ? (root.defaultView || window) : window);
        resizeTarget = resizeTarget || (root instanceof Document ? (root.body || root.documentElement) : root);
        this.stop();
        this.#installClickListener(root, text);
        this.#installScrollListener(scrollTarget);
        this.#installResizeObserver(resizeTarget);
        this.#installMutationObserver(root);
    }
    /**
     * Stops and detaches all active listeners and observers without clearing comment threads.
     */
    stop() {
        this.#removeClickListener();
        this.#removeScrollListener();
        this.#removeResizeObserver();
        this.#removeMutationObserver();
    }
    /**
     * Sets up capturing click, hover, and pointer interaction listeners on the container.
     *
     * When Comment Mode is active:
     * - Clicks on anchorable elements create new comment threads and consume the click event,
     *   preventing normal DevTools UI triggers such as node selection or navigation.
     * - Pointer and mouse press events are suppressed to prevent accidental text selections or drag interactions.
     * - Hover events compute and display a real-time preview highlight over the candidate anchor element.
     */
    #installClickListener(container = document, defaultText = 'New comment') {
        this.#removeClickListener();
        this.#clickContainer = container;
        this.#clickListener = (event) => {
            if (!this.isCommentMode()) {
                return;
            }
            const composedTarget = event.composedPath()[0];
            const target = (composedTarget instanceof Element) ? composedTarget : event.target;
            if (!(target instanceof Element)) {
                return;
            }
            const thread = this.handleElementClick(target, defaultText);
            if (thread) {
                event.consume(true);
            }
        };
        this.#suppressListener = (event) => {
            if (!this.isCommentMode()) {
                return;
            }
            const composedTarget = event.composedPath()[0];
            const target = (composedTarget instanceof Element) ? composedTarget : event.target;
            if (!(target instanceof Element)) {
                return;
            }
            const anchorEl = resolveCommentAnchorElement(target);
            if (anchorEl) {
                event.consume(true);
            }
        };
        this.#hoverListener = (event) => {
            if (!this.isCommentMode()) {
                this.#setHoverHighlight(null);
                return;
            }
            const composedTarget = event.composedPath()[0];
            const target = (composedTarget instanceof Element) ? composedTarget : event.target;
            if (!(target instanceof Element)) {
                this.#setHoverHighlight(null);
                return;
            }
            const isLeaveEvent = event.type === 'mouseout' || event.type === 'mouseleave' || event.type === 'pointerout';
            const anchorEl = resolveCommentAnchorElement(target);
            if (isLeaveEvent) {
                const relatedTarget = event.relatedTarget;
                if (anchorEl && relatedTarget instanceof Node && anchorEl.contains(relatedTarget)) {
                    event.consume(true);
                    return;
                }
                this.#setHoverHighlight(null);
                if (anchorEl) {
                    event.consume(true);
                }
                return;
            }
            if (anchorEl) {
                const cmLine = target.closest('.cm-line');
                const highlightTarget = (cmLine && anchorEl.classList.contains('cm-editor')) ? cmLine : anchorEl;
                const rect = highlightTarget.getBoundingClientRect();
                const scrollX = window.scrollX;
                const scrollY = window.scrollY;
                this.#setHoverHighlight({
                    top: scrollY + rect.top,
                    left: scrollX + rect.left,
                    width: rect.width,
                    height: rect.height,
                    visible: true,
                });
                event.consume(true);
            }
            else {
                this.#setHoverHighlight(null);
            }
        };
        container.addEventListener('click', this.#clickListener, { capture: true });
        for (const type of this.#suppressEventTypes) {
            container.addEventListener(type, this.#suppressListener, { capture: true });
        }
        for (const type of this.#hoverEventTypes) {
            container.addEventListener(type, this.#hoverListener, { capture: true });
        }
    }
    #removeClickListener() {
        if (this.#clickContainer) {
            if (this.#clickListener) {
                this.#clickContainer.removeEventListener('click', this.#clickListener, { capture: true });
            }
            if (this.#suppressListener) {
                for (const type of this.#suppressEventTypes) {
                    this.#clickContainer.removeEventListener(type, this.#suppressListener, { capture: true });
                }
            }
            if (this.#hoverListener) {
                for (const type of this.#hoverEventTypes) {
                    this.#clickContainer.removeEventListener(type, this.#hoverListener, { capture: true });
                }
            }
            this.#clickListener = undefined;
            this.#suppressListener = undefined;
            this.#hoverListener = undefined;
            this.#clickContainer = undefined;
        }
    }
    /**
     * Registers a capturing scroll listener on the window or target container.
     *
     * Because DevTools contains multiple independently scrolling subpanes (such as the Elements tree,
     * Sources editor, and Network list), a capturing listener on the top-level window catches scroll
     * events anywhere in the tree and schedules a throttled position update using requestAnimationFrame.
     */
    #installScrollListener(target = window) {
        this.#removeScrollListener();
        this.#scrollTarget = target;
        this.#scrollListener = () => {
            this.#setHoverHighlight(null);
            if (this.#scrollRafId !== undefined) {
                cancelAnimationFrame(this.#scrollRafId);
            }
            this.#scrollRafId = requestAnimationFrame(() => {
                this.#scrollRafId = undefined;
                this.#updatePositions();
            });
        };
        target.addEventListener('scroll', this.#scrollListener, { capture: true, passive: true });
    }
    #removeScrollListener() {
        if (this.#scrollTarget && this.#scrollListener) {
            this.#scrollTarget.removeEventListener('scroll', this.#scrollListener, { capture: true });
            this.#scrollListener = undefined;
            this.#scrollTarget = undefined;
        }
        if (this.#scrollRafId !== undefined) {
            cancelAnimationFrame(this.#scrollRafId);
            this.#scrollRafId = undefined;
        }
    }
    /**
     * Observes dimensions of the root element to react to layout changes.
     *
     * Resizing DevTools windows, adjusting drawer splitters, or toggling sidebars alters the bounding
     * boxes of anchored elements. The observer ensures overlay pins and highlight boxes are updated
     * whenever container dimensions change.
     */
    #installResizeObserver(element = document.body) {
        this.#removeResizeObserver();
        this.#devToolsResizeObserver = new ResizeObserver(() => {
            this.#setHoverHighlight(null);
            if (this.#resizeRafId !== undefined) {
                cancelAnimationFrame(this.#resizeRafId);
            }
            this.#resizeRafId = requestAnimationFrame(() => {
                this.#resizeRafId = undefined;
                this.#updatePositions();
            });
        });
        this.#devToolsResizeObserver.observe(element);
    }
    #removeResizeObserver() {
        if (this.#devToolsResizeObserver) {
            this.#devToolsResizeObserver.disconnect();
            this.#devToolsResizeObserver = undefined;
        }
        if (this.#resizeRafId !== undefined) {
            cancelAnimationFrame(this.#resizeRafId);
            this.#resizeRafId = undefined;
        }
    }
    /**
     * Debounces rematching of comments across dynamic DOM updates.
     */
    #scheduleRematch(root = document) {
        if (this.#rematchTimeoutId) {
            clearTimeout(this.#rematchTimeoutId);
        }
        this.#rematchTimeoutId = setTimeout(() => {
            this.#rematchTimeoutId = undefined;
            this.#rematchAllComments(root);
        }, 250);
    }
    /**
     * Monitors DOM tree additions, removals, and attribute mutations across the container.
     *
     * DevTools inspector panes dynamically re-render items when expanding trees, filtering results,
     * or updating state. By observing child list mutations and key domain attributes (`jslog`,
     * `data-network-request-id`, `data-backend-node-id`, `aria-expanded`), the manager schedules a
     * debounced rematch so comments remain bound to their corresponding live DOM elements.
     */
    #installMutationObserver(root = document) {
        this.#removeMutationObserver();
        this.#mutationObserver = new MutationObserver(() => {
            this.#scheduleRematch(root);
        });
        const targetNode = root instanceof Document ? (root.body || root.documentElement) : root;
        this.#mutationObserver.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['jslog', 'data-network-request-id', 'data-backend-node-id', 'aria-expanded'],
        });
    }
    #removeMutationObserver() {
        if (this.#mutationObserver) {
            this.#mutationObserver.disconnect();
            this.#mutationObserver = undefined;
        }
        if (this.#rematchTimeoutId) {
            clearTimeout(this.#rematchTimeoutId);
            this.#rematchTimeoutId = undefined;
        }
    }
    /**
     * Fully resets the manager by disabling comment mode, disconnecting all observers and listeners,
     * and purging all active comment threads and overlay data.
     */
    clear() {
        this.#commentManager.clear();
        this.stop();
        this.#intersectionObserver?.disconnect();
        this.#intersectionObserver = undefined;
        this.#observedThreads = new WeakSet();
        this.#pinPositions = [];
        this.#highlightRects = [];
        this.#updatePositions();
    }
}
//# sourceMappingURL=CommentOverlayManager.js.map