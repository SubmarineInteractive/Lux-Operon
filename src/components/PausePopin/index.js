import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_PAUSE_POPIN_TOGGLE
} from 'config/messages';

/**
 * PausePopin component
 */
class PausePopin extends Component {

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

    this.onPopinToggle = this.onPopinToggle.bind( this );
  }

  addEventListeners() {

    Emitter.on( EXP_PAUSE_POPIN_TOGGLE, this.onPopinToggle );
  }

  removeEventListeners() {
    Emitter.off( EXP_PAUSE_POPIN_TOGGLE, this.onPopinToggle );
  }

  onPopinToggle( toggle ) {

    if( toggle ) {
      this.refs.container.classList.add( 'pause-popin--is-displayed' );

      TweenMax.to( this.refs.container, 1, { autoAlpha: 1, ease: Expo.easeOut });

    } else {

      TweenMax.to( this.refs.container, 0.3, { autoAlpha: 0, ease: Expo.easeOut, onComplete: ()=> {
        this.refs.container.classList.remove( 'pause-popin--is-displayed' );
      } });

    }
  }

  render() {

    return (

      <div className="pause-popin" ref="container">

        <span className="pause-popin__text">Paused</span>

      </div>

    );
  }
}

export default PausePopin;
