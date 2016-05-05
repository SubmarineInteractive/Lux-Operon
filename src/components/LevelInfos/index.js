import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_DEPTH_VALUE_SENDED
} from 'config/messages';

/**
 * LevelInfos component
 */
class LevelInfos extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

    this.begin();
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


  depthUpdate( value ) {

  }

  render() {

    return (

      <div className="level-infos">

        <h1 className="level-infos__title">MEZAL ZONE</h1>
        
        <p className="level-infos__depth">{this.state.depth}</p>

        <p className="level-infos__temp">{this.state.temp}</p>

        <p className="level-infos__pressure">{this.state.pressure}</p>

        <button class="level-infos__helper-button">?</button>

      </div>

    );
  }
}

export default LevelInfos;
