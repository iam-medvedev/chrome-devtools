import * as SDK from '../../../../core/sdk/sdk.js';
export type MockPropertyValue = number | string | MockPropertyValue[] | RecursiveObjectDefinition;
export interface RecursiveObjectDefinition {
    [key: string]: MockPropertyValue;
}
/**
 * Creates a mocked `SDK.RemoteObject.RemoteObject` from a plain JavaScript object.
 * Deeply parses nested objects and automatically routes properties wrapped in `[[...]]`
 * to the object's `internalProperties`.
 *
 * Example Usage:
 * ```typescript
 * const target = createTarget(); // from EnvironmentHelpers
 * const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
 * const myRemoteObject = createDeepRemoteObjectMock(runtimeModel, {
 *   id: 123,
 *   name: 'Root Node',
 *   config: {
 *     status: 'active',
 *     count: 10
 *   },
 *   '[[PromiseState]]': 'fulfilled',
 *   '[[Target]]': {
 *     nodeName: 'DIV',
 *     '[[ConnectionId]]': 42
 *   }
 * });
 * ```
 */
export declare function createDeepRemoteObjectMock(runtimeModel: SDK.RuntimeModel.RuntimeModel, definition: MockPropertyValue): SDK.RemoteObject.RemoteObject;
