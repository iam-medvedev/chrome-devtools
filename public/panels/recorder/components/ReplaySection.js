// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
const { html } = Lit;
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
const items = [
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
];
const replaySpeedToMetricSpeedMap = {
    ["normal" /* PlayRecordingSpeed.NORMAL */]: 1 /* Host.UserMetrics.RecordingReplaySpeed.NORMAL */,
    ["slow" /* PlayRecordingSpeed.SLOW */]: 2 /* Host.UserMetrics.RecordingReplaySpeed.SLOW */,
    ["very_slow" /* PlayRecordingSpeed.VERY_SLOW */]: 3 /* Host.UserMetrics.RecordingReplaySpeed.VERY_SLOW */,
    ["extremely_slow" /* PlayRecordingSpeed.EXTREMELY_SLOW */]: 4 /* Host.UserMetrics.RecordingReplaySpeed.EXTREMELY_SLOW */,
};
const str_ = i18n.i18n.registerUIStrings('panels/recorder/components/ReplaySection.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class StartReplayEvent extends Event {
    speed;
    extension;
    static eventName = 'startreplay';
    constructor(speed, extension) {
        super(StartReplayEvent.eventName, { bubbles: true, composed: true });
        this.speed = speed;
        this.extension = extension;
    }
}
const REPLAY_EXTENSION_PREFIX = 'extension';
export class ReplaySection extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #props = { disabled: false };
    #settings;
    #replayExtensions = [];
    set data(data) {
        this.#settings = data.settings;
        this.#replayExtensions = data.replayExtensions;
    }
    get disabled() {
        return this.#props.disabled;
    }
    set disabled(disabled) {
        this.#props.disabled = disabled;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    connectedCallback() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #handleSelectMenuSelected(event) {
        const speed = event.value;
        if (this.#settings && event.value) {
            this.#settings.speed = speed;
            this.#settings.replayExtension = '';
        }
        Host.userMetrics.recordingReplaySpeed(replaySpeedToMetricSpeedMap[speed]);
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #handleSelectButtonClick(event) {
        event.stopPropagation();
        if (event.value?.startsWith(REPLAY_EXTENSION_PREFIX)) {
            if (this.#settings) {
                this.#settings.replayExtension = event.value;
            }
            const extensionIdx = Number(event.value.substring(REPLAY_EXTENSION_PREFIX.length));
            this.dispatchEvent(new StartReplayEvent("normal" /* PlayRecordingSpeed.NORMAL */, this.#replayExtensions[extensionIdx]));
            void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
            return;
        }
        this.dispatchEvent(new StartReplayEvent(this.#settings ? this.#settings.speed : "normal" /* PlayRecordingSpeed.NORMAL */));
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #render() {
        const groups = [{ name: i18nString(UIStrings.speedGroup), items }];
        if (this.#replayExtensions.length) {
            groups.push({
                name: i18nString(UIStrings.extensionGroup),
                items: this.#replayExtensions.map((extension, idx) => {
                    return {
                        value: REPLAY_EXTENSION_PREFIX + idx,
                        buttonIconName: 'play',
                        buttonLabel: () => extension.getName(),
                        label: () => extension.getName(),
                    };
                }),
            });
        }
        // clang-format off
        Lit.render(html `
    <devtools-select-button
      @selectmenuselected=${this.#handleSelectMenuSelected}
      @selectbuttonclick=${this.#handleSelectButtonClick}
      .variant=${"primary" /* SelectButtonVariant.PRIMARY */}
      .showItemDivider=${false}
      .disabled=${this.#props.disabled}
      .action=${"chrome-recorder.replay-recording" /* Actions.RecorderActions.REPLAY_RECORDING */}
      .value=${this.#settings?.replayExtension || this.#settings?.speed || ''}
      .buttonLabel=${i18nString(UIStrings.Replay)}
      .groups=${groups}
      jslog=${VisualLogging.action("chrome-recorder.replay-recording" /* Actions.RecorderActions.REPLAY_RECORDING */).track({ click: true })}
    ></devtools-select-button>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-replay-section', ReplaySection);
//# sourceMappingURL=ReplaySection.js.map