import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_GET_DEPTH_VALUE,
  EXP_DEPTH_VALUE_SENDED
} from 'config/messages';

/**
 * DepthBar component
 */
class DepthBar extends Component {

  state = {
    depthIndicator: 100
  }

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.currentTime = 0;
  }

  componentDidMount() {

    this.addEventListeners();

    this.getDepthValue();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    this.depthUpdate = this.depthUpdate.bind( this );
  }

  addEventListeners() {

    Emitter.on( EXP_DEPTH_VALUE_SENDED, this.depthUpdate );
  }

  removeEventListerners() {

    Emitter.off( EXP_DEPTH_VALUE_SENDED, this.depthUpdate );
  }

  getDepthValue() {

    Emitter.emit( EXP_GET_DEPTH_VALUE );
  }

  depthUpdate( depthValue ) {

    this.setState({
      depthIndicator: depthValue
    });

    console.log('update', depthValue);
  }

  render() {

    return (

      <div className="depth-bar">

        <div className="depth-bar__progress">

          <div className="depth-bar__progress-indicator">

            <span>{this.state.depthIndicator}</span>

            <span>M</span>

          </div>

        </div>

      </div>

    );
  }
}

export default DepthBar;
