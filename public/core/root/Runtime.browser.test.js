// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from './root.js';
describe('Runtime', () => {
    it('getChromeVersion result has the correct shape', () => {
        assert.isTrue(/^\d{3}\.0\.0\.0$/.test(Root.Runtime.getChromeVersion()));
    });
    // These tests are browser specific because they use localStorage.
    describe('ExperimentsSupport', () => {
        beforeEach(() => {
            self?.localStorage?.removeItem('experiments');
        });
        it('registers an experiment', () => {
            const support = new Root.Runtime.ExperimentsSupport();
            support.register('experiment', 'experiment title');
            assert.isFalse(support.isEnabled('experiment'));
            support.setEnabled('experiment', true);
            assert.isTrue(support.isEnabled('experiment'));
        });
        it('enables an experiment by default', () => {
            const support = new Root.Runtime.ExperimentsSupport();
            support.register('experiment', 'experiment title');
            support.enableExperimentsByDefault(['experiment']);
            assert.isTrue(support.isEnabled('experiment'));
        });
        it('enables an experiment via the server', () => {
            const support = new Root.Runtime.ExperimentsSupport();
            support.register('experiment', 'experiment title');
            support.setServerEnabledExperiments(['experiment']);
            assert.isTrue(support.isEnabled('experiment'));
        });
        it('enables an experiment for test', () => {
            const support = new Root.Runtime.ExperimentsSupport();
            support.register('experiment', 'experiment title');
            assert.isFalse(support.isEnabled('experiment'));
            support.enableForTest('experiment');
            assert.isTrue(support.isEnabled('experiment'));
        });
    });
});
//# sourceMappingURL=Runtime.browser.test.js.map