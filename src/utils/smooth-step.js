/**
 * Smooth a value.
 *
 * @param  {integer} min Minimum boundary
 * @param  {integer} max Maximum boundary
 * @param  {integer} v   Value
 * @return {integer}     Smoothed value
 */
export default (min, max, v) => {
  const x = Math.max( 0, Math.min( 1, ( v - min ) / ( max - min ) ) )
  return x * x * ( 3 - 2 * x )
}