// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as UI from '../../../../ui/legacy/legacy.js';
import dataGridStyles from './dataGrid.css.js';
import { SortableDataGrid, SortableDataGridNode } from './SortableDataGrid.js';
const DUMMY_COLUMN_ID = 'dummy'; // SortableDataGrid.create requires at least one column.
/**
 * A data grid (table) element that can be used as progressive enhancement over a <table> element.
 *
 * It can be used as
 * ```
 * <devtools-data-grid striped name=${'Display Name'}>
 *   <table>
 *     <tr>
 *       <th id="column-1">Column 1</th>
 *       <th id="column-2">Column 2</th>
 *     </tr>
 *     <tr>
 *       <td>Value 1</td>
 *       <td>Value 2</td>
 *     </tr>
 *   </table>
 * </devtools-data-grid>
 * ```
 * where a row with <th> configures the columns and rows with <td> provide the data.
 *
 * Under the hood it uses SortableDataGrid, which extends ViewportDataGrid so only
 * visible rows are layed out and sorting is provided out of the box.
 *
 * @attr striped
 * @attr displayName
 * @prop filters
 */
class DataGridElement extends HTMLElement {
    static observedAttributes = ['striped', 'name', 'inline'];
    #dataGrid = SortableDataGrid.create([DUMMY_COLUMN_ID], [], '');
    #mutationObserver = new MutationObserver(this.#onChange.bind(this));
    #resizeObserver = new ResizeObserver(() => {
        if (!this.inline) {
            this.#dataGrid.onResize();
        }
    });
    #shadowRoot;
    #columns = [];
    #hideableColumns = new Set();
    #hiddenColumns = new Set();
    #usedCreationNode = null;
    constructor() {
        super();
        // TODO(dsv): Move this to the data_grid.css once all the data grid usage is migrated to this web component.
        this.style.display = 'flex';
        this.#dataGrid.element.style.flex = 'auto';
        this.#shadowRoot = UI.UIUtils.createShadowRootWithCoreStyles(this, { delegatesFocus: true, cssFile: dataGridStyles });
        this.#shadowRoot.appendChild(this.#dataGrid.element);
        this.#dataGrid.addEventListener("SelectedNode" /* DataGridEvents.SELECTED_NODE */, e => this.dispatchEvent(new CustomEvent('select', { detail: e.data.configElement })));
        this.#dataGrid.addEventListener("DeselectedNode" /* DataGridEvents.DESELECTED_NODE */, () => this.dispatchEvent(new CustomEvent('select', { detail: null })));
        this.#dataGrid.addEventListener("SortingChanged" /* DataGridEvents.SORTING_CHANGED */, () => this.dispatchEvent(new CustomEvent('sort', {
            detail: { columnId: this.#dataGrid.sortColumnId(), ascending: this.#dataGrid.isSortOrderAscending() }
        })));
        this.#dataGrid.setRowContextMenuCallback((menu, node) => {
            this.dispatchEvent(new CustomEvent('contextmenu', { detail: { menu, element: node.configElement } }));
        });
        this.#dataGrid.setHeaderContextMenuCallback(menu => {
            for (const column of this.#columns) {
                if (this.#hideableColumns.has(column.id)) {
                    menu.defaultSection().appendCheckboxItem(this.#dataGrid.columns[column.id].title, () => {
                        if (this.#hiddenColumns.has(column.id)) {
                            this.#hiddenColumns.delete(column.id);
                        }
                        else {
                            this.#hiddenColumns.add(column.id);
                        }
                        this.#dataGrid.setColumnsVisibility(new Set(this.#columns.map(({ id }) => id).filter(column => !this.#hiddenColumns.has(column))));
                    }, { checked: !this.#hiddenColumns.has(column.id) });
                }
            }
        });
        this.#mutationObserver.observe(this, { childList: true, attributes: true, subtree: true, characterData: true });
        this.#resizeObserver.observe(this);
        this.#updateColumns();
        this.#addNodes(this.querySelectorAll('tr'));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case 'striped':
                this.#dataGrid.setStriped(newValue !== 'true');
                break;
            case 'name':
                this.#dataGrid.displayName = newValue ?? '';
                break;
            case 'inline':
                this.#dataGrid.renderInline();
                break;
        }
    }
    set striped(striped) {
        this.toggleAttribute('striped', striped);
    }
    get striped() {
        return hasBooleanAttribute(this, 'striped');
    }
    set inline(striped) {
        this.toggleAttribute('inline', striped);
    }
    get inline() {
        return hasBooleanAttribute(this, 'inline');
    }
    set displayName(displayName) {
        this.setAttribute('name', displayName);
    }
    get displayName() {
        return this.getAttribute('name');
    }
    set filters(filters) {
        this.#dataGrid.setFilters(filters);
        this.#dataGrid.element.setAttribute('aria-rowcount', String(this.#dataGrid.getNumberOfRows()));
    }
    get columns() {
        return this.#columns;
    }
    #updateColumns() {
        for (const column of Object.keys(this.#dataGrid.columns)) {
            this.#dataGrid.removeColumn(column);
        }
        this.#hideableColumns.clear();
        this.#columns = [];
        let hasEditableColumn = false;
        for (const column of this.querySelectorAll('th[id]') || []) {
            const id = column.id;
            let title = column.textContent?.trim() || '';
            const titleDOMFragment = column.firstElementChild ? document.createDocumentFragment() : undefined;
            if (titleDOMFragment) {
                title = '';
                for (const child of column.children) {
                    titleDOMFragment.appendChild(child.cloneNode(true));
                    title += child.shadowRoot ? child.shadowRoot.textContent : child.textContent;
                }
            }
            const sortable = hasBooleanAttribute(column, 'sortable');
            const width = column.getAttribute('width') ?? undefined;
            const fixedWidth = column.hasAttribute('fixed');
            let align = column.getAttribute('align') ?? undefined;
            if (align !== "center" /* Align.CENTER */ && align !== "right" /* Align.RIGHT */) {
                align = undefined;
            }
            const dataType = column.getAttribute('type') === 'boolean' ? "Boolean" /* DataType.BOOLEAN */ : "String" /* DataType.STRING */;
            const weight = parseFloat(column.getAttribute('weight') || '') ?? undefined;
            const editable = column.hasAttribute('editable');
            if (editable) {
                hasEditableColumn = true;
            }
            const columnDescriptor = {
                id,
                title: title,
                titleDOMFragment,
                sortable,
                fixedWidth,
                width,
                align,
                weight,
                editable,
                dataType,
            };
            this.#dataGrid.addColumn(columnDescriptor);
            this.#columns.push(columnDescriptor);
            if (hasBooleanAttribute(column, 'hideable')) {
                this.#hideableColumns.add(id);
            }
        }
        const visibleColumns = new Set(this.#columns.map(({ id }) => id).filter(id => !this.#hiddenColumns.has(id)));
        if (visibleColumns.size) {
            this.#dataGrid.setColumnsVisibility(visibleColumns);
        }
        this.#dataGrid.setEditCallback(hasEditableColumn ? this.#editCallback.bind(this) : undefined, INTERNAL_TOKEN);
        this.#dataGrid.deleteCallback = hasEditableColumn ? this.#deleteCallback.bind(this) : undefined;
    }
    #needUpdateColumns(mutationList) {
        for (const mutation of mutationList) {
            for (const element of [...mutation.removedNodes, ...mutation.addedNodes]) {
                if (!(element instanceof HTMLElement)) {
                    continue;
                }
                if (element.nodeName === 'TH' || element.querySelector('th')) {
                    return true;
                }
            }
            if (mutation.target instanceof HTMLElement && mutation.target.closest('th')) {
                return true;
            }
        }
        return false;
    }
    #getDataRows(nodes) {
        return [...nodes]
            .flatMap(node => {
            if (node instanceof HTMLTableRowElement) {
                return [node];
            }
            if (node instanceof HTMLElement) {
                return [...node.querySelectorAll('tr')];
            }
            return [];
        })
            .filter(node => node.querySelector('td') && !hasBooleanAttribute(node, 'placeholder'));
    }
    #findNextExistingNode(element) {
        for (let e = element.nextElementSibling; e; e = e.nextElementSibling) {
            const nextNode = DataGridElementNode.get(e);
            if (nextNode) {
                return nextNode;
            }
        }
        return null;
    }
    #addNodes(nodes) {
        for (const element of this.#getDataRows(nodes)) {
            const parentNode = this.#dataGrid.rootNode(); // TODO(dsv): support nested nodes
            const nextNode = this.#findNextExistingNode(element);
            const index = nextNode ? parentNode.children.indexOf(nextNode) : parentNode.children.length;
            const node = new DataGridElementNode(element, this);
            parentNode.insertChild(node, index);
            if (hasBooleanAttribute(element, 'selected')) {
                node.select();
            }
            if (hasBooleanAttribute(element, 'dirty')) {
                node.setDirty(true);
            }
            if (hasBooleanAttribute(element, 'inactive')) {
                node.setInactive(true);
            }
            if (hasBooleanAttribute(element, 'highlighted')) {
                node.setHighlighted(true);
            }
        }
    }
    #removeNodes(nodes) {
        for (const element of this.#getDataRows(nodes)) {
            const node = DataGridElementNode.get(element);
            if (node) {
                node.remove();
            }
        }
    }
    #updateNode(node, attributeName) {
        while (node?.parentNode && !(node instanceof HTMLElement)) {
            node = node.parentNode;
        }
        const dataRow = node instanceof HTMLElement ? node.closest('tr') : null;
        const dataGridNode = dataRow ? DataGridElementNode.get(dataRow) : null;
        if (dataGridNode && dataRow) {
            if (attributeName === 'selected') {
                if (hasBooleanAttribute(dataRow, 'selected')) {
                    dataGridNode.select();
                }
                else {
                    dataGridNode.deselect();
                }
            }
            else if (attributeName === 'dirty') {
                dataGridNode.setDirty(hasBooleanAttribute(dataRow, 'dirty'));
            }
            else if (attributeName === 'inactive') {
                dataGridNode.setInactive(hasBooleanAttribute(dataRow, 'inactive'));
            }
            else if (attributeName === 'highlighted') {
                dataGridNode.setHighlighted(hasBooleanAttribute(dataRow, 'highlighted'));
            }
            else {
                dataGridNode.refresh();
            }
        }
    }
    #updateCreationNode() {
        if (this.#usedCreationNode) {
            DataGridElementNode.remove(this.#usedCreationNode);
            this.#usedCreationNode = null;
            this.#dataGrid.creationNode = undefined;
        }
        const placeholder = this.querySelector('tr[placeholder]');
        if (!placeholder) {
            this.#dataGrid.creationNode?.remove();
            this.#dataGrid.creationNode = undefined;
        }
        else if (!DataGridElementNode.get(placeholder)) {
            this.#dataGrid.creationNode?.remove();
            const node = new DataGridElementNode(placeholder, this);
            this.#dataGrid.creationNode = node;
            this.#dataGrid.rootNode().appendChild(node);
        }
    }
    #onChange(mutationList) {
        if (this.#needUpdateColumns(mutationList)) {
            this.#updateColumns();
        }
        this.#updateCreationNode();
        for (const mutation of mutationList) {
            this.#removeNodes(mutation.removedNodes);
            this.#addNodes(mutation.addedNodes);
            this.#updateNode(mutation.target, mutation.attributeName);
        }
    }
    #editCallback(node, columnId, valueBeforeEditing, newText, moveDirection) {
        if (node.isCreationNode) {
            this.#usedCreationNode = node;
            let hasNextEditableColumn = false;
            if (moveDirection) {
                const index = this.#columns.findIndex(({ id }) => id === columnId);
                const nextColumns = moveDirection === 'forward' ? this.#columns.slice(index + 1) : this.#columns.slice(0, index);
                hasNextEditableColumn = nextColumns.some(({ editable }) => editable);
            }
            if (!hasNextEditableColumn) {
                node.deselect();
            }
            return;
        }
        this.dispatchEvent(new CustomEvent('edit', { detail: { node: node.configElement, columnId, valueBeforeEditing, newText } }));
    }
    #deleteCallback(node) {
        this.dispatchEvent(new CustomEvent('delete', { detail: node.configElement }));
    }
    addEventListener(...args) {
        super.addEventListener(...args);
        if (args[0] === 'refresh') {
            this.#dataGrid.refreshCallback = this.#refreshCallback.bind(this);
        }
    }
    #refreshCallback() {
        this.dispatchEvent(new CustomEvent('refresh'));
    }
}
class DataGridElementNode extends SortableDataGridNode {
    static #elementToNode = new WeakMap();
    #configElement;
    #dataGridElement;
    #addedClasses = new Set();
    constructor(configElement, dataGridElement) {
        super();
        this.#configElement = configElement;
        DataGridElementNode.#elementToNode.set(configElement, this);
        this.#dataGridElement = dataGridElement;
        this.#updateData();
        this.isCreationNode = hasBooleanAttribute(this.#configElement, 'placeholder');
    }
    static get(configElement) {
        return configElement && DataGridElementNode.#elementToNode.get(configElement);
    }
    get configElement() {
        return this.#configElement;
    }
    #updateData() {
        const cells = this.#configElement.querySelectorAll('td');
        for (let i = 0; i < cells.length; ++i) {
            const cell = cells[i];
            const column = this.#dataGridElement.columns[i];
            if (column.dataType === "Boolean" /* DataType.BOOLEAN */) {
                this.data[column.id] = hasBooleanAttribute(cell, 'data-value');
            }
            else {
                this.data[column.id] = cell.dataset.value ?? cell.textContent ?? '';
            }
        }
    }
    createElement() {
        const element = super.createElement();
        element.addEventListener('click', this.#onRowMouseEvent.bind(this));
        element.addEventListener('mouseenter', this.#onRowMouseEvent.bind(this));
        element.addEventListener('mouseleave', this.#onRowMouseEvent.bind(this));
        if (this.#configElement.hasAttribute('style')) {
            element.setAttribute('style', this.#configElement.getAttribute('style') || '');
        }
        for (const classToAdd of this.#configElement.classList) {
            element.classList.add(classToAdd);
        }
        return element;
    }
    refresh() {
        this.#updateData();
        super.refresh();
        const existingElement = this.existingElement();
        if (!existingElement) {
            return;
        }
        if (this.#configElement.hasAttribute('style')) {
            existingElement.setAttribute('style', this.#configElement.getAttribute('style') || '');
        }
        for (const addedClass of this.#addedClasses) {
            existingElement.classList.remove(addedClass);
        }
        for (const classToAdd of this.#configElement.classList) {
            existingElement.classList.add(classToAdd);
        }
    }
    #onRowMouseEvent(event) {
        let currentElement = event.target;
        const childIndexesOnPathToRoot = [];
        while (currentElement?.parentElement && currentElement !== event.currentTarget) {
            childIndexesOnPathToRoot.push([...currentElement.parentElement.children].indexOf(currentElement));
            currentElement = currentElement.parentElement;
        }
        if (!currentElement) {
            throw new Error('Cell click event target not found in the data grid');
        }
        let targetInConfigRow = this.#configElement;
        for (const index of childIndexesOnPathToRoot.reverse()) {
            targetInConfigRow = targetInConfigRow.children[index];
        }
        if (targetInConfigRow instanceof HTMLElement) {
            targetInConfigRow?.dispatchEvent(new MouseEvent(event.type, { bubbles: true, composed: true }));
        }
    }
    createCells(element) {
        const configCells = [...this.#configElement.querySelectorAll('td')];
        const hasCollspan = configCells.some(cell => cell.hasAttribute('colspan'));
        if (!hasCollspan) {
            super.createCells(element);
        }
        else {
            for (const cell of configCells) {
                element.appendChild(cell.cloneNode(true));
            }
        }
    }
    createCell(columnId) {
        const index = this.#dataGridElement.columns.findIndex(({ id }) => id === columnId);
        if (this.#dataGridElement.columns[index].dataType === "Boolean" /* DataType.BOOLEAN */) {
            return super.createCell(columnId);
        }
        const cell = this.createTD(columnId);
        cell.setAttribute('part', `${columnId}-column`);
        if (this.isCreationNode) {
            return cell;
        }
        const configCell = this.#configElement.querySelectorAll('td')[index];
        if (!configCell) {
            throw new Error(`Column ${columnId} not found in the data grid`);
        }
        for (const child of configCell.childNodes) {
            cell.appendChild(child.cloneNode(true));
        }
        for (const cssClass of configCell.classList) {
            cell.classList.add(cssClass);
        }
        cell.title = configCell.title;
        if (configCell.hasAttribute('aria-label')) {
            this.setCellAccessibleName(configCell.getAttribute('aria-label') || '', cell, columnId);
        }
        const style = configCell.getAttribute('style');
        if (style !== null) {
            cell.setAttribute('style', style);
        }
        return cell;
    }
    static remove(node) {
        DataGridElementNode.#elementToNode.delete(node.#configElement);
        node.remove();
    }
    deselect() {
        super.deselect();
        if (this.isCreationNode) {
            this.#dataGridElement.dispatchEvent(new CustomEvent('create', { detail: this.data }));
        }
    }
}
customElements.define('devtools-data-grid', DataGridElement);
function hasBooleanAttribute(element, name) {
    return element.hasAttribute(name) && element.getAttribute(name) !== 'false';
}
const INTERNAL_TOKEN = {
    token: 'DataGridInternalToken'
};
//# sourceMappingURL=DataGridElement.js.map