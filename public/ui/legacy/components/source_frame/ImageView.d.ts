import * as TextUtils from '../../../../models/text_utils/text_utils.js';
import * as UI from '../../legacy.js';
declare global {
    interface FileSystemWritableFileStream extends WritableStream {
        write(data: unknown): Promise<void>;
        close(): Promise<void>;
    }
    interface FileSystemHandle {
        createWritable(): Promise<FileSystemWritableFileStream>;
    }
    interface Window {
        showSaveFilePicker(opts: unknown): Promise<FileSystemHandle>;
    }
}
export declare class ImageView extends UI.View.SimpleView {
    private url;
    private parsedURL;
    private readonly mimeType;
    private readonly contentProvider;
    private uiSourceCode;
    private readonly sizeLabel;
    private readonly dimensionsLabel;
    private readonly aspectRatioLabel;
    private readonly mimeTypeLabel;
    private readonly container;
    private imagePreviewElement;
    private cachedContent?;
    constructor(mimeType: string, contentProvider: TextUtils.ContentProvider.ContentProvider);
    toolbarItems(): Promise<UI.Toolbar.ToolbarItem[]>;
    wasShown(): void;
    disposeView(): void;
    private workingCopyCommitted;
    private updateContentIfNeeded;
    private contextMenu;
    private copyImageAsDataURL;
    private copyImageURL;
    private saveImage;
    private openInNewTab;
    private handleDrop;
}
