import { Component } from 'react';

/**
 * Radar class
 */
class Radar extends Component {

  state = {
  }

  componentWillMount() {
  }

  componentDidMount() {

    this.radarTexture = new Image();
    this.radarTexture.src = "/images/experience/height-map-radar-1.png";

    this.radarTexture.onload = ()=> {
      this.initCanvas();
    }

  }

  componentWillUnmount() {
    this.removeListeners();
  }

  initCanvas() {

    console.log('initCanvas');

    this.clientRect = this.refs.canvas.getBoundingClientRect();

    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext( '2d' );

    // ---- Size
    this.canvas.width = this.width = this.props.size;
    this.canvas.height = this.height = this.props.size;

    this.haldWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    const r = Math.floor(Math.random()* 256);
    const g = Math.floor(Math.random()* 256);
    const b = Math.floor(Math.random()* 256);

    this.ctx.beginPath();
    this.ctx.arc( this.haldWidth , this.haldWidth, this.haldWidth, 0, 2 * Math.PI, false);
    this.ctx.clip();
    this.ctx.drawImage(this.radarTexture, 0, 0, this.width, this.height);
  }

  update() {
    console.log('update method');
  }

  render() {

    return (
      <div className="radar__canvas">

        <canvas className="radar__canvas-el" ref="canvas"></canvas>

      </div>
    );
  }
}

export default Radar;
