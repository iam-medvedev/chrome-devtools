// gen/front_end/legacy_test_runner/test_runner/test_runner.prebundle.js
import * as Root2 from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Tracing from "./../../services/tracing/tracing.js";

// gen/front_end/legacy_test_runner/test_runner/TestRunner.js
import * as Common from "./../../core/common/common.js";
import * as ProtocolClient from "./../../core/protocol_client/protocol_client.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as CodeHighlighter from "./../../ui/components/code_highlighter/code_highlighter.js";
import * as UI from "./../../ui/legacy/legacy.js";
function isDebugTest() {
  return !self.testRunner || Boolean(Root.Runtime.Runtime.queryParam("debugFrontend"));
}
function _printDevToolsConsole() {
  if (isDebugTest()) {
    return;
  }
  console.log = (...args) => {
    addResult(`log: ${args}`);
  };
  console.error = (...args) => {
    addResult(`error: ${args}`);
  };
  console.info = (...args) => {
    addResult(`info: ${args}`);
  };
  console.assert = (assertionCondition, ...args) => {
    if (!assertionCondition) {
      addResult(`ASSERTION FAILURE: ${args.join(" ")}`);
    }
  };
}
self["onerror"] = (message, source, lineno, colno, error) => {
  addResult("TEST ENDED IN ERROR: " + error.stack);
  completeTest();
};
(() => {
  self.addEventListener("unhandledrejection", (event) => {
    addResult(`PROMISE FAILURE: ${event.reason.stack ?? event.reason}`);
    completeTest();
  });
})();
_printDevToolsConsole();
var _results = [];
var _innerAddResult = (text) => {
  _results.push(String(text));
};
function setInnerResult(updatedInnerResult) {
  _innerAddResult = updatedInnerResult;
}
function addResult(text) {
  _innerAddResult(text);
}
var completed = false;
var _innerCompleteTest = () => {
  if (completed) {
    return;
  }
  completed = true;
  flushResults();
  self.testRunner.notifyDone();
};
function setInnerCompleteTest(updatedInnerCompleteTest) {
  _innerCompleteTest = updatedInnerCompleteTest;
}
function completeTest() {
  _innerCompleteTest();
}
self.TestRunner = self.TestRunner || {};
function flushResults() {
  Array.prototype.forEach.call(document.documentElement.childNodes, (x) => x.remove());
  const outputElement = document.createElement("div");
  if (outputElement.style) {
    outputElement.style.whiteSpace = "pre";
    outputElement.style.height = "10px";
    outputElement.style.overflow = "hidden";
  }
  document.documentElement.appendChild(outputElement);
  for (let i = 0; i < _results.length; i++) {
    outputElement.appendChild(document.createTextNode(_results[i]));
    outputElement.appendChild(document.createElement("br"));
  }
  _results = [];
}
function addResults(textArray) {
  if (!textArray) {
    return;
  }
  for (let i = 0, size = textArray.length; i < size; ++i) {
    addResult(textArray[i]);
  }
}
function runTests(tests) {
  nextTest();
  function nextTest() {
    const test = tests.shift();
    if (!test) {
      completeTest();
      return;
    }
    addResult("\ntest: " + test.name);
    let testPromise = test();
    if (!(testPromise instanceof Promise)) {
      testPromise = Promise.resolve();
    }
    testPromise.then(nextTest);
  }
}
function addSniffer(receiver, methodName, override2, opt_sticky) {
  override2 = safeWrap(override2);
  const original = receiver[methodName];
  if (typeof original !== "function") {
    throw new Error("Cannot find method to override: " + methodName);
  }
  receiver[methodName] = function(var_args) {
    let result;
    try {
      result = original.apply(this, arguments);
    } finally {
      if (!opt_sticky) {
        receiver[methodName] = original;
      }
    }
    try {
      Array.prototype.push.call(arguments, result);
      override2.apply(this, arguments);
    } catch (e) {
      throw new Error("Exception in overriden method '" + methodName + "': " + e);
    }
    return result;
  };
}
function addSnifferPromise(receiver, methodName) {
  return new Promise(function(resolve, reject) {
    const original = receiver[methodName];
    if (typeof original !== "function") {
      reject("Cannot find method to override: " + methodName);
      return;
    }
    receiver[methodName] = function(var_args) {
      let result;
      try {
        result = original.apply(this, arguments);
      } finally {
        receiver[methodName] = original;
      }
      try {
        Array.prototype.push.call(arguments, result);
        resolve.apply(this, arguments);
      } catch (e) {
        reject("Exception in overridden method '" + methodName + "': " + e);
        completeTest();
      }
      return result;
    };
  });
}
function selectTextInTextNode(textNode, start, end) {
  start = start || 0;
  end = end || textNode.textContent.length;
  if (start < 0) {
    start = end + start;
  }
  const selection = textNode.getComponentSelection();
  selection.removeAllRanges();
  const range = textNode.ownerDocument.createRange();
  range.setStart(textNode, start);
  range.setEnd(textNode, end);
  selection.addRange(range);
  return textNode;
}
function showPanel(panel) {
  return UI.ViewManager.ViewManager.instance().showView(panel);
}
function createKeyEvent(key, ctrlKey, altKey, shiftKey, metaKey) {
  return new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ctrlKey: Boolean(ctrlKey),
    altKey: Boolean(altKey),
    shiftKey: Boolean(shiftKey),
    metaKey: Boolean(metaKey)
  });
}
function safeWrap(func, onexception) {
  function result() {
    if (!func) {
      return;
    }
    const wrapThis = this;
    try {
      return func.apply(wrapThis, arguments);
    } catch (e) {
      addResult("Exception while running: " + func + "\n" + (e.stack || e));
      if (onexception) {
        safeWrap(onexception)();
      } else {
        completeTest();
      }
    }
  }
  return result;
}
function safeAsyncWrap(func) {
  async function result() {
    if (!func) {
      return;
    }
    const wrapThis = this;
    try {
      return await func.apply(wrapThis, arguments);
    } catch (e) {
      addResult("Exception while running: " + func + "\n" + (e.stack || e));
      completeTest();
    }
  }
  return result;
}
function textContentWithLineBreaks(node) {
  function padding(currentNode2) {
    let result = 0;
    while (currentNode2 && currentNode2 !== node) {
      if (currentNode2.nodeName === "OL" && !(currentNode2.classList && currentNode2.classList.contains("object-properties-section"))) {
        ++result;
      }
      currentNode2 = currentNode2.parentNode;
    }
    return Array(result * 4 + 1).join(" ");
  }
  let buffer = "";
  let currentNode = node;
  let ignoreFirst = false;
  while (currentNode.traverseNextNode(node)) {
    currentNode = currentNode.traverseNextNode(node);
    if (currentNode.nodeType === Node.TEXT_NODE && currentNode.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
      buffer += currentNode.nodeValue;
    } else if (currentNode.nodeName === "LI" || currentNode.nodeName === "TR") {
      if (!ignoreFirst) {
        buffer += "\n" + padding(currentNode);
      } else {
        ignoreFirst = false;
      }
    } else if (currentNode.nodeName === "STYLE") {
      currentNode = currentNode.traverseNextNode(node);
      continue;
    } else if (currentNode.classList && currentNode.classList.contains("object-properties-section")) {
      ignoreFirst = true;
    }
  }
  return buffer;
}
function textContentWithLineBreaksTrimmed(node) {
  return textContentWithLineBreaks(node).replace(/\s{3,}/g, " ");
}
function textContentWithoutStyles(node) {
  let buffer = "";
  let currentNode = node;
  while (true) {
    currentNode = currentNode.traverseNextNode(node, currentNode.tagName === "DEVTOOLS-CSS-LENGTH" || currentNode.tagName === "DEVTOOLS-ICON");
    if (!currentNode) {
      break;
    }
    if (currentNode.nodeType === Node.TEXT_NODE && currentNode.parentElement?.tagName !== "STYLE") {
      buffer += currentNode.nodeValue;
    } else if (currentNode.tagName === "DEVTOOLS-TOOLTIP") {
      currentNode = currentNode.lastChild?.traverseNextNode(node) ?? currentNode.traverseNextNode(node);
    } else if (currentNode.nodeName === "STYLE") {
      currentNode = currentNode.traverseNextNode(node);
    }
  }
  return buffer;
}
async function evaluateInPageRemoteObject(code) {
  const response = await _evaluateInPage(code);
  return TestRunner.runtimeModel.createRemoteObject(response.result);
}
async function evaluateInPage(code, callback) {
  const response = await _evaluateInPage(code);
  safeWrap(callback)(response.result.value, response.exceptionDetails);
}
var _evaluateInPageCounter = 0;
async function _evaluateInPage(code) {
  const lines = new Error().stack.split("at ");
  const testScriptURL = (
    /** @type {string} */
    Root.Runtime.Runtime.queryParam("test")
  );
  const functionLine = lines.reduce((acc, line) => line.includes(testScriptURL) ? line : acc, lines[lines.length - 2]);
  const components = functionLine.trim().split("/");
  const source = components[components.length - 1].slice(0, -1).split(":");
  const fileName = source[0];
  const sourceURL = `test://evaluations/${_evaluateInPageCounter++}/` + fileName;
  const lineOffset = parseInt(source[1], 10);
  code = "\n".repeat(lineOffset - 1) + code;
  if (code.indexOf("sourceURL=") === -1) {
    code += `//# sourceURL=${sourceURL}`;
  }
  const response = await TestRunner.RuntimeAgent.invoke_evaluate({ expression: code, objectGroup: "console" });
  const error = response.getError();
  if (error) {
    addResult("Error: " + error);
    completeTest();
    return;
  }
  return response;
}
function logResponseError(response) {
  let errorMessage = "Error: ";
  if (response.getError()) {
    errorMessage += response.getError();
  } else if (response.exceptionDetails) {
    errorMessage += response.exceptionDetails.text;
    if (response.exceptionDetails.exception) {
      errorMessage += " " + response.exceptionDetails.exception.description;
    }
  }
  addResult(errorMessage);
}
async function evaluateInPageAnonymously(code, userGesture) {
  const response = await TestRunner.RuntimeAgent.invoke_evaluate({ expression: code, objectGroup: "console", userGesture });
  if (response && !response.exceptionDetails && !response.getError()) {
    return response.result.value;
  }
  logResponseError(response);
  completeTest();
}
function evaluateInPagePromise(code) {
  return new Promise((success) => evaluateInPage(code, success));
}
async function evaluateInPageAsync(code) {
  const response = await TestRunner.RuntimeAgent.invoke_evaluate({ expression: code, objectGroup: "console", includeCommandLineAPI: false, awaitPromise: true });
  if (response && !response.exceptionDetails && !response.getError()) {
    return response.result.value;
  }
  logResponseError(response);
  completeTest();
}
function callFunctionInPageAsync(name, args) {
  args = args || [];
  return evaluateInPageAsync(name + "(" + args.map((a) => JSON.stringify(a)).join(",") + ")");
}
function evaluateInPageWithTimeout(code, userGesture) {
  evaluateInPageAnonymously("setTimeout(unescape('" + escape(code) + "'), 1)", userGesture);
}
function evaluateFunctionInOverlay(func, callback) {
  const expression = 'internals.evaluateInInspectorOverlay("(" + ' + func + ' + ")()")';
  const mainContext = TestRunner.runtimeModel.executionContexts()[0];
  mainContext.evaluate(
    {
      expression,
      objectGroup: "",
      includeCommandLineAPI: false,
      silent: false,
      returnByValue: true,
      generatePreview: false
    },
    /* userGesture */
    false,
    /* awaitPromise*/
    false
  ).then((result) => void callback(result.object.value));
}
function check(passCondition, failureText) {
  if (!passCondition) {
    addResult("FAIL: " + failureText);
  }
}
function deprecatedRunAfterPendingDispatches(callback) {
  ProtocolClient.InspectorBackend.test.deprecatedRunAfterPendingDispatches(callback);
}
function loadHTML(html) {
  if (!html.includes("<base")) {
    const doctypeRegex = /(<!DOCTYPE.*?>)/i;
    const baseTag = `<base href="${url()}">`;
    if (html.match(doctypeRegex)) {
      html = html.replace(doctypeRegex, "$1" + baseTag);
    } else {
      html = baseTag + html;
    }
  }
  html = html.replace(/'/g, "\\'").replace(/\n/g, "\\n");
  return evaluateInPageAnonymously(`document.write(\`${html}\`);document.close();`);
}
function addScriptTag(path) {
  return evaluateInPageAsync(`
    (function(){
      let script = document.createElement('script');
      script.src = '${path}';
      document.head.append(script);
      return new Promise(f => script.onload = f);
    })();
  `);
}
function addStylesheetTag(path) {
  return evaluateInPageAsync(`
    (function(){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '${path}';
      link.onload = onload;
      document.head.append(link);
      let resolve;
      const promise = new Promise(r => resolve = r);
      function onload() {
        // TODO(chenwilliam): It shouldn't be necessary to force
        // style recalc here but some tests rely on it.
        window.getComputedStyle(document.body).color;
        resolve();
      }
      return promise;
    })();
  `);
}
function addIframe(path, options = {}) {
  options.id = options.id || "";
  options.name = options.name || "";
  return evaluateInPageAsync(`
    (function(){
      const iframe = document.createElement('iframe');
      iframe.src = '${path}';
      iframe.id = '${options.id}';
      iframe.name = '${options.name}';
      document.body.appendChild(iframe);
      return new Promise(f => iframe.onload = f);
    })();
  `);
}
async function deprecatedInitAsync(code) {
  await TestRunner.RuntimeAgent.invoke_evaluate({ expression: code, objectGroup: "console" });
}
function markStep(title) {
  addResult("\nRunning: " + title);
}
function startDumpingProtocolMessages() {
  ProtocolClient.InspectorBackend.test.dumpProtocol = self.testRunner.logToStderr.bind(self.testRunner);
}
function addScriptForFrame(url2, content, frame) {
  content += "\n//# sourceURL=" + url2;
  const executionContext = TestRunner.runtimeModel.executionContexts().find((context) => context.frameId === frame.id);
  TestRunner.RuntimeAgent.evaluate(content, "console", false, false, executionContext.id);
}
var formatters = {
  /**
   * @param {*} value
   * @returns {string}
   */
  formatAsTypeName(value) {
    return "<" + typeof value + ">";
  },
  /**
   * @param {*} value
   * @returns {string}
   */
  formatAsTypeNameOrNull(value) {
    if (value === null) {
      return "null";
    }
    return formatters.formatAsTypeName(value);
  },
  /**
   * @param {*} value
   * @returns {string|!Date}
   */
  formatAsRecentTime(value) {
    if (typeof value !== "object" || !(value instanceof Date)) {
      return formatters.formatAsTypeName(value);
    }
    const delta = Date.now() - value;
    return 0 <= delta && delta < 30 * 60 * 1e3 ? "<plausible>" : value;
  },
  /**
   * @param {string} value
   * @returns {string}
   */
  formatAsURL(value) {
    if (!value) {
      return value;
    }
    const lastIndex = value.lastIndexOf("devtools/");
    if (lastIndex < 0) {
      return value;
    }
    return ".../" + value.substr(lastIndex);
  },
  /**
   * @param {string} value
   * @returns {string}
   */
  formatAsDescription(value) {
    if (!value) {
      return value;
    }
    return '"' + value.replace(/^function [gs]et /, "function ") + '"';
  }
};
function addObject(object, customFormatters, prefix, firstLinePrefix) {
  prefix = prefix || "";
  firstLinePrefix = firstLinePrefix || prefix;
  addResult(firstLinePrefix + "{");
  const propertyNames = Object.keys(object);
  propertyNames.sort();
  for (let i = 0; i < propertyNames.length; ++i) {
    const prop = propertyNames[i];
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    const prefixWithName = "    " + prefix + prop + " : ";
    const propValue = object[prop];
    if (customFormatters && customFormatters[prop]) {
      const formatterName = customFormatters[prop];
      if (formatterName !== "skip") {
        const formatter = formatters[formatterName];
        addResult(prefixWithName + formatter(propValue));
      }
    } else {
      dump(propValue, customFormatters, "    " + prefix, prefixWithName);
    }
  }
  addResult(prefix + "}");
}
function addArray(array, customFormatters, prefix, firstLinePrefix) {
  prefix = prefix || "";
  firstLinePrefix = firstLinePrefix || prefix;
  addResult(firstLinePrefix + "[");
  for (let i = 0; i < array.length; ++i) {
    dump(array[i], customFormatters, prefix + "    ");
  }
  addResult(prefix + "]");
}
function dumpDeepInnerHTML(node) {
  function innerHTML(prefix, node2) {
    const openTag = [];
    if (node2.nodeType === Node.TEXT_NODE) {
      if (!node2.parentElement || node2.parentElement.nodeName !== "STYLE") {
        addResult(node2.nodeValue);
      }
      return;
    }
    openTag.push("<" + node2.nodeName);
    const attrs = node2.attributes;
    for (let i = 0; attrs && i < attrs.length; ++i) {
      openTag.push(attrs[i].name + "=" + attrs[i].value);
    }
    openTag.push(">");
    addResult(prefix + openTag.join(" "));
    for (let child = node2.firstChild; child; child = child.nextSibling) {
      innerHTML(prefix + "    ", child);
    }
    if (node2.shadowRoot) {
      innerHTML(prefix + "    ", node2.shadowRoot);
    }
    addResult(prefix + "</" + node2.nodeName + ">");
  }
  innerHTML("", node);
}
function deepTextContent(node) {
  if (!node) {
    return "";
  }
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
    return !node.parentElement || node.parentElement.nodeName !== "STYLE" ? node.nodeValue : "";
  }
  let res = "";
  const children = node.childNodes;
  for (let i = 0; i < children.length; ++i) {
    res += deepTextContent(children[i]);
  }
  if (node.shadowRoot) {
    res += deepTextContent(node.shadowRoot);
  }
  return res;
}
function dump(value, customFormatters, prefix, prefixWithName) {
  prefixWithName = prefixWithName || prefix;
  if (prefixWithName && prefixWithName.length > 80) {
    addResult(prefixWithName + "was skipped due to prefix length limit");
    return;
  }
  if (value === null) {
    addResult(prefixWithName + "null");
  } else if (value && value.constructor && value.constructor.name === "Array") {
    addArray(
      /** @type {!Array} */
      value,
      customFormatters,
      prefix,
      prefixWithName
    );
  } else if (typeof value === "object") {
    addObject(
      /** @type {!Object} */
      value,
      customFormatters,
      prefix,
      prefixWithName
    );
  } else if (typeof value === "string") {
    addResult(prefixWithName + '"' + value + '"');
  } else {
    addResult(prefixWithName + value);
  }
}
function waitForEvent(eventName, obj, condition) {
  condition = condition || function() {
    return true;
  };
  return new Promise((resolve) => {
    obj.addEventListener(eventName, onEventFired);
    function onEventFired(event) {
      if (!condition(event.data)) {
        return;
      }
      obj.removeEventListener(eventName, onEventFired);
      resolve(event.data);
    }
  });
}
function waitForTarget(filter) {
  filter = filter || ((target) => true);
  for (const target of SDK.TargetManager.TargetManager.instance().targets()) {
    if (filter(target)) {
      return Promise.resolve(target);
    }
  }
  return new Promise((fulfill) => {
    const observer = (
      /** @type {!SDK.TargetManager.Observer} */
      {
        targetAdded: function(target) {
          if (filter(target)) {
            SDK.TargetManager.TargetManager.instance().unobserveTargets(observer);
            fulfill(target);
          }
        },
        targetRemoved: function() {
        }
      }
    );
    SDK.TargetManager.TargetManager.instance().observeTargets(observer);
  });
}
function waitForTargetRemoved(targetToRemove) {
  return new Promise((fulfill) => {
    const observer = (
      /** @type {!SDK.TargetManager.Observer} */
      {
        targetRemoved: function(target) {
          if (target === targetToRemove) {
            SDK.TargetManager.TargetManager.instance().unobserveTargets(observer);
            fulfill(target);
          }
        },
        targetAdded: function() {
        }
      }
    );
    SDK.TargetManager.TargetManager.instance().observeTargets(observer);
  });
}
function waitForExecutionContext(runtimeModel) {
  if (runtimeModel.executionContexts().length) {
    return Promise.resolve(runtimeModel.executionContexts()[0]);
  }
  return runtimeModel.once(SDK.RuntimeModel.Events.ExecutionContextCreated);
}
function waitForExecutionContextDestroyed(context) {
  const runtimeModel = context.runtimeModel;
  if (runtimeModel.executionContexts().indexOf(context) === -1) {
    return Promise.resolve();
  }
  return waitForEvent(SDK.RuntimeModel.Events.ExecutionContextDestroyed, runtimeModel, (destroyedContext) => destroyedContext === context);
}
function assertGreaterOrEqual(a, b, message) {
  if (a < b) {
    addResult("FAILED: " + (message ? message + ": " : "") + a + " < " + b);
  }
}
var _pageLoadedCallback;
function navigate(url2, callback) {
  _pageLoadedCallback = safeWrap(callback);
  TestRunner.resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.Load, _pageNavigated);
  evaluateInPageAnonymously("window.location.replace('" + url2 + "')");
}
function navigatePromise(url2) {
  return new Promise((fulfill) => navigate(url2, fulfill));
}
function _pageNavigated() {
  TestRunner.resourceTreeModel.removeEventListener(SDK.ResourceTreeModel.Events.Load, _pageNavigated);
  _handlePageLoaded();
}
function hardReloadPage(callback) {
  _innerReloadPage(true, void 0, callback);
}
function reloadPage(callback) {
  _innerReloadPage(false, void 0, callback);
}
function reloadPageWithInjectedScript(injectedScript, callback) {
  _innerReloadPage(false, injectedScript, callback);
}
function reloadPagePromise() {
  return new Promise((fulfill) => reloadPage(fulfill));
}
function _innerReloadPage(hardReload, injectedScript, callback) {
  _pageLoadedCallback = safeWrap(callback);
  TestRunner.resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.Load, pageLoaded);
  TestRunner.resourceTreeModel.reloadPage(hardReload, injectedScript);
}
function pageLoaded() {
  TestRunner.resourceTreeModel.removeEventListener(SDK.ResourceTreeModel.Events.Load, pageLoaded);
  addResult("Page reloaded.");
  _handlePageLoaded();
}
async function _handlePageLoaded() {
  await waitForExecutionContext(
    /** @type {!SDK.RuntimeModel.RuntimeModel} */
    TestRunner.runtimeModel
  );
  if (_pageLoadedCallback) {
    const callback = _pageLoadedCallback;
    _pageLoadedCallback = void 0;
    callback();
  }
}
function waitForPageLoad(callback) {
  TestRunner.resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.Load, onLoaded);
  function onLoaded() {
    TestRunner.resourceTreeModel.removeEventListener(SDK.ResourceTreeModel.Events.Load, onLoaded);
    callback();
  }
}
function runWhenPageLoads(callback) {
  const oldCallback = _pageLoadedCallback;
  function chainedCallback() {
    if (oldCallback) {
      oldCallback();
    }
    callback();
  }
  _pageLoadedCallback = safeWrap(chainedCallback);
}
function runTestSuite(testSuite) {
  const testSuiteTests = testSuite.slice();
  function runner() {
    if (!testSuiteTests.length) {
      completeTest();
      return;
    }
    const nextTest = testSuiteTests.shift();
    addResult("");
    addResult("Running: " + /function\s([^(]*)/.exec(nextTest)[1]);
    safeWrap(nextTest)(runner);
  }
  runner();
}
async function runAsyncTestSuite(testSuite) {
  for (const nextTest of testSuite) {
    addResult("");
    addResult("Running: " + /function\s([^(]*)/.exec(nextTest)[1]);
    await safeAsyncWrap(nextTest)();
  }
  completeTest();
}
function assertEquals(expected, found, message) {
  if (expected === found) {
    return;
  }
  let error;
  if (message) {
    error = "Failure (" + message + "):";
  } else {
    error = "Failure:";
  }
  throw new Error(error + " expected <" + expected + "> found <" + found + ">");
}
function assertTrue(found, message) {
  assertEquals(true, Boolean(found), message);
}
function override(receiver, methodName, override2, opt_sticky) {
  override2 = safeWrap(override2);
  const original = receiver[methodName];
  if (typeof original !== "function") {
    throw new Error("Cannot find method to override: " + methodName);
  }
  receiver[methodName] = function(var_args) {
    try {
      return override2.apply(this, arguments);
    } catch (e) {
      throw new Error("Exception in overriden method '" + methodName + "': " + e);
    } finally {
      if (!opt_sticky) {
        receiver[methodName] = original;
      }
    }
  };
  return original;
}
function clearSpecificInfoFromStackFrames(text) {
  let buffer = text.replace(/\(file:\/\/\/(?:[^)]+\)|[\w\/:-]+)/g, "(...)");
  buffer = buffer.replace(/\(http:\/\/(?:[^)]+\)|[\w\/:-]+)/g, "(...)");
  buffer = buffer.replace(/\(test:\/\/(?:[^)]+\)|[\w\/:-]+)/g, "(...)");
  buffer = buffer.replace(/\(<anonymous>:[^)]+\)/g, "(...)");
  buffer = buffer.replace(/VM\d+/g, "VM");
  return buffer.replace(/\s*at[^()]+\(native\)/g, "");
}
function hideInspectorView() {
  UI.InspectorView.InspectorView.instance().element.setAttribute("style", "display:none !important");
}
function mainFrame() {
  return TestRunner.resourceTreeModel.mainFrame;
}
var StringOutputStream = class {
  /**
   * @param {function(string):void} callback
   */
  constructor(callback) {
    this.callback = callback;
    this.buffer = "";
  }
  /**
   * @param {string} fileName
   * @returns {!Promise<boolean>}
   */
  async open(fileName) {
    return true;
  }
  /**
   * @param {string} chunk
   */
  async write(chunk) {
    this.buffer += chunk;
  }
  async close() {
    this.callback(this.buffer);
  }
};
var MockSetting = class {
  /**
   * @param {V} value
   */
  constructor(value) {
    this.value = value;
  }
  /**
   * @returns {V}
   */
  get() {
    return this.value;
  }
  /**
   * @param {V} value
   */
  set(value) {
    this.value = value;
  }
};
function waitForUISourceCode(urlSuffix, projectType) {
  function matches(uiSourceCode) {
    if (projectType && uiSourceCode.project().type() !== projectType) {
      return false;
    }
    if (!projectType && uiSourceCode.project().type() === Workspace.Workspace.projectTypes.Service) {
      return false;
    }
    if (urlSuffix && !uiSourceCode.url().endsWith(urlSuffix)) {
      return false;
    }
    return true;
  }
  for (const uiSourceCode of Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodes()) {
    if (urlSuffix && matches(uiSourceCode)) {
      return Promise.resolve(uiSourceCode);
    }
  }
  return waitForEvent(Workspace.Workspace.Events.UISourceCodeAdded, Workspace.Workspace.WorkspaceImpl.instance(), matches);
}
function waitForUISourceCodeRemoved(callback) {
  Workspace.Workspace.WorkspaceImpl.instance().once(Workspace.Workspace.Events.UISourceCodeRemoved).then(callback);
}
function url(url2 = "") {
  const testScriptURL = (
    /** @type {string} */
    Root.Runtime.Runtime.queryParam("inspected_test") || Root.Runtime.Runtime.queryParam("test")
  );
  return new URL(url2, testScriptURL + "/../").href;
}
function dumpSyntaxHighlight(str, mimeType) {
  const node = document.createElement("span");
  node.textContent = str;
  return CodeHighlighter.CodeHighlighter.highlightNode(node, mimeType).then(dumpSyntax);
  function dumpSyntax() {
    const node_parts = [];
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].getAttribute) {
        node_parts.push(node.childNodes[i].getAttribute("class"));
      } else {
        node_parts.push("*");
      }
    }
    addResult(str + ": " + node_parts.join(", "));
  }
}
var findIndexesOfSubString = function(inputString, searchString) {
  const matches = [];
  let i = inputString.indexOf(searchString);
  while (i !== -1) {
    matches.push(i);
    i = inputString.indexOf(searchString, i + searchString.length);
  }
  return matches;
};
var findLineEndingIndexes = function(inputString) {
  const endings = findIndexesOfSubString(inputString, "\n");
  endings.push(inputString.length);
  return endings;
};
async function dumpInspectedPageElementText(querySelector) {
  const value = await evaluateInPageAsync(`document.querySelector('${querySelector}').innerText`);
  addResult(value);
}
async function waitForPendingLiveLocationUpdates() {
  await Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().pendingLiveLocationChangesPromise();
  await Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding.instance().pendingLiveLocationChangesPromise();
}
self.testRunner;
TestRunner.StringOutputStream = StringOutputStream;
TestRunner.MockSetting = MockSetting;
TestRunner.formatters = formatters;
TestRunner.completeTest = completeTest;
TestRunner.addResult = addResult;
TestRunner.addResults = addResults;
TestRunner.runTests = runTests;
TestRunner.addSniffer = addSniffer;
TestRunner.addSnifferPromise = addSnifferPromise;
TestRunner.showPanel = showPanel;
TestRunner.createKeyEvent = createKeyEvent;
TestRunner.safeWrap = safeWrap;
TestRunner.textContentWithLineBreaks = textContentWithLineBreaks;
TestRunner.textContentWithLineBreaksTrimmed = textContentWithLineBreaksTrimmed;
TestRunner.textContentWithoutStyles = textContentWithoutStyles;
TestRunner.evaluateInPagePromise = evaluateInPagePromise;
TestRunner.callFunctionInPageAsync = callFunctionInPageAsync;
TestRunner.evaluateInPageWithTimeout = evaluateInPageWithTimeout;
TestRunner.evaluateFunctionInOverlay = evaluateFunctionInOverlay;
TestRunner.check = check;
TestRunner.deprecatedRunAfterPendingDispatches = deprecatedRunAfterPendingDispatches;
TestRunner.loadHTML = loadHTML;
TestRunner.addScriptTag = addScriptTag;
TestRunner.addStylesheetTag = addStylesheetTag;
TestRunner.addIframe = addIframe;
TestRunner.markStep = markStep;
TestRunner.startDumpingProtocolMessages = startDumpingProtocolMessages;
TestRunner.addScriptForFrame = addScriptForFrame;
TestRunner.addObject = addObject;
TestRunner.addArray = addArray;
TestRunner.dumpDeepInnerHTML = dumpDeepInnerHTML;
TestRunner.deepTextContent = deepTextContent;
TestRunner.dump = dump;
TestRunner.waitForEvent = waitForEvent;
TestRunner.waitForTarget = waitForTarget;
TestRunner.waitForTargetRemoved = waitForTargetRemoved;
TestRunner.waitForExecutionContext = waitForExecutionContext;
TestRunner.waitForExecutionContextDestroyed = waitForExecutionContextDestroyed;
TestRunner.assertGreaterOrEqual = assertGreaterOrEqual;
TestRunner.navigate = navigate;
TestRunner.navigatePromise = navigatePromise;
TestRunner.hardReloadPage = hardReloadPage;
TestRunner.reloadPage = reloadPage;
TestRunner.reloadPageWithInjectedScript = reloadPageWithInjectedScript;
TestRunner.reloadPagePromise = reloadPagePromise;
TestRunner.pageLoaded = pageLoaded;
TestRunner.waitForPageLoad = waitForPageLoad;
TestRunner.runWhenPageLoads = runWhenPageLoads;
TestRunner.runTestSuite = runTestSuite;
TestRunner.assertEquals = assertEquals;
TestRunner.assertTrue = assertTrue;
TestRunner.override = override;
TestRunner.clearSpecificInfoFromStackFrames = clearSpecificInfoFromStackFrames;
TestRunner.hideInspectorView = hideInspectorView;
TestRunner.mainFrame = mainFrame;
TestRunner.waitForUISourceCode = waitForUISourceCode;
TestRunner.waitForUISourceCodeRemoved = waitForUISourceCodeRemoved;
TestRunner.url = url;
TestRunner.dumpSyntaxHighlight = dumpSyntaxHighlight;
TestRunner.evaluateInPageRemoteObject = evaluateInPageRemoteObject;
TestRunner.evaluateInPage = evaluateInPage;
TestRunner.evaluateInPageAnonymously = evaluateInPageAnonymously;
TestRunner.evaluateInPageAsync = evaluateInPageAsync;
TestRunner.deprecatedInitAsync = deprecatedInitAsync;
TestRunner.runAsyncTestSuite = runAsyncTestSuite;
TestRunner.dumpInspectedPageElementText = dumpInspectedPageElementText;
TestRunner.waitForPendingLiveLocationUpdates = waitForPendingLiveLocationUpdates;
TestRunner.findLineEndingIndexes = findLineEndingIndexes;
TestRunner.selectTextInTextNode = selectTextInTextNode;
TestRunner.isScrolledToBottom = UI.UIUtils.isScrolledToBottom;

// gen/front_end/legacy_test_runner/test_runner/test_runner.prebundle.js
function _setupTestHelpers(target) {
  self.TestRunner.BrowserAgent = target.browserAgent();
  self.TestRunner.CSSAgent = target.cssAgent();
  self.TestRunner.DeviceOrientationAgent = target.deviceOrientationAgent();
  self.TestRunner.DOMAgent = target.domAgent();
  self.TestRunner.DOMDebuggerAgent = target.domdebuggerAgent();
  self.TestRunner.DebuggerAgent = target.debuggerAgent();
  self.TestRunner.EmulationAgent = target.emulationAgent();
  self.TestRunner.HeapProfilerAgent = target.heapProfilerAgent();
  self.TestRunner.InputAgent = target.inputAgent();
  self.TestRunner.InspectorAgent = target.inspectorAgent();
  self.TestRunner.NetworkAgent = target.networkAgent();
  self.TestRunner.OverlayAgent = target.overlayAgent();
  self.TestRunner.PageAgent = target.pageAgent();
  self.TestRunner.ProfilerAgent = target.profilerAgent();
  self.TestRunner.RuntimeAgent = target.runtimeAgent();
  self.TestRunner.TargetAgent = target.targetAgent();
  self.TestRunner.networkManager = target.model(SDK2.NetworkManager.NetworkManager);
  self.TestRunner.securityOriginManager = target.model(SDK2.SecurityOriginManager.SecurityOriginManager);
  self.TestRunner.storageKeyManager = target.model(SDK2.StorageKeyManager.StorageKeyManager);
  self.TestRunner.resourceTreeModel = target.model(SDK2.ResourceTreeModel.ResourceTreeModel);
  self.TestRunner.debuggerModel = target.model(SDK2.DebuggerModel.DebuggerModel);
  self.TestRunner.runtimeModel = target.model(SDK2.RuntimeModel.RuntimeModel);
  self.TestRunner.domModel = target.model(SDK2.DOMModel.DOMModel);
  self.TestRunner.domDebuggerModel = target.model(SDK2.DOMDebuggerModel.DOMDebuggerModel);
  self.TestRunner.cssModel = target.model(SDK2.CSSModel.CSSModel);
  self.TestRunner.cpuProfilerModel = target.model(SDK2.CPUProfilerModel.CPUProfilerModel);
  self.TestRunner.overlayModel = target.model(SDK2.OverlayModel.OverlayModel);
  self.TestRunner.serviceWorkerManager = target.model(SDK2.ServiceWorkerManager.ServiceWorkerManager);
  self.TestRunner.tracingManager = target.model(Tracing.TracingManager.TracingManager);
  self.TestRunner.mainTarget = target;
}
async function _executeTestScript() {
  const testScriptURL = (
    /** @type {string} */
    Root2.Runtime.Runtime.queryParam("test")
  );
  if (isDebugTest()) {
    setInnerResult(console.log);
    setInnerCompleteTest(() => console.log("Test completed"));
    self.test = async function() {
      await import(testScriptURL);
    };
    return;
  }
  try {
    await import(testScriptURL);
  } catch (err) {
    addResult("TEST ENDED EARLY DUE TO UNCAUGHT ERROR:");
    addResult(err && err.stack || err);
    addResult("=== DO NOT COMMIT THIS INTO -expected.txt ===");
    completeTest();
  }
}
var _startedTest = false;
var _TestObserver = class {
  /**
   * @override
   * @param {!SDK.Target.Target} target
   */
  targetAdded(target) {
    if (target.id() === "main" && target.type() === "frame" || target.parentTarget()?.type() === "tab" && target.type() === "frame" && !target.targetInfo()?.subtype?.length) {
      _setupTestHelpers(target);
      if (_startedTest) {
        return;
      }
      _startedTest = true;
      loadHTML(`
        <head>
          <base href="${url()}">
        </head>
        <body>
        </body>
      `).then(() => _executeTestScript());
    }
  }
  /**
   * @override
   * @param {!SDK.Target.Target} target
   */
  targetRemoved(target) {
  }
};
SDK2.TargetManager.TargetManager.instance().observeTargets(new _TestObserver());
var globalTestRunner = self.TestRunner;
export {
  globalTestRunner as TestRunner,
  _TestObserver,
  _executeTestScript
};
//# sourceMappingURL=test_runner.js.map
