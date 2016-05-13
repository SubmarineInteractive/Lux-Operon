import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_FLASH_MSG,
  EXP_INTRO_FLASH_MSG
} from 'config/messages';

/**
 * FlashMessages component
 */
class FlashMessages extends Component {

  componentWillMount() {

    this.bind();
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

        this.addFlashMessage( 'good', 'Bonne nouvelle +3 lux', 3 );
      }

    };

    document.addEventListener( 'keyup', onKeyUp, false );
  }

  bind() {

    [ 'addFlashMessage', 'introFlashMessage' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addListeners() {

    Emitter.on( EXP_FLASH_MSG, this.addFlashMessage );
    Emitter.once( EXP_INTRO_FLASH_MSG, this.introFlashMessage );
  }

  removeListeners() {

    Emitter.off( EXP_FLASH_MSG, this.addFlashMessage );
    Emitter.off( EXP_INTRO_FLASH_MSG, this.introFlashMessage );
  }

  introFlashMessage() {

    this.addFlashMessage( 'anecdotic', 'Oh hi there ! You’ve reached the first abyssal area, called mesopelagic zone. Find and click on the fishes to get some light and dive deeper', 5 );
  }

  addFlashMessage( type = 'normal', msg = '', duration = 3 ) {

    if( !msg ) return;

    this.refs.container.innerHTML += `
      <li class="flash-messages__el flash-messages__el--${type}">
        <span>${msg}</span>
      </li>
    `;

    const msgEls = this.refs.container.querySelectorAll( '.flash-messages__el' );
    const currentMsgEl = msgEls[ msgEls.length - 1 ];
    const currentMsgTxt = currentMsgEl.querySelector( 'span' );

    const tl = new TimelineMax({ onComplete: ()=> {
      setTimeout( ()=>{
        const msgEls = this.refs.container.querySelectorAll( '.flash-messages__el' );
        this.refs.container.removeChild( msgEls[ msgEls.length - 1 ] );
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
