// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Models from '../models/models.js';
import recordingListViewStyles from './recordingListView.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     * @description The title of the page that contains a list of saved recordings that the user has..
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
        super(CreateRecordingEvent.eventName, { composed: true, bubbles: true });
    }
}
export class DeleteRecordingEvent extends Event {
    storageName;
    static eventName = 'deleterecording';
    constructor(storageName) {
        super(DeleteRecordingEvent.eventName, { composed: true, bubbles: true });
        this.storageName = storageName;
    }
}
export class OpenRecordingEvent extends Event {
    storageName;
    static eventName = 'openrecording';
    constructor(storageName) {
        super(OpenRecordingEvent.eventName, { composed: true, bubbles: true });
        this.storageName = storageName;
    }
}
export class PlayRecordingEvent extends Event {
    storageName;
    static eventName = 'playrecording';
    constructor(storageName) {
        super(PlayRecordingEvent.eventName, { composed: true, bubbles: true });
        this.storageName = storageName;
    }
}
export const DEFAULT_VIEW = (input, _output, target) => {
    const { recordings, replayAllowed, onCreateClick, onDeleteClick, onOpenClick, onPlayRecordingClick, onKeyDown, } = input;
    // clang-format off
    Lit.render(html `
      <style>${UI.Widget.widgetScoped(recordingListViewStyles)}</style>
      <div class="wrapper">
        <div class="header">
          <h1>${i18nString(UIStrings.savedRecordings)}</h1>
          <devtools-button
            .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}
            @click=${onCreateClick}
            title=${Models.Tooltip.getTooltipForActions(i18nString(UIStrings.createRecording), "chrome-recorder.create-recording" /* Actions.RecorderActions.CREATE_RECORDING */)}
            .jslogContext=${'create-recording'}
          >
            ${i18nString(UIStrings.createRecording)}
          </devtools-button>
        </div>
        <div class="table">
          ${recordings.map(recording => {
        return html `
                <div
                  role="button"
                  tabindex="0"
                  aria-label=${i18nString(UIStrings.openRecording)}
                  class="row"
                  @keydown=${(event) => onKeyDown(recording.storageName, event)}
                  @click=${(event) => onOpenClick(recording.storageName, event)}
                  jslog=${VisualLogging.item()
            .track({ click: true })
            .context('recording')}>
                  <div class="icon">
                    <devtools-icon name="flow">
                    </devtools-icon>
                  </div>
                  <div class="title">${recording.name}</div>
                  <div class="actions">
                    ${replayAllowed
            ? html `
                              <devtools-button
                                title=${i18nString(UIStrings.playRecording)}
                                .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                iconName: 'play',
                jslogContext: 'play-recording',
            }}
                                @click=${(event) => onPlayRecordingClick(recording.storageName, event)}
                                @keydown=${(event) => event.stopPropagation()}
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
                      @click=${(event) => onDeleteClick(recording.storageName, event)}
                      @keydown=${(event) => event.stopPropagation()}
                    ></devtools-button>
                  </div>
                </div>
              `;
    })}
        </div>
      </div>
    `, target);
    // clang-format on
};
export class RecordingListView extends UI.Widget.Widget {
    #recordings = [];
    #replayAllowed = true;
    #view;
    constructor(element, view) {
        super(element, { useShadowDom: true });
        this.#view = view || DEFAULT_VIEW;
    }
    set recordings(recordings) {
        this.#recordings = recordings;
        this.performUpdate();
    }
    set replayAllowed(value) {
        this.#replayAllowed = value;
        this.performUpdate();
    }
    #onCreateClick() {
        this.contentElement.dispatchEvent(new CreateRecordingEvent());
    }
    #onDeleteClick(storageName, event) {
        event.stopPropagation();
        this.contentElement.dispatchEvent(new DeleteRecordingEvent(storageName));
    }
    #onOpenClick(storageName, event) {
        event.stopPropagation();
        this.contentElement.dispatchEvent(new OpenRecordingEvent(storageName));
    }
    #onPlayRecordingClick(storageName, event) {
        event.stopPropagation();
        this.contentElement.dispatchEvent(new PlayRecordingEvent(storageName));
    }
    #onKeyDown(storageName, event) {
        if (event.key !== 'Enter') {
            return;
        }
        this.#onOpenClick(storageName, event);
    }
    performUpdate() {
        this.#view({
            recordings: this.#recordings,
            replayAllowed: this.#replayAllowed,
            onCreateClick: this.#onCreateClick.bind(this),
            onDeleteClick: this.#onDeleteClick.bind(this),
            onOpenClick: this.#onOpenClick.bind(this),
            onPlayRecordingClick: this.#onPlayRecordingClick.bind(this),
            onKeyDown: this.#onKeyDown.bind(this),
        }, {}, this.contentElement);
    }
    wasShown() {
        super.wasShown();
        this.performUpdate();
    }
}
//# sourceMappingURL=RecordingListView.js.map