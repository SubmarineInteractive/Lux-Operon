import './styles.scss';

import { Component } from 'react';
// import classNames from 'classnames';

/**
 * HomeSlider class
 */
class HomeSlider extends Component {

  state = {
    canDrag: false
  }

  componentDidMount() {
    this.generateRepeatTimelineMax();
    this.generateTimelineMax();
  }

  generateRepeatTimelineMax() {

    this.innerCircleLoopTl = new TimelineMax({ repeat: -1, yoyo: true });
    this.bigCircleLoopTl = new TimelineMax({ repeat: -1 });

    this.innerCircleLoopTl.fromTo( this.refs.innerGrabberCircle, 0.8, { transformOrigin: "center center", scale: 1 }, { scale: 0.95, ease: Expo.easeOut });

    this.bigCircleLoopTl.fromTo( this.refs.bigCircle, 15, { transformOrigin: "center center", rotation: 0 }, { rotation: 360, ease: Power0.easeNone });

  }

  generateTimelineMax() {

    this.grabberHoverTl = new TimelineMax({
      paused: true,
      onReverseComplete: ()=> {
        this.innerCircleLoopTl.play( 0 );
      }
    });


    this.grabberHoverTl
      .fromTo( this.refs.innerGrabberCircle, 0.3, { scale: 1 }, { scale: 0.85, ease: Back.easeOut });

  }

  onMouseUp() {
    if( !this.state.canDrag ) return;

    this.setState({
      canDrag: false
    });
  }

  onMouseDown() {
    if( this.state.canDrag ) return;

    this.setState({
      canDrag: true
    });
  }

  onMouseMove( ev ) {

    console.log( ev );
  }

  // ---- Grabber ----
  onGrabberMouseEnter() {
    this.innerCircleLoopTl.pause();
    this.grabberHoverTl.play();
  }

  onGrabberMouseLeave() {
    this.grabberHoverTl.reverse();
  }

  render() {

    return (

      <div className="home-slider">

        <svg
          className="home-slider__svg"
          viewBox="0 0 39.5 137.3"
        >

          <line
            className="home-slider__svg-line"
            ref="line"
            x1="19.6"
            y1="98.2"
            x2="19.6"
            y2="34.2"
          />

          <circle
            className="home-slider__svg-big-circle"
            ref="bigCircle"
            cx="19.7"
            cy="117.2"
            r="19.2"
          />

          <g
            className="home-slider__grabber"
            ref="grabber"
            onMouseEnter={::this.onGrabberMouseEnter}
            onMouseLeave={::this.onGrabberMouseLeave}
          >

            <circle
              className="home-slider__svg-inner-grabber"
              ref="innerGrabberCircle"
              cx="19.5"
              cy="17.2"
              r="11.1"
            />

            <circle
              className="home-slider__svg-outer-grabber"
              ref="outerGrabberCircle"
              cx="19.7"
              cy="17.2"
              r="16"
            />

          </g>

        </svg>

        <p
          className="home-slider__instructions"
          ref="instructions"
        >
          Rassemblez les cercles<br/>
          pour plonger sous l’eau
        </p>

      </div>

    );
  }
}

export default HomeSlider;
