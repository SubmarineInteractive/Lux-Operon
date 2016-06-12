import { Component } from 'react';
import { on, off } from 'dom-events';
import { connect } from 'react-redux';
import Emitter from 'helpers/Emitter';
import Loader from 'helpers/Loader';
import { resize } from 'providers/ViewportProvider';
import ReactTransitionGroup from 'react-addons-transition-group';
import DocumentTitle from 'react-document-title';
import About from 'components/About';
import ToolBar from 'components/ToolBar';
import { loadResources, updateLoadingProgress } from 'providers/ResourcesProvider';

import {
  WINDOW_ON_FOCUS,
  WINDOW_ON_BLUR
} from 'config/messages';

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
    this.bind();

    this.loader = Loader;

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
    on( window, 'blur', this.handleBlur );
    on( window, 'focus', this.handleFocus );
  }

  /**
   * componentWillUnmount function
   */
  componentWillUnmount() {

    // Resize
    off( window, 'resize', this.handleResize );
    off( window, 'blur', this.handleBlur );
    off( window, 'focus', this.handleFocus );
  }

  bind() {
    this.handleResize = ::this.handleResize;
  }

  /**
   * handleResize function
   */
  handleResize() {
    this.props.resize( window.innerWidth, window.innerHeight );
  }

  /**
   * handleFocus function
   */
  handleFocus() {
    Emitter.emit( WINDOW_ON_FOCUS );
  }

  /**
   * handleBlur function
   */
  handleBlur() {
    Emitter.emit( WINDOW_ON_BLUR );
  }

  render() {

    const { location: { pathname } } = this.props;

    const childrenWithProps = React.Children.map( this.props.children,
      child => React.cloneElement( child, { key: pathname }) );

    return (
      <DocumentTitle title="Luxoperon - Discover deep seas through a WebGL experience">
        <ReactTransitionGroup
          component="div"
          className="route-transition"
        >

          <ToolBar />

          <About />

          {childrenWithProps}

        </ReactTransitionGroup>
      </DocumentTitle>
    );
  }
}

export default App;
