// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import * as AiAssistance from '../ai_assistance.js';
const SKILLS = AiAssistance.SkillRegistry.SKILLS;
describe('ToolRegistry', () => {
    it('can retrieve executeJavaScript tool by name', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get("executeJavaScript" /* AiAssistance.Tool.ToolName.EXECUTE_JAVASCRIPT */);
        assert.exists(tool);
        assert.instanceOf(tool, AiAssistance.ExecuteJavaScript.ExecuteJavaScriptTool);
        assert.strictEqual(tool?.name, "executeJavaScript" /* AiAssistance.Tool.ToolName.EXECUTE_JAVASCRIPT */);
    });
    it('can retrieve getStyles tool by name', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get("getStyles" /* AiAssistance.Tool.ToolName.GET_STYLES */);
        assert.exists(tool);
        assert.instanceOf(tool, AiAssistance.GetStyles.GetStylesTool);
        assert.strictEqual(tool?.name, "getStyles" /* AiAssistance.Tool.ToolName.GET_STYLES */);
    });
    it('can retrieve getDetailedCallTree tool by name', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get("getDetailedCallTree" /* AiAssistance.Tool.ToolName.GET_DETAILED_CALL_TREE */);
        assert.exists(tool);
        assert.instanceOf(tool, AiAssistance.GetDetailedCallTree.GetDetailedCallTreeTool);
        assert.strictEqual(tool?.name, "getDetailedCallTree" /* AiAssistance.Tool.ToolName.GET_DETAILED_CALL_TREE */);
    });
    it('can retrieve getTraceFunctionCode tool by name', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get("getTraceFunctionCode" /* AiAssistance.Tool.ToolName.GET_TRACE_FUNCTION_CODE */);
        assert.exists(tool);
        assert.instanceOf(tool, AiAssistance.GetTraceFunctionCode.GetTraceFunctionCodeTool);
        assert.strictEqual(tool?.name, "getTraceFunctionCode" /* AiAssistance.Tool.ToolName.GET_TRACE_FUNCTION_CODE */);
    });
    it('can retrieve getTraceResourceContent tool by name', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get("getTraceResourceContent" /* AiAssistance.Tool.ToolName.GET_TRACE_RESOURCE_CONTENT */);
        assert.exists(tool);
        assert.instanceOf(tool, AiAssistance.GetTraceResourceContent.GetTraceResourceContentTool);
        assert.strictEqual(tool?.name, "getTraceResourceContent" /* AiAssistance.Tool.ToolName.GET_TRACE_RESOURCE_CONTENT */);
    });
    it('returns undefined for non-existent tools', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get('nonExistentTool');
        assert.isUndefined(tool);
    });
    it('returns undefined for built-in Object prototype properties', () => {
        const tool = AiAssistance.ToolRegistry.ToolRegistry.get('toString');
        assert.isUndefined(tool);
    });
    it('verifies all tools listed in all active skills exist in the ToolRegistry', () => {
        for (const [skillName, skill] of Object.entries(SKILLS)) {
            for (const toolName of skill.allowedTools) {
                const tool = AiAssistance.ToolRegistry.ToolRegistry.get(toolName);
                assert.exists(tool, `Tool "${toolName}" required by skill "${skillName}" does not exist in ToolRegistry`);
            }
        }
    });
    describe('permissionPrompt', () => {
        function filterToolNames(permissionPrompt) {
            return Object.entries(AiAssistance.ToolRegistry.TOOLS)
                .filter(([, tool]) => tool.permissionPrompt === permissionPrompt)
                .map(([toolName]) => toolName)
                .sort();
        }
        it('uses ALLOW_ONCE for correct tools', () => {
            const expectedToolNames = [
                "executeJavaScript" /* AiAssistance.Tool.ToolName.EXECUTE_JAVASCRIPT */,
                "getCookieValues" /* AiAssistance.Tool.ToolName.GET_COOKIE_VALUES */,
                "getStorageValues" /* AiAssistance.Tool.ToolName.GET_STORAGE_VALUES */,
            ].sort();
            const permissionPrompt = "allow-once" /* AiAssistance.Tool.PermissionPrompt.ALLOW_ONCE */;
            const toolNames = filterToolNames(permissionPrompt);
            assert.deepEqual(toolNames, expectedToolNames);
        });
        it('uses ALLOW_ONCE_OR_ALWAYS for correct tools', () => {
            const expectedToolNames = [].sort();
            const permissionPrompt = "allow-once-or-always" /* AiAssistance.Tool.PermissionPrompt.ALLOW_ONCE_OR_ALWAYS */;
            const toolNames = filterToolNames(permissionPrompt);
            assert.deepEqual(toolNames.sort(), expectedToolNames);
        });
        it('uses NEVER for correct tools', () => {
            const expectedToolNames = [
                "getDetailedCallTree" /* AiAssistance.Tool.ToolName.GET_DETAILED_CALL_TREE */,
                "getElementAccessibilityDetails" /* AiAssistance.Tool.ToolName.GET_ELEMENT_ACCESSIBILITY_DETAILS */,
                "getInsightDetails" /* AiAssistance.Tool.ToolName.GET_INSIGHT_DETAILS */,
                "getLighthouseAudits" /* AiAssistance.Tool.ToolName.GET_LIGHTHOUSE_AUDITS */,
                "getNetworkRequestDetails" /* AiAssistance.Tool.ToolName.GET_NETWORK_REQUEST_DETAILS */,
                "getSourceContent" /* AiAssistance.Tool.ToolName.GET_SOURCE_CONTENT */,
                "getStorageBreakdown" /* AiAssistance.Tool.ToolName.GET_STORAGE_BREAKDOWN */,
                "getStyles" /* AiAssistance.Tool.ToolName.GET_STYLES */,
                "getTraceEventByKey" /* AiAssistance.Tool.ToolName.GET_TRACE_EVENT_BY_KEY */,
                "getTraceFunctionCode" /* AiAssistance.Tool.ToolName.GET_TRACE_FUNCTION_CODE */,
                "getTraceMainThreadSummary" /* AiAssistance.Tool.ToolName.GET_TRACE_MAIN_THREAD_SUMMARY */,
                "getTraceNetworkSummary" /* AiAssistance.Tool.ToolName.GET_TRACE_NETWORK_SUMMARY */,
                "getTraceResourceContent" /* AiAssistance.Tool.ToolName.GET_TRACE_RESOURCE_CONTENT */,
                "listCookies" /* AiAssistance.Tool.ToolName.LIST_COOKIES */,
                "listNetworkRequests" /* AiAssistance.Tool.ToolName.LIST_NETWORK_REQUESTS */,
                "listPageOrigins" /* AiAssistance.Tool.ToolName.LIST_PAGE_ORIGINS */,
                "listSources" /* AiAssistance.Tool.ToolName.LIST_SOURCES */,
                "listStorageKeys" /* AiAssistance.Tool.ToolName.LIST_STORAGE_KEYS */,
                "recordPerformanceTrace" /* AiAssistance.Tool.ToolName.RECORD_PERFORMANCE_TRACE */,
                "resolveDevtoolsNodePath" /* AiAssistance.Tool.ToolName.RESOLVE_DEVTOOLS_NODE_PATH */,
                "runLighthouse" /* AiAssistance.Tool.ToolName.RUN_LIGHTHOUSE */,
                "selectTraceEventByKey" /* AiAssistance.Tool.ToolName.SELECT_TRACE_EVENT_BY_KEY */,
            ].sort();
            const permissionPrompt = "never" /* AiAssistance.Tool.PermissionPrompt.NEVER */;
            const toolNames = filterToolNames(permissionPrompt);
            assert.deepEqual(toolNames, expectedToolNames);
        });
    });
    it('sets permissionTitle on tools that ask for approval', () => {
        const toolsThatAlwaysAsk = [
            "executeJavaScript" /* AiAssistance.Tool.ToolName.EXECUTE_JAVASCRIPT */,
            "getCookieValues" /* AiAssistance.Tool.ToolName.GET_COOKIE_VALUES */,
            "getStorageValues" /* AiAssistance.Tool.ToolName.GET_STORAGE_VALUES */,
        ];
        for (const toolName of toolsThatAlwaysAsk) {
            const tool = AiAssistance.ToolRegistry.ToolRegistry.get(toolName);
            assert.exists(tool, `Tool "${toolName}" does not exist in ToolRegistry`);
            assert.isNotEmpty(tool.permissionTitle, `Tool "${toolName}" has no permissionTitle`);
        }
    });
});
//# sourceMappingURL=ToolRegistry.test.js.map