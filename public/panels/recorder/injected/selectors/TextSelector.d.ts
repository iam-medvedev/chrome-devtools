import type { Selector } from './Selector.js';
/**
 * Computes the text selector for a node.
 *
 * @internal
 * @param node The node to compute.
 * @returns The computed text selector.
 *
 */
export declare const computeTextSelector: (node: Node) => Selector | undefined;
