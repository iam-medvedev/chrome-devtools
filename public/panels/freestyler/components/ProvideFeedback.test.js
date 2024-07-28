// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import * as Freestyler from '../freestyler.js';
describe('ProvideFeedback', () => {
    it('should show the feedback form when canShowFeedbackForm is true', async () => {
        const component = new Freestyler.ProvideFeedback({ onFeedbackSubmit: sinon.stub(), canShowFeedbackForm: true });
        renderElementIntoDOM(component);
        const button = component.shadowRoot.querySelector('.rate-buttons devtools-button');
        button.click();
        assert(component.shadowRoot.querySelector('.feedback'));
    });
    it('should not show the feedback form when canShowFeedbackForm is false', async () => {
        const component = new Freestyler.ProvideFeedback({ onFeedbackSubmit: sinon.stub(), canShowFeedbackForm: false });
        renderElementIntoDOM(component);
        const button = component.shadowRoot.querySelector('.rate-buttons devtools-button');
        button.click();
        assert.notExists(component.shadowRoot.querySelector('.feedback'));
    });
});
//# sourceMappingURL=ProvideFeedback.test.js.map