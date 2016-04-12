import './styles.scss';

import { Component } from 'react';

import HomeBackground  from 'components/HomeBackground';

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

        <h1 className="home-title">Lux Operon</h1>

        <HomeBackground />

      </div>
    );
  }
}

export default Home;
