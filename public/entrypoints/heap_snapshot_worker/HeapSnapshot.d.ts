import * as Platform from '../../core/platform/platform.js';
import * as HeapSnapshotModel from '../../models/heap_snapshot_model/heap_snapshot_model.js';
import type { HeapSnapshotWorkerDispatcher } from './HeapSnapshotWorkerDispatcher.js';
export interface HeapSnapshotItem {
    itemIndex(): number;
    serialize(): Object;
}
export declare class HeapSnapshotEdge implements HeapSnapshotItem {
    snapshot: HeapSnapshot;
    protected readonly edges: Platform.TypedArrayUtilities.BigUint32Array;
    edgeIndex: number;
    constructor(snapshot: HeapSnapshot, edgeIndex?: number);
    clone(): HeapSnapshotEdge;
    hasStringName(): boolean;
    name(): string;
    node(): HeapSnapshotNode;
    nodeIndex(): number;
    toString(): string;
    type(): string;
    itemIndex(): number;
    serialize(): HeapSnapshotModel.HeapSnapshotModel.Edge;
    rawType(): number;
    isInternal(): boolean;
    isInvisible(): boolean;
    isWeak(): boolean;
    getValueForSorting(_fieldName: string): number;
    nameIndex(): number;
}
export interface HeapSnapshotItemIterator {
    hasNext(): boolean;
    item(): HeapSnapshotItem;
    next(): void;
}
export interface HeapSnapshotItemIndexProvider {
    itemForIndex(newIndex: number): HeapSnapshotItem;
}
export declare class HeapSnapshotNodeIndexProvider implements HeapSnapshotItemIndexProvider {
    #private;
    constructor(snapshot: HeapSnapshot);
    itemForIndex(index: number): HeapSnapshotNode;
}
export declare class HeapSnapshotEdgeIndexProvider implements HeapSnapshotItemIndexProvider {
    #private;
    constructor(snapshot: HeapSnapshot);
    itemForIndex(index: number): HeapSnapshotEdge;
}
export declare class HeapSnapshotRetainerEdgeIndexProvider implements HeapSnapshotItemIndexProvider {
    #private;
    constructor(snapshot: HeapSnapshot);
    itemForIndex(index: number): HeapSnapshotRetainerEdge;
}
export declare class HeapSnapshotEdgeIterator implements HeapSnapshotItemIterator {
    #private;
    edge: JSHeapSnapshotEdge;
    constructor(node: HeapSnapshotNode);
    hasNext(): boolean;
    item(): HeapSnapshotEdge;
    next(): void;
}
export declare class HeapSnapshotRetainerEdge implements HeapSnapshotItem {
    #private;
    protected snapshot: HeapSnapshot;
    constructor(snapshot: HeapSnapshot, retainerIndex: number);
    clone(): HeapSnapshotRetainerEdge;
    hasStringName(): boolean;
    name(): string;
    nameIndex(): number;
    node(): HeapSnapshotNode;
    nodeIndex(): number;
    retainerIndex(): number;
    setRetainerIndex(retainerIndex: number): void;
    set edgeIndex(edgeIndex: number);
    private nodeInternal;
    protected edge(): JSHeapSnapshotEdge;
    toString(): string;
    itemIndex(): number;
    serialize(): HeapSnapshotModel.HeapSnapshotModel.Edge;
    type(): string;
    isInternal(): boolean;
    getValueForSorting(fieldName: string): number;
}
export declare class HeapSnapshotRetainerEdgeIterator implements HeapSnapshotItemIterator {
    #private;
    retainer: JSHeapSnapshotRetainerEdge;
    constructor(retainedNode: HeapSnapshotNode);
    hasNext(): boolean;
    item(): HeapSnapshotRetainerEdge;
    next(): void;
}
export declare class HeapSnapshotNode implements HeapSnapshotItem {
    #private;
    snapshot: HeapSnapshot;
    nodeIndex: number;
    constructor(snapshot: HeapSnapshot, nodeIndex?: number);
    distance(): number;
    distanceForRetainersView(): number;
    className(): string;
    classIndex(): number;
    classKeyInternal(): string | number;
    setClassIndex(index: number): void;
    dominatorIndex(): number;
    edges(): HeapSnapshotEdgeIterator;
    edgesCount(): number;
    id(): number;
    rawName(): string;
    isRoot(): boolean;
    isUserRoot(): boolean;
    isHidden(): boolean;
    isArray(): boolean;
    isSynthetic(): boolean;
    isDocumentDOMTreesRoot(): boolean;
    name(): string;
    retainedSize(): number;
    retainers(): HeapSnapshotRetainerEdgeIterator;
    retainersCount(): number;
    selfSize(): number;
    type(): string;
    traceNodeId(): number;
    itemIndex(): number;
    serialize(): HeapSnapshotModel.HeapSnapshotModel.Node;
    rawNameIndex(): number;
    edgeIndexesStart(): number;
    edgeIndexesEnd(): number;
    ordinal(): number;
    nextNodeIndex(): number;
    rawType(): number;
    isFlatConsString(): boolean;
    detachedness(): DOMLinkState;
    setDetachedness(detachedness: DOMLinkState): void;
}
export declare class HeapSnapshotNodeIterator implements HeapSnapshotItemIterator {
    #private;
    node: HeapSnapshotNode;
    constructor(node: HeapSnapshotNode);
    hasNext(): boolean;
    item(): HeapSnapshotNode;
    next(): void;
}
export declare class HeapSnapshotIndexRangeIterator implements HeapSnapshotItemIterator {
    #private;
    constructor(itemProvider: HeapSnapshotItemIndexProvider, indexes: number[] | Uint32Array);
    hasNext(): boolean;
    item(): HeapSnapshotItem;
    next(): void;
}
export declare class HeapSnapshotFilteredIterator implements HeapSnapshotItemIterator {
    #private;
    constructor(iterator: HeapSnapshotItemIterator, filter?: ((arg0: HeapSnapshotItem) => boolean));
    hasNext(): boolean;
    item(): HeapSnapshotItem;
    next(): void;
    private skipFilteredItems;
}
export declare class HeapSnapshotProgress {
    #private;
    constructor(dispatcher?: HeapSnapshotWorkerDispatcher);
    updateStatus(status: string): void;
    updateProgress(title: string, value: number, total: number): void;
    reportProblem(error: string): void;
    private sendUpdateEvent;
}
export interface Profile {
    root_index: number;
    nodes: Platform.TypedArrayUtilities.BigUint32Array;
    edges: Platform.TypedArrayUtilities.BigUint32Array;
    snapshot: HeapSnapshotHeader;
    samples: number[];
    strings: string[];
    locations: number[];
    trace_function_infos: Uint32Array;
    trace_tree: Object;
}
export type LiveObjects = Record<number, {
    count: number;
    size: number;
    ids: number[];
}>;
interface SecondaryInitArgumentsStep1 {
    edgeToNodeOrdinals: Uint32Array;
    firstEdgeIndexes: Uint32Array;
    nodeCount: number;
    edgeFieldsCount: number;
    nodeFieldCount: number;
}
interface SecondaryInitArgumentsStep2 {
    rootNodeOrdinal: number;
    essentialEdgesBuffer: ArrayBuffer;
}
interface SecondaryInitArgumentsStep3 {
    nodeSelfSizes: Uint32Array;
}
type ArgumentsToBuildRetainers = SecondaryInitArgumentsStep1;
interface Retainers {
    firstRetainerIndex: Uint32Array;
    retainingNodes: Uint32Array;
    retainingEdges: Uint32Array;
}
interface ArgumentsToComputeDominatorsAndRetainedSizes extends SecondaryInitArgumentsStep1, Retainers, SecondaryInitArgumentsStep2 {
    essentialEdges: Platform.TypedArrayUtilities.BitVector;
    port: MessagePort;
    nodeSelfSizesPromise: Promise<Uint32Array>;
}
interface DominatorsAndRetainedSizes {
    dominatorsTree: Uint32Array;
    retainedSizes: Float64Array;
}
interface ArgumentsToBuildDominatedNodes extends ArgumentsToComputeDominatorsAndRetainedSizes, DominatorsAndRetainedSizes {
}
interface DominatedNodes {
    firstDominatedNodeIndex: Uint32Array;
    dominatedNodes: Uint32Array;
}
export declare class SecondaryInitManager {
    argsStep1: Promise<SecondaryInitArgumentsStep1>;
    argsStep2: Promise<SecondaryInitArgumentsStep2>;
    argsStep3: Promise<SecondaryInitArgumentsStep3>;
    constructor(port: MessagePort);
    private getNodeSelfSizes;
    private initialize;
}
/**
 * DOM node link state.
 */
declare const enum DOMLinkState {
    UNKNOWN = 0,
    ATTACHED = 1,
    DETACHED = 2
}
export declare abstract class HeapSnapshot {
    #private;
    nodes: Platform.TypedArrayUtilities.BigUint32Array;
    containmentEdges: Platform.TypedArrayUtilities.BigUint32Array;
    strings: string[];
    rootNodeIndexInternal: number;
    profile: Profile;
    nodeTypeOffset: number;
    nodeNameOffset: number;
    nodeIdOffset: number;
    nodeSelfSizeOffset: number;
    nodeTraceNodeIdOffset: number;
    nodeFieldCount: number;
    nodeTypes: string[];
    nodeArrayType: number;
    nodeHiddenType: number;
    nodeObjectType: number;
    nodeNativeType: number;
    nodeStringType: number;
    nodeConsStringType: number;
    nodeSlicedStringType: number;
    nodeCodeType: number;
    nodeSyntheticType: number;
    nodeClosureType: number;
    nodeRegExpType: number;
    edgeFieldsCount: number;
    edgeTypeOffset: number;
    edgeNameOffset: number;
    edgeToNodeOffset: number;
    edgeTypes: string[];
    edgeElementType: number;
    edgeHiddenType: number;
    edgeInternalType: number;
    edgeShortcutType: number;
    edgeWeakType: number;
    edgeInvisibleType: number;
    edgePropertyType: number;
    nodeCount: number;
    retainedSizes: Float64Array;
    firstEdgeIndexes: Uint32Array;
    retainingNodes: Uint32Array;
    retainingEdges: Uint32Array;
    firstRetainerIndex: Uint32Array;
    nodeDistances: Int32Array;
    firstDominatedNodeIndex: Uint32Array;
    dominatedNodes: Uint32Array;
    dominatorsTree: Uint32Array;
    nodeDetachednessAndClassIndexOffset: number;
    detachednessAndClassIndexArray?: Uint32Array;
    constructor(profile: Profile, progress: HeapSnapshotProgress);
    initialize(secondWorker: MessagePort): Promise<void>;
    private startInitStep1InSecondThread;
    private startInitStep2InSecondThread;
    private startInitStep3InSecondThread;
    private installResultsFromSecondThread;
    private buildEdgeIndexes;
    static buildRetainers(inputs: ArgumentsToBuildRetainers): Retainers;
    abstract createNode(_nodeIndex?: number): HeapSnapshotNode;
    abstract createEdge(_edgeIndex: number): JSHeapSnapshotEdge;
    abstract createRetainingEdge(_retainerIndex: number): JSHeapSnapshotRetainerEdge;
    private allNodes;
    rootNode(): HeapSnapshotNode;
    get rootNodeIndex(): number;
    get totalSize(): number;
    private createFilter;
    search(searchConfig: HeapSnapshotModel.HeapSnapshotModel.SearchConfig, nodeFilter: HeapSnapshotModel.HeapSnapshotModel.NodeFilter): number[];
    aggregatesWithFilter(nodeFilter: HeapSnapshotModel.HeapSnapshotModel.NodeFilter): Record<string, HeapSnapshotModel.HeapSnapshotModel.Aggregate>;
    private createNodeIdFilter;
    private createAllocationStackFilter;
    private createNamedFilter;
    getAggregatesByClassKey(sortedIndexes: boolean, key?: string, filter?: ((arg0: HeapSnapshotNode) => boolean)): Record<string, HeapSnapshotModel.HeapSnapshotModel.Aggregate>;
    allocationTracesTops(): HeapSnapshotModel.HeapSnapshotModel.SerializedAllocationNode[];
    allocationNodeCallers(nodeId: number): HeapSnapshotModel.HeapSnapshotModel.AllocationNodeCallers;
    allocationStack(nodeIndex: number): HeapSnapshotModel.HeapSnapshotModel.AllocationStackFrame[] | null;
    aggregatesForDiff(interfaceDefinitions: string): Record<string, HeapSnapshotModel.HeapSnapshotModel.AggregateForDiff>;
    isUserRoot(_node: HeapSnapshotNode): boolean;
    calculateShallowSizes(): void;
    calculateDistances(isForRetainersView: boolean, filter?: ((arg0: HeapSnapshotNode, arg1: HeapSnapshotEdge) => boolean)): void;
    private bfs;
    private buildAggregates;
    private calculateClassesRetainedSize;
    private sortAggregateIndexes;
    tryParseWeakMapEdgeName(edgeNameIndex: number): {
        duplicatedPart: string;
        tableId: string;
    } | undefined;
    private computeIsEssentialEdge;
    private initEssentialEdges;
    static hasOnlyWeakRetainers(inputs: ArgumentsToComputeDominatorsAndRetainedSizes, nodeOrdinal: number): boolean;
    static calculateDominatorsAndRetainedSizes(inputs: ArgumentsToComputeDominatorsAndRetainedSizes): Promise<DominatorsAndRetainedSizes>;
    static buildDominatedNodes(inputs: ArgumentsToBuildDominatedNodes): DominatedNodes;
    private calculateObjectNames;
    interfaceDefinitions(): string;
    private isPlainJSObject;
    private inferInterfaceDefinitions;
    private applyInterfaceDefinitions;
    /**
     * Iterates children of a node.
     */
    private iterateFilteredChildren;
    /**
     * Adds a string to the snapshot.
     */
    private addString;
    /**
     * The phase propagates whether a node is attached or detached through the
     * graph and adjusts the low-level representation of nodes.
     *
     * State propagation:
     * 1. Any object reachable from an attached object is itself attached.
     * 2. Any object reachable from a detached object that is not already
     *    attached is considered detached.
     *
     * Representation:
     * - Name of any detached node is changed from "<Name>"" to
     *   "Detached <Name>".
     */
    private propagateDOMState;
    private buildSamples;
    private buildLocationMap;
    getLocation(nodeIndex: number): HeapSnapshotModel.HeapSnapshotModel.Location | null;
    getSamples(): HeapSnapshotModel.HeapSnapshotModel.Samples | null;
    calculateFlags(): void;
    calculateStatistics(): void;
    userObjectsMapAndFlag(): {
        map: Uint8Array;
        flag: number;
    } | null;
    calculateSnapshotDiff(baseSnapshotId: string, baseSnapshotAggregates: Record<string, HeapSnapshotModel.HeapSnapshotModel.AggregateForDiff>): Record<string, HeapSnapshotModel.HeapSnapshotModel.Diff>;
    private calculateDiffForClass;
    private nodeForSnapshotObjectId;
    classKeyFromClassKeyInternal(key: string | number): string;
    nodeClassKey(snapshotObjectId: number): string | null;
    idsOfObjectsWithName(name: string): number[];
    createEdgesProvider(nodeIndex: number): HeapSnapshotEdgesProvider;
    createEdgesProviderForTest(nodeIndex: number, filter: ((arg0: HeapSnapshotEdge) => boolean) | null): HeapSnapshotEdgesProvider;
    retainingEdgesFilter(): ((arg0: HeapSnapshotEdge) => boolean) | null;
    containmentEdgesFilter(): ((arg0: HeapSnapshotEdge) => boolean) | null;
    createRetainingEdgesProvider(nodeIndex: number): HeapSnapshotEdgesProvider;
    createAddedNodesProvider(baseSnapshotId: string, classKey: string): HeapSnapshotNodesProvider;
    createDeletedNodesProvider(nodeIndexes: number[]): HeapSnapshotNodesProvider;
    createNodesProviderForClass(classKey: string, nodeFilter: HeapSnapshotModel.HeapSnapshotModel.NodeFilter): HeapSnapshotNodesProvider;
    private maxJsNodeId;
    updateStaticData(): HeapSnapshotModel.HeapSnapshotModel.StaticData;
    ignoreNodeInRetainersView(nodeIndex: number): void;
    unignoreNodeInRetainersView(nodeIndex: number): void;
    unignoreAllNodesInRetainersView(): void;
    areNodesIgnoredInRetainersView(): boolean;
    getDistanceForRetainersView(nodeIndex: number): number;
    isNodeIgnoredInRetainersView(nodeIndex: number): boolean;
    isEdgeIgnoredInRetainersView(edgeIndex: number): boolean;
}
interface HeapSnapshotMetaInfo {
    location_fields: string[];
    node_fields: string[];
    node_types: string[][];
    edge_fields: string[];
    edge_types: string[][];
    trace_function_info_fields: string[];
    trace_node_fields: string[];
    sample_fields: string[];
    type_strings: Record<string, string>;
}
export interface HeapSnapshotHeader {
    title: string;
    meta: HeapSnapshotMetaInfo;
    node_count: number;
    edge_count: number;
    trace_function_count: number;
    root_index: number;
    extra_native_bytes?: number;
}
export declare abstract class HeapSnapshotItemProvider {
    #private;
    protected readonly iterator: HeapSnapshotItemIterator;
    protected iterationOrder: number[] | null;
    protected currentComparator: HeapSnapshotModel.HeapSnapshotModel.ComparatorConfig | null;
    constructor(iterator: HeapSnapshotItemIterator, indexProvider: HeapSnapshotItemIndexProvider);
    protected createIterationOrder(): void;
    isEmpty(): boolean;
    serializeItemsRange(begin: number, end: number): HeapSnapshotModel.HeapSnapshotModel.ItemsRange;
    sortAndRewind(comparator: HeapSnapshotModel.HeapSnapshotModel.ComparatorConfig): void;
    abstract sort(comparator: HeapSnapshotModel.HeapSnapshotModel.ComparatorConfig, leftBound: number, rightBound: number, windowLeft: number, windowRight: number): void;
}
export declare class HeapSnapshotEdgesProvider extends HeapSnapshotItemProvider {
    snapshot: HeapSnapshot;
    constructor(snapshot: HeapSnapshot, filter: ((arg0: HeapSnapshotEdge) => boolean) | null, edgesIter: HeapSnapshotEdgeIterator | HeapSnapshotRetainerEdgeIterator, indexProvider: HeapSnapshotItemIndexProvider);
    sort(comparator: HeapSnapshotModel.HeapSnapshotModel.ComparatorConfig, leftBound: number, rightBound: number, windowLeft: number, windowRight: number): void;
}
export declare class HeapSnapshotNodesProvider extends HeapSnapshotItemProvider {
    snapshot: HeapSnapshot;
    constructor(snapshot: HeapSnapshot, nodeIndexes: number[] | Uint32Array);
    nodePosition(snapshotObjectId: number): number;
    private buildCompareFunction;
    sort(comparator: HeapSnapshotModel.HeapSnapshotModel.ComparatorConfig, leftBound: number, rightBound: number, windowLeft: number, windowRight: number): void;
}
export declare class JSHeapSnapshot extends HeapSnapshot {
    #private;
    readonly nodeFlags: {
        canBeQueried: number;
        detachedDOMTreeNode: number;
        pageObject: number;
    };
    private flags;
    constructor(profile: Profile, progress: HeapSnapshotProgress);
    createNode(nodeIndex?: number): JSHeapSnapshotNode;
    createEdge(edgeIndex: number): JSHeapSnapshotEdge;
    createRetainingEdge(retainerIndex: number): JSHeapSnapshotRetainerEdge;
    containmentEdgesFilter(): (arg0: HeapSnapshotEdge) => boolean;
    retainingEdgesFilter(): (arg0: HeapSnapshotEdge) => boolean;
    calculateFlags(): void;
    calculateShallowSizes(): void;
    calculateDistances(isForRetainersView: boolean): void;
    isUserRoot(node: HeapSnapshotNode): boolean;
    userObjectsMapAndFlag(): {
        map: Uint8Array;
        flag: number;
    } | null;
    flagsOfNode(node: HeapSnapshotNode): number;
    private markDetachedDOMTreeNodes;
    private markQueriableHeapObjects;
    private markPageOwnedNodes;
    calculateStatistics(): void;
    private calculateArraySize;
    getStatistics(): HeapSnapshotModel.HeapSnapshotModel.Statistics;
}
export declare function createJSHeapSnapshotForTesting(profile: Profile): Promise<JSHeapSnapshot>;
export declare class JSHeapSnapshotNode extends HeapSnapshotNode {
    #private;
    canBeQueried(): boolean;
    name(): string;
    private consStringName;
    static formatPropertyName(name: string): string;
    id(): number;
    isHidden(): boolean;
    isArray(): boolean;
    isSynthetic(): boolean;
    isNative(): boolean;
    isUserRoot(): boolean;
    isDocumentDOMTreesRoot(): boolean;
    serialize(): HeapSnapshotModel.HeapSnapshotModel.Node;
}
export declare class JSHeapSnapshotEdge extends HeapSnapshotEdge {
    clone(): JSHeapSnapshotEdge;
    hasStringName(): boolean;
    isElement(): boolean;
    isHidden(): boolean;
    isWeak(): boolean;
    isInternal(): boolean;
    isInvisible(): boolean;
    isShortcut(): boolean;
    name(): string;
    toString(): string;
    private hasStringNameInternal;
    private nameInternal;
    private nameOrIndex;
    rawType(): number;
    nameIndex(): number;
}
export declare class JSHeapSnapshotRetainerEdge extends HeapSnapshotRetainerEdge {
    clone(): JSHeapSnapshotRetainerEdge;
    isHidden(): boolean;
    isInvisible(): boolean;
    isShortcut(): boolean;
    isWeak(): boolean;
}
export interface AggregatedInfo {
    count: number;
    distance: number;
    self: number;
    maxRet: number;
    name: string;
    idxs: number[];
}
export {};
