/**
 * Convert degree to gradiant
 *
 * @param  {number} angle Angle in degree
 * @return {number}       Angle in radian
 */

const COEF = Math.PI/180;

export default function degreeToRadian( angle ) {
  return angle * COEF;
}
