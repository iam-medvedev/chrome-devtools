import * as Elements from './elements.js';
export declare class Printer extends Elements.PropertyParser.TreeWalker {
    #private;
    protected enter({ node }: Elements.PropertyParser.SyntaxNodeRef): boolean;
    protected leave(): void;
    get(): string;
    static log(ast: Elements.PropertyParser.SyntaxTree): void;
    static rule(rule: string): string;
}
