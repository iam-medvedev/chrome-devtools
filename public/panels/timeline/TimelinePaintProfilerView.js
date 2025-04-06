// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as SDK from '../../core/sdk/sdk.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LayerViewer from '../layer_viewer/layer_viewer.js';
import timelinePaintProfilerStyles from './timelinePaintProfiler.css.js';
import { TracingFrameLayerTree } from './TracingLayerTree.js';
export class TimelinePaintProfilerView extends UI.SplitWidget.SplitWidget {
    logAndImageSplitWidget;
    imageView;
    paintProfilerView;
    logTreeView;
    needsUpdateWhenVisible;
    pendingSnapshot;
    event;
    paintProfilerModel;
    lastLoadedSnapshot;
    #parsedTrace;
    constructor(parsedTrace) {
        super(false, false);
        this.element.classList.add('timeline-paint-profiler-view');
        this.setSidebarSize(60);
        this.setResizable(false);
        this.#parsedTrace = parsedTrace;
        this.logAndImageSplitWidget = new UI.SplitWidget.SplitWidget(true, false);
        this.logAndImageSplitWidget.element.classList.add('timeline-paint-profiler-log-split');
        this.setMainWidget(this.logAndImageSplitWidget);
        this.imageView = new TimelinePaintImageView();
        this.logAndImageSplitWidget.setMainWidget(this.imageView);
        this.paintProfilerView =
            new LayerViewer.PaintProfilerView.PaintProfilerView(this.imageView.showImage.bind(this.imageView));
        this.paintProfilerView.addEventListener("WindowChanged" /* LayerViewer.PaintProfilerView.Events.WINDOW_CHANGED */, this.onWindowChanged, this);
        this.setSidebarWidget(this.paintProfilerView);
        this.logTreeView = new LayerViewer.PaintProfilerView.PaintProfilerCommandLogView();
        this.logAndImageSplitWidget.setSidebarWidget(this.logTreeView);
        this.needsUpdateWhenVisible = false;
        this.pendingSnapshot = null;
        this.event = null;
        this.paintProfilerModel = null;
        this.lastLoadedSnapshot = null;
    }
    wasShown() {
        super.wasShown();
        if (this.needsUpdateWhenVisible) {
            this.needsUpdateWhenVisible = false;
            this.update();
        }
    }
    setSnapshot(snapshot) {
        this.releaseSnapshot();
        this.pendingSnapshot = snapshot;
        this.event = null;
        this.updateWhenVisible();
    }
    #rasterEventHasTile(event) {
        const data = event.args.tileData;
        if (!data) {
            return false;
        }
        const frame = this.#parsedTrace.Frames.framesById[data.sourceFrameNumber];
        if (!frame?.layerTree) {
            return false;
        }
        return true;
    }
    setEvent(paintProfilerModel, event) {
        this.releaseSnapshot();
        this.paintProfilerModel = paintProfilerModel;
        this.pendingSnapshot = null;
        this.event = event;
        this.updateWhenVisible();
        if (Trace.Types.Events.isPaint(event)) {
            const snapshot = this.#parsedTrace.LayerTree.paintsToSnapshots.get(event);
            return Boolean(snapshot);
        }
        if (Trace.Types.Events.isRasterTask(event)) {
            return this.#rasterEventHasTile(event);
        }
        return false;
    }
    updateWhenVisible() {
        if (this.isShowing()) {
            this.update();
        }
        else {
            this.needsUpdateWhenVisible = true;
        }
    }
    async #rasterTilePromise(rasterEvent) {
        const data = rasterEvent.args.tileData;
        if (!data) {
            return null;
        }
        if (!data.tileId.id_ref) {
            return null;
        }
        const target = SDK.TargetManager.TargetManager.instance().rootTarget();
        if (!target) {
            return null;
        }
        const frame = this.#parsedTrace.Frames.framesById[data.sourceFrameNumber];
        if (!frame?.layerTree) {
            return null;
        }
        const layerTree = new TracingFrameLayerTree(target, frame.layerTree);
        const tracingLayerTree = await layerTree.layerTreePromise();
        return tracingLayerTree ? await tracingLayerTree.pictureForRasterTile(data.tileId.id_ref) : null;
    }
    update() {
        this.logTreeView.setCommandLog([]);
        void this.paintProfilerView.setSnapshotAndLog(null, [], null);
        let snapshotPromise;
        if (this.pendingSnapshot) {
            snapshotPromise = Promise.resolve({ rect: null, snapshot: this.pendingSnapshot });
        }
        else if (this.event && this.paintProfilerModel && Trace.Types.Events.isPaint(this.event)) {
            // When we process events (TimelineModel#processEvent) and find a
            // snapshot event, we look for the last paint that occurred and link the
            // snapshot to that paint event. That is why here if the event is a Paint
            // event, we look to see if it has had a matching picture event set for
            // it.
            const snapshotEvent = this.#parsedTrace.LayerTree.paintsToSnapshots.get(this.event);
            if (snapshotEvent) {
                const encodedData = snapshotEvent.args.snapshot.skp64;
                snapshotPromise = this.paintProfilerModel.loadSnapshot(encodedData).then(snapshot => {
                    return snapshot && { rect: null, snapshot };
                });
            }
            else {
                snapshotPromise = Promise.resolve(null);
            }
        }
        else if (this.event && Trace.Types.Events.isRasterTask(this.event)) {
            snapshotPromise = this.#rasterTilePromise(this.event);
        }
        else {
            console.assert(false, 'Unexpected event type or no snapshot');
            return;
        }
        void snapshotPromise.then(snapshotWithRect => {
            this.releaseSnapshot();
            if (!snapshotWithRect) {
                this.imageView.showImage();
                return;
            }
            const snapshot = snapshotWithRect.snapshot;
            this.lastLoadedSnapshot = snapshot;
            this.imageView.setMask(snapshotWithRect.rect);
            void snapshot.commandLog().then(log => onCommandLogDone.call(this, snapshot, snapshotWithRect.rect, log || []));
        });
        function onCommandLogDone(snapshot, clipRect, log) {
            this.logTreeView.setCommandLog(log || []);
            void this.paintProfilerView.setSnapshotAndLog(snapshot, log || [], clipRect);
        }
    }
    releaseSnapshot() {
        if (!this.lastLoadedSnapshot) {
            return;
        }
        this.lastLoadedSnapshot.release();
        this.lastLoadedSnapshot = null;
    }
    onWindowChanged() {
        this.logTreeView.updateWindow(this.paintProfilerView.selectionWindow());
    }
}
export class TimelinePaintImageView extends UI.Widget.Widget {
    imageContainer;
    imageElement;
    maskElement;
    transformController;
    maskRectangle;
    constructor() {
        super(true);
        this.registerRequiredCSS(timelinePaintProfilerStyles);
        this.contentElement.classList.add('fill', 'paint-profiler-image-view');
        this.imageContainer = this.contentElement.createChild('div', 'paint-profiler-image-container');
        this.imageElement = this.imageContainer.createChild('img');
        this.maskElement = this.imageContainer.createChild('div');
        this.imageElement.addEventListener('load', this.updateImagePosition.bind(this), false);
        this.transformController = new LayerViewer.TransformController.TransformController((this.contentElement), true);
        this.transformController.addEventListener("TransformChanged" /* LayerViewer.TransformController.Events.TRANSFORM_CHANGED */, this.updateImagePosition, this);
    }
    onResize() {
        if (this.imageElement.src) {
            this.updateImagePosition();
        }
    }
    updateImagePosition() {
        const width = this.imageElement.naturalWidth;
        const height = this.imageElement.naturalHeight;
        const clientWidth = this.contentElement.clientWidth;
        const clientHeight = this.contentElement.clientHeight;
        const paddingFraction = 0.1;
        const paddingX = clientWidth * paddingFraction;
        const paddingY = clientHeight * paddingFraction;
        const scaleX = (clientWidth - paddingX) / width;
        const scaleY = (clientHeight - paddingY) / height;
        const scale = Math.min(scaleX, scaleY);
        if (this.maskRectangle) {
            const style = this.maskElement.style;
            style.width = width + 'px';
            style.height = height + 'px';
            style.borderLeftWidth = this.maskRectangle.x + 'px';
            style.borderTopWidth = this.maskRectangle.y + 'px';
            style.borderRightWidth = (width - this.maskRectangle.x - this.maskRectangle.width) + 'px';
            style.borderBottomWidth = (height - this.maskRectangle.y - this.maskRectangle.height) + 'px';
        }
        this.transformController.setScaleConstraints(0.5, 10 / scale);
        let matrix = new WebKitCSSMatrix()
            .scale(this.transformController.scale(), this.transformController.scale())
            .translate(clientWidth / 2, clientHeight / 2)
            .scale(scale, scale)
            .translate(-width / 2, -height / 2);
        const bounds = UI.Geometry.boundsForTransformedPoints(matrix, [0, 0, 0, width, height, 0]);
        this.transformController.clampOffsets(paddingX - bounds.maxX, clientWidth - paddingX - bounds.minX, paddingY - bounds.maxY, clientHeight - paddingY - bounds.minY);
        matrix = new WebKitCSSMatrix()
            .translate(this.transformController.offsetX(), this.transformController.offsetY())
            .multiply(matrix);
        this.imageContainer.style.webkitTransform = matrix.toString();
    }
    showImage(imageURL) {
        this.imageContainer.classList.toggle('hidden', !imageURL);
        if (imageURL) {
            this.imageElement.src = imageURL;
        }
    }
    setMask(maskRectangle) {
        this.maskRectangle = maskRectangle;
        this.maskElement.classList.toggle('hidden', !maskRectangle);
    }
}
//# sourceMappingURL=TimelinePaintProfilerView.js.map