// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
const UIStrings = {
    /**
     * @description Tooltip for the 3-dots menu in the Memory panel profiles list.
     */
    profileOptions: 'Profile options',
};
const str_ = i18n.i18n.registerUIStrings('panels/profiler/ProfileSidebarTreeElement.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { classMap, live } = Directives;
export const DEFAULT_VIEW = (input, _output, target) => {
    const title = input.editing ? (target.querySelector('.title')?.textContent ?? input.title) : input.title;
    // clang-format off
    render(html `
    <div class="icon ${classMap({ spinner: input.wait })}"></div>
    <div class="titles ${classMap({ 'no-subtitle': !input.subtitle })}"
         jslog=${VisualLogging.value('title').track({ dblclick: true, change: true })}>
      <span class="title-container"><span class="title" .textContent=${live(title)}></span></span>
      <span class="subtitle">${input.subtitle ? `(${input.subtitle})` : nothing}</span>
    </div>
    <devtools-menu-button
        .iconName=${'dots-vertical'}
        title=${i18nString(UIStrings.profileOptions)}
        tabindex="-1"
        jslog=${VisualLogging.dropDown('profile-options').track({ click: true })}
        .populateMenuCall=${input.populateContextMenu}></devtools-menu-button>`, target);
    // clang-format on
};
export class ProfileSidebarTreeElement extends UI.TreeOutline.TreeElement {
    #view;
    #dataDisplayDelegate;
    profile;
    #editing = null;
    #title;
    #subtitle = null;
    #wait = false;
    #small = false;
    constructor(dataDisplayDelegate, profile, className, view = DEFAULT_VIEW) {
        super('', false, 'profile-item');
        this.#view = view;
        this.#title = profile.title;
        this.#dataDisplayDelegate = dataDisplayDelegate;
        this.profile = profile;
        this.listItemElement.classList.add(className);
        this.listItemElement.addEventListener('contextmenu', this.#handleContextMenuEvent.bind(this), true);
        UI.ARIAUtils.setDescription(this.listItemElement, profile.profileType().name);
        profile.addEventListener("UpdateStatus" /* ProfileHeaderEvents.UPDATE_STATUS */, this.#updateStatus, this);
        this.performUpdate();
    }
    performUpdate() {
        if (this.#subtitle !== null) {
            UI.ARIAUtils.setLabel(this.listItemElement, `${this.profile.title}, ${this.#subtitle}`);
        }
        this.listItemElement.classList.toggle('wait', this.#wait);
        this.listItemElement.classList.toggle('small', this.#small);
        const input = {
            title: this.#title,
            subtitle: this.#subtitle,
            wait: this.#wait,
            editing: Boolean(this.#editing),
            populateContextMenu: this.#populateContextMenu.bind(this),
        };
        this.#view(input, undefined, this.listItemElement);
    }
    #updateStatus(event) {
        const statusUpdate = event.data;
        if (statusUpdate.subtitle !== null) {
            this.#subtitle = statusUpdate.subtitle;
        }
        if (typeof statusUpdate.wait === 'boolean') {
            this.#wait = statusUpdate.wait;
        }
        this.performUpdate();
    }
    ondblclick(event) {
        if (!this.#editing) {
            this.#startEditing(event.target);
        }
        return false;
    }
    #startEditing(eventTarget) {
        const container = eventTarget.enclosingNodeOrSelfWithClass('title');
        if (!container) {
            return;
        }
        const config = new UI.InplaceEditor.Config(this.#editingCommitted.bind(this), this.#editingCancelled.bind(this), undefined);
        this.#editing = UI.InplaceEditor.InplaceEditor.startEditing(container, config);
    }
    #editingCommitted(_container, newTitle) {
        if (newTitle.trim().length === 0) {
            if (this.#editing) {
                this.#editing.cancel();
            }
        }
        else {
            this.#editing = null;
            this.#title = newTitle;
            this.profile.setTitle(newTitle);
            this.performUpdate();
        }
    }
    #editingCancelled() {
        this.#editing = null;
        this.performUpdate();
    }
    dispose() {
        this.profile.removeEventListener("UpdateStatus" /* ProfileHeaderEvents.UPDATE_STATUS */, this.#updateStatus, this);
    }
    onselect() {
        this.#dataDisplayDelegate.showProfile(this.profile);
        return true;
    }
    ondelete() {
        this.profile.profileType().removeProfile(this.profile);
        return true;
    }
    #handleContextMenuEvent(event) {
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        this.#populateContextMenu(contextMenu);
        void contextMenu.show();
    }
    #populateContextMenu(contextMenu) {
        contextMenu.appendItemsAtLocation('profilerMenu');
    }
    setSmall(small) {
        this.#small = small;
        this.performUpdate();
    }
    setMainTitle(title) {
        this.#title = title;
        this.performUpdate();
    }
}
//# sourceMappingURL=ProfileSidebarTreeElement.js.map