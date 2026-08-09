// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
const IGNORED_MINOR_CONTROLS = new Set([
    VisualLogging.VisualElements.Action,
    VisualLogging.VisualElements.Toggle,
    VisualLogging.VisualElements.Close,
    VisualLogging.VisualElements.Expand,
    VisualLogging.VisualElements.ToggleSubpane,
    VisualLogging.VisualElements.Toolbar,
]);
export function closestAcrossShadow(element, selector) {
    let current = element;
    while (current) {
        if (current.matches(selector)) {
            return current;
        }
        current = current.parentElementOrShadowHost();
    }
    return null;
}
export function isNonEmptyItem(element) {
    return element.deepTextContent().trim().length > 0;
}
export function isTabTitle(element) {
    let current = element;
    while (current) {
        if (VisualLogging.needsLogging(current)) {
            try {
                const config = VisualLogging.getLoggingConfig(current);
                if (config.ve === VisualLogging.VisualElements.PanelTabHeader) {
                    return true;
                }
            }
            catch {
                // Ignore
            }
        }
        const role = current.getAttribute('role');
        if (role === 'tab') {
            return true;
        }
        if (current.classList.contains('tab-element') || current.classList.contains('tab-header')) {
            return true;
        }
        current = current.parentElementOrShadowHost();
    }
    return false;
}
export function resolveCommentAnchorElement(element) {
    if (isTabTitle(element)) {
        return null;
    }
    let target = element;
    let fallbackCandidate = null;
    while (target) {
        const hasDomainId = target.hasAttribute('data-network-request-id') || target.hasAttribute('data-backend-node-id');
        if (hasDomainId) {
            return isNonEmptyItem(target) ? target : null;
        }
        if (VisualLogging.needsLogging(target)) {
            try {
                const config = VisualLogging.getLoggingConfig(target);
                if (config.ve === VisualLogging.VisualElements.TableRow ||
                    config.ve === VisualLogging.VisualElements.TreeItem) {
                    return isNonEmptyItem(target) ? target : null;
                }
                if (!fallbackCandidate && !IGNORED_MINOR_CONTROLS.has(config.ve)) {
                    fallbackCandidate = target;
                }
            }
            catch {
                // Ignore
            }
        }
        target = target.parentElementOrShadowHost();
    }
    if (fallbackCandidate && isNonEmptyItem(fallbackCandidate)) {
        return fallbackCandidate;
    }
    return null;
}
export function isElementVisible(element) {
    if (!element.isConnected) {
        return false;
    }
    if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) {
        return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}
//# sourceMappingURL=CommentAnchorResolver.js.map