// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceBounds from '../../../services/trace_bounds/trace_bounds.js';
export function flattenBreadcrumbs(initialBreadcrumb) {
    const allBreadcrumbs = [initialBreadcrumb];
    let breadcrumbsIter = initialBreadcrumb;
    while (breadcrumbsIter.child !== null) {
        const iterChild = breadcrumbsIter.child;
        if (iterChild !== null) {
            allBreadcrumbs.push(iterChild);
            breadcrumbsIter = iterChild;
        }
    }
    return allBreadcrumbs;
}
export class Breadcrumbs {
    initialBreadcrumb;
    activeBreadcrumb;
    constructor(initialTraceWindow) {
        this.initialBreadcrumb = {
            window: initialTraceWindow,
            child: null,
        };
        let lastBreadcrumb = this.initialBreadcrumb;
        while (lastBreadcrumb.child !== null) {
            lastBreadcrumb = lastBreadcrumb.child;
        }
        this.activeBreadcrumb = lastBreadcrumb;
    }
    add(newBreadcrumbTraceWindow) {
        if (!this.isTraceWindowWithinTraceWindow(newBreadcrumbTraceWindow, this.activeBreadcrumb.window)) {
            throw new Error('Can not add a breadcrumb that is equal to or is outside of the parent breadcrumb TimeWindow');
        }
        const newBreadcrumb = {
            window: newBreadcrumbTraceWindow,
            child: null,
        };
        // To add a new Breadcrumb to the Breadcrumbs Linked List, set the child of active breadcrumb
        // to the new breadcrumb and update the active Breadcrumb to the newly added one
        this.activeBreadcrumb.child = newBreadcrumb;
        this.setActiveBreadcrumb(newBreadcrumb);
        return newBreadcrumb;
    }
    // Breadcumb should be within the bounds of the parent and can not have both start and end be equal to the parent
    isTraceWindowWithinTraceWindow(child, parent) {
        return (child.min >= parent.min && child.max <= parent.max) &&
            !(child.min === parent.min && child.max === parent.max);
    }
    // Used to set an initial breadcrumbs from modifications loaded from a file
    setInitialBreadcrumbFromLoadedModifications(initialBreadcrumb) {
        this.initialBreadcrumb = initialBreadcrumb;
        // Make last breadcrumb active
        let lastBreadcrumb = initialBreadcrumb;
        while (lastBreadcrumb.child !== null) {
            lastBreadcrumb = lastBreadcrumb.child;
        }
        this.setActiveBreadcrumb(lastBreadcrumb);
    }
    setActiveBreadcrumb(activeBreadcrumb, removeChildBreadcrumbs) {
        // If the children of the activated breadcrumb need to be removed, set the child on the
        // activated breadcrumb to null. Since breadcrumbs are a linked list, this will remove all
        // of the following children.
        if (removeChildBreadcrumbs) {
            activeBreadcrumb.child = null;
        }
        // When we assign a new active breadcrumb, both the minimap bounds and the visible
        // window get set to that breadcrumb's window.
        this.activeBreadcrumb = activeBreadcrumb;
        TraceBounds.TraceBounds.BoundsManager.instance().setMiniMapBounds(activeBreadcrumb.window);
        TraceBounds.TraceBounds.BoundsManager.instance().setTimelineVisibleWindow(activeBreadcrumb.window);
    }
}
//# sourceMappingURL=Breadcrumbs.js.map