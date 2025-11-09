var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/services/puppeteer/PuppeteerConnection.js
var PuppeteerConnection_exports = {};
__export(PuppeteerConnection_exports, {
  PuppeteerConnectionHelper: () => PuppeteerConnectionHelper
});
import * as puppeteer from "./../../third_party/puppeteer/puppeteer.js";
var PuppeteerConnectionAdapter = class extends puppeteer.Connection {
  #connection;
  #sessionId;
  constructor(connection, sessionId) {
    super("", { close: () => void 0 });
    this.#connection = connection;
    this.#connection.observe(this);
    this.#sessionId = sessionId;
  }
  // eslint-disable-next-line @devtools/no-underscored-properties
  _rawSend(_callbacks, method, params, sessionId, _options) {
    return this.#connection.send(method, params, sessionId ?? this.#sessionId).then((response) => "result" in response ? response.result : {});
  }
  onEvent(event) {
    const { sessionId } = event;
    if (sessionId === this.#sessionId) {
      event.sessionId = void 0;
    } else if (!sessionId || !this._sessions.has(sessionId)) {
      return;
    }
    void super.onMessage(JSON.stringify(event));
  }
  onDisconnect() {
    this.dispose();
  }
  dispose() {
    super.dispose();
    this.#connection.unobserve(this);
    void this.#connection.send("Target.detachFromTarget", { sessionId: this.#sessionId }, this.#sessionId);
  }
};
var PuppeteerConnectionHelper = class {
  static async connectPuppeteerToConnectionViaTab(options) {
    const { connection, targetId, sessionId, isPageTargetCallback } = options;
    const puppeteerConnection = new PuppeteerConnectionAdapter(connection, sessionId);
    const browserPromise = puppeteer.Browser._create(
      puppeteerConnection,
      [],
      false,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      (target) => isPageTargetCallback(target._getTargetInfo()),
      false
      /* waitForInitiallyDiscoveredTargets */
    );
    const [, browser] = await Promise.all([
      puppeteerConnection._createSession(
        { targetId },
        /* emulateAutoAttach= */
        true
      ),
      browserPromise
    ]);
    await browser.waitForTarget((t) => t.type() === "page");
    const pages = await browser.pages();
    return { page: pages[0], browser, puppeteerConnection };
  }
};
export {
  PuppeteerConnection_exports as PuppeteerConnection
};
//# sourceMappingURL=puppeteer.js.map
