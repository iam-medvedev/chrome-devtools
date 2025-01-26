// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/legacy.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as ProtocolClient from '../../core/protocol_client/protocol_client.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as SourceFrame from '../../ui/legacy/components/source_frame/source_frame.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { JSONEditor } from './JSONEditor.js';
import protocolMonitorStyles from './protocolMonitor.css.js';
const { widgetConfig } = UI.Widget;
const { render, html } = LitHtml;
const UIStrings = {
    /**
     *@description Text for one or a group of functions
     */
    method: 'Method',
    /**
     * @description Text in Protocol Monitor. Title for a table column which shows in which direction
     * the particular protocol message was travelling. Values in this column will either be 'sent' or
     * 'received'.
     */
    type: 'Type',
    /**
     * @description Text in Protocol Monitor of the Protocol Monitor tab. Noun relating to a network request.
     */
    request: 'Request',
    /**
     *@description Title of a cell content in protocol monitor. A Network response refers to the act of acknowledging a
    network request. Should not be confused with answer.
     */
    response: 'Response',
    /**
     *@description Text for timestamps of items
     */
    timestamp: 'Timestamp',
    /**
     *@description Title of a cell content in protocol monitor. It describes the time between sending a request and receiving a response.
     */
    elapsedTime: 'Elapsed time',
    /**
     *@description Text in Protocol Monitor of the Protocol Monitor tab
     */
    target: 'Target',
    /**
     *@description Text to record a series of actions for analysis
     */
    record: 'Record',
    /**
     *@description Text to clear everything
     */
    clearAll: 'Clear all',
    /**
     *@description Text to filter result items
     */
    filter: 'Filter',
    /**
     *@description Text for the documentation of something
     */
    documentation: 'Documentation',
    /**
     *@description Text to open the CDP editor with the selected command
     */
    editAndResend: 'Edit and resend',
    /**
     *@description Cell text content in Protocol Monitor of the Protocol Monitor tab
     *@example {30} PH1
     */
    sMs: '{PH1} ms',
    /**
     *@description Text in Protocol Monitor of the Protocol Monitor tab
     */
    noMessageSelected: 'No message selected',
    /**
     *@description Text in Protocol Monitor for the save button
     */
    save: 'Save',
    /**
     *@description Text in Protocol Monitor to describe the sessions column
     */
    session: 'Session',
    /**
     *@description A placeholder for an input in Protocol Monitor. The input accepts commands that are sent to the backend on Enter. CDP stands for Chrome DevTools Protocol.
     */
    sendRawCDPCommand: 'Send a raw `CDP` command',
    /**
     * @description A tooltip text for the input in the Protocol Monitor panel. The tooltip describes what format is expected.
     */
    sendRawCDPCommandExplanation: 'Format: `\'Domain.commandName\'` for a command without parameters, or `\'{"command":"Domain.commandName", "parameters": {...}}\'` as a JSON object for a command with parameters. `\'cmd\'`/`\'method\'` and `\'args\'`/`\'params\'`/`\'arguments\'` are also supported as alternative keys for the `JSON` object.',
    /**
     * @description A label for a select input that allows selecting a CDP target to send the commands to.
     */
    selectTarget: 'Select a target',
    /**
     * @description Tooltip for the the console sidebar toggle in the Console panel. Command to
     * open/show the sidebar.
     */
    showCDPCommandEditor: 'Show CDP command editor',
    /**
     * @description Tooltip for the the console sidebar toggle in the Console panel. Command to
     * open/show the sidebar.
     */
    hideCDPCommandEditor: 'Hide  CDP command editor',
    /**
     * @description Screen reader announcement when the sidebar is shown in the Console panel.
     */
    CDPCommandEditorShown: 'CDP command editor shown',
    /**
     * @description Screen reader announcement when the sidebar is hidden in the Console panel.
     */
    CDPCommandEditorHidden: 'CDP command editor hidden',
};
const str_ = i18n.i18n.registerUIStrings('panels/protocol_monitor/ProtocolMonitor.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const buildProtocolMetadata = (domains) => {
    const metadataByCommand = new Map();
    for (const domain of domains) {
        for (const command of Object.keys(domain.metadata)) {
            metadataByCommand.set(command, domain.metadata[command]);
        }
    }
    return metadataByCommand;
};
const metadataByCommand = buildProtocolMetadata(ProtocolClient.InspectorBackend.inspectorBackend.agentPrototypes.values());
const typesByName = ProtocolClient.InspectorBackend.inspectorBackend.typeMap;
const enumsByName = ProtocolClient.InspectorBackend.inspectorBackend.enumMap;
export class ProtocolMonitorDataGrid extends Common.ObjectWrapper.eventMixin(UI.Widget.VBox) {
    started;
    startTime;
    messageForId = new Map();
    filterParser;
    suggestionBuilder;
    textFilterUI;
    selector;
    #commandAutocompleteSuggestionProvider = new CommandAutocompleteSuggestionProvider();
    #selectedTargetId;
    #commandInput;
    #showHideSidebarButton;
    #view;
    #messages = [];
    #selectedMessage;
    #filters = [];
    #splitWidget;
    constructor(splitWidget, view = (input, output, target) => {
        // clang-format off
        render(html `<devtools-toolbar class="protocol-monitor-toolbar"
                               jslog=${VisualLogging.toolbar('top')}>
               <devtools-button title=${i18nString(UIStrings.record)}
                                .iconName=${'record-start'}
                                .toggledIconName=${'record-stop'}
                                .jslogContext=${'protocol-monitor.toggle-recording'}
                                .variant=${"icon_toggle" /* Buttons.Button.Variant.ICON_TOGGLE */}
                                .toggleType=${"red-toggle" /* Buttons.Button.ToggleType.RED */}
                                .toggled=${true}
                                @click=${input.onRecord}></devtools-button>
              <devtools-button title=${i18nString(UIStrings.clearAll)}
                               .iconName=${'clear'}
                               .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
                               .jslogContext=${'protocol-monitor.clear-all'}
                               @click=${input.onClear}></devtools-button>
              <devtools-button title=${i18nString(UIStrings.save)}
                               .iconName=${'download'}
                               .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
                               .jslogContext=${'protocol-monitor.save'}
                               @click=${input.onSave}></devtools-button>
              ${input.textFilterUI.element}
            </devtools-toolbar>
            <devtools-split-widget .options=${{
            vertical: true,
            secondIsSidebar: true,
            settingName: 'protocol-monitor-panel-split',
            defaultSidebarWidth: 250
        }}>
              <devtools-new-data-grid
                  slot="main"
                  @select=${input.onSelect}
                  @contextmenu=${input.onContextMenu}
                  .filters=${input.filters}>
                <table>
                    <tr>
                      <th id="type" sortable style="text-align: center" hideable weight="1">${i18nString(UIStrings.type)}</th>
                      <th id="method" weight="5">${i18nString(UIStrings.method)}</th>
                      <th id="request" hideable weight="5">${i18nString(UIStrings.request)}</th>
                      <th id="response" hideable weight="5">${i18nString(UIStrings.response)}</th>
                      <th id="elapsed-time" sortable hideable weight="2">${i18nString(UIStrings.elapsedTime)}</th>
                      <th id="timestamp" sortable hideable weight="5">${i18nString(UIStrings.timestamp)}</th>
                      <th id="target" sortable hideable weight="5">${i18nString(UIStrings.target)}</th>
                      <th id="session" sortable hideable weight="5">${i18nString(UIStrings.session)}</th>
                    </tr>
                    ${input.messages.map((message, index) => html `
                      <tr data-index=${index}
                          style="--override-data-grid-row-background-color: var(--sys-color-surface3)">
                        ${'id' in message ? html `
                          <td title="sent">
                            <devtools-icon name="arrow-up-down" style="color: var(--icon-request-response); width: 16px; height: 16px;">
                            </devtools-icon>
                          </td>` : html `
                          <td title="received">
                            <devtools-icon name="arrow-down" style="color: var(--icon-request); width: 16px; height: 16px;">
                            </devtools-icon>
                          </td>`}
                        <td>${message.method}</td>
                        <td>${message.params ? html `<code>${JSON.stringify(message.params)}</code>` : ''}</td>
                        <td>
                          ${message.result ? html `<code>${JSON.stringify(message.result)}</code>` :
            message.error ? html `<code>${JSON.stringify(message.error)}</code>` :
                '(pending)'}
                        </td>
                        <td data-value=${message.elapsedTime || 0}>
                          ${!('id' in message) ? '' :
            message.elapsedTime ? i18nString(UIStrings.sMs, { PH1: String(message.elapsedTime) })
                : '(pending)'}
                        </td>
                        <td data-value=${message.requestTime}>${i18nString(UIStrings.sMs, { PH1: String(message.requestTime) })}</td>
                        <td>${this.targetToString(message.target)}</td>
                        <td>${message.sessionId || ''}</td>
                      </tr>`)}
                  </table>
              </devtools-new-data-grid>
              <devtools-widget .widgetConfig=${widgetConfig(InfoWidget, {
            request: input.selectedMessage?.params,
            response: input.selectedMessage?.result || input.selectedMessage?.error,
            type: !input.selectedMessage ? undefined :
                ('id' in input?.selectedMessage) ? 'sent'
                    : 'received',
        })}
                  class="protocol-monitor-info"
                  slot="sidebar"></devtools-widget>
            </devtools-split-widget>
            <devtools-toolbar class="protocol-monitor-bottom-toolbar"
               jslog=${VisualLogging.toolbar('bottom')}>
              ${input.showHideSidebarButton.element}
              ${input.commandInput.element}
              ${input.selector.element}
            </devtools-toolbar>`, target, { host: input });
        // clang-format on
    }) {
        super(true);
        this.#splitWidget = splitWidget;
        this.#view = view;
        this.started = false;
        this.startTime = 0;
        this.contentElement.classList.add('protocol-monitor');
        this.selector = this.#createTargetSelector();
        const keys = ['method', 'request', 'response', 'type', 'target', 'session'];
        this.filterParser = new TextUtils.TextUtils.FilterParser(keys);
        this.suggestionBuilder = new UI.FilterSuggestionBuilder.FilterSuggestionBuilder(keys);
        this.textFilterUI = new UI.Toolbar.ToolbarFilter(undefined, 1, .2, '', this.suggestionBuilder.completions.bind(this.suggestionBuilder), true);
        this.textFilterUI.addEventListener("TextChanged" /* UI.Toolbar.ToolbarInput.Event.TEXT_CHANGED */, event => {
            const query = event.data;
            this.#filters = this.filterParser.parse(query);
            this.requestUpdate();
        });
        this.#showHideSidebarButton = splitWidget.createShowHideSidebarButton(i18nString(UIStrings.showCDPCommandEditor), i18nString(UIStrings.hideCDPCommandEditor), i18nString(UIStrings.CDPCommandEditorShown), i18nString(UIStrings.CDPCommandEditorHidden), 'protocol-monitor.toggle-command-editor');
        this.#commandInput = this.#createCommandInput();
        const inputBar = this.#commandInput.element;
        const tabSelector = this.selector.element;
        const populateToolbarInput = () => {
            const editorWidget = splitWidget.sidebarWidget();
            if (!(editorWidget instanceof EditorWidget)) {
                return;
            }
            const commandJson = editorWidget.jsonEditor.getCommandJson();
            const targetId = editorWidget.jsonEditor.targetId;
            if (targetId) {
                const selectedIndex = this.selector.options().findIndex(option => option.value === targetId);
                if (selectedIndex !== -1) {
                    this.selector.setSelectedIndex(selectedIndex);
                    this.#selectedTargetId = targetId;
                }
            }
            if (commandJson) {
                this.#commandInput.setValue(commandJson);
            }
        };
        splitWidget.addEventListener("ShowModeChanged" /* UI.SplitWidget.Events.SHOW_MODE_CHANGED */, (event => {
            if (event.data === 'OnlyMain') {
                populateToolbarInput();
                inputBar?.setAttribute('style', 'display:flex; flex-grow: 1');
                tabSelector?.setAttribute('style', 'display:flex');
            }
            else {
                const { command, parameters } = parseCommandInput(this.#commandInput.value());
                this.dispatchEventToListeners("CommandChange" /* Events.COMMAND_CHANGE */, { command, parameters, targetId: this.#selectedTargetId });
                inputBar?.setAttribute('style', 'display:none');
                tabSelector?.setAttribute('style', 'display:none');
            }
        }));
        this.performUpdate();
    }
    performUpdate() {
        const viewInput = {
            messages: this.#messages,
            selectedMessage: this.#selectedMessage,
            filters: this.#filters,
            onRecord: (e) => {
                this.setRecording(e.target.toggled);
            },
            onClear: () => {
                this.#messages = [];
                this.messageForId.clear();
                this.requestUpdate();
            },
            onSave: () => {
                void this.saveAsFile();
            },
            onSelect: (e) => {
                const index = parseInt(e.detail?.dataset?.index ?? '', 10);
                this.#selectedMessage = index ? this.#messages[index] : undefined;
                this.requestUpdate();
            },
            onContextMenu: (e) => {
                const message = this.#messages[parseInt(e.detail?.element?.dataset?.index || '', 10)];
                if (message) {
                    this.#populateContextMenu(e.detail.menu, message);
                }
            },
            textFilterUI: this.textFilterUI,
            showHideSidebarButton: this.#showHideSidebarButton,
            commandInput: this.#commandInput,
            selector: this.selector,
        };
        const viewOutput = {};
        this.#view(viewInput, viewOutput, this.contentElement);
    }
    #populateContextMenu(menu, message) {
        /**
         * You can click the "Edit and resend" item in the context menu to be
         * taken to the CDP editor with the filled with the selected command.
         */
        menu.editSection().appendItem(i18nString(UIStrings.editAndResend), () => {
            if (!this.#selectedMessage) {
                return;
            }
            const parameters = this.#selectedMessage.params;
            const targetId = this.#selectedMessage.target?.id() || '';
            const command = message.method;
            if (this.#splitWidget.showMode() === "OnlyMain" /* UI.SplitWidget.ShowMode.ONLY_MAIN */) {
                this.#splitWidget.toggleSidebar();
            }
            this.dispatchEventToListeners("CommandChange" /* Events.COMMAND_CHANGE */, { command, parameters, targetId });
        }, { jslogContext: 'edit-and-resend', disabled: !('id' in message) });
        /**
         * You can click the "Filter" item in the context menu to filter the
         * protocol monitor entries to those that match the method of the
         * current row.
         */
        menu.editSection().appendItem(i18nString(UIStrings.filter), () => {
            this.textFilterUI.setValue(`method:${message.method}`, true);
        }, { jslogContext: 'filter' });
        /**
         * You can click the "Documentation" item in the context menu to be
         * taken to the CDP Documentation site entry for the given method.
         */
        menu.footerSection().appendItem(i18nString(UIStrings.documentation), () => {
            const [domain, method] = message.method.split('.');
            const type = 'id' in message ? 'method' : 'event';
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(`https://chromedevtools.github.io/devtools-protocol/tot/${domain}#${type}-${method}`);
        }, { jslogContext: 'documentation' });
    }
    #createCommandInput() {
        const placeholder = i18nString(UIStrings.sendRawCDPCommand);
        const accessiblePlaceholder = placeholder;
        const growFactor = 1;
        const shrinkFactor = 0.2;
        const tooltip = i18nString(UIStrings.sendRawCDPCommandExplanation);
        const input = new UI.Toolbar.ToolbarInput(placeholder, accessiblePlaceholder, growFactor, shrinkFactor, tooltip, this.#commandAutocompleteSuggestionProvider.buildTextPromptCompletions, false, 'command-input');
        input.addEventListener("EnterPressed" /* UI.Toolbar.ToolbarInput.Event.ENTER_PRESSED */, () => {
            this.#commandAutocompleteSuggestionProvider.addEntry(input.value());
            const { command, parameters } = parseCommandInput(input.value());
            this.onCommandSend(command, parameters, this.#selectedTargetId);
        });
        return input;
    }
    #createTargetSelector() {
        const selector = new UI.Toolbar.ToolbarComboBox(() => {
            this.#selectedTargetId = selector.selectedOption()?.value;
        }, i18nString(UIStrings.selectTarget), undefined, 'target-selector');
        selector.setMaxWidth(120);
        const targetManager = SDK.TargetManager.TargetManager.instance();
        const syncTargets = () => {
            selector.removeOptions();
            for (const target of targetManager.targets()) {
                selector.createOption(`${target.name()} (${target.inspectedURL()})`, target.id());
            }
        };
        targetManager.addEventListener("AvailableTargetsChanged" /* SDK.TargetManager.Events.AVAILABLE_TARGETS_CHANGED */, syncTargets);
        syncTargets();
        return selector;
    }
    onCommandSend(command, parameters, target) {
        const test = ProtocolClient.InspectorBackend.test;
        const targetManager = SDK.TargetManager.TargetManager.instance();
        const selectedTarget = target ? targetManager.targetById(target) : null;
        const sessionId = selectedTarget ? selectedTarget.sessionId : '';
        // TS thinks that properties are read-only because
        // in TS test is defined as a namespace.
        // @ts-ignore
        test.sendRawMessage(command, parameters, () => { }, sessionId);
    }
    wasShown() {
        if (this.started) {
            return;
        }
        this.registerCSSFiles([protocolMonitorStyles]);
        this.started = true;
        this.startTime = Date.now();
        this.setRecording(true);
    }
    setRecording(recording) {
        const test = ProtocolClient.InspectorBackend.test;
        if (recording) {
            // TODO: TS thinks that properties are read-only because
            // in TS test is defined as a namespace.
            // @ts-ignore
            test.onMessageSent = this.messageSent.bind(this);
            // @ts-ignore
            test.onMessageReceived = this.messageReceived.bind(this);
        }
        else {
            // @ts-ignore
            test.onMessageSent = null;
            // @ts-ignore
            test.onMessageReceived = null;
        }
    }
    targetToString(target) {
        if (!target) {
            return '';
        }
        return target.decorateLabel(`${target.name()} ${target === SDK.TargetManager.TargetManager.instance().rootTarget() ? '' : target.id()}`);
    }
    messageReceived(message, target) {
        if ('id' in message && message.id) {
            const existingMessage = this.messageForId.get(message.id);
            if (!existingMessage) {
                return;
            }
            existingMessage.result = message.result;
            existingMessage.error = message.error;
            existingMessage.elapsedTime = Date.now() - this.startTime - existingMessage.requestTime;
            // Now we've updated the message, it won't be updated again, so we can delete it from the tracking map.
            this.messageForId.delete(message.id);
            this.requestUpdate();
            return;
        }
        this.#messages.push({
            method: message.method,
            sessionId: message.sessionId,
            target: (target ?? undefined),
            requestTime: Date.now() - this.startTime,
            result: message.params,
        });
        this.requestUpdate();
    }
    messageSent(message, target) {
        const messageRecord = {
            method: message.method,
            params: message.params,
            id: message.id,
            sessionId: message.sessionId,
            target: (target ?? undefined),
            requestTime: Date.now() - this.startTime,
        };
        this.#messages.push(messageRecord);
        this.requestUpdate();
        this.messageForId.set(message.id, messageRecord);
    }
    async saveAsFile() {
        const now = new Date();
        const fileName = 'ProtocolMonitor-' + Platform.DateUtilities.toISO8601Compact(now) + '.json';
        const stream = new Bindings.FileUtils.FileOutputStream();
        const accepted = await stream.open(fileName);
        if (!accepted) {
            return;
        }
        const rowEntries = this.#messages.map(m => ({ ...m, target: m.target?.id() }));
        void stream.write(JSON.stringify(rowEntries, null, '  '));
        void stream.close();
    }
}
export class ProtocolMonitorImpl extends UI.Widget.VBox {
    #split;
    #editorWidget = new EditorWidget();
    #protocolMonitorDataGrid;
    // This width corresponds to the optimal width to use the editor properly
    // It is randomly chosen
    #sideBarMinWidth = 400;
    constructor() {
        super(true);
        this.element.setAttribute('jslog', `${VisualLogging.panel('protocol-monitor').track({ resize: true })}`);
        this.#split =
            new UI.SplitWidget.SplitWidget(true, false, 'protocol-monitor-split-container', this.#sideBarMinWidth);
        this.#split.show(this.contentElement);
        this.#protocolMonitorDataGrid = new ProtocolMonitorDataGrid(this.#split);
        this.#protocolMonitorDataGrid.addEventListener("CommandChange" /* Events.COMMAND_CHANGE */, event => {
            this.#editorWidget.jsonEditor.displayCommand(event.data.command, event.data.parameters, event.data.targetId);
        });
        this.#editorWidget.element.style.overflow = 'hidden';
        this.#split.setMainWidget(this.#protocolMonitorDataGrid);
        this.#split.setSidebarWidget(this.#editorWidget);
        this.#split.hideSidebar(true);
        this.#editorWidget.addEventListener("CommandSent" /* Events.COMMAND_SENT */, event => {
            this.#protocolMonitorDataGrid.onCommandSend(event.data.command, event.data.parameters, event.data.targetId);
        });
    }
}
export class CommandAutocompleteSuggestionProvider {
    #maxHistorySize = 200;
    #commandHistory = new Set();
    constructor(maxHistorySize) {
        if (maxHistorySize !== undefined) {
            this.#maxHistorySize = maxHistorySize;
        }
    }
    buildTextPromptCompletions = async (expression, prefix, force) => {
        if (!prefix && !force && expression) {
            return [];
        }
        const newestToOldest = [...this.#commandHistory].reverse();
        newestToOldest.push(...metadataByCommand.keys());
        return newestToOldest.filter(cmd => cmd.startsWith(prefix)).map(text => ({
            text,
        }));
    };
    addEntry(value) {
        if (this.#commandHistory.has(value)) {
            this.#commandHistory.delete(value);
        }
        this.#commandHistory.add(value);
        if (this.#commandHistory.size > this.#maxHistorySize) {
            const earliestEntry = this.#commandHistory.values().next().value;
            this.#commandHistory.delete(earliestEntry);
        }
    }
}
export class InfoWidget extends UI.Widget.VBox {
    tabbedPane;
    request;
    response;
    type;
    selectedTab;
    constructor(element) {
        super(undefined, undefined, element);
        this.tabbedPane = new UI.TabbedPane.TabbedPane();
        this.tabbedPane.appendTab('request', i18nString(UIStrings.request), new UI.Widget.Widget());
        this.tabbedPane.appendTab('response', i18nString(UIStrings.response), new UI.Widget.Widget());
        this.tabbedPane.show(this.contentElement);
        this.tabbedPane.selectTab('response');
        this.request = {};
    }
    performUpdate() {
        if (!this.request && !this.response) {
            this.tabbedPane.changeTabView('request', new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noMessageSelected), ''));
            this.tabbedPane.changeTabView('response', new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noMessageSelected), ''));
            return;
        }
        const requestEnabled = this.type && this.type === 'sent';
        this.tabbedPane.setTabEnabled('request', Boolean(requestEnabled));
        if (!requestEnabled) {
            this.tabbedPane.selectTab('response');
        }
        this.tabbedPane.changeTabView('request', SourceFrame.JSONView.JSONView.createViewSync(this.request || null));
        this.tabbedPane.changeTabView('response', SourceFrame.JSONView.JSONView.createViewSync(this.response || null));
        if (this.selectedTab) {
            this.tabbedPane.selectTab(this.selectedTab);
        }
    }
}
export class EditorWidget extends Common.ObjectWrapper.eventMixin(UI.Widget.VBox) {
    jsonEditor;
    constructor() {
        super();
        this.element.setAttribute('jslog', `${VisualLogging.pane('command-editor').track({ resize: true })}`);
        this.jsonEditor = new JSONEditor(metadataByCommand, typesByName, enumsByName);
        this.jsonEditor.show(this.element);
        this.jsonEditor.addEventListener("submiteditor" /* JSONEditorEvents.SUBMIT_EDITOR */, ({ data }) => this.dispatchEventToListeners("CommandSent" /* Events.COMMAND_SENT */, data));
    }
}
export function parseCommandInput(input) {
    // If input cannot be parsed as json, we assume it's the command name
    // for a command without parameters. Otherwise, we expect an object
    // with "command"/"method"/"cmd" and "parameters"/"params"/"args"/"arguments" attributes.
    let json = null;
    try {
        json = JSON.parse(input);
    }
    catch {
    }
    const command = json ? json.command || json.method || json.cmd || '' : input;
    const parameters = json?.parameters || json?.params || json?.args || json?.arguments || {};
    return { command, parameters };
}
//# sourceMappingURL=ProtocolMonitor.js.map