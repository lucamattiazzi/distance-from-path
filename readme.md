# Distance from path

From an SVG Path and a point, will return the closest point on the path, the distance from the source point and the ratio [0, 1] of path at which the point is found.

```
const { getClosestPoint } = require('./dist/index')
const path = document.getElementById('path')

const point = [100, 200]
const closest = getClosestPoint(path, point) // { point: [x, y], distance: n, ratio: r }

const points = [[10, 50], [200, 30], [300, 20]]
const curried = getClosestPoint(path)
const closests = points.map(p => curried(p)) // { point: [x, y], distance: n, ratio: r }[]
```
