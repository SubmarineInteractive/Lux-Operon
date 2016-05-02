import { Component } from 'react';
import connect from 'decorators/connect';
import Radar from 'components/Radar';
import WebGLExperience from 'components/WebGLExperience';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  componentWillEnter( callback ) {
    TweenMax.from( this.refs.experience, 2, { delay: 0.2, opacity: 0, ease: Expo.easeIn, onComplete: () => callback() });
  }

  render() {

    const { loading, resources } = this.props;

    if( loading ) {

      return (
        <div className="page page--experience"></div>
      );

    } else {

      return (
        <div className="page page--experience" ref="experience">
          <Radar />
          <WebGLExperience resources={resources} />
        </div>
      );

    }


  }
}

export default Experience;