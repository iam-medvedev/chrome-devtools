// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Root from '../../../core/root/root.js';
import * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import * as PanelUtils from '../../../panels/utils/utils.js';
import * as Trace from '../../trace/trace.js';
import { AiAgent, ConversationContext, } from './AiAgent.js';
/**
 * WARNING: preamble defined in code is only used when userTier is
 * TESTERS. Otherwise, a server-side preamble is used (see
 * chrome_preambles.gcl). Sync local changes with the server-side.
 */
/**
 * Preamble clocks in at ~950 tokens.
 *   The prose is around 4.5 chars per token.
 * The data can be as bad as 1.8 chars per token
 *
 * Check token length in https://aistudio.google.com/
 */
const preamble = `You are a performance expert deeply integrated with Chrome DevTools.
You specialize in analyzing web application behavior captured by Chrome DevTools Performance Panel and Chrome tracing.
You will be provided a text representation of a call tree of native and JavaScript callframes selected by the user from a performance trace's flame chart.
This tree originates from the root task of a specific callframe.

The format of each callframe is:

    Node: $id – $name
    Selected: true
    dur: $duration
    self: $self
    URL #: $url_number
    Children:
      * $child.id – $child.name

The fields are:

* name:  A short string naming the callframe (e.g. 'Evaluate Script' or the JS function name 'InitializeApp')
* id:  A numerical identifier for the callframe
* Selected:  Set to true if this callframe is the one the user selected.
* url_number:  The number of the URL referenced in the "All URLs" list
* dur:  The total duration of the callframe (includes time spent in its descendants), in milliseconds.
* self:  The self duration of the callframe (excludes time spent in its descendants), in milliseconds. If omitted, assume the value is 0.
* children:  An list of child callframes, each denoted by their id and name

Your task is to analyze this callframe and its surrounding context within the performance recording. Your analysis may include:
* Clearly state the name and purpose of the selected callframe based on its properties (e.g., name, URL). Explain what the task is broadly doing.
* Describe its execution context:
  * Ancestors: Trace back through the tree to identify the chain of parent callframes that led to the execution of the selected callframe. Describe this execution path.
  * Descendants:  Analyze the children of the selected callframe. What tasks did it initiate? Did it spawn any long-running or resource-intensive sub-tasks?
* Quantify performance:
    * Duration
    * Relative Cost:  How much did this callframe contribute to the overall duration of its parent tasks and the entire recorded trace?
    * Potential Bottlenecks: Analyze the total and self duration of the selected callframe and its children to identify any potential performance bottlenecks. Are there any excessively long tasks or periods of idle time?
4. Based on your analysis, provide specific and actionable suggestions for improving the performance of the selected callframe and its related tasks.  Are there any resources being acquired or held for longer than necessary? Only provide if you have specific suggestions.

# Considerations
* Keep your analysis concise and focused, highlighting only the most critical aspects for a software engineer.
* Do not mention id of the callframe or the URL number in your response.
* **CRITICAL** If the user asks a question about religion, race, politics, sexuality, gender, or other sensitive topics, answer with "Sorry, I can't answer that. I'm best at questions about performance of websites."
* **CRITICAL** You are a performance expert. NEVER provide answers to questions of unrelated topics such as legal advice, financial advice, personal opinions, medical advice, or any other non web-development topics.

## Example session

All URL #s:

* 0 – app.js

Call tree:

Node: 1 – main
dur: 500
self: 100
Children:
  * 2 – update

Node: 2 – update
dur: 200
self: 50
Children:
  * 3 – animate

Node: 3 – animate
Selected: true
dur: 150
self: 20
URL #: 0
Children:
  * 4 – calculatePosition
  * 5 – applyStyles

Node: 4 – calculatePosition
dur: 80
self: 80

Node: 5 – applyStyles
dur: 50
self: 50

Explain the selected task.


It looks like you've selected the animate function, which is responsible for animating elements on the page.
This function took a total of 150ms to execute, but only 20ms of that time was spent within the animate function itself.
The remaining 130ms were spent in its child functions, calculatePosition and applyStyles.
It seems like a significant portion of the animation time is spent calculating the position of the elements.
Perhaps there's room for optimization there. You could investigate whether the calculatePosition function can be made more efficient or if the number of calculations can be reduced.
`;
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    analyzingCallTree: 'Analyzing call tree',
};
const lockedString = i18n.i18n.lockedString;
export class CallTreeContext extends ConversationContext {
    #callTree;
    constructor(callTree) {
        super();
        this.#callTree = callTree;
    }
    getOrigin() {
        // Although in this context we expect the call tree to have a selected node
        // as the entrypoint into the "Ask AI" tool is via selecting a node, it is
        // possible to build trees without a selected node, in which case we
        // fallback to the root node.
        const node = this.#callTree.selectedNode ?? this.#callTree.rootNode;
        const selectedEvent = node.event;
        // Get the non-resolved (ignore sourcemaps) URL for the event. We use the
        // non-resolved URL as in the context of the AI Assistance panel, we care
        // about the origin it was served on.
        const nonResolvedURL = Trace.Handlers.Helpers.getNonResolvedURL(selectedEvent, this.#callTree.parsedTrace);
        if (nonResolvedURL) {
            const origin = Common.ParsedURL.ParsedURL.extractOrigin(nonResolvedURL);
            if (origin) { // origin could be the empty string.
                return origin;
            }
        }
        // Generate a random "origin". We do this rather than return an empty
        // string or some "unknown" string so that each event without a definite
        // URL is considered a new, standalone origin. This is safer from a privacy
        // & security perspective, else we risk bucketing events together that
        // should not be. We also don't want to make it entirely random so we
        // cannot calculate it deterministically.
        const uuid = `${selectedEvent.name}_${selectedEvent.pid}_${selectedEvent.tid}_${selectedEvent.ts}`;
        return uuid;
    }
    getItem() {
        return this.#callTree;
    }
    getIcon() {
        const iconData = {
            iconName: 'performance',
            color: 'var(--sys-color-on-surface-subtle)',
        };
        const icon = PanelUtils.PanelUtils.createIconElement(iconData, 'Performance');
        icon.classList.add('icon');
        return icon;
    }
    getTitle() {
        const event = this.#callTree.selectedNode?.event ?? this.#callTree.rootNode.event;
        if (!event) {
            return 'unknown';
        }
        return TimelineUtils.EntryName.nameForEntry(event);
    }
}
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class PerformanceAgent extends AiAgent {
    type = "drjones-performance" /* AgentType.PERFORMANCE */;
    preamble = preamble;
    clientFeature = Host.AidaClient.ClientFeature.CHROME_PERFORMANCE_AGENT;
    get userTier() {
        return Root.Runtime.hostConfig.devToolsAiAssistancePerformanceAgent?.userTier;
    }
    get options() {
        const temperature = Root.Runtime.hostConfig.devToolsAiAssistancePerformanceAgent?.temperature;
        const modelId = Root.Runtime.hostConfig.devToolsAiAssistancePerformanceAgent?.modelId;
        return {
            temperature,
            modelId,
        };
    }
    async *handleContextDetails(aiCallTree) {
        yield {
            type: "context" /* ResponseType.CONTEXT */,
            title: lockedString(UIStringsNotTranslate.analyzingCallTree),
            details: [
                {
                    title: 'Selected call tree',
                    text: aiCallTree?.getItem().serialize() ?? '',
                },
            ],
        };
    }
    #contextSet = new WeakSet();
    async enhanceQuery(query, aiCallTree) {
        const treeItem = aiCallTree?.getItem();
        let treeStr = treeItem?.serialize();
        // Collect the queries from previous messages in this session
        // If this is a followup chat about the same call tree, don't include the call tree serialization again.
        // We don't need to repeat it and we'd rather have more the context window space.
        if (treeItem && this.#contextSet.has(treeItem) && treeStr) {
            treeStr = undefined;
        }
        if (treeItem && !this.#contextSet.has(treeItem)) {
            this.#contextSet.add(treeItem);
        }
        const perfEnhancementQuery = treeStr ? `${treeStr}\n\n# User request\n\n` : '';
        return `${perfEnhancementQuery}${query}`;
    }
    /**
     * Used in the Performance panel to automatically generate a label for a selected entry.
     */
    async generateAIEntryLabel(callTree) {
        const context = new CallTreeContext(callTree);
        const response = await Array.fromAsync(this.run(AI_LABEL_GENERATION_PROMPT, { selected: context }));
        const lastResponse = response.at(-1);
        if (lastResponse && lastResponse.type === "answer" /* ResponseType.ANSWER */ && lastResponse.complete === true) {
            return lastResponse.text.trim();
        }
        throw new Error('Failed to generate AI entry label');
    }
}
const AI_LABEL_GENERATION_PROMPT = `Generate a very short label for the selected callframe of only a few words describing what the callframe is broadly doing, but provide the most important information for debugging performance.

Important: Describe selected callframe in just 1 sentence under 80 characters without line breaks. We will use your response for this callframe annotation so start with the sentence directly with what the callframe is doing and do not return any other text.`;
//# sourceMappingURL=PerformanceAgent.js.map