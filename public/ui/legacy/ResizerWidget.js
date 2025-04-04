// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import { elementDragStart } from './UIUtils.js';
export class ResizerWidget extends Common.ObjectWrapper.ObjectWrapper {
    isEnabledInternal = true;
    elementsInternal = new Set();
    installDragOnMouseDownBound;
    cursorInternal;
    startX;
    startY;
    constructor() {
        super();
        this.installDragOnMouseDownBound = this.installDragOnMouseDown.bind(this);
        this.cursorInternal = 'nwse-resize';
    }
    isEnabled() {
        return this.isEnabledInternal;
    }
    setEnabled(enabled) {
        this.isEnabledInternal = enabled;
        this.updateElementCursors();
    }
    elements() {
        return [...this.elementsInternal];
    }
    addElement(element) {
        if (!this.elementsInternal.has(element)) {
            this.elementsInternal.add(element);
            element.addEventListener('pointerdown', this.installDragOnMouseDownBound, false);
            this.updateElementCursor(element);
        }
    }
    removeElement(element) {
        if (this.elementsInternal.has(element)) {
            this.elementsInternal.delete(element);
            element.removeEventListener('pointerdown', this.installDragOnMouseDownBound, false);
            element.style.removeProperty('cursor');
        }
    }
    updateElementCursors() {
        this.elementsInternal.forEach(this.updateElementCursor.bind(this));
    }
    updateElementCursor(element) {
        if (this.isEnabledInternal) {
            element.style.setProperty('cursor', this.cursor());
            element.style.setProperty('touch-action', 'none');
        }
        else {
            element.style.removeProperty('cursor');
            element.style.removeProperty('touch-action');
        }
    }
    cursor() {
        return this.cursorInternal;
    }
    setCursor(cursor) {
        this.cursorInternal = cursor;
        this.updateElementCursors();
    }
    installDragOnMouseDown(event) {
        const element = event.target;
        // Only handle drags of the nodes specified.
        if (!this.elementsInternal.has(element)) {
            return false;
        }
        elementDragStart(element, this.dragStart.bind(this), event => {
            this.drag(event);
        }, this.dragEnd.bind(this), this.cursor(), event);
        return undefined;
    }
    dragStart(event) {
        if (!this.isEnabledInternal) {
            return false;
        }
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.sendDragStart(this.startX, this.startY);
        return true;
    }
    sendDragStart(x, y) {
        this.dispatchEventToListeners("ResizeStart" /* Events.RESIZE_START */, { startX: x, currentX: x, startY: y, currentY: y });
    }
    drag(event) {
        if (!this.isEnabledInternal) {
            this.dragEnd(event);
            return true; // Cancel drag.
        }
        this.sendDragMove(this.startX, event.pageX, this.startY, event.pageY, event.shiftKey);
        event.preventDefault();
        return false; // Continue drag.
    }
    sendDragMove(startX, currentX, startY, currentY, shiftKey) {
        this.dispatchEventToListeners("ResizeUpdateXY" /* Events.RESIZE_UPDATE_XY */, { startX, currentX, startY, currentY, shiftKey });
    }
    dragEnd(_event) {
        this.dispatchEventToListeners("ResizeEnd" /* Events.RESIZE_END */);
        delete this.startX;
        delete this.startY;
    }
}
export class SimpleResizerWidget extends ResizerWidget {
    isVerticalInternal;
    constructor() {
        super();
        this.isVerticalInternal = true;
    }
    isVertical() {
        return this.isVerticalInternal;
    }
    /**
     * Vertical widget resizes height (along y-axis).
     */
    setVertical(vertical) {
        this.isVerticalInternal = vertical;
        this.updateElementCursors();
    }
    cursor() {
        return this.isVerticalInternal ? 'ns-resize' : 'ew-resize';
    }
    sendDragStart(x, y) {
        const position = this.isVerticalInternal ? y : x;
        this.dispatchEventToListeners("ResizeStart" /* Events.RESIZE_START */, { startPosition: position, currentPosition: position });
    }
    sendDragMove(startX, currentX, startY, currentY, shiftKey) {
        if (this.isVerticalInternal) {
            this.dispatchEventToListeners("ResizeUpdatePosition" /* Events.RESIZE_UPDATE_POSITION */, { startPosition: startY, currentPosition: currentY, shiftKey });
        }
        else {
            this.dispatchEventToListeners("ResizeUpdatePosition" /* Events.RESIZE_UPDATE_POSITION */, { startPosition: startX, currentPosition: currentX, shiftKey });
        }
    }
}
//# sourceMappingURL=ResizerWidget.js.map