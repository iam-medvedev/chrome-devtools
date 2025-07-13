// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class ElementUpdateRecord {
    modifiedAttributes;
    removedAttributes;
    hasChangedChildrenInternal;
    hasRemovedChildrenInternal;
    charDataModifiedInternal;
    attributeModified(attrName) {
        if (this.removedAttributes?.has(attrName)) {
            this.removedAttributes.delete(attrName);
        }
        if (!this.modifiedAttributes) {
            this.modifiedAttributes = (new Set());
        }
        this.modifiedAttributes.add(attrName);
    }
    attributeRemoved(attrName) {
        if (this.modifiedAttributes?.has(attrName)) {
            this.modifiedAttributes.delete(attrName);
        }
        if (!this.removedAttributes) {
            this.removedAttributes = (new Set());
        }
        this.removedAttributes.add(attrName);
    }
    nodeInserted(_node) {
        this.hasChangedChildrenInternal = true;
    }
    nodeRemoved(_node) {
        this.hasChangedChildrenInternal = true;
        this.hasRemovedChildrenInternal = true;
    }
    charDataModified() {
        this.charDataModifiedInternal = true;
    }
    childrenModified() {
        this.hasChangedChildrenInternal = true;
    }
    isAttributeModified(attributeName) {
        return this.modifiedAttributes?.has(attributeName) ?? false;
    }
    hasRemovedAttributes() {
        return this.removedAttributes !== null && this.removedAttributes !== undefined &&
            Boolean(this.removedAttributes.size);
    }
    isCharDataModified() {
        return Boolean(this.charDataModifiedInternal);
    }
    hasChangedChildren() {
        return Boolean(this.hasChangedChildrenInternal);
    }
    hasRemovedChildren() {
        return Boolean(this.hasRemovedChildrenInternal);
    }
}
//# sourceMappingURL=ElementUpdateRecord.js.map