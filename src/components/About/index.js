import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE,
  EXP_TOGGLE_CAMERA,
  EXP_TIMER_TOGGLE_PAUSE
} from 'config/messages';

/**
 * About component
 */
class About extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

    this.generateTimelineMax();

    this.begin();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'openAboutPopin', 'closeAboutPopin', 'onKeyUp' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );

    Emitter.on( ABOUT_OPEN, this.openAboutPopin );
    Emitter.on( ABOUT_CLOSE, this.closeAboutPopin );
  }

  removeEventListerners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );

    Emitter.off( ABOUT_OPEN, this.openAboutPopin );
    Emitter.off( ABOUT_CLOSE, this.closeAboutPopin );
  }

  generateTimelineMax() {
    this.enterTl = new TimelineMax({ paused: true });

    this.leaveTl = new TimelineMax({ paused: true, onComplete: ()=> {

      this.refs.container.classList.remove( 'about--is-visible' );
    } });

    this.enterTl
      .from( this.refs.container, 1, { opacity: 0, ease: Expo.easeOut });

    this.leaveTl
      .to( this.refs.container, 1, { opacity: 0, ease: Expo.easeOut });
  }

  begin() {

  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.closeAboutPopin();
    }
  }

  openAboutPopin() {

    Emitter.emit( EXP_TOGGLE_CAMERA, false );
    Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, true );

    this.refs.container.classList.add( 'about--is-visible' );

    this.leaveTl.stop();
    this.enterTl.play();
  }

  closeAboutPopin() {

    Emitter.emit( EXP_TOGGLE_CAMERA, true );
    Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, false );

    this.enterTl.stop();
    this.leaveTl.play();
  }

  render() {

    return (

      <div className="about" ref="container">

        <div className="about__cross" onClick={this.closeAboutPopin}> Close </div>

        About us, about you and me luv

      </div>

    );
  }
}

export default About;
