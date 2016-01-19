/**
 * Generate a random integer.
 *
 * @param  {integer} min Minimum boundary
 * @param  {integer} max Maximum boundary
 * @return {integer}     Generated integer
 */
export default (min, max) => Math.floor( Math.random() * ( max - min + 1 ) + min )