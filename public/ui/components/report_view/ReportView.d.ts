/**
 * The `Report` component can be used to display static information. A report
 * usually consists of multiple sections where each section has rows of name/value
 * pairs. The exact structure of a report is determined by the user, as is the
 * rendering and content of the individual name/value pairs.
 *
 * Example:
 * ```
 *   <devtools-report .data=${{reportTitle: 'Optional Title'}}>
 *     <devtools-report-section-header>Some Header</devtools-report-section-header>
 *     <devtools-report-key>Key (rendered in the left column)</devtools-report-key>
 *     <devtools-report-value>Value (rendered in the right column)</devtools-report-value>
 *     <devtools-report-key class="foo">Name (with custom styling)</devtools-report-key>
 *     <devtools-report-value>Some Value</devtools-report-value>
 *     <devtools-report-divider></devtools-report-divider>
 *   </devtools-report>
 * ```
 * The component is intended to replace UI.ReportView in an idiomatic way.
 */
export interface ReportData {
    reportTitle: string;
}
export declare class Report extends HTMLElement {
    #private;
    set data({ reportTitle }: ReportData);
    connectedCallback(): void;
}
export interface ReportSectionData {
    sectionTitle: string;
}
export declare class ReportSection extends HTMLElement {
    #private;
    connectedCallback(): void;
}
export declare class ReportSectionHeader extends HTMLElement {
    #private;
    connectedCallback(): void;
}
export declare class ReportSectionDivider extends HTMLElement {
    #private;
    connectedCallback(): void;
}
export declare class ReportKey extends HTMLElement {
    #private;
    connectedCallback(): void;
}
export declare class ReportValue extends HTMLElement {
    #private;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-report': Report;
        'devtools-report-section': ReportSection;
        'devtools-report-section-header': ReportSectionHeader;
        'devtools-report-key': ReportKey;
        'devtools-report-value': ReportValue;
        'devtools-report-divider': ReportSectionDivider;
    }
}
