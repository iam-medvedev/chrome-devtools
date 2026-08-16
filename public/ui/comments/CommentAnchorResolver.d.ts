import type * as CommentManager from '../../models/comment_manager/comment_manager.js';
export type EditorAnchorSignature = CommentManager.CommentManager.EditorAnchorSignature;
export type CommentAnchorSignature = CommentManager.CommentManager.CommentAnchorSignature;
export type CommentThread = CommentManager.CommentManager.CommentThread;
/**
 * Finds the closest ancestor (or the element itself) matching a CSS selector,
 * traversing across Shadow DOM boundaries (shadow root boundaries to shadow hosts).
 *
 * @param element The starting element for traversal.
 * @param selector The CSS selector to match against.
 * @returns The first matching Element or null if none is found.
 */
export declare function closestAcrossShadow(element: Element, selector: string): Element | null;
/**
 * Checks whether an element contains non-empty text content (after trimming whitespace),
 * including text from any nested shadow roots.
 *
 * @param element The element to check.
 * @returns True if the element contains non-empty text; otherwise false.
 */
export declare function isNonEmptyItem(element: Element): boolean;
/**
 * Determines whether an element represents a tab header or tab title
 * (e.g. PanelTabHeader, role="tab", or .tab-header class) across shadow DOM boundaries,
 * which should be excluded from commenting.
 *
 * @param element The element to check.
 * @returns True if the element or any of its ancestors is a tab title; otherwise false.
 */
export declare function isTabTitle(element: Element): boolean;
/**
 * Resolves an arbitrary clicked or targeted DOM element to its appropriate semantic comment anchor element.
 *
 * Traversal hierarchy:
 * 1. Checks if the element is part of a tab title (returns null if so).
 * 2. Escalates CodeMirror line/gutter elements to .cm-editor (only if the clicked line is non-empty).
 * 3. Checks for domain IDs (`data-network-request-id` or `data-backend-node-id`) across shadow boundaries,
 *    returning the owning domain element.
 * 4. Escalates minor controls / sub-elements up to semantic containers (e.g., TableRow, TreeItem).
 * 5. Falls back to the nearest visual logging element if no semantic container is found.
 *
 * @param element The source DOM element to resolve.
 * @returns The resolved semantic anchor Element, or null if unresolvable/empty/excluded.
 */
export declare function resolveCommentAnchorElement(element: Element): Element | null;
/**
 * Extracts the trailing Visual Element type name from a full visual logging path.
 * Used as a fast pre-filter optimization before calculating full ancestor VE paths.
 *
 * @param vePath The full visual logging path string (e.g. "Panel: elements > TreeItem: rule").
 * @returns The trailing VE type name (e.g. "TreeItem").
 */
export declare function extractVeName(vePath: string): string;
/**
 * Checks if an element matches the given visual logging path.
 *
 * @param element The DOM element to test.
 * @param vePath The expected visual logging path.
 * @param targetVeName Optional trailing VE name used as a fast pre-filter optimization to reject
 * non-matching elements without performing an expensive full DOM ancestor traversal in `VisualLogging.getVePath`.
 * @returns True if the element's VE path matches vePath; otherwise false.
 */
export declare function matchesVePath(element: Element, vePath: string, targetVeName?: string): boolean;
/**
 * Computes the 0-indexed position of an element among all elements sharing the same visual logging path
 * in document order across light and shadow DOM trees.
 *
 * @param element The target element.
 * @param vePath The visual logging path to match.
 * @param root The root Document or Element to search within (defaults to element's ownerDocument or document).
 * @returns The 0-based index among VE siblings.
 */
export declare function getSiblingIndex(element: Element, vePath: string, root?: Document | Element): number;
/**
 * Resolves a DOM element to a robust, serializable `CommentAnchorSignature`.
 *
 * The signature captures visual logging paths, text content, sibling index disambiguation,
 * domain IDs (`networkRequestId`, `backendNodeId`), and CodeMirror editor coordinates to allow
 * resilient rematching across DOM re-renders, filtering, and DevTools sessions.
 *
 * @param element The source DOM element to resolve into an anchor signature.
 * @param root Optional root Document or Element to search within for sibling index calculation.
 * @returns The resolved CommentAnchorSignature, or null if unresolvable.
 */
export declare function resolveCommentAnchor(element: Element, root?: Document | Element): CommentAnchorSignature | null;
/**
 * Searches a document or element tree (recursively traversing all Shadow DOM roots)
 * and returns all matching descendant elements up to the specified limit in document order.
 *
 * Note: The root container itself is not matched against selector; only descendants are returned.
 *
 * @param root The root Document or Element to search from.
 * @param selector The CSS selector to match against.
 * @param limit Maximum number of matching elements to return (defaults to Infinity).
 * @returns Array of matching Elements in document order.
 */
export declare function deepQuerySelectorAll(root: Document | Element, selector: string, limit?: number): Element[];
/**
 * Finds the first matching descendant element across light and shadow DOM trees.
 *
 * @param root The root Document or Element to search from.
 * @param selector The CSS selector to match against.
 * @returns The first matching Element or null if none is found.
 */
export declare function deepQuerySelector(root: Document | Element, selector: string): Element | null;
/**
 * Rematches a stored comment thread to its live corresponding DOM element.
 *
 * Matching pipeline:
 * 1. Primary fast-path: Query by domain IDs (`networkRequestId` or `backendNodeId`) across shadow roots.
 * 2. CodeMirror editor line match: Match editor and line number/text, scoped by `filePath` if present.
 * 3. Visual logging path fallback: Find all candidate elements matching `vePath`.
 * 4. Text content refinement: Filter candidates by `textSignature` and `parentTextSignature`.
 * 5. Sibling index disambiguation: Match exact sibling position when multiple candidates exist.
 *
 * @param comment The comment thread containing the anchor signature to rematch.
 * @param root The root Document or Element to search within (defaults to document).
 * @param cachedJslogElements Optional pre-collected list of `[jslog]` elements for performance.
 * @returns The rematched live Element, or null if no match is found.
 */
export declare function rematchCommentAnchor(comment: CommentThread, root?: Document | Element, cachedJslogElements?: Element[]): Element | null;
/**
 * Checks whether an element is connected to the DOM, visible according to `checkVisibility()`,
 * and has non-zero bounding box dimensions.
 *
 * @param element The element to check visibility for.
 * @returns True if the element is connected and rendered with non-zero size; otherwise false.
 */
export declare function isElementVisible(element: Element): boolean;
