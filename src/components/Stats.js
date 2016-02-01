import { Component } from 'react';
import raf from 'raf';
import StatsJS from '@jordandelcros/stats-js';
import { DOMElement } from 'components';

/**
 * Stats class
 */
class Stats extends Component {

  static propTypes = {
    isActive: React.PropTypes.bool
  };

  static defaultProps = {
    isActive: true
  };

  constructor(props) {
    super(props);

    this.stats = new StatsJS( false );
    this.update();
  }

  update() {
    this.stats.begin();
    this.stats.end();

    raf( ::this.update );
  }

  render() {
    if ( ! this.props.isActive ) {
      return null;
    }

    return (
      <DOMElement child={this.stats.domElement} style={{ position: 'absolute' }} />
    );
  }
}

export default Stats;