var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/services/window_bounds/WindowBoundsService.js
var WindowBoundsService_exports = {};
__export(WindowBoundsService_exports, {
  WindowBoundsServiceImpl: () => WindowBoundsServiceImpl
});
import * as Legacy from "./../../ui/legacy/legacy.js";
var windowBoundsServiceImplInstance;
var WindowBoundsServiceImpl = class _WindowBoundsServiceImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!windowBoundsServiceImplInstance || forceNew) {
      windowBoundsServiceImplInstance = new _WindowBoundsServiceImpl();
    }
    return windowBoundsServiceImplInstance;
  }
  getDevToolsBoundingElement() {
    return Legacy.InspectorView.InspectorView.maybeGetInspectorViewInstance()?.element || document.body;
  }
};
export {
  WindowBoundsService_exports as WindowBoundsService
};
//# sourceMappingURL=window_bounds.js.map
