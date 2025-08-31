import type * as UI from '../../ui/legacy/legacy.js';
export declare class Renderer implements UI.UIUtils.Renderer {
    static instance(opts?: {
        forceNew: boolean | null;
    }): Renderer;
    render(object: Object, options?: UI.UIUtils.Options): Promise<{
        node: Node;
        tree: UI.TreeOutline.TreeOutline | null;
    } | null>;
}
