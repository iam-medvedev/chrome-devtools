// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/request_link_icon/request_link_icon.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const { widget } = UI.Widget;
export const DEFAULT_VIEW = (input, _output, target) => {
    const renderStatus = (isWarning) => html `
    <td class=${isWarning ? 'affected-resource-report-only-status' : 'affected-resource-blocked-status'}>
      ${isWarning ? i18nString(UIStrings.warning) : i18nString(UIStrings.blocked)}
    </td>
  `;
    const renderRequestCell = (request) => {
        // clang-format off
        return html `
      <td class="affected-resource-cell">
        <devtools-request-link-icon .data=${{
            ...request,
            requestResolver: input.requestResolver,
            displayURL: true,
        }}></devtools-request-link-icon>
      </td>
    `;
        // clang-format on
    };
    const renderPreflightCell = (preflight) => preflight ? renderRequestCell(preflight) : html `<td></td>`;
    const renderCodeExampleCell = (text) => html `<td class="code-example">${text}</td>`;
    const renderSourceLocationCell = (location) => {
        if (!location) {
            return html `<td class="affected-source-location"></td>`;
        }
        // clang-format off
        return html `
      <td class="affected-source-location">${widget(Components.Linkifier.ScriptLocationLink, {
            target: location.target ?? undefined,
            scriptId: location.scriptId ?? undefined,
            sourceURL: location.url,
            lineNumber: location.lineNumber,
            options: {
                columnNumber: location.columnNumber,
                maxLength: UI.UIUtils.MaxLengthForDisplayedURLsInConsole,
                jslogContext: 'source-location',
            },
        })}</td>
    `;
        // clang-format on
    };
    const renderSecureContextCell = (isSecureContext) => html `
    <td>${isSecureContext === undefined ? nothing :
        isSecureContext ? i18nString(UIStrings.secure) :
            i18nString(UIStrings.insecure)}</td>
  `;
    const renderExtraHeaderColumns = (issueCode) => {
        switch (issueCode) {
            case "CorsIssue::InvalidHeaders" /* IssuesManager.CorsIssue.IssueCode.INVALID_HEADER_VALUES */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequestIfProblematic)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.header)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.problem)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.invalidValue)}</td>
        `;
            // clang-format on
            case "CorsIssue::WildcardOriginWithCredentials" /* IssuesManager.CorsIssue.IssueCode.WILDCARD_ORIGN_NOT_ALLOWED */:
                return html `<td class="affected-resource-header">${i18nString(UIStrings.preflightRequestIfProblematic)}</td>`;
            case "CorsIssue::PreflightResponseInvalid" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequest)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.problem)}</td>
        `;
            // clang-format on
            case "CorsIssue::OriginMismatch" /* IssuesManager.CorsIssue.IssueCode.ORIGIN_MISMATCH */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequestIfProblematic)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.initiatorContext)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.allowedOrigin)}</td>
        `;
            // clang-format on
            case "CorsIssue::AllowCredentialsRequired" /* IssuesManager.CorsIssue.IssueCode.ALLOW_CREDENTIALS_REQUIRED */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequestIfProblematic)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.allowCredentialsValueFromHeader)}</td>
        `;
            // clang-format on
            case "CorsIssue::InsecureLocalNetwork" /* IssuesManager.CorsIssue.IssueCode.INSECURE_LOCAL_NETWORK */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.resourceAddressSpace)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.initiatorAddressSpace)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.initiatorContext)}</td>
        `;
            // clang-format on
            case "CorsIssue::MethodDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.METHOD_DISALLOWED_BY_PREFLIGHT_RESPONSE */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequest)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.disallowedRequestMethod)}</td>
        `;
            // clang-format on
            case "CorsIssue::HeaderDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.preflightRequest)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.disallowedRequestHeader)}</td>
        `;
            // clang-format on
            case "CorsIssue::DisallowedByMode" /* IssuesManager.CorsIssue.IssueCode.DISALLOWED_BY_MODE */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.initiatorContext)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.sourceLocation)}</td>
        `;
            // clang-format on
            case "CorsIssue::CorsDisabledScheme" /* IssuesManager.CorsIssue.IssueCode.CORS_DISABLED_SCHEME */:
                // clang-format off
                return html `
          <td class="affected-resource-header">${i18nString(UIStrings.initiatorContext)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.sourceLocation)}</td>
          <td class="affected-resource-header">${i18nString(UIStrings.unsupportedScheme)}</td>
        `;
            // clang-format on
            case "CorsIssue::NoCorsRedirectModeNotFollow" /* IssuesManager.CorsIssue.IssueCode.NO_CORS_REDIRECT_MODE_NOT_FOLLOW */:
                return html `<td class="affected-resource-header">${i18nString(UIStrings.sourceLocation)}</td>`;
            case "CorsIssue::RedirectContainsCredentials" /* IssuesManager.CorsIssue.IssueCode.REDIRECT_CONTAINS_CREDENTIALS */:
            case "CorsIssue::PreflightMissingAllowExternal" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_MISSING_ALLOW_EXTERNAL */:
            case "CorsIssue::PreflightInvalidAllowExternal" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_INVALID_ALLOW_EXTERNAL */:
            case "CorsIssue::InvalidLocalNetworkAccess" /* IssuesManager.CorsIssue.IssueCode.INVALID_LOCAL_NETWORK_ACCESS */:
            case "CorsIssue::LocalNetworkAccessPermissionDenied" /* IssuesManager.CorsIssue.IssueCode.LOCAL_NETWORK_ACCESS_PERMISSION_DENIED */:
                return nothing;
            default:
                Platform.assertNever(issueCode, 'Unknown issue code: ' + issueCode);
        }
    };
    const renderRow = (issueCode, row) => {
        switch (issueCode) {
            case "CorsIssue::InvalidHeaders" /* IssuesManager.CorsIssue.IssueCode.INVALID_HEADER_VALUES */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderPreflightCell(row.preflight)}
            ${renderCodeExampleCell(row.header)}
            <td>${row.problem}</td>
            ${renderCodeExampleCell(row.failedParameter)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::WildcardOriginWithCredentials" /* IssuesManager.CorsIssue.IssueCode.WILDCARD_ORIGN_NOT_ALLOWED */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderPreflightCell(row.preflight)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::PreflightResponseInvalid" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderPreflightCell(row.preflight)}
            <td>${row.problem}</td>
          </tr>
        `;
            // clang-format on
            case "CorsIssue::OriginMismatch" /* IssuesManager.CorsIssue.IssueCode.ORIGIN_MISMATCH */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderPreflightCell(row.preflight)}
            ${renderCodeExampleCell(row.initiatorOrigin)}
            ${renderCodeExampleCell(row.failedParameter)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::AllowCredentialsRequired" /* IssuesManager.CorsIssue.IssueCode.ALLOW_CREDENTIALS_REQUIRED */:
            case "CorsIssue::MethodDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.METHOD_DISALLOWED_BY_PREFLIGHT_RESPONSE */:
            case "CorsIssue::HeaderDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderPreflightCell(row.preflight)}
            ${renderCodeExampleCell(row.failedParameter)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::InsecureLocalNetwork" /* IssuesManager.CorsIssue.IssueCode.INSECURE_LOCAL_NETWORK */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            <td>${row.resourceIPAddressSpace}</td>
            <td>${row.initiatorIPAddressSpace}</td>
            ${renderSecureContextCell(row.initiatorIsSecureContext)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::DisallowedByMode" /* IssuesManager.CorsIssue.IssueCode.DISALLOWED_BY_MODE */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderCodeExampleCell(row.initiatorOrigin)}
            ${renderSourceLocationCell(row.sourceLocation)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::CorsDisabledScheme" /* IssuesManager.CorsIssue.IssueCode.CORS_DISABLED_SCHEME */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderCodeExampleCell(row.initiatorOrigin)}
            ${renderSourceLocationCell(row.sourceLocation)}
            ${renderCodeExampleCell(row.failedParameter)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::NoCorsRedirectModeNotFollow" /* IssuesManager.CorsIssue.IssueCode.NO_CORS_REDIRECT_MODE_NOT_FOLLOW */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
            ${renderSourceLocationCell(row.sourceLocation)}
          </tr>
        `;
            // clang-format on
            case "CorsIssue::RedirectContainsCredentials" /* IssuesManager.CorsIssue.IssueCode.REDIRECT_CONTAINS_CREDENTIALS */:
            case "CorsIssue::PreflightMissingAllowExternal" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_MISSING_ALLOW_EXTERNAL */:
            case "CorsIssue::PreflightInvalidAllowExternal" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_INVALID_ALLOW_EXTERNAL */:
            case "CorsIssue::InvalidLocalNetworkAccess" /* IssuesManager.CorsIssue.IssueCode.INVALID_LOCAL_NETWORK_ACCESS */:
            case "CorsIssue::LocalNetworkAccessPermissionDenied" /* IssuesManager.CorsIssue.IssueCode.LOCAL_NETWORK_ACCESS_PERMISSION_DENIED */:
                // clang-format off
                return html `
          <tr class="affected-resource-directive">
            ${renderRequestCell(row.request)}
            ${renderStatus(row.isWarning)}
          </tr>
        `;
            // clang-format on
            default:
                Platform.assertNever(issueCode, 'Unknown issue code: ' + issueCode);
        }
    };
    const issueCode = input.issueCode;
    // clang-format off
    render(issueCode ? html `
    <tr>
      <td class="affected-resource-header">${i18nString(UIStrings.request)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.status)}</td>
      ${renderExtraHeaderColumns(issueCode)}
    </tr>
    ${input.rows.map(row => renderRow(issueCode, row))}
  ` : nothing, target);
    // clang-format on
};
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected requests
     * in the CORS affected resources table.
     */
    nRequests: '{n, plural, =1 {# request} other {# requests}}',
    /**
     * @description Violation status in the Issues panel indicating that a CORS
     * issue produced a warning.
     */
    warning: 'Warning',
    /**
     * @description Violation status in the Issues panel indicating that a CORS
     * request was blocked.
     */
    blocked: 'Blocked',
    /**
     * @description Column header in the Issues panel for request status in the
     * CORS affected resources table.
     */
    status: 'Status',
    /**
     * @description Column header in the Issues panel for network requests in the
     * CORS affected resources table.
     */
    request: 'Request',
    /**
     * @description Column header in the Issues panel for resource addresses in
     * the CORS affected resources table.
     */
    resourceAddressSpace: 'Resource address',
    /**
     * @description Column header in the Issues panel for initiator addresses in
     * the CORS affected resources table.
     */
    initiatorAddressSpace: 'Initiator address',
    /**
     * @description Context status in the Issues panel indicating a secure
     * initiator context.
     */
    secure: 'Secure',
    /**
     * @description Context status in the Issues panel indicating an insecure
     * initiator context.
     */
    insecure: 'Insecure',
    /**
     * @description Column header in the Issues panel for initiator context in the
     * CORS affected resources table.
     */
    initiatorContext: 'Initiator context',
    /**
     * @description Column header in the Issues panel for preflight requests when
     * problematic in the CORS affected resources table.
     */
    preflightRequestIfProblematic: 'Preflight request (if problematic)',
    /**
     * @description Column header in the Issues panel for preflight requests in
     * the CORS affected resources table.
     */
    preflightRequest: 'Preflight request',
    /**
     * @description Column header in the Issues panel for HTTP header names in the
     * CORS affected resources table.
     */
    header: 'Header',
    /**
     * @description Column header in the Issues panel for problem descriptions in
     * the CORS affected resources table.
     */
    problem: 'Problem',
    /**
     * @description Column header in the Issues panel for invalid header values in
     * the CORS affected resources table.
     */
    invalidValue: 'Invalid value (if available)',
    /**
     * @description Problem description in the Issues panel indicating that a
     * required CORS response header was missing.
     */
    problemMissingHeader: 'Missing header',
    /**
     * @description Problem description in the Issues panel indicating that a CORS
     * response header contained multiple values.
     */
    problemMultipleValues: 'Multiple values',
    /**
     * @description Problem description in the Issues panel indicating that a CORS
     * response header contained an invalid value.
     */
    problemInvalidValue: 'Invalid value',
    /**
     * @description Problem description in the Issues panel indicating that the
     * preflight response was a redirect.
     */
    preflightDisallowedRedirect: 'Response to preflight was a redirect',
    /**
     * @description Problem description in the Issues panel indicating that the
     * preflight request HTTP status was not successful.
     */
    preflightInvalidStatus: 'HTTP status of preflight request didn’t indicate success',
    /**
     * @description Column header in the Issues panel for allowed origins in the
     * CORS affected resources table.
     */
    allowedOrigin: 'Allowed origin (from header)',
    /**
     * @description Column header in the Issues panel for the
     * Access-Control-Allow-Credentials header value in the CORS affected
     * resources table.
     */
    allowCredentialsValueFromHeader: '`Access-Control-Allow-Credentials` header value',
    /**
     * @description Column header in the Issues panel for disallowed request
     * methods in the CORS affected resources table.
     */
    disallowedRequestMethod: 'Disallowed request method',
    /**
     * @description Column header in the Issues panel for disallowed request
     * headers in the CORS affected resources table.
     */
    disallowedRequestHeader: 'Disallowed request header',
    /**
     * @description Column header in the Issues panel for source locations in the
     * CORS affected resources table.
     */
    sourceLocation: 'Source location',
    /**
     * @description Column header in the Issues panel for unsupported URL schemes
     * in the CORS affected resources table.
     */
    unsupportedScheme: 'Unsupported scheme',
    /**
     * @description Problem description in the Issues panel indicating that a
     * network request failed.
     */
    failedRequest: 'Failed request',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/CorsIssueDetailsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class CorsIssueDetailsView extends AffectedResourcesView {
    #view;
    #onRequestClick = () => {
        Host.userMetrics.issuesPanelResourceOpened("Cors" /* IssuesManager.Issue.IssueCategory.CORS */, "Request" /* AffectedItem.REQUEST */);
    };
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
        this.affectedResourcesCountElement.classList.add('cors-issue-affected-resource-label');
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nRequests, { n: count });
    }
    #appendDetails(issueCode, issues) {
        const rows = [];
        for (const issue of issues) {
            rows.push(this.#createDetailRow(issueCode, issue));
        }
        const input = { issueCode, rows, requestResolver: this.requestResolver };
        this.#view(input, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
    static #getHeaderFromError(corsError) {
        switch (corsError) {
            case "InvalidAllowHeadersPreflightResponse" /* Protocol.Network.CorsError.InvalidAllowHeadersPreflightResponse */:
                return 'Access-Control-Allow-Headers';
            case "InvalidAllowMethodsPreflightResponse" /* Protocol.Network.CorsError.InvalidAllowMethodsPreflightResponse */:
            case "MethodDisallowedByPreflightResponse" /* Protocol.Network.CorsError.MethodDisallowedByPreflightResponse */:
                return 'Access-Control-Allow-Methods';
            case "PreflightMissingAllowOriginHeader" /* Protocol.Network.CorsError.PreflightMissingAllowOriginHeader */:
            case "PreflightMultipleAllowOriginValues" /* Protocol.Network.CorsError.PreflightMultipleAllowOriginValues */:
            case "PreflightInvalidAllowOriginValue" /* Protocol.Network.CorsError.PreflightInvalidAllowOriginValue */:
            case "MissingAllowOriginHeader" /* Protocol.Network.CorsError.MissingAllowOriginHeader */:
            case "MultipleAllowOriginValues" /* Protocol.Network.CorsError.MultipleAllowOriginValues */:
            case "InvalidAllowOriginValue" /* Protocol.Network.CorsError.InvalidAllowOriginValue */:
            case "WildcardOriginNotAllowed" /* Protocol.Network.CorsError.WildcardOriginNotAllowed */:
            case "PreflightWildcardOriginNotAllowed" /* Protocol.Network.CorsError.PreflightWildcardOriginNotAllowed */:
            case "AllowOriginMismatch" /* Protocol.Network.CorsError.AllowOriginMismatch */:
            case "PreflightAllowOriginMismatch" /* Protocol.Network.CorsError.PreflightAllowOriginMismatch */:
                return 'Access-Control-Allow-Origin';
            case "InvalidAllowCredentials" /* Protocol.Network.CorsError.InvalidAllowCredentials */:
            case "PreflightInvalidAllowCredentials" /* Protocol.Network.CorsError.PreflightInvalidAllowCredentials */:
                return 'Access-Control-Allow-Credentials';
            case "RedirectContainsCredentials" /* Protocol.Network.CorsError.RedirectContainsCredentials */:
            case "PreflightDisallowedRedirect" /* Protocol.Network.CorsError.PreflightDisallowedRedirect */:
                return 'Location';
            case "PreflightInvalidStatus" /* Protocol.Network.CorsError.PreflightInvalidStatus */:
                return 'Status-Code';
        }
        return '';
    }
    static #getProblemFromError(corsErrorStatus) {
        switch (corsErrorStatus.corsError) {
            case "InvalidAllowHeadersPreflightResponse" /* Protocol.Network.CorsError.InvalidAllowHeadersPreflightResponse */:
            case "InvalidAllowMethodsPreflightResponse" /* Protocol.Network.CorsError.InvalidAllowMethodsPreflightResponse */:
            case "PreflightInvalidAllowOriginValue" /* Protocol.Network.CorsError.PreflightInvalidAllowOriginValue */:
            case "InvalidAllowOriginValue" /* Protocol.Network.CorsError.InvalidAllowOriginValue */:
                return i18nString(UIStrings.problemInvalidValue);
            case "PreflightMultipleAllowOriginValues" /* Protocol.Network.CorsError.PreflightMultipleAllowOriginValues */:
            case "MultipleAllowOriginValues" /* Protocol.Network.CorsError.MultipleAllowOriginValues */:
                return i18nString(UIStrings.problemMultipleValues);
            case "MissingAllowOriginHeader" /* Protocol.Network.CorsError.MissingAllowOriginHeader */:
            case "PreflightMissingAllowOriginHeader" /* Protocol.Network.CorsError.PreflightMissingAllowOriginHeader */:
                return i18nString(UIStrings.problemMissingHeader);
            case "PreflightInvalidStatus" /* Protocol.Network.CorsError.PreflightInvalidStatus */:
                return i18nString(UIStrings.preflightInvalidStatus);
            case "PreflightDisallowedRedirect" /* Protocol.Network.CorsError.PreflightDisallowedRedirect */:
                return i18nString(UIStrings.preflightDisallowedRedirect);
            case "InvalidResponse" /* Protocol.Network.CorsError.InvalidResponse */:
                return i18nString(UIStrings.failedRequest);
        }
        throw new Error('Invalid Argument');
    }
    #createDetailRow(issueCode, issue) {
        const details = issue.details();
        const corsErrorStatus = details.corsErrorStatus;
        const corsError = details.corsErrorStatus.corsError;
        const highlightHeader = {
            section: "Response" /* NetworkForward.UIRequestLocation.UIHeaderSection.RESPONSE */,
            name: CorsIssueDetailsView.#getHeaderFromError(corsError),
        };
        const opts = {
            additionalOnClickAction: this.#onRequestClick,
        };
        let request;
        if (issueCode === "CorsIssue::HeaderDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE */) {
            request = {
                affectedRequest: details.request,
                ...opts,
                highlightHeader: {
                    section: "Request" /* NetworkForward.UIRequestLocation.UIHeaderSection.REQUEST */,
                    name: corsErrorStatus.failedParameter,
                },
            };
        }
        else if (issueCode === "CorsIssue::RedirectContainsCredentials" /* IssuesManager.CorsIssue.IssueCode.REDIRECT_CONTAINS_CREDENTIALS */ ||
            issueCode === "CorsIssue::CorsDisabledScheme" /* IssuesManager.CorsIssue.IssueCode.CORS_DISABLED_SCHEME */) {
            request = {
                affectedRequest: details.request,
                ...opts,
                highlightHeader,
            };
        }
        else {
            request = {
                affectedRequest: details.request,
                ...opts,
            };
        }
        let preflight;
        if (issueCode === "CorsIssue::PreflightResponseInvalid" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID */) {
            const specialHighlightHeader = corsError === "PreflightInvalidStatus" /* Protocol.Network.CorsError.PreflightInvalidStatus */ ? {
                section: "General" /* NetworkForward.UIRequestLocation.UIHeaderSection.GENERAL */,
                name: 'Status-Code',
            } :
                highlightHeader;
            preflight = {
                affectedRequest: details.request,
                ...opts,
                linkToPreflight: true,
                highlightHeader: specialHighlightHeader,
            };
        }
        else if (issueCode === "CorsIssue::MethodDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.METHOD_DISALLOWED_BY_PREFLIGHT_RESPONSE */) {
            preflight = { affectedRequest: details.request, ...opts, linkToPreflight: true, highlightHeader };
        }
        else if (issueCode === "CorsIssue::HeaderDisallowedByPreflightResponse" /* IssuesManager.CorsIssue.IssueCode.HEADER_DISALLOWED_BY_PREFLIGHT_RESPONSE */) {
            preflight = {
                affectedRequest: details.request,
                ...opts,
                linkToPreflight: true,
                highlightHeader: {
                    section: "Response" /* NetworkForward.UIRequestLocation.UIHeaderSection.RESPONSE */,
                    name: 'Access-Control-Allow-Headers',
                },
            };
        }
        else if ((issueCode === "CorsIssue::InvalidHeaders" /* IssuesManager.CorsIssue.IssueCode.INVALID_HEADER_VALUES */ ||
            issueCode === "CorsIssue::WildcardOriginWithCredentials" /* IssuesManager.CorsIssue.IssueCode.WILDCARD_ORIGN_NOT_ALLOWED */ ||
            issueCode === "CorsIssue::OriginMismatch" /* IssuesManager.CorsIssue.IssueCode.ORIGIN_MISMATCH */ ||
            issueCode === "CorsIssue::AllowCredentialsRequired" /* IssuesManager.CorsIssue.IssueCode.ALLOW_CREDENTIALS_REQUIRED */) &&
            corsError.includes('Preflight')) {
            preflight = { affectedRequest: details.request, ...opts, linkToPreflight: true, highlightHeader };
        }
        let problem = '';
        if (issueCode === "CorsIssue::InvalidHeaders" /* IssuesManager.CorsIssue.IssueCode.INVALID_HEADER_VALUES */ ||
            issueCode === "CorsIssue::PreflightResponseInvalid" /* IssuesManager.CorsIssue.IssueCode.PREFLIGHT_RESPONSE_INVALID */) {
            problem = CorsIssueDetailsView.#getProblemFromError(details.corsErrorStatus);
        }
        let sourceLocation;
        if ((issueCode === "CorsIssue::DisallowedByMode" /* IssuesManager.CorsIssue.IssueCode.DISALLOWED_BY_MODE */ ||
            issueCode === "CorsIssue::CorsDisabledScheme" /* IssuesManager.CorsIssue.IssueCode.CORS_DISABLED_SCHEME */ ||
            issueCode === "CorsIssue::NoCorsRedirectModeNotFollow" /* IssuesManager.CorsIssue.IssueCode.NO_CORS_REDIRECT_MODE_NOT_FOLLOW */) &&
            details.location) {
            sourceLocation = {
                target: issue.model()?.getTargetIfNotDisposed() || null,
                scriptId: details.location.scriptId || null,
                url: details.location.url,
                lineNumber: details.location.lineNumber,
                columnNumber: details.location.columnNumber,
            };
        }
        return {
            request,
            isWarning: details.isWarning,
            preflight,
            header: CorsIssueDetailsView.#getHeaderFromError(corsError),
            problem,
            failedParameter: details.corsErrorStatus.failedParameter ?? '',
            initiatorOrigin: details.initiatorOrigin ?? '',
            resourceIPAddressSpace: details.resourceIPAddressSpace ?? '',
            initiatorIPAddressSpace: details.clientSecurityState?.initiatorIPAddressSpace ?? '',
            initiatorIsSecureContext: details.clientSecurityState?.initiatorIsSecureContext,
            sourceLocation,
        };
    }
    update() {
        this.requestResolver.clear();
        const issues = this.issue.getCorsIssues();
        const issue = issues.values().next();
        if (issue.done) {
            const input = { rows: [], requestResolver: this.requestResolver };
            this.#view(input, undefined, this.affectedResources);
            this.updateAffectedResourceCount(0);
        }
        else {
            this.#appendDetails(issue.value.code(), issues);
        }
    }
}
//# sourceMappingURL=CorsIssueDetailsView.js.map