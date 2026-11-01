// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import * as LinearMemoryInspectorComponents from './components/components.js';
import { LinearMemoryInspectorController } from './LinearMemoryInspectorController.js';
const { widget } = UI.Widget;
export const DEFAULT_VIEW = (input, _output, target) => {
    if (!input.memory) {
        render(nothing, target);
        return;
    }
    // clang-format off
    render(html `
    ${widget(LinearMemoryInspectorComponents.LinearMemoryInspector.LinearMemoryInspector, {
        memory: input.memory,
        memoryOffset: input.offset,
        address: input.address,
        outerMemoryLength: input.outerMemoryLength,
        highlightInfo: input.highlightInfo,
        hideValueInspector: input.hideValueInspector,
        valueTypes: input.valueTypes,
        valueTypeModes: input.valueTypeModes,
        endianness: input.endianness,
        onMemoryRequest: input.onMemoryRequest,
        onAddressChanged: input.onAddressChanged,
        onSettingsChanged: input.onSettingsChanged,
        onDeleteMemoryHighlight: input.onDeleteMemoryHighlight,
    })}
  `, target);
    // clang-format on
};
export class LinearMemoryInspectorView extends UI.Widget.VBox {
    #memoryWrapper;
    #memory;
    #offset = 0;
    #address = 0;
    #tabId = '';
    #hideValueInspector = false;
    #refreshSequence = 0;
    #currentRequestId = 0;
    #settings;
    #onAddressChanged;
    #view;
    constructor(element, view = DEFAULT_VIEW) {
        super(element);
        this.#view = view;
    }
    set memoryWrapper(memoryWrapper) {
        if (this.#memoryWrapper === memoryWrapper) {
            return;
        }
        if (memoryWrapper.length() === 0 || this.#address >= memoryWrapper.length()) {
            throw new Error('Requested address is out of bounds.');
        }
        this.#memoryWrapper = memoryWrapper;
        this.#memory = undefined;
        this.refreshData();
    }
    set address(address) {
        if (address < 0 || (this.#memoryWrapper && address >= this.#memoryWrapper.length())) {
            throw new Error('Requested address is out of bounds.');
        }
        if (this.#address === address) {
            return;
        }
        this.#address = address;
        this.requestUpdate();
    }
    set tabId(tabId) {
        if (this.#tabId === tabId) {
            return;
        }
        this.#tabId = tabId;
        this.requestUpdate();
    }
    set hideValueInspector(hideValueInspector) {
        if (this.#hideValueInspector === hideValueInspector) {
            return;
        }
        this.#hideValueInspector = hideValueInspector;
        this.requestUpdate();
    }
    set onAddressChanged(onAddressChanged) {
        this.#onAddressChanged = onAddressChanged;
    }
    set refreshSequence(value) {
        if (this.#refreshSequence === value) {
            return;
        }
        this.#refreshSequence = value;
        if (this.isShowing()) {
            this.refreshData();
        }
    }
    performUpdate() {
        if (!this.#settings) {
            this.#settings = LinearMemoryInspectorController.instance().loadSettings();
        }
        if (!this.#memoryWrapper) {
            return;
        }
        const viewInput = {
            memory: this.#memory,
            offset: this.#offset,
            address: this.#address,
            outerMemoryLength: this.#memoryWrapper.length(),
            highlightInfo: this.#getHighlightInfo(),
            hideValueInspector: this.#hideValueInspector,
            valueTypes: this.#settings.valueTypes,
            valueTypeModes: this.#settings.modes,
            endianness: this.#settings.endianness,
            onMemoryRequest: this.#memoryRequested,
            onAddressChanged: this.updateAddress.bind(this),
            onSettingsChanged: this.#settingsChanged,
            onDeleteMemoryHighlight: this.#deleteMemoryHighlight,
        };
        this.#view(viewInput, undefined, this.contentElement);
    }
    wasShown() {
        super.wasShown();
        this.#settings = LinearMemoryInspectorController.instance().loadSettings();
        this.refreshData();
    }
    updateAddress(address) {
        this.address = address;
        this.#onAddressChanged?.(this.#tabId, address);
    }
    refreshData() {
        if (!this.#memoryWrapper) {
            return;
        }
        const requestId = ++this.#currentRequestId;
        void LinearMemoryInspectorController.getMemoryForAddress(this.#memoryWrapper, this.#address)
            .then(({ memory, offset }) => {
            if (requestId !== this.#currentRequestId) {
                return;
            }
            this.#memory = memory;
            this.#offset = offset;
            this.requestUpdate();
        });
    }
    #memoryRequested = (request) => {
        if (!this.#memoryWrapper) {
            return;
        }
        const { start, end, address } = request;
        if (address < start || address >= end) {
            throw new Error('Requested address is out of bounds.');
        }
        const requestId = ++this.#currentRequestId;
        void LinearMemoryInspectorController.getMemoryRange(this.#memoryWrapper, start, end).then(memory => {
            if (requestId !== this.#currentRequestId) {
                return;
            }
            this.#memory = memory;
            this.#offset = start;
            this.requestUpdate();
        });
    };
    #settingsChanged = (settings) => {
        this.#settings = settings;
        LinearMemoryInspectorController.instance().saveSettings(settings);
        this.requestUpdate();
    };
    #deleteMemoryHighlight = (highlightInfo) => {
        LinearMemoryInspectorController.instance().removeHighlight(this.#tabId, highlightInfo);
        this.refreshData();
    };
    #getHighlightInfo() {
        const highlightInfo = LinearMemoryInspectorController.instance().getHighlightInfo(this.#tabId);
        if (highlightInfo !== undefined && this.#memoryWrapper) {
            if (highlightInfo.startAddress < 0 || highlightInfo.startAddress >= this.#memoryWrapper.length()) {
                throw new Error('HighlightInfo start address is out of bounds.');
            }
            if (highlightInfo.size <= 0) {
                throw new Error('Highlight size must be a positive number.');
            }
        }
        return highlightInfo;
    }
}
//# sourceMappingURL=LinearMemoryInspectorView.js.map