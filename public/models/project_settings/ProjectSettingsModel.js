// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
const EMPTY_PROJECT_SETTINGS = Object.freeze({});
const IDLE_PROMISE = Promise.resolve();
let projectSettingsModelInstance;
export class ProjectSettingsModel extends Common.ObjectWrapper.ObjectWrapper {
    #pageResourceLoader;
    #targetManager;
    #projectSettings = EMPTY_PROJECT_SETTINGS;
    #promise = IDLE_PROMISE;
    /**
     * Yields the current project settings.
     *
     * @return the current project settings.
     */
    get projectSettings() {
        return this.#projectSettings;
    }
    get projectSettingsPromise() {
        return this.#promise.then(() => this.#projectSettings);
    }
    constructor(hostConfig, pageResourceLoader, targetManager) {
        super();
        this.#pageResourceLoader = pageResourceLoader;
        this.#targetManager = targetManager;
        if (hostConfig.devToolsWellKnown?.enabled) {
            this.#targetManager.addEventListener("InspectedURLChanged" /* SDK.TargetManager.Events.INSPECTED_URL_CHANGED */, this.#inspectedURLChanged, this);
            const target = this.#targetManager.primaryPageTarget();
            if (target !== null) {
                this.#inspectedURLChanged({ data: target });
            }
        }
    }
    /**
     * Yields the `ProjectSettingsModel` singleton.
     *
     * @returns the singleton.
     */
    static instance({ forceNew, hostConfig, pageResourceLoader, targetManager }) {
        if (!projectSettingsModelInstance || forceNew) {
            if (!hostConfig || !pageResourceLoader || !targetManager) {
                throw new Error('Unable to create ProjectSettingsModel: ' +
                    'hostConfig, pageResourceLoader, and targetManager must be provided');
            }
            projectSettingsModelInstance = new ProjectSettingsModel(hostConfig, pageResourceLoader, targetManager);
        }
        return projectSettingsModelInstance;
    }
    /**
     * Clears the `ProjectSettingsModel` singleton (if any).
     */
    static removeInstance() {
        if (projectSettingsModelInstance) {
            projectSettingsModelInstance.#dispose();
            projectSettingsModelInstance = undefined;
        }
    }
    #dispose() {
        this.#targetManager.removeEventListener("InspectedURLChanged" /* SDK.TargetManager.Events.INSPECTED_URL_CHANGED */, this.#inspectedURLChanged, this);
    }
    #inspectedURLChanged(event) {
        const target = event.data;
        const promise = this.#promise = this.#promise.then(async () => {
            let projectSettings = EMPTY_PROJECT_SETTINGS;
            try {
                projectSettings = await this.#loadAndValidateProjectSettings(target);
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.debug(`Could not load project settings for ${target.inspectedURL()}: ${error.message}`);
            }
            if (this.#promise === promise) {
                if (this.#projectSettings !== projectSettings) {
                    this.#projectSettings = projectSettings;
                    this.dispatchEventToListeners("ProjectSettingsChanged" /* Events.PROJECT_SETTINGS_CHANGED */, projectSettings);
                }
                this.#promise = IDLE_PROMISE;
            }
        });
    }
    async #loadAndValidateProjectSettings(target) {
        const frame = target.model(SDK.ResourceTreeModel.ResourceTreeModel)?.mainFrame;
        if (!frame?.securityOriginDetails?.isLocalhost) {
            return EMPTY_PROJECT_SETTINGS;
        }
        const initiatorUrl = frame.url;
        const frameId = frame.id;
        const url = new URL('/.well-known/appspecific/com.chrome.devtools.json', initiatorUrl);
        const { content } = await this.#pageResourceLoader.loadResource(Platform.DevToolsPath.urlString `${url}`, { target, frameId, initiatorUrl });
        const devtoolsJSON = JSON.parse(content);
        if (typeof devtoolsJSON.workspace !== 'undefined') {
            const { workspace } = devtoolsJSON;
            if (typeof workspace !== 'object' || workspace === null) {
                throw new Error('Invalid "workspace" field');
            }
            if (typeof workspace.root !== 'string') {
                throw new Error('Invalid or missing "workspace.root" field');
            }
            if (typeof workspace.uuid !== 'string') {
                throw new Error('Invalid or missing "workspace.uuid" field');
            }
        }
        return Object.freeze(devtoolsJSON);
    }
}
//# sourceMappingURL=ProjectSettingsModel.js.map