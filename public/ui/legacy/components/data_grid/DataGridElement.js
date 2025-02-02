// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import dataGridStylesRaw from './dataGrid.css.js';
import { SortableDataGrid, SortableDataGridNode } from './SortableDataGrid.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const dataGridStyles = new CSSStyleSheet();
dataGridStyles.replaceSync(dataGridStylesRaw.cssContent);
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
 * @prop columnsOrder
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
    #columnsOrder = [];
    #hideableColumns = new Set();
    #hiddenColumns = new Set();
    constructor() {
        super();
        // TODO(dsv): Move this to the data_grid.css once all the data grid usage is migrated to this web component.
        this.style.display = 'flex';
        this.#dataGrid.element.style.flex = 'auto';
        this.#shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
        this.#shadowRoot.appendChild(this.#dataGrid.element);
        this.#shadowRoot.adoptedStyleSheets = [dataGridStyles];
        this.#dataGrid.addEventListener("SelectedNode" /* DataGridEvents.SELECTED_NODE */, e => this.dispatchEvent(new CustomEvent('select', { detail: e.data.configElement })));
        this.#dataGrid.addEventListener("DeselectedNode" /* DataGridEvents.DESELECTED_NODE */, () => this.dispatchEvent(new CustomEvent('select', { detail: null })));
        this.#dataGrid.setRowContextMenuCallback((menu, node) => {
            this.dispatchEvent(new CustomEvent('contextmenu', { detail: { menu, element: node.configElement } }));
        });
        this.#dataGrid.setHeaderContextMenuCallback(menu => {
            for (const columnId of this.#columnsOrder) {
                if (this.#hideableColumns.has(columnId)) {
                    menu.defaultSection().appendCheckboxItem(this.#dataGrid.columns[columnId].title, () => {
                        if (this.#hiddenColumns.has(columnId)) {
                            this.#hiddenColumns.delete(columnId);
                        }
                        else {
                            this.#hiddenColumns.add(columnId);
                        }
                        this.#dataGrid.setColumnsVisibility(new Set(this.#columnsOrder.filter(column => !this.#hiddenColumns.has(column))));
                    });
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
        return this.hasAttribute('striped');
    }
    set inline(striped) {
        this.toggleAttribute('inline', striped);
    }
    get inline() {
        return this.hasAttribute('inline');
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
    get columnsOrder() {
        return this.#columnsOrder;
    }
    #updateColumns() {
        for (const column of Object.keys(this.#dataGrid.columns)) {
            this.#dataGrid.removeColumn(column);
        }
        this.#hideableColumns.clear();
        this.#columnsOrder = [];
        for (const column of this.querySelectorAll('th[id]') || []) {
            const id = column.id;
            this.#columnsOrder.push(id);
            let title = column.textContent?.trim() || '';
            const titleDOMFragment = column.firstElementChild ? document.createDocumentFragment() : undefined;
            if (titleDOMFragment) {
                title = '';
                for (const child of column.children) {
                    titleDOMFragment.appendChild(child.cloneNode(true));
                    title += child.shadowRoot ? child.shadowRoot.textContent : child.textContent;
                }
            }
            const sortable = column.hasAttribute('sortable');
            const width = column.getAttribute('width') ?? undefined;
            const fixedWidth = column.hasAttribute('fixed');
            let align = column.getAttribute('align') ?? undefined;
            if (align !== "center" /* Align.CENTER */ && align !== "right" /* Align.RIGHT */) {
                align = undefined;
            }
            const weight = parseFloat(column.getAttribute('weight') || '') ?? undefined;
            this.#dataGrid.addColumn({
                id,
                title: title,
                titleDOMFragment,
                sortable,
                fixedWidth,
                width,
                align,
                weight
            });
            if (column.hasAttribute('hideable')) {
                this.#hideableColumns.add(id);
            }
        }
        const visibleColumns = new Set(this.#columnsOrder.filter(column => !this.#hiddenColumns.has(column)));
        if (visibleColumns.size) {
            this.#dataGrid.setColumnsVisibility(visibleColumns);
        }
    }
    #needUpdateColumns(mutationList) {
        for (const mutation of mutationList) {
            for (const element of [...mutation.removedNodes, ...mutation.addedNodes]) {
                if (element.nodeName === 'TH') {
                    return true;
                }
            }
            if (mutation.target instanceof HTMLElement && mutation.target.closest('th')) {
                return true;
            }
        }
        return false;
    }
    #addNodes(nodes) {
        for (const element of nodes) {
            if (element instanceof HTMLTableRowElement && element.querySelector('td')) {
                const parentNode = this.#dataGrid.rootNode(); // TODO(dsv): support nested nodes
                const nextNode = element.nextElementSibling ? DataGridElementNode.get(element.nextElementSibling) : null;
                const index = nextNode ? parentNode.children.indexOf(nextNode) : parentNode.children.length;
                const node = new DataGridElementNode(element, this);
                parentNode.insertChild(node, index);
                if (element.hasAttribute('selected')) {
                    node.select();
                }
            }
        }
    }
    #removeNodes(nodes) {
        for (const element of nodes) {
            if (element instanceof HTMLTableRowElement && element.querySelector('td')) {
                const node = DataGridElementNode.get(element);
                if (node) {
                    node.remove();
                }
            }
        }
    }
    #updateNode(node) {
        const dataRow = node instanceof HTMLElement ? node.closest('tr') : null;
        const dataGridNode = dataRow ? DataGridElementNode.get(dataRow) : null;
        if (dataGridNode) {
            dataGridNode.refresh();
        }
    }
    #onChange(mutationList) {
        if (this.#needUpdateColumns(mutationList)) {
            this.#updateColumns();
        }
        for (const mutation of mutationList) {
            this.#removeNodes(mutation.removedNodes);
            this.#addNodes(mutation.addedNodes);
            this.#updateNode(mutation.target);
        }
    }
}
class DataGridElementNode extends SortableDataGridNode {
    static #elementToNode = new WeakMap();
    #configElement;
    #dataGridElement;
    constructor(configElement, dataGridElement) {
        super();
        this.#configElement = configElement;
        DataGridElementNode.#elementToNode.set(configElement, this);
        this.#dataGridElement = dataGridElement;
        this.#updateData();
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
            const columnId = this.#dataGridElement.columnsOrder[i];
            this.data[columnId] = cell.dataset.value ?? cell.textContent ?? '';
        }
        if (this.#configElement.hasAttribute('selected')) {
            this.select();
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
        return element;
    }
    refresh() {
        this.#updateData();
        super.refresh();
        const existingElement = this.existingElement();
        if (existingElement && this.#configElement.hasAttribute('style')) {
            existingElement.setAttribute('style', this.#configElement.getAttribute('style') || '');
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
    createCell(columnId) {
        const index = this.#dataGridElement.columnsOrder.indexOf(columnId);
        const configCell = this.#configElement.querySelectorAll('td')[index];
        if (!configCell) {
            throw new Error(`Column ${columnId} not found in the data grid`);
        }
        const cell = this.createTD(columnId);
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
        return cell;
    }
}
// TODO(dsv): Rename to devtools-data-grid once the other one is removed.
customElements.define('devtools-data-grid', DataGridElement);
//# sourceMappingURL=DataGridElement.js.map