import type { Brand } from './Brand.js';
export declare const escapeCharacters: (inputString: string, charsToEscape: string) => string;
export declare const formatAsJSLiteral: (content: string) => string;
/**
 * This implements a subset of the sprintf() function described in the Single UNIX
 * Specification. It supports the %s, %f, %d, and %% formatting specifiers, and
 * understands the %m$d notation to select the m-th parameter for this substitution,
 * as well as the optional precision for %s, %f, and %d.
 *
 * @param fmt format string.
 * @param args parameters to the format string.
 * @returns the formatted output string.
 */
export declare const sprintf: (fmt: string, ...args: unknown[]) => string;
export declare const toBase64: (inputString: string) => string;
export declare const findIndexesOfSubString: (inputString: string, searchString: string) => number[];
export declare const findLineEndingIndexes: (inputString: string) => number[];
export declare const isWhitespace: (inputString: string) => boolean;
export declare const trimURL: (url: string, baseURLDomain?: string) => string;
export declare const collapseWhitespace: (inputString: string) => string;
export declare const reverse: (inputString: string) => string;
export declare const replaceControlCharacters: (inputString: string) => string;
export declare const countWtf8Bytes: (inputString: string) => number;
export declare const stripLineBreaks: (inputStr: string) => string;
/**
 * Tests if the `inputStr` is following the extended Kebab Case naming convetion,
 * where words are separated with either a dash (`-`) or a dot (`.`), and all
 * characters must be lower-case alphanumeric.
 *
 * For example, it will yield `true` for `'my.amazing-string.literal'`, but `false`
 * for `'Another.AmazingLiteral'` or '`another_amazing_literal'`.
 *
 * @param inputStr the input string to test.
 * @return `true` if the `inputStr` follows the extended Kebab Case convention.
 */
export declare const isExtendedKebabCase: (inputStr: string) => boolean;
export declare const toTitleCase: (inputStr: string) => string;
export declare const removeURLFragment: (inputStr: string) => string;
export declare const regexSpecialCharacters: () => string;
export declare const filterRegex: (query: string) => RegExp;
export declare const createSearchRegex: (query: string, caseSensitive: boolean, isRegex: boolean, matchWholeWord?: boolean) => RegExp;
export declare const caseInsensetiveComparator: (a: string, b: string) => number;
export declare const hashCode: (string?: string) => number;
export declare const compare: (a: string, b: string) => number;
export declare const trimMiddle: (str: string, maxLength: number) => string;
export declare const trimEndWithMaxLength: (str: string, maxLength: number) => string;
export declare const escapeForRegExp: (str: string) => string;
export declare const naturalOrderComparator: (a: string, b: string) => number;
export declare const base64ToSize: (content: string | null) => number;
export declare const SINGLE_QUOTE = "'";
export declare const DOUBLE_QUOTE = "\"";
export declare const findUnclosedCssQuote: (str: string) => string;
export declare const countUnmatchedLeftParentheses: (str: string) => number;
export declare const createPlainTextSearchRegex: (query: string, flags?: string) => RegExp;
export type LowerCaseString = Brand<string, 'lowerCaseStringTag'>;
export declare const toLowerCaseString: (input: string) => LowerCaseString;
export declare const toKebabCase: (input: string) => Lowercase<string>;
export declare function toKebabCaseKeys(settingValue: Record<string, any>): Record<string, any>;
export declare const replaceLast: (input: string, search: string, replacement: string) => string;
export declare const stringifyWithPrecision: (s: number, precision?: number) => string;
/**
 * Somewhat efficiently concatenates 2 base64 encoded strings.
 */
export declare const concatBase64: (lhs: string, rhs: string) => string;
