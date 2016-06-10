import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';

import {
  EXP_GET_LUX_VALUE,
  EXP_LUX_VALUE_SENDED,
  EXP_PLAYER_TOGGLE_IS_IN_DANGER
} from 'config/messages';

/**
 * ExperienceOverlay class
 */
class ExperienceOverlay extends Component {

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.refreshTime = 1000;

    this.luxVal = 0.9;
  }

  componentDidMount() {

    this.addEventListeners();
    this.begin();
    //this.debug();
  }

  componentWillUnmount() {

    clearInterval( this.interval );

    this.removeEventListeners();

  }

  debug() {

    window.debug.toggleDangerZone = () => {

      this.toggleDangerZone();
    };

  }

  bind() {

    [ 'luxUpdate', 'getLuxVal', 'toggleDangerZone' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_LUX_VALUE_SENDED, this.getLuxVal );
    Emitter.on( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.toggleDangerZone );
  }

  removeEventListeners() {

    Emitter.off( EXP_LUX_VALUE_SENDED, this.getLuxVal );
    Emitter.off( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.toggleDangerZone );
  }

  begin() {

    this.interval = setInterval( ()=>{

      Emitter.emit( EXP_GET_LUX_VALUE );

      this.luxUpdate();

    }, this.refreshTime );
  }

  toggleDangerZone( toggleVal ) {

    if( toggleVal ) {

      this.refs.dangerLayer.classList.add( 'experience-overlay__layer--is-display' );
    } else {

      this.refs.dangerLayer.classList.remove( 'experience-overlay__layer--is-display' );
    }

  }

  getLuxVal( val ) {

    this.luxVal = val;

  }

  luxUpdate() {    // Update bar style

    TweenMax.to( this.refs.darkerLayer, this.refreshTime / 1000, { opacity: 1 - this.luxVal.toFixed( 2 ) });

  }

  render() {

    return (

      <div className="experience-overlay" ref="container">
        <div className="experience-overlay__layer experience-overlay__layer--darker" ref="darkerLayer"></div>
        <div className="experience-overlay__layer experience-overlay__layer--danger"  ref="dangerLayer"></div>
      </div>

    );
  }
}

export default ExperienceOverlay;
