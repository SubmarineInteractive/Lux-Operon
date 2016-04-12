import './styles.scss';

import { Component } from 'react';

import HomeBackground  from 'components/HomeBackground';
import HomeSlider from 'components/HomeSlider';

/*
 * Home class
 */
class Home extends Component {

  constructor( props ) {
    super( props );
  }

  render() {

    // <Stats isActive={__DEV__} />
    return (
      <div className="page page--home">

        <HomeBackground />

        <h1 className="home-title">Lux Operon</h1>

        <HomeSlider />

      </div>
    );
  }
}

export default Home;
