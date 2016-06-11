import './styles.scss';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';

import { Component } from 'react';

import {
  EXP_SHOW_VIDEO,
  EXP_SHOW_REWARD,
  EXP_TOGGLE_PAUSE_GAME
} from 'config/messages';

/**
 * VideoPopin component
 */
class VideoPopin extends Component {

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.isOpen = false;

    this.addEventListeners();

    this.generateTimelineMax();

    this.debug();

    this.refs.video.pause();

  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  debug() {

    window.debug.showVideoPopin = () => {

      this.showPopin();
    };

    const onKeyUp = ( ev )=> {

      if( ev.keyCode === 86 ) { // v

        Emitter.emit( EXP_SHOW_VIDEO );

      }

    };

    document.addEventListener( 'keyup', onKeyUp, false );


  }

  bind() {

    [ 'showPopin', 'closePopin', 'onKeyUp' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_SHOW_VIDEO, this.showPopin );

    this.refs.video.addEventListener( 'ended', this.closePopin, false );
    document.addEventListener( 'keyup', this.onKeyUp, false );
  }

  removeEventListeners() {

    Emitter.off( EXP_SHOW_VIDEO, this.showPopin );

    document.addEventListener( 'keyup', this.onKeyUp, false );
    this.refs.video.removeEventListener( 'ended', this.closePopin, false );
  }

  generateTimelineMax() {
    this.enterTl = new TimelineMax({ paused: true });
    this.leaveTl =  new TimelineMax({ paused: true, onComplete: ()=> {

      this.refs.video.pause();
      this.refs.popin.classList.remove( 'video-popin--is-visible' );
      Emitter.emit( EXP_SHOW_REWARD );
    } });

    this.enterTl
      .fromTo( this.refs.skip, 2, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut }, 0 );

    this.leaveTl
      .to( this.refs.skip, 2, { opacity: 0, ease: Expo.easeOut }, 0 );

  }

  showPopin() {

    SoundManager.mute();

    this.isOpen = true;
    this.refs.popin.classList.add( 'video-popin--is-visible' );
    this.leaveTl.stop();
    this.enterTl.play( 0 );
    this.refs.video.play( 0 );

    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, true );
  }

  closePopin() {

    if( this.isOpen ) {
      SoundManager.unmute();
      this.refs.video.pause();
      this.enterTl.stop();
      this.leaveTl.play( 0 );
    }

  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.closePopin();
    }
  }

  render() {

    return (

      <div className="video-popin" ref="popin">

        <button className="video-popin__skip" ref="skip" onClick={this.closePopin}>Skip video</button>

        <video className="video-popin__video-el" ref="video">
          <source type="video/mp4" src="/videos/countershading.mp4" />
          <source type="video/webm" src="/videos/countershading.webm" />
          <source type="video/ogg" src="/videos/countershading.ogv" />
        </video>

      </div>

    );
  }
}

export default VideoPopin;
