import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';

import {
  EXP_GET_LUX_VALUE,
  EXP_LUX_VALUE_SENDED,
  EXP_PLAYER_TOGGLE_IS_IN_DANGER
} from 'config/messages';

/**
 * LuxBar component
 */
class LuxBar extends Component {

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.refreshTime = 500;

    this.luxVal = 0.9;

  }

  componentDidMount() {

    this.addEventListeners();


    this.width = this.refs.container.getBoundingClientRect().width;
    this.begin();
  }

  componentWillUnmount() {

    clearInterval( this.interval );

    this.removeEventListeners();
  }

  bind() {

    [ 'luxUpdate', 'getLuxVal', 'toggleDangerZone' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_LUX_VALUE_SENDED, this.getLuxVal );
    Emitter.on( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.toggleDangerZone );
  }

  removeEventListerners() {

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

      this.refs.container.classList.add('lux-bar--is-in-danger');
    } else {

      this.refs.container.classList.remove('lux-bar--is-in-danger');
    }

  }

  getLuxVal( val ) {

    this.luxVal = val;

  }


  luxUpdate() {    // Update bar style

    let width = this.luxVal * this.width;

    TweenMax.to( this.refs.progress, this.refreshTime / 1000, { width: width.toFixed( 2 ) });

  }

  render() {

    return (
      <div className="lux-bar" ref="container">

        <div className="lux-bar__progress" ref="progress"></div>

      </div>
    );
  }
}

export default LuxBar;
