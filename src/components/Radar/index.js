import './styles.scss';

import { Component } from 'react';

import Emitter from 'helpers/Emitter';

import RadarLayer from './RadarLayer';

import { normalize } from 'utils';

import { terrain } from 'config/webgl/experience';

import {
  EXP_GET_CAMERA_POSITION,
  EXP_CAMERA_POSITION_SENDED,
  EXP_FISH_GET_POSITION,
  EXP_FISH_GROUP_POSITION_SENDED
} from 'config/messages';

/**
 * Radar component
 */
class Radar extends Component {

  state = {
    canvasOnTopIndex: 0
  }

  componentWillMount() {

    this.interval = null;

    this.config = {
      refreshTime: 2,
      radarSize: 150,
      radarScannerSize: 2
    };

    this.previousPosition = {
      x: 0,
      y: 0
    };

    this.fishesNormalizePosition = [];
    this.camNormalizePosition = [];

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
    this.onFishesPositionSended = this.onFishesPositionSended.bind( this );
  }

  addListeners() {
    Emitter.on( EXP_CAMERA_POSITION_SENDED, this.onCameraPositionSended );
    Emitter.on( EXP_FISH_GROUP_POSITION_SENDED, this.onFishesPositionSended );
  }

  removeListeners() {

    Emitter.off( EXP_CAMERA_POSITION_SENDED, this.onCameraPositionSended );
    Emitter.off( EXP_FISH_GROUP_POSITION_SENDED, this.onFishesPositionSended );
  }

  generateTimelineMax() {

    this.radarTl = new TimelineMax({ repeat: -1 });
  }

  startInterval() {

    this.interval = setInterval( ()=>{

      const index = ( this.state.canvasOnTopIndex ) ? 0 : 1;

      this.fishesPosition = [];

      Emitter.emit( EXP_FISH_GET_POSITION );

      Emitter.emit( EXP_GET_CAMERA_POSITION );

      setTimeout( ()=> {
        this.updateCanvas( index );
      }, 300 );

    }, this.config.refreshTime * 1000 );

  }

  onCameraPositionSended( position ) {

    this.prevCamNormalizePosition = this.camNormalizePosition;

    this.camNormalizePosition  = {
      x: normalize( 0, terrain.geometry.width, position.x ) + 0.5,
      y: normalize( 0, terrain.geometry.height, position.z ) * -1 + 0.5
    };
  }

  onFishesPositionSended( positions ) {

    for ( let i = 0; i < positions.length; i++ ) {

      const pos = {
        x: normalize( 0, terrain.geometry.width, positions[ i ].x ) + 0.5,
        y: normalize( 0, terrain.geometry.height, positions[ i ].z ) * -1 + 0.5,
      };

      this.fishesPosition.push( pos );

    }

  }

  updateCanvas( index ) {

    this.setState({
      canvasOnTopIndex: index
    });

    this.refs[ `canvas${index}` ].update({
      previousCamPosition: this.prevCamNormalizePosition,
      camPosition: this.camNormalizePosition,
      fishesPosition: this.fishesPosition,
      index
    });

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
