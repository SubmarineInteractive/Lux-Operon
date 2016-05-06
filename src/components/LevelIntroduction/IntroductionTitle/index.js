import './styles.scss';

import { Component } from 'react';

import SplitText from 'vendors/splitText.js';

import {

} from 'config/messages';

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

    // Title Timeline
    this.titleSplited = new SplitText( this.refs.titleName, {
      type: 'chars'
    });

    this.titleTl = new TimelineMax({ paused: true, onComplete: ()=> {
      this.props.ended();
      this.refs.container.style.display = 'none';
    } });

    this.titleTl
      .from( this.refs.titleDive, 1, { y: '200%', ease: Expo.easeOut }, 3 )
      .from( this.refs.titleSep, 0.6, { scale: 0, ease: Expo.easeOut }, '-=0.3' )
      .staggerFrom( this.titleSplited.chars, 1.8, { opacity: 0, ease: Expo.easeOut }, 0.05, '-=0.6' )
      .to( this.refs.container, 1.4, { opacity: 0, y: '-75%', ease: Expo.easeOut }, '-=0.3');

  }

  beginTitle() {

    this.titleTl.play();
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
