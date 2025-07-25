// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Root from '../../../core/root/root.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as ElementsPanel from '../../../panels/elements/elements.js';
import * as UI from '../../../ui/legacy/legacy.js';
import { html } from '../../../ui/lit/lit.js';
import { ChangeManager } from '../ChangeManager.js';
import { debugLog } from '../debug.js';
import { EvaluateAction, formatError, SideEffectError } from '../EvaluateAction.js';
import { ExtensionScope } from '../ExtensionScope.js';
import { AI_ASSISTANCE_CSS_CLASS_NAME, FREESTYLER_WORLD_NAME } from '../injected.js';
import { AiAgent, ConversationContext, } from './AiAgent.js';
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Title for context details for Freestyler.
     */
    analyzingThePrompt: 'Analyzing the prompt',
    /**
     *@description Heading text for context details of Freestyler agent.
     */
    dataUsed: 'Data used',
};
const lockedString = i18n.i18n.lockedString;
/**
 * WARNING: preamble defined in code is only used when userTier is
 * TESTERS. Otherwise, a server-side preamble is used (see
 * chrome_preambles.gcl). Sync local changes with the server-side.
 */
/* clang-format off */
const preamble = `You are the most advanced CSS debugging assistant integrated into Chrome DevTools.
You always suggest considering the best web development practices and the newest platform features such as view transitions.
The user selected a DOM element in the browser's DevTools and sends a query about the page or the selected DOM element.

# Considerations
* After applying a fix, please ask the user to confirm if the fix worked or not.
* Meticulously investigate all potential causes for the observed behavior before moving on. Gather comprehensive information about the element's parent, siblings, children, and any overlapping elements, paying close attention to properties that are likely relevant to the query.
* Be aware of the different node types (element, text, comment, document fragment, etc.) and their properties. You will always be provided with information about node types of parent, siblings and children of the selected element.
* Avoid making assumptions without sufficient evidence, and always seek further clarification if needed.
* Always explore multiple possible explanations for the observed behavior before settling on a conclusion.
* When presenting solutions, clearly distinguish between the primary cause and contributing factors.
* Please answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.
* When answering, always consider MULTIPLE possible solutions.
* You're also capable of executing the fix for the issue user mentioned. Reflect this in your suggestions.
* Use \`window.getComputedStyle\` to gather **rendered** styles and make sure that you take the distinction between authored styles and computed styles into account.
* **CRITICAL** When answering questions about positioning or layout, ALWAYS inspect \`position\`, \`display\` and ALL related properties.
* **CRITICAL** Call \`window.getComputedStyle\` only once per element and store results into a local variable. Never try to return all the styles of the element in \`data\`. Always use property getter to return relevant styles in \`data\` using the local variable: const styles = window.getComputedStyle($0); const data = { elementColor: styles['color']}.
* **CRITICAL** Never assume a selector for the elements unless you verified your knowledge.
* **CRITICAL** Consider that \`data\` variable from the previous ACTION blocks are not available in a different ACTION block.
* **CRITICAL** If the user asks a question about religion, race, politics, sexuality, gender, or other sensitive topics, answer with "Sorry, I can't answer that. I'm best at questions about debugging web pages."
* **CRITICAL** You are a CSS debugging assistant. NEVER provide answers to questions of unrelated topics such as legal advice, financial advice, personal opinions, medical advice, or any other non web-development topics.

# Instructions
You are going to answer to the query in these steps:
* THOUGHT
* TITLE
* ACTION
* ANSWER
* SUGGESTIONS
Use THOUGHT to explain why you take the ACTION. Use TITLE to provide a short summary of the thought.
Use ACTION to evaluate JavaScript code on the page to gather all the data needed to answer the query and put it inside the data variable - then return STOP.
You have access to a special $0 variable referencing the current element in the scope of the JavaScript code.
OBSERVATION will be the result of running the JS code on the page.
After that, you can answer the question with ANSWER or run another ACTION query.
Please run ACTION again if the information you received is not enough to answer the query.
Please answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.
When answering, remember to consider CSS concepts such as the CSS cascade, explicit and implicit stacking contexts and various CSS layout types.
When answering, always consider MULTIPLE possible solutions.
After the ANSWER, output SUGGESTIONS: string[] for the potential responses the user might give. Make sure that the array and the \`SUGGESTIONS: \` text is in the same line.

If you need to set styles on an HTML element within the ACTION code block, use the \`setElementStyles\` function:

 - You MUST call \`setElementStyles\` to set styles on elements.
 - The \`setElementStyles\` has the following signature \`setElementStyles(element: Element, styles: object): Promise<void>\`. Always await the promise returned by the function and provide arguments matching the signature.
 - The \`setElementStyles\` function is already globally defined. Do NOT attempt to define this function yourself.
 - \`setElementStyles\` is an internal mechanism for your actions on the user's behalf and you MUST never use it in the ANSWER section.

## Example session

QUERY: Why am I not able to see the popup in this case?

THOUGHT: There are a few reasons why a popup might not be visible. It could be related to its positioning, its z-index, its display property, or overlapping elements. Let's gather information about these properties for the popup, its parent, and any potentially overlapping elements.
TITLE: Analyzing popup, container, and overlaps
ACTION
const computedStyles = window.getComputedStyle($0);
const parentComputedStyles = window.getComputedStyle($0.parentElement);
const data = {
  numberOfChildren: $0.children.length,
  numberOfSiblings: $0.parentElement.children.length,
  hasPreviousSibling: !!$0.previousElementSibling,
  hasNextSibling: !!$0.nextElementSibling,
  elementStyles: {
    display: computedStyles['display'],
    visibility: computedStyles['visibility'],
    position: computedStyles['position'],
    clipPath: computedStyles['clip-path'],
    zIndex: computedStyles['z-index']
  },
  parentStyles: {
    display: parentComputedStyles['display'],
    visibility: parentComputedStyles['visibility'],
    position: parentComputedStyles['position'],
    clipPath: parentComputedStyles['clip-path'],
    zIndex: parentComputedStyles['z-index']
  },
  overlappingElements: Array.from(document.querySelectorAll('*'))
    .filter(el => {
      const rect = el.getBoundingClientRect();
      const popupRect = $0.getBoundingClientRect();
      return (
        el !== $0 &&
        rect.left < popupRect.right &&
        rect.right > popupRect.left &&
        rect.top < popupRect.bottom &&
        rect.bottom > popupRect.top
      );
    })
    .map(el => ({
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      zIndex: window.getComputedStyle(el)['z-index']
    }))
};
STOP

OBSERVATION: {"elementStyles":{"display":"block","visibility":"visible","position":"absolute","zIndex":"3","opacity":"1"},"parentStyles":{"display":"block","visibility":"visible","position":"relative","zIndex":"1","opacity":"1"},"overlappingElements":[{"tagName":"HTML","id":"","className":"","zIndex":"auto"},{"tagName":"BODY","id":"","className":"","zIndex":"auto"},{"tagName":"DIV","id":"","className":"container","zIndex":"auto"},{"tagName":"DIV","id":"","className":"background","zIndex":"2"}]}"

ANSWER: Even though the popup itself has a z-index of 3, its parent container has position: relative and z-index: 1. This creates a new stacking context for the popup. Because the "background" div has a z-index of 2, which is higher than the stacking context of the popup, it is rendered on top, obscuring the popup.
SUGGESTIONS: ["What is a stacking context?", "How can I change the stacking order?"]
`;
const promptForScreenshot = `The user has provided you a screenshot of the page (as visible in the viewport) in base64-encoded format. You SHOULD use it while answering user's queries.

* Try to connect the screenshot to actual DOM elements in the page.
`;
const promptForUploadedImage = `The user has uploaded an image in base64-encoded format. You SHOULD use it while answering user's queries.
`;
const considerationsForMultimodalInputEvaluation = `# Considerations for evaluating image:
* Pay close attention to the spatial details as well as the visual appearance of the selected element in the image, particularly in relation to layout, spacing, and styling.
* Analyze the image to identify the layout structure surrounding the element, including the positioning of neighboring elements.
* Extract visual information from the image, such as colors, fonts, spacing, and sizes, that might be relevant to the user's query.
* If the image suggests responsiveness issues (e.g., cropped content, overlapping elements), consider those in your response.
* Consider the surrounding elements and overall layout in the image, but prioritize the selected element's styling and positioning.
* **CRITICAL** When the user provides image input, interpret and use content and information from the image STRICTLY for web site debugging purposes.

* As part of THOUGHT, evaluate the image to gather data that might be needed to answer the question.
In case query is related to the image, ALWAYS first use image evaluation to get all details from the image. ONLY after you have all data needed from image, you should move to other steps.

`;
/* clang-format on */
const MULTIMODAL_ENHANCEMENT_PROMPTS = {
    ["screenshot" /* MultimodalInputType.SCREENSHOT */]: promptForScreenshot + considerationsForMultimodalInputEvaluation,
    ["uploaded-image" /* MultimodalInputType.UPLOADED_IMAGE */]: promptForUploadedImage + considerationsForMultimodalInputEvaluation,
};
async function executeJsCode(functionDeclaration, { throwOnSideEffect, contextNode }) {
    if (!contextNode) {
        throw new Error('Cannot execute JavaScript because of missing context node');
    }
    const target = contextNode.domModel().target() ?? UI.Context.Context.instance().flavor(SDK.Target.Target);
    if (!target) {
        throw new Error('Target is not found for executing code');
    }
    const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
    const frameId = contextNode.frameId() ?? resourceTreeModel?.mainFrame?.id;
    if (!frameId) {
        throw new Error('Main frame is not found for executing code');
    }
    const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
    const pageAgent = target.pageAgent();
    // This returns previously created world if it exists for the frame.
    const { executionContextId } = await pageAgent.invoke_createIsolatedWorld({ frameId, worldName: FREESTYLER_WORLD_NAME });
    const executionContext = runtimeModel?.executionContext(executionContextId);
    if (!executionContext) {
        throw new Error('Execution context is not found for executing code');
    }
    if (executionContext.debuggerModel.selectedCallFrame()) {
        return formatError('Cannot evaluate JavaScript because the execution is paused on a breakpoint.');
    }
    const remoteObject = await contextNode.resolveToObject(undefined, executionContextId);
    if (!remoteObject) {
        throw new Error('Cannot execute JavaScript because remote object cannot be resolved');
    }
    return await EvaluateAction.execute(functionDeclaration, [remoteObject], executionContext, { throwOnSideEffect });
}
const MAX_OBSERVATION_BYTE_LENGTH = 25_000;
const OBSERVATION_TIMEOUT = 5_000;
export class NodeContext extends ConversationContext {
    #node;
    constructor(node) {
        super();
        this.#node = node;
    }
    getOrigin() {
        const ownerDocument = this.#node.ownerDocument;
        if (!ownerDocument) {
            // The node is detached from a document.
            return 'detached';
        }
        return new URL(ownerDocument.documentURL).origin;
    }
    getItem() {
        return this.#node;
    }
    getIcon() {
    }
    getTitle(opts) {
        const hiddenClassList = this.#node.classNames().filter(className => className.startsWith(AI_ASSISTANCE_CSS_CLASS_NAME));
        const { DOMNodeLink } = ElementsPanel.DOMLinkifier;
        const { widgetConfig } = UI.Widget;
        return html `<devtools-widget .widgetConfig=${widgetConfig(DOMNodeLink, { node: this.#node, options: { hiddenClassList, disabled: opts.disabled } })}></devtools-widget>`;
    }
    async getSuggestions() {
        const layoutProps = await this.#node.domModel().cssModel().getLayoutPropertiesFromComputedStyle(this.#node.id);
        if (!layoutProps) {
            return;
        }
        if (layoutProps.isFlex) {
            return [
                { title: 'How can I make flex items wrap?', jslogContext: 'flex-wrap' },
                { title: 'How do I distribute flex items evenly?', jslogContext: 'flex-distribute' },
                { title: 'What is flexbox?', jslogContext: 'flex-what' },
            ];
        }
        if (layoutProps.isSubgrid) {
            return [
                { title: 'Where is this grid defined?', jslogContext: 'subgrid-where' },
                { title: 'How to overwrite parent grid properties?', jslogContext: 'subgrid-override' },
                { title: 'How do subgrids work? ', jslogContext: 'subgrid-how' },
            ];
        }
        if (layoutProps.isGrid) {
            return [
                { title: 'How do I align items in a grid?', jslogContext: 'grid-align' },
                { title: 'How to add spacing between grid items?', jslogContext: 'grid-gap' },
                { title: 'How does grid layout work?', jslogContext: 'grid-how' },
            ];
        }
        if (layoutProps.hasScroll) {
            return [
                { title: 'How do I remove scrollbars for this element?', jslogContext: 'scroll-remove' },
                { title: 'How can I style a scrollbar?', jslogContext: 'scroll-style' },
                { title: 'Why does this element scroll?', jslogContext: 'scroll-why' },
            ];
        }
        if (layoutProps.isContainer) {
            return [
                { title: 'What are container queries?', jslogContext: 'container-what' },
                { title: 'How do I use container-type?', jslogContext: 'container-how' },
                { title: 'What\'s the container context for this element?', jslogContext: 'container-context' },
            ];
        }
        return;
    }
}
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class StylingAgent extends AiAgent {
    functionCallEmulationEnabled = true;
    preamble = preamble;
    clientFeature = Host.AidaClient.ClientFeature.CHROME_STYLING_AGENT;
    get userTier() {
        return Root.Runtime.hostConfig.devToolsFreestyler?.userTier;
    }
    get executionMode() {
        return Root.Runtime.hostConfig.devToolsFreestyler?.executionMode ??
            Root.Runtime.HostConfigFreestylerExecutionMode.ALL_SCRIPTS;
    }
    get options() {
        const temperature = Root.Runtime.hostConfig.devToolsFreestyler?.temperature;
        const modelId = Root.Runtime.hostConfig.devToolsFreestyler?.modelId;
        return {
            temperature,
            modelId,
        };
    }
    get multimodalInputEnabled() {
        return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.multimodal);
    }
    parseTextResponse(text) {
        // We're returning an empty answer to denote the erroneous case.
        if (!text) {
            return { answer: '' };
        }
        const lines = text.split('\n');
        let thought;
        let title;
        let action;
        let answer;
        let suggestions;
        let i = 0;
        // If one of these is present, it means we're going to follow the instruction tags
        // to parse the response. If none of these is present, we'll assume the whole `response`
        // to be the `answer`.
        const isDefiningInstructionStart = (line) => {
            const trimmed = line.trim();
            return trimmed.startsWith('THOUGHT:') || trimmed.startsWith('ACTION') || trimmed.startsWith('ANSWER:');
        };
        const isInstructionStart = (line) => {
            const trimmed = line.trim();
            return isDefiningInstructionStart(line) || trimmed.startsWith('OBSERVATION:') || trimmed.startsWith('TITLE:') ||
                trimmed.startsWith('SUGGESTIONS:');
        };
        // Sometimes agent answers with no "ANSWER: " tag at the start, and also does not
        // include any "defining instructions". Then we use the whole `response` as the answer.
        // However, that case sometimes includes `SUGGESTIONS: ` tag in the response which is then shown to the user.
        // The block below ensures that the response we parse always contains a defining instruction tag.
        const hasDefiningInstruction = lines.some(line => isDefiningInstructionStart(line));
        if (!hasDefiningInstruction) {
            return this.parseTextResponse(`ANSWER: ${text}`);
        }
        while (i < lines.length) {
            const trimmed = lines[i].trim();
            if (trimmed.startsWith('THOUGHT:') && !thought) {
                // Start with the initial `THOUGHT: text` line and move forward by one line.
                const thoughtLines = [trimmed.substring('THOUGHT:'.length).trim()];
                i++;
                // Move until we see a new instruction, otherwise we're still inside the `THOUGHT` block.
                while (i < lines.length && !isInstructionStart(lines[i])) {
                    const trimmedLine = lines[i].trim();
                    if (trimmedLine) {
                        thoughtLines.push(trimmedLine);
                    }
                    i++;
                }
                thought = thoughtLines.join('\n');
            }
            else if (trimmed.startsWith('TITLE:')) {
                title = trimmed.substring('TITLE:'.length).trim();
                i++;
            }
            else if (trimmed.startsWith('ACTION') && !action) {
                const actionLines = [];
                i++;
                while (i < lines.length) {
                    if (lines[i].trim() === 'STOP') {
                        i++;
                        break;
                    }
                    if (isInstructionStart(lines[i])) {
                        break;
                    }
                    // If the LLM responds with a language omit it
                    // as we always expect JS here
                    if (lines[i].trim().startsWith('`````')) {
                        actionLines.push('`````');
                    }
                    // Sometimes the code block is in the form of "`````\njs\n{code}`````"
                    else if (lines[i].trim() !== 'js') {
                        actionLines.push(lines[i]);
                    }
                    i++;
                }
                // Sometimes the LLM puts the STOP response to the last line of the code block.
                // Here, we check whether the last line ends with STOP keyword and if so, remove it
                // from the last line.
                const lastActionLine = actionLines[actionLines.length - 1];
                if (lastActionLine?.endsWith('STOP')) {
                    actionLines[actionLines.length - 1] = lastActionLine.substring(0, lastActionLine.length - 'STOP'.length);
                }
                action = actionLines.join('\n').replaceAll('```', '').replaceAll('``', '').trim();
            }
            else if (trimmed.startsWith('ANSWER:') && !answer) {
                const answerLines = [
                    trimmed.substring('ANSWER:'.length).trim(),
                ];
                let j = i + 1;
                while (j < lines.length) {
                    const line = lines[j].trim();
                    if (isInstructionStart(line)) {
                        break;
                    }
                    answerLines.push(lines[j]);
                    j++;
                }
                answer = answerLines.join('\n').trim();
                i = j;
            }
            else if (trimmed.startsWith('SUGGESTIONS:')) {
                try {
                    // TODO: Do basic validation this is an array with strings
                    suggestions = JSON.parse(trimmed.substring('SUGGESTIONS:'.length).trim());
                }
                catch {
                }
                i++;
            }
            else {
                i++;
            }
        }
        // Sometimes the answer will follow an action and a thought. In
        // that case, we only use the action and the thought (if present)
        // since the answer is not based on the observation resulted from
        // the action.
        if (action) {
            return {
                title,
                thought,
                action,
            };
        }
        // If we have a thought and an answer we want to give priority
        // to the answer as no observation is happening.
        if (thought && !answer) {
            return {
                title,
                thought,
            };
        }
        return {
            // If we could not parse the parts, consider the response to be an
            // answer.
            answer: answer || text,
            suggestions,
        };
    }
    #execJs;
    #changes;
    #createExtensionScope;
    constructor(opts) {
        super({
            aidaClient: opts.aidaClient,
            serverSideLoggingEnabled: opts.serverSideLoggingEnabled,
            confirmSideEffectForTest: opts.confirmSideEffectForTest,
        });
        this.#changes = opts.changeManager || new ChangeManager();
        this.#execJs = opts.execJs ?? executeJsCode;
        this.#createExtensionScope = opts.createExtensionScope ?? ((changes) => {
            return new ExtensionScope(changes, this.id);
        });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
        this.declareFunction('executeJavaScript', {
            description: `This function allows you to run JavaScript code on the inspected page to access the element styles and page content.
Call this function to gather additional information or modify the page state. Call this function enough times to investigate the user request.`,
            parameters: {
                type: 6 /* Host.AidaClient.ParametersTypes.OBJECT */,
                description: '',
                nullable: false,
                properties: {
                    code: {
                        type: 1 /* Host.AidaClient.ParametersTypes.STRING */,
                        description: `JavaScript code snippet to run on the inspected page. Make sure the code is formatted for readability.

# Instructions

* To return data, define a top-level \`data\` variable and populate it with data you want to get. Only JSON-serializable objects can be assigned to \`data\`.
* If you modify styles on an element, ALWAYS call the pre-defined global \`async setElementStyles(el: Element, styles: object)\` function. This function is an internal mechanism for you and should never be presented as a command/advice to the user.
* Use \`window.getComputedStyle\` to gather **computed** styles and make sure that you take the distinction between authored styles and computed styles into account.
* **CRITICAL** Only get styles that might be relevant to the user request.
* **CRITICAL** Call \`window.getComputedStyle\` only once per element and store results into a local variable. Never try to return all the styles of the element in \`data\`.
* **CRITICAL** Never assume a selector for the elements unless you verified your knowledge.
* **CRITICAL** Consider that \`data\` variable from the previous function calls are not available in a new function call.

For example, the code to return basic styles:

\`\`\`
const styles = window.getComputedStyle($0);
const data = {
    display: styles['display'],
    visibility: styles['visibility'],
    position: styles['position'],
    left: styles['right'],
    top: styles['top'],
    width: styles['width'],
    height: styles['height'],
    zIndex: styles['z-index']
};
\`\`\`

For example, the code to change element styles:

\`\`\`
await setElementStyles($0, {
  color: 'blue',
});
\`\`\`

For example, the code to get current and parent styles at once:

\`\`\`
const styles = window.getComputedStyle($0);
const parentStyles = window.getComputedStyle($0.parentElement);
const data = {
    currentElementStyles: {
      display: styles['display'],
      visibility: styles['visibility'],
      position: styles['position'],
      left: styles['right'],
      top: styles['top'],
      width: styles['width'],
      height: styles['height'],
      zIndex: styles['z-index'],
    },
    parentElementStyles: {
      display: parentStyles['display'],
      visibility: parentStyles['visibility'],
      position: parentStyles['position'],
      left: parentStyles['right'],
      top: parentStyles['top'],
      width: parentStyles['width'],
      height: parentStyles['height'],
      zIndex: parentStyles['z-index'],
    },
};
\`\`\`

For example, the code to get check siblings and overlapping elements:

\`\`\`
const computedStyles = window.getComputedStyle($0);
const parentComputedStyles = window.getComputedStyle($0.parentElement);
const data = {
  numberOfChildren: $0.children.length,
  numberOfSiblings: $0.parentElement.children.length,
  hasPreviousSibling: !!$0.previousElementSibling,
  hasNextSibling: !!$0.nextElementSibling,
  elementStyles: {
    display: computedStyles['display'],
    visibility: computedStyles['visibility'],
    position: computedStyles['position'],
    clipPath: computedStyles['clip-path'],
    zIndex: computedStyles['z-index']
  },
  parentStyles: {
    display: parentComputedStyles['display'],
    visibility: parentComputedStyles['visibility'],
    position: parentComputedStyles['position'],
    clipPath: parentComputedStyles['clip-path'],
    zIndex: parentComputedStyles['z-index']
  },
  overlappingElements: Array.from(document.querySelectorAll('*'))
    .filter(el => {
      const rect = el.getBoundingClientRect();
      const popupRect = $0.getBoundingClientRect();
      return (
        el !== $0 &&
        rect.left < popupRect.right &&
        rect.right > popupRect.left &&
        rect.top < popupRect.bottom &&
        rect.bottom > popupRect.top
      );
    })
    .map(el => ({
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      zIndex: window.getComputedStyle(el)['z-index']
    }))
};
\`\`\`
`,
                    },
                    thought: {
                        type: 1 /* Host.AidaClient.ParametersTypes.STRING */,
                        description: 'Explain why you want to run this code',
                    },
                    title: {
                        type: 1 /* Host.AidaClient.ParametersTypes.STRING */,
                        description: 'Provide a summary of what the code does. For example, "Checking related element styles".',
                    },
                },
            },
            displayInfoFromArgs: params => {
                return {
                    title: params.title,
                    thought: params.thought,
                    action: params.code,
                };
            },
            handler: async (params, options) => {
                return await this.executeAction(params.code, options);
            },
        });
    }
    onPrimaryPageChanged() {
        void this.#changes.clear();
    }
    emulateFunctionCall(aidaResponse) {
        const parsed = this.parseTextResponse(aidaResponse.explanation);
        // If parsing detected an answer, it is a streaming text response.
        if ('answer' in parsed) {
            return 'no-function-call';
        }
        // If no answer and the response is streaming, it might be a
        // function call.
        if (!aidaResponse.completed) {
            return 'wait-for-completion';
        }
        // definitely a function call, emulate AIDA's function call.
        return {
            name: 'executeJavaScript',
            args: {
                title: parsed.title,
                thought: parsed.thought,
                code: parsed.action,
            },
        };
    }
    async generateObservation(action, { throwOnSideEffect, }) {
        const functionDeclaration = `async function ($0) {
  try {
    ${action}
    ;
    return ((typeof data !== "undefined") ? data : undefined);
  } catch (error) {
    return error;
  }
}`;
        try {
            const result = await Promise.race([
                this.#execJs(functionDeclaration, { throwOnSideEffect, contextNode: this.context?.getItem() || null }),
                new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Script execution exceeded the maximum allowed time.')), OBSERVATION_TIMEOUT);
                }),
            ]);
            const byteCount = Platform.StringUtilities.countWtf8Bytes(result);
            Host.userMetrics.freestylerEvalResponseSize(byteCount);
            if (byteCount > MAX_OBSERVATION_BYTE_LENGTH) {
                throw new Error('Output exceeded the maximum allowed length.');
            }
            return {
                observation: result,
                sideEffect: false,
                canceled: false,
            };
        }
        catch (error) {
            if (error instanceof SideEffectError) {
                return {
                    observation: error.message,
                    sideEffect: true,
                    canceled: false,
                };
            }
            return {
                observation: `Error: ${error.message}`,
                sideEffect: false,
                canceled: false,
            };
        }
    }
    static async describeElement(element) {
        let output = `* Its selector is \`${element.simpleSelector()}\``;
        const childNodes = await element.getChildNodesPromise();
        if (childNodes) {
            const textChildNodes = childNodes.filter(childNode => childNode.nodeType() === Node.TEXT_NODE);
            const elementChildNodes = childNodes.filter(childNode => childNode.nodeType() === Node.ELEMENT_NODE);
            switch (elementChildNodes.length) {
                case 0:
                    output += '\n* It doesn\'t have any child element nodes';
                    break;
                case 1:
                    output += `\n* It only has 1 child element node: \`${elementChildNodes[0].simpleSelector()}\``;
                    break;
                default:
                    output += `\n* It has ${elementChildNodes.length} child element nodes: ${elementChildNodes.map(node => `\`${node.simpleSelector()}\``).join(', ')}`;
            }
            switch (textChildNodes.length) {
                case 0:
                    output += '\n* It doesn\'t have any child text nodes';
                    break;
                case 1:
                    output += '\n* It only has 1 child text node';
                    break;
                default:
                    output += `\n* It has ${textChildNodes.length} child text nodes`;
            }
        }
        if (element.nextSibling) {
            const elementOrNodeElementNodeText = element.nextSibling.nodeType() === Node.ELEMENT_NODE ? 'an element' : 'a non element';
            output += `\n* It has a next sibling and it is ${elementOrNodeElementNodeText} node`;
        }
        if (element.previousSibling) {
            const elementOrNodeElementNodeText = element.previousSibling.nodeType() === Node.ELEMENT_NODE ? 'an element' : 'a non element';
            output += `\n* It has a previous sibling and it is ${elementOrNodeElementNodeText} node`;
        }
        if (element.isInShadowTree()) {
            output += '\n* It is in a shadow DOM tree.';
        }
        const parentNode = element.parentNode;
        if (parentNode) {
            const parentChildrenNodes = await parentNode.getChildNodesPromise();
            output += `\n* Its parent's selector is \`${parentNode.simpleSelector()}\``;
            const elementOrNodeElementNodeText = parentNode.nodeType() === Node.ELEMENT_NODE ? 'an element' : 'a non element';
            output += `\n* Its parent is ${elementOrNodeElementNodeText} node`;
            if (parentNode.isShadowRoot()) {
                output += '\n* Its parent is a shadow root.';
            }
            if (parentChildrenNodes) {
                const childElementNodes = parentChildrenNodes.filter(siblingNode => siblingNode.nodeType() === Node.ELEMENT_NODE);
                switch (childElementNodes.length) {
                    case 0:
                        break;
                    case 1:
                        output += '\n* Its parent has only 1 child element node';
                        break;
                    default:
                        output += `\n* Its parent has ${childElementNodes.length} child element nodes: ${childElementNodes.map(node => `\`${node.simpleSelector()}\``).join(', ')}`;
                        break;
                }
                const siblingTextNodes = parentChildrenNodes.filter(siblingNode => siblingNode.nodeType() === Node.TEXT_NODE);
                switch (siblingTextNodes.length) {
                    case 0:
                        break;
                    case 1:
                        output += '\n* Its parent has only 1 child text node';
                        break;
                    default:
                        output += `\n* Its parent has ${siblingTextNodes.length} child text nodes: ${siblingTextNodes.map(node => `\`${node.simpleSelector()}\``).join(', ')}`;
                        break;
                }
            }
        }
        return output.trim();
    }
    async executeAction(action, options) {
        debugLog(`Action to execute: ${action}`);
        if (options?.approved === false) {
            return {
                error: 'Error: User denied code execution with side effects.',
            };
        }
        if (this.executionMode === Root.Runtime.HostConfigFreestylerExecutionMode.NO_SCRIPTS) {
            return {
                error: 'Error: JavaScript execution is currently disabled.',
            };
        }
        const selectedNode = UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode);
        const target = selectedNode?.domModel().target() ?? UI.Context.Context.instance().flavor(SDK.Target.Target);
        if (target?.model(SDK.DebuggerModel.DebuggerModel)?.selectedCallFrame()) {
            return {
                error: 'Error: Cannot evaluate JavaScript because the execution is paused on a breakpoint.',
            };
        }
        const scope = this.#createExtensionScope(this.#changes);
        await scope.install();
        try {
            let throwOnSideEffect = true;
            if (options?.approved) {
                throwOnSideEffect = false;
            }
            const result = await this.generateObservation(action, { throwOnSideEffect });
            debugLog(`Action result: ${JSON.stringify(result)}`);
            if (result.sideEffect) {
                if (this.executionMode === Root.Runtime.HostConfigFreestylerExecutionMode.SIDE_EFFECT_FREE_SCRIPTS_ONLY) {
                    return {
                        error: 'Error: JavaScript execution that modifies the page is currently disabled.',
                    };
                }
                if (options?.signal?.aborted) {
                    return {
                        error: 'Error: evaluation has been cancelled',
                    };
                }
                return {
                    requiresApproval: true,
                };
            }
            if (result.canceled) {
                return {
                    error: result.observation,
                };
            }
            return {
                result: result.observation,
            };
        }
        finally {
            await scope.uninstall();
        }
    }
    async *handleContextDetails(selectedElement) {
        if (!selectedElement) {
            return;
        }
        yield {
            type: "context" /* ResponseType.CONTEXT */,
            title: lockedString(UIStringsNotTranslate.analyzingThePrompt),
            details: [{
                    title: lockedString(UIStringsNotTranslate.dataUsed),
                    text: await StylingAgent.describeElement(selectedElement.getItem()),
                }],
        };
    }
    async enhanceQuery(query, selectedElement, multimodalInputType) {
        const elementEnchancementQuery = selectedElement ?
            `# Inspected element\n\n${await StylingAgent.describeElement(selectedElement.getItem())}\n\n# User request\n\n` :
            '';
        const multimodalInputEnhancementQuery = this.multimodalInputEnabled && multimodalInputType ? MULTIMODAL_ENHANCEMENT_PROMPTS[multimodalInputType] : '';
        return `${multimodalInputEnhancementQuery}${elementEnchancementQuery}QUERY: ${query}`;
    }
    formatParsedAnswer({ answer }) {
        return `ANSWER: ${answer}`;
    }
}
/* clang-format off */
const preambleFunctionCalling = `You are the most advanced CSS/DOM/HTML debugging assistant integrated into Chrome DevTools.
You always suggest considering the best web development practices and the newest platform features such as view transitions.
The user selected a DOM element in the browser's DevTools and sends a query about the page or the selected DOM element.
First, examine the provided context, then use the functions to gather additional context and resolve the user request.

# Considerations

* Meticulously investigate all potential causes for the observed behavior before moving on. Gather comprehensive information about the element's parent, siblings, children, and any overlapping elements, paying close attention to properties that are likely relevant to the query.
* Be aware of the different node types (element, text, comment, document fragment, etc.) and their properties. You will always be provided with information about node types of parent, siblings and children of the selected element.
* Avoid making assumptions without sufficient evidence, and always seek further clarification if needed.
* Always explore multiple possible explanations for the observed behavior before settling on a conclusion.
* When presenting solutions, clearly distinguish between the primary cause and contributing factors.
* Please answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.
* When answering, always consider MULTIPLE possible solutions.
* When answering, remember to consider CSS concepts such as the CSS cascade, explicit and implicit stacking contexts and various CSS layout types.
* Use functions available to you to investigate and fulfill the user request.
* After applying a fix, please ask the user to confirm if the fix worked or not.
* ALWAYS OUTPUT a list of follow-up queries at the end of your text response. The format is SUGGESTIONS: ["suggestion1", "suggestion2", "suggestion3"]. Make sure that the array and the \`SUGGESTIONS: \` text is in the same line. You're also capable of executing the fix for the issue user mentioned. Reflect this in your suggestions.
* **CRITICAL** NEVER write full Python programs - you should only write individual statements that invoke a single function from the provided library.
* **CRITICAL** NEVER output text before a function call. Always do a function call first.
* **CRITICAL** When answering questions about positioning or layout, ALWAYS inspect \`position\`, \`display\` and ALL related properties.
* **CRITICAL** You are a CSS/DOM/HTML debugging assistant. NEVER provide answers to questions of unrelated topics such as legal advice, financial advice, personal opinions, medical advice, religion, race, politics, sexuality, gender, or any other non web-development topics. Answer "Sorry, I can't answer that. I'm best at questions about debugging web pages." to such questions.`;
/* clang-format on */
export class StylingAgentWithFunctionCalling extends StylingAgent {
    functionCallEmulationEnabled = false;
    preamble = preambleFunctionCalling;
    formatParsedAnswer({ answer }) {
        return answer;
    }
    preambleFeatures() {
        return ['function_calling'];
    }
    parseTextResponse(text) {
        // We're returning an empty answer to denote the erroneous case.
        if (!text.trim()) {
            return { answer: '' };
        }
        const lines = text.split('\n');
        const answerLines = [];
        let suggestions;
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('SUGGESTIONS:')) {
                try {
                    // TODO: Do basic validation this is an array with strings
                    suggestions = JSON.parse(trimmed.substring('SUGGESTIONS:'.length).trim());
                }
                catch {
                }
            }
            else {
                answerLines.push(line);
            }
        }
        return {
            // If we could not parse the parts, consider the response to be an
            // answer.
            answer: answerLines.join('\n'),
            suggestions,
        };
    }
}
//# sourceMappingURL=StylingAgent.js.map