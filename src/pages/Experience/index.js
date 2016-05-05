import { Component } from 'react';
import connect from 'decorators/connect';
import Radar from 'components/Radar';
import LuxBar from 'components/LuxBar';
import Timer from 'components/Timer';
import WebGLExperience from 'components/WebGLExperience';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  componentWillEnter( callback ) {
    TweenMax.from( this.refs.experience, 2, { opacity: 0, ease: Expo.easeIn, delay: 0.2, onComplete: () => callback() });
  }

  render() {

    const { loading, resources } = this.props;

    const content = (
      <div className="page__container">
        <Radar />
        <Timer />
        <LuxBar />
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
