import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';
import FishGroup from '../FishGroup';

import points from '../Path/paths/path_1.dae';
import createSpline from 'utils/create-spline';
import { loopIndex, degreeToRadian } from 'utils';

import {
  EXP_INTRO_ENDED,
  EXP_RAYCAST_TOGGLE,
  EXP_INTERSECTING_FISH,
  EXP_NOT_INTERSECTING_FISH,
  EXP_SHOW_FISH_NAME
} from 'config/messages';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain} Terrain           Terrain instance
   * @param {Camera}  Camera            Camera instance
   * @param {Player}  Player            Player instance
   * @param {Object}  boundingBoxConfig Bounding box configuration
   * @param {Object}  fishGroupConfig   Fish group configuration
   * @param {Object}  resources         Resources
   */
  constructor( Terrain, Camera, Player, boundingBoxConfig, fishGroupConfig, resources ) {

    super();

    this.terrain = Terrain;
    this.camera = Camera;
    this.player = Player;
    this.resources = resources;
    this.fishGroups = [];
    this.fishModels = [];
    this.intersects = [];

    this.curve = createSpline( points );
    this.points = this.curve.getSpacedPoints( 100 );

    this.raycastEnabled = false;
    this.wasIntersecting = false;
    this.isIntersecting = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    fishGroupConfig.map( config => {
      const fishGroup = new FishGroup( config, this.resources, this.curve );
      this.fishGroups.push( fishGroup );

      const geometry = new THREE.Geometry();
      geometry.vertices = this.points;

      const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, transparent: true, opacity: 0 });

      const path = new THREE.Line( geometry, material );
      path.position.copy( config.position );
      path.rotation.y = degreeToRadian( 90 );

      for ( let i = 0; i < fishGroup.fishes.length; i++ ) {

        this.fishModels.push( fishGroup.fishes[ i ].modelObject );
      }

      this.add( path );
      path.add( fishGroup );
    });

    this.add( this.terrain );
    this.add( this.player );

    this.norm = 0;

    this.bind();

    Emitter.once( EXP_INTRO_ENDED , this.onIntroEnded );
    Emitter.once( EXP_RAYCAST_TOGGLE , this.toggleRaycast );

  }

  bind() {

    [ 'update', 'onIntroEnded', 'onClick', 'onMouseMove', 'raycast', 'toggleRaycast' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    // this.canvasContainer = document.getElementsByClassName( 'container' )[ 0 ];

    document.addEventListener( 'click', this.onClick, false );
    document.addEventListener( 'mousemove', this.onMouseMove, false );
  }

  removeEventListeners() {

    document.removeEventListener( 'click', this.onClick, false );
    document.removeEventListener( 'mousemove', this.onMouseMove, false );
  }

  onIntroEnded() {

    this.raycastEnabled = true;

    this.addEventListeners();
  }

  toggleRaycast( toggle ) {
    this.raycastEnabled = toggle;
  }

  onMouseMove( ev ) {

    this.mouse.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( ev.clientY / window.innerHeight ) * 2 + 1;

  }

  onClick() {

  }

  updateWindowCursor() {

    if( this.isIntersecting ) {

      document.body.classList.add( 'is-intersecting' );
    } else {

      document.body.classList.remove( 'is-intersecting' );
    }

  }

  debug() {

    // document.addEventListener( 'keydown', ( event ) => {
    //
    //   switch ( event.keyCode ) {
    //     case 90:
    //       path.position.x += 10;
    //       break;
    //     case 65:
    //       path.position.x -= 10;
    //       break;
    //     case 83:
    //       path.position.y += 10;
    //       break;
    //     case 81:
    //       path.position.y -= 10;
    //       break;
    //     case 88:
    //       path.position.z += 10;
    //       break;
    //     case 87:
    //       path.position.z -= 10;
    //       break;
    //   }
    // });
  }

  raycast() {

    if( this.raycastEnabled ) {
      this.raycaster.setFromCamera( this.mouse, this.camera );

      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects( this.fishModels );

      this.wasIntersecting = this.isIntersecting;


      if( intersects.length > 0 ) {
        console.log( intersects[ 0 ].distance )
        
        if( intersects[ 0 ].distance < 2000 ) {

          this.isIntersecting = true;

          if( this.wasIntersecting !== this.isIntersecting ) {

            Emitter.emit( EXP_INTERSECTING_FISH, intersects[ 0 ] );
            Emitter.emit( EXP_SHOW_FISH_NAME, intersects[ 0 ].object.name );

            SoundManager.play( 'fish-hover' );
          }

        }

      } else {

        this.isIntersecting = false;

        if( this.wasIntersecting !== this.isIntersecting ) {

          Emitter.emit( EXP_NOT_INTERSECTING_FISH );
        }
      }

      this.updateWindowCursor();

    }
  }

  update( time ) {

    this.raycast();

    this.norm = loopIndex( this.norm + 0.001, 1 );

    this.fishGroups.map( group => {
      group.update( time );
    });
  }
}

export default Level;
