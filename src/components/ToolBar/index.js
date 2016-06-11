import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';
import randomFloat from 'utils/random-float';
import screenfull from 'screenfull';

import {
  TOOLBAR_TOGGLE,
  TOOLBAR_HIDE_PLAY,
  EXP_TOGGLE_PAUSE_GAME
} from 'config/messages';

/**
 * ToolBar component
 */
class ToolBar extends Component {

  state = {
    isPlaying: true,
    isMuted: false,
    isFullscreen: false,
    hidePlay: true
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();
    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {
    [ 'handleClickOnPause', 'handleClickOnSound', 'handleClickOnFullscreen', 'onToolbarToggle', 'onToolbarHidePlay', 'onTogglePauseGame' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    Emitter.on( EXP_TOGGLE_PAUSE_GAME, this.onTogglePauseGame );
    Emitter.on( TOOLBAR_TOGGLE, this.onToolbarToggle );
    Emitter.on( TOOLBAR_HIDE_PLAY, this.onToolbarHidePlay );
  }

  removeEventListeners() {

    Emitter.off( EXP_TOGGLE_PAUSE_GAME, this.onTogglePauseGame );
    Emitter.off( TOOLBAR_TOGGLE, this.onToolbarToggle );
    Emitter.off( TOOLBAR_HIDE_PLAY, this.onToolbarHidePlay );
  }

  generateTimelineMax() {
    this.soundBars = this.refs.sound.querySelectorAll( 'line' );

    this.soundTls = [];

    for ( let i = 0; i < this.soundBars.length; ++i ) {
      const tl = new TimelineMax({ repeat: -1, yoyo: true });

      tl.fromTo( this.soundBars[ i ], randomFloat( 0.6, 0.9 ), { transformOrigin: 'center bottom', scaleY: randomFloat( 0.65, 0.8 ) }, { scaleY: randomFloat( 0.8, 0.95 ) }, 0 );

      this.soundTls.push( tl );
    }

  }

  onToolbarToggle( toggle ) {

    if( toggle ) {
      this.refs.container.classList.add( 'toolbar--is-displayed' );
    } else {
      this.refs.container.classList.remove( 'toolbar--is-displayed' );
    }
  }

  onToolbarHidePlay() {
    this.state.hidePlay = true;
  }

  onTogglePauseGame( toggle ) {

    this.setState({
      isPlaying: !toggle
    });
  }

  handleClickOnPause() {

    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  handleClickOnSound() {
    if( this.state.isMuted ) {

      TweenMax.to( this.soundBars, 1, { scaleY: 0.7, ease: Expo.easeOut, onComplete: ()=> {
        for ( let i = 0; i < this.soundTls.length; i++ ) {
          this.soundTls[ i ].play( 0 );
        }
      } });

      SoundManager.unmute();
    } else {

      for ( let i = 0; i < this.soundTls.length; i++ ) {
        this.soundTls[ i ].pause();
        TweenMax.to( this.soundBars, 1, { scaleY: 0.2, ease: Expo.easeOut });
      }

      SoundManager.lockMute();
    }

    this.setState({
      isMuted: !this.state.isMuted
    });
  }

  handleClickOnFullscreen() {

    if ( screenfull.enabled ) {

      if( this.state.isFullscreen ) {
        screenfull.exit();
      } else {
        screenfull.request();
      }

    }

    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  }

  render() {

    const fullscreenClass = ( this.state.isFullscreen ) ? 'toolbar__fullscreen toolbar__fullscreen--is-fullscreen' : 'toolbar__fullscreen';

    let playContent = '';

    if( !this.state.isPlaying && !this.state.hidePlay ) {

      playContent = (
        <svg viewBox="-22 28.2 16 15.8" className="toolbar__play" ref="play" onClick={this.handleClickOnPause}>
          <polygon points="-17.9,33 -17.9,41.2 -9.8,37.1 "/>
        </svg>
      );

    } else if ( !this.state.hidePlay ) {

      playContent = (
        <svg viewBox="0 0 16 15.8" className="toolbar__pause" ref="pause" onClick={this.handleClickOnPause}>
          <line x1="4.5" y1="2" x2="4.5" y2="15.8"/>
          <line x1="11.5" y1="2" x2="11.5" y2="15.8"/>
          <polygon points="-17.9,33 -17.9,41.2 -9.8,37.1 "/>
        </svg>
      );
    }

    return (

      <div className="toolbar" ref="container">

        { playContent }

        <svg viewBox="0 0 16 15" className="toolbar__sound" ref="sound" onClick={ this.handleClickOnSound }>
          <line x1="10.5" y1="0" x2="10.5" y2="15"/>
          <line x1="15.5" y1="2" x2="15.5" y2="15"/>
          <line x1="5.5" y1="2" x2="5.5" y2="15"/>
          <line x1="0.5" y1="5" x2="0.5" y2="15"/>
        </svg>

        <svg viewBox="0 0 21 15" className={ fullscreenClass } ref="fullscreen" onClick={ this.handleClickOnFullscreen }>
          <path d="M21 .5h-5M20.5 0v5"/>
          <path d="M21 14.5h-5M20.5 15v-5"/>
          <path d="M0 .5h5M.5 0v5"/>
          <path d="M0 14.5h5M.5 15v-5"/>
        </svg>

      </div>

    );
  }
}

export default ToolBar;
