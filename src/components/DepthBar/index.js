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
    depthIndicator: 700
  }

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.currentTime = 0;
    this.interval = null;
    this.refreshTime = 500;
    this.levelDepthOffset = this.props.config.levelDepthOffset;
    this.innerBarCoef = this.props.config.depthBar.innerBarCoef;
    this.tweenDepthIndicator = 700;
  }

  componentDidMount() {

    this.addEventListeners();

    this.begin();
  }

  componentWillUnmount() {

    clearInterval( this.interval );

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

  begin() {

    this.getDepthValue();

    this.interval = setInterval( ()=>{

      this.getDepthValue();

    }, this.refreshTime );
  }

  getDepthValue() {

    Emitter.emit( EXP_GET_DEPTH_VALUE );
  }

  depthUpdate( value ) {

    const newDepth = -( this.levelDepthOffset - value );
    const progressHeight = `${ (this.levelDepthOffset - value) / this.innerBarCoef }%`;

    // Update text indicator
    TweenMax.to( this, this.refreshTime / 1000 , { tweenDepthIndicator: newDepth, onUpdate: ()=> {

      this.setState({
        depthIndicator: parseInt( this.tweenDepthIndicator )
      });

    } });

    // Update bar style
    TweenMax.to( this.refs.progress, this.refreshTime / 1000, { height: progressHeight });

  }

  render() {

    return (

      <div className="depth-bar">

        <div className="depth-bar__progress" ref="progress">

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
