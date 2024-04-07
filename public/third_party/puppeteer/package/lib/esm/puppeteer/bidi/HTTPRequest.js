var _a;
import { HTTPRequest, STATUS_TEXTS, handleError, } from '../api/HTTPRequest.js';
import { UnsupportedOperation } from '../common/Errors.js';
import { BidiHTTPResponse } from './HTTPResponse.js';
export const requests = new WeakMap();
/**
 * @internal
 */
export class BidiHTTPRequest extends HTTPRequest {
    static from(bidiRequest, frame) {
        const request = new _a(bidiRequest, frame);
        request.#initialize();
        return request;
    }
    #redirect;
    #response = null;
    id;
    #frame;
    #request;
    constructor(request, frame) {
        super();
        requests.set(request, this);
        this.#request = request;
        this.#frame = frame;
        this.id = request.id;
    }
    get client() {
        throw new UnsupportedOperation();
    }
    #initialize() {
        this.#request.on('redirect', request => {
            this.#redirect = _a.from(request, this.#frame);
        });
        this.#request.once('success', data => {
            this.#response = BidiHTTPResponse.from(data, this);
        });
        this.#frame?.page().trustedEmitter.emit("request" /* PageEvent.Request */, this);
    }
    url() {
        return this.#request.url;
    }
    resourceType() {
        throw new UnsupportedOperation();
    }
    method() {
        return this.#request.method;
    }
    postData() {
        throw new UnsupportedOperation();
    }
    hasPostData() {
        throw new UnsupportedOperation();
    }
    async fetchPostData() {
        throw new UnsupportedOperation();
    }
    headers() {
        const headers = {};
        for (const header of this.#request.headers) {
            headers[header.name.toLowerCase()] = header.value.value;
        }
        return headers;
    }
    response() {
        return this.#response;
    }
    failure() {
        if (this.#request.error === undefined) {
            return null;
        }
        return { errorText: this.#request.error };
    }
    isNavigationRequest() {
        return this.#request.navigation !== undefined;
    }
    initiator() {
        return this.#request.initiator;
    }
    redirectChain() {
        if (this.#redirect === undefined) {
            return [];
        }
        const redirects = [this.#redirect];
        for (const redirect of redirects) {
            if (redirect.#redirect !== undefined) {
                redirects.push(redirect.#redirect);
            }
        }
        return redirects;
    }
    enqueueInterceptAction(pendingHandler) {
        // Execute the handler when interception is not supported
        void pendingHandler();
    }
    frame() {
        return this.#frame ?? null;
    }
    continueRequestOverrides() {
        throw new UnsupportedOperation();
    }
    async continue(overrides = {}) {
        if (!this.#request.isBlocked) {
            throw new Error('Request Interception is not enabled!');
        }
        // Request interception is not supported for data: urls.
        if (this.url().startsWith('data:')) {
            return;
        }
        const headers = getBidiHeaders(overrides.headers);
        return await this.#request
            .continueRequest({
            url: overrides.url,
            method: overrides.method,
            body: overrides.postData
                ? {
                    type: 'base64',
                    value: btoa(overrides.postData),
                }
                : undefined,
            headers: headers.length > 0 ? headers : undefined,
        })
            .catch(error => {
            return handleError(error);
        });
    }
    responseForRequest() {
        throw new UnsupportedOperation();
    }
    abortErrorReason() {
        throw new UnsupportedOperation();
    }
    interceptResolutionState() {
        throw new UnsupportedOperation();
    }
    isInterceptResolutionHandled() {
        throw new UnsupportedOperation();
    }
    finalizeInterceptions() {
        throw new UnsupportedOperation();
    }
    async abort() {
        if (!this.#request.isBlocked) {
            throw new Error('Request Interception is not enabled!');
        }
        // Request interception is not supported for data: urls.
        if (this.url().startsWith('data:')) {
            return;
        }
        return await this.#request.failRequest();
    }
    async respond(response, _priority) {
        if (!this.#request.isBlocked) {
            throw new Error('Request Interception is not enabled!');
        }
        // Request interception is not supported for data: urls.
        if (this.url().startsWith('data:')) {
            return;
        }
        const responseBody = response.body && response.body instanceof Uint8Array
            ? response.body.toString('base64')
            : response.body
                ? btoa(response.body)
                : undefined;
        const headers = getBidiHeaders(response.headers);
        const hasContentLength = headers.some(header => {
            return header.name === 'content-length';
        });
        if (response.contentType) {
            headers.push({
                name: 'content-type',
                value: {
                    type: 'string',
                    value: response.contentType,
                },
            });
        }
        if (responseBody && !hasContentLength) {
            const encoder = new TextEncoder();
            headers.push({
                name: 'content-length',
                value: {
                    type: 'string',
                    value: String(encoder.encode(responseBody).byteLength),
                },
            });
        }
        const status = response.status || 200;
        return await this.#request.provideResponse({
            statusCode: status,
            headers: headers.length > 0 ? headers : undefined,
            reasonPhrase: STATUS_TEXTS[status],
            body: responseBody
                ? {
                    type: 'base64',
                    value: responseBody,
                }
                : undefined,
        });
    }
}
_a = BidiHTTPRequest;
function getBidiHeaders(rawHeaders) {
    const headers = [];
    for (const [name, value] of Object.entries(rawHeaders ?? [])) {
        if (!Object.is(value, undefined)) {
            const values = Array.isArray(value) ? value : [value];
            for (const value of values) {
                headers.push({
                    name: name.toLowerCase(),
                    value: {
                        type: 'string',
                        value: String(value),
                    },
                });
            }
        }
    }
    return headers;
}
//# sourceMappingURL=HTTPRequest.js.map