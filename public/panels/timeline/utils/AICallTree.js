// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../../models/trace/trace.js';
import { nameForEntry } from './EntryName.js';
import { visibleTypes } from './EntryStyles.js';
import { SourceMapsResolver } from './SourceMapsResolver.js';
/** Iterates from a node down through its descendents. If the callback returns true, the loop stops. */
function depthFirstWalk(nodes, callback) {
    for (const node of nodes) {
        if (callback?.(node)) {
            break;
        }
        depthFirstWalk(node.children().values(), callback); // Go deeper.
    }
}
export class AICallTree {
    selectedNode;
    rootNode;
    parsedTrace;
    constructor(selectedNode, rootNode, 
    // TODO: see if we can avoid passing around this entire thing.
    parsedTrace) {
        this.selectedNode = selectedNode;
        this.rootNode = rootNode;
        this.parsedTrace = parsedTrace;
    }
    /**
     * Attempts to build an AICallTree from a given selected event. It also
     * validates that this event is one that we support being used with the AI
     * Assistance panel, which [as of January 2025] means:
     * 1. It is on the main thread.
     * 2. It exists in either the Renderer or Sample handler's entryToNode map.
     * This filters out other events we make such as SyntheticLayoutShifts which are not valid
     * If the event is not valid, or there is an unexpected error building the tree, `null` is returned.
     */
    static from(selectedEvent, parsedTrace) {
        // First: check that the selected event is on the thread we have identified as the main thread.
        const threads = Trace.Handlers.Threads.threadsInTrace(parsedTrace);
        const thread = threads.find(t => t.pid === selectedEvent.pid && t.tid === selectedEvent.tid);
        if (!thread) {
            return null;
        }
        // We allow two thread types to deal with the NodeJS use case.
        // MAIN_THREAD is used when a trace has been generated through Chrome
        //   tracing on a website (and we have a renderer)
        // CPU_PROFILE is used only when we have received a CPUProfile - in this
        //   case all the threads are CPU_PROFILE so we allow those. If we only allow
        //   MAIN_THREAD then we wouldn't ever allow NodeJS users to use the AI
        //   integration.
        if (thread.type !== "MAIN_THREAD" /* Trace.Handlers.Threads.ThreadType.MAIN_THREAD */ &&
            thread.type !== "CPU_PROFILE" /* Trace.Handlers.Threads.ThreadType.CPU_PROFILE */) {
            return null;
        }
        // Ensure that the event is known to either the Renderer or Samples
        // handler. This helps exclude synthetic events we build up for other
        // information such as Layout Shift clusters.
        // We check Renderer + Samples to ensure we support CPU Profiles (which do
        // not populate the Renderer Handler)
        if (!parsedTrace.Renderer.entryToNode.has(selectedEvent) && !parsedTrace.Samples.entryToNode.has(selectedEvent)) {
            return null;
        }
        const { startTime, endTime } = Trace.Helpers.Timing.eventTimingsMilliSeconds(selectedEvent);
        const selectedEventBounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(Trace.Helpers.Timing.milliToMicro(startTime), Trace.Helpers.Timing.milliToMicro(endTime));
        let threadEvents = parsedTrace.Renderer.processes.get(selectedEvent.pid)?.threads.get(selectedEvent.tid)?.entries;
        if (!threadEvents) {
            // None from the renderer: try the samples handler, this might be a CPU trace.
            threadEvents = parsedTrace.Samples.profilesInProcess.get(selectedEvent.pid)?.get(selectedEvent.tid)?.profileCalls;
        }
        if (!threadEvents) {
            console.warn(`AICallTree: could not find thread for selected entry: ${selectedEvent}`);
            return null;
        }
        const overlappingEvents = threadEvents.filter(e => Trace.Helpers.Timing.eventIsInBounds(e, selectedEventBounds));
        const visibleEventsFilter = new Trace.Extras.TraceFilter.VisibleEventsFilter(visibleTypes());
        const customFilter = new AITreeFilter(selectedEvent);
        // Build a tree bounded by the selected event's timestamps, and our other filters applied
        const rootNode = new Trace.Extras.TraceTree.TopDownRootNode(overlappingEvents, {
            filters: [visibleEventsFilter, customFilter],
            startTime,
            endTime,
            includeInstantEvents: true,
        });
        // Walk the tree to find selectedNode
        let selectedNode = null;
        depthFirstWalk([rootNode].values(), node => {
            if (node.event === selectedEvent) {
                selectedNode = node;
                return true;
            }
            return;
        });
        if (selectedNode === null) {
            console.warn(`Selected event ${selectedEvent} not found within its own tree.`);
            return null;
        }
        const instance = new AICallTree(selectedNode, rootNode, parsedTrace);
        // instance.logDebug();
        return instance;
    }
    /** Define precisely how the call tree is serialized. Typically called from within `PerformanceAgent` */
    serialize() {
        const nodeToIdMap = new Map();
        // Keep a map of URLs. We'll output a LUT to keep size down.
        const allUrls = [];
        let nodesStr = '';
        depthFirstWalk(this.rootNode.children().values(), node => {
            nodesStr += AICallTree.stringifyNode(node, this.parsedTrace, this.selectedNode, nodeToIdMap, allUrls);
        });
        let output = '';
        if (allUrls.length) {
            // Output lookup table of URLs within this tree
            output += '\n# All URL #s:\n\n' + allUrls.map((url, index) => `  * ${index}: ${url}`).join('\n');
        }
        output += '\n\n# Call tree:' + nodesStr;
        return output;
    }
    /* This custom YAML-like format with an adjacency list for children is 35% more token efficient than JSON */
    static stringifyNode(node, parsedTrace, selectedNode, nodeToIdMap, allUrls) {
        const event = node.event;
        if (!event) {
            throw new Error('Event required');
        }
        const url = SourceMapsResolver.resolvedURLForEntry(parsedTrace, event);
        // Get the index of the URL within allUrls, and push if needed. Set to -1 if there's no URL here.
        const urlIndex = !url ? -1 : allUrls.indexOf(url) === -1 ? allUrls.push(url) - 1 : allUrls.indexOf(url);
        const children = Array.from(node.children().values());
        // Identifier string includes an id and name:
        //   eg "[13] Parse HTML" or "[45] parseCPUProfileFormatFromFile"
        const getIdentifier = (node) => {
            if (!node.event || typeof node.id !== 'string') {
                throw new Error('ok');
            }
            if (!nodeToIdMap.has(node)) {
                nodeToIdMap.set(node, nodeToIdMap.size + 1);
            }
            return `${nodeToIdMap.get(node)} – ${nameForEntry(node.event, parsedTrace)}`;
        };
        // Round milliseconds because we don't need the precision
        const roundToTenths = (num) => Math.round(num * 10) / 10;
        // Build a multiline string describing this callframe node
        const lines = [
            `\n\nNode: ${getIdentifier(node)}`,
            selectedNode === node && 'Selected: true',
            node.totalTime && `dur: ${roundToTenths(node.totalTime)}`,
            // node.functionSource && `snippet: ${node.functionSource.slice(0, 250)}`,
            node.selfTime && `self: ${roundToTenths(node.selfTime)}`,
            urlIndex !== -1 && `URL #: ${urlIndex}`,
        ];
        if (children.length) {
            lines.push('Children:');
            lines.push(...children.map(node => `  * ${getIdentifier(node)}`));
        }
        return lines.filter(Boolean).join('\n');
    }
    // Only used for debugging.
    logDebug() {
        const str = this.serialize();
        // eslint-disable-next-line no-console
        console.log('🎆', str);
        if (str.length > 45_000) {
            // Manual testing shows 45k fits. 50k doesnt.
            // Max is 32k _tokens_, but tokens to bytes is wishywashy, so... hard to know for sure.
            console.warn('Output will likely not fit in the context window. Expect an AIDA error.');
        }
    }
}
export class AITreeFilter extends Trace.Extras.TraceFilter.TraceFilter {
    #minDuration;
    #selectedEvent;
    constructor(selectedEvent) {
        super();
        // The larger the selected event is, the less small ones matter. We'll exclude items under ½% of the selected event's size
        this.#minDuration = Trace.Types.Timing.Micro((selectedEvent.dur ?? 1) * 0.005);
        this.#selectedEvent = selectedEvent;
    }
    accept(event) {
        if (event === this.#selectedEvent) {
            return true;
        }
        if (event.name === "V8.CompileCode" /* Trace.Types.Events.Name.COMPILE_CODE */) {
            return false;
        }
        return event.dur ? event.dur >= this.#minDuration : false;
    }
}
//# sourceMappingURL=AICallTree.js.map