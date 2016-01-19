/**
 * Distance between two points.
 *
 * @param  {float} x1 X coord of the first point
 * @param  {float} y1 Y coord of the first point
 * @param  {float} x2 X coord of the second point
 * @param  {float} y2 Y coord of the second point
 * @return {float}    Computed distance
 */
export default (x1, y1, x2, y2) => {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}