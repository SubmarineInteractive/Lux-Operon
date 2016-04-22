import { Route, IndexRoute, Redirect } from 'react-router';
import { App, Experience, Home } from 'pages';

//Debug
import Radar from 'components/Radar';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="experience" component={Experience} />
    <Route path="radar" component={Radar} />
    <Redirect from="*" to="/" />
  </Route>
);

export default routes;
