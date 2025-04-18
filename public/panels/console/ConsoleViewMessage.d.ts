import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Logs from '../../models/logs/logs.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import type { ConsoleViewportElement } from './ConsoleViewport.js';
export declare const getMessageForElement: (element: Element) => ConsoleViewMessage | undefined;
/**
 * Combines the error description (essentially the `Error#stack` property value)
 * with the `issueSummary`.
 *
 * @param description the `description` property of the `Error` remote object.
 * @param issueSummary the optional `issueSummary` of the `exceptionMetaData`.
 * @returns the enriched description.
 * @see https://goo.gle/devtools-reduce-network-noise-design
 */
export declare const concatErrorDescriptionAndIssueSummary: (description: string, issueSummary: string) => string;
export declare class ConsoleViewMessage implements ConsoleViewportElement {
    #private;
    protected message: SDK.ConsoleModel.ConsoleMessage;
    private readonly linkifier;
    private repeatCountInternal;
    private closeGroupDecorationCount;
    private consoleGroupInternal;
    private selectableChildren;
    private readonly messageResized;
    protected elementInternal: HTMLElement | null;
    protected consoleRowWrapper: HTMLElement | null;
    private readonly previewFormatter;
    private searchRegexInternal;
    protected messageIcon: IconButton.Icon.Icon | null;
    private traceExpanded;
    private expandTrace;
    protected anchorElement: HTMLElement | null;
    protected contentElementInternal: HTMLElement | null;
    private nestingLevelMarkers;
    private searchHighlightNodes;
    private searchHighlightNodeChanges;
    private isVisibleInternal;
    private cachedHeight;
    private messagePrefix;
    private timestampElement;
    private inSimilarGroup;
    private similarGroupMarker;
    private lastInSimilarGroup;
    private groupKeyInternal;
    protected repeatCountElement: UI.UIUtils.DevToolsSmallBubble | null;
    private requestResolver;
    private issueResolver;
    constructor(consoleMessage: SDK.ConsoleModel.ConsoleMessage, linkifier: Components.Linkifier.Linkifier, requestResolver: Logs.RequestResolver.RequestResolver, issueResolver: IssuesManager.IssueResolver.IssueResolver, onResize: (arg0: Common.EventTarget.EventTargetEvent<UI.TreeOutline.TreeElement>) => void);
    setInsight(insight: HTMLElement): void;
    element(): HTMLElement;
    wasShown(): void;
    onResize(): void;
    willHide(): void;
    isVisible(): boolean;
    fastHeight(): number;
    approximateFastHeight(): number;
    consoleMessage(): SDK.ConsoleModel.ConsoleMessage;
    formatErrorStackPromiseForTest(): Promise<void>;
    protected buildMessage(): HTMLElement;
    private formatAsNetworkRequest;
    private createAffectedResourceLinks;
    protected buildMessageAnchor(): HTMLElement | null;
    private buildMessageWithStackTrace;
    private buildMessageWithIgnoreLinks;
    private buildMessageHelper;
    private format;
    protected formatParameter(output: SDK.RemoteObject.RemoteObject, forceObjectFormat?: boolean, includePreview?: boolean): HTMLElement;
    private formatParameterAsValue;
    private formatParameterAsTrustedType;
    private formatParameterAsObject;
    private formatParameterAsFunction;
    private formattedParameterAsFunctionForTest;
    private contextMenuEventFired;
    protected renderPropertyPreviewOrAccessor(object: SDK.RemoteObject.RemoteObject | null, property: Protocol.Runtime.PropertyPreview, propertyPath: Array<{
        name: (string | symbol);
    }>): HTMLElement;
    private formatParameterAsNode;
    private formattedParameterAsNodeForTest;
    private formatParameterAsString;
    private formatParameterAsError;
    private formatAsArrayEntry;
    private formatAsAccessorProperty;
    private formatWithSubstitutionString;
    matchesFilterRegex(regexObject: RegExp): boolean;
    matchesFilterText(filter: string): boolean;
    updateTimestamp(): void;
    nestingLevel(): number;
    setConsoleGroup(group: ConsoleGroupViewMessage): void;
    clearConsoleGroup(): void;
    consoleGroup(): ConsoleGroupViewMessage | null;
    setInSimilarGroup(inSimilarGroup: boolean, isLast?: boolean): void;
    isLastInSimilarGroup(): boolean;
    resetCloseGroupDecorationCount(): void;
    incrementCloseGroupDecorationCount(): void;
    private updateCloseGroupDecorations;
    protected focusedChildIndex(): number;
    private onKeyDown;
    maybeHandleOnKeyDown(event: KeyboardEvent): boolean;
    private selectNearestVisibleChild;
    private nearestVisibleChild;
    focusLastChildOrSelf(): void;
    setContentElement(element: HTMLElement): void;
    getContentElement(): HTMLElement | null;
    contentElement(): HTMLElement;
    toMessageElement(): HTMLElement;
    updateMessageElement(): void;
    shouldShowInsights(): boolean;
    getExplainLabel(): string;
    getExplainActionId(): string;
    private shouldRenderAsWarning;
    private updateMessageIcon;
    setAdjacentUserCommandResult(adjacentUserCommandResult: boolean): void;
    repeatCount(): number;
    resetIncrementRepeatCount(): void;
    incrementRepeatCount(): void;
    setRepeatCount(repeatCount: number): void;
    showRepeatCountElement(): void;
    get text(): string;
    toExportString(): string;
    toMessageTextString(): string;
    setSearchRegex(regex: RegExp | null): void;
    searchRegex(): RegExp | null;
    searchCount(): number;
    searchHighlightNode(index: number): Element;
    private getInlineFrames;
    private expandInlineStackFrames;
    private createScriptLocationLinkForSyntaxError;
    private tryFormatAsError;
    private linkifyWithCustomLinkifier;
    private linkifyStringAsFragment;
    private static tokenizeMessageText;
    groupKey(): string;
    groupTitle(): string;
}
export declare class ConsoleGroupViewMessage extends ConsoleViewMessage {
    private collapsedInternal;
    private expandGroupIcon;
    private readonly onToggle;
    private groupEndMessageInternal;
    constructor(consoleMessage: SDK.ConsoleModel.ConsoleMessage, linkifier: Components.Linkifier.Linkifier, requestResolver: Logs.RequestResolver.RequestResolver, issueResolver: IssuesManager.IssueResolver.IssueResolver, onToggle: () => void, onResize: (arg0: Common.EventTarget.EventTargetEvent<UI.TreeOutline.TreeElement>) => void);
    private setCollapsed;
    collapsed(): boolean;
    maybeHandleOnKeyDown(event: KeyboardEvent): boolean;
    toMessageElement(): HTMLElement;
    showRepeatCountElement(): void;
    messagesHidden(): boolean;
    setGroupEnd(viewMessage: ConsoleViewMessage): void;
    groupEnd(): ConsoleViewMessage | null;
}
export declare class ConsoleCommand extends ConsoleViewMessage {
    private formattedCommand;
    constructor(consoleMessage: SDK.ConsoleModel.ConsoleMessage, linkifier: Components.Linkifier.Linkifier, requestResolver: Logs.RequestResolver.RequestResolver, issueResolver: IssuesManager.IssueResolver.IssueResolver, onResize: (arg0: Common.EventTarget.EventTargetEvent<UI.TreeOutline.TreeElement>) => void);
    contentElement(): HTMLElement;
    private updateSearch;
}
export declare class ConsoleCommandResult extends ConsoleViewMessage {
    contentElement(): HTMLElement;
}
export declare class ConsoleTableMessageView extends ConsoleViewMessage {
    private dataGrid;
    constructor(consoleMessage: SDK.ConsoleModel.ConsoleMessage, linkifier: Components.Linkifier.Linkifier, requestResolver: Logs.RequestResolver.RequestResolver, issueResolver: IssuesManager.IssueResolver.IssueResolver, onResize: (arg0: Common.EventTarget.EventTargetEvent<UI.TreeOutline.TreeElement>) => void);
    wasShown(): void;
    onResize(): void;
    contentElement(): HTMLElement;
    private buildTableMessage;
    approximateFastHeight(): number;
}
/**
 * @const
 */
export declare const MaxLengthForLinks = 40;
export declare const getMaxTokenizableStringLength: () => number;
export declare const setMaxTokenizableStringLength: (length: number) => void;
export declare const getLongStringVisibleLength: () => number;
export declare const setLongStringVisibleLength: (length: number) => void;
