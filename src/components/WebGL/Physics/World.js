import Cannon from 'cannon';

/**
 * World class
 */
class World extends Cannon.World {

  /**
   * constructor function
   */
  constructor() {

    super();

    // this.quatNormalizeSkip = 0;
    // this.quatNormalizeFast = false;

    this.gravity.set( 0, 0, 0 );
    this.broadphase = new Cannon.NaiveBroadphase();

    const solver = new Cannon.GSSolver();
    solver.iterations = 7;
    solver.tolerance = 0.1;
    const split = true;

    if( split ) {
      this.solver = new Cannon.SplitSolver( solver );
    } else {
      this.solver = solver;
    }

    this.defaultContactMaterial.contactEquationStiffness = 1e9;
    this.defaultContactMaterial.contactEquationRelaxation = 4;

    // Create a slippery material (friction coefficient = 0.0)
    const physicsMaterial = new Cannon.Material( 'slipperyMaterial' );
    const physicsContactMaterial = new Cannon.ContactMaterial( physicsMaterial,
                                                             physicsMaterial,
                                                             0.0, // friction coefficient
                                                             0.3  // restitution
                                                           );
    // We must add the contact materials to the world
    this.addContactMaterial( physicsContactMaterial );
  }

  update() {

    this.step( 1/60 );
  }
}

export default World;