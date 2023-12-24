export declare const enum MimeType {
    HTML = "text/html",
    XML = "text/xml",
    PLAIN = "text/plain",
    XHTML = "application/xhtml+xml",
    SVG = "image/svg+xml",
    CSS = "text/css",
    XSL = "text/xsl",
    VTT = "text/vtt",
    PDF = "application/pdf",
    EVENTSTREAM = "text/event-stream"
}
/**
 * Port of net::HttpUtils::ParseContentType to extract mimeType and charset from
 * the 'Content-Type' header.
 */
export declare function parseContentType(contentType: string): {
    mimeType: string | null;
    charset: string | null;
};
