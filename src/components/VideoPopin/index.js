import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_SHOW_VIDEO,
  EXP_SHOW_REWARD
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

        this.showPopin();

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
      .from( this.refs.skip, 2, { opacity: 0, x: 100, ease: Expo.easeOut }, 0 );

    this.leaveTl
      .to( this.refs.popin, 1, { opacity: 0, ease: Expo.easeOut }, 0 );
  }

  showPopin() {

    this.isOpen = true;
    this.refs.popin.classList.add( 'video-popin--is-visible' );
    this.leaveTl.stop();
    this.enterTl.play( 0 );
    this.refs.video.play( 0 );
  }

  closePopin() {

    if( this.isOpen ) {
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

        <video className="video-popin__video-el" src="/videos/sample.mp4" ref="video"></video>

      </div>

    );
  }
}

export default VideoPopin;
