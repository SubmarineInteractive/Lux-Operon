import { Component } from 'react';
import connect from 'decorators/connect';
import Radar from 'components/Radar';
import LuxBar from 'components/LuxBar';
import DepthBar from 'components/DepthBar';
import LevelInfos from 'components/LevelInfos';
import Timer from 'components/Timer';
import LevelIntroduction from 'components/LevelIntroduction';
import WebGLExperience from 'components/WebGLExperience';
import { mezaleConfig } from 'config/levels';
/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  componentWillEnter( callback ) {
    TweenMax.from( this.refs.experience, 2, { opacity: 0, ease: Expo.easeIn, delay: 3, onComplete: () => callback() });
  }

  render() {

    const { loading, resources } = this.props;

    const content = (
      <div className="page__container">
        <LevelIntroduction config={mezaleConfig} />
        <Radar />
        <LevelInfos config={mezaleConfig} />
        <Timer />
        <LuxBar />
        <DepthBar config={mezaleConfig} />
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
