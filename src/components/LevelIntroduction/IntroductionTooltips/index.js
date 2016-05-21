import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';

import {
  TOOLTIPS_SHOW,
  EXP_TOGGLE_CAMERA,
  EXP_LUX_TOGGLE,
  EXP_TIMER_TOGGLE_PAUSE,
  EXP_TOGGLE_PAUSE_GAME
} from 'config/messages';

/**
 * IntroductionTooltips component
 */
class IntroductionTooltips extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();

    this.firstTime = true;
  }

  componentDidMount() {

    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'skip', 'onKeyUp', 'showTooltips' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );

    Emitter.off( TOOLTIPS_SHOW, this.showTooltips );
    Emitter.on( TOOLTIPS_SHOW, this.showTooltips );
  }

  removeEventListeners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );
  }

  generateTimelineMax() {

    const arrows = this.refs.container.querySelectorAll( '.tooltips-tutorial__svg' );
    const indications = this.refs.container.querySelectorAll( '.tooltips-tutorial__indication' );

    this.enterTl = new TimelineMax({ paused: true, onComplete: ()=> {

      if( this.firstTime ) {
        setTimeout( ()=>{
          this.end();
        }, 3000 );
      }

    } });

    this.enterTl
      .staggerFrom( arrows, 2, { opacity: 0, y: 30, scale: 0.8, ease: Expo.easeOut }, 0.3, 0 )
      .staggerFrom( indications, 2, { opacity: 0, y: 10, ease: Expo.easeOut }, 0.3, 0.4 );
  }

  showTooltips() {

    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, true );

    this.begin( true );
  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {

      this.skip();
    }
  }

  begin( showIntro ) {

    SoundManager.play( 'woosh' );

    if( showIntro ) {
      this.props.showIntro();
    }

    this.refs.container.style.display = 'block';

    this.addEventListeners();

    this.enterTl.play( 0 );
  }

  skip() {


    this.enterTl.stop();

    this.end();
  }

  end() {


    if( this.firstTime ) {

      Emitter.emit( EXP_TOGGLE_PAUSE_GAME, false );
    }

    this.firstTime = false;

    this.removeEventListeners();

    this.props.ended();
  }

  render() {

    return (

      <div className="tooltips-tutorial" ref='container'>

        <button className="tooltips-tutorial__skip" ref="skip" onClick={this.skip}>Skip tooltips</button>

        <div className="tooltips-tutorial__el tooltips-tutorial__el--location" ref="location">

          <svg className="tooltips-tutorial__svg" x="0px" y="0px" viewBox="15 6.3 92 59.7" >

          <path d="M78.3,31.9c-11.8-8.3-31.6-18.4-59.7-19.7L23.2,9l-0.8-1.2l-6.2,4.3l4.2,6.3l1.2-0.8l-3-4.4c48.3,2.3,79.5,31.7,86.2,52.1
              l0.9-0.3C102.1,53.8,91.8,41.4,78.3,31.9z"/>

          </svg>

          <span className="tooltips-tutorial__indication">Your location</span>

        </div>

        <div className="tooltips-tutorial__el tooltips-tutorial__el--timer" ref="timer">

          <svg className="tooltips-tutorial__svg" x="0px" y="0px" viewBox="10 -10 82.6 90">
            <path d="M91.2-9.8L91-9.3C64.7,42.7,44.8,55.5,12.1,75.8l1.3-5.1L12,70.4l-1.8,7.4l7.3,2l0.3-1.4L13,77
              C45.8,56.6,65.9,43.8,92.2-8.7l0.2-0.4L91.2-9.8z"/>
          </svg>

          <span className="tooltips-tutorial__indication">Timer</span>

        </div>

        <div className="tooltips-tutorial__el tooltips-tutorial__el--luxbar" ref="luxbar">

          <svg className="tooltips-tutorial__svg" x="0px" y="0px" viewBox="56 -69.4 180.1 211">
            <path d="M233.3-68.6l-0.1,0.5c-2.6,22.7-11.1,46.7-25.2,71.4C195.5,25,178.7,47,159.4,67c-34.4,35.6-75,62.9-99.4,67l2.7-4l-1.2-0.9
              l-4.3,6.3l6.3,4.4l0.7-1.3l-4.3-3c24.6-3.9,65.7-31.3,100.5-67.4c19.4-20,36.2-42.1,48.8-63.9c14.3-24.8,22.8-49,25.5-72l0.1-0.5
             L233.3-68.6z"/>
          </svg>

          <span className="tooltips-tutorial__indication">Light gauge : catch the lux</span>

        </div>

        <div className="tooltips-tutorial__el tooltips-tutorial__el--depth" ref="depth">

          <svg className="tooltips-tutorial__svg" x="0px" y="0px" viewBox="19 1.2 99 68.8" ref="depth">
            <path d="M111.4,1.6l-0.7,1.3l4.3,3c-23.7,3.3-41.8,9.4-56.8,19.2c-15.2,9.8-27.5,23.6-38.9,43.3l-0.3,0.5l1.3,0.6l0.2-0.4
              C31.9,49.5,44.1,36,59.1,26.3c14.9-9.7,32.7-15.7,56-19l-2.7,4.1l1.2,0.9l4.2-6.4L111.4,1.6z"/>
          </svg>

          <span className="tooltips-tutorial__indication">Your depth</span>

        </div>

      </div>
    );
  }
}

export default IntroductionTooltips;
