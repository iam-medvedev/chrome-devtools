// Copyright 2012 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class Progress {
    setTotalWork(_totalWork) {
    }
    setTitle(_title) {
    }
    setWorked(_worked, _title) {
    }
    incrementWorked(_worked) {
    }
    done() {
    }
    isCanceled() {
        return false;
    }
}
export class CompositeProgress {
    parent;
    #children;
    #childrenDone;
    constructor(parent) {
        this.parent = parent;
        this.#children = [];
        this.#childrenDone = 0;
        this.parent.setTotalWork(1);
        this.parent.setWorked(0);
    }
    childDone() {
        if (++this.#childrenDone !== this.#children.length) {
            return;
        }
        this.parent.done();
    }
    createSubProgress(weight) {
        const child = new SubProgress(this, weight);
        this.#children.push(child);
        return child;
    }
    update() {
        let totalWeights = 0;
        let done = 0;
        for (let i = 0; i < this.#children.length; ++i) {
            const child = this.#children[i];
            if (child.getTotalWork()) {
                done += child.getWeight() * child.getWorked() / child.getTotalWork();
            }
            totalWeights += child.getWeight();
        }
        this.parent.setWorked(done / totalWeights);
    }
}
export class SubProgress {
    #composite;
    #weight;
    #worked;
    #totalWork;
    constructor(composite, weight) {
        this.#composite = composite;
        this.#weight = weight || 1;
        this.#worked = 0;
        this.#totalWork = 0;
    }
    isCanceled() {
        return this.#composite.parent.isCanceled();
    }
    setTitle(title) {
        this.#composite.parent.setTitle(title);
    }
    done() {
        this.setWorked(this.#totalWork);
        this.#composite.childDone();
    }
    setTotalWork(totalWork) {
        this.#totalWork = totalWork;
        this.#composite.update();
    }
    setWorked(worked, title) {
        this.#worked = worked;
        if (typeof title !== 'undefined') {
            this.setTitle(title);
        }
        this.#composite.update();
    }
    incrementWorked(worked) {
        this.setWorked(this.#worked + (worked || 1));
    }
    getWeight() {
        return this.#weight;
    }
    getWorked() {
        return this.#worked;
    }
    getTotalWork() {
        return this.#totalWork;
    }
}
export class ProgressProxy {
    #delegate;
    #doneCallback;
    constructor(delegate, doneCallback) {
        this.#delegate = delegate;
        this.#doneCallback = doneCallback;
    }
    isCanceled() {
        return this.#delegate ? this.#delegate.isCanceled() : false;
    }
    setTitle(title) {
        if (this.#delegate) {
            this.#delegate.setTitle(title);
        }
    }
    done() {
        if (this.#delegate) {
            this.#delegate.done();
        }
        if (this.#doneCallback) {
            this.#doneCallback();
        }
    }
    setTotalWork(totalWork) {
        if (this.#delegate) {
            this.#delegate.setTotalWork(totalWork);
        }
    }
    setWorked(worked, title) {
        if (this.#delegate) {
            this.#delegate.setWorked(worked, title);
        }
    }
    incrementWorked(worked) {
        if (this.#delegate) {
            this.#delegate.incrementWorked(worked);
        }
    }
}
//# sourceMappingURL=Progress.js.map