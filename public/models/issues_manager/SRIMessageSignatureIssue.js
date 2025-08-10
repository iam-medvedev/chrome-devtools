// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { Issue } from './Issue.js';
import { resolveLazyDescription, } from './MarkdownIssueDescription.js';
const UIStrings = {
    /**
     * @description Title for HTTP Message Signatures specification url
     */
    httpMessageSignatures: 'HTTP Message Signatures (RFC9421)',
    /**
     * @description Title for Signature-based Integrity specification url
     */
    signatureBasedIntegrity: 'Signature-based Integrity',
};
const str_ = i18n.i18n.registerUIStrings('models/issues_manager/SRIMessageSignatureIssue.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
function generateGroupingIssueCode(details) {
    const issueCode = `${"SRIMessageSignatureIssue" /* Protocol.Audits.InspectorIssueCode.SRIMessageSignatureIssue */}::${details.error}`;
    if (details.error === "ValidationFailedSignatureMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedSignatureMismatch */) {
        // Signature mismatch errors should be grouped by "signature base".
        return issueCode + details.signatureBase;
    }
    if (details.error === "ValidationFailedIntegrityMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedIntegrityMismatch */) {
        // Integrity mismatch errors should be grouped by integrity assertion.
        return issueCode + details.integrityAssertions.join();
    }
    // Otherwise, simply group by issue type:
    return issueCode;
}
export class SRIMessageSignatureIssue extends Issue {
    #issueDetails;
    constructor(issueDetails, issuesModel) {
        super({
            code: generateGroupingIssueCode(issueDetails),
            umaCode: `${"SRIMessageSignatureIssue" /* Protocol.Audits.InspectorIssueCode.SRIMessageSignatureIssue */}::${issueDetails.error}`,
        }, issuesModel);
        this.#issueDetails = issueDetails;
    }
    details() {
        return this.#issueDetails;
    }
    // Overriding `Issue<String>`:
    primaryKey() {
        return JSON.stringify(this.details());
    }
    getDescription() {
        const description = {
            file: `sri${this.details().error}.md`,
            links: [
                {
                    link: 'https://www.rfc-editor.org/rfc/rfc9421.html',
                    linkTitle: i18nLazyString(UIStrings.httpMessageSignatures),
                },
                {
                    link: 'https://wicg.github.io/signature-based-sri/',
                    linkTitle: i18nLazyString(UIStrings.signatureBasedIntegrity),
                }
            ],
            substitutions: new Map()
        };
        if (this.#issueDetails.error === "ValidationFailedSignatureMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedSignatureMismatch */) {
            description.substitutions?.set('PLACEHOLDER_signatureBase', () => this.#issueDetails.signatureBase);
        }
        if (this.#issueDetails.error === "ValidationFailedIntegrityMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedIntegrityMismatch */) {
            description.substitutions?.set('PLACEHOLDER_integrityAssertions', () => {
                const prefix = '\n* ';
                return prefix + this.details().integrityAssertions.join(prefix);
            });
        }
        return resolveLazyDescription(description);
    }
    getCategory() {
        return "Other" /* IssueCategory.OTHER */;
    }
    getKind() {
        return "PageError" /* IssueKind.PAGE_ERROR */;
    }
    requests() {
        return this.details().request ? [this.details().request] : [];
    }
    static fromInspectorIssue(issuesModel, inspectorIssue) {
        const details = inspectorIssue.details.sriMessageSignatureIssueDetails;
        if (!details) {
            console.warn('SRI Message Signature issue without details received.');
            return [];
        }
        return [new SRIMessageSignatureIssue(details, issuesModel)];
    }
}
//# sourceMappingURL=SRIMessageSignatureIssue.js.map