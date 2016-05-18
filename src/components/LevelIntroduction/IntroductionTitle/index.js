import './styles.scss';

import { Component } from 'react';

import SplitText from 'vendors/splitText.js';

import SoundManager from 'helpers/SoundManager';

/**
 * IntroductionTitle component
 */
class IntroductionTitle extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'skip', 'onKeyUp', 'begin' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );
  }

  removeEventListeners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );
  }

  generateTimelineMax() {

    // Title Timeline
    this.titleSplited = new SplitText( this.refs.titleName, {
      type: 'chars'
    });

    this.titleTl = new TimelineMax({ paused: true, onComplete: ()=> {
      this.props.ended();
      this.refs.container.style.display = 'none';
    } });

    this.titleTl
      .from( this.refs.titleDive, 1, { y: '200%', ease: Expo.easeOut })
      .from( this.refs.titleSep, 0.6, { scale: 0, ease: Expo.easeOut }, '-=0.3' )
      .staggerFrom( this.titleSplited.chars, 1.8, { opacity: 0, ease: Expo.easeOut }, 0.05, '-=0.6' )
      .to( this.refs.container, 1.4, { opacity: 0, y: '-75%', ease: Expo.easeOut }, '-=0.3' );

  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.skip();
    }
  }

  begin() {

    this.addEventListeners();

    this.titleTl.play();

    SoundManager.play( 'level-1-intro' );
  }

  skip() {

    this.refs.container.style.display = "none";

    this.titleTl.stop();

    this.removeEventListeners();

    this.props.ended();
  }


  render() {

    const title = `${this.props.config.name} zone`;

    return (

      <div className="introduction-title" ref='container'>

        <strong className="introduction-title__dive">

          <span ref="titleDive">First Dive</span>

        </strong>

        <span className="introduction-title__separator" ref="titleSep"></span>

        <h1 className="introduction-title__name" ref="titleName">{title}</h1>

      </div>


    );
  }
}

export default IntroductionTitle;
