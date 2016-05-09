import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_DEPTH_VALUE_SENDED,
  ABOUT_OPEN,
  TOOLTIPS_SHOW
} from 'config/messages';

/**
 * LevelInfos component
 */
class LevelInfos extends Component {

  state = {
    depth: 200,
    temp: 200,
    pressure: 200
  }

  componentWillMount() {

    this.levelDepthOffset = this.props.config.levelDepthOffset;
    this.tweenDepthIndicator = 700;

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'depthUpdate', 'openAbout', 'showTooltips' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_DEPTH_VALUE_SENDED, this.depthUpdate );
  }

  removeEventListeners() {

    Emitter.off( EXP_DEPTH_VALUE_SENDED, this.depthUpdate );
  }

  openAbout() {
    Emitter.emit( ABOUT_OPEN );
  }

  showTooltips() {
    Emitter.emit( TOOLTIPS_SHOW );
  }

  depthUpdate( value ) {

    const newDepth = -( this.levelDepthOffset - value );
    const newTemp = - ( ( this.levelDepthOffset - value ) / 150 ) + 14;
    const newPressure = this.levelDepthOffset - value + 1;

    TweenMax.to( this, this.refreshTime / 1000 ,
      {

        tweenDepthIndicator: newDepth,

        onUpdate: ()=> {

          this.setState({
            depth: parseInt( this.tweenDepthIndicator ),
            temp: parseInt( newTemp ),
            pressure: Math.round( newPressure * 10 ) / 10
          });

        }
      });
  }

  render() {

    const title = `${this.props.config.name} zone`;
    const depth = `${this.state.depth} meters`;
    const temp = `${this.state.temp}°C/${this.state.temp + 32}°F`;
    const pressure = `${this.state.pressure} bar`;

    return (

      <div className="level-infos">

        <h1 className="level-infos__title">{title}</h1>

        <p className="level-infos__depth">{depth}</p>

        <p className="level-infos__temp">{temp}</p>

        <p className="level-infos__pressure">{pressure}</p>

        <button className="level-infos__helper-button" onClick={this.showTooltips}>?</button>

      </div>

    );
  }
}

export default LevelInfos;
