import { Component } from 'react';
import WebGLHomeBackground  from 'components/WebGLHomeBackground';
import HomeSlider from 'components/HomeSlider';
import SplitText from 'vendors/splitText.js';

import './styles.scss';

/*
 * WebGLHome class
 */
class WebGLHome extends Component {

  state = {
    progress: 0
  }

  /**
   * componentDidMount function
   */
  componentDidMount() {
    this.introAnimation();
  }

  /**
   * introAnimation function
   */
  introAnimation() {

    this.enterTitleTl = new TimelineMax();

    this.titleSplited = new SplitText( this.refs.title, {
      type: 'chars'
    });

    this.enterTitleTl
      .staggerFrom( this.titleSplited.chars, 1.5, { opacity: 0, scale: 0.8, y: '70%', ease: Back.easeOut.config( 3 ), delay: 0.5 }, 0.1 );
  }

  /**
   * onProgress function
   * @param {number} progress Progress value
   */
  onProgress( progress ) {
    this.setState({
      progress
    });
  }

  render() {

    return (
      <div className="page page--home">

        <WebGLHomeBackground progress={this.state.progress} />

        <h1 className="home-title" ref="title">Luxoperon</h1>

        <HomeSlider onProgress={::this.onProgress} />

      </div>
    );
  }
}

export default WebGLHome;
