import * as Common from '../../core/common/common.js';
import { SuggestBox, type SuggestBoxDelegate, type Suggestion } from './SuggestBox.js';
export declare class TextPrompt extends Common.ObjectWrapper.ObjectWrapper<EventTypes> implements SuggestBoxDelegate {
    private proxyElement;
    private proxyElementDisplay;
    private autocompletionTimeout;
    private titleInternal;
    private queryRange;
    private previousText;
    private currentSuggestion;
    private completionRequestId;
    private ghostTextElement;
    private leftParenthesesIndices;
    private loadCompletions;
    private completionStopCharacters;
    private usesSuggestionBuilder;
    private elementInternal?;
    private boundOnKeyDown?;
    private boundOnInput?;
    private boundOnMouseWheel?;
    private boundClearAutocomplete?;
    private boundOnBlur?;
    private contentElement?;
    private suggestBox?;
    private isEditing?;
    private focusRestorer?;
    private blurListener?;
    private oldTabIndex?;
    private completeTimeout?;
    private disableDefaultSuggestionForEmptyInputInternal?;
    jslogContext: string | undefined;
    constructor();
    initialize(completions: (this: null, expression: string, filter: string, force?: boolean | undefined) => Promise<Suggestion[]>, stopCharacters?: string, usesSuggestionBuilder?: boolean): void;
    setAutocompletionTimeout(timeout: number): void;
    renderAsBlock(): void;
    /**
     * Clients should never attach any event listeners to the |element|. Instead,
     * they should use the result of this method to attach listeners for bubbling events.
     */
    attach(element: Element): Element;
    /**
     * Clients should never attach any event listeners to the |element|. Instead,
     * they should use the result of this method to attach listeners for bubbling events
     * or the |blurListener| parameter to register a "blur" event listener on the |element|
     * (since the "blur" event does not bubble.)
     */
    attachAndStartEditing(element: Element, blurListener: (arg0: Event) => void): Element;
    private attachInternal;
    element(): HTMLElement;
    detach(): void;
    textWithCurrentSuggestion(): string;
    text(): string;
    setText(text: string): void;
    setSelectedRange(startIndex: number, endIndex: number): void;
    focus(): void;
    title(): string;
    setTitle(title: string): void;
    setPlaceholder(placeholder: string, ariaPlaceholder?: string): void;
    setEnabled(enabled: boolean): void;
    private removeFromElement;
    private startEditing;
    private stopEditing;
    onMouseWheel(_event: Event): void;
    onKeyDown(event: KeyboardEvent): void;
    private acceptSuggestionOnStopCharacters;
    onInput(ev: Event): void;
    acceptAutoComplete(): boolean;
    clearAutocomplete(): void;
    private onBlur;
    private refreshGhostText;
    private clearAutocompleteTimeout;
    autoCompleteSoon(force?: boolean): void;
    complete(force?: boolean): Promise<void>;
    disableDefaultSuggestionForEmptyInput(): void;
    private boxForAnchorAtStart;
    additionalCompletions(_query: string): Suggestion[];
    private completionsReady;
    applySuggestion(suggestion: Suggestion | null, isIntermediateSuggestion?: boolean): void;
    acceptSuggestion(): void;
    private acceptSuggestionInternal;
    ownerElement(): Element;
    setDOMSelection(startColumn: number, endColumn: number): void;
    isSuggestBoxVisible(): boolean;
    private isCaretAtEndOfPrompt;
    moveCaretToEndOfPrompt(): void;
    /** -1 if no caret can be found in text prompt
     */
    private getCaretPosition;
    tabKeyPressed(_event: Event): boolean;
    /**
     * Try matching the most recent open parenthesis with the given right
     * parenthesis, and closes the matched left parenthesis if found.
     * Return the result of the matching.
     */
    private tryMatchingLeftParenthesis;
    private updateLeftParenthesesIndices;
    suggestBoxForTest(): SuggestBox | undefined;
}
export declare const enum Events {
    TEXT_CHANGED = "TextChanged"
}
export interface EventTypes {
    [Events.TEXT_CHANGED]: void;
}
