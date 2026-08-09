var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/ui/comments/CommentAnchorResolver.js
var CommentAnchorResolver_exports = {};
__export(CommentAnchorResolver_exports, {
  closestAcrossShadow: () => closestAcrossShadow,
  isElementVisible: () => isElementVisible,
  isNonEmptyItem: () => isNonEmptyItem,
  isTabTitle: () => isTabTitle,
  resolveCommentAnchorElement: () => resolveCommentAnchorElement
});
import * as VisualLogging from "./../visual_logging/visual_logging.js";
var IGNORED_MINOR_CONTROLS = /* @__PURE__ */ new Set([
  VisualLogging.VisualElements.Action,
  VisualLogging.VisualElements.Toggle,
  VisualLogging.VisualElements.Close,
  VisualLogging.VisualElements.Expand,
  VisualLogging.VisualElements.ToggleSubpane,
  VisualLogging.VisualElements.Toolbar
]);
function closestAcrossShadow(element, selector) {
  let current = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElementOrShadowHost();
  }
  return null;
}
function isNonEmptyItem(element) {
  return element.deepTextContent().trim().length > 0;
}
function isTabTitle(element) {
  let current = element;
  while (current) {
    if (VisualLogging.needsLogging(current)) {
      try {
        const config = VisualLogging.getLoggingConfig(current);
        if (config.ve === VisualLogging.VisualElements.PanelTabHeader) {
          return true;
        }
      } catch {
      }
    }
    const role = current.getAttribute("role");
    if (role === "tab") {
      return true;
    }
    if (current.classList.contains("tab-element") || current.classList.contains("tab-header")) {
      return true;
    }
    current = current.parentElementOrShadowHost();
  }
  return false;
}
function resolveCommentAnchorElement(element) {
  if (isTabTitle(element)) {
    return null;
  }
  let target = element;
  let fallbackCandidate = null;
  while (target) {
    const hasDomainId = target.hasAttribute("data-network-request-id") || target.hasAttribute("data-backend-node-id");
    if (hasDomainId) {
      return isNonEmptyItem(target) ? target : null;
    }
    if (VisualLogging.needsLogging(target)) {
      try {
        const config = VisualLogging.getLoggingConfig(target);
        if (config.ve === VisualLogging.VisualElements.TableRow || config.ve === VisualLogging.VisualElements.TreeItem) {
          return isNonEmptyItem(target) ? target : null;
        }
        if (!fallbackCandidate && !IGNORED_MINOR_CONTROLS.has(config.ve)) {
          fallbackCandidate = target;
        }
      } catch {
      }
    }
    target = target.parentElementOrShadowHost();
  }
  if (fallbackCandidate && isNonEmptyItem(fallbackCandidate)) {
    return fallbackCandidate;
  }
  return null;
}
function isElementVisible(element) {
  if (!element.isConnected) {
    return false;
  }
  if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}
export {
  CommentAnchorResolver_exports as CommentAnchorResolver
};
//# sourceMappingURL=comments.js.map
