// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Models from '../models/models.js';
import recordingListViewStyles from './recordingListView.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     *@description The title of the page that contains a list of saved recordings that the user has..
     */
    savedRecordings: 'Saved recordings',
    /**
     * @description The title of the button that leads to create a new recording page.
     */
    createRecording: 'Create a new recording',
    /**
     * @description The title of the button that is shown next to each of the recordings and that triggers playing of the recording.
     */
    playRecording: 'Play recording',
    /**
     * @description The title of the button that is shown next to each of the recordings and that triggers deletion of the recording.
     */
    deleteRecording: 'Delete recording',
    /**
     * @description The title of the row corresponding to a recording. By clicking on the row, the user open the recording for editing.
     */
    openRecording: 'Open recording',
};
const str_ = i18n.i18n.registerUIStrings('panels/recorder/components/RecordingListView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class CreateRecordingEvent extends Event {
    static eventName = 'createrecording';
    constructor() {
        super(CreateRecordingEvent.eventName);
    }
}
export class DeleteRecordingEvent extends Event {
    storageName;
    static eventName = 'deleterecording';
    constructor(storageName) {
        super(DeleteRecordingEvent.eventName);
        this.storageName = storageName;
    }
}
export class OpenRecordingEvent extends Event {
    storageName;
    static eventName = 'openrecording';
    constructor(storageName) {
        super(OpenRecordingEvent.eventName);
        this.storageName = storageName;
    }
}
export class PlayRecordingEvent extends Event {
    storageName;
    static eventName = 'playrecording';
    constructor(storageName) {
        super(PlayRecordingEvent.eventName);
        this.storageName = storageName;
    }
}
export class RecordingListView extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #props = {
        recordings: [],
        replayAllowed: true,
    };
    connectedCallback() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    set recordings(recordings) {
        this.#props.recordings = recordings;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    set replayAllowed(value) {
        this.#props.replayAllowed = value;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #onCreateClick() {
        this.dispatchEvent(new CreateRecordingEvent());
    }
    #onDeleteClick(storageName, event) {
        event.stopPropagation();
        this.dispatchEvent(new DeleteRecordingEvent(storageName));
    }
    #onOpenClick(storageName, event) {
        event.stopPropagation();
        this.dispatchEvent(new OpenRecordingEvent(storageName));
    }
    #onPlayRecordingClick(storageName, event) {
        event.stopPropagation();
        this.dispatchEvent(new PlayRecordingEvent(storageName));
    }
    #onKeyDown(storageName, event) {
        if (event.key !== 'Enter') {
            return;
        }
        this.#onOpenClick(storageName, event);
    }
    #stopPropagation(event) {
        event.stopPropagation();
    }
    #render = () => {
        // clang-format off
        Lit.render(html `
        <style>${recordingListViewStyles}</style>
        <div class="wrapper">
          <div class="header">
            <h1>${i18nString(UIStrings.savedRecordings)}</h1>
            <devtools-button
              .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}
              @click=${this.#onCreateClick}
              title=${Models.Tooltip.getTooltipForActions(i18nString(UIStrings.createRecording), "chrome-recorder.create-recording" /* Actions.RecorderActions.CREATE_RECORDING */)}
              .jslogContext=${'create-recording'}
            >
              ${i18nString(UIStrings.createRecording)}
            </devtools-button>
          </div>
          <div class="table">
            ${this.#props.recordings.map(recording => {
            return html `
                  <div
                    role="button"
                    tabindex="0"
                    aria-label=${i18nString(UIStrings.openRecording)}
                    class="row"
                    @keydown=${this.#onKeyDown.bind(this, recording.storageName)}
                    @click=${this.#onOpenClick.bind(this, recording.storageName)}
                    jslog=${VisualLogging.item()
                .track({ click: true })
                .context('recording')}>
                    <div class="icon">
                      <devtools-icon name="flow">
                      </devtools-icon>
                    </div>
                    <div class="title">${recording.name}</div>
                    <div class="actions">
                      ${this.#props.replayAllowed
                ? html `
                              <devtools-button
                                title=${i18nString(UIStrings.playRecording)}
                                .data=${{
                    variant: "icon" /* Buttons.Button.Variant.ICON */,
                    iconName: 'play',
                    jslogContext: 'play-recording',
                }}
                                @click=${this.#onPlayRecordingClick.bind(this, recording.storageName)}
                                @keydown=${this.#stopPropagation}
                              ></devtools-button>
                              <div class="divider"></div>`
                : ''}
                      <devtools-button
                        class="delete-recording-button"
                        title=${i18nString(UIStrings.deleteRecording)}
                        .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                iconName: 'bin',
                jslogContext: 'delete-recording',
            }}
                        @click=${this.#onDeleteClick.bind(this, recording.storageName)}
                        @keydown=${this.#stopPropagation}
                      ></devtools-button>
                    </div>
                  </div>
                `;
        })}
          </div>
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    };
}
customElements.define('devtools-recording-list-view', RecordingListView);
//# sourceMappingURL=RecordingListView.js.map