import './styles.scss';

import Emitter from 'helpers/Emitter';

import { level1Config } from 'config/webgl/experience';

import { Component } from 'react';

import {
} from 'config/messages';

/**
 * FishCounter component
 */
class FishCounter extends Component {

  state = {
    goal: level1Config.goal
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    this.depthUpdate = this.depthUpdate.bind( this );
  }

  addEventListeners() {

    // Emitter.on( EXP_DEPTH_VALUE_SENDED, this.depthUpdate );
  }

  removeEventListeners() {
  }

  render() {

    return (

      <div className="fish-counter">

        / { this.state }
      </div>

    );
  }
}

export default FishCounter;
