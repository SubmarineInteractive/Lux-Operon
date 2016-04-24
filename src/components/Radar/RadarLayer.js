import Emitter from 'helpers/Emitter';

import { Component } from 'react';
import { degreeToRadian } from 'utils';


/**
 * RadarLayer class
 */
class RadarLayer extends Component {

  state = {
  }

  componentWillMount() {
    this.addListeners();
  }

  componentDidMount() {

    this.cursorTexture = new Image();
    this.cursorTexture.src = "/images/experience/radar-cursor.png";

    this.cursorTexture.onload = ()=> {
      this.initCanvas();
    }

    this.cursorConfig = {
      width: 14,
      height: 16
    }

    this.initCanvas();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners() {
  }

  removeListeners() {
  }

  initCanvas() {

    console.log('initCanvas');

    this.clientRect = this.refs.canvas.getBoundingClientRect();

    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext( '2d' );

    // ---- Size
    this.canvas.width = this.width = this.props.size;
    this.canvas.height = this.height = this.props.size;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    // this.update();
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.arc( this.halfWidth , this.halfWidth, this.halfWidth, 0, 2 * Math.PI, false );
    this.ctx.clip();
    this.ctx.drawImage( this.radarTexture, 0, 0, this.width, this.height );
  }

  drawCursor({ x, y, angle }) {

    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.arc( this.halfWidth , this.halfWidth, this.halfWidth, 0, 2 * Math.PI, false );
    this.ctx.clip();

    this.ctx.translate( x, y );
    this.ctx.rotate( degreeToRadian( angle ) );

    this.ctx.drawImage( this.cursorTexture, -this.cursorConfig.width/2, -this.cursorConfig.width/2, this.cursorConfig.width, this.cursorConfig.height );
    this.ctx.restore();
  }

  update( position, index ) {

    console.log( 'update canvas #' + index + ' camera position = ', position );

    this.ctx.clearRect( 0, 0, this.width, this.height );

    this.drawCursor({
      x: this.halfWidth,
      y: this.halfHeight,
      angle: 90
    });

  }



  render() {

    return (
      <div className="radar__canvas">

        <canvas className="radar__canvas-el" ref="canvas"></canvas>

      </div>
    );
  }
}

export default RadarLayer;
