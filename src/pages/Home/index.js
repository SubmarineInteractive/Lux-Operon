import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import { findDOMNode } from 'react-dom';

import WebGlHomeBackground  from 'components/WebGlHomeBackground';

import HomeSlider from 'components/HomeSlider';

import HomeTransitionCanvas from 'components/HomeTransitionCanvas';

import SplitText from 'vendors/splitText.js';

import { ABOUT_OPEN } from 'config/messages';

/*
 * Home class
 */
class Home extends Component {

  state = {
    progress: 0
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {
    this.introAnimation();
    this.generateTimelineMax();
  }

  componentWillLeave( callback ) {
    TweenMax.to( this.refs.home, 1, { opacity: 0, delay: 3, ease: Expo.easeOut, onComplete: () => callback() });
  }

  bind() {

    [ 'showAbout', 'onDragComplete', 'onProgress' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  introAnimation() {

    this.enterTitleTl = new TimelineMax();

    this.titleSplited = new SplitText( this.refs.title, {
      type: 'chars'
    });

    this.catchphraseSplited = new SplitText( this.refs.catchphrase, {
      type: 'words'
    });

    this.enterTitleTl
      .staggerFrom( this.titleSplited.chars, 1.5, { opacity: 0, scale: 0.8, y: '70%', ease: Back.easeOut.config( 3 ), delay: 0.5 }, 0.1 )
      .staggerFrom( this.catchphraseSplited.words, 1.5, { opacity: 0, ease: Expo.easeOut }, 0.1, "-=1" );
  }

  generateTimelineMax() {

    this.transitionTl = new TimelineMax({ paused: true });
  }

  showAbout() {

    Emitter.emit( ABOUT_OPEN );
  }

  onDragComplete() {
    const tl = new TimelineMax({ onComplete: () => {
      this.refs.backgroundScene.scene.raf.stop();

      setTimeout( () =>{
        this.refs.wrapper.style.transform = 'none';
        this.refs.home.style.position = 'absolute';
        this.refs.home.style.top = 0;
        findDOMNode( this.refs.backgroundScene ).style.display = 'none';
      }, 1000 );
    } });

    tl.to( this.refs.wrapper, 2, { y: "-50%", ease: Power2.easeIn }, 0 )
      .staggerTo( this.titleSplited.chars, 2, { opacity: 0, scale: 0.8, y: '-70%', ease: Back.easeOut.config( 3 ) }, 0.1 , 0.5 )
      .to( this.refs.catchphrase, 1, { opacity: 0, ease: Expo.easeOut }, 0 );

    this.refs.transitionCanvas.play();
  }

  onProgress( progress ) {
    this.setState({
      progress
    });
  }

  render() {

    return (
      <div className="page page--home" ref="home">

        <div className="home__wrapper" ref="wrapper">

          <button className="home__about" onClick={this.showAbout}>about</button>

          <WebGlHomeBackground progress={this.state.progress} ref="backgroundScene" />

          <div className="home__intro-text">

            <h1 className="home__title" ref="title">luxoperon</h1>

            <p className="home__catchphrase" ref="catchphrase">Your mission is to go into deep seas and discover the biosphere mysteries.</p>

          </div>

          <HomeSlider onProgress={this.onProgress} onDragComplete={this.onDragComplete} title={this.refs.title}/>

          <HomeTransitionCanvas ref="transitionCanvas" />

        </div>

      </div>
    );
  }
}

export default Home;
