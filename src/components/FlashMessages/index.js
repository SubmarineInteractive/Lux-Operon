import './styles.scss';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';

import { Component } from 'react';

import {
  EXP_FLASH_MSG,
  EXP_INTRO_FLASH_MSG,
  EXP_SHOW_VIDEO,
  EXP_GOAL_ACHIEVE,
  EXP_TOGGLE_PAUSE_GAME
} from 'config/messages';

/**
 * FlashMessages component
 */
class FlashMessages extends Component {

  componentWillMount() {

    this.bind();


    this.enable = true;
  }

  componentDidMount() {

    this.addListeners();

    this.debug();
  }

  componentWillUnmount() {

    this.removeListeners();
  }

  debug() {
    window.debug.flashMessage = this.addFlashMessage;

    window.debug.goodFlashMessage = () => {

      this.addFlashMessage( 'good', 'Bonne nouvelle +3 lux', 3 );
    };

    window.debug.badFlashMessage = () => {

      this.addFlashMessage( 'danger', 'Mauvaise nouvelle :(', 3 );
    };

    const onKeyUp = ( ev )=> {

      if( ev.keyCode === 66 ) { // b

        this.addFlashMessage( 'danger', 'Mauvaise nouvelle :(', 3 );

      } else if( ev.keyCode === 71 ) { //g

        this.addFlashMessage( 'win', "Congratulations ! You've caught enough Lux to go on. Before going any deeper, here’s an explanation about what you’ve been through", 3 );

        setTimeout( () => { this.addFlashMessage( 'good', 'A video will start in ...', 3 ); }, 1000 );
        setTimeout( () => { this.addFlashMessage( 'good', '3', 3 ); }, 2000 );
        setTimeout( () => { this.addFlashMessage( 'good', '2', 3 ); }, 3000 );
        setTimeout( () => { this.addFlashMessage( 'good', '1', 3 ); }, 4000 );
        setTimeout( () => { Emitter.emit( EXP_SHOW_VIDEO ) }, 6000 );

      }

    };

    document.addEventListener( 'keyup', onKeyUp, false );
  }

  bind() {

    [ 'addFlashMessage', 'introFlashMessage', 'endFlashMessage' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addListeners() {

    Emitter.on( EXP_FLASH_MSG, this.addFlashMessage );
    Emitter.once( EXP_INTRO_FLASH_MSG, this.introFlashMessage );
    Emitter.once( EXP_GOAL_ACHIEVE, this.endFlashMessage );
  }

  removeListeners() {

    Emitter.off( EXP_GOAL_ACHIEVE, this.endFlashMessage );
    Emitter.off( EXP_FLASH_MSG, this.addFlashMessage );
    Emitter.off( EXP_INTRO_FLASH_MSG, this.introFlashMessage );
  }

  introFlashMessage() {

    this.addFlashMessage( 'anecdotic', 'Oh hi there ! You’ve reached the first abyssal area, called mesopelagic zone. Find and click on the fishes to get some light and dive deeper', 5 );
  }

  endFlashMessage() {

    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, true );
    this.enable = false;

    this.addFlashMessage( 'win', "Congratulations ! You've caught enough Lux to go on. Before going any deeper, here’s an explanation about what you’ve been through", 3 );

    setTimeout( () => { this.addFlashMessage( 'good', 'A video will start in ...', 3 ); }, 1000 );
    setTimeout( () => { this.addFlashMessage( 'good', '3', 3 ); }, 2000 );
    setTimeout( () => { this.addFlashMessage( 'good', '2', 3 ); }, 3000 );
    setTimeout( () => { this.addFlashMessage( 'good', '1', 3 ); }, 4000 );
    setTimeout( () => { Emitter.emit( EXP_SHOW_VIDEO ) }, 6000 );

  }

  addFlashMessage( type = 'normal', msg = '', duration = 3 ) {

    if( !msg ) return;

    this.refs.container.innerHTML += `
      <li class="flash-messages__el flash-messages__el--${type}">
        <span>${msg}</span>
      </li>
    `;

    if( type === 'good' ) {

      SoundManager.play( 'good-message' );
    } else if ( type === 'danger' ) {

      SoundManager.play( 'bad-message' );
    }

    const msgEls = this.refs.container.querySelectorAll( '.flash-messages__el' );
    const currentMsgEl = msgEls[ msgEls.length - 1 ];
    const currentMsgTxt = currentMsgEl.querySelector( 'span' );

    const tl = new TimelineMax({ onComplete: ()=> {
      setTimeout( ()=>{
        const msgEls = this.refs.container.querySelectorAll( '.flash-messages__el' );
        this.refs.container.removeChild( msgEls[ 0 ] );
      }, 300 );
    } });

    tl
      .fromTo( currentMsgEl, 1, { opacity: 0, x: -20 }, { opacity: 1, x: 0, ease: Expo.easeOut })
      .to( currentMsgTxt, 1, { opacity: 0, x: 20, ease: Expo.easeOut }, '+=' + duration );

  }



  render() {

    return (

      <ul className="flash-messages" ref="container">

      </ul>

    );
  }
}

export default FlashMessages;
