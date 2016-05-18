import createSpline from 'utils/create-spline';

/**
 * Path class
 */
class Path extends THREE.Line {

  constructor( points = [] ) {

    super();

    this.curve = createSpline( points );
    this.points = this.curve.getSpacedPoints( 100 );

    this.material = new THREE.LineBasicMaterial({ color: false, transparent: true, opacity: 0 });

    this.geometry = new THREE.Geometry();
    this.geometry.vertices = this.points;
  }
}

export default Path;