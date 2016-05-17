import { Howl } from 'howler';

class SoundManager {

  constructor() {

    this.sounds = [];

    this.bind();

    this.addListeners();

    this.begin();
  }

  bind() {

    [ ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addListeners() {

  }

  play( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return;

    this.sounds[ id ].play();

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
