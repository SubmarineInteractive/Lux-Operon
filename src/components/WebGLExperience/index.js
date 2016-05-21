import { Component } from 'react';
import Scene from './core/scene';
import DOMElement from 'components/DOMElement';
import { experience as configuration } from 'config';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';

import {
  EXP_PLAYER_TOGGLE_IS_IN_DANGER,
  EXP_TOGGLE_PAUSE_GAME,
  EXP_TOGGLE_CAMERA,
  EXP_LUX_TOGGLE,
  EXP_TIMER_TOGGLE_PAUSE,
  WINDOW_ON_FOCUS,
  EXP_SHOW_VIDEO,
  EXP_SHOW_REWARD,
  EXP_TIMER_ENDED,
  EXP_LUX_END_GAME,
  ABOUT_OPEN,
  WINDOW_ON_BLUR
} from 'config/messages';


/**
 * WebGLExperience class
 */
class WebGLExperience extends Component {

  /**
   * componentWillMount function
   */
  componentWillMount() {

    this.scene = new Scene( configuration, this.props.resources );
    this.sceneDomEl = this.scene.renderer.domElement;

    this.isPaused = false;
    this.isPausedLocked = false;

    this.bind();
  }

  componentDidMount() {

    this.prepareambientSound();

    this.onDangerModeChange = this.onDangerModeChange.bind( this );
    this.onPauseToggle = this.onPauseToggle.bind( this );

    Emitter.on( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.onDangerModeChange );
    Emitter.on( EXP_TOGGLE_PAUSE_GAME, this.onPauseToggle );

    Emitter.on( EXP_SHOW_VIDEO, this.lockedPause );
    Emitter.on( EXP_SHOW_REWARD, this.lockedPause );
    Emitter.on( EXP_TIMER_ENDED, this.lockedPause );
    Emitter.on( EXP_LUX_END_GAME, this.lockedPause );
    Emitter.on( ABOUT_OPEN, this.lockedPause );
    Emitter.on( ABOUT_OPEN, this.unLockedPause );

    Emitter.on( WINDOW_ON_FOCUS, this.onWindowFocus );
    Emitter.on( WINDOW_ON_BLUR, this.onWindowBlur );
  }

  componentWillUnmount() {
  }

  bind() {

    [ 'onDangerModeChange', 'onPauseToggle', 'onWindowBlur', 'onWindowFocus', 'lockedPause', 'unLockedPause' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }
  prepareambientSound() {

    this.goodambientSound = SoundManager.get( 'level-1-ambient' );
    this.badambientSound = SoundManager.get( 'level-1-danger-ambient' );

    this.goodambientSound.loop( true );
    this.badambientSound.loop( true );
    this.goodambientSound.volume( 1 );
    this.badambientSound.volume( 0 );

    this.startGoodambientSound();
    this.badambientSound.play();

  }

  startGoodambientSound() {

    this.goodambientSound.play();

    this.goodambientSound.fadeIn( 1, 1000 );

    this.badambientSound.fadeOut( 0, 1000 );

  }

  startBadambientSound() {

    this.badambientSound.play();

    this.badambientSound.fadeIn( 1, 1000 );

    this.goodambientSound.fadeOut( 0, 1000);

  }

  lockedPause() {

    this.isPausedLocked = true;
  }

  unLockedPause() {

    this.isPausedLocked = false;
  }

  onDangerModeChange( dangerMode ) {

    if( dangerMode ){

      this.startBadambientSound();
    } else {

      this.startGoodambientSound();
    }
  }

  onPauseToggle( toggle ) {

    if( toggle ) {

      console.log('paused');
      Emitter.emit( EXP_TOGGLE_CAMERA, false );
      Emitter.emit( EXP_LUX_TOGGLE, false );
      Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, true );

      this.isPaused = true;
    } else {

      console.log('unpaused');
      Emitter.emit( EXP_TOGGLE_CAMERA, true );
      Emitter.emit( EXP_LUX_TOGGLE, true );
      Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, false );

      this.isPaused = false;
    }

  }

  onWindowBlur() {

    if( !this.isPaused && !this.isPausedLocked ) {

      this.onPauseToggle( true );
    }

  }

  onWindowFocus() {

    if( this.isPaused && !this.isPausedLocked ) {

      this.onPauseToggle( false );
    }

  }

  render() {

    return (
      <div className="container">
        <DOMElement child={this.sceneDomEl} />
      </div>
    );
  }
}

export default WebGLExperience;
