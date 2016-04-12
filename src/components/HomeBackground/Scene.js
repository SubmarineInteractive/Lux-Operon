import raf from 'raf';
import Container from 'Container';
import { Events } from 'helpers';

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
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 100;

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    // Object
    this.geom = new THREE.BoxGeometry( 10, 10, 10 );

    this.mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });

    this.mesh = new THREE.Mesh( this.geom, this.mat );

    this.mesh.position.set( 0, 0, 0 );
    this.add( this.mesh );

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

    this.mesh.rotation.x += 0.05;
    this.mesh.rotation.y += 0.05;
    this.mesh.rotation.z += 0.05;
    this.renderer.render( this, this.camera );
  }
}

export default BackgroundScene;
