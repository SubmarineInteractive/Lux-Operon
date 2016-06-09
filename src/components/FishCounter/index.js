import './styles.scss';

import Emitter from 'helpers/Emitter';

import { levels } from 'config/webgl/experience';

import { Component } from 'react';

import {
  EXP_FISH_COUNT_UPDATE
} from 'config/messages';

/**
 * FishCounter component
 */
class FishCounter extends Component {

  state = {
    counter: 0,
    goal: levels.level1Config.goal
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

    this.incrementCounter = this.incrementCounter.bind( this );
  }

  addEventListeners() {

    Emitter.on( EXP_FISH_COUNT_UPDATE, this.incrementCounter );
  }

  removeEventListeners() {
    Emitter.on( EXP_FISH_COUNT_UPDATE, this.incrementCounter );
  }

  incrementCounter( counter ) {

    this.setState({
      counter
    });

  }

  render() {

    const counter = ( this.state.counter > this.state.goal ) ? this.state.goal : this.state.counter;
    const goal = this.state.goal;

    return (

      <div className="fish-counter">

        <div className="fish-counter__text">

          <span className="fish-counter__current">{ counter }</span>

          <span className="fish-counter__goal">{ goal }</span>

        </div>

        <svg className="fish-counter__icon" viewBox="0 0 205.08 72.82">

          <path className="fish-counter__icon-path" d="M22.48,159.57s113.62-120,204.66-32.83c0,0-75.87,98.12-204.54-38.23Z" transform="translate(-22.27 -88.3)"/>

        </svg>

      </div>

    );
  }
}

export default FishCounter;
