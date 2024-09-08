// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
export const AI_ASSISTANT_CSS_CLASS_NAME = 'ai-assistant-change';
/**
 * Keeps track of changes done by Freestyler. Currently, it is primarily
 * for stylesheet generation based on all changes.
 */
export class ChangeManager {
    #stylesheetMutex = new Common.Mutex.Mutex();
    #cssModelToStylesheetId = new Map();
    #stylesheetChanges = new Map();
    async #getStylesheet(cssModel, frameId) {
        return await this.#stylesheetMutex.run(async () => {
            let frameToStylesheet = this.#cssModelToStylesheetId.get(cssModel);
            if (!frameToStylesheet) {
                frameToStylesheet = new Map();
                this.#cssModelToStylesheetId.set(cssModel, frameToStylesheet);
                cssModel.addEventListener(SDK.CSSModel.Events.ModelDisposed, this.#onCssModelDisposed, this);
            }
            let stylesheetId = frameToStylesheet.get(frameId);
            if (!stylesheetId) {
                const styleSheetHeader = await cssModel.createInspectorStylesheet(frameId);
                if (!styleSheetHeader) {
                    throw new Error('inspector-stylesheet is not found');
                }
                stylesheetId = styleSheetHeader.id;
            }
            return stylesheetId;
        });
    }
    async #onCssModelDisposed(event) {
        return await this.#stylesheetMutex.run(async () => {
            const cssModel = event.data;
            cssModel.removeEventListener(SDK.CSSModel.Events.ModelDisposed, this.#onCssModelDisposed, this);
            const stylesheetIds = Array.from(this.#cssModelToStylesheetId.get(cssModel)?.values() ?? []);
            // Empty stylesheets.
            const results = await Promise.allSettled(stylesheetIds.map(async (id) => {
                this.#stylesheetChanges.delete(id);
                await cssModel.setStyleSheetText(id, '', true);
            }));
            this.#cssModelToStylesheetId.delete(cssModel);
            const firstFailed = results.find(result => result.status === 'rejected');
            if (firstFailed) {
                throw new Error(firstFailed.reason);
            }
        });
    }
    async clear() {
        const models = Array.from(this.#cssModelToStylesheetId.keys());
        const results = await Promise.allSettled(models.map(async (model) => {
            await this.#onCssModelDisposed({ data: model });
        }));
        this.#cssModelToStylesheetId.clear();
        this.#stylesheetChanges.clear();
        const firstFailed = results.find(result => result.status === 'rejected');
        if (firstFailed) {
            throw new Error(firstFailed.reason);
        }
    }
    async addChange(cssModel, frameId, change) {
        const stylesheetId = await this.#getStylesheet(cssModel, frameId);
        const changes = this.#stylesheetChanges.get(stylesheetId) || [];
        const existingChange = changes.find(c => c.className === change.className);
        if (existingChange) {
            Object.assign(existingChange.styles, change.styles);
        }
        else {
            changes.push(change);
        }
        await cssModel.setStyleSheetText(stylesheetId, this.buildChanges(changes), true);
        this.#stylesheetChanges.set(stylesheetId, changes);
    }
    buildChanges(changes) {
        function formatStyles(styles) {
            const kebabStyles = Platform.StringUtilities.toKebabCaseKeys(styles);
            const lines = Object.entries(kebabStyles).map(([key, value]) => `${key}: ${value};`);
            return lines.join('\n');
        }
        return changes
            .map(change => {
            return `.${change.className} {
  ${change.selector}& {
    ${formatStyles(change.styles)}
  }
}`;
        })
            .join('\n');
    }
}
//# sourceMappingURL=ChangeManager.js.map