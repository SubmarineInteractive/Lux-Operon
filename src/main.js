import ReactDOM from 'react-dom';
import attachFastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store, history, DevTools } from './store';
import routes from './routes';
import 'gsap';

attachFastClick.attach( document.body );

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {routes}
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById( 'root' )
);
