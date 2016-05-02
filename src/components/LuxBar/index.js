import './styles.scss';

import { Component } from 'react';

/**
 * LuxBar component
 */
class LuxBar extends Component {

  render() {

    return (
      <div className="lux-bar">
        <div className="lux-bar__progress"></div>
      </div>
    );
  }
}

export default LuxBar;