// gen/front_end/entrypoints/lighthouse_worker/LighthouseWorkerService.js
import * as ProtocolClient from "./../../core/protocol_client/protocol_client.js";
import * as Root from "./../../core/root/root.js";
import * as PuppeteerService from "./../../services/puppeteer/puppeteer.js";
import * as ThirdPartyWeb from "./../../third_party/third-party-web/third-party-web.js";
function disableLoggingForTest() {
  console.log = () => void 0;
}
var WorkerConnectionTransport = class {
  onMessage = null;
  onDisconnect = null;
  setOnMessage(onMessage) {
    this.onMessage = onMessage;
  }
  setOnDisconnect(onDisconnect) {
    this.onDisconnect = onDisconnect;
  }
  sendRawMessage(message) {
    notifyFrontendViaWorkerMessage("sendProtocolMessage", { message });
  }
  async disconnect() {
    this.onDisconnect?.("force disconnect");
    this.onDisconnect = null;
    this.onMessage = null;
  }
};
var cdpTransport;
var endTimespan;
async function invokeLH(action, args) {
  if (Root.Runtime.Runtime.queryParam("isUnderTest")) {
    disableLoggingForTest();
    args.flags.maxWaitForLoad = 2 * 1e3;
  }
  self.listenForStatus((message) => {
    notifyFrontendViaWorkerMessage("statusUpdate", { message: message[1] });
  });
  let puppeteerHandle;
  try {
    if (action === "endTimespan") {
      if (!endTimespan) {
        throw new Error("Cannot end a timespan before starting one");
      }
      const result = await endTimespan();
      endTimespan = void 0;
      return result;
    }
    const locale = await fetchLocaleData(args.locales);
    const flags = args.flags;
    flags.logLevel = flags.logLevel || "info";
    flags.channel = "devtools";
    flags.locale = locale;
    const config = args.config || self.createConfig(args.categoryIDs, flags.formFactor);
    const url = args.url;
    self.thirdPartyWeb.provideThirdPartyWeb(ThirdPartyWeb.ThirdPartyWeb);
    const { rootTargetId, mainSessionId } = args;
    cdpTransport = new WorkerConnectionTransport();
    const connection = new ProtocolClient.DevToolsCDPConnection.DevToolsCDPConnection(cdpTransport);
    puppeteerHandle = await PuppeteerService.PuppeteerConnection.PuppeteerConnectionHelper.connectPuppeteerToConnectionViaTab({
      connection,
      targetId: rootTargetId,
      sessionId: mainSessionId,
      // Lighthouse can only audit normal pages.
      isPageTargetCallback: (targetInfo) => targetInfo.type === "page"
    });
    const { page } = puppeteerHandle;
    if (!page) {
      throw new Error("Could not create page handle for the target page");
    }
    if (action === "snapshot") {
      return await self.snapshot(page, { config, flags });
    }
    if (action === "startTimespan") {
      const timespan = await self.startTimespan(page, { config, flags });
      endTimespan = timespan.endTimespan;
      return;
    }
    return await self.navigation(page, url, { config, flags });
  } catch (err) {
    return {
      fatal: true,
      message: err.message,
      stack: err.stack
    };
  } finally {
    if (action !== "startTimespan") {
      await puppeteerHandle?.browser.disconnect();
    }
  }
}
async function fetchLocaleData(locales) {
  const locale = self.lookupLocale(locales);
  if (locale === "en-US" || locale === "en") {
    return;
  }
  try {
    const remoteBase = Root.Runtime.getRemoteBase();
    let localeUrl;
    if (remoteBase?.base) {
      localeUrl = `${remoteBase.base}third_party/lighthouse/locales/${locale}.json`;
    } else {
      localeUrl = new URL(`../../third_party/lighthouse/locales/${locale}.json`, import.meta.url).toString();
    }
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timed out fetching locale")), 5e3));
    const localeData = await Promise.race([timeoutPromise, fetch(localeUrl).then((result) => result.json())]);
    self.registerLocaleData(locale, localeData);
    return locale;
  } catch (err) {
    console.error(err);
  }
  return;
}
function notifyFrontendViaWorkerMessage(action, args) {
  self.postMessage({ action, args });
}
async function onFrontendMessage(event) {
  const messageFromFrontend = event.data;
  switch (messageFromFrontend.action) {
    case "startTimespan":
    case "endTimespan":
    case "snapshot":
    case "navigation": {
      const result = await invokeLH(messageFromFrontend.action, messageFromFrontend.args);
      if (result && typeof result === "object") {
        if ("report" in result) {
          delete result.report;
        }
        if ("artifacts" in result) {
          result.artifacts.Timing = JSON.parse(JSON.stringify(result.artifacts.Timing));
        }
      }
      self.postMessage({ id: messageFromFrontend.id, result });
      break;
    }
    case "dispatchProtocolMessage": {
      cdpTransport?.onMessage?.(messageFromFrontend.args.message);
      break;
    }
    default: {
      throw new Error(`Unknown event: ${event.data}`);
    }
  }
}
self.onmessage = onFrontendMessage;
globalThis.global = self;
globalThis.global.isVinn = true;
globalThis.global.document = {};
globalThis.global.document.documentElement = {};
globalThis.global.document.documentElement.style = {
  WebkitAppearance: "WebkitAppearance"
};

// gen/front_end/entrypoints/lighthouse_worker/lighthouse_worker.prebundle.js
import "./../../third_party/lighthouse/lighthouse-dt-bundle.js";
self.postMessage("workerReady");
//# sourceMappingURL=lighthouse_worker.js.map
