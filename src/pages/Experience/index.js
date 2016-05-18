import { Component } from 'react';
import connect from 'decorators/connect';
import Emitter from 'helpers/Emitter';
import Radar from 'components/Radar';
import LuxBar from 'components/LuxBar';
import DepthBar from 'components/DepthBar';
import LevelInfos from 'components/LevelInfos';
import Timer from 'components/Timer';
import ExperienceOverlay from 'components/ExperienceOverlay';
import LevelIntroduction from 'components/LevelIntroduction';
import RewardPopin from 'components/RewardPopin';
import VideoPopin from 'components/VideoPopin';
import LoosePopin from 'components/LoosePopin';
import FishName from 'components/FishName';
import FlashMessages from 'components/FlashMessages';
import WebGLExperience from 'components/WebGLExperience';
import { mezaleConfig } from 'config/levels';

import { EXP_INTRO_START } from 'config/messages';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )

class Experience extends Component {

  componentWillEnter( callback ) {

    this.startIntroduction( 5000 );
    TweenMax.from( this.refs.experience, 2, { opacity: 0, ease: Expo.easeIn, delay: 3, onComplete: () => callback() });

  }

  componentWillAppear() {
    this.startIntroduction( 1000 );
  }

  startIntroduction( delay ) {

    setTimeout( ()=> {
      Emitter.emit( EXP_INTRO_START );
      this.refs.levelIntro.beginTitle();
    }, delay );
  }

  render() {

    const { loading, resources } = this.props;

    const content = (
      <div className="page__container">
        <ExperienceOverlay />
        <LevelIntroduction config={mezaleConfig} ref="levelIntro"/>
        <LoosePopin />
        <RewardPopin />
        <VideoPopin />
        <Radar />
        <LevelInfos config={mezaleConfig} />
        <Timer />
        <LuxBar />
        <DepthBar config={mezaleConfig} />
        <FlashMessages />
        <FishName />
        <WebGLExperience resources={resources} />
      </div>
    );

    return (
      <div className="page page--experience" ref="experience">
        {! loading && content}
      </div>
    );
  }
}

export default Experience;
