import * as Types from '../types/types.js';
import { data as flowsHandlerData } from './FlowsHandler.js';
import { data as rendererHandlerData } from './RendererHandler.js';
const schedulerToRunEntryPoints = new Map();
export function reset() {
    schedulerToRunEntryPoints.clear();
}
export function handleEvent(_) {
}
export async function finalize() {
    const { flows } = flowsHandlerData();
    const { entryToNode } = rendererHandlerData();
    // Process async task flows
    for (const flow of flows) {
        const asyncTaskScheduled = flow.at(0);
        if (!asyncTaskScheduled || !Types.Events.isDebuggerAsyncTaskScheduled(asyncTaskScheduled)) {
            continue;
        }
        const asyncTaskRun = flow.at(1);
        if (!asyncTaskRun || !Types.Events.isDebuggerAsyncTaskRun(asyncTaskRun)) {
            // Unexpected flow shape, ignore.
            continue;
        }
        const asyncCaller = findNearestProfileCallAncestor(asyncTaskScheduled, entryToNode);
        if (!asyncCaller) {
            // Unexpected async call trace data shape, ignore.
            continue;
        }
        const asyncEntryPoints = findNearestJsInvocationDescendants(asyncTaskRun, entryToNode);
        if (!asyncEntryPoints) {
            // Unexpected async call trace data shape, ignore.
            continue;
        }
        schedulerToRunEntryPoints.set(asyncCaller, asyncEntryPoints);
    }
}
/**
 * Given a DebuggerAsyncTaskScheduled event, returns its closest
 * ProfileCall ancestor, which represents the JS call that scheduled
 * the async task.
 */
function findNearestProfileCallAncestor(asyncTaskScheduled, entryToNode) {
    let node = entryToNode.get(asyncTaskScheduled)?.parent;
    while (node) {
        if (Types.Events.isProfileCall(node.entry)) {
            return node.entry;
        }
        node = node.parent;
    }
    return null;
}
/**
 * Entrypoints to JS execution in the timeline. We ignore those starting
 * with 'v8' because they aren't shown in the timeline, and ultimately
 * this function's output results in "initiated" events, so ideally this
 * returns events that end up in the flame chart.
 */
function acceptJSInvocationsPredicate(event) {
    return Types.Events.isJSInvocationEvent(event) && !event.name.startsWith('v8') && !event.name.startsWith('V8');
}
/**
 * Given a DebuggerAsyncTaskRun event, returns its closest JS entry
 * point descendants, which represent the task being scheduled.
 *
 * We return multiple entry points beacuse some of these are built
 * from samples (like `consoleTask.run()` ). Because of limitations with
 * sampling, multiple entry points can mistakenly be made from a single
 * entry point, so we return all of them to ensure the async stack is
 * in every event that applies.
 */
function findNearestJsInvocationDescendants(asyncTaskRun, entryToNode) {
    // Ignore descendants of other DebuggerAsyncTaskRuns since they
    // are part of another async task and have to be handled separately
    return findFirstDescendantsOfType(asyncTaskRun, entryToNode, acceptJSInvocationsPredicate, Types.Events.isDebuggerAsyncTaskRun);
}
/**
 * Given a root event returns all the top level descendants that meet a
 * predicate condition (predicateAccept) while ignoring subtrees whose
 * top event meets an ignore condition (predicateIgnore).
 */
function findFirstDescendantsOfType(root, entryToNode, predicateAccept, predicateIgnore) {
    const node = entryToNode.get(root);
    if (!node) {
        return [];
    }
    const childrenGroups = [[...node.children]];
    const firstDescendants = [];
    for (let i = 0; i < childrenGroups.length; i++) {
        const siblings = childrenGroups[i];
        for (let j = 0; j < siblings.length; j++) {
            const node = siblings[j];
            if (predicateAccept(node.entry)) {
                firstDescendants.push(node.entry);
            }
            else if (!predicateIgnore(node.entry)) {
                childrenGroups.push([...node.children]);
            }
        }
    }
    return firstDescendants;
}
export function data() {
    return {
        schedulerToRunEntryPoints,
    };
}
export function deps() {
    return ['Renderer', 'Flows'];
}
//# sourceMappingURL=AsyncCallStacksHandler.js.map