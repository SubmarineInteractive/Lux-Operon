import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import TitleIntroduction from './TitleIntroduction';

import {
  EXP_TOGGLE_CAMERA,
  EXP_TIMER_START
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

    this.beginTitle();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {
  }

  addEventListeners() {

  }

  removeEventListerners() {

  }

  generateTimelineMax() {
  }

  beginTitle() {
  }

  beginTutorial() {

  }

  beginTooltips() {

  }

  endIntroduction() {

    TweenMax.to( this.refs.container, 1.5, { opacity: 0, ease: Expo.easeOut, onComplete: ()=> {
      Emitter.emit( EXP_TOGGLE_CAMERA, true );
      Emitter.emit( EXP_TIMER_START, 180 );

    } });

  }

  render() {

    return (

      <div className="level-introduction" ref="container">

        <TitleIntroduction config={this.props.config} />

      </div>

    );
  }
}

export default LevelIntroduction;
