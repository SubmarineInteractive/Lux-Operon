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

    this.addEventListeners();

    this.generateTimelineMax();

    this.refs.video.pause();
  }

  componentWillUnmount() {

    this.removeEventListeners();
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
    } });

    this.enterTl
      .from( this.refs.skip, 2, { opacity: 0, x: 100, ease: Expo.easeOut }, 0 );

    this.leaveTl
      .to( this.refs.skip, 2, { opacity: 0, x: 100, ease: Expo.easeOut }, 0 );
  }

  showPopin() {

    this.refs.popin.classList.add( 'video-popin--is-visible' );
    this.leaveTl.stop();
    this.enterTl.play( 0 );
    this.refs.video.play( 0 );
  }

  closePopin() {

    this.enterTl.stop();
    this.leaveTl.play( 0 );
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
