// gen/front_end/entrypoints/wasmparser_worker/wasmparser_worker-entrypoint.prebundle.js
import * as WasmParserWorker from "./wasmparser_worker.js";
self.onmessage = (event) => {
  const method = event.data.method;
  if (method !== "disassemble") {
    return;
  }
  self.postMessage(WasmParserWorker.WasmParserWorker.dissambleWASM(event.data.params, (message) => {
    self.postMessage(message);
  }));
};
self.postMessage("workerReady");
//# sourceMappingURL=wasmparser_worker-entrypoint.js.map
