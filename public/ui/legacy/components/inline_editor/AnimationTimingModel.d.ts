import * as Geometry from '../../../../models/geometry/geometry.js';
export declare abstract class AnimationTimingModel {
    abstract asCSSText(): string;
    static parse(text: string): AnimationTimingModel | null;
}
export declare const LINEAR_BEZIER: Geometry.CubicBezier;
