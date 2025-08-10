/**
 * To use images in markdown, add key in markdownImages with the image data and
 * use the added key in markdown.
 * @example markdown
 * Give feedback by clicking ![Feedback icon](feedbackIcon)
 */
export interface ImageData {
    src: string;
    isIcon: boolean;
    color?: string;
    width?: string;
    height?: string;
}
/**
 * src for image is relative url for image location.
 * @example icon
 * [
 *   'feedbackIcon',
 *   {
 *     src: 'Images/review.svg',
 *     isIcon: true,
 *     width: '20px',
 *     height: '20px',
 *     color: 'var(--icon-disabled)',
 *   },
 * ]
 *
 */
export declare const markdownImages: Map<string, ImageData>;
export declare const getMarkdownImage: (key: string) => ImageData;
