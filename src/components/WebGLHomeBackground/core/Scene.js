import AbstractScene from 'common/core/AbstractScene';
import Waves from '../meshes/Waves';
import { map } from 'utils';

/**
 * Scene class
 */
class BackgroundScene extends AbstractScene {

  /**
   * constructor function
   */
  constructor({ camera, renderer, postProcessing, lights, waves }) {
    super({ camera, renderer, postProcessing });

    this.progress = 0;
    this.cameraConfig = camera;

    this.camera.position.copy( this.cameraConfig.position );
    this.camera.lookAt( this.cameraConfig.target );

    // Point light
    const { position, color, intensity, distance, decay } = lights.pointLight;
    const pointLight = new THREE.PointLight( color, intensity, distance, decay );
    pointLight.position.copy( position );
    this.add( pointLight );

    // const sphere = new THREE.SphereGeometry( 10, 20, 20 );
    // pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }) ) );

    // Waves
    this.waves = new Waves( waves );
    this.add( this.waves );
  }

  /**
   * render function
   */
  render() {

    this.preRender();

    this.waves.update( this.clock.time );
    this.camera.position.y = map( this.progress, 0, 1, this.cameraConfig.position.y, this.cameraConfig.sinkOffset );

    this.camera.lookAt( new THREE.Vector3() );
  }
}

export default BackgroundScene;