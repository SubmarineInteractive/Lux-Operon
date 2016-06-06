import { Route, IndexRoute, Redirect } from 'react-router';
import { App, Experience, Home } from 'pages';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="experience" component={Experience} />

    <Redirect from="*" to="/" />
  </Route>
);

export default routes;