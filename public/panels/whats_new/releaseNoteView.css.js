// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.whatsnew {
  padding: var(--sys-size-9) 0 0;
  background: var(--sys-color-header-container);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-9);

  >* {
    padding: 0 var(--sys-size-9);
  }
}

.header {
  display: flex;
  align-items: center;
  font: var(--sys-typescale-headline4);

  &::before {
    content: "";
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    transform: scale(1.6);
    margin: 0 var(--sys-size-8) 0 var(--sys-size-4);
    background-image: var(--image-file-devtools);
    mask-repeat: no-repeat;
  }
}

.feature-container {
  flex-grow: 1;
  padding: 0;
  background-color: var(--sys-color-surface);
  border-radius: var(--sys-shape-corner-large) var(--sys-shape-corner-large) 0 0;
  display: flex;
  flex-direction: column;
}

.feature {
  background-color: var(--sys-color-surface3);
  padding: 0 var(--sys-size-8) var(--sys-size-8);
  border-radius: var(--sys-shape-corner-medium);
  flex-shrink: 0;
  margin: 0 var(--sys-size-9) var(--sys-size-9);
}

.video-container {
  overflow: auto;
  display: flex;
  flex-direction: row;
  gap: var(--sys-size-5);
  flex-shrink: 0;
  padding: var(--sys-size-9) 0 var(--sys-size-3) var(--sys-size-9);
  margin-bottom: var(--sys-size-8);
}

.video {
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: var(--sys-shape-corner-medium);
  background-color: var(--sys-color-surface3);
  font: var(--sys-typescale-body5-regular);
  min-width: var(--sys-size-29);
  max-width: var(--sys-size-32);
  overflow: hidden;
  height: 72px;

  &:hover {
    box-shadow: var(--sys-elevation-level3);
  }

  .thumbnail {
    border-radius: var(--sys-shape-corner-medium) 0 0 var(--sys-shape-corner-medium);
    flex-shrink: 0;
  }

  .thumbnail-description {
    --description-margin: var(--sys-size-6);

    margin: var(--description-margin);
    height: calc(100% - var(--description-margin) * 2);
    overflow: hidden;
  }
}

@media (forced-colors: active) {
  .feature,
  .video {
    border: var(--sys-size-1) solid ButtonText;
  }
}

/*# sourceURL=releaseNoteView.css */
`);

export default styles;
