// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2019 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.media-attributes-view {
  border-bottom: 1px solid var(--sys-color-divider);
}

.media-property-renderer {
  line-height: 20px;
  min-height: 28px;
  padding: 4px 10px;
  display: block;
  overflow: hidden;

  &:hover {
    background: var(--sys-color-state-hover-on-subtle);
  }
}

.media-property-renderer:nth-child(even):not(:hover) {
  background: var(--sys-color-surface1);
}

.media-property-renderer:has(.json-view) {
  padding-bottom: 0;
}

.media-property-renderer:has(.json-view > .expanded) {
  padding-bottom: 4px;
}

.media-property-renderer-hidden {
  display: none;
}

.media-property-renderer-title {
  font-size: 12px;
  float: left;
  width: 150px;
}

.media-property-renderer-title::first-letter {
  text-transform: uppercase;
}

.media-property-renderer-contents {
  position: relative;

  & > .json-view {
    overflow: hidden;
    padding: 0;
  }
}

.media-properties-frame {
  display: block;
  overflow-x: hidden;
}

/*# sourceURL=playerPropertiesView.css */
`);

export default styles;
