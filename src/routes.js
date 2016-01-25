import { Route, IndexRedirect } from 'react-router';
import { App, Experience } from 'containers';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="experience" />
    <Route path="experience" component={Experience} />
  </Route>
);

export default routes;