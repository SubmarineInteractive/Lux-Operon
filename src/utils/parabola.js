/**
 * Remap the 0..1 interval into 0..1 parabola, such that the corners are remaped to 0 and the center to 1.
 * In other words, parabola(0) = parabola(1) = 0, and parabola(1/2) = 1.
 *
 * @param  float k Value to map
 * @param  float x Coordinate on X axis
 * @return float   Mapped value
 */
export default (k, x) => Math.pow( 4 * x * ( 1 - x ), k )