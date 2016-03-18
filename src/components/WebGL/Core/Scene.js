import raf from 'raf';
import Container from 'Container';
import { Events } from 'helpers';

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   */
  constructor() {
    super();

    this.camera;
    this.renderer;
  }

  /**
   * Begin function
   */
  begin() {

    Container.get( 'Configuration' ).set( 'canvas', this.container );

     // Renderer
    this.renderer = Container.get( 'Renderer' );

    // Camera
    this.camera = Container.get( 'Camera' );
    this.add( this.camera.controls.getObject() );

    // Post processing
    this.postProcessing = Container.get( 'PostProcessing' );

    // Texture loader
    this.textureLoader = Container.get( 'TextureLoader' );

    // Utils
    this.clock = Container.get( 'Clock' );

    // Create scene when textures are loaded
    this.textureLoader
      .init()
      .then( ::this.createScene );

    // Debug helpers
    if( __DEV__ ) {
      this.debug();
    }
  }

  /**
   * Debug function
   * @todo Create a separate class
   */
  debug() {

    // Axis helper
    const axis = new THREE.AxisHelper( 5 );
    this.add( axis );

    // Grid helper
    const gridHelper = new THREE.GridHelper( 50, 1 );
    this.add( gridHelper );

    // Texture loader
    Events.on( 'textureLoader:loading', ( current, total ) =>
      /*eslint-disable no-console */
      console.log( `[TextureLoader] Loading ${current}/${total} textures` ) );
      /*eslint-enable no-console */
  }

  /**
   * CreateScene function
   */
  createScene() {

    // Fog
    this.fog = Container.get( 'Fog' );

    // Level
    this.level = Container.get( 'Level' );
    this.add( this.level );
    this.level.position.set(0,0,0);

    this.directionalLight = Container.get( 'DirectionalLight' );
    this.add( this.directionalLight );

    this.animate();
  }

  /**
   * Animate function
   */
  animate() {

    raf( ::this.animate );
    this.render();
  }

  /**
   * Render function
   */
  render() {

    this.postProcessing.update();
    this.camera.update( this.clock.delta );
    this.level.update( this.clock.time, this.clock.delta );
  }
}

export default Scene;