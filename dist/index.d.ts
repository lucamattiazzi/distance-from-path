export declare type Point = [number, number];
export declare type PointWithRatio = {
    point: Point;
    ratio: number;
};
export declare type Results = {
    point: Point;
    distance: number;
    ratio: number;
};
export declare const getClosestPoint: (path: SVGPathElement, point?: [number, number]) => Results | ((point: [number, number]) => Results);
