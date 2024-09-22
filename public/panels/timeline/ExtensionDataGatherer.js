import { TimelinePanel } from './TimelinePanel.js';
let extensionDataGathererInstance;
/**
 * This class abstracts the source of extension data out by providing a
 * single access point to the performance panel for extension data.
 */
export class ExtensionDataGatherer {
    #parsedTrace = null;
    #extensionDataByModel = new Map();
    static instance() {
        if (extensionDataGathererInstance) {
            return extensionDataGathererInstance;
        }
        extensionDataGathererInstance = new ExtensionDataGatherer();
        return extensionDataGathererInstance;
    }
    static removeInstance() {
        extensionDataGathererInstance = undefined;
    }
    /**
     * Gets the data provided by extensions.
     */
    getExtensionData() {
        const extensionDataEnabled = TimelinePanel.extensionDataVisibilitySetting().get();
        if (!extensionDataEnabled || !this.#parsedTrace || !this.#parsedTrace.ExtensionTraceData) {
            return { extensionMarkers: [], extensionTrackData: [], entryToNode: new Map() };
        }
        const maybeCachedData = this.#extensionDataByModel.get(this.#parsedTrace);
        if (maybeCachedData) {
            return maybeCachedData;
        }
        return this.#parsedTrace.ExtensionTraceData;
    }
    saveCurrentModelData() {
        if (this.#parsedTrace && !this.#extensionDataByModel.has(this.#parsedTrace)) {
            this.#extensionDataByModel.set(this.#parsedTrace, this.getExtensionData());
        }
    }
    modelChanged(parsedTrace) {
        if (parsedTrace === this.#parsedTrace) {
            return;
        }
        if (this.#parsedTrace !== null) {
            // DevTools extension data is assumed to be useful only for the current
            // trace data (model). As such, if the model changes, we cache the devtools
            // extension data we have collected for the previous model and listen
            // for new data that applies to the new model.
            this.saveCurrentModelData();
        }
        this.#parsedTrace = parsedTrace;
    }
}
//# sourceMappingURL=ExtensionDataGatherer.js.map