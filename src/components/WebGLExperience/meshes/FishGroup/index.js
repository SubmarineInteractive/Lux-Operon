import Fish from './Fish';

/**
 * FishGroup class
 */
class FishGroup extends THREE.Group {

  /**
   * constructor function
   * @param {Object} configuration Configuration
   * @param {Object} resources     Resources
   */
  constructor({ count, species, luxAmount }, resources ) {
    super();

    this.position.copy( new THREE.Vector3( 500, 1500, -2000 ) );

    for ( let i = 0; i < count; i++ ) {
      const model = resources[ species ].clone();
      const fish = new Fish( model, resources.fishGradientTexture );

      this.add( fish );
    }

    document.addEventListener('keydown', (event) => {

      console.log(event.keyCode);

      switch (event.keyCode) {
        case 38:
          this.position.x += 10;
          break;
        case 40:
          this.position.x -= 10;
          break;
        case 37:
          this.position.z += 10;
          break;
        case 39:
          this.position.z -= 10;
          break;
      }
    });
  }

  update( time ) {
    this.traverse( child => {
      if( child instanceof THREE.Mesh ) {
        child.material.update( time );
      }
    });
  }
}

export default FishGroup;