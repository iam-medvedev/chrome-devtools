/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import { CSSFormatter } from './CSSFormatter.js';
import { FormattedContentBuilder } from './FormattedContentBuilder.js';
import { HTMLFormatter } from './HTMLFormatter.js';
import { IdentityFormatter } from './IdentityFormatter.js';
import { JavaScriptFormatter } from './JavaScriptFormatter.js';
import { JSONFormatter } from './JSONFormatter.js';
import { substituteExpression } from './Substitute.js';
export function createTokenizer(mimeType) {
    const mode = CodeMirror.getMode({ indentUnit: 2 }, mimeType);
    const state = CodeMirror.startState(mode);
    if (!mode || mode.name === 'null') {
        throw new Error(`Could not find CodeMirror mode for MimeType: ${mimeType}`);
    }
    if (!mode.token) {
        throw new Error(`Could not find CodeMirror mode with token method: ${mimeType}`);
    }
    return (line, callback) => {
        const stream = new CodeMirror.StringStream(line);
        while (!stream.eol()) {
            const style = mode.token(stream, state);
            const value = stream.current();
            if (callback(value, style, stream.start, stream.start + value.length) === AbortTokenization) {
                return;
            }
            stream.start = stream.pos;
        }
    };
}
export const AbortTokenization = {};
export function format(mimeType, text, indentString) {
    // Default to a 4-space indent.
    indentString = indentString || '    ';
    let result;
    const builder = new FormattedContentBuilder(indentString);
    const lineEndings = Platform.StringUtilities.findLineEndingIndexes(text);
    try {
        switch (mimeType) {
            case "text/html" /* FormattableMediaTypes.TEXT_HTML */: {
                const formatter = new HTMLFormatter(builder);
                formatter.format(text, lineEndings);
                break;
            }
            case "text/css" /* FormattableMediaTypes.TEXT_CSS */: {
                const formatter = new CSSFormatter(builder);
                formatter.format(text, lineEndings, 0, text.length);
                break;
            }
            case "application/javascript" /* FormattableMediaTypes.APPLICATION_JAVASCRIPT */:
            case "text/javascript" /* FormattableMediaTypes.TEXT_JAVASCRIPT */: {
                const formatter = new JavaScriptFormatter(builder);
                formatter.format(text, lineEndings, 0, text.length);
                break;
            }
            case "application/json" /* FormattableMediaTypes.APPLICATION_JSON */:
            case "application/manifest+json" /* FormattableMediaTypes.APPLICATION_MANIFEST_JSON */: {
                const formatter = new JSONFormatter(builder);
                formatter.format(text, lineEndings, 0, text.length);
                break;
            }
            default: {
                const formatter = new IdentityFormatter(builder);
                formatter.format(text, lineEndings, 0, text.length);
            }
        }
        result = {
            mapping: builder.mapping,
            content: builder.content(),
        };
    }
    catch (e) {
        console.error(e);
        result = {
            mapping: { original: [0], formatted: [0] },
            content: text,
        };
    }
    return result;
}
(function disableLoggingForTest() {
    if (Root.Runtime.Runtime.queryParam('test')) {
        console.error = () => undefined;
    }
})();
export { substituteExpression };
//# sourceMappingURL=FormatterWorker.js.map