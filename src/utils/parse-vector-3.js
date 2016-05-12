import chunk from 'lodash.chunk';

/**
 * Parse array of points in array of Vector3
 * @param  {array} array Array of points to parse
 * @return {array}       Array of Vector3
 */
export default function parseVec3( array ) {
  return chunk( array, 3 ).map( ( arr ) => new THREE.Vector3( arr[ 0 ], arr[ 1 ], arr[ 2 ] ) );
}