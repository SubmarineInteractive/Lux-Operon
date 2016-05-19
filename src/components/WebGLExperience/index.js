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
  EXP_TIMER_TOGGLE_PAUSE
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
  }

  componentDidMount() {

    this.prepareambientSound();

    this.onDangerModeChange = this.onDangerModeChange.bind( this );
    this.onPauseToggle = this.onPauseToggle.bind( this );

    Emitter.on( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.onDangerModeChange );
    Emitter.on( EXP_TOGGLE_PAUSE_GAME, this.onPauseToggle );
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

    console.log('bad');

    this.badambientSound.play();

    this.badambientSound.fadeIn( 1, 1000 );

    this.goodambientSound.fadeOut( 0, 1000);

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

      Emitter.emit( EXP_TOGGLE_CAMERA, true );
      Emitter.emit( EXP_LUX_TOGGLE, true );
      Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, false );
    } else {

      Emitter.emit( EXP_TOGGLE_CAMERA, false );
      Emitter.emit( EXP_LUX_TOGGLE, false );
      Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, true );
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
