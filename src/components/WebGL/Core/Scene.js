import Stats from 'stats.js';
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
   * @return {void}
   */
  begin(container) {

    this.container = container;
    Container.get('Configuration').set('canvas', this.container);

     // Renderer
    this.renderer = Container.get( 'Renderer' );
    this.container.appendChild( this.renderer.domElement );

    // Camera
    this.camera = Container.get( 'Camera' );
    this.add( this.camera );

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
   * @return {void}
   */
  debug() {

    // Stats
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0';
    this.container.appendChild( this.stats.domElement );

    // Axis helper
    const axis = new THREE.AxisHelper( 5 );
    this.add( axis );

    // Grid helper
    const gridHelper = new THREE.GridHelper( 50, 1 );
    this.add( gridHelper );

    // Texture loader
    Events.on( 'textureLoader:loading', ( current, total ) =>
      console.log( `[TextureLoader] Loading ${current}/${total} textures` ));
  }

  /**
   * CreateScene function
   * @return {void}
   */
  createScene() {

    // Level
    this.level = Container.get( 'Level' );
    this.add( this.level );

    const geometry = new THREE.PlaneGeometry( 1000, 1000, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = Math.PI / 2;
    plane.position.y = 1;
    plane.receiveShadow = true;
    // this.add( plane );

    const geometry2 = new THREE.OctahedronGeometry(100, 1);
    const material2 = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    const octa = new THREE.Mesh( geometry2, material2 );
    octa.castShadow = true;
    octa.position.y = 400;
    this.add( octa );

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    // this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.position.set( 0, 500, 0 );
    this.directionalLight.castShadow = true;
    this.directionalLight.shadowDarkness = 0.6;
    this.directionalLight.shadowMapWidth = 4096;
    this.directionalLight.shadowMapHeight = 4096;
    this.add(this.directionalLight);

    // this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 100);
    // this.add(this.directionalLightHelper);

    this.ambientLight = Container.get( 'AmbientLight' );
    this.add( this.ambientLight );

    this.animate();
  }

  /**
   * Animate function
   * @return {void}
   */
  animate() {

    raf( ::this.animate );

    if( __DEV__ ) {
      this.stats.update();
    }

    this.render();
  }

  /**
   * Render function
   * @return {void}
   */
  render() {

    this.postProcessing.update();
    this.camera.update(this.clock.delta);
  }
}

export default Scene;