// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { afterEach, it } from 'mocha';
import sinon from 'sinon';
import * as SDK from '../../../../core/sdk/sdk.js';
import { assertScreenshot, dispatchMouseMoveEvent, raf, renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as UI from '../../legacy.js';
import * as ObjectUI from './object_ui.js';
describeWithEnvironment('ObjectPopoverHelper', () => {
    let popoverHelper;
    afterEach(() => {
        popoverHelper?.hidePopover();
        popoverHelper?.dispose();
    });
    it('creates an editable ObjectPropertiesSection', async () => {
        const object = SDK.RemoteObject.RemoteObject.fromLocalObject({ foo: 'bar' });
        const popover = new UI.GlassPane.GlassPane();
        await ObjectUI.ObjectPopoverHelper.ObjectPopoverHelper.buildObjectPopover(object, popover);
        // The ObjectPropertiesSection element should be a child of popover.contentElement
        const sectionElement = popover.contentElement.querySelector('.object-popover-tree');
        assert.exists(sectionElement);
        const section = UI.Widget.Widget.get(sectionElement);
        assert.exists(section);
        assert.exists(section.objectTree);
        assert.isFalse(section.objectTree.readOnly);
        assert.isTrue(section.objectTree.expanded);
    });
    it('renders an object with scrollbars', async () => {
        const runtimeModel = createTarget().model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtimeModel);
        const createProperty = (name, value) => new SDK.RemoteObject.RemoteObjectProperty(name, runtimeModel.createRemoteObjectFromPrimitiveValue(value), 
        /* enumerable */ true, 
        /* writable */ true, /* isOwn */ true);
        const properties = [
            createProperty('longProperty', 'This is a very long property value that should cause a horizontal scrollbar'),
            ...Array.from({ length: 25 }, (_, i) => createProperty(`property${i}`, i)),
        ];
        const object = runtimeModel.createRemoteObject({
            type: "object" /* Protocol.Runtime.RemoteObjectType.Object */,
            className: 'Object',
            description: 'Object',
            objectId: 'object-id',
        });
        sinon.stub(object, 'getOwnProperties').resolves({ properties, internalProperties: [] });
        sinon.stub(object, 'getAllProperties').resolves({ properties, internalProperties: [] });
        // The GlassPane sizes and positions the popover relative to its container. In DevTools that is the whole window,
        // so the container needs a real size here as well.
        const container = document.createElement('div');
        container.classList.add('flex-auto');
        renderElementIntoDOM(container, { includeCommonStyles: true, width: 500, height: 400 });
        UI.GlassPane.GlassPane.setContainer(container);
        const containerBox = container.boxInWindow();
        const anchorBox = new AnchorBox(containerBox.x + 150, containerBox.y + 300, 60, 16);
        const popoverBuilt = Promise.withResolvers();
        let objectPopoverHelper = null;
        const getPopoverRequest = () => ({
            box: anchorBox,
            show: async (popover) => {
                objectPopoverHelper =
                    await ObjectUI.ObjectPopoverHelper.ObjectPopoverHelper.buildObjectPopover(object, popover);
                popoverBuilt.resolve();
                return true;
            },
            hide: () => objectPopoverHelper?.dispose(),
        });
        popoverHelper = new UI.PopoverHelper.PopoverHelper(container, getPopoverRequest);
        popoverHelper.setTimeout(0);
        dispatchMouseMoveEvent(container);
        await popoverBuilt.promise;
        await raf();
        assert.isTrue(popoverHelper.isPopoverVisible());
        await UI.Widget.Widget.allUpdatesComplete;
        await raf();
        await assertScreenshot('object_ui/object_popover_scrollbars.png');
    });
});
//# sourceMappingURL=ObjectPopoverHelper.test.js.map