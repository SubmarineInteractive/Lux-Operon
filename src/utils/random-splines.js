import randomInt from './random-int'

/**
 * Generate random splines
 * @param  {integer} splinesNumber   Number of splines
 * @param  {integer} pointsPerSpline Number of points per spline
 * @return {array}                   Splines
 */
export default ( splinesNumber = 100, pointsPerSpline = 3 ) => {
  let splines = []

  for (let i = 0; i < splinesNumber; i++) {
    splines[i] = []
    for (let j = 0; j < pointsPerSpline; j++) {
      splines[i][j] = []
      if(j == 0) {
        splines[i][j].push(0, 0, 0)
        continue
      }

      splines[i][j].push(randomInt(-200, 200), randomInt(-200, 200), randomInt(-200, 200))
    }
  }

  return splines
}