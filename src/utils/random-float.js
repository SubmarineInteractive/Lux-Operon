/**
 * Generate a random float.
 *
 * @param  {integer} minValue   Minimum boundary
 * @param  {integer} maxValue   Maximum boundary
 * @param  {integer} precision Precision
 * @return {float}             Generated float
 */
export default ( minValue, maxValue, precision = 2 ) =>
  parseFloat( Math.min( minValue + ( Math.random() * ( maxValue - minValue ) ), maxValue ).toFixed( precision ) )