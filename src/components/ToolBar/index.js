import './styles.scss';

import { Component } from 'react';

import randomFloat from 'utils/random-float';

/**
 * ToolBar component
 */
class ToolBar extends Component {

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();
    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

  }

  addEventListeners() {

  }

  removeEventListeners() {

  }

  generateTimelineMax() {
    const soundBars = this.refs.sound.querySelectorAll( 'line' );

    this.soundTl = new TimelineMax({ paused: true, repeat: -1, yoyo: true });

    for ( let i = 0; i < soundBars.length; ++i ) {
      this.soundTl.to( soundBars[ i ], 0.3, { transformOrigin: 'center bottom', scaleY: randomFloat( 0.5, 0.9 ) }, 0 );
      this.soundTl.to( soundBars[ i ], 0.3, { transformOrigin: 'center bottom', scaleY: randomFloat( 0.5, 0.9 ) }, soundBars.length - 1 + i * 0.3 );
    }

    this.soundTl.play();
  }

  render() {

    return (

      <div className="toolbar">

        <svg viewBox="0 0 16 15.8" className="toolbar__pause" ref="pause">
          <line x1="4.5" y1="2" x2="4.5" y2="15.8"/>
          <line x1="11.5" y1="2" x2="11.5" y2="15.8"/>
        </svg>

        <svg viewBox="0 0 16 15" className="toolbar__sound" ref="sound">
          <line x1="10.5" y1="0" x2="10.5" y2="15"/>
          <line x1="15.5" y1="2" x2="15.5" y2="15"/>
          <line x1="5.5" y1="2" x2="5.5" y2="15"/>
          <line x1="0.5" y1="5" x2="0.5" y2="15"/>
        </svg>

        <svg viewBox="0 0 21 15" className="toolbar__fullscreen" ref="fullscreen">
          <path d="M21 .5h-5M20.5 0v5"/>
          <path d="M21 14.5h-5M20.5 15v-5"/>
          <path d="M0 .5h5M.5 0v5"/>
          <path d="M0 14.5h5M.5 15v-5"/>
        </svg>

      </div>

    );
  }
}

export default ToolBar;
