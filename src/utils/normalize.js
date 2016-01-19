/**
 * Normalize a value between two bounds.
 *
 * @param  {float} min Minimum boundary
 * @param  {float} max Maximum boundary
 * @param  {float} x   Value to normalize
 * @return {float}     Normalized value
 */
export default (min, max, x) => (x - min) / (max - min)