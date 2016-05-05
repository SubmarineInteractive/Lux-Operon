import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_TIMER_START,
  EXP_TIMER_ENDED
} from 'config/messages';

/**
 * LuxBar component
 */
class LuxBar extends Component {

  state = {
    minutes: '02',
    seconds: '00'
  }

  componentWillMount() {

    this.bind();

    this.interval = null;
    this.currentTime = 0;
  }

  componentDidMount() {

    this.addEventListeners();
    this.startTimer( 120 );
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    this.startTimer = this.startTimer.bind( this );
  }

  addEventListeners() {

    Emitter.on( EXP_TIMER_START, this.startTimer );
  }

  removeEventListerners() {

  }

  startTimer( initialTime ) {

    this.currentTime = initialTime;

    clearInterval( this.interval );

    this.interval = setInterval( ()=>{

      if( this.currentTime <= 0 ) {

        this.timerEnds();

      } else {
        this.currentTime--;
        this.updateTimer();
      }

    }, 1000 );

  }

  timerEnds() {

    clearInterval( this.interval );

    this.setState({
      minutes: '00',
      seconds: '00'
    });

    Emitter.emit( EXP_TIMER_ENDED );

  }
  updateTimer() {
    let minutes = Math.floor( this.currentTime / 60 );
    let seconds = Math.floor( this.currentTime % 60 );

    if(minutes < 10) {
      minutes = '0' + minutes;
    }

    if(seconds < 10) {
      seconds = '0' + seconds;
    }

    this.setState({
      minutes,
      seconds
    })
  }

  render() {

    return (
      <div className="timer">

        <span className="timer__minutes">{this.state.minutes}</span>

        :

        <span className="timer__seconds">{this.state.seconds}</span>

      </div>
    );
  }
}

export default LuxBar;
