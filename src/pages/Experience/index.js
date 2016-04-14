import { Component } from 'react';
import { connect } from 'react-redux';
import WebGLExperience from 'components/WebGLExperience';

/**
 * Experience class
 */
@connect( state => ({ loading: state.resources.loading, resources: state.resources.resources }) )
class Experience extends Component {

  render() {

    const { loading, resources } = this.props;

    return (
      <div className="page page--experience">
        {
          ! loading &&
          <WebGLExperience resources={resources} />
        }
      </div>
    );
  }
}

export default Experience;
