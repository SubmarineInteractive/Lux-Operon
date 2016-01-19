/**
 * Linear interpolation between two values (lerping).
 *
 * @param  {integer} x First point
 * @param  {integer} y Second point
 * @param  {integer} r Value to interpolate
 * @return {integer}   Lerped value
 */
export default (x, y, r) => x + ((y - x) * r)