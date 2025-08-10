/**
 * To use links in markdown, add key here with the link and
 * use the added key in markdown.
 * @example markdown
 * Find more information about web development at [Learn more](exampleLink)
 */
export declare const markdownLinks: Map<string, string>;
export declare const getMarkdownLink: (key: string) => string;
