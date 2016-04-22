import './styles.scss';

import { Component } from 'react';

import WebGlHomeBackground  from 'components/WebGlHomeBackground';

import HomeSlider from 'components/HomeSlider';

import HomeTransitionCanvas from 'components/HomeTransitionCanvas';

import SplitText from 'vendors/splitText.js';

/*
 * Home class
 */
class Home extends Component {

  state = {
    progress: 0
  }

  componentDidMount() {
    this.introAnimation();
    this.generateTimelineMax();
  }

  introAnimation() {

    this.enterTitleTl = new TimelineMax();

    this.titleSplited = new SplitText( this.refs.title, {
      type: 'chars'
    });

    this.enterTitleTl
      .staggerFrom( this.titleSplited.chars, 1.5, { opacity: 0, scale: 0.8, y: '70%', ease: Back.easeOut.config(3), delay: 0.5 }, 0.1 );
  }

  generateTimelineMax() {

    this.transitionTl = new TimelineMax({ paused: true });

  }

  onDragComplete() {
    const tl = new TimelineMax({onComplete: ()=> {
      // TODO Stop raf
    } });

    const wrapperBoundingBox = this.refs.wrapper.getBoundingClientRect();

    tl
      .to( this.refs.wrapper, 2, { y: "-50%", ease: Power2.easeIn }, 0)
      .staggerTo( this.titleSplited.chars, 2, { opacity: 0, scale: 0.8, y: '-70%', ease: Back.easeOut.config(3) }, 0.1 , 0.5);

    this.refs.transitionCanvas.play();
  }

  onProgress( progress ) {
    this.setState({
      progress
    });
  }

  render() {

    return (
      <div className="page page--home">

        <div className="home__wrapper" ref="wrapper">

          <WebGlHomeBackground progress={this.state.progress} />

          <h1 className="home__title" ref="title">luxoperon</h1>

          <HomeSlider onProgress={::this.onProgress} onDragComplete={::this.onDragComplete} title={this.refs.title}/>

          <HomeTransitionCanvas ref="transitionCanvas" />

        </div>

      </div>
    );
  }
}

export default Home;
