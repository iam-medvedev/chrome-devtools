var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/bfcache.js
var bfcacheRestoreTime = -1;
var getBFCacheRestoreTime = () => bfcacheRestoreTime;
var onBFCacheRestore = (cb) => {
  addEventListener("pageshow", (event) => {
    if (event.persisted) {
      bfcacheRestoreTime = event.timeStamp;
      cb(event);
    }
  }, true);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/generateUniqueID.js
var generateUniqueID = () => {
  return `v4-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/getNavigationEntry.js
var getNavigationEntry = () => {
  const navigationEntry = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  if (navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.responseStart < performance.now()) {
    return navigationEntry;
  }
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/getActivationStart.js
var getActivationStart = () => {
  const navEntry = getNavigationEntry();
  return navEntry && navEntry.activationStart || 0;
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/initMetric.js
var initMetric = (name, value) => {
  const navEntry = getNavigationEntry();
  let navigationType = "navigate";
  if (getBFCacheRestoreTime() >= 0) {
    navigationType = "back-forward-cache";
  } else if (navEntry) {
    if (document.prerendering || getActivationStart() > 0) {
      navigationType = "prerender";
    } else if (document.wasDiscarded) {
      navigationType = "restore";
    } else if (navEntry.type) {
      navigationType = navEntry.type.replace(/_/g, "-");
    }
  }
  const entries = [];
  return {
    name,
    value: typeof value === "undefined" ? -1 : value,
    rating: "good",
    // If needed, will be updated when reported. `const` to keep the type from widening to `string`.
    delta: 0,
    entries,
    id: generateUniqueID(),
    navigationType
  };
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/observe.js
var observe = (type, callback, opts) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      const po2 = new PerformanceObserver((list) => {
        Promise.resolve().then(() => {
          callback(list.getEntries());
        });
      });
      po2.observe(Object.assign({
        type,
        buffered: true
      }, opts || {}));
      return po2;
    }
  } catch (e) {
  }
  return;
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/bindReporter.js
var getRating = (value, thresholds) => {
  if (value > thresholds[1]) {
    return "poor";
  }
  if (value > thresholds[0]) {
    return "needs-improvement";
  }
  return "good";
};
var bindReporter = (callback, metric, thresholds, reportAllChanges) => {
  let prevValue;
  let delta;
  return (forceReport) => {
    if (metric.value >= 0) {
      if (forceReport || reportAllChanges) {
        delta = metric.value - (prevValue || 0);
        if (delta || prevValue === void 0) {
          prevValue = metric.value;
          metric.delta = delta;
          metric.rating = getRating(metric.value, thresholds);
          callback(metric);
        }
      }
    }
  };
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/doubleRAF.js
var doubleRAF = (cb) => {
  requestAnimationFrame(() => requestAnimationFrame(() => cb()));
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/onHidden.js
var onHidden = (cb) => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      cb();
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/runOnce.js
var runOnce = (cb) => {
  let called = false;
  return () => {
    if (!called) {
      cb();
      called = true;
    }
  };
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/getVisibilityWatcher.js
var firstHiddenTime = -1;
var initHiddenTime = () => {
  return document.visibilityState === "hidden" && !document.prerendering ? 0 : Infinity;
};
var onVisibilityUpdate = (event) => {
  if (document.visibilityState === "hidden" && firstHiddenTime > -1) {
    firstHiddenTime = event.type === "visibilitychange" ? event.timeStamp : 0;
    removeChangeListeners();
  }
};
var addChangeListeners = () => {
  addEventListener("visibilitychange", onVisibilityUpdate, true);
  addEventListener("prerenderingchange", onVisibilityUpdate, true);
};
var removeChangeListeners = () => {
  removeEventListener("visibilitychange", onVisibilityUpdate, true);
  removeEventListener("prerenderingchange", onVisibilityUpdate, true);
};
var getVisibilityWatcher = () => {
  if (firstHiddenTime < 0) {
    firstHiddenTime = initHiddenTime();
    addChangeListeners();
    onBFCacheRestore(() => {
      setTimeout(() => {
        firstHiddenTime = initHiddenTime();
        addChangeListeners();
      }, 0);
    });
  }
  return {
    get firstHiddenTime() {
      return firstHiddenTime;
    }
  };
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/whenActivated.js
var whenActivated = (callback) => {
  if (document.prerendering) {
    addEventListener("prerenderingchange", () => callback(), true);
  } else {
    callback();
  }
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onFCP.js
var FCPThresholds = [1800, 3e3];
var onFCP = (onReport, opts) => {
  opts = opts || {};
  whenActivated(() => {
    const visibilityWatcher = getVisibilityWatcher();
    let metric = initMetric("FCP");
    let report;
    const handleEntries = (entries) => {
      entries.forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          po2.disconnect();
          if (entry.startTime < visibilityWatcher.firstHiddenTime) {
            metric.value = Math.max(entry.startTime - getActivationStart(), 0);
            metric.entries.push(entry);
            report(true);
          }
        }
      });
    };
    const po2 = observe("paint", handleEntries);
    if (po2) {
      report = bindReporter(onReport, metric, FCPThresholds, opts.reportAllChanges);
      onBFCacheRestore((event) => {
        metric = initMetric("FCP");
        report = bindReporter(onReport, metric, FCPThresholds, opts.reportAllChanges);
        doubleRAF(() => {
          metric.value = performance.now() - event.timeStamp;
          report(true);
        });
      });
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onCLS.js
var CLSThresholds = [0.1, 0.25];
var onCLS = (onReport, opts) => {
  opts = opts || {};
  onFCP(runOnce(() => {
    let metric = initMetric("CLS", 0);
    let report;
    let sessionValue = 0;
    let sessionEntries = [];
    const handleEntries = (entries) => {
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
        }
      });
      if (sessionValue > metric.value) {
        metric.value = sessionValue;
        metric.entries = sessionEntries;
        report();
      }
    };
    const po2 = observe("layout-shift", handleEntries);
    if (po2) {
      report = bindReporter(onReport, metric, CLSThresholds, opts.reportAllChanges);
      onHidden(() => {
        handleEntries(po2.takeRecords());
        report(true);
      });
      onBFCacheRestore(() => {
        sessionValue = 0;
        metric = initMetric("CLS", 0);
        report = bindReporter(onReport, metric, CLSThresholds, opts.reportAllChanges);
        doubleRAF(() => report());
      });
      setTimeout(report, 0);
    }
  }));
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/polyfills/interactionCountPolyfill.js
var interactionCountEstimate = 0;
var minKnownInteractionId = Infinity;
var maxKnownInteractionId = 0;
var updateEstimate = (entries) => {
  entries.forEach((e) => {
    if (e.interactionId) {
      minKnownInteractionId = Math.min(minKnownInteractionId, e.interactionId);
      maxKnownInteractionId = Math.max(maxKnownInteractionId, e.interactionId);
      interactionCountEstimate = maxKnownInteractionId ? (maxKnownInteractionId - minKnownInteractionId) / 7 + 1 : 0;
    }
  });
};
var po;
var getInteractionCount = () => {
  return po ? interactionCountEstimate : performance.interactionCount || 0;
};
var initInteractionCountPolyfill = () => {
  if ("interactionCount" in performance || po)
    return;
  po = observe("event", updateEstimate, {
    type: "event",
    buffered: true,
    durationThreshold: 0
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/interactions.js
var longestInteractionList = [];
var longestInteractionMap = /* @__PURE__ */ new Map();
var DEFAULT_DURATION_THRESHOLD = 40;
var prevInteractionCount = 0;
var getInteractionCountForNavigation = () => {
  return getInteractionCount() - prevInteractionCount;
};
var resetInteractions = () => {
  prevInteractionCount = getInteractionCount();
  longestInteractionList.length = 0;
  longestInteractionMap.clear();
};
var estimateP98LongestInteraction = () => {
  const candidateInteractionIndex = Math.min(longestInteractionList.length - 1, Math.floor(getInteractionCountForNavigation() / 50));
  return longestInteractionList[candidateInteractionIndex];
};
var MAX_INTERACTIONS_TO_CONSIDER = 10;
var entryPreProcessingCallbacks = [];
var processInteractionEntry = (entry) => {
  entryPreProcessingCallbacks.forEach((cb) => cb(entry));
  if (!(entry.interactionId || entry.entryType === "first-input"))
    return;
  const minLongestInteraction = longestInteractionList[longestInteractionList.length - 1];
  const existingInteraction = longestInteractionMap.get(entry.interactionId);
  if (existingInteraction || longestInteractionList.length < MAX_INTERACTIONS_TO_CONSIDER || entry.duration > minLongestInteraction.latency) {
    if (existingInteraction) {
      if (entry.duration > existingInteraction.latency) {
        existingInteraction.entries = [entry];
        existingInteraction.latency = entry.duration;
      } else if (entry.duration === existingInteraction.latency && entry.startTime === existingInteraction.entries[0].startTime) {
        existingInteraction.entries.push(entry);
      }
    } else {
      const interaction = {
        id: entry.interactionId,
        latency: entry.duration,
        entries: [entry]
      };
      longestInteractionMap.set(interaction.id, interaction);
      longestInteractionList.push(interaction);
    }
    longestInteractionList.sort((a, b) => b.latency - a.latency);
    if (longestInteractionList.length > MAX_INTERACTIONS_TO_CONSIDER) {
      longestInteractionList.splice(MAX_INTERACTIONS_TO_CONSIDER).forEach((i) => longestInteractionMap.delete(i.id));
    }
  }
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/whenIdle.js
var whenIdle = (cb) => {
  const rIC = self.requestIdleCallback || self.setTimeout;
  let handle = -1;
  cb = runOnce(cb);
  if (document.visibilityState === "hidden") {
    cb();
  } else {
    handle = rIC(cb);
    onHidden(cb);
  }
  return handle;
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onINP.js
var INPThresholds = [200, 500];
var onINP = (onReport, opts) => {
  if (!("PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype)) {
    return;
  }
  opts = opts || {};
  whenActivated(() => {
    initInteractionCountPolyfill();
    let metric = initMetric("INP");
    let report;
    const handleEntries = (entries) => {
      whenIdle(() => {
        entries.forEach(processInteractionEntry);
        const inp = estimateP98LongestInteraction();
        if (inp && inp.latency !== metric.value) {
          metric.value = inp.latency;
          metric.entries = inp.entries;
          report();
        }
      });
    };
    const po2 = observe("event", handleEntries, {
      // Event Timing entries have their durations rounded to the nearest 8ms,
      // so a duration of 40ms would be any event that spans 2.5 or more frames
      // at 60Hz. This threshold is chosen to strike a balance between usefulness
      // and performance. Running this callback for any interaction that spans
      // just one or two frames is likely not worth the insight that could be
      // gained.
      durationThreshold: opts.durationThreshold ?? DEFAULT_DURATION_THRESHOLD
    });
    report = bindReporter(onReport, metric, INPThresholds, opts.reportAllChanges);
    if (po2) {
      po2.observe({ type: "first-input", buffered: true });
      onHidden(() => {
        handleEntries(po2.takeRecords());
        report(true);
      });
      onBFCacheRestore(() => {
        resetInteractions();
        metric = initMetric("INP");
        report = bindReporter(onReport, metric, INPThresholds, opts.reportAllChanges);
      });
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onLCP.js
var LCPThresholds = [2500, 4e3];
var reportedMetricIDs = {};
var onLCP = (onReport, opts) => {
  opts = opts || {};
  whenActivated(() => {
    const visibilityWatcher = getVisibilityWatcher();
    let metric = initMetric("LCP");
    let report;
    const handleEntries = (entries) => {
      if (!opts.reportAllChanges) {
        entries = entries.slice(-1);
      }
      entries.forEach((entry) => {
        if (entry.startTime < visibilityWatcher.firstHiddenTime) {
          metric.value = Math.max(entry.startTime - getActivationStart(), 0);
          metric.entries = [entry];
          report();
        }
      });
    };
    const po2 = observe("largest-contentful-paint", handleEntries);
    if (po2) {
      report = bindReporter(onReport, metric, LCPThresholds, opts.reportAllChanges);
      const stopListening = runOnce(() => {
        if (!reportedMetricIDs[metric.id]) {
          handleEntries(po2.takeRecords());
          po2.disconnect();
          reportedMetricIDs[metric.id] = true;
          report(true);
        }
      });
      ["keydown", "click"].forEach((type) => {
        addEventListener(type, () => whenIdle(stopListening), {
          once: true,
          capture: true
        });
      });
      onHidden(stopListening);
      onBFCacheRestore((event) => {
        metric = initMetric("LCP");
        report = bindReporter(onReport, metric, LCPThresholds, opts.reportAllChanges);
        doubleRAF(() => {
          metric.value = performance.now() - event.timeStamp;
          reportedMetricIDs[metric.id] = true;
          report(true);
        });
      });
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onTTFB.js
var TTFBThresholds = [800, 1800];
var whenReady = (callback) => {
  if (document.prerendering) {
    whenActivated(() => whenReady(callback));
  } else if (document.readyState !== "complete") {
    addEventListener("load", () => whenReady(callback), true);
  } else {
    setTimeout(callback, 0);
  }
};
var onTTFB = (onReport, opts) => {
  opts = opts || {};
  let metric = initMetric("TTFB");
  let report = bindReporter(onReport, metric, TTFBThresholds, opts.reportAllChanges);
  whenReady(() => {
    const navigationEntry = getNavigationEntry();
    if (navigationEntry) {
      metric.value = Math.max(navigationEntry.responseStart - getActivationStart(), 0);
      metric.entries = [navigationEntry];
      report(true);
      onBFCacheRestore(() => {
        metric = initMetric("TTFB", 0);
        report = bindReporter(onReport, metric, TTFBThresholds, opts.reportAllChanges);
        report(true);
      });
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/polyfills/firstInputPolyfill.js
var firstInputEvent;
var firstInputDelay;
var firstInputTimeStamp;
var callbacks;
var listenerOpts = { passive: true, capture: true };
var startTimeStamp = /* @__PURE__ */ new Date();
var firstInputPolyfill = (onFirstInput) => {
  callbacks.push(onFirstInput);
  reportFirstInputDelayIfRecordedAndValid();
};
var resetFirstInputPolyfill = () => {
  callbacks = [];
  firstInputDelay = -1;
  firstInputEvent = null;
  eachEventType(addEventListener);
};
var recordFirstInputDelay = (delay, event) => {
  if (!firstInputEvent) {
    firstInputEvent = event;
    firstInputDelay = delay;
    firstInputTimeStamp = /* @__PURE__ */ new Date();
    eachEventType(removeEventListener);
    reportFirstInputDelayIfRecordedAndValid();
  }
};
var reportFirstInputDelayIfRecordedAndValid = () => {
  if (firstInputDelay >= 0 && // @ts-ignore (subtracting two dates always returns a number)
  firstInputDelay < firstInputTimeStamp - startTimeStamp) {
    const entry = {
      entryType: "first-input",
      name: firstInputEvent.type,
      target: firstInputEvent.target,
      cancelable: firstInputEvent.cancelable,
      startTime: firstInputEvent.timeStamp,
      processingStart: firstInputEvent.timeStamp + firstInputDelay
    };
    callbacks.forEach(function(callback) {
      callback(entry);
    });
    callbacks = [];
  }
};
var onPointerDown = (delay, event) => {
  const onPointerUp = () => {
    recordFirstInputDelay(delay, event);
    removePointerEventListeners();
  };
  const onPointerCancel = () => {
    removePointerEventListeners();
  };
  const removePointerEventListeners = () => {
    removeEventListener("pointerup", onPointerUp, listenerOpts);
    removeEventListener("pointercancel", onPointerCancel, listenerOpts);
  };
  addEventListener("pointerup", onPointerUp, listenerOpts);
  addEventListener("pointercancel", onPointerCancel, listenerOpts);
};
var onInput = (event) => {
  if (event.cancelable) {
    const isEpochTime = event.timeStamp > 1e12;
    const now = isEpochTime ? /* @__PURE__ */ new Date() : performance.now();
    const delay = now - event.timeStamp;
    if (event.type == "pointerdown") {
      onPointerDown(delay, event);
    } else {
      recordFirstInputDelay(delay, event);
    }
  }
};
var eachEventType = (callback) => {
  const eventTypes = ["mousedown", "keydown", "touchstart", "pointerdown"];
  eventTypes.forEach((type) => callback(type, onInput, listenerOpts));
};

// gen/front_end/third_party/web-vitals/package/dist/modules/onFID.js
var FIDThresholds = [100, 300];
var onFID = (onReport, opts) => {
  opts = opts || {};
  whenActivated(() => {
    const visibilityWatcher = getVisibilityWatcher();
    let metric = initMetric("FID");
    let report;
    const handleEntry = (entry) => {
      if (entry.startTime < visibilityWatcher.firstHiddenTime) {
        metric.value = entry.processingStart - entry.startTime;
        metric.entries.push(entry);
        report(true);
      }
    };
    const handleEntries = (entries) => {
      entries.forEach(handleEntry);
    };
    const po2 = observe("first-input", handleEntries);
    report = bindReporter(onReport, metric, FIDThresholds, opts.reportAllChanges);
    if (po2) {
      onHidden(runOnce(() => {
        handleEntries(po2.takeRecords());
        po2.disconnect();
      }));
      onBFCacheRestore(() => {
        metric = initMetric("FID");
        report = bindReporter(onReport, metric, FIDThresholds, opts.reportAllChanges);
        resetFirstInputPolyfill();
        firstInputPolyfill(handleEntry);
      });
    }
  });
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/index.js
var attribution_exports = {};
__export(attribution_exports, {
  CLSThresholds: () => CLSThresholds,
  FCPThresholds: () => FCPThresholds,
  FIDThresholds: () => FIDThresholds,
  INPThresholds: () => INPThresholds,
  LCPThresholds: () => LCPThresholds,
  TTFBThresholds: () => TTFBThresholds,
  onCLS: () => onCLS2,
  onFCP: () => onFCP2,
  onFID: () => onFID2,
  onINP: () => onINP2,
  onLCP: () => onLCP2,
  onTTFB: () => onTTFB2
});

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/getLoadState.js
var getLoadState = (timestamp) => {
  if (document.readyState === "loading") {
    return "loading";
  } else {
    const navigationEntry = getNavigationEntry();
    if (navigationEntry) {
      if (timestamp < navigationEntry.domInteractive) {
        return "loading";
      } else if (navigationEntry.domContentLoadedEventStart === 0 || timestamp < navigationEntry.domContentLoadedEventStart) {
        return "dom-interactive";
      } else if (navigationEntry.domComplete === 0 || timestamp < navigationEntry.domComplete) {
        return "dom-content-loaded";
      }
    }
  }
  return "complete";
};

// gen/front_end/third_party/web-vitals/package/dist/modules/lib/getSelector.js
var getName = (node) => {
  const name = node.nodeName;
  return node.nodeType === 1 ? name.toLowerCase() : name.toUpperCase().replace(/^#/, "");
};
var getSelector = (node, maxLen) => {
  let sel = "";
  try {
    while (node && node.nodeType !== 9) {
      const el = node;
      const part = el.id ? "#" + el.id : getName(el) + (el.classList && el.classList.value && el.classList.value.trim() && el.classList.value.trim().length ? "." + el.classList.value.trim().replace(/\s+/g, ".") : "");
      if (sel.length + part.length > (maxLen || 100) - 1)
        return sel || part;
      sel = sel ? part + ">" + sel : part;
      if (el.id)
        break;
      node = el.parentNode;
    }
  } catch (err) {
  }
  return sel;
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onCLS.js
var getLargestLayoutShiftEntry = (entries) => {
  return entries.reduce((a, b) => a && a.value > b.value ? a : b);
};
var getLargestLayoutShiftSource = (sources) => {
  return sources.find((s) => s.node && s.node.nodeType === 1) || sources[0];
};
var attributeCLS = (metric) => {
  let attribution = {};
  if (metric.entries.length) {
    const largestEntry = getLargestLayoutShiftEntry(metric.entries);
    if (largestEntry && largestEntry.sources && largestEntry.sources.length) {
      const largestSource = getLargestLayoutShiftSource(largestEntry.sources);
      if (largestSource) {
        attribution = {
          largestShiftTarget: getSelector(largestSource.node),
          largestShiftTime: largestEntry.startTime,
          largestShiftValue: largestEntry.value,
          largestShiftSource: largestSource,
          largestShiftEntry: largestEntry,
          loadState: getLoadState(largestEntry.startTime)
        };
      }
    }
  }
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onCLS2 = (onReport, opts) => {
  onCLS((metric) => {
    const metricWithAttribution = attributeCLS(metric);
    onReport(metricWithAttribution);
  }, opts);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onFCP.js
var attributeFCP = (metric) => {
  let attribution = {
    timeToFirstByte: 0,
    firstByteToFCP: metric.value,
    loadState: getLoadState(getBFCacheRestoreTime())
  };
  if (metric.entries.length) {
    const navigationEntry = getNavigationEntry();
    const fcpEntry = metric.entries[metric.entries.length - 1];
    if (navigationEntry) {
      const activationStart = navigationEntry.activationStart || 0;
      const ttfb = Math.max(0, navigationEntry.responseStart - activationStart);
      attribution = {
        timeToFirstByte: ttfb,
        firstByteToFCP: metric.value - ttfb,
        loadState: getLoadState(metric.entries[0].startTime),
        navigationEntry,
        fcpEntry
      };
    }
  }
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onFCP2 = (onReport, opts) => {
  onFCP((metric) => {
    const metricWithAttribution = attributeFCP(metric);
    onReport(metricWithAttribution);
  }, opts);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onINP.js
var MAX_PREVIOUS_FRAMES = 50;
var loafObserver;
var pendingLoAFs = [];
var pendingEntriesGroups = [];
var latestProcessingEnd = 0;
var entryToEntriesGroupMap = /* @__PURE__ */ new WeakMap();
var interactionTargetMap = /* @__PURE__ */ new Map();
var idleHandle = -1;
var handleLoAFEntries = (entries) => {
  pendingLoAFs = pendingLoAFs.concat(entries);
  queueCleanup();
};
var saveInteractionTarget = (entry) => {
};
var groupEntriesByRenderTime = (entry) => {
  const renderTime = entry.startTime + entry.duration;
  let group;
  latestProcessingEnd = Math.max(latestProcessingEnd, entry.processingEnd);
  for (let i = pendingEntriesGroups.length - 1; i >= 0; i--) {
    const potentialGroup = pendingEntriesGroups[i];
    if (Math.abs(renderTime - potentialGroup.renderTime) <= 8) {
      group = potentialGroup;
      group.startTime = Math.min(entry.startTime, group.startTime);
      group.processingStart = Math.min(entry.processingStart, group.processingStart);
      group.processingEnd = Math.max(entry.processingEnd, group.processingEnd);
      group.entries.push(entry);
      break;
    }
  }
  if (!group) {
    group = {
      startTime: entry.startTime,
      processingStart: entry.processingStart,
      processingEnd: entry.processingEnd,
      renderTime,
      entries: [entry]
    };
    pendingEntriesGroups.push(group);
  }
  if (entry.interactionId || entry.entryType === "first-input") {
    entryToEntriesGroupMap.set(entry, group);
  }
  queueCleanup();
};
var queueCleanup = () => {
  if (idleHandle < 0) {
    idleHandle = whenIdle(cleanupEntries);
  }
};
var cleanupEntries = () => {
  if (interactionTargetMap.size > 10) {
    interactionTargetMap.forEach((_, key) => {
      if (!longestInteractionMap.has(key)) {
        interactionTargetMap.delete(key);
      }
    });
  }
  const longestInteractionGroups = longestInteractionList.map((i) => {
    return entryToEntriesGroupMap.get(i.entries[0]);
  });
  const minIndex = pendingEntriesGroups.length - MAX_PREVIOUS_FRAMES;
  pendingEntriesGroups = pendingEntriesGroups.filter((group, index) => {
    if (index >= minIndex)
      return true;
    return longestInteractionGroups.includes(group);
  });
  const loafsToKeep = /* @__PURE__ */ new Set();
  for (let i = 0; i < pendingEntriesGroups.length; i++) {
    const group = pendingEntriesGroups[i];
    getIntersectingLoAFs(group.startTime, group.processingEnd).forEach((loaf) => {
      loafsToKeep.add(loaf);
    });
  }
  const prevFrameIndexCutoff = pendingLoAFs.length - 1 - MAX_PREVIOUS_FRAMES;
  pendingLoAFs = pendingLoAFs.filter((loaf, index) => {
    if (loaf.startTime > latestProcessingEnd && index > prevFrameIndexCutoff) {
      return true;
    }
    return loafsToKeep.has(loaf);
  });
  idleHandle = -1;
};
entryPreProcessingCallbacks.push(saveInteractionTarget, groupEntriesByRenderTime);
var getIntersectingLoAFs = (start, end) => {
  const intersectingLoAFs = [];
  for (let i = 0, loaf; loaf = pendingLoAFs[i]; i++) {
    if (loaf.startTime + loaf.duration < start)
      continue;
    if (loaf.startTime > end)
      break;
    intersectingLoAFs.push(loaf);
  }
  return intersectingLoAFs;
};
var attributeINP = (metric) => {
  const firstEntry = metric.entries[0];
  const group = entryToEntriesGroupMap.get(firstEntry);
  const processingStart = firstEntry.processingStart;
  const processingEnd = group.processingEnd;
  const processedEventEntries = group.entries.sort((a, b) => {
    return a.processingStart - b.processingStart;
  });
  const longAnimationFrameEntries = getIntersectingLoAFs(firstEntry.startTime, processingEnd);
  const firstEntryWithTarget = metric.entries.find((entry) => entry.target);
  const interactionTargetElement = firstEntryWithTarget && firstEntryWithTarget.target || interactionTargetMap.get(firstEntry.interactionId);
  const nextPaintTimeCandidates = [
    firstEntry.startTime + firstEntry.duration,
    processingEnd
  ].concat(longAnimationFrameEntries.map((loaf) => loaf.startTime + loaf.duration));
  const nextPaintTime = Math.max.apply(Math, nextPaintTimeCandidates);
  const attribution = {
    interactionTarget: getSelector(interactionTargetElement),
    interactionTargetElement,
    interactionType: firstEntry.name.startsWith("key") ? "keyboard" : "pointer",
    interactionTime: firstEntry.startTime,
    nextPaintTime,
    processedEventEntries,
    longAnimationFrameEntries,
    inputDelay: processingStart - firstEntry.startTime,
    processingDuration: processingEnd - processingStart,
    presentationDelay: Math.max(nextPaintTime - processingEnd, 0),
    loadState: getLoadState(firstEntry.startTime)
  };
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onINP2 = (onReport, opts) => {
  if (!loafObserver) {
    loafObserver = observe("long-animation-frame", handleLoAFEntries);
  }
  onINP((metric) => {
    const metricWithAttribution = attributeINP(metric);
    onReport(metricWithAttribution);
  }, opts);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onLCP.js
var attributeLCP = (metric) => {
  let attribution = {
    timeToFirstByte: 0,
    resourceLoadDelay: 0,
    resourceLoadDuration: 0,
    elementRenderDelay: metric.value
  };
  if (metric.entries.length) {
    const navigationEntry = getNavigationEntry();
    if (navigationEntry) {
      const activationStart = navigationEntry.activationStart || 0;
      const lcpEntry = metric.entries[metric.entries.length - 1];
      const lcpResourceEntry = lcpEntry.url && performance.getEntriesByType("resource").filter((e) => e.name === lcpEntry.url)[0];
      const ttfb = Math.max(0, navigationEntry.responseStart - activationStart);
      const lcpRequestStart = Math.max(
        ttfb,
        // Prefer `requestStart` (if TOA is set), otherwise use `startTime`.
        lcpResourceEntry ? (lcpResourceEntry.requestStart || lcpResourceEntry.startTime) - activationStart : 0
      );
      const lcpResponseEnd = Math.max(lcpRequestStart, lcpResourceEntry ? lcpResourceEntry.responseEnd - activationStart : 0);
      const lcpRenderTime = Math.max(lcpResponseEnd, lcpEntry.startTime - activationStart);
      attribution = {
        element: getSelector(lcpEntry.element),
        timeToFirstByte: ttfb,
        resourceLoadDelay: lcpRequestStart - ttfb,
        resourceLoadDuration: lcpResponseEnd - lcpRequestStart,
        elementRenderDelay: lcpRenderTime - lcpResponseEnd,
        navigationEntry,
        lcpEntry
      };
      if (lcpEntry.url) {
        attribution.url = lcpEntry.url;
      }
      if (lcpResourceEntry) {
        attribution.lcpResourceEntry = lcpResourceEntry;
      }
    }
  }
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onLCP2 = (onReport, opts) => {
  onLCP((metric) => {
    const metricWithAttribution = attributeLCP(metric);
    onReport(metricWithAttribution);
  }, opts);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onTTFB.js
var attributeTTFB = (metric) => {
  let attribution = {
    waitingDuration: 0,
    cacheDuration: 0,
    dnsDuration: 0,
    connectionDuration: 0,
    requestDuration: 0
  };
  if (metric.entries.length) {
    const navigationEntry = metric.entries[0];
    const activationStart = navigationEntry.activationStart || 0;
    const waitEnd = Math.max((navigationEntry.workerStart || navigationEntry.fetchStart) - activationStart, 0);
    const dnsStart = Math.max(navigationEntry.domainLookupStart - activationStart, 0);
    const connectStart = Math.max(navigationEntry.connectStart - activationStart, 0);
    const connectEnd = Math.max(navigationEntry.connectEnd - activationStart, 0);
    attribution = {
      waitingDuration: waitEnd,
      cacheDuration: dnsStart - waitEnd,
      // dnsEnd usually equals connectStart but use connectStart over dnsEnd
      // for dnsDuration in case there ever is a gap.
      dnsDuration: connectStart - dnsStart,
      connectionDuration: connectEnd - connectStart,
      // There is often a gap between connectEnd and requestStart. Attribute
      // that to requestDuration so connectionDuration remains 0 for
      // service worker controlled requests were connectStart and connectEnd
      // are the same.
      requestDuration: metric.value - connectEnd,
      navigationEntry
    };
  }
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onTTFB2 = (onReport, opts) => {
  onTTFB((metric) => {
    const metricWithAttribution = attributeTTFB(metric);
    onReport(metricWithAttribution);
  }, opts);
};

// gen/front_end/third_party/web-vitals/package/dist/modules/attribution/onFID.js
var attributeFID = (metric) => {
  const fidEntry = metric.entries[0];
  const attribution = {
    eventTarget: getSelector(fidEntry.target),
    eventType: fidEntry.name,
    eventTime: fidEntry.startTime,
    eventEntry: fidEntry,
    loadState: getLoadState(fidEntry.startTime)
  };
  const metricWithAttribution = Object.assign(metric, { attribution });
  return metricWithAttribution;
};
var onFID2 = (onReport, opts) => {
  onFID((metric) => {
    const metricWithAttribution = attributeFID(metric);
    onReport(metricWithAttribution);
  }, opts);
};
export {
  attribution_exports as Attribution,
  CLSThresholds,
  FCPThresholds,
  FIDThresholds,
  INPThresholds,
  LCPThresholds,
  TTFBThresholds,
  attributeINP,
  entryPreProcessingCallbacks,
  onBFCacheRestore,
  onCLS,
  onFCP,
  onFID,
  onINP,
  onLCP,
  onTTFB
};
//# sourceMappingURL=web-vitals.js.map
