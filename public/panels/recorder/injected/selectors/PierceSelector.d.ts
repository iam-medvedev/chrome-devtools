import type { Selector } from './Selector.js';
/**
 * Computes the pierce CSS selector for a node.
 *
 * @internal
 * @param node The node to compute.
 * @returns The computed pierce CSS selector.
 *
 */
export declare const computePierceSelector: (node: Node, attributes?: string[]) => string[] | undefined;
export declare const queryPierceSelectorAll: (selectors: Selector) => Element[];
