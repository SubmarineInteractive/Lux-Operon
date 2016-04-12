import './styles.scss';

import { Component } from 'react';

import HomeBackground  from 'components/HomeBackground';
import HomeSlider from 'components/HomeSlider';

import SplitText from '../../vendors/splitText.js';

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
  }

  render() {

    // <Stats isActive={__DEV__} />
    return (
      <div className="page page--home">

        <HomeBackground />

        <h1 className="home-title">luxoperon</h1>

        <HomeSlider />

      </div>
    );
  }
}

export default Home;
