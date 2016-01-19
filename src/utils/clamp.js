/**
 * Clamp a value between two bounds.
 *
 * @param  {float} min Minimum boundary
 * @param  {float} max Maximum boundary
 * @param  {float} v   Value to clamp
 * @return {float}     Clamped value
 */
export default (min, max, v) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}