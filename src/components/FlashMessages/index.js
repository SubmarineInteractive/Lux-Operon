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
  }

  componentWillUnmount() {
    this.removeListeners()
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

    this.addFlashMessage( 'anecdotic', 'Hello, bienvenue dans le jeu, il est trop bien, fait par des gens trop cool et tout et tout', 5 );
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
