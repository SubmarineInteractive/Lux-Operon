import createSpline from 'utils/create-spline';

/**
 * Path class
 */
class Path extends THREE.Object3D {

  constructor( points = [] ) {

    super();

    this.curve = createSpline( points );
    // this.points = this.curve.getSpacedPoints( 100 );
    //
    // const geometry = new THREE.Geometry();
    // geometry.vertices = this.points;
    //
    // const material = new THREE.LineBasicMaterial({ color : 0xff0000 });
    // const line = new THREE.Line( geometry, material );
    // this.add( line );
  }
}

export default Path;