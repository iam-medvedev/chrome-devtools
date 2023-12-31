import * as TextUtils from '../../models/text_utils/text_utils.js';
import type * as Common from '../common/common.js';
import { type ContentData as LegacyContentData } from './NetworkRequest.js';
/**
 * This class is a small wrapper around either raw binary or text data.
 * As the binary data can actually contain textual data, we also store the
 * resource type, MIME type, and if applicable, the charset.
 *
 * This information should be generally kept together, as interpreting text
 * from raw bytes requires an encoding.
 *
 * Note that we only rarely have to decode text ourselves in the frontend,
 * this is mostly handled by the backend. There are cases though (e.g. SVG,
 * or streaming response content) where we receive text data in
 * binary (base64-encoded) form.
 *
 * The class only implements decoding. We currently don't have a use-case
 * to re-encode text into base64 bytes using a specified charset.
 */
export declare class ContentData {
    #private;
    readonly resourceType: Common.ResourceType.ResourceType;
    readonly mimeType: string;
    constructor(data: string, isBase64: boolean, resourceType: Common.ResourceType.ResourceType, mimeType: string, charset?: string);
    /**
     * Returns the data as base64.
     *
     * @throws if this `ContentData` was constructed from text content.
     */
    get base64(): string;
    /**
     * Returns the content as text. If this `ContentData` was constructed with base64
     * encoded bytes, it will use the provided charset to attempt to decode the bytes.
     *
     * @throws if `resourceType` is not a text type.
     */
    get text(): string;
    asDataUrl(): string | null;
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    asDeferedContent(): TextUtils.ContentProvider.DeferredContent;
    /**
     * @deprecated Used during migration from `NetworkRequest.ContentData` to `ContentData`.
     */
    asLegacyContentData(): LegacyContentData;
    static isError(contentDataOrError: ContentDataOrError): contentDataOrError is {
        error: string;
    };
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    static asDeferredContent(contentDataOrError: ContentDataOrError): TextUtils.ContentProvider.DeferredContent;
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    static asLegacyContentData(contentDataOrError: ContentDataOrError): LegacyContentData;
}
export type ContentDataOrError = ContentData | {
    error: string;
};
