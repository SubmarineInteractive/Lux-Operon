import { Component } from 'react';
import { connect } from 'react-redux';
import Radar from 'components/Radar';
import WebGLExperience from 'components/WebGLExperience';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  render() {

    const { loading, resources } = this.props;

    if( loading ) {
      console.log('No loaded yet');
      return (
        <div className="page page--experience"></div>
      );

    } else {

      console.log('Has been Loaded');
      return (
        <div className="page page--experience">
          <Radar />
          <WebGLExperience resources={resources} />
        </div>
      );

    }


  }
}

export default Experience;
