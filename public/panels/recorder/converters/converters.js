var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/converters/Converter.js
var Converter_exports = {};

// gen/front_end/panels/recorder/converters/ExtensionConverter.js
var ExtensionConverter_exports = {};
__export(ExtensionConverter_exports, {
  EXTENSION_PREFIX: () => EXTENSION_PREFIX,
  ExtensionConverter: () => ExtensionConverter
});
import * as PuppeteerReplay from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
var EXTENSION_PREFIX = "extension_";
var ExtensionConverter = class {
  #idx;
  #extension;
  constructor(idx, extension) {
    this.#idx = idx;
    this.#extension = extension;
  }
  getId() {
    return EXTENSION_PREFIX + this.#idx;
  }
  getFormatName() {
    return this.#extension.getName();
  }
  getMediaType() {
    return this.#extension.getMediaType();
  }
  getFilename(flow) {
    const fileExtension = this.#mediaTypeToExtension(this.#extension.getMediaType());
    return `${flow.title}${fileExtension}`;
  }
  async stringify(flow) {
    const text = await this.#extension.stringify(flow);
    const sourceMap = PuppeteerReplay.parseSourceMap(text);
    return [PuppeteerReplay.stripSourceMap(text), sourceMap];
  }
  async stringifyStep(step) {
    return await this.#extension.stringifyStep(step);
  }
  #mediaTypeToExtension(mediaType) {
    switch (mediaType) {
      case "application/json":
        return ".json";
      case "application/javascript":
      case "text/javascript":
        return ".js";
      case "application/typescript":
      case "text/typescript":
        return ".ts";
      default:
        return "";
    }
  }
};

// gen/front_end/panels/recorder/converters/JSONConverter.js
var JSONConverter_exports = {};
__export(JSONConverter_exports, {
  JSONConverter: () => JSONConverter
});
import * as PuppeteerReplay2 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
import * as Models from "./../models/models.js";
var JSONConverter = class {
  #indent;
  constructor(indent) {
    this.#indent = indent;
  }
  getId() {
    return "json";
  }
  getFormatName() {
    return "JSON";
  }
  getFilename(flow) {
    return `${flow.title}.json`;
  }
  async stringify(flow) {
    const text = await PuppeteerReplay2.stringify(flow, {
      extension: new PuppeteerReplay2.JSONStringifyExtension(),
      indentation: this.#indent
    });
    const sourceMap = PuppeteerReplay2.parseSourceMap(text);
    return [PuppeteerReplay2.stripSourceMap(text), sourceMap];
  }
  async stringifyStep(step) {
    return await PuppeteerReplay2.stringifyStep(step, {
      extension: new PuppeteerReplay2.JSONStringifyExtension(),
      indentation: this.#indent
    });
  }
  getMediaType() {
    return "application/json";
  }
};

// gen/front_end/panels/recorder/converters/LighthouseConverter.js
var LighthouseConverter_exports = {};
__export(LighthouseConverter_exports, {
  LighthouseConverter: () => LighthouseConverter
});
import * as PuppeteerReplay3 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
import * as Models2 from "./../models/models.js";
var LighthouseConverter = class {
  #indent;
  constructor(indent) {
    this.#indent = indent;
  }
  getId() {
    return "lighthouse";
  }
  getFormatName() {
    return "Puppeteer (including Lighthouse analysis)";
  }
  getFilename(flow) {
    return `${flow.title}.js`;
  }
  async stringify(flow) {
    const text = await PuppeteerReplay3.stringify(flow, {
      extension: new PuppeteerReplay3.LighthouseStringifyExtension(),
      indentation: this.#indent
    });
    const sourceMap = PuppeteerReplay3.parseSourceMap(text);
    return [PuppeteerReplay3.stripSourceMap(text), sourceMap];
  }
  async stringifyStep(step) {
    return await PuppeteerReplay3.stringifyStep(step, {
      indentation: this.#indent
    });
  }
  getMediaType() {
    return "text/javascript";
  }
};

// gen/front_end/panels/recorder/converters/PuppeteerConverter.js
var PuppeteerConverter_exports = {};
__export(PuppeteerConverter_exports, {
  PuppeteerConverter: () => PuppeteerConverter
});
import * as PuppeteerReplay4 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
import * as Models3 from "./../models/models.js";
var PuppeteerConverter = class {
  #indent;
  #extension;
  constructor(indent) {
    this.#indent = indent;
    this.#extension = this.createExtension();
  }
  getId() {
    return "puppeteer";
  }
  createExtension() {
    return new PuppeteerReplay4.PuppeteerStringifyExtension();
  }
  getFormatName() {
    return "Puppeteer";
  }
  getFilename(flow) {
    return `${flow.title}.js`;
  }
  async stringify(flow) {
    const text = await PuppeteerReplay4.stringify(flow, {
      indentation: this.#indent,
      extension: this.#extension
    });
    const sourceMap = PuppeteerReplay4.parseSourceMap(text);
    return [PuppeteerReplay4.stripSourceMap(text), sourceMap];
  }
  async stringifyStep(step) {
    return await PuppeteerReplay4.stringifyStep(step, {
      indentation: this.#indent,
      extension: this.#extension
    });
  }
  getMediaType() {
    return "text/javascript";
  }
};

// gen/front_end/panels/recorder/converters/PuppeteerFirefoxConverter.js
var PuppeteerFirefoxConverter_exports = {};
__export(PuppeteerFirefoxConverter_exports, {
  PuppeteerFirefoxConverter: () => PuppeteerFirefoxConverter
});
import * as PuppeteerReplay5 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
import * as Models4 from "./../models/models.js";
var PuppeteerFirefoxConverter = class extends PuppeteerConverter {
  getId() {
    return "puppeteer-firefox";
  }
  createExtension() {
    return new PuppeteerReplay5.PuppeteerStringifyExtension("firefox");
  }
  getFormatName() {
    return "Puppeteer (for Firefox)";
  }
};

// gen/front_end/panels/recorder/converters/PuppeteerReplayConverter.js
var PuppeteerReplayConverter_exports = {};
__export(PuppeteerReplayConverter_exports, {
  PuppeteerReplayConverter: () => PuppeteerReplayConverter
});
import * as PuppeteerReplay6 from "./../../../third_party/puppeteer-replay/puppeteer-replay.js";
import * as Models5 from "./../models/models.js";
var PuppeteerReplayConverter = class {
  #indent;
  constructor(indent) {
    this.#indent = indent;
  }
  getId() {
    return "@puppeteer/replay";
  }
  getFormatName() {
    return "@puppeteer/replay";
  }
  getFilename(flow) {
    return `${flow.title}.js`;
  }
  async stringify(flow) {
    const text = await PuppeteerReplay6.stringify(flow, {
      extension: new PuppeteerReplay6.PuppeteerReplayStringifyExtension(),
      indentation: this.#indent
    });
    const sourceMap = PuppeteerReplay6.parseSourceMap(text);
    return [PuppeteerReplay6.stripSourceMap(text), sourceMap];
  }
  async stringifyStep(step) {
    return await PuppeteerReplay6.stringifyStep(step, {
      extension: new PuppeteerReplay6.PuppeteerReplayStringifyExtension()
    });
  }
  getMediaType() {
    return "text/javascript";
  }
};
export {
  Converter_exports as Converter,
  ExtensionConverter_exports as ExtensionConverter,
  JSONConverter_exports as JSONConverter,
  LighthouseConverter_exports as LighthouseConverter,
  PuppeteerConverter_exports as PuppeteerConverter,
  PuppeteerFirefoxConverter_exports as PuppeteerFirefoxConverter,
  PuppeteerReplayConverter_exports as PuppeteerReplayConverter
};
//# sourceMappingURL=converters.js.map
