import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_TIMER_START,
  EXP_TIMER_ENDED,
  EXP_TIMER_TOGGLE_PAUSE,
  EXP_TOGGLE_PAUSE_GAME,
  EXP_FLASH_MSG
} from 'config/messages';

/**
 * Timer component
 */
class Timer extends Component {

  state = {
    minutes: '02',
    seconds: '00'
  }

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.currentTime = 0;
    this.isPaused = false;

    this.isInDanger = false;
  }

  componentDidMount() {

    this.addEventListeners();

    this.debug();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'startTimer', 'togglePause' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  debug() {

    const onKeyUp = ( ev )=> {

      if( ev.keyCode === 82 ) { // r

        this.currentTime -= 10;
        this.updateTimer();

      } else if ( ev.keyCode === 84 ) { // t

        this.currentTime += 10;
        this.updateTimer();

      }
    };

    document.addEventListener( 'keyup', onKeyUp, false );

  }

  addEventListeners() {

    Emitter.on( EXP_TIMER_START, this.startTimer );
    Emitter.on( EXP_TIMER_TOGGLE_PAUSE, this.togglePause );
  }

  removeEventListeners() {

    Emitter.off( EXP_TIMER_START, this.startTimer );
    Emitter.off( EXP_TIMER_TOGGLE_PAUSE, this.togglePause );
  }

  startTimer( initialTime = false ) {

    if( initialTime ) this.currentTime = initialTime;

    clearInterval( this.interval );

    this.interval = setInterval( ()=>{

      if( this.isPaused ) return;

      if( this.currentTime <= 0 ) {

        this.timerEnds();

      } else {
        this.currentTime--;
        this.updateTimer();
      }

    }, 1000 );

  }

  togglePause( toggle ) {

    this.isPaused = toggle;
  }

  timerEnds() {

    clearInterval( this.interval );

    this.setState({
      minutes: '00',
      seconds: '00'
    });

    Emitter.emit( EXP_TIMER_ENDED );
    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, true );
    Emitter.emit( EXP_FLASH_MSG, 'danger', 'Time is over, you loose. Try again !' );

  }
  updateTimer() {
    let minutes = Math.floor( this.currentTime / 60 );
    let seconds = Math.floor( this.currentTime % 60 );

    if( minutes < 10 ) {
      minutes = '0' + minutes;
    }

    if( seconds < 10 ) {
      seconds = '0' + seconds;
    }

    if( !this.isInDanger && this.currentTime === 45 ) {

      this.isInDanger = true;
      this.refs.container.classList.add( 'timer--is-in-danger' );
      Emitter.emit( EXP_FLASH_MSG, 'danger', 'It remains you less than 45 seconds, hurry up!' );
    }

    this.setState({
      minutes,
      seconds
    });
  }

  render() {

    return (
      <div className="timer" ref="container">

        <span className="timer__minutes">{this.state.minutes}</span>

        :

        <span className="timer__seconds">{this.state.seconds}</span>

      </div>
    );
  }
}

export default Timer;
