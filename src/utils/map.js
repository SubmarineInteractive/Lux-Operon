/**
 * Re-maps a number from one range to another.
 *
 * @param  {integer} value  The incoming value to be converted
 * @param  {integer} start1 Lower bound of the value's current range
 * @param  {integer} stop1  Upper bound of the value's current range
 * @param  {integer} start2 Lower bound of the value's target range
 * @param  {integer} stop   Upper bound of the value's target range
 * @return {integer}        Remapped number
 */
export default (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2