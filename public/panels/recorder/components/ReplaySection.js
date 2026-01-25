// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Models from '../models/models.js';
import replaySectionStyles from './replaySection.css.js';
const { html, Directives: { ifDefined, repeat } } = Lit;
const UIStrings = {
    /**
     * @description Replay button label
     */
    Replay: 'Replay',
    /**
     * @description Button label for the normal speed replay option
     */
    ReplayNormalButtonLabel: 'Normal speed',
    /**
     * @description Item label for the normal speed replay option
     */
    ReplayNormalItemLabel: 'Normal (Default)',
    /**
     * @description Button label for the slow speed replay option
     */
    ReplaySlowButtonLabel: 'Slow speed',
    /**
     * @description Item label for the slow speed replay option
     */
    ReplaySlowItemLabel: 'Slow',
    /**
     * @description Button label for the very slow speed replay option
     */
    ReplayVerySlowButtonLabel: 'Very slow speed',
    /**
     * @description Item label for the very slow speed replay option
     */
    ReplayVerySlowItemLabel: 'Very slow',
    /**
     * @description Button label for the extremely slow speed replay option
     */
    ReplayExtremelySlowButtonLabel: 'Extremely slow speed',
    /**
     * @description Item label for the slow speed replay option
     */
    ReplayExtremelySlowItemLabel: 'Extremely slow',
    /**
     * @description Label for a group of items in the replay menu that indicate various replay speeds (e.g., Normal, Fast, Slow).
     */
    speedGroup: 'Speed',
    /**
     * @description Label for a group of items in the replay menu that indicate various extensions that can be used for replay.
     */
    extensionGroup: 'Extensions',
};
const str_ = i18n.i18n.registerUIStrings('panels/recorder/components/ReplaySection.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const REPLAY_EXTENSION_PREFIX = 'extension';
export const DEFAULT_VIEW = (input, _output, target) => {
    const { disabled, groups, selectedItem, actionTitle, onButtonClick, onItemSelected } = input;
    const buttonVariant = "primary" /* Buttons.Button.Variant.PRIMARY */;
    const handleClick = (ev) => {
        ev.stopPropagation();
        onButtonClick();
    };
    const handleSelectMenuSelect = (event) => {
        if (event.target instanceof HTMLSelectElement) {
            onItemSelected(event.target.value);
        }
    };
    // clang-format off
    Lit.render(html `
      <style>
        ${UI.inspectorCommonStyles}
      </style>
      <style>
        ${replaySectionStyles}
      </style>
      <div
        class="select-button"
        title=${ifDefined(actionTitle)}
      >
        <label>
          ${groups.length > 1
        ? html `
                <div
                  class="groups-label"
                  >${groups
            .map(group => {
            return group.name;
        })
            .join(' & ')}</div>`
        : Lit.nothing}
          <select
            class="primary"
            ?disabled=${disabled}
            jslog=${VisualLogging.dropDown('network-conditions').track({
        change: true,
    })}
            @change=${handleSelectMenuSelect}
          >
            ${repeat(groups, group => group.name, group => html `
                <optgroup label=${group.name}>
                  ${repeat(group.items, item => item.value, item => {
        const selected = item.value === selectedItem.value;
        return html `
                      <option
                        .title=${item.label()}
                        value=${item.value}
                        ?selected=${selected}
                        jslog=${VisualLogging.item(Platform.StringUtilities.toKebabCase(item.value)).track({ click: true })}
                      >
                        ${(selected && item.buttonLabel) ? item.buttonLabel() : item.label()}
                      </option>
                    `;
    })}
                </optgroup>
              `)}
          </select>
        </label>
        <devtools-button
          .disabled=${disabled}
          .variant=${buttonVariant}
          .iconName=${selectedItem.buttonIconName}
          @click=${handleClick}
          jslog=${VisualLogging.action("chrome-recorder.replay-recording" /* Actions.RecorderActions.REPLAY_RECORDING */).track({ click: true })}
        >
          ${i18nString(UIStrings.Replay)}
        </devtools-button>
      </div>`, target);
    // clang-format on
};
/**
 * This presenter combines built-in replay speeds and extensions into a single
 * select menu + a button.
 */
export class ReplaySection extends UI.Widget.Widget {
    onStartReplay;
    #disabled = false;
    #settings;
    #replayExtensions = [];
    #view;
    #groups = [];
    constructor(element, view) {
        super(element, { useShadowDom: true });
        this.#view = view || DEFAULT_VIEW;
        this.#groups = this.#computeGroups();
    }
    set settings(settings) {
        this.#settings = settings;
        this.performUpdate();
    }
    set replayExtensions(replayExtensions) {
        this.#replayExtensions = replayExtensions;
        this.#groups = this.#computeGroups();
        this.performUpdate();
    }
    get disabled() {
        return this.#disabled;
    }
    set disabled(disabled) {
        this.#disabled = disabled;
        this.performUpdate();
    }
    wasShown() {
        super.wasShown();
        this.performUpdate();
    }
    performUpdate() {
        const selectedItem = this.#getSelectedItem();
        this.#view({
            disabled: this.#disabled,
            groups: this.#groups,
            selectedItem,
            actionTitle: Models.Tooltip.getTooltipForActions(selectedItem.label(), "chrome-recorder.replay-recording" /* Actions.RecorderActions.REPLAY_RECORDING */),
            onButtonClick: () => this.#onStartReplay(),
            onItemSelected: (item) => this.#onItemSelected(item),
        }, undefined, this.contentElement);
    }
    #computeGroups() {
        const groups = [{
                name: i18nString(UIStrings.speedGroup),
                items: [
                    {
                        value: "normal" /* PlayRecordingSpeed.NORMAL */,
                        buttonIconName: 'play',
                        buttonLabel: () => i18nString(UIStrings.ReplayNormalButtonLabel),
                        label: () => i18nString(UIStrings.ReplayNormalItemLabel),
                    },
                    {
                        value: "slow" /* PlayRecordingSpeed.SLOW */,
                        buttonIconName: 'play',
                        buttonLabel: () => i18nString(UIStrings.ReplaySlowButtonLabel),
                        label: () => i18nString(UIStrings.ReplaySlowItemLabel),
                    },
                    {
                        value: "very_slow" /* PlayRecordingSpeed.VERY_SLOW */,
                        buttonIconName: 'play',
                        buttonLabel: () => i18nString(UIStrings.ReplayVerySlowButtonLabel),
                        label: () => i18nString(UIStrings.ReplayVerySlowItemLabel),
                    },
                    {
                        value: "extremely_slow" /* PlayRecordingSpeed.EXTREMELY_SLOW */,
                        buttonIconName: 'play',
                        buttonLabel: () => i18nString(UIStrings.ReplayExtremelySlowButtonLabel),
                        label: () => i18nString(UIStrings.ReplayExtremelySlowItemLabel),
                    },
                ]
            }];
        if (this.#replayExtensions.length) {
            groups.push({
                name: i18nString(UIStrings.extensionGroup),
                items: this.#replayExtensions.map((extension, idx) => {
                    return {
                        value: (REPLAY_EXTENSION_PREFIX + idx),
                        buttonIconName: 'play',
                        buttonLabel: () => extension.getName(),
                        label: () => extension.getName(),
                    };
                }),
            });
        }
        return groups;
    }
    #getSelectedItem() {
        const value = this.#settings?.replayExtension || this.#settings?.speed || '';
        for (const group of this.#groups) {
            for (const item of group.items) {
                if (item.value === value) {
                    return item;
                }
            }
        }
        return this.#groups[0].items[0];
    }
    #onStartReplay() {
        const value = this.#settings?.replayExtension || this.#settings?.speed || '';
        if (value?.startsWith(REPLAY_EXTENSION_PREFIX)) {
            const extensionIdx = Number(value.substring(REPLAY_EXTENSION_PREFIX.length));
            const extension = this.#replayExtensions[extensionIdx];
            if (this.#settings) {
                this.#settings.replayExtension = REPLAY_EXTENSION_PREFIX + extensionIdx;
            }
            if (this.onStartReplay) {
                this.onStartReplay("normal" /* PlayRecordingSpeed.NORMAL */, extension);
            }
        }
        else if (this.onStartReplay) {
            this.onStartReplay(this.#settings ? this.#settings.speed : "normal" /* PlayRecordingSpeed.NORMAL */);
        }
        this.performUpdate();
    }
    #onItemSelected(item) {
        const speed = item;
        if (this.#settings && speed) {
            this.#settings.speed = speed;
            this.#settings.replayExtension = '';
        }
        this.performUpdate();
    }
}
//# sourceMappingURL=ReplaySection.js.map