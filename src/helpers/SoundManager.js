import { Howl, Howler } from 'howler';
import Emitter from 'helpers/Emitter';

import {
  WINDOW_ON_FOCUS,
  WINDOW_ON_BLUR
} from 'config/messages';


class SoundManager {

  constructor() {

    this.sounds = [];

    this.cachedVolume = [];

    this.bind();

    this.addListeners();

    this.begin();
  }

  bind() {

    [ 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addListeners() {

    Emitter.on( WINDOW_ON_FOCUS, this.onWindowFocus );
    Emitter.on( WINDOW_ON_BLUR, this.onWindowBlur );
  }

  get( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return false;

    return this.sounds[ id ];
  }

  play( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return;

    this.sounds[ id ].play();

  }

  onWindowFocus() {
    Howler.unmute();
  }

  onWindowBlur() {

    Howler.mute();
  }

  load( url, onLoad, onSucess, onReject, id ) {

    const audio = new Howl({
      urls: [ url ],
      volume: 1,
      onload: () => {

        this.sounds[ id ] = audio;

        onLoad();
      }
    })


  }

  begin() {

  }

}

export default new SoundManager();
