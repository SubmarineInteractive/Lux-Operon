import AbstractScene from 'common/core/AbstractScene';
import DirectionalLight from '../lights/DirectionalLight';
import NicePersonControls from './NicePersonControls';
import World from '../physics/World';
import Fog from '../misc/Fog';
import Player from '../meshes/Player';
import Level from '../meshes/Level';
import Terrain from '../meshes/Terrain';

/**
 * Scene class
 */
class Scene extends AbstractScene {

  /**
   * constructor function
   */
  constructor({ camera, renderer, postProcessing, lights, fog, player, terrain, boundingBox, fishGroup }, resources ) {
    super({ camera, renderer, postProcessing });

    this.fogConfig = fog;
    this.cameraConfig = camera;
    this.lightsConfig = lights;
    this.playerConfig = player;
    this.terrainConfig = terrain;
    this.boundingBoxConfig = boundingBox;
    this.fishGroupConfig = fishGroup;

    this.resources = resources;

    this.createScene();

  }

  /**
   * createScene function
   */
  createScene() {

    // World
    this.world = new World();

    // Player
    this.player = new Player( this.world, this.playerConfig, this.cameraConfig );

    // Controls
    if( this.cameraConfig.firstPersonControls ) {
      this.controls = new NicePersonControls( this.camera, this.player );
      this.controls.object.position.copy( this.cameraConfig.position );
      this.add( this.controls.object );
    }

    // Fog
    this.fog = new Fog( this, this.renderer, this.fogConfig );

    // Terrain
    this.terrain = new Terrain( this.world, this.terrainConfig, this.resources.heightMapTexture );

    // Lights
    this.directionalLight = new DirectionalLight( this.lightsConfig.directionalLight );
    this.add( this.directionalLight );

    // Level
    this.level = new Level( this.world, this.terrain, this.camera, this.player, this.boundingBoxConfig, this.fishGroupConfig, this.resources );
    this.add( this.level );
  }

  /**
   * render function
   */
  render() {

    this.preRender();

    this.world.update( this.clock.delta );
    this.player.update( this.clock.time, this.clock.delta );
    this.level.update( this.clock.time, this.clock.delta );

    if( this.controls ) {
      this.controls.update( this.clock.delta );
      this.directionalLight.move( this.controls.object.position.clone() );
      this.player.move( this.controls.object.position.clone() );
      this.player.rotate( this.controls.euler );
    }

  }
}

export default Scene;
