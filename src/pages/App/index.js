import { Component } from 'react';
import { on, off } from 'dom-events';
import { connect } from 'react-redux';
import Loader from 'helpers/Loader';
import resources from 'resources';
import { resize } from 'providers/ViewportProvider';
import ReactTransitionGroup from 'react-addons-transition-group';
import { loadResources, updateLoadingProgress } from 'providers/ResourcesProvider';

/**
 * App class
 */
@connect( null, { resize, loadResources, updateLoadingProgress })
class App extends Component {

  state = {
    loading: true,
    loadingProgress: 0,
    resources: {}
  }

  /**
   * componentWillMount function
   */
  componentWillMount() {
    this.handleResize = ::this.handleResize;

    this.loader = new Loader( resources, progress => this.props.updateLoadingProgress( progress ) );

    this.loader
     .load()
     .then( resources => {
       let tmpResources = {};
       resources.forEach( ({ id, resource }) => tmpResources[ id ] = resource );
       this.props.loadResources( tmpResources );
     });
  }

  /**
   * componentDidMount function
   */
  componentDidMount() {

    // Resize
    on( window, 'resize', this.handleResize );
  }

  /**
   * componentWillUnmount function
   */
  componentWillUnmount() {

    // Resize
    off( window, 'resize', this.handleResize );
  }

  /**
   * handleResize function
   */
  handleResize() {
    this.props.resize( window.innerWidth, window.innerHeight );
  }

  render() {

    const { location: { pathname } } = this.props;

    const childrenWithProps = React.Children.map( this.props.children,
      child => React.cloneElement( child, { key: pathname }) );

    return (
      <ReactTransitionGroup
        component="div"
        className="route-transition"
      >
        {childrenWithProps}
      </ReactTransitionGroup>
    );
  }
}

export default App;