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

    this.position.copy( new THREE.Vector3( 600, 1500, -200 ) );

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
          this.position.y += 10;
          break;
        case 39:
          this.position.y -= 10;
          break;
      }
    });
  }
}

export default FishGroup;