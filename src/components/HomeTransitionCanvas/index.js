import './styles.scss';

import { Component } from 'react';
import { history } from 'store';
import raf from 'raf';

/**
* HomeTransitionCanvas class
*/
class HomeTransitionCanvas extends Component {

  componentWillMount() {

    this.bind();

    this.addListeners();

    this.updateActive = false;
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext( '2d' );

    this.onWindowResize();
    this.prepareDrawing();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  bind() {
    this.update = this.update.bind( this );
    this.onWindowResize = this.onWindowResize.bind( this );
  }

  addListeners() {
    window.addEventListener( 'onWindowResize', this.onWindowResize, false );
  }

  removeListeners() {
  }

  prepareDrawing() {

    this.imageTransitionStart = new Image();
    this.imageTransitionStart.src = 'images/home/transition-start.png';

    this.imageTransitionLoop = new Image();
    this.imageTransitionLoop.src = 'images/home/transition-loop.png';

    this.ctx.fillStyle = '#030607';

    this.ctx.fillRect( 0, 0, this.width, this.height );

    this.imageConfig = {
      offsetY: 0,
      ratio: 1024 / 1977,
      width: this.width,
      height: this.width / ( 1024 / 1977 ),
      scrollSpeed: 1
    };

    this.imageConfig.translateY =  - this.imageConfig.height;

    this.imageTransitionStart.onload = () => {
      this.ctx.drawImage( this.imageTransitionStart, 0, 0, this.imageConfig.width, this.imageConfig.height );
    };

    this.loopTl = new TimelineMax({ paused: true, repeat: -1, onUpdate: () => {
      this.drawLoop( this.imageConfig.offsetY );
    } });

    this.loopTl
      .to( this.imageConfig, this.imageConfig.scrollSpeed, { offsetY: this.imageConfig.translateY, ease: Power0.easeNone });
  }

  drawStartFirst() {
    this.ctx.clearRect( 0, 0, this.width, this.height );
    this.ctx.drawImage( this.imageTransitionStart, 0, this.imageConfig.offsetY, this.imageConfig.width, this.imageConfig.height );
    this.ctx.drawImage( this.imageTransitionLoop, 0, this.imageConfig.offsetY + this.imageConfig.height, this.imageConfig.width, this.imageConfig.height );
  }

  drawLoop( offsetYProgress ) {
    this.ctx.clearRect( 0, 0, this.width, this.height );
    this.ctx.drawImage( this.imageTransitionLoop, 0, offsetYProgress, this.imageConfig.width, this.imageConfig.height );
    this.ctx.drawImage( this.imageTransitionLoop, 0, offsetYProgress + this.imageConfig.height, this.imageConfig.width, this.imageConfig.height );
  }

  play() {
    TweenMax.to( this.imageConfig, this.imageConfig.scrollSpeed, { offsetY: this.imageConfig.translateY,
      onUpdate: () => {

        this.drawStartFirst();

      },
      onComplete: () => {

        this.imageConfig.offsetY = 0;
        this.loopTl.play( 0 );
        
        setTimeout( () => history.push( '/experience' ), 1000 );
      },

      ease: Power0.easeNone,

      delay: 2
    });
  }

  onWindowResize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  update() {

    if( this.updateActive ) {
      this.render();
      this.raf = raf( this.update );
    } else {
      raf.cancel( this.raf );
    }
  }

  render() {

    return (
      <canvas className="transition-canvas" ref="canvas" />
    );
  }
}

export default HomeTransitionCanvas;
