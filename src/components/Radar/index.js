import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';

import RadarLayer from './RadarLayer';

import {
  EXP_GET_CAMERA_POSITION,
  EXP_CAMERA_POSITION_SENDED
} from 'config/messages';


// import debounce from 'lodash.debounce';

/**
* Radar class
*/
class Radar extends Component {

  state = {
    canvasOnTopIndex: 0
  }

  componentWillMount() {

    this.interval = null;

    this.config = {
      refreshTime: 3,
      radarSize: 200,
      radarScannerSize: 2
    };

    this.bind();
    this.addListeners();
  }

  componentDidMount() {

    this.radarEls = this.refs.container.querySelectorAll( '.radar__canvas' );

    this.generateTimelineMax();

    this.startInterval();
  }

  componentWillUnmount() {

    this.removeListeners();
  }

  bind() {
    this.onCameraPositionSended = this.onCameraPositionSended.bind( this );
  }

  addListeners() {
    Emitter.on( EXP_CAMERA_POSITION_SENDED, this.onCameraPositionSended );
  }

  removeListeners() {

  }

  generateTimelineMax() {

    this.radarTl = new TimelineMax({ repeat: -1 });
    //
  }

  startInterval() {


    this.interval = setInterval( ()=>{
      Emitter.emit( EXP_GET_CAMERA_POSITION );

      // this.updateCanvas( index );

    }, this.config.refreshTime * 1000);

  }

  onCameraPositionSended(position) {

    const index = ( this.state.canvasOnTopIndex ) ? 0 : 1;

    this.updateCanvas( position, index );

  }

  updateCanvas( position, index ) {

    this.setState({
      canvasOnTopIndex: index
    });

    this.refs[ `canvas${index}` ].update( position, index );

    TweenMax.killTweensOf( this.refs.scannerBar );

    for ( let i = 0; i < this.radarEls.length; i++ ) {
      TweenMax.killTweensOf( this.radarEls[ i ] );
      this.radarEls[ i ].classList.remove( 'radar--is-on-top' );
    }

    this.radarEls[ index ].classList.add( 'radar--is-on-top' );

    TweenMax.fromTo( this.refs.scannerBar, this.config.refreshTime,{
      x: 0
    },{
      x: this.config.radarSize + this.config.radarScannerSize,
      ease: Power2.easeOut
    });

    TweenMax.fromTo( this.radarEls[ index ], this.config.refreshTime, {
      width: 0
    },{
      width: this.config.radarSize,
      ease: Power2.easeOut
    });

  }

  render() {

    return (

      <div className="radar" ref="container">

      <div className="radar__scanner" ref="scanner">

      <span className="radar__scanner-bar" ref="scannerBar"></span>

      </div>

      <RadarLayer className="radar__canvas radar--is-on-top" size={this.config.radarSize} ref="canvas0" />

      <RadarLayer className="radar__canvas" size={this.config.radarSize} ref="canvas1" />

      </div>

    );
  }
}

export default Radar;
