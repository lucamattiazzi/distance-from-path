const STEP_SIZE = 1

export type Point = [number, number]
export type PointWithRatio = {
	point: Point
	ratio: number
}
export type Results = {
	point: Point
	distance: number
	ratio: number
}

const squaredDistance = (p0: Point) => (p1: Point) =>
	(p0[0] - p1[0]) * (p0[0] - p1[0]) + (p0[1] - p1[1]) * (p0[1] - p1[1])

const preprocessPath = (path: SVGPathElement) => {
	const pathLength = path.getTotalLength()
	const points: PointWithRatio[] = []
	for (let parsedLength = 0; parsedLength < pathLength; parsedLength += STEP_SIZE) {
		const { x, y } = path.getPointAtLength(parsedLength)
		const point = [x, y] as [number, number]
		const ratio = parsedLength / pathLength
		points.push({ point, ratio })
	}
	return points
}

const preprocessedGetClosestPoint = (path: SVGPathElement) => {
	const points = preprocessPath(path)
	return (point: Point): Results => {
		const getSquaredDistance = squaredDistance(point)
		let best: Results = { point: [0, 0], ratio: 0, distance: Infinity }
		for (const pathPoint of points) {
			const distance = getSquaredDistance(pathPoint.point)
			if (distance >= best.distance) continue
			best = { ...pathPoint, distance }
		}
		return best
	}
}

const freshGetClosestPoint = (path: SVGPathElement, point: Point) => {
	const pathLength = path.getTotalLength()
	let best: Results = { point: [0, 0], ratio: 0, distance: Infinity }
	const getSquaredDistance = squaredDistance(point)
	for (let parsedLength = 0; parsedLength < pathLength; parsedLength += STEP_SIZE) {
		const { x, y } = path.getPointAtLength(parsedLength)
		const pathPoint = [x, y] as [number, number]
		const distance = getSquaredDistance(pathPoint)
		if (distance >= best.distance) continue
		best = { point: pathPoint, ratio: parsedLength / pathLength, distance }
	}
	return best
}

export const getClosestPoint = (path: SVGPathElement, point?: Point) => {
	return point ? freshGetClosestPoint(path, point) : preprocessedGetClosestPoint(path)
}
