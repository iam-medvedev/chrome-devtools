import type * as Common from '../../../../core/common/common.js';
import type * as Platform from '../../../../core/platform/platform.js';
import * as TextUtils from '../../../../models/text_utils/text_utils.js';
import { ResourceSourceFrame } from './ResourceSourceFrame.js';
import { StreamingContentHexView } from './StreamingContentHexView.js';
export declare class BinaryResourceViewFactory {
    private streamingContent;
    private readonly contentUrl;
    private readonly resourceType;
    private arrayPromise;
    private hexPromise;
    private utf8Promise;
    constructor(content: TextUtils.StreamingContentData.StreamingContentData, contentUrl: Platform.DevToolsPath.UrlString, resourceType: Common.ResourceType.ResourceType);
    private fetchContentAsArray;
    hex(): Promise<string>;
    base64(): string;
    utf8(): Promise<string>;
    createBase64View(): ResourceSourceFrame;
    createHexView(): StreamingContentHexView;
    createUtf8View(): ResourceSourceFrame;
    static uint8ArrayToHexString(uint8Array: Uint8Array): string;
    static numberToHex(number: number, padding: number): string;
}
