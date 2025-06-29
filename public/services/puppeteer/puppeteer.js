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
var Transport = class {
  #connection;
  constructor(connection) {
    this.#connection = connection;
  }
  send(data) {
    this.#connection.sendRawMessage(data);
  }
  close() {
    void this.#connection.disconnect();
  }
  set onmessage(cb) {
    this.#connection.setOnMessage((message) => {
      const data = message;
      if (!data.sessionId) {
        return;
      }
      return cb(JSON.stringify({
        ...data,
        // Puppeteer is expecting to use the default session, but we give it a non-default session in #connection.
        // Replace that sessionId with undefined so Puppeteer treats it as default.
        sessionId: data.sessionId === this.#connection.getSessionId() ? void 0 : data.sessionId
      }));
    });
  }
  set onclose(cb) {
    const prev = this.#connection.getOnDisconnect();
    this.#connection.setOnDisconnect((reason) => {
      if (prev) {
        prev(reason);
      }
      if (cb) {
        cb();
      }
    });
  }
};
var PuppeteerConnection = class extends puppeteer.Connection {
  async onMessage(message) {
    const msgObj = JSON.parse(message);
    if (msgObj.sessionId && !this._sessions.has(msgObj.sessionId)) {
      return;
    }
    void super.onMessage(message);
  }
};
var PuppeteerConnectionHelper = class {
  static async connectPuppeteerToConnectionViaTab(options) {
    const { connection, rootTargetId, isPageTargetCallback } = options;
    const transport = new Transport(connection);
    const puppeteerConnection = new PuppeteerConnection("", transport);
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
        { targetId: rootTargetId },
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
