/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
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
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as Adorners from '../components/adorners/adorners.js';
import * as IconButton from '../components/icon_button/icon_button.js';
import { ActionRegistry } from './ActionRegistry.js';
import * as ARIAUtils from './ARIAUtils.js';
import { ContextMenu } from './ContextMenu.js';
import { GlassPane } from './GlassPane.js';
import { bindCheckbox } from './SettingsUI.js';
import { TextPrompt } from './TextPrompt.js';
import toolbarStyles from './toolbar.css.legacy.js';
import { Tooltip } from './Tooltip.js';
import { CheckboxLabel, createShadowRootWithCoreStyles, LongClickController } from './UIUtils.js';
const UIStrings = {
    /**
     *@description Announced screen reader message for ToolbarSettingToggle when the setting is toggled on.
     */
    pressed: 'pressed',
    /**
     *@description Announced screen reader message for ToolbarSettingToggle when the setting is toggled off.
     */
    notPressed: 'not pressed',
    /**
     *@description Tooltip shown when the user hovers over the clear icon to empty the text input.
     */
    clearInput: 'Clear',
    /**
     *@description Placeholder for filter bars that shows before the user types in a filter keyword.
     */
    filter: 'Filter',
};
const str_ = i18n.i18n.registerUIStrings('ui/legacy/Toolbar.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class Toolbar {
    items;
    element;
    enabled;
    shadowRoot;
    contentElement;
    compactLayout = false;
    constructor(className, parentElement) {
        this.items = [];
        this.element = (parentElement ? parentElement.createChild('div') : document.createElement('div'));
        this.element.className = className;
        this.element.classList.add('toolbar');
        this.enabled = true;
        this.shadowRoot = createShadowRootWithCoreStyles(this.element, { cssFile: toolbarStyles, delegatesFocus: undefined });
        this.contentElement = this.shadowRoot.createChild('div', 'toolbar-shadow');
    }
    hasCompactLayout() {
        return this.compactLayout;
    }
    registerCSSFiles(cssFiles) {
        this.shadowRoot.adoptedStyleSheets = this.shadowRoot.adoptedStyleSheets.concat(cssFiles);
    }
    setCompactLayout(enable) {
        if (this.compactLayout === enable) {
            return;
        }
        this.compactLayout = enable;
        for (const item of this.items) {
            item.setCompactLayout(enable);
        }
    }
    static createLongPressActionButton(action, toggledOptions, untoggledOptions) {
        const button = Toolbar.createActionButton(action);
        const mainButtonClone = Toolbar.createActionButton(action);
        let longClickController = null;
        let longClickButtons = null;
        action.addEventListener("Toggled" /* ActionEvents.TOGGLED */, updateOptions);
        updateOptions();
        return button;
        function updateOptions() {
            const buttons = action.toggled() ? (toggledOptions || null) : (untoggledOptions || null);
            if (buttons && buttons.length) {
                if (!longClickController) {
                    longClickController = new LongClickController(button.element, showOptions);
                    button.setLongClickable(true);
                    longClickButtons = buttons;
                }
            }
            else {
                if (longClickController) {
                    longClickController.dispose();
                    longClickController = null;
                    button.setLongClickable(false);
                    longClickButtons = null;
                }
            }
        }
        function showOptions() {
            let buttons = longClickButtons ? longClickButtons.slice() : [];
            buttons.push(mainButtonClone);
            const document = button.element.ownerDocument;
            document.documentElement.addEventListener('mouseup', mouseUp, false);
            const optionsGlassPane = new GlassPane();
            optionsGlassPane.setPointerEventsBehavior("BlockedByGlassPane" /* PointerEventsBehavior.BLOCKED_BY_GLASS_PANE */);
            optionsGlassPane.show(document);
            const optionsBar = new Toolbar('fill', optionsGlassPane.contentElement);
            optionsBar.contentElement.classList.add('floating');
            const buttonHeight = 26;
            const hostButtonPosition = button.element.boxInWindow().relativeToElement(GlassPane.container(document));
            const topNotBottom = hostButtonPosition.y + buttonHeight * buttons.length < document.documentElement.offsetHeight;
            if (topNotBottom) {
                buttons = buttons.reverse();
            }
            optionsBar.element.style.height = (buttonHeight * buttons.length) + 'px';
            if (topNotBottom) {
                optionsBar.element.style.top = (hostButtonPosition.y - 5) + 'px';
            }
            else {
                optionsBar.element.style.top = (hostButtonPosition.y - (buttonHeight * (buttons.length - 1)) - 6) + 'px';
            }
            optionsBar.element.style.left = (hostButtonPosition.x - 5) + 'px';
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].element.addEventListener('mousemove', mouseOver, false);
                buttons[i].element.addEventListener('mouseout', mouseOut, false);
                optionsBar.appendToolbarItem(buttons[i]);
            }
            const hostButtonIndex = topNotBottom ? 0 : buttons.length - 1;
            buttons[hostButtonIndex].element.classList.add('emulate-active');
            function mouseOver(e) {
                if (e.which !== 1) {
                    return;
                }
                if (e.target instanceof HTMLElement) {
                    const buttonElement = e.target.enclosingNodeOrSelfWithClass('toolbar-item');
                    buttonElement.classList.add('emulate-active');
                }
            }
            function mouseOut(e) {
                if (e.which !== 1) {
                    return;
                }
                if (e.target instanceof HTMLElement) {
                    const buttonElement = e.target.enclosingNodeOrSelfWithClass('toolbar-item');
                    buttonElement.classList.remove('emulate-active');
                }
            }
            function mouseUp(e) {
                if (e.which !== 1) {
                    return;
                }
                optionsGlassPane.hide();
                document.documentElement.removeEventListener('mouseup', mouseUp, false);
                for (let i = 0; i < buttons.length; ++i) {
                    if (buttons[i].element.classList.contains('emulate-active')) {
                        buttons[i].element.classList.remove('emulate-active');
                        buttons[i].clicked(e);
                        break;
                    }
                }
            }
        }
    }
    static createActionButton(action, options = TOOLBAR_BUTTON_DEFAULT_OPTIONS) {
        const button = (action.toggleable() && !options?.ignoreToggleable) ? makeToggle() : makeButton();
        if (options.showLabel) {
            button.setText(options.label?.() || action.title());
        }
        let handler = () => {
            void action.execute();
        };
        if (options.userActionCode) {
            const actionCode = options.userActionCode;
            handler = () => {
                Host.userMetrics.actionTaken(actionCode);
                void action.execute();
            };
        }
        button.addEventListener("Click" /* ToolbarButton.Events.CLICK */, handler, action);
        action.addEventListener("Enabled" /* ActionEvents.ENABLED */, enabledChanged);
        button.setEnabled(action.enabled());
        return button;
        function makeButton() {
            const button = new ToolbarButton(action.title(), action.icon(), undefined, action.id());
            if (action.title()) {
                Tooltip.installWithActionBinding(button.element, action.title(), action.id());
            }
            return button;
        }
        function makeToggle() {
            const toggleButton = new ToolbarToggle(action.title(), action.icon(), action.toggledIcon(), action.id());
            if (action.toggleWithRedColor()) {
                toggleButton.enableToggleWithRedColor();
            }
            action.addEventListener("Toggled" /* ActionEvents.TOGGLED */, toggled);
            toggled();
            return toggleButton;
            function toggled() {
                toggleButton.setToggled(action.toggled());
                if (action.title()) {
                    toggleButton.setTitle(action.title());
                    Tooltip.installWithActionBinding(toggleButton.element, action.title(), action.id());
                }
            }
        }
        function enabledChanged(event) {
            button.setEnabled(event.data);
        }
    }
    static createActionButtonForId(actionId, options) {
        const action = ActionRegistry.instance().getAction(actionId);
        return Toolbar.createActionButton(action, options);
    }
    gripElementForResize() {
        return this.contentElement;
    }
    makeWrappable(growVertically) {
        this.contentElement.classList.add('wrappable');
        if (growVertically) {
            this.contentElement.classList.add('toolbar-grow-vertical');
        }
    }
    makeVertical() {
        this.contentElement.classList.add('vertical');
    }
    renderAsLinks() {
        this.contentElement.classList.add('toolbar-render-as-links');
    }
    empty() {
        return !this.items.length;
    }
    setEnabled(enabled) {
        this.enabled = enabled;
        for (const item of this.items) {
            item.applyEnabledState(this.enabled && item.enabled);
        }
    }
    appendToolbarItem(item) {
        this.items.push(item);
        item.toolbar = this;
        item.setCompactLayout(this.hasCompactLayout());
        if (!this.enabled) {
            item.applyEnabledState(false);
        }
        this.contentElement.appendChild(item.element);
        this.hideSeparatorDupes();
    }
    hasItem(item) {
        return this.items.includes(item);
    }
    prependToolbarItem(item) {
        this.items.unshift(item);
        item.toolbar = this;
        item.setCompactLayout(this.hasCompactLayout());
        if (!this.enabled) {
            item.applyEnabledState(false);
        }
        this.contentElement.prepend(item.element);
        this.hideSeparatorDupes();
    }
    appendSeparator() {
        this.appendToolbarItem(new ToolbarSeparator());
    }
    appendSpacer() {
        this.appendToolbarItem(new ToolbarSeparator(true));
    }
    appendText(text) {
        this.appendToolbarItem(new ToolbarText(text));
    }
    removeToolbarItem(itemToRemove) {
        const updatedItems = [];
        for (const item of this.items) {
            if (item === itemToRemove) {
                item.element.remove();
            }
            else {
                updatedItems.push(item);
            }
        }
        this.items = updatedItems;
    }
    removeToolbarItems() {
        for (const item of this.items) {
            item.toolbar = null;
        }
        this.items = [];
        this.contentElement.removeChildren();
    }
    setColor(color) {
        const style = document.createElement('style');
        style.textContent = '.toolbar-glyph { background-color: ' + color + ' !important }';
        this.shadowRoot.appendChild(style);
    }
    setToggledColor(color) {
        const style = document.createElement('style');
        style.textContent =
            '.toolbar-button.toolbar-state-on .toolbar-glyph { background-color: ' + color + ' !important }';
        this.shadowRoot.appendChild(style);
    }
    hideSeparatorDupes() {
        if (!this.items.length) {
            return;
        }
        // Don't hide first and last separators if they were added explicitly.
        let previousIsSeparator = false;
        let lastSeparator;
        let nonSeparatorVisible = false;
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i] instanceof ToolbarSeparator) {
                this.items[i].setVisible(!previousIsSeparator);
                previousIsSeparator = true;
                lastSeparator = this.items[i];
                continue;
            }
            if (this.items[i].visible()) {
                previousIsSeparator = false;
                lastSeparator = null;
                nonSeparatorVisible = true;
            }
        }
        if (lastSeparator && lastSeparator !== this.items[this.items.length - 1]) {
            lastSeparator.setVisible(false);
        }
        this.element.classList.toggle('hidden', lastSeparator !== null && lastSeparator !== undefined && lastSeparator.visible() && !nonSeparatorVisible);
    }
    async appendItemsAtLocation(location) {
        const extensions = getRegisteredToolbarItems();
        extensions.sort((extension1, extension2) => {
            const order1 = extension1.order || 0;
            const order2 = extension2.order || 0;
            return order1 - order2;
        });
        const filtered = extensions.filter(e => e.location === location);
        const items = await Promise.all(filtered.map(extension => {
            const { separator, actionId, showLabel, label, loadItem } = extension;
            if (separator) {
                return new ToolbarSeparator();
            }
            if (actionId) {
                return Toolbar.createActionButtonForId(actionId, { label, showLabel: Boolean(showLabel), userActionCode: undefined });
            }
            // TODO(crbug.com/1134103) constratint the case checked with this if using TS type definitions once UI is TS-authored.
            if (!loadItem) {
                throw new Error('Could not load a toolbar item registration with no loadItem function');
            }
            return loadItem().then(p => p.item());
        }));
        for (const item of items) {
            if (item) {
                this.appendToolbarItem(item);
            }
        }
    }
}
const TOOLBAR_BUTTON_DEFAULT_OPTIONS = {
    showLabel: false,
    userActionCode: undefined,
};
// We need any here because Common.ObjectWrapper.ObjectWrapper is invariant in T.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ToolbarItem extends Common.ObjectWrapper.ObjectWrapper {
    element;
    visibleInternal;
    enabled;
    toolbar;
    title;
    constructor(element) {
        super();
        this.element = element;
        this.element.classList.add('toolbar-item');
        this.visibleInternal = true;
        this.enabled = true;
        /**
         * Set by the parent toolbar during appending.
         */
        this.toolbar = null;
    }
    setTitle(title, actionId = undefined) {
        if (this.title === title) {
            return;
        }
        this.title = title;
        ARIAUtils.setLabel(this.element, title);
        if (actionId === undefined) {
            Tooltip.install(this.element, title);
        }
        else {
            Tooltip.installWithActionBinding(this.element, title, actionId);
        }
    }
    setEnabled(value) {
        if (this.enabled === value) {
            return;
        }
        this.enabled = value;
        this.applyEnabledState(this.enabled && (!this.toolbar || this.toolbar.enabled));
    }
    applyEnabledState(enabled) {
        // @ts-ignore: Ignoring in favor of an `instanceof` check for all the different
        //             kind of HTMLElement classes that have a disabled attribute.
        this.element.disabled = !enabled;
    }
    visible() {
        return this.visibleInternal;
    }
    setVisible(x) {
        if (this.visibleInternal === x) {
            return;
        }
        this.element.classList.toggle('hidden', !x);
        this.visibleInternal = x;
        if (this.toolbar && !(this instanceof ToolbarSeparator)) {
            this.toolbar.hideSeparatorDupes();
        }
    }
    setRightAligned(alignRight) {
        this.element.classList.toggle('toolbar-item-right-aligned', alignRight);
    }
    setCompactLayout(_enable) {
    }
}
export class ToolbarItemWithCompactLayout extends ToolbarItem {
    constructor(element) {
        super(element);
    }
    setCompactLayout(enable) {
        this.dispatchEventToListeners("CompactLayoutUpdated" /* ToolbarItemWithCompactLayoutEvents.COMPACT_LAYOUT_UPDATED */, enable);
    }
}
export class ToolbarText extends ToolbarItem {
    constructor(text) {
        const element = document.createElement('div');
        element.classList.add('toolbar-text');
        super(element);
        this.element.classList.add('toolbar-text');
        this.setText(text || '');
    }
    text() {
        return this.element.textContent || '';
    }
    setText(text) {
        this.element.textContent = text;
    }
}
export class ToolbarButton extends ToolbarItem {
    button;
    text;
    adorner;
    constructor(title, glyphOrAdorner, text, jslogContext) {
        const button = new Buttons.Button.Button();
        super(button);
        this.button = button;
        if (glyphOrAdorner instanceof Adorners.Adorner.Adorner) {
            this.button.variant = "adorner_icon" /* Buttons.Button.Variant.ADORNER_ICON */;
            this.setAdorner(glyphOrAdorner);
            this.button.prepend(glyphOrAdorner);
        }
        else if (typeof glyphOrAdorner === 'string' && !text) {
            this.button.data = { variant: "icon" /* Buttons.Button.Variant.ICON */, iconName: glyphOrAdorner };
        }
        else {
            this.button.variant = "text" /* Buttons.Button.Variant.TEXT */;
            this.button.reducedFocusRing = true;
            if (glyphOrAdorner) {
                this.button.iconName = glyphOrAdorner;
            }
        }
        button.classList.add('toolbar-button');
        this.element.addEventListener('click', this.clicked.bind(this), false);
        this.element.addEventListener('mousedown', this.mouseDown.bind(this), false);
        button.textContent = text || '';
        this.setTitle(title);
        if (jslogContext) {
            button.jslogContext = jslogContext;
        }
    }
    focus() {
        this.element.focus();
    }
    checked(checked) {
        this.button.checked = checked;
    }
    toggleOnClick(toggleOnClick) {
        this.button.toggleOnClick = toggleOnClick;
    }
    isToggled() {
        return this.button.toggled;
    }
    toggled(toggled) {
        this.button.toggled = toggled;
    }
    setToggleType(type) {
        this.button.toggleType = type;
    }
    setLongClickable(longClickable) {
        this.button.longClickable = longClickable;
    }
    setSize(size) {
        this.button.size = size;
    }
    setReducedFocusRing() {
        this.button.reducedFocusRing = true;
    }
    setText(text) {
        if (this.text === text) {
            return;
        }
        this.button.textContent = text;
        this.button.variant = "text" /* Buttons.Button.Variant.TEXT */;
        this.button.reducedFocusRing = true;
        this.text = text;
    }
    setAdorner(adorner) {
        if (this.adorner) {
            this.adorner.replaceWith(adorner);
        }
        else {
            this.element.prepend(adorner);
        }
        this.adorner = adorner;
    }
    setGlyph(iconName) {
        this.button.iconName = iconName;
    }
    setToggledIcon(toggledIconName) {
        this.button.variant = "icon_toggle" /* Buttons.Button.Variant.ICON_TOGGLE */;
        this.button.toggledIconName = toggledIconName;
    }
    setBackgroundImage(iconURL) {
        this.element.style.backgroundImage = 'url(' + iconURL + ')';
    }
    setSecondary() {
        this.element.classList.add('toolbar-button-secondary');
    }
    setDarkText() {
        this.element.classList.add('dark-text');
    }
    turnIntoSelect(shrinkable = false) {
        this.element.classList.add('toolbar-has-dropdown');
        if (shrinkable) {
            this.element.classList.add('toolbar-has-dropdown-shrinkable');
        }
        const dropdownArrowIcon = IconButton.Icon.create('triangle-down', 'toolbar-dropdown-arrow');
        this.element.appendChild(dropdownArrowIcon);
    }
    clicked(event) {
        if (!this.enabled) {
            return;
        }
        this.dispatchEventToListeners("Click" /* ToolbarButton.Events.CLICK */, event);
        event.consume();
    }
    mouseDown(event) {
        if (!this.enabled) {
            return;
        }
        this.dispatchEventToListeners("MouseDown" /* ToolbarButton.Events.MOUSE_DOWN */, event);
    }
}
export class ToolbarCombobox extends ToolbarItem {
    textElement;
    text;
    iconName;
    adorner;
    constructor(title, isIconDropdown, jslogContext, iconName) {
        let element;
        if (iconName) {
            element = new Buttons.Button.Button();
            element.data = { variant: "icon" /* Buttons.Button.Variant.ICON */, iconName };
        }
        else {
            element = document.createElement('button');
        }
        element.classList.add('toolbar-button');
        super(element);
        this.element.addEventListener('click', this.clicked.bind(this), false);
        this.element.addEventListener('mousedown', this.mouseDown.bind(this), false);
        this.iconName = iconName;
        this.setTitle(title);
        if (jslogContext) {
            this.element.setAttribute('jslog', `${VisualLogging.action().track({ click: true }).context(jslogContext)}`);
        }
        this.title = '';
        if (!isIconDropdown) {
            this.element.classList.add('toolbar-has-dropdown');
            const dropdownArrowIcon = IconButton.Icon.create('triangle-down', 'toolbar-dropdown-arrow');
            this.element.appendChild(dropdownArrowIcon);
        }
    }
    setText(text) {
        if (this.text === text || this.iconName) {
            return;
        }
        if (!this.textElement) {
            this.textElement = document.createElement('div');
            this.textElement.classList.add('toolbar-text', 'hidden');
            const dropDownArrow = this.element.querySelector('.toolbar-dropdown-arrow');
            this.element.insertBefore(this.textElement, dropDownArrow);
        }
        this.textElement.textContent = text;
        this.textElement.classList.toggle('hidden', !text);
        this.text = text;
    }
    setAdorner(adorner) {
        if (this.iconName) {
            return;
        }
        if (!this.adorner) {
            this.adorner = adorner;
        }
        else {
            adorner.replaceWith(adorner);
            if (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        this.element.prepend(adorner);
    }
    setDarkText() {
        this.element.classList.add('dark-text');
    }
    turnShrinkable() {
        this.element.classList.add('toolbar-has-dropdown-shrinkable');
    }
    clicked(event) {
        if (!this.enabled) {
            return;
        }
        this.dispatchEventToListeners("Click" /* ToolbarButton.Events.CLICK */, event);
        event.consume();
    }
    mouseDown(event) {
        if (!this.enabled) {
            return;
        }
        this.dispatchEventToListeners("MouseDown" /* ToolbarButton.Events.MOUSE_DOWN */, event);
    }
}
export class ToolbarInput extends ToolbarItem {
    prompt;
    proxyElement;
    constructor(placeholder, accessiblePlaceholder, growFactor, shrinkFactor, tooltip, completions, dynamicCompletions, jslogContext) {
        const element = document.createElement('div');
        element.classList.add('toolbar-input');
        super(element);
        const internalPromptElement = this.element.createChild('div', 'toolbar-input-prompt');
        ARIAUtils.setLabel(internalPromptElement, accessiblePlaceholder || placeholder);
        internalPromptElement.addEventListener('focus', () => this.element.classList.add('focused'));
        internalPromptElement.addEventListener('blur', () => this.element.classList.remove('focused'));
        this.prompt = new TextPrompt();
        this.prompt.jslogContext = jslogContext;
        this.proxyElement = this.prompt.attach(internalPromptElement);
        this.proxyElement.classList.add('toolbar-prompt-proxy');
        this.proxyElement.addEventListener('keydown', (event) => this.onKeydownCallback(event));
        this.prompt.initialize(completions || (() => Promise.resolve([])), ' ', dynamicCompletions);
        if (tooltip) {
            this.prompt.setTitle(tooltip);
        }
        this.prompt.setPlaceholder(placeholder, accessiblePlaceholder);
        this.prompt.addEventListener("TextChanged" /* TextPromptEvents.TEXT_CHANGED */, this.onChangeCallback.bind(this));
        if (growFactor) {
            this.element.style.flexGrow = String(growFactor);
        }
        if (shrinkFactor) {
            this.element.style.flexShrink = String(shrinkFactor);
        }
        const clearButtonText = i18nString(UIStrings.clearInput);
        const clearButton = new Buttons.Button.Button();
        clearButton.data = {
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'cross-circle-filled',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: clearButtonText,
        };
        clearButton.className = 'toolbar-input-clear-button';
        clearButton.setAttribute('jslog', `${VisualLogging.action('clear').track({ click: true }).parent('mapped')}`);
        VisualLogging.setMappedParent(clearButton, internalPromptElement);
        clearButton.variant = "icon" /* Buttons.Button.Variant.ICON */;
        clearButton.size = "SMALL" /* Buttons.Button.Size.SMALL */;
        clearButton.iconName = 'cross-circle-filled';
        clearButton.title = clearButtonText;
        clearButton.ariaLabel = clearButtonText;
        clearButton.tabIndex = -1;
        clearButton.addEventListener('click', () => {
            this.setValue('', true);
            this.prompt.focus();
        });
        this.element.appendChild(clearButton);
        this.updateEmptyStyles();
    }
    applyEnabledState(enabled) {
        if (enabled) {
            this.element.classList.remove('disabled');
        }
        else {
            this.element.classList.add('disabled');
        }
        this.prompt.setEnabled(enabled);
    }
    setValue(value, notify) {
        this.prompt.setText(value);
        if (notify) {
            this.onChangeCallback();
        }
        this.updateEmptyStyles();
    }
    value() {
        return this.prompt.textWithCurrentSuggestion();
    }
    valueWithoutSuggestion() {
        return this.prompt.text();
    }
    clearAutocomplete() {
        this.prompt.clearAutocomplete();
    }
    focus() {
        this.prompt.focus();
    }
    onKeydownCallback(event) {
        if (event.key === 'Enter' && this.prompt.text()) {
            this.dispatchEventToListeners("EnterPressed" /* ToolbarInput.Event.ENTER_PRESSED */, this.prompt.text());
        }
        if (!Platform.KeyboardUtilities.isEscKey(event) || !this.prompt.text()) {
            return;
        }
        this.setValue('', true);
        event.consume(true);
    }
    onChangeCallback() {
        this.updateEmptyStyles();
        this.dispatchEventToListeners("TextChanged" /* ToolbarInput.Event.TEXT_CHANGED */, this.prompt.text());
    }
    updateEmptyStyles() {
        this.element.classList.toggle('toolbar-input-empty', !this.prompt.text());
    }
}
export class ToolbarFilter extends ToolbarInput {
    constructor(filterBy, growFactor, shrinkFactor, tooltip, completions, dynamicCompletions, jslogContext) {
        const filterPlaceholder = filterBy ? filterBy : i18nString(UIStrings.filter);
        super(filterPlaceholder, filterPlaceholder, growFactor, shrinkFactor, tooltip, completions, dynamicCompletions, jslogContext || 'filter');
        const filterIcon = IconButton.Icon.create('filter');
        this.element.prepend(filterIcon);
        this.element.classList.add('toolbar-filter');
    }
}
export class ToolbarToggle extends ToolbarButton {
    untoggledGlyph;
    toggledGlyph;
    constructor(title, glyph, toggledGlyph, jslogContext, toggleOnClick) {
        super(title, glyph, '');
        this.untoggledGlyph = glyph;
        this.toggledGlyph = toggledGlyph ? toggledGlyph : glyph;
        this.setToggledIcon(this.toggledGlyph || '');
        this.setToggleType("primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */);
        this.toggled(false);
        if (jslogContext) {
            this.element.setAttribute('jslog', `${VisualLogging.toggle().track({ click: true }).context(jslogContext)}`);
        }
        if (toggleOnClick !== undefined) {
            this.setToggleOnClick(toggleOnClick);
        }
    }
    setToggleOnClick(toggleOnClick) {
        this.toggleOnClick(toggleOnClick);
    }
    setToggled(toggled) {
        this.toggled(toggled);
    }
    setChecked(checked) {
        this.checked(checked);
    }
    setDefaultWithRedColor(withRedColor) {
        if (withRedColor) {
            this.setToggleType("red-toggle" /* Buttons.Button.ToggleType.RED */);
            this.setGlyph(this.toggledGlyph || '');
            this.setToggledIcon(this.untoggledGlyph || '');
            this.toggled(true);
        }
    }
    enableToggleWithRedColor() {
        this.setToggleType("red-toggle" /* Buttons.Button.ToggleType.RED */);
    }
}
export class ToolbarMenuButton extends ToolbarCombobox {
    contextMenuHandler;
    useSoftMenu;
    triggerTimeoutId;
    #triggerDelay = 200;
    constructor(contextMenuHandler, isIconDropdown, useSoftMenu, jslogContext, iconName) {
        super('', isIconDropdown, jslogContext, iconName);
        if (jslogContext) {
            this.element.setAttribute('jslog', `${VisualLogging.dropDown().track({ click: true }).context(jslogContext)}`);
        }
        this.contextMenuHandler = contextMenuHandler;
        this.useSoftMenu = Boolean(useSoftMenu);
        ARIAUtils.markAsMenuButton(this.element);
    }
    setTriggerDelay(x) {
        this.#triggerDelay = x;
    }
    mouseDown(event) {
        if (!this.enabled) {
            return;
        }
        if (event.buttons !== 1) {
            super.mouseDown(event);
            return;
        }
        if (!this.triggerTimeoutId) {
            this.triggerTimeoutId = window.setTimeout(this.trigger.bind(this, event), this.#triggerDelay);
        }
    }
    trigger(event) {
        delete this.triggerTimeoutId;
        const contextMenu = new ContextMenu(event, {
            useSoftMenu: this.useSoftMenu,
            x: this.element.getBoundingClientRect().left,
            y: this.element.getBoundingClientRect().top + this.element.offsetHeight,
            // Without adding a delay, pointer events will be un-ignored too early, and a single click causes
            // the context menu to be closed and immediately re-opened on Windows (https://crbug.com/339560549).
            onSoftMenuClosed: () => setTimeout(() => this.element.removeAttribute('aria-expanded'), 50),
        });
        this.contextMenuHandler(contextMenu);
        this.element.setAttribute('aria-expanded', 'true');
        void contextMenu.show();
    }
    clicked(event) {
        if (this.triggerTimeoutId) {
            clearTimeout(this.triggerTimeoutId);
        }
        this.trigger(event);
    }
}
export class ToolbarSettingToggle extends ToolbarToggle {
    defaultTitle;
    setting;
    willAnnounceState;
    constructor(setting, glyph, title, toggledGlyph, jslogContext) {
        super(title, glyph, toggledGlyph, jslogContext);
        this.defaultTitle = title;
        this.setting = setting;
        this.settingChanged();
        this.setting.addChangeListener(this.settingChanged, this);
        // Determines whether the toggle state will be announced to a screen reader
        this.willAnnounceState = false;
    }
    settingChanged() {
        const toggled = this.setting.get();
        this.setToggled(toggled);
        const toggleAnnouncement = toggled ? i18nString(UIStrings.pressed) : i18nString(UIStrings.notPressed);
        if (this.willAnnounceState) {
            ARIAUtils.alert(toggleAnnouncement);
        }
        this.willAnnounceState = false;
        this.setTitle(this.defaultTitle);
    }
    clicked(event) {
        this.willAnnounceState = true;
        this.setting.set(this.isToggled());
        super.clicked(event);
    }
}
export class ToolbarSeparator extends ToolbarItem {
    constructor(spacer) {
        const element = document.createElement('div');
        element.classList.add(spacer ? 'toolbar-spacer' : 'toolbar-divider');
        super(element);
    }
}
export class ToolbarComboBox extends ToolbarItem {
    selectElementInternal;
    constructor(changeHandler, title, className, jslogContext) {
        const element = document.createElement('span');
        element.classList.add('toolbar-select-container');
        super(element);
        this.selectElementInternal = this.element.createChild('select', 'toolbar-item');
        const dropdownArrowIcon = IconButton.Icon.create('triangle-down', 'toolbar-dropdown-arrow');
        this.element.appendChild(dropdownArrowIcon);
        if (changeHandler) {
            this.selectElementInternal.addEventListener('change', changeHandler, false);
        }
        ARIAUtils.setLabel(this.selectElementInternal, title);
        super.setTitle(title);
        if (className) {
            this.selectElementInternal.classList.add(className);
        }
        if (jslogContext) {
            this.selectElementInternal.setAttribute('jslog', `${VisualLogging.dropDown().track({ change: true }).context(jslogContext)}`);
        }
    }
    selectElement() {
        return this.selectElementInternal;
    }
    size() {
        return this.selectElementInternal.childElementCount;
    }
    options() {
        return Array.prototype.slice.call(this.selectElementInternal.children, 0);
    }
    addOption(option) {
        this.selectElementInternal.appendChild(option);
    }
    createOption(label, value) {
        const option = this.selectElementInternal.createChild('option');
        option.text = label;
        if (typeof value !== 'undefined') {
            option.value = value;
        }
        const jslogContext = value ? Platform.StringUtilities.toKebabCase(value) : undefined;
        option.setAttribute('jslog', `${VisualLogging.item(jslogContext).track({ click: true })}`);
        return option;
    }
    applyEnabledState(enabled) {
        super.applyEnabledState(enabled);
        this.selectElementInternal.disabled = !enabled;
    }
    removeOption(option) {
        this.selectElementInternal.removeChild(option);
    }
    removeOptions() {
        this.selectElementInternal.removeChildren();
    }
    selectedOption() {
        if (this.selectElementInternal.selectedIndex >= 0) {
            return this.selectElementInternal[this.selectElementInternal.selectedIndex];
        }
        return null;
    }
    select(option) {
        this.selectElementInternal.selectedIndex = Array.prototype.indexOf.call(this.selectElementInternal, option);
    }
    setSelectedIndex(index) {
        this.selectElementInternal.selectedIndex = index;
    }
    selectedIndex() {
        return this.selectElementInternal.selectedIndex;
    }
    setMaxWidth(width) {
        this.selectElementInternal.style.maxWidth = width + 'px';
    }
    setMinWidth(width) {
        this.selectElementInternal.style.minWidth = width + 'px';
    }
}
export class ToolbarSettingComboBox extends ToolbarComboBox {
    optionsInternal;
    setting;
    muteSettingListener;
    constructor(options, setting, accessibleName) {
        super(null, accessibleName, undefined, setting.name);
        this.optionsInternal = options;
        this.setting = setting;
        this.selectElementInternal.addEventListener('change', this.valueChanged.bind(this), false);
        this.setOptions(options);
        setting.addChangeListener(this.settingChanged, this);
    }
    setOptions(options) {
        this.optionsInternal = options;
        this.selectElementInternal.removeChildren();
        for (let i = 0; i < options.length; ++i) {
            const dataOption = options[i];
            const option = this.createOption(dataOption.label, dataOption.value);
            this.selectElementInternal.appendChild(option);
            if (this.setting.get() === dataOption.value) {
                this.setSelectedIndex(i);
            }
        }
    }
    value() {
        return this.optionsInternal[this.selectedIndex()].value;
    }
    settingChanged() {
        if (this.muteSettingListener) {
            return;
        }
        const value = this.setting.get();
        for (let i = 0; i < this.optionsInternal.length; ++i) {
            if (value === this.optionsInternal[i].value) {
                this.setSelectedIndex(i);
                break;
            }
        }
    }
    valueChanged(_event) {
        const option = this.optionsInternal[this.selectedIndex()];
        this.muteSettingListener = true;
        this.setting.set(option.value);
        this.muteSettingListener = false;
    }
}
export class ToolbarCheckbox extends ToolbarItem {
    inputElement;
    constructor(text, tooltip, listener, jslogContext, small) {
        super(CheckboxLabel.create(text));
        this.element.classList.add('checkbox');
        this.inputElement = this.element.checkboxElement;
        this.inputElement.classList.toggle('small', small);
        if (tooltip) {
            // install on the checkbox
            Tooltip.install(this.inputElement, tooltip);
            Tooltip.install(this.element.textElement, tooltip);
        }
        if (listener) {
            this.inputElement.addEventListener('click', listener, false);
        }
        if (jslogContext) {
            this.inputElement.setAttribute('jslog', `${VisualLogging.toggle().track({ change: true }).context(jslogContext)}`);
        }
    }
    checked() {
        return this.inputElement.checked;
    }
    setChecked(value) {
        this.inputElement.checked = value;
    }
    applyEnabledState(enabled) {
        super.applyEnabledState(enabled);
        this.inputElement.disabled = !enabled;
    }
    setIndeterminate(indeterminate) {
        this.inputElement.indeterminate = indeterminate;
    }
}
export class ToolbarSettingCheckbox extends ToolbarCheckbox {
    constructor(setting, tooltip, alternateTitle) {
        super(alternateTitle || setting.title(), tooltip, undefined, setting.name);
        bindCheckbox(this.inputElement, setting);
    }
}
const registeredToolbarItems = [];
export function registerToolbarItem(registration) {
    registeredToolbarItems.push(registration);
}
function getRegisteredToolbarItems() {
    return registeredToolbarItems.filter(item => Root.Runtime.Runtime.isDescriptorEnabled({ experiment: item.experiment, condition: item.condition }));
}
//# sourceMappingURL=Toolbar.js.map