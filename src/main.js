import ReactDOM from 'react-dom';
import attachFastClick from 'fastclick';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from './store';
import routes from './routes';
import history from 'helpers/history';
import 'stylesheets/main.scss';

attachFastClick.attach( document.body );

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById( 'root' )
);