// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment, } from '../../../testing/EnvironmentHelpers.js';
import * as Freestyler from '../freestyler.js';
describeWithEnvironment('ProvideFeedback', () => {
    it('should show the feedback form when canShowFeedbackForm is true', async () => {
        const component = new Freestyler.ProvideFeedback({ onFeedbackSubmit: sinon.stub(), canShowFeedbackForm: true });
        renderElementIntoDOM(component);
        const button = component.shadowRoot.querySelector('.rate-buttons devtools-button');
        button.click();
        assert(component.shadowRoot.querySelector('.feedback-form'));
    });
    it('should not show the feedback form when canShowFeedbackForm is false', async () => {
        const component = new Freestyler.ProvideFeedback({ onFeedbackSubmit: sinon.stub(), canShowFeedbackForm: false });
        renderElementIntoDOM(component);
        const button = component.shadowRoot.querySelector('.rate-buttons devtools-button');
        button.click();
        assert.notExists(component.shadowRoot.querySelector('.feedback-form'));
    });
    it('should disable the submit button when the input is empty', async () => {
        const component = new Freestyler.ProvideFeedback({ onFeedbackSubmit: sinon.stub(), canShowFeedbackForm: true });
        renderElementIntoDOM(component);
        const button = component.shadowRoot.querySelector('.rate-buttons devtools-button');
        button.click();
        assert(component.shadowRoot.querySelector('.feedback-form'));
        const submitButton = component.shadowRoot.querySelector('[aria-label="Submit"]');
        assert.isTrue(submitButton?.disabled);
        const inputField = component.shadowRoot.querySelector('.feedback-form input');
        inputField.value = 'test';
        inputField.dispatchEvent(new Event('input'));
        assert.isFalse(submitButton?.disabled);
    });
});
//# sourceMappingURL=ProvideFeedback.test.js.map