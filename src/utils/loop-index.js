/**
 * Loop on an index value.
 *
 * @param  {integer} index  Index
 * @param  {integer} length Length
 * @return {integer}        Looped index
 */
export default (index, length) => {
  if (index < 0) {
    index = length + index % length;
  }
  if (index >= length) {
    return index % length;
  }
  return index;
}