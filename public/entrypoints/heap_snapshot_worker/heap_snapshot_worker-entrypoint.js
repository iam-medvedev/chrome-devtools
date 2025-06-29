// gen/front_end/entrypoints/heap_snapshot_worker/heap_snapshot_worker-entrypoint.prebundle.js
import * as HeapSnapshotWorker from "./heap_snapshot_worker.js";
var dispatcher = new HeapSnapshotWorker.HeapSnapshotWorkerDispatcher.HeapSnapshotWorkerDispatcher(self.postMessage.bind(self));
self.addEventListener("message", dispatcher.dispatchMessage.bind(dispatcher), false);
self.postMessage("workerReady");
//# sourceMappingURL=heap_snapshot_worker-entrypoint.js.map
