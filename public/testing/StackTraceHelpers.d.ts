import type * as Protocol from '../generated/protocol.js';
/**
 * Easily create `Protocol.Runtime.CallFrame`s by passing a string of the format: `<url>:<scriptId>:<name>:<line>:<column>`
 */
export declare function protocolCallFrame(descriptor: string): Protocol.Runtime.CallFrame;
