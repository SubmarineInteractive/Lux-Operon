import './styles.scss';

import { Component } from 'react';

import HomeBackground  from 'components/HomeBackground';

import HomeSlider from 'components/HomeSlider';

import SplitText from 'vendors/splitText.js';

/*
 * Home class
 */
class Home extends Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.introAnimation();
  }

  introAnimation() {

    this.enterTitleTl = new TimelineMax();

    this.titleSplited = new SplitText( this.refs.title, {
      type: 'chars'
    });


    this.enterTitleTl
      .staggerFrom( this.titleSplited.chars, 1.5, { opacity: 0, scale: 0.8, y: '70%', ease: Back.easeOut.config(3), delay: 0.5}, 0.1 );
  }

  render() {

    // <Stats isActive={__DEV__} />
    return (
      <div className="page page--home">

        <HomeBackground />

        <h1 className="home-title" ref="title">luxoperon</h1>

        <HomeSlider />

      </div>
    );
  }
}

export default Home;
