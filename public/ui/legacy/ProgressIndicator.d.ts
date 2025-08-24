import type * as Common from '../../core/common/common.js';
export declare class ProgressIndicator extends HTMLElement implements Common.Progress.Progress {
    #private;
    constructor();
    connectedCallback(): void;
    done(): void;
    cancel(): void;
    isCanceled(): boolean;
    setTitle(title: string): void;
    setTotalWork(totalWork: number): void;
    setWorked(worked: number, title?: string): void;
    incrementWorked(worked?: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-progress': ProgressIndicator;
    }
}
