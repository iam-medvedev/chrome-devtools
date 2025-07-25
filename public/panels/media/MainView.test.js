// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as Media from './media.js';
const PLAYER_ID = 'PLAYER_ID';
describeWithMockConnection('MediaMainView', () => {
    let target;
    beforeEach(() => {
        target = createTarget();
    });
    const testUiUpdate = (event, expectedMethod, inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        const downloadStore = new Media.MainView.PlayerDataDownloadManager();
        const expectedCall = sinon.stub(downloadStore, expectedMethod);
        const mainView = new Media.MainView.MainView(downloadStore);
        renderElementIntoDOM(mainView);
        const model = target.model(Media.MediaModel.MediaModel);
        assert.exists(model);
        model.dispatchEventToListeners("PlayersCreated" /* Media.MediaModel.Events.PLAYERS_CREATED */, [PLAYER_ID]);
        const field = [{ name: 'kResolution', value: '{}', data: {}, stack: [], cause: [] }];
        const data = { playerId: PLAYER_ID, properties: field, events: field, messages: field, errors: field };
        model.dispatchEventToListeners(event, ...[data]);
        await new Promise(resolve => setTimeout(resolve, 0));
        assert.strictEqual(expectedCall.called, inScope);
        await RenderCoordinator.done();
        mainView.detach();
    };
    it('reacts to properties on in scope event', testUiUpdate("PlayerPropertiesChanged" /* Media.MediaModel.Events.PLAYER_PROPERTIES_CHANGED */, 'onProperty', true));
    it('does not react to properties on out of scope event', testUiUpdate("PlayerPropertiesChanged" /* Media.MediaModel.Events.PLAYER_PROPERTIES_CHANGED */, 'onProperty', false));
    it('reacts to event on in scope event', testUiUpdate("PlayerEventsAdded" /* Media.MediaModel.Events.PLAYER_EVENTS_ADDED */, 'onEvent', true));
    it('does not react to event on out of scope event', testUiUpdate("PlayerEventsAdded" /* Media.MediaModel.Events.PLAYER_EVENTS_ADDED */, 'onEvent', false));
    it('reacts to messages on in scope event', testUiUpdate("PlayerMessagesLogged" /* Media.MediaModel.Events.PLAYER_MESSAGES_LOGGED */, 'onMessage', true));
    it('does not react to messages on out of scope event', testUiUpdate("PlayerMessagesLogged" /* Media.MediaModel.Events.PLAYER_MESSAGES_LOGGED */, 'onMessage', false));
    it('reacts to error on in scope event', testUiUpdate("PlayerErrorsRaised" /* Media.MediaModel.Events.PLAYER_ERRORS_RAISED */, 'onError', true));
    it('does not react to error on out of scope event', testUiUpdate("PlayerErrorsRaised" /* Media.MediaModel.Events.PLAYER_ERRORS_RAISED */, 'onError', false));
    it('shows a placeholder if no player is available', () => {
        const mainView = new Media.MainView.MainView();
        assert.exists(mainView.contentElement.querySelector('.empty-state'));
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-header')?.textContent, 'No media player');
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-description span')?.textContent, 'On this page you can view and export media player details.');
        mainView.detach();
    });
    it('shows a placeholder if no player was selected', () => {
        const model = target.model(Media.MediaModel.MediaModel);
        assert.exists(model);
        // Show main view, which will register event listeners on the model.
        const mainView = new Media.MainView.MainView();
        renderElementIntoDOM(mainView);
        model.dispatchEventToListeners("PlayersCreated" /* Media.MediaModel.Events.PLAYERS_CREATED */, [PLAYER_ID]);
        assert.exists(mainView.contentElement.querySelector('.empty-state'));
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-header')?.textContent, 'No media player selected');
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-description span')?.textContent, 'Select a media player to inspect its details.');
        mainView.detach();
    });
    it('shows a placeholder that no player was detected if all players are hidden', () => {
        const model = target.model(Media.MediaModel.MediaModel);
        assert.exists(model);
        // Show main view, which will register event listeners on the model.
        const mainView = new Media.MainView.MainView();
        renderElementIntoDOM(mainView);
        model.dispatchEventToListeners("PlayersCreated" /* Media.MediaModel.Events.PLAYERS_CREATED */, [PLAYER_ID]);
        mainView.markPlayerForDeletion(PLAYER_ID);
        assert.exists(mainView.contentElement.querySelector('.empty-state'));
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-header')?.textContent, 'No media player');
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-description span')?.textContent, 'On this page you can view and export media player details.');
        mainView.detach();
    });
    it('shows a placeholder if all players are hidden after already selecting a player and showing its details', () => {
        const model = target.model(Media.MediaModel.MediaModel);
        assert.exists(model);
        // Show main view, which will register event listeners on the model.
        const mainView = new Media.MainView.MainView();
        renderElementIntoDOM(mainView);
        model.dispatchEventToListeners("PlayersCreated" /* Media.MediaModel.Events.PLAYERS_CREATED */, [PLAYER_ID]);
        mainView.renderMainPanel(PLAYER_ID);
        assert.isNull(mainView.contentElement.querySelector('.empty-state'));
        mainView.markPlayerForDeletion(PLAYER_ID);
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-header')?.textContent, 'No media player');
        assert.deepEqual(mainView.contentElement.querySelector('.empty-state-description span')?.textContent, 'On this page you can view and export media player details.');
        mainView.detach();
    });
});
//# sourceMappingURL=MainView.test.js.map