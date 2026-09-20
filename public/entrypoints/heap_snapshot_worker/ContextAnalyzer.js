// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export function analyzeContexts(snapshot) {
    // (1) Parse embedded scope metadata from the snapshot.
    const scopesByScript = parseEmbeddedScopes(snapshot);
    // (2) Scan the heap to collect scripts, contexts, live closures, and associate function ScopeInfos
    // with scripts.
    const scan = scanHeap(snapshot);
    // (3) Group live closures by function scope and record the context chains they can reach.
    const liveFunctionsByScript = buildLiveFunctions(snapshot, scan.liveClosures);
    // (4) Correlate contexts and their field values with embedded scopes.
    const { scopes, scriptsWithoutScopes } = correlateContextsWithScopes(snapshot, scan, scopesByScript);
    // (5) Classify fields per context and build the result objects.
    const scopeAnalyses = classifyFields(snapshot, scopes, liveFunctionsByScript);
    // (6) Sort dead fields, contexts, and scopes, then return the analysis.
    return sortAndBuildResult(scopeAnalyses, scriptsWithoutScopes);
}
function parseEmbeddedScopes(snapshot) {
    const scopesByScript = new Map();
    const profile = snapshot.profile;
    const rawScopes = profile.scopes ?? [];
    const rawVars = profile.scope_context_vars ?? [];
    const rawUses = profile.scope_uses ?? [];
    const meta = profile.snapshot.meta;
    const scopeFields = meta.scope_fields ?? [];
    const varFields = meta.scope_context_var_fields ?? [];
    const useFields = meta.scope_use_fields ?? [];
    const scopeStride = scopeFields.length;
    const varStride = varFields.length;
    const useStride = useFields.length;
    if (scopeStride === 0) {
        return scopesByScript;
    }
    const scriptNodeIndexOffset = scopeFields.indexOf('script_node_index');
    const scopeIdOffset = scopeFields.indexOf('scope_id');
    const depthOffset = scopeFields.indexOf('depth');
    const varsCountOffset = scopeFields.indexOf('scope_context_vars_count');
    const usesCountOffset = scopeFields.indexOf('scope_uses_count');
    const varNameOffset = varFields.indexOf('name');
    const useDeclaringScopeIdOffset = useFields.indexOf('declaring_scope_id');
    const useSlotIndexOffset = useFields.indexOf('slot_index');
    const strings = snapshot.strings;
    // Pass 1: Create all scopes and variable definitions, and link parents via depth.
    let varOffset = 0;
    let currentScriptNodeIndex;
    const scopeStack = [];
    for (let i = 0; i < rawScopes.length; i += scopeStride) {
        const scriptNodeIndex = rawScopes[i + scriptNodeIndexOffset];
        const scopeId = rawScopes[i + scopeIdOffset];
        const depth = rawScopes[i + depthOffset];
        const varsCount = rawScopes[i + varsCountOffset];
        const variables = [];
        for (let j = 0; j < varsCount; ++j) {
            const nameIndex = rawVars[varOffset + j * varStride + varNameOffset];
            variables.push({
                name: strings[nameIndex],
                slotIndex: j,
                uses: [],
            });
        }
        varOffset += varsCount * varStride;
        const scope = {
            scriptNodeIndex,
            scopeId,
            children: [],
            variables,
        };
        if (currentScriptNodeIndex !== scriptNodeIndex) {
            currentScriptNodeIndex = scriptNodeIndex;
            scopeStack.length = 0;
        }
        if (depth > 0) {
            const parent = scopeStack[depth - 1];
            scope.parent = parent;
            parent.children.push(scope);
        }
        // The tree hierarchy is encoded through a depth field in the heap snapshot. Here we
        // set the scope as the innermost scope by trimming the stack.
        scopeStack[depth] = scope;
        scopeStack.length = depth + 1; // Trim the stack.
        let scriptScopes = scopesByScript.get(scriptNodeIndex);
        if (!scriptScopes) {
            scriptScopes = new Map();
            scopesByScript.set(scriptNodeIndex, scriptScopes);
        }
        scriptScopes.set(scopeId, scope);
    }
    // Pass 2: Resolve variable uses directly from rawUses.
    let useOffset = 0;
    for (let i = 0; i < rawScopes.length; i += scopeStride) {
        const scriptNodeIndex = rawScopes[i + scriptNodeIndexOffset];
        const scopeId = rawScopes[i + scopeIdOffset];
        const usesCount = rawScopes[i + usesCountOffset];
        const scope = scopesByScript.get(scriptNodeIndex)?.get(scopeId);
        if (scope) {
            for (let j = 0; j < usesCount; ++j) {
                const declaringScopeId = rawUses[useOffset + j * useStride + useDeclaringScopeIdOffset];
                const slotIndex = rawUses[useOffset + j * useStride + useSlotIndexOffset];
                const declaringScope = scopesByScript.get(scriptNodeIndex)?.get(declaringScopeId);
                const variable = declaringScope?.variables[slotIndex];
                if (variable && !variable.uses.includes(scope)) {
                    variable.uses.push(scope);
                }
            }
        }
        useOffset += usesCount * useStride;
    }
    return scopesByScript;
}
function scanHeap(snapshot) {
    const scripts = new Map();
    const contextNodes = [];
    const liveClosures = [];
    const scopeInfoScriptNodeIndexes = new Map();
    const node = snapshot.createNode();
    const nodes = snapshot.nodes;
    const nodeFieldCount = snapshot.nodeFieldCount;
    const nodeClosureType = snapshot.nodeClosureType;
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex += nodeFieldCount) {
        node.nodeIndex = nodeIndex;
        const rawName = node.rawName();
        if (rawName.startsWith('system / Script')) {
            processScript(scripts, node);
        }
        else if (snapshot.isContextObject(node)) {
            processContext(contextNodes, node);
        }
        else if (node.rawType() === nodeClosureType) {
            processClosure(liveClosures, node);
        }
        else if (rawName.startsWith('system / SharedFunctionInfo')) {
            processSharedFunctionInfo(scopeInfoScriptNodeIndexes, node);
        }
    }
    return { scripts, contextNodes, liveClosures, scopeInfoScriptNodeIndexes };
}
function processScript(scripts, node) {
    const rawName = node.rawName();
    const scriptNodeIndex = node.nodeIndex;
    const scriptNamePrefix = 'system / Script / ';
    let name = rawName.startsWith(scriptNamePrefix) ? rawName.substring(scriptNamePrefix.length) : '';
    if (!name) {
        name = node.findInternalEdgeTarget('source_url')?.name() ?? '';
    }
    scripts.set(scriptNodeIndex, {
        name,
        nodeId: node.id(),
    });
}
function processContext(contextNodes, node) {
    const scopeInfoNodeIndex = node.findInternalEdgeTarget('scope_info')?.nodeIndex;
    if (scopeInfoNodeIndex === undefined) {
        return;
    }
    contextNodes.push({
        contextNodeIndex: node.nodeIndex,
        contextNodeId: node.id(),
        scopeInfoNodeIndex,
    });
}
function processClosure(liveClosures, node) {
    const sharedFunctionInfo = node.findInternalEdgeTarget('shared');
    const closureContext = node.findInternalEdgeTarget('context');
    if (!sharedFunctionInfo || !closureContext) {
        return;
    }
    const script = sharedFunctionInfo.findInternalEdgeTarget('script');
    if (!script) {
        return;
    }
    const scopeId = sharedFunctionInfo.findInternalEdgeTarget('scope_id')?.nodeValueAsInt();
    if (scopeId !== undefined) {
        liveClosures.push({
            contextNodeIndex: closureContext.nodeIndex,
            scriptNodeIndex: script.nodeIndex,
            scopeId,
        });
    }
}
function processSharedFunctionInfo(scopeInfoScriptNodeIndexes, node) {
    const scopeInfo = node.findInternalEdgeTarget('name_or_scope_info');
    const script = node.findInternalEdgeTarget('script');
    if (scopeInfo?.rawName() !== 'system / ScopeInfo' || !script?.rawName().startsWith('system / Script')) {
        return;
    }
    scopeInfoScriptNodeIndexes.set(scopeInfo.nodeIndex, script.nodeIndex);
}
function buildLiveFunctions(snapshot, liveClosures) {
    const liveFunctionsByScript = new Map();
    const node = snapshot.createNode();
    for (const closure of liveClosures) {
        let scriptFunctions = liveFunctionsByScript.get(closure.scriptNodeIndex);
        if (!scriptFunctions) {
            scriptFunctions = new Map();
            liveFunctionsByScript.set(closure.scriptNodeIndex, scriptFunctions);
        }
        let liveFunction = scriptFunctions.get(closure.scopeId);
        if (!liveFunction) {
            liveFunction = {
                contextNodeIndexes: new Set(),
            };
            scriptFunctions.set(closure.scopeId, liveFunction);
        }
        let contextNodeIndex = closure.contextNodeIndex;
        while (contextNodeIndex !== undefined && !liveFunction.contextNodeIndexes.has(contextNodeIndex)) {
            node.nodeIndex = contextNodeIndex;
            if (!snapshot.isContextObject(node)) {
                break;
            }
            liveFunction.contextNodeIndexes.add(contextNodeIndex);
            contextNodeIndex = node.findInternalEdgeTarget('previous')?.nodeIndex;
        }
    }
    return liveFunctionsByScript;
}
function correlateContextsWithScopes(snapshot, scan, scopesByScript) {
    const scriptsWithoutScopesByScript = new Map();
    const scopes = new Map();
    const node = snapshot.createNode();
    for (const context of scan.contextNodes) {
        const scopeInfoNodeIndex = context.scopeInfoNodeIndex;
        const existingScope = scopes.get(scopeInfoNodeIndex);
        if (existingScope) {
            const fieldValueNodeIndexes = [];
            node.nodeIndex = context.contextNodeIndex;
            for (const edges = node.edges(); edges.hasNext(); edges.next()) {
                const edge = edges.item();
                if (edge.type() === 'context') {
                    fieldValueNodeIndexes.push(edge.nodeIndex());
                }
            }
            existingScope.contexts.push({
                contextNodeIndex: context.contextNodeIndex,
                contextNodeId: context.contextNodeId,
                fieldValueNodeIndexes,
            });
            continue;
        }
        node.nodeIndex = scopeInfoNodeIndex;
        const scopeId = node.findInternalEdgeTarget('scope_id')?.nodeValueAsInt();
        if (scopeId === undefined) {
            continue;
        }
        const scopeInfoNodeId = node.id();
        const scopeStart = node.findInternalEdgeTarget('start_position')?.nodeValueAsInt() ?? 0;
        const scopeEnd = node.findInternalEdgeTarget('end_position')?.nodeValueAsInt() ?? 0;
        const scopeName = node.findInternalEdgeTarget('function_name')?.name();
        const scriptNodeIndex = resolveScopeInfoScriptNodeIndex(snapshot, scan.scopeInfoScriptNodeIndexes, scopeInfoNodeIndex);
        const script = scriptNodeIndex !== undefined ? scan.scripts.get(scriptNodeIndex) : undefined;
        if (scriptNodeIndex === undefined || !script) {
            continue;
        }
        const existingScriptWithoutScopes = scriptsWithoutScopesByScript.get(scriptNodeIndex);
        if (existingScriptWithoutScopes) {
            existingScriptWithoutScopes.contextCount++;
            continue;
        }
        const embeddedScopes = scopesByScript.get(scriptNodeIndex);
        if (!embeddedScopes) {
            scriptsWithoutScopesByScript.set(scriptNodeIndex, {
                scriptNodeIndex,
                scriptNodeId: script.nodeId,
                scriptName: script.name,
                contextCount: 1,
            });
            continue;
        }
        const embeddedScope = embeddedScopes.get(scopeId);
        if (!embeddedScope) {
            continue;
        }
        const fieldNames = [];
        const fieldValueNodeIndexes = [];
        node.nodeIndex = context.contextNodeIndex;
        for (const edges = node.edges(); edges.hasNext(); edges.next()) {
            const edge = edges.item();
            if (edge.type() === 'context') {
                fieldNames.push(edge.name());
                fieldValueNodeIndexes.push(edge.nodeIndex());
            }
        }
        scopes.set(scopeInfoNodeIndex, {
            scopeInfoNodeIndex,
            scopeInfoNodeId,
            scriptNodeIndex,
            scriptNodeId: script.nodeId,
            scriptName: script.name,
            scopeName,
            scopeStart,
            scopeEnd,
            scope: embeddedScope,
            fieldNames,
            contexts: [{
                    contextNodeIndex: context.contextNodeIndex,
                    contextNodeId: context.contextNodeId,
                    fieldValueNodeIndexes,
                }],
        });
    }
    return {
        scopes,
        scriptsWithoutScopes: [...scriptsWithoutScopesByScript.values()],
    };
}
function resolveScopeInfoScriptNodeIndex(snapshot, scopeInfoScriptNodeIndexes, scopeInfoNodeIndex) {
    if (scopeInfoScriptNodeIndexes.has(scopeInfoNodeIndex)) {
        return scopeInfoScriptNodeIndexes.get(scopeInfoNodeIndex);
    }
    const visited = [];
    const seen = new Set();
    const node = snapshot.createNode();
    let currentNodeIndex = scopeInfoNodeIndex;
    let scriptNodeIndex;
    while (!seen.has(currentNodeIndex)) {
        if (scopeInfoScriptNodeIndexes.has(currentNodeIndex)) {
            scriptNodeIndex = scopeInfoScriptNodeIndexes.get(currentNodeIndex);
            break;
        }
        seen.add(currentNodeIndex);
        visited.push(currentNodeIndex);
        node.nodeIndex = currentNodeIndex;
        const outerScopeInfo = node.findInternalEdgeTarget('outer_scope_info');
        if (!outerScopeInfo) {
            break;
        }
        currentNodeIndex = outerScopeInfo.nodeIndex;
    }
    for (const visitedNodeIndex of visited) {
        scopeInfoScriptNodeIndexes.set(visitedNodeIndex, scriptNodeIndex);
    }
    return scriptNodeIndex;
}
function classifyFields(snapshot, scopes, liveFunctionsByScript) {
    const scopeAnalyses = [];
    const node = snapshot.createNode();
    for (const scope of scopes.values()) {
        const scopeContexts = [];
        for (const context of scope.contexts) {
            let contextDeadFieldsRetainedSizeSum = 0;
            const deadFields = [];
            for (let fieldIndex = 0; fieldIndex < context.fieldValueNodeIndexes.length; ++fieldIndex) {
                const fieldName = scope.fieldNames[fieldIndex];
                const variable = scope.scope.variables.find(v => v.name === fieldName);
                if (!variable) {
                    // Missing variable definition. Nothing to check in this case.
                    continue;
                }
                if (isVariableUsedInContext(liveFunctionsByScript, scope.scriptNodeIndex, context.contextNodeIndex, variable)) {
                    // Only report dead fields.
                    continue;
                }
                const fieldValueNodeIndex = context.fieldValueNodeIndexes[fieldIndex];
                node.nodeIndex = fieldValueNodeIndex;
                const retainedSize = node.retainedSize();
                deadFields.push({
                    name: fieldName,
                    valueNodeIndex: fieldValueNodeIndex,
                    valueNodeId: node.id(),
                    valueName: node.name(),
                    valueType: node.type(),
                    selfSize: node.selfSize(),
                    retainedSize,
                });
                contextDeadFieldsRetainedSizeSum += retainedSize;
            }
            if (deadFields.length === 0) {
                continue;
            }
            node.nodeIndex = context.contextNodeIndex;
            scopeContexts.push({
                contextNodeIndex: context.contextNodeIndex,
                contextNodeId: node.id(),
                retainedSize: node.retainedSize(),
                deadFieldsRetainedSizeSum: contextDeadFieldsRetainedSizeSum,
                deadFields,
            });
        }
        if (scopeContexts.length === 0) {
            continue;
        }
        scopeAnalyses.push({
            scopeInfoNodeIndex: scope.scopeInfoNodeIndex,
            scopeInfoNodeId: scope.scopeInfoNodeId,
            scriptNodeIndex: scope.scriptNodeIndex,
            scriptNodeId: scope.scriptNodeId,
            scriptName: scope.scriptName,
            scopeName: scope.scopeName,
            scopeStart: scope.scopeStart,
            scopeEnd: scope.scopeEnd,
            contextFieldCount: scope.fieldNames.length,
            contexts: scopeContexts,
        });
    }
    return scopeAnalyses;
}
// Determines whether a specific allocated Context instance (`contextNodeIndex`)
// is reachable by any live closure (or inner function instantiable by a live closure)
// that accesses this variable.
function isVariableUsedInContext(liveFunctionsByScript, scriptNodeIndex, contextNodeIndex, variable) {
    const liveFunctionsByScopeId = liveFunctionsByScript.get(scriptNodeIndex);
    if (!liveFunctionsByScopeId) {
        return false;
    }
    for (const usingScope of variable.uses) {
        // Walk up the lexical scope chain from the variable's use site.
        // This checks if the use site is inside a live closure itself (or one
        // of its nested block scopes) OR inside an uninstantiated function
        // enclosed by a live closure.
        //
        // Executing a live outer closure can instantiate any function nested
        // inside it, so those inner functions can access the outer closure's
        // context chain even when no closure exists for them yet on the heap.
        //
        // Example:
        //   function outer() {
        //     const x = 1;
        //     return function middle() {       // <- liveFunction (on heap)
        //       return function inner() {
        //         return x;                    // <- use site
        //       };
        //     };
        //   }
        // No closure object exists on the heap for `inner` yet (so `inner` is
        // not in `liveFunctionsByScript`). However, walking up from `inner`'s
        // scope reaches `middle`. Since `middle` is a live closure on the heap
        // whose context chain includes `outer`'s Context containing `x`,
        // executing `middle()` in the future will instantiate `inner`, giving it
        // access to `outer`'s Context containing `x`.
        for (let curr = usingScope; curr; curr = curr.parent) {
            const liveFunction = liveFunctionsByScopeId.get(curr.scopeId);
            if (liveFunction?.contextNodeIndexes.has(contextNodeIndex)) {
                return true;
            }
        }
    }
    return false;
}
function sortAndBuildResult(scopeAnalyses, scriptsWithoutScopes) {
    const compareContexts = (left, right) => {
        return right.deadFieldsRetainedSizeSum - left.deadFieldsRetainedSizeSum || right.retainedSize - left.retainedSize ||
            left.contextNodeIndex - right.contextNodeIndex;
    };
    for (const scope of scopeAnalyses) {
        for (const context of scope.contexts) {
            context.deadFields.sort((left, right) => right.retainedSize - left.retainedSize);
        }
        scope.contexts.sort(compareContexts);
    }
    scopeAnalyses.sort((left, right) => compareContexts(left.contexts[0], right.contexts[0]));
    scriptsWithoutScopes.sort((left, right) => left.scriptNodeIndex - right.scriptNodeIndex);
    return { scopes: scopeAnalyses, scriptsWithoutScopes };
}
//# sourceMappingURL=ContextAnalyzer.js.map