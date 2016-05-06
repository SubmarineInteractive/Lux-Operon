import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import IntroductionTitle from './IntroductionTitle';

import IntroductionTutorial from './IntroductionTutorial';

import {
  EXP_TOGGLE_CAMERA,
  EXP_TIMER_START,
  EXP_INTRO_ENDED
} from 'config/messages';

/**
 * LevelIntroduction component
 */
class LevelIntroduction extends Component {

  state = {
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
    [ 'beginTutorial', 'beginTooltips', 'endIntroduction' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

  }

  removeEventListeners() {

  }

  generateTimelineMax() {

  }

  beginTitle() {
    this.refs.titleStep.begin();
  }

  beginTutorial() {
    this.refs.tutorialStep.begin();
  }

  beginTooltips() {
    // this.refs.tutorialStep.begin();
  }

  endIntroduction() {

    TweenMax.to( this.refs.container, 1.5, { opacity: 0, ease: Expo.easeOut, onComplete: ()=> {

      Emitter.emit( EXP_TOGGLE_CAMERA, true );
      Emitter.emit( EXP_TIMER_START, 180 );
      Emitter.emit( EXP_INTRO_ENDED );
    } });

  }

  render() {

    return (

      <div className="level-introduction" ref="container">

        <IntroductionTitle config={this.props.config} ended={this.beginTutorial} ref="titleStep" />

        <IntroductionTutorial config={this.props.config} ended={this.endIntroduction} ref="tutorialStep" />

      </div>

    );
  }
}

export default LevelIntroduction;
