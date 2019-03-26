"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const STEP_SIZE = 1;
const squaredDistance = (p0) => (p1) => (p0[0] - p1[0]) * (p0[0] - p1[0]) + (p0[1] - p1[1]) * (p0[1] - p1[1]);
const preprocessPath = (path) => {
    const pathLength = path.getTotalLength();
    const points = [];
    for (let parsedLength = 0; parsedLength < pathLength; parsedLength += STEP_SIZE) {
        const { x, y } = path.getPointAtLength(parsedLength);
        const point = [x, y];
        const ratio = parsedLength / pathLength;
        points.push({ point, ratio });
    }
    return points;
};
const preprocessedGetClosestPoint = (path) => {
    const points = preprocessPath(path);
    return (point) => {
        const getSquaredDistance = squaredDistance(point);
        let best = { point: [0, 0], ratio: 0, distance: Infinity };
        for (const pathPoint of points) {
            const distance = getSquaredDistance(pathPoint.point);
            if (distance >= best.distance)
                continue;
            best = Object.assign({}, pathPoint, { distance });
        }
        return best;
    };
};
const freshGetClosestPoint = (path, point) => {
    const pathLength = path.getTotalLength();
    let best = { point: [0, 0], ratio: 0, distance: Infinity };
    const getSquaredDistance = squaredDistance(point);
    for (let parsedLength = 0; parsedLength < pathLength; parsedLength += STEP_SIZE) {
        const { x, y } = path.getPointAtLength(parsedLength);
        const pathPoint = [x, y];
        const distance = getSquaredDistance(pathPoint);
        if (distance >= best.distance)
            continue;
        best = { point: pathPoint, ratio: parsedLength / pathLength, distance };
    }
    return best;
};
exports.getClosestPoint = (path, point) => {
    return point ? freshGetClosestPoint(path, point) : preprocessedGetClosestPoint(path);
};
