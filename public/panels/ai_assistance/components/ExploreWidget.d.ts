import * as UI from '../../../ui/legacy/legacy.js';
interface FeatureCard {
    icon: string;
    heading: string;
    jslogContext: string;
    onClick: () => void;
    text: string;
    panelName: string;
}
interface ViewProps {
    featureCards: FeatureCard[];
}
export declare const DEFAULT_VIEW: (input: ViewProps, _output: Record<string, unknown>, target: HTMLElement) => void;
export type View = typeof DEFAULT_VIEW;
export declare class ExploreWidget extends UI.Widget.Widget {
    view: View;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    performUpdate(): Promise<void> | void;
}
export {};
