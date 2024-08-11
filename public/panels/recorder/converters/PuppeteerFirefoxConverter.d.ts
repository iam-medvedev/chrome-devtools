import * as PuppeteerReplay from '../../../third_party/puppeteer-replay/puppeteer-replay.js';
import { PuppeteerConverter } from './PuppeteerConverter.js';
export declare class PuppeteerFirefoxConverter extends PuppeteerConverter {
    getId(): string;
    createExtension(): PuppeteerReplay.PuppeteerStringifyExtension;
    getFormatName(): string;
}
