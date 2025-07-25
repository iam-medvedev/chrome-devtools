var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/entrypoints/wasmparser_worker/WasmParserWorker.js
var WasmParserWorker_exports = {};
__export(WasmParserWorker_exports, {
  dissambleWASM: () => dissambleWASM
});
import * as Common from "./../../core/common/common.js";
import * as WasmParser from "./../../third_party/wasmparser/wasmparser.js";
function dissambleWASM(params, postMessage) {
  try {
    const dataBuffer = Common.Base64.decode(params.content);
    let parser = new WasmParser.WasmParser.BinaryReader();
    parser.setData(dataBuffer.buffer, 0, dataBuffer.byteLength);
    const nameGenerator = new WasmParser.WasmDis.DevToolsNameGenerator();
    nameGenerator.read(parser);
    const data = new Uint8Array(dataBuffer);
    parser = new WasmParser.WasmParser.BinaryReader();
    const dis = new WasmParser.WasmDis.WasmDisassembler();
    dis.addOffsets = true;
    dis.exportMetadata = nameGenerator.getExportMetadata();
    dis.nameResolver = nameGenerator.getNameResolver();
    const lines = [];
    const offsets = [];
    const functionBodyOffsets = [];
    let chunkSize = 128 * 1024;
    let buffer = new Uint8Array(chunkSize);
    let pendingSize = 0;
    let offsetInModule = 0;
    for (let i = 0; i < data.length; ) {
      if (chunkSize > data.length - i) {
        chunkSize = data.length - i;
      }
      const bufferSize = pendingSize + chunkSize;
      if (buffer.byteLength < bufferSize) {
        const newBuffer = new Uint8Array(bufferSize);
        newBuffer.set(buffer);
        buffer = newBuffer;
      }
      while (pendingSize < bufferSize) {
        buffer[pendingSize++] = data[i++];
      }
      parser.setData(buffer.buffer, 0, bufferSize, i === data.length);
      const finished = dis.disassembleChunk(parser, offsetInModule);
      const result = dis.getResult();
      for (const line of result.lines) {
        lines.push(line);
      }
      for (const offset of result.offsets) {
        offsets.push(offset);
      }
      for (const functionBodyOffset of result.functionBodyOffsets) {
        functionBodyOffsets.push(functionBodyOffset);
      }
      if (finished) {
        break;
      }
      if (parser.position === 0) {
        pendingSize = bufferSize;
        continue;
      }
      const pending = parser.data.subarray(parser.position, parser.length);
      pendingSize = pending.length;
      buffer.set(pending);
      offsetInModule += parser.position;
      const percentage = Math.floor(offsetInModule / data.length * 100);
      postMessage({ event: "progress", params: { percentage } });
    }
    postMessage({ event: "progress", params: { percentage: 100 } });
    postMessage({ method: "disassemble", result: { lines, offsets, functionBodyOffsets } });
  } catch (error) {
    postMessage({ method: "disassemble", error });
  }
}
export {
  WasmParserWorker_exports as WasmParserWorker
};
//# sourceMappingURL=wasmparser_worker.js.map
