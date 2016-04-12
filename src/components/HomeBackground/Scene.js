import raf from 'raf';
import Container from 'Container';
import PostProcessing from 'components/WebGL/PostProcessing/PostProcessing';
import EffectComposer from 'components/WebGL/PostProcessing/EffectComposer';
import Plane from './Plane';

/**
 * Scene class
 */
class BackgroundScene extends THREE.Scene {

  /**
   * construcotr function
   */
  constructor() {

    super();

    this.bind();

    // Camera
    this.camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.1, 10000 );
    this.camera.position.y = 200;
    this.camera.position.z = 900;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0x000000, 1.0 );

    this.effectComposer = new EffectComposer( this.renderer, Container.get( 'Configuration' ) );
    this.postProcessing = new PostProcessing( this.effectComposer, this, this.camera, this.renderer, Container.get( 'Configuration' ) );

    this.clock = Container.get( 'Clock' );

    // Plane
    const pointLight = new THREE.PointLight( 0xe7e3e3, 1.7, 1500 );
    pointLight.position.set( 0, 400, 950 );
    this.add( pointLight );

    const sphere = new THREE.SphereGeometry( 10, 20, 20 );
    pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }) ) );

    this.plane = new Plane();
    this.add( this.plane );

    this.animate();
  }

  /**
   * Bind function
   */
   bind() {

     this.animate = this.animate.bind( this );
   }


  /**
   * Animate function
   */
  animate() {

    raf( this.animate );
    this.render();
  }

  /**
   * Render function
   */
  render() {

    this.plane.update( this.clock.time );
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    this.postProcessing.update();
  }
}

export default BackgroundScene;
