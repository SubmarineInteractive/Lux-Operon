import './styles.scss';

import { clamp } from 'utils';
import { Component } from 'react';
import { on, off } from 'dom-events';
import debounce from 'lodash.debounce';
import SplitText from 'vendors/splitText.js';


/**
 * HomeSlider class
 */
class HomeSlider extends Component {

  state = {
    canDrag: false
  }

  componentWillMount() {
    this.debounceWindowResize = debounce( this.onWindowResize, 200 );
  }

  componentDidMount() {
    this.generateTimelineMax();
    this.generateRepeatTimelineMax();
    this.enterAnimation();

    this.svg = {
      offsetTop: this.refs.svg.getBoundingClientRect().top + 10,
      height: this.refs.svg.getBoundingClientRect().height,
      dragProgression: 0,
      dragComplete: false
    };

    this.onMouseUp = ::this.onMouseUp;
    this.onMouseMove = ::this.onMouseMove;
    this.debounceWindowResize = ::this.debounceWindowResize;

    this.svg.offsetTop = this.refs.svg.getBoundingClientRect().top + 10;
  }

  componentWillUnmount() {
    this.removeListeners();
    this.loadingAnimTl.clear();
  }

  addListeners() {
    on( document, 'mouseup', this.onMouseUp );
    on( document, 'mousemove', this.onMouseMove );
    on( window, 'resize', this.debounceWindowResize );
  }

  removeListeners() {
    off( document, 'mouseup', this.onMouseUp );
    off( document, 'mousemove', this.onMouseMove );
    off( window, 'resize', this.debounceWindowResize );
  }

  enterAnimation() {

    this.enterTl = new TimelineMax({
      onComplete: ()=> {
        this.svg.offsetTop = this.refs.svg.getBoundingClientRect().top + 10;
        this.addListeners();
        this.innerCircleLoopTl.play();
        this.bigCircleLoopTl.play();
      }
    });

    const enterTlConfig = {
      progress: 1
    };

    this.grabberDragTl.progress( 1 );

    this.enterTl
      .from( this.refs.bigCircle, 1.5, { opacity: 0, y: '100%', scale: 0.8, ease: Expo.easeOut }, 1 )
      .from( this.refs.innerGrabberCircle, 0.5, { opacity: 0, ease: Expo.easeOut }, "-=0.4" )
      .from( this.refs.outerGrabberCircle, 0.5, { opacity: 0, ease: Expo.easeOut }, "-=0.3" )
      .fromTo( enterTlConfig, 1, { progress: 1 }, { progress: 0, ease: Expo.easeOut, onUpdate: () => {
        this.grabberDragTl.progress( enterTlConfig.progress );
      } })
      .staggerFromTo( this.instructionsSplited.chars, 0.5, { opacity: 0, scale: 0.8, y: '60%' }, { opacity: 1, scale: 1, y: '0%', ease: Back.easeOut.config( 3 ) }, 0.1, 0.5 );

  }

  generateRepeatTimelineMax() {

    this.innerCircleLoopTl = new TimelineMax({ paused: true, repeat: -1, yoyo: true });
    this.bigCircleLoopTl = new TimelineMax({ paused: true, repeat: -1 });

    this.innerCircleLoopTl.fromTo( this.refs.innerGrabberCircle, 0.8, { transformOrigin: "center center", scale: 1 }, { scale: 0.95, ease: Expo.easeOut });
    this.bigCircleLoopTl.fromTo( this.refs.bigCircle, 15, { transformOrigin: "center center", rotation: 0 }, { rotation: 360 });

  }

  generateTimelineMax() {

    this.instructionsSplited = new SplitText( this.refs.instructions, {
      type: 'chars'
    });

    this.loadingSplited = new SplitText( this.refs.loadingMsg, {
      type: 'chars'
    });

    this.instructionsSplited.reverseChars = this.instructionsSplited.chars.slice( 0 ).reverse();

    this.loadingAnimTl = new TimelineMax({ paused: true, repeat: -1 });

    this.grabberPressTl = new TimelineMax({
      paused: true,
      onReverseComplete: ()=> {
        this.innerCircleLoopTl.play( 0 );
      }
    });

    this.grabberDragTl = new TimelineMax({ paused: true });

    this.loadingAnimTl
      .fromTo( this.refs.loadingMsg, 0.5, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut })
      .staggerTo( this.loadingSplited.chars, 0.7, { opacity: 0, scale: 0.6, y: '-30%', ease: Back.easeOut.config( 3 ) }, 0.1 );

    this.exitDragAnimationTl = new TimelineMax({
      paused: true,
      onComplete: ()=> {
        this.svg.dragComplete = true;
        this.grabberDragTl.progress( 1 );
        this.props.onDragComplete();

        TweenMax.to( this.refs.slider, 4, { top: '165vh', ease: Expo.easeOut, onComplete: ()=> {

          this.grabberDragTl.progress( 1 );
          this.removeListeners();

          this.refs.slider.style.top = '65vh';
          this.refs.instructions.style.display = 'none';
          this.refs.loadingMsg.style.display= 'block';

          this.loadingAnimTl.play();
        } });

      }
    });

    this.grabberPressTl
      .fromTo( this.refs.innerGrabberCircle, 0.2, { scale: 1, transformOrigin: "center center" }, { scale: 0.8, stroke: '#61DAFF', ease: Back.easeOut })
      .to( this.refs.bigCircle, 0.2, { stroke: '#61DAFF', ease: Expo.easeOut }, 0 );

    this.grabberDragTl
      .to( this.refs.grabber, 1, { y: '312%' }, 0 )
      .fromTo( this.refs.line, 0.6, { scaleY: 1, transformOrigin: "bottom" }, { scaleY: 0 }, 0 )
      .fromTo( this.refs.bigCircle, 0.4, { transformOrigin: "center center" }, { scale: 1.15, ease: Expo.easeOut }, 0.5 );

    this.exitDragAnimationTl
      .staggerTo( this.instructionsSplited.reverseChars, 1, { opacity: 0, scale: 0.6, y: '-60%', ease: Back.easeOut.config( 3 ) }, 0.1 );

  }

  /**
   *  ---- Events ----
   */

  onWindowResize() {
    this.svg.offsetTop = this.refs.svg.getBoundingClientRect().top + 10;
  }

  onMouseUp() {

    if( this.state.canDrag ) {
      this.setState({
        canDrag: false
      });
    }

    if( !this.svg.dragComplete ) {
      TweenMax.to( this.svg, 1, { dragProgression: 0, ease: Expo.easeOut, onUpdate: () => {
        this.updateTimeline();
      } });

      this.grabberPressTl.reverse();
    } else {
      this.svg.dragProgression = 1;
      this.props.onProgress( this.svg.dragProgression );
    }

  }

  onGrabberMouseDown() {
    if( this.state.canDrag ) return;

    this.setState({
      canDrag: true
    });

    this.grabberPressTl.play();
  }

  onMouseMove( ev ) {

    if( this.state.canDrag ) {
      const val = ( ev.clientY - this.svg.offsetTop ) / this.svg.height;
      this.svg.dragProgression = clamp( 0, 1, val );
    }

    this.updateTimeline();
  }

  updateTimeline() {
    this.props.onProgress( this.svg.dragProgression );
    this.grabberDragTl.progress( this.svg.dragProgression );
    this.exitDragAnimationTl.progress( this.svg.dragProgression );
  }

  /**
   *  ---- Grabber events ----
   */

  onGrabberMouseEnter() {
    this.innerCircleLoopTl.pause();

  }

  onGrabberMouseLeave() {


  }

  render() {

    return (

      <div
        className="home-slider"
        ref="slider"
      >

        <svg
          className="home-slider__svg"
          ref="svg"
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
            onMouseDown={::this.onGrabberMouseDown}
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
          Drag to dive
        </p>
        <p
          className="home-slider__loading-message"
          ref="loadingMsg"
        >
          Loading
        </p>

      </div>

    );
  }
}

export default HomeSlider;
