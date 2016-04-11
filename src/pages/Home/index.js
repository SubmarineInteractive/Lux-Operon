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
      <div className="container">
        <HomeBackground />
      </div>
    );
  }
}

export default Home;
