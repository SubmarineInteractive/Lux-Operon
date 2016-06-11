import './styles.scss';

import { Component } from 'react';
import SoundManager from 'helpers/SoundManager';

/**
 * TutorialIntroduction component
 */
class TutorialIntroduction extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.holdTl.clear();
    this.removeEventListeners();
  }

  bind() {

    [ 'skip', 'onKeyUp' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );
  }

  removeEventListeners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );
  }

  generateTimelineMax() {

    this.holdTl = new TimelineMax({ paused: true, onComplete: ()=> {
      this.refs.holdToMoveStep.style.display = 'none';
      this.refs.revealStep.style.display = 'block';
      this.revealTl.play();
    } });

    this.revealTl = new TimelineMax({ paused: true, onComplete: ()=> {
      setTimeout( ()=>{
        this.refs.container.style.display = 'none';
        this.props.ended();
      }, 300 );
    } });

    this.holdTl
      .from( this.refs.skip, 2, { opacity: 0, x: 100, ease: Expo.easeOut }, 0 )
      .from( this.refs.holdCursor, 1, { opacity: 0, ease: Expo.easeOut }, 0 )
      .from( this.refs.holdHand, 1, { opacity: 0, ease: Expo.easeOut }, 0.3 )
      .from( this.refs.holdInstruction, 1, { opacity: 0, y: '100%', ease: Expo.easeOut }, 0.3 )
      .to( this.refs.holdHand, 0.2, { x: 10, ease: Expo.easeOut })
      .to( this.refs.holdCursor, 0.1, { x: 5, ease: Expo.easeOut }, '-=0.1' )
      .to( this.refs.holdHand, 0.3, { x: -20, y: -5, ease: Expo.easeOut })
      .to( this.refs.holdCursor, 0.1, { x: -10, y: -2, ease: Expo.easeOut }, '-=0.1' )
      .to( this.refs.holdHand, 0.3, { x: -5, y: -25, ease: Expo.easeOut })
      .to( this.refs.holdCursor, 0.1, { x: -2, y: -12, ease: Expo.easeOut }, '-=0.1' )
      .to( this.refs.holdHand, 0.3, { x: 0, y: 0, ease: Expo.easeOut })
      .to( this.refs.holdCursor, 0.2, { x: 0, y: 0, ease: Expo.easeOut }, '-=0.2' )
      .to( this.refs.holdToMoveStep, 0.8, { y: -20, opacity: 0, ease: Expo.easeOut }, '-=0.1' );

    this.revealTl
      .from( this.refs.revealStep, 1.2, { y: 20, opacity: 0, ease: Expo.easeOut })
      .from( this.refs.revealCircle, 1, { opacity: 0, ease: Expo.easeOut })
      .from( this.refs.revealHand, 1, { opacity: 0, ease: Expo.easeOut }, 0.3 )
      .from( this.refs.revealInstruction, 1, { opacity: 0, y: '100%', ease: Expo.easeOut }, 0.3 )
      .to( this.refs.revealCircle, 0.6, { opacity: 0, ease: Expo.easeOut })
      .to( this.refs.revealHand, 1, { scale: 0.8, ease: Back.easeOut })
      .to( this.refs.revealHand, 1, { scale: 1, ease: Expo.easeOut })
      .to( this.refs.revealCircle, 1, { opacity: 1, scale: 1.05, ease: Expo.easeOut })
      .to( this.refs.revealCircle, 0.5, { opacity: 1, scale: 1, ease: Expo.easeOut })
      .to( this.refs.container, 1, { opacity: 0, ease: Expo.easeOut });
  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.skip();
    }
  }

  begin() {

    SoundManager.play( 'woosh' );

    this.refs.container.style.display = 'block';
    this.holdTl.play();

    this.addEventListeners();
  }

  skip() {

    this.holdTl.stop();
    this.revealTl.stop();

    this.refs.container.style.display = 'none';

    this.removeEventListeners();

    this.props.ended();
  }

  render() {

    return (

      <div className="introduction-tutorial" ref='container'>

        <button className="introduction-tutorial__skip" ref="skip" onClick={this.skip}>Skip tutorial</button>

        <div className="introduction-tutorial__container">

          <div className="introduction-tutorial__step introduction-tutorial__step--hold-to-move" ref="holdToMoveStep">

            <svg className="introduction-tutorial__icon introduction-tutorial__icon--hold-to-move" version="1.1" x="0px" y="0px" viewBox="0 0 104 128.7" ref="holdToMoveSvg">
              <g ref="holdCursor">
                <g>
                  <circle className="st0" cx="52.1" cy="51.2" r="12.8"/>
                </g>
                <g className="st1">
                  <polygon className="st2" points="56.8,5.7 56.4,6 52.1,1.7 47.7,6 47.4,5.7 52.1,1.1 			"/>
                  <rect x="51.8" y="1.6" className="st2" width="0.4" height="29.9"/>
                </g>
                <g className="st1">
                  <polygon className="st2" points="98.7,55.9 98.4,55.6 102.7,51.2 98.4,46.8 98.7,46.5 103.3,51.2 			"/>
                  <rect x="73" y="51" className="st2" width="29.9" height="0.4"/>
                </g>
                <g className="st1">
                  <polygon className="st2" points="5.4,55.9 5.7,55.6 1.4,51.2 5.7,46.8 5.4,46.5 0.8,51.2 			"/>
                  <rect x="1.2" y="51" className="st2" width="29.9" height="0.4"/>
                </g>
              </g>

              <path className="st3" ref="holdHand" d="M92.8,78.2c0,8.7,0,17.5,0,26.2c0,0.9-0.3,1.9-0.5,2.8c-1.7,6.5-3.3,12.9-5,19.3c-0.1,0.4-0.8,1-1.3,1
                c-12.1,0.1-24.2,0.1-36.3,0c-0.5,0-1.2-0.5-1.5-0.9c-0.8-1.4-1.3-3-2.1-4.4c-4.3-7-8.6-14-12.9-21c-2.2-3.6-4.5-7.3-6.6-11
                c-1-1.8-1.4-3.9-0.4-5.7c1.5-2.9,5.8-3.4,8-1c1.9,2,3.6,4.2,5.4,6.3c2.2,2.5,4.5,5,7.1,8c0.3-1.2,0.5-1.9,0.5-2.6
                c0-14.2,0-28.3,0-42.5c0-4,3.7-6,7.4-4.7c2.5,0.9,3.2,3.3,3.2,5.6c0.1,8.7,0.2,17.5,0.2,26.2c0,0.6,0,1.2,0,1.8
                c0,0.1,0.3,0.1,0.5,0.2c0.2-0.5,0.6-1,0.6-1.6c0.1-3.1,0-6.2,0-9.2c0-2.8,2.7-5.5,6.2-4.8c2.8,0.6,4.2,2.4,4.2,5.3
                c0,4.3,0,8.6,0,12.9c0,0.4,0.5,0.8,0.7,1.2c0.2-0.4,0.5-0.8,0.6-1.2c0.1-0.5,0-1.1,0-1.7c0.1-2.9,0.1-5.8,0.4-8.6
                c0.3-2.8,2.7-4.5,5.3-4.1c2.7,0.3,4.8,1.8,4.8,5.2c0,4.1,0,8.3,0,12.4c0,0.7,0.3,1.5,0.5,2.2c0.2,0,0.5,0,0.7,0
                c0.2-0.7,0.4-1.4,0.5-2c0.1-2.6,0-5.3,0-7.9c0-2.8,1.9-4.9,4.8-4.9C90.3,74.7,91.9,76.1,92.8,78.2z"/>
            </svg>

            <p className="introduction-tutorial__instruction" ref="holdInstruction">Click and hold to move</p>

          </div>

          <div className="introduction-tutorial__step introduction-tutorial__step--reveal" ref="revealStep">

            <svg className="introduction-tutorial__icon introduction-tutorial__icon--reveal" version="1.1" x="0px" y="0px" viewBox="0 0 104 128.7" ref="revealSvg">

              <circle className="st2" cx="52" cy="51.4" r="12.8" ref="revealCircle"/>

              <path className="st3" ref="revealHand" d="M92.4,78.6c0,8.7,0,17.5,0,26.2c0,0.9-0.3,1.9-0.5,2.8c-1.7,6.5-3.3,12.9-5,19.3
                c-0.1,0.4-0.8,1-1.3,1c-12.1,0.1-24.2,0.1-36.3,0c-0.5,0-1.2-0.5-1.5-0.9c-0.8-1.4-1.3-3-2.1-4.4c-4.3-7-8.6-14-12.9-21
                c-2.2-3.6-4.5-7.3-6.6-11c-1-1.8-1.4-3.9-0.4-5.7c1.5-2.9,5.8-3.4,8-1c1.9,2,3.6,4.2,5.4,6.3c2.2,2.5,4.5,5,7.1,8
                c0.3-1.2,0.5-1.9,0.5-2.6c0-14.2,0-28.3,0-42.5c0-4,3.7-6,7.4-4.7c2.5,0.9,3.2,3.3,3.2,5.6c0.1,8.7,0.2,17.5,0.2,26.2
                c0,0.6,0,1.2,0,1.8c0,0.1,0.3,0.1,0.5,0.2c0.2-0.5,0.6-1,0.6-1.6c0.1-3.1,0-6.2,0-9.2c0-2.8,2.7-5.5,6.2-4.8
                c2.8,0.6,4.2,2.4,4.2,5.3c0,4.3,0,8.6,0,12.9c0,0.4,0.5,0.8,0.7,1.2c0.2-0.4,0.5-0.8,0.6-1.2c0.1-0.5,0-1.1,0-1.7
                c0.1-2.9,0.1-5.8,0.4-8.6c0.3-2.8,2.7-4.5,5.3-4.1c2.7,0.3,4.8,1.8,4.8,5.2c0,4.1,0,8.3,0,12.4c0,0.7,0.3,1.5,0.5,2.2
                c0.2,0,0.5,0,0.7,0c0.2-0.7,0.4-1.4,0.5-2c0.1-2.6,0-5.3,0-7.9c0-2.8,1.9-4.9,4.8-4.9C89.8,75.1,91.4,76.5,92.4,78.6z"/>

            </svg>

            <p className="introduction-tutorial__instruction" ref="revealInstruction">Click at least on 10 <br/> fishes to gain light</p>

          </div>

        </div>

      </div>
    );
  }
}

export default TutorialIntroduction;
